"use client";

import { useEffect, useRef } from "react";
import { carousel, photoStack, type CaseStudy, type VisualWork } from "@/lib/content";
import { CaseStudyArticle } from "./CaseStudyArticle";
import { Media } from "./Media";
import { ChevronLeft, ChevronRight, Close } from "./Icons";

export type LightboxItem =
  | { kind: "case"; cs: CaseStudy }
  | { kind: "carousel" }
  | { kind: "stack" }
  | { kind: "work"; w: VisualWork };

function describe(item: LightboxItem) {
  switch (item.kind) {
    case "case":
      return { key: item.cs.slug, title: item.cs.title, sub: `${item.cs.role} · ${item.cs.product}` };
    case "carousel":
      return { key: carousel.id, title: carousel.title, sub: carousel.type };
    case "stack":
      return { key: photoStack.id, title: photoStack.title, sub: photoStack.type };
    case "work":
      return { key: item.w.id, title: item.w.title, sub: item.w.type };
  }
}

const btn = {
  position: "absolute" as const,
  width: 44,
  height: 44,
  borderRadius: 999,
  border: 0,
  background: "rgba(232,220,214,0.10)",
  color: "var(--text)",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 2,
};

export function Lightbox({
  item,
  onClose,
  onPrev,
  onNext,
  focusClose = true,
}: {
  focusClose?: boolean;
  item: LightboxItem;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const { key, title, sub } = describe(item);

  useEffect(() => {
    // Opened from the grid: move focus in. Opened from a shared link: focus the dialog quietly.
    if (focusClose) closeRef.current?.focus({ preventScroll: true });
    else dialogRef.current?.focus({ preventScroll: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // New item: start at the top of the frame
  useEffect(() => {
    frameRef.current?.scrollTo({ top: 0 });
  }, [key]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        onPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        onNext();
      } else if (e.key === "Tab" && dialogRef.current) {
        const nodes = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'button, a[href], [tabindex]:not([tabindex="-1"])'
          )
        ).filter((n) => !n.hasAttribute("disabled"));
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        const active = document.activeElement;
        if (e.shiftKey && (active === first || !dialogRef.current.contains(active))) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && (active === last || !dialogRef.current.contains(active))) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  return (
    <div
      ref={dialogRef}
      className="overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lb-title"
      tabIndex={-1}
      onTouchStart={(e) => {
        const t = e.touches[0];
        touch.current = { x: t.clientX, y: t.clientY };
      }}
      onTouchEnd={(e) => {
        const start = touch.current;
        touch.current = null;
        if (!start) return;
        const t = e.changedTouches[0];
        const dx = t.clientX - start.x;
        const dy = t.clientY - start.y;
        if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
          if (dx < 0) onNext();
          else onPrev();
        }
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        background: "rgba(0,0,0,0.7)",
        WebkitBackdropFilter: "blur(22px)",
        backdropFilter: "blur(22px)",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 20,
          top: 18,
          right: 80,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          minWidth: 0,
        }}
      >
        <span
          id="lb-title"
          style={{ fontSize: 13, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
        >
          {title}
        </span>
        <span style={{ fontSize: 11, color: "rgba(232,220,214,0.6)" }}>{sub}</span>
      </div>

      <button ref={closeRef} className="icon-btn" aria-label="Close" onClick={onClose} style={{ ...btn, right: 16, top: 14 }}>
        <Close />
      </button>
      <button className="icon-btn lb-arrow" aria-label="Previous project" onClick={onPrev} style={{ ...btn, left: 14 }}>
        <ChevronLeft />
      </button>
      <button className="icon-btn lb-arrow" aria-label="Next project" onClick={onNext} style={{ ...btn, right: 14 }}>
        <ChevronRight />
      </button>

      <div ref={frameRef} key={key} className="frame" tabIndex={-1}>
        {item.kind === "case" ? (
          <CaseStudyArticle cs={item.cs} />
        ) : (
          <VisualDetail item={item} />
        )}
      </div>
    </div>
  );
}

const metaColor = "rgba(232,220,214,0.6)";

function Summary({ s }: { s: NonNullable<VisualWork["summary"]> }) {
  const p = { margin: 0, fontSize: "clamp(16px, 1.25vw, 18px)", lineHeight: 1.6, color: "var(--text-muted)", textWrap: "pretty" } as const;
  return (
    <div style={{ padding: "32px clamp(20px, 6%, 56px)", display: "flex", flexDirection: "column", gap: 16 }}>
      <p style={p}>{s.about}</p>
      {s.did && <p style={p}>{s.did}</p>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10, marginTop: 8 }}>
        {s.results.map((r) => (
          <div
            key={r}
            style={{ background: "rgba(232,220,214,0.05)", borderRadius: 12, padding: "16px 18px", display: "flex", flexDirection: "column", gap: 6 }}
          >
            <span style={{ fontSize: 12, fontWeight: 500, color: metaColor }}>Result</span>
            <span style={{ fontSize: "clamp(16px, 1.3vw, 19px)", fontWeight: 700, lineHeight: 1.35, textWrap: "balance" }}>{r}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function VisualDetail({ item }: { item: Exclude<LightboxItem, { kind: "case" }> }) {
  if (item.kind === "stack" && photoStack.photos.length) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 28, padding: "10px 10px 28px" }}>
        {photoStack.photos.map((ph) => (
          <figure key={ph.img.src} style={{ margin: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <Media
              img={ph.img}
              label=""
              sizes="(max-width: 1580px) 100vw, 1420px"
              style={{ borderRadius: 10, width: `min(100%, calc((100vh - 180px) * ${ph.img.width / ph.img.height}))`, height: "auto" }}
            />
            <figcaption style={{ fontSize: 13, fontWeight: 500, padding: "0 4px", textAlign: "center" }}>{ph.caption}</figcaption>
          </figure>
        ))}
      </div>
    );
  }
  if (item.kind === "work" && item.w.compare) {
    const { before, after } = item.w.compare;
    return (
      <div className="fig-grid pair" style={{ padding: 10 }}>
        {[
          { img: before, label: "Before" },
          { img: after, label: "After" },
        ].map((x) => (
          <div key={x.label} style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 0 }}>
            <span style={{ fontSize: 11, fontWeight: 500, color: metaColor, padding: "4px 2px 0", textAlign: "center" }}>{x.label}</span>
            <Media img={x.img} label="" sizes="(max-width: 1580px) 50vw, 710px" style={{ borderRadius: 10, width: `min(100%, calc((100vh - 140px) * ${x.img.width / x.img.height}))`, height: "auto", margin: "0 auto" }} />
          </div>
        ))}
      </div>
    );
  }

  const imgs =
    item.kind === "work"
      ? item.w.detail?.length
        ? item.w.detail // the wall thumbnail isn't repeated when there are detail images
        : item.w.image
          ? [item.w.image]
          : []
      : item.kind === "carousel"
        ? carousel.slides.flatMap((s) => (s.image ? [s.image] : []))
        : photoStack.photos.map((ph) => ph.img);

  if (imgs.length) {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        {item.kind === "work" && item.w.summary && <Summary s={item.w.summary} />}
        {imgs.map((img) => (
          <Media key={img.src} img={img} label="" sizes="(max-width: 1580px) 100vw, 1440px" />
        ))}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Media label="[FULL-PAGE DESIGN: scrolls inside this frame]" height={760} />
      <Media label="[CONTINUED]" height={620} style={{ background: "rgba(232,220,214,0.035)" }} />
    </div>
  );
}
