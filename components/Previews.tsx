"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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
