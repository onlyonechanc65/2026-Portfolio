"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import {
  about,
  carousel,
  caseStudies,
  clients,
  currentRole,
  location,
  photoStack,
  profile,
  visualWork,
  type CaseStudy,
  type VisualWork,
} from "@/lib/content";
import { Media } from "./Media";
import { CaseStudyPreview } from "./Previews";
import { LiveTime } from "./LiveTime";
import { Lightbox, type LightboxItem } from "./Lightbox";
import { ArrowUp, ChevronLeft, ChevronRight, Mail } from "./Icons";

const muted = "var(--text-muted)";
const meta = "rgba(232,220,214,0.6)";

const cardBase = { background: "var(--card)", borderRadius: 14 } as const;

/* Lightbox order: case studies, carousel, photo set, then the wall */
const items: LightboxItem[] = [
  ...caseStudies.map((cs): LightboxItem => ({ kind: "case", cs })),
  { kind: "carousel" },
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
  const [slide, setSlide] = useState(0);
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

  const carouselIdx = caseStudies.length;
  const stackIdx = caseStudies.length + 1;
  const workIdx = (i: number) => caseStudies.length + 2 + i;
  const slideCount = carousel.slides.length;

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

            {/* Currently at */}
            <section
              aria-label="Current role"
              style={{
                ...cardBase,
                padding: "18px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 14,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 3, minWidth: 0 }}>
                <span style={{ fontSize: 11, fontWeight: 500, color: meta }}>Currently at</span>
                <span style={{ fontSize: 15, fontWeight: 700 }}>{currentRole.company}</span>
                <span style={{ fontSize: 12, color: meta }}>{currentRole.role}</span>
                <span style={{ fontSize: 11, color: meta }}>{currentRole.years}</span>
              </div>
              {currentRole.logo ? (
                <div style={{ flexShrink: 0, width: 56, height: 56, borderRadius: 999, overflow: "hidden" }}>
                  <Media img={currentRole.logo} label="" cover aspect="1 / 1" sizes="56px" />
                </div>
              ) : (
                <div
                  role="img"
                  aria-label="Company logo placeholder"
                  className="ph"
                  style={{ flexShrink: 0, width: 56, height: 56, borderRadius: 999, background: "rgba(232,220,214,0.10)", fontSize: 9 }}
                >
                  [LOGO]
                </div>
              )}
            </section>

            {/* Clients */}
            <section
              aria-label="Clients and brands"
              style={{ ...cardBase, padding: "16px 20px 18px", display: "flex", flexDirection: "column", gap: 12 }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 500, color: meta }}>
                <span>Clients</span>
                <span>{clients.range}</span>
              </div>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", gap: 8, flexWrap: "wrap" }}>
                {clients.items.map((c, i) => (
                  <li key={i} title={c.name}>
                    {c.logo ? (
                      <div style={{ width: 28, height: 28, borderRadius: 999, overflow: "hidden" }}>
                        <Media img={c.logo} label="" cover aspect="1 / 1" sizes="28px" />
                      </div>
                    ) : (
                      <div
                        role="img"
                        aria-label="Client logo placeholder"
                        style={{ width: 28, height: 28, borderRadius: 999, background: "rgba(232,220,214,0.12)" }}
                      />
                    )}
                  </li>
                ))}
              </ul>
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

            {/* Photo stack */}
            <button
              className="reset card-hover span-all"
              aria-label={`Open photo set: ${photoStack.title}`}
              onClick={() => openAt(stackIdx)}
              style={{ ...cardBase, padding: "16px 18px 26px" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 500, marginBottom: 18 }}>
                <span>{photoStack.title}</span>
                <span style={{ color: meta }}>{photoStack.photos.length || photoStack.count}</span>
              </div>
              <div aria-hidden="true" style={{ position: "relative", height: 170 }}>
                {[
                  { left: "18%", top: 6, rot: -8, bg: "#1d1c1b" },
                  { left: "28%", top: 14, rot: 6, bg: "#262423" },
                  { left: "21%", top: 22, rot: -1, bg: "#302e2c" },
                ].map((p, i) => {
                  const img = photoStack.photos[i];
                  return (
                    <div
                      key={i}
                      className={img ? undefined : "ph"}
                      style={{
                        position: "absolute",
                        left: p.left,
                        top: p.top,
                        width: "58%",
                        height: 140,
                        borderRadius: 10,
                        background: p.bg,
                        transform: `rotate(${p.rot}deg)`,
                        boxShadow: "0 6px 20px rgba(0,0,0,0.6)",
                        overflow: "hidden",
                        fontSize: 10,
                      }}
                    >
                      {img ? <Media img={img} label="" cover style={{ height: "100%" }} sizes="200px" /> : i === 2 ? "[PHOTO]" : null}
                    </div>
                  );
                })}
              </div>
            </button>
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
            <div className="masonry">
              {/* Carousel */}
              <div className="m-item" style={{ position: "relative", ...cardBase, overflow: "hidden" }}>
                <button
                  className="reset"
                  aria-label={`Open ${carousel.title}, slide ${slide + 1} of ${slideCount}`}
                  onClick={() => openAt(carouselIdx)}
                >
                  <Media
                    img={carousel.slides[slide].image}
                    label={`[CAROUSEL IMAGE ${slide + 1} / ${slideCount}]`}
                    aspect="4 / 5"
                    cover
                  />
                </button>
                <button
                  className="icon-btn"
                  aria-label="Previous slide"
                  onClick={() => setSlide((s) => (s - 1 + slideCount) % slideCount)}
                  style={carouselArrow("left")}
                >
                  <ChevronLeft />
                </button>
                <button
                  className="icon-btn"
                  aria-label="Next slide"
                  onClick={() => setSlide((s) => (s + 1) % slideCount)}
                  style={carouselArrow("right")}
                >
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
                    aria-live="polite"
                    style={{ background: "rgba(0,0,0,0.65)", borderRadius: 8, padding: "6px 10px", fontSize: 11, fontWeight: 500 }}
                  >
                    {carousel.slides[slide].caption}
                  </span>
                  <div style={{ display: "flex", gap: 4 }} aria-hidden="true">
                    {carousel.slides.map((_, d) => (
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
                </div>
              </div>

              {visualWork.map((w, i) => (
                <WorkCard key={w.id} w={w} onClick={() => openAt(workIdx(i))} />
              ))}
            </div>
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
          <span style={{ fontSize: 13, color: muted }}>
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
      className="reset card-hover m-item"
      aria-label={`Open project: ${w.title}, ${w.type}`}
      onClick={onClick}
      style={{ ...cardBase, overflow: "hidden" }}
    >
      <Media img={w.image} label={`[IMAGE ${w.id.replace("work-", "")}]`} height={w.image ? undefined : w.placeholderHeight} />
      {w.captioned && (
        <div style={{ padding: "12px 14px 14px", display: "flex", flexDirection: "column", gap: 3 }}>
          <span style={{ fontSize: 13, fontWeight: 500 }}>{w.title}</span>
          <span style={{ fontSize: 11, color: meta }}>{w.type}</span>
        </div>
      )}
    </button>
  );
}
