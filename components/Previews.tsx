"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { IMG } from "@/lib/images.generated";
import type { Img } from "@/lib/content";

type Kind = "portal" | "builder";

export function CaseStudyPreview({ kind, aspect = "16 / 10", priority }: { kind: Kind; aspect?: string; priority?: boolean }) {
  return kind === "portal" ? <PortalPreview aspect={aspect} priority={priority} /> : <BuilderPreview aspect={aspect} />;
}

/* Wipes from the old homepage to the new one, scrolls to the action center,
   and brings in the mobile version. Pure CSS, so it is cheap and pauses for
   reduced motion. */
function PortalPreview({ aspect, priority }: { aspect: string; priority?: boolean }) {
  const before = IMG["partner-portal/before"];
  const after = IMG["partner-portal/after"];
  const mobile = IMG["partner-portal/mobile"];
  return (
    <div className="pv" style={{ aspectRatio: aspect }} aria-hidden="true">
      <div className="pv-layer pv-after">
        <Image
          src={after.src}
          width={after.width}
          height={after.height}
          alt=""
          priority={priority}
          placeholder="blur"
          blurDataURL={after.blurDataURL}
          sizes="(max-width: 1023px) 100vw, 50vw"
        />
      </div>
      <div className="pv-layer pv-before">
        <Image
          src={before.src}
          width={before.width}
          height={before.height}
          alt=""
          priority={priority}
          placeholder="blur"
          blurDataURL={before.blurDataURL}
          sizes="(max-width: 1023px) 100vw, 50vw"
        />
      </div>
      <div className="pv-phone">
        <div className="pv-phone-screen">
          <Image src={mobile.src} width={mobile.width} height={mobile.height} alt="" sizes="160px" />
        </div>
      </div>
      <span className="pv-tag pv-tag-before">Before</span>
      <span className="pv-tag pv-tag-after">After</span>
    </div>
  );
}

/* Wall tile: a divider sweeps across to reveal the after, holds, then sweeps back. */
export function BeforeAfter({ before, after, delay = 0 }: { before: Img; after: Img; delay?: number }) {
  const anim = { animationDelay: `${delay}s` };
  const sizes = "(max-width: 479px) 100vw, (max-width: 767px) 50vw, (max-width: 1279px) 30vw, 22vw";
  return (
    <div className="ba" style={{ aspectRatio: `${after.width} / ${after.height}` }} aria-hidden="true">
      <Image src={after.src} alt="" fill sizes={sizes} placeholder="blur" blurDataURL={after.blurDataURL} style={{ objectFit: "cover" }} />
      <div className="ba-before" style={anim}>
        <Image src={before.src} alt="" fill sizes={sizes} placeholder="blur" blurDataURL={before.blurDataURL} style={{ objectFit: "cover" }} />
      </div>
      <span className="ba-line" style={anim} />
      <span className="pv-tag ba-tag-before" style={anim}>
        Before
      </span>
      <span className="pv-tag ba-tag-after" style={anim}>
        After
      </span>
    </div>
  );
}

/* A recorded session of the real tool. Plays only while on screen, and
   shows the still poster when reduced motion is on. */
function BuilderPreview({ aspect }: { aspect: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduce, setReduce] = useState(false);
  const poster = IMG["image-builder/poster"];

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const onChange = () => setReduce(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v || reduce) {
      v?.pause();
      return;
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <div className="pv" style={{ aspectRatio: aspect }} aria-hidden="true">
      <video
        ref={ref}
        src="/work/image-builder/builder.mp4"
        poster={poster.src}
        muted
        loop
        playsInline
        preload="metadata"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
}

/* A silent looping clip on a wall card. Plays only on screen; reduced motion shows the poster. */
export function LoopVideo({ src, poster }: { src: string; poster: Img }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const onChange = () => setReduce(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  useEffect(() => {
    const v = ref.current;
    if (!v || reduce) {
      v?.pause();
      return;
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, [reduce]);
  return (
    <video
      ref={ref}
      src={src}
      poster={poster.src}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      style={{ display: "block", width: "100%", height: "auto", aspectRatio: `${poster.width} / ${poster.height}`, background: "var(--ph)" }}
    />
  );
}

/* The CRM events post, rebuilt in layers from the flat export: the pin and
   headline rise in each time the card scrolls into view, and the two photo rows
   drift in opposite directions like an event reel. Positions are percentages of
   the original 1080 × 1350 canvas. Reduced motion shows the flat post. */
const CRM = "/work/linkedin-partner/crm";
const CRM_W = 1080;
const CRM_H = 1350;
const crmText = [
  { key: "pin", x: 87, y: 70, w: 112, h: 163, delay: 0 },
  { key: "h1", x: 104, y: 258, w: 876, h: 114, delay: 120 },
  { key: "h2", x: 101, y: 366, w: 611, h: 117, delay: 240 },
  { key: "sub", x: 99, y: 518, w: 870, h: 99, delay: 380 },
];
const crmRows = [
  { key: "row1", y: 709, h: 324, period: 1108, dir: "left", secs: 40 },
  { key: "row2", y: 1069, h: 281, period: 933, dir: "right", secs: 34 },
];
const pct = (n: number, of: number) => `${(n / of) * 100}%`;

export function CrmEventsPreview({ still }: { still: Img }) {
  const ref = useRef<HTMLDivElement>(null);
  const [reduce, setReduce] = useState(false);
  const [armed, setArmed] = useState(false);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const onChange = () => setReduce(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    setArmed(true);
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  if (reduce) {
    return (
      <Image
        src={still.src}
        alt=""
        width={still.width}
        height={still.height}
        placeholder="blur"
        blurDataURL={still.blurDataURL}
        sizes="(max-width: 479px) 100vw, (max-width: 767px) 50vw, (max-width: 1279px) 30vw, 22vw"
        style={{ display: "block", width: "100%", height: "auto" }}
      />
    );
  }

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`crm${armed ? " crm-armed" : ""}${inView ? " crm-in" : ""}`}
      style={{ aspectRatio: `${CRM_W} / ${CRM_H}`, backgroundImage: `url(${CRM}/base.webp)` }}
    >
      {crmRows.map((r) => (
        <div key={r.key} className="crm-row" style={{ top: pct(r.y, CRM_H), height: pct(r.h, CRM_H) }}>
          <div
            className={`crm-track crm-${r.dir}`}
            style={{
              width: pct(r.period * 3, CRM_W),
              backgroundImage: `url(${CRM}/${r.key}.webp)`,
              animationDuration: `${r.secs}s`,
            }}
          />
        </div>
      ))}
      {crmText.map((t) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={t.key}
          src={`${CRM}/${t.key}.webp`}
          alt=""
          className={`crm-reveal${t.key === "pin" ? " crm-pin" : ""}`}
          style={{
            left: pct(t.x, CRM_W),
            top: pct(t.y, CRM_H),
            width: pct(t.w, CRM_W),
            ["--d" as string]: `${t.delay}ms`,
          } as CSSProperties}
        />
      ))}
    </div>
  );
}
