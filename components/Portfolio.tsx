"use client";

import Image from "next/image";

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import {
  about,
  caseStudies,
  clients,
  location,
  photoStack,
  profile,
  visualWork,
  type CaseStudy,
  type VisualWork,
} from "@/lib/content";
import { Media } from "./Media";
import { BeforeAfter, CaseStudyPreview, CrmEventsPreview, LoopVideo } from "./Previews";

/* Stagger the before/after tiles so they don't flip in unison */
const beforeAfterDelay = (id: string) =>
  -((visualWork.filter((v) => v.compare).findIndex((v) => v.id === id) * 4.5) % 10);
import { LiveTime } from "./LiveTime";
import { Lightbox, type LightboxItem } from "./Lightbox";
import { ArrowUp, ChevronLeft, ChevronRight, Mail } from "./Icons";

const muted = "var(--text-muted)";
const meta = "rgba(232,220,214,0.6)";

const cardBase = { background: "var(--card)", borderRadius: 14 } as const;

/* Lightbox order: case studies, photo gallery, then the wall */
const items: LightboxItem[] = [
  ...caseStudies.map((cs): LightboxItem => ({ kind: "case", cs })),
  { kind: "stack" },
  ...visualWork.map((w): LightboxItem => ({ kind: "work", w })),
];

const caseIndex = (slug: string) => items.findIndex((it) => it.kind === "case" && it.cs.slug === slug);
const urlFor = (i: number | null) => {
  const it = i === null ? null : items[i];
  return it?.kind === "case" ? `/work/${it.cs.slug}` : "/";
};

export function Portfolio({ initialSlug }: { initialSlug?: string }) {
  const initial = initialSlug ? caseIndex(initialSlug) : -1;
  const [open, setOpen] = useState<number | null>(initial >= 0 ? initial : null);
  const [showPill, setShowPill] = useState(false);

  const openerRef = useRef<HTMLElement | null>(null);
  const pushedRef = useRef(false);
  const openedFromGrid = useRef(false);
  const profileRef = useRef<HTMLElement | null>(null);

  /* ---------- Open / close / navigate, kept in sync with the URL ---------- */
  const openAt = useCallback((i: number) => {
    openerRef.current = document.activeElement as HTMLElement | null;
    window.history.pushState({ lb: i }, "", urlFor(i));
    pushedRef.current = true;
    openedFromGrid.current = true;
    setOpen(i);
  }, []);

  const go = useCallback((dir: 1 | -1) => {
    setOpen((cur) => {
      if (cur === null) return cur;
      const next = (cur + dir + items.length) % items.length;
      window.history.replaceState({ lb: next }, "", urlFor(next));
      return next;
    });
  }, []);

  const close = useCallback(() => {
    if (pushedRef.current) {
      pushedRef.current = false;
      window.history.back(); // popstate below finishes closing
    } else {
      window.history.replaceState(null, "", "/");
      setOpen(null);
    }
  }, []);

  useEffect(() => {
    const onPop = (e: PopStateEvent) => {
      const lb = (e.state as { lb?: number } | null)?.lb;
      if (typeof lb === "number") {
        setOpen(lb);
        return;
      }
      const m = window.location.pathname.match(/^\/work\/([^/]+)/);
      const idx = m ? caseIndex(m[1]) : -1;
      pushedRef.current = false;
      setOpen(idx >= 0 ? idx : null);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // Return focus to whatever opened the lightbox
  useEffect(() => {
    if (open === null && openerRef.current) {
      openerRef.current.focus({ preventScroll: true });
      openerRef.current = null;
    }
  }, [open]);

  // Lock page scroll while the lightbox is open
  useEffect(() => {
    if (open === null) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [open]);

  /* ---------- Sticky name pill after the profile card scrolls away ---------- */
  useEffect(() => {
    const el = profileRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      setShowPill(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const linkOpen = (i: number) => (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    openAt(i);
  };

  const galleryIdx = caseStudies.length;
  const workIdx = (i: number) => caseStudies.length + 1 + i;

  return (
    <>
      <div
        inert={open !== null}
        style={{ minHeight: "100vh", boxSizing: "border-box", padding: 12 }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "flex-start" }}>
          {/* ============ LEFT COLUMN ============ */}
          <aside className="side" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <ProfileCard ref={profileRef} />

            {/* Clients */}
            <section
              aria-label="Clients and employers"
              className="span-all"
              style={{ ...cardBase, padding: "16px 20px 20px", display: "flex", flexDirection: "column", gap: 16 }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 500, color: meta }}>
                <span>Clients</span>
                <span>{clients.range}</span>
              </div>
              {/* Logos scroll in a continuous loop; the list renders twice so the loop is seamless */}
              <div className="marquee">
                <div className="marquee-track">
                  {[0, 1].map((copy) => (
                    <ul key={copy} className="marquee-list" aria-hidden={copy === 1 ? true : undefined}>
                      {clients.items.map((c) => (
                        <li key={c.name}>
                          {c.src ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={c.src}
                              alt={copy === 0 ? c.name : ""}
                              width={Math.round((c.w * c.h) / c.h0)}
                              height={c.h}
                              style={{ display: "block", height: c.h, width: "auto" }}
                            />
                          ) : (
                            <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1 }}>{c.name}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
              </div>
            </section>

            {/* Location */}
            <section
              aria-label="Location and local time"
              className="dots"
              style={{ ...cardBase, backgroundColor: "var(--card)", padding: "18px 20px", display: "flex", flexDirection: "column", gap: 4 }}
            >
              <span style={{ fontSize: 11, fontWeight: 500, color: meta }}>Located in</span>
              <span style={{ fontSize: 15, fontWeight: 700 }}>{location.city}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginTop: 6 }}>
                <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: 999, background: "var(--accent)" }} />
                <LiveTime timeZone={location.timeZone} />
                <span style={{ fontSize: 12, color: meta }}>local time</span>
              </div>
            </section>

            {/* About & Resume */}
            <section
              aria-label="About and resume"
              style={{ ...cardBase, padding: 20, display: "flex", flexDirection: "column", gap: 14 }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ fontSize: 15, fontWeight: 700 }}>{about.title}</span>
                <span style={{ fontSize: 13, lineHeight: 1.5, color: muted }}>{about.line}</span>
              </div>
              <a
                className="cta"
                href={about.resumeUrl ?? "#resume"}
                target={about.resumeUrl ? "_blank" : undefined}
                rel={about.resumeUrl ? "noopener" : undefined}
                onClick={about.resumeUrl ? undefined : (e) => e.preventDefault()}
                aria-disabled={about.resumeUrl ? undefined : true}
                title={about.resumeUrl ? undefined : "Resume coming soon"}
                style={{
                  height: 44,
                  borderRadius: 999,
                  background: "var(--accent)",
                  color: "#000000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                View resume
              </a>
            </section>

          </aside>

          {/* ============ MAIN ============ */}
          <main className="main" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <h2 className="sr-only">Featured case studies</h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))",
                gap: 10,
              }}
            >
              {caseStudies.map((cs, i) => (
                <CaseCard key={cs.slug} cs={cs} onClick={linkOpen(i)} />
              ))}
            </div>

            <h2 className="sr-only">Visual work</h2>
            <Masonry
              items={[
                {
                  key: "gallery",
                  ratio: 5 / 4,
                  node: <PhotoCarousel onOpen={() => openAt(galleryIdx)} />,
                },
                ...visualWork.map((w, i) => ({
                  key: w.id,
                  ratio: workRatio(w),
                  node: <WorkCard w={w} onClick={() => openAt(workIdx(i))} />,
                })),
              ]}
            />
          </main>
        </div>
      </div>

      {/* Sticky name pill */}
      <button
        className="name-pill icon-btn"
        onClick={() => {
          const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
        }}
        aria-label="Back to top"
        tabIndex={showPill && open === null ? 0 : -1}
        aria-hidden={!(showPill && open === null)}
        style={{
          position: "fixed",
          left: 12,
          top: 12,
          zIndex: 40,
          display: "flex",
          alignItems: "center",
          gap: 10,
          height: 44,
          padding: "0 14px 0 6px",
          border: 0,
          borderRadius: 999,
          background: "rgba(12,12,12,0.94)",
          WebkitBackdropFilter: "blur(14px)",
          backdropFilter: "blur(14px)",
          color: "var(--text)",
          font: "inherit",
          cursor: "pointer",
          opacity: showPill && open === null ? 1 : 0,
          transform: showPill && open === null ? "translateY(0)" : "translateY(-8px)",
          pointerEvents: showPill && open === null ? "auto" : "none",
          boxShadow: "0 6px 24px rgba(0,0,0,0.5)",
        }}
      >
        <Avatar size={32} />
        <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "-0.01em" }}>{profile.name}</span>
        <span style={{ color: meta, display: "flex" }}>
          <ArrowUp />
        </span>
      </button>

      {open !== null && (
        <Lightbox
          item={items[open]}
          focusClose={openedFromGrid.current}
          onClose={close}
          onPrev={() => go(-1)}
          onNext={() => go(1)}
        />
      )}
    </>
  );
}

/* ---------------- Pieces ---------------- */

function carouselArrow(side: "left" | "right") {
  return {
    position: "absolute" as const,
    [side]: 10,
    top: "50%",
    marginTop: -22,
    width: 44,
    height: 44,
    borderRadius: 999,
    border: 0,
    background: "rgba(0,0,0,0.55)",
    color: "var(--text)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
}

function Avatar({ size }: { size: number }) {
  if (profile.photo) {
    return (
      <div style={{ width: size, height: size, borderRadius: 999, overflow: "hidden", flexShrink: 0 }}>
        <Media img={profile.photo} label="" cover aspect="1 / 1" sizes={`${size}px`} priority />
      </div>
    );
  }
  return (
    <div
      role="img"
      aria-label="Profile photo placeholder"
      className="ph"
      style={{
        width: size,
        height: size,
        borderRadius: 999,
        background: "rgba(232,220,214,0.10)",
        fontSize: size > 40 ? 10 : 7,
        flexShrink: 0,
      }}
    >
      [PHOTO]
    </div>
  );
}

function ProfileCard({ ref }: { ref: React.Ref<HTMLElement> }) {
  const strong = { color: "var(--text)" };
  const bullets = [
    <>
      <span style={strong}>30+ experiences shipped</span> for a portal with <span style={strong}>1.1M+ annual visits</span>
    </>,
    <>
      Onboarding drop-off cut from <span style={strong}>35% to 20%</span>
    </>,
    <>
      Time-to-publish cut from two weeks to <span style={strong}>3–4 days</span>
    </>,
  ];

  return (
    <section
      ref={ref}
      className="span-all"
      aria-label={`About ${profile.name}`}
      style={{ ...cardBase, padding: "22px 22px 20px", display: "flex", flexDirection: "column", gap: 14 }}
    >
      <Avatar size={60} />
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em" }}>{profile.name}</h1>
        <p style={{ margin: 0, fontSize: 13, color: muted }}>
          {profile.title} @{" "}
          <span style={{ color: "var(--text)", textDecoration: "underline", textUnderlineOffset: 3 }}>
            {profile.company}
          </span>
        </p>
      </div>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.55, color: muted }}>{profile.intro}</p>
      <ul
        style={{
          margin: 0,
          padding: 0,
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
          gap: 7,
          fontSize: 13,
          lineHeight: 1.45,
          color: muted,
        }}
      >
        {bullets.map((b, i) => (
          <li key={i} style={{ display: "flex", gap: 10 }}>
            <span
              aria-hidden="true"
              style={{ flexShrink: 0, width: 4, height: 4, marginTop: 8, borderRadius: 999, background: "var(--text)" }}
            />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.55, color: muted }}>{profile.closing}</p>
      <div style={{ display: "flex", alignItems: "center", gap: 8, paddingTop: 4, flexWrap: "nowrap" }}>
        <a
          className="icon-btn"
          href={profile.linkedin}
          target="_blank"
          rel="noopener"
          aria-label="LinkedIn profile (opens in a new tab)"
          style={{
            flexShrink: 0,
            width: 44,
            height: 44,
            borderRadius: 999,
            background: "rgba(232,220,214,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
            color: "var(--text)",
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          in
        </a>
        <a
          className="cta"
          href={`mailto:${profile.email}`}
          style={{
            flex: "1 1 auto",
            minWidth: 0,
            height: 44,
            borderRadius: 999,
            background: "var(--accent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            textDecoration: "none",
            color: "#000000",
            fontSize: 13,
            fontWeight: 700,
            padding: "0 16px",
          }}
        >
          <Mail />
          <span style={{ minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {profile.email}
          </span>
        </a>
      </div>
    </section>
  );
}

function CaseCard({ cs, onClick }: { cs: CaseStudy; onClick: (e: MouseEvent<HTMLAnchorElement>) => void }) {
  return (
    <a
      href={`/work/${cs.slug}`}
      onClick={onClick}
      className="card-hover"
      aria-label={`Read case study ${cs.num}: ${cs.title}. ${cs.role}, ${cs.outcome}`}
      style={{ ...cardBase, overflow: "hidden", display: "block", textDecoration: "none", color: "inherit" }}
    >
      {cs.preview ? (
        <CaseStudyPreview kind={cs.preview} priority />
      ) : (
        <Media img={cs.hero} label="[CASE STUDY HERO IMAGE]" aspect="16 / 10" cover priority sizes="(max-width: 1023px) 100vw, 40vw" />
      )}
      <div
        style={{
          padding: "16px 18px 18px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 5, minWidth: 0 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "var(--accent)" }}>
            CASE STUDY {cs.num}
          </span>
          <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.015em" }}>{cs.title}</span>
          <span style={{ fontSize: 13, color: muted, textWrap: "balance" }}>
            {cs.role} · {cs.outcome}
          </span>
        </div>
        <span aria-hidden="true" style={{ flexShrink: 0, fontSize: 12, fontWeight: 500, whiteSpace: "nowrap" }}>
          Read case study →
        </span>
      </div>
    </a>
  );
}

function WorkCard({ w, onClick }: { w: VisualWork; onClick: () => void }) {
  return (
    <button
      className="reset card-hover"
      aria-label={`Open project: ${w.title}, ${w.type}${w.result ? `. ${w.result}` : ""}${w.compare ? ". Before and after" : ""}`}
      onClick={onClick}
      style={{ ...cardBase, overflow: "hidden" }}
    >
      {w.animated === "crm-events" && w.image ? (
        <CrmEventsPreview still={w.image} />
      ) : w.video ? (
        <LoopVideo src={w.video.src} poster={w.video.poster} />
      ) : w.compare ? (
        <BeforeAfter before={w.compare.before} after={w.compare.after} delay={beforeAfterDelay(w.id)} />
      ) : (
        <Media
          img={w.image}
          label={`[IMAGE ${w.id.replace("work-", "")}]`}
          height={w.image ? undefined : w.placeholderHeight}
          sizes="(max-width: 479px) 100vw, (max-width: 767px) 50vw, (max-width: 1279px) 30vw, 22vw"
        />
      )}
      {(w.captioned || w.result) && (
        <div style={{ padding: "12px 14px 14px", display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontSize: 13, fontWeight: 500 }}>{w.title}</span>
          {w.result && (
            <span style={{ display: "flex", gap: 7, fontSize: 12, lineHeight: 1.4, fontWeight: 500 }}>
              <span
                aria-hidden="true"
                style={{ flexShrink: 0, width: 5, height: 5, marginTop: 6, borderRadius: 999, background: "var(--accent)" }}
              />
              {w.result}
            </span>
          )}
          <span style={{ fontSize: 11, color: meta }}>{w.type}</span>
        </div>
      )}
    </button>
  );
}

/* ---------------- Masonry ---------------- */

/** Approximate height / width of a wall card, used to balance the columns. */
function workRatio(w: VisualWork) {
  const caption = w.captioned || w.result ? (w.result ? 0.34 : 0.24) : 0;
  if (w.video) return w.video.poster.height / w.video.poster.width + caption;
  if (w.compare) return w.compare.after.height / w.compare.after.width + caption;
  if (w.image) return w.image.height / w.image.width + caption;
  return w.placeholderHeight / 260 + caption;
}

/* Column counts from the approved layout: 5 / 4 / 3 / 2 / 1 */
const COLUMN_QUERIES: [string, number][] = [
  ["(min-width: 1600px)", 5],
  ["(min-width: 1280px)", 4],
  ["(min-width: 768px)", 3],
  ["(min-width: 480px)", 2],
];

function useColumnCount() {
  const [cols, setCols] = useState<number | null>(null);
  useEffect(() => {
    const mqs = COLUMN_QUERIES.map(([q, n]) => [window.matchMedia(q), n] as const);
    const update = () => setCols(mqs.find(([m]) => m.matches)?.[1] ?? 1);
    update();
    mqs.forEach(([m]) => m.addEventListener("change", update));
    return () => mqs.forEach(([m]) => m.removeEventListener("change", update));
  }, []);
  return cols;
}

/**
 * Fills across rows: each card goes into the shortest column, so the first
 * cards in the list always sit along the top of the wall. Before the column
 * count is known (server render), it falls back to CSS columns.
 */
function Masonry({ items }: { items: { key: string; ratio: number; node: React.ReactNode }[] }) {
  const cols = useColumnCount();
  if (cols === null) {
    return (
      <div className="masonry">
        {items.map((it) => (
          <div key={it.key} className="m-item">
            {it.node}
          </div>
        ))}
      </div>
    );
  }
  const columns: (typeof items)[] = Array.from({ length: cols }, () => []);
  const heights = new Array(cols).fill(0);
  for (const it of items) {
    const c = heights.indexOf(Math.min(...heights));
    columns[c].push(it);
    heights[c] += it.ratio + 0.04;
  }
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
      {columns.map((col, i) => (
        <div key={i} style={{ flex: "1 1 0", minWidth: 0, display: "flex", flexDirection: "column", gap: 10 }}>
          {col.map((it) => (
            <div key={it.key}>{it.node}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ---------------- Photo gallery carousel ---------------- */

const SLIDE_MS = 5000;

/**
 * Rotates through the photo set every few seconds with a crossfade. Pauses on
 * hover or keyboard focus, while off screen or in a background tab, and when
 * the visitor presses pause. Reduced motion starts paused.
 */
function PhotoCarousel({ onOpen }: { onOpen: () => void }) {
  const photos = photoStack.photos;
  const n = photos.length;
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [onScreen, setOnScreen] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPaused(true);
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const running = !paused && !hovering && onScreen && n > 1;
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      if (!document.hidden) setSlide((s) => (s + 1) % n);
    }, SLIDE_MS);
    return () => clearInterval(id);
  }, [running, n, slide]); // restarting on slide change gives a full interval after a manual step

  const go = (d: 1 | -1) => setSlide((s) => (s + d + n) % n);
  const cur = photos[slide];

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="carousel"
      aria-label={photoStack.title}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setHovering(false);
      }}
      style={{ position: "relative", ...cardBase, overflow: "hidden", aspectRatio: "4 / 5" }}
    >
      <button
        className="reset"
        aria-label={`Open ${photoStack.title}: ${cur.caption}, photo ${slide + 1} of ${n}`}
        onClick={onOpen}
        style={{ position: "absolute", inset: 0 }}
      >
        {photos.map((ph, i) => (
          <div
            key={ph.img.src}
            className="gallery-slide"
            aria-hidden={i !== slide}
            style={{ opacity: i === slide ? 1 : 0 }}
          >
            {/* Blurred fill behind, whole photo in front, so landscape shots aren't cropped */}
            <Image
              src={ph.img.src}
              alt=""
              fill
              sizes="40px"
              style={{ objectFit: "cover", filter: "blur(24px) brightness(0.55)", transform: "scale(1.15)" }}
            />
            <Image
              src={ph.img.src}
              alt={ph.img.alt}
              fill
              sizes="(max-width: 479px) 100vw, (max-width: 767px) 50vw, (max-width: 1279px) 30vw, 22vw"
              placeholder={ph.img.blurDataURL ? "blur" : "empty"}
              blurDataURL={ph.img.blurDataURL}
              priority={i === 0}
              style={{ objectFit: "contain" }}
            />
          </div>
        ))}
      </button>
      <button className="icon-btn" aria-label="Previous photo" onClick={() => go(-1)} style={carouselArrow("left")}>
        <ChevronLeft />
      </button>
      <button className="icon-btn" aria-label="Next photo" onClick={() => go(1)} style={carouselArrow("right")}>
        <ChevronRight />
      </button>
      <div
        style={{
          position: "absolute",
          left: 10,
          right: 10,
          bottom: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
          pointerEvents: "none",
        }}
      >
        <span
          aria-live={running ? "off" : "polite"}
          style={{ background: "rgba(0,0,0,0.65)", borderRadius: 8, padding: "6px 10px", fontSize: 11, fontWeight: 500, minWidth: 0 }}
        >
          {cur.caption}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <div style={{ display: "flex", gap: 4 }} aria-hidden="true">
            {photos.map((_, d) => (
              <span
                key={d}
                style={{
                  display: "block",
                  width: 6,
                  height: 6,
                  borderRadius: 999,
                  background: d === slide ? "var(--text)" : "rgba(232,220,214,0.3)",
                }}
              />
            ))}
          </div>
          <button
            className="icon-btn"
            aria-label={paused ? "Play slideshow" : "Pause slideshow"}
            aria-pressed={paused}
            onClick={() => setPaused((p) => !p)}
            style={{
              pointerEvents: "auto",
              width: 28,
              height: 28,
              borderRadius: 999,
              border: 0,
              background: "rgba(0,0,0,0.55)",
              color: "var(--text)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {paused ? (
              <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 1l7 4-7 4z" fill="currentColor" /></svg>
            ) : (
              <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 1h2v8H2zM6 1h2v8H6z" fill="currentColor" /></svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
