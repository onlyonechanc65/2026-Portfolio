import type { Block, CaseStudy, Figure } from "@/lib/content";
import { Media } from "./Media";
import { CaseStudyPreview, LoopVideo } from "./Previews";

const muted = "var(--text-muted)";
const meta = "rgba(232,220,214,0.6)";
const soft = "rgba(232,220,214,0.05)";
const measure = 680;

export function CaseStudyArticle({ cs, headingId }: { cs: CaseStudy; headingId?: string }) {
  return (
    <article style={{ display: "flex", flexDirection: "column" }}>
      {cs.heroVideo ? (
        <LoopVideo src={cs.heroVideo.src} poster={cs.heroVideo.poster} />
      ) : cs.preview ? (
        <CaseStudyPreview kind={cs.preview} aspect="16 / 9" priority />
      ) : (
        <Media img={cs.hero} label="[CASE STUDY HERO IMAGE]" aspect="16 / 8" cover priority sizes="(max-width: 1580px) 100vw, 1440px" />
      )}
      <div
        style={{
          padding: "48px clamp(20px, 6%, 72px) 64px",
          display: "flex",
          flexDirection: "column",
          gap: 44,
        }}
      >
        <header style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "var(--accent)" }}>
            CASE STUDY {cs.num}
          </span>
          <h2
            id={headingId}
            style={{
              margin: 0,
              fontSize: "clamp(32px, 4.4vw, 56px)",
              lineHeight: 1.05,
              fontWeight: 700,
              letterSpacing: "-0.025em",
            }}
          >
            {cs.title}
          </h2>
          <p style={{ margin: 0, fontSize: 17, lineHeight: 1.5, color: muted, maxWidth: 640 }}>{cs.summary}</p>
        </header>

        <dl style={{ margin: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10 }}>
          {cs.meta.map((m) => (
            <div
              key={m.label}
              style={{ background: soft, borderRadius: 12, padding: "14px 16px", display: "flex", flexDirection: "column", gap: 4 }}
            >
              <dt style={{ fontSize: 11, fontWeight: 500, color: meta }}>{m.label}</dt>
              <dd style={{ margin: 0, fontSize: 14, fontWeight: 500, lineHeight: 1.4 }}>{m.value}</dd>
            </div>
          ))}
        </dl>

        <Impact items={cs.impact} />

        {cs.sections.map((s, i) => (
          <section key={s.title} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: meta, fontVariantNumeric: "tabular-nums" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 style={{ margin: 0, fontSize: 24, fontWeight: 700, letterSpacing: "-0.015em" }}>{s.title}</h3>
            </div>
            {s.blocks.map((b, j) => (
              <BlockView key={j} b={b} />
            ))}
            {s.placeholderImage && <Media label={`[${s.title.toUpperCase()} IMAGE]`} aspect="16 / 9" style={{ borderRadius: 12 }} />}
          </section>
        ))}
      </div>
    </article>
  );
}

function Impact({ items }: { items: CaseStudy["impact"] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 10 }}>
      {items.map((k, i) => (
        <div key={i} style={{ background: soft, borderRadius: 12, padding: 20, display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 30, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--accent)", lineHeight: 1.1 }}>
            {k.metric}
          </span>
          <span style={{ fontSize: 13, lineHeight: 1.45, color: muted }}>{k.label}</span>
        </div>
      ))}
    </div>
  );
}

function BlockView({ b }: { b: Block }) {
  if ("p" in b) {
    return <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: muted, maxWidth: measure }}>{b.p}</p>;
  }
  if ("h" in b) {
    return (
      <h4 style={{ margin: "8px 0 -4px", fontSize: 17, fontWeight: 700, letterSpacing: "-0.01em", maxWidth: measure }}>{b.h}</h4>
    );
  }
  if ("list" in b) {
    return (
      <ul
        style={{
          margin: 0,
          padding: 0,
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          maxWidth: measure,
          fontSize: 15,
          lineHeight: 1.55,
          color: muted,
        }}
      >
        {b.list.map((li, i) => (
          <li key={i} style={{ display: "flex", gap: 12 }}>
            <span aria-hidden="true" style={{ flexShrink: 0, width: 4, height: 4, marginTop: 10, borderRadius: 999, background: "var(--text)" }} />
            <span>{li}</span>
          </li>
        ))}
      </ul>
    );
  }
  if ("callout" in b) {
    return (
      <aside
        aria-label={b.callout}
        style={{ background: soft, borderRadius: 12, padding: "18px 20px", display: "flex", flexDirection: "column", gap: 8, maxWidth: measure }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: meta }}>
          <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: 999, background: "var(--accent)" }} />
          {b.callout.toUpperCase()}
        </span>
        <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.01em", lineHeight: 1.35 }}>{b.title}</span>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: muted }}>{b.text}</p>
      </aside>
    );
  }
  if ("figure" in b) return <FigureView f={b.figure} />;
  if ("preview" in b) {
    return (
      <figure style={{ margin: "8px 0", display: "flex", flexDirection: "column", gap: 10 }}>
        <div role="img" aria-label={b.alt} style={{ borderRadius: 10, overflow: "hidden" }}>
          <CaseStudyPreview kind={b.preview} aspect="16 / 9" sizes="(max-width: 1580px) 100vw, 1300px" fullScroll />
        </div>
        <figcaption style={{ fontSize: 12, lineHeight: 1.5, color: meta, maxWidth: measure }}>{b.caption}</figcaption>
      </figure>
    );
  }
  if ("table" in b) {
    return (
      <div style={{ overflowX: "auto", maxWidth: measure + 40 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, lineHeight: 1.4 }}>
          <thead>
            <tr>
              {b.table.head.map((h, i) => (
                <th
                  key={h}
                  scope="col"
                  style={{
                    textAlign: i === 0 ? "left" : "right",
                    fontSize: 11,
                    fontWeight: 500,
                    color: meta,
                    padding: "0 0 10px",
                    paddingLeft: i === 0 ? 0 : 16,
                    borderBottom: "1px solid var(--line)",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {b.table.rows.map((r) => (
              <tr key={r[0]}>
                {r.map((c, i) =>
                  i === 0 ? (
                    <th key={i} scope="row" style={{ textAlign: "left", fontWeight: 400, color: muted, padding: "11px 0", borderBottom: "1px solid var(--line)" }}>
                      {c}
                    </th>
                  ) : (
                    <td
                      key={i}
                      style={{
                        textAlign: "right",
                        whiteSpace: "nowrap",
                        padding: "11px 0 11px 16px",
                        borderBottom: "1px solid var(--line)",
                        fontWeight: i === r.length - 1 ? 700 : 400,
                        color: i === r.length - 1 ? "var(--text)" : muted,
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {c}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  if ("quote" in b) {
    return (
      <figure style={{ margin: 0, maxWidth: measure, display: "flex", flexDirection: "column", gap: 10, paddingLeft: 18, borderLeft: "2px solid var(--line)" }}>
        <blockquote style={{ margin: 0, fontSize: 18, lineHeight: 1.45, fontWeight: 500, letterSpacing: "-0.01em" }}>
          &ldquo;{b.quote.text}&rdquo;
        </blockquote>
        <figcaption style={{ fontSize: 12, color: meta }}>
          <span style={{ color: "var(--text)", fontWeight: 500 }}>{b.quote.name}</span>, {b.quote.title}
        </figcaption>
      </figure>
    );
  }
  return null;
}

function FigureView({ f }: { f: Figure }) {
  const cols = f.layout === "stack" ? 1 : f.layout === "pair" ? 2 : 3;
  const sizes = cols === 1 ? "(max-width: 1580px) 100vw, 1300px" : cols === 2 ? "(max-width: 1580px) 50vw, 650px" : "(max-width: 560px) 100vw, 430px";
  return (
    <figure style={{ margin: "8px 0", display: "flex", flexDirection: "column", gap: 10, maxWidth: f.maxWidth }}>
      <div className={`fig-grid ${f.layout}`}>
        {f.items.map((it, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 0 }}>
            {it.label && <span style={{ fontSize: 11, fontWeight: 500, color: meta }}>{it.label}</span>}
            <Media img={it.img} label="" sizes={sizes} style={{ borderRadius: 10 }} />
          </div>
        ))}
      </div>
      <figcaption style={{ fontSize: 12, lineHeight: 1.5, color: meta, maxWidth: measure }}>{f.caption}</figcaption>
    </figure>
  );
}
