import type { CaseStudy } from "@/lib/content";
import { Media } from "./Media";

const muted = "var(--text-muted)";

export function CaseStudyArticle({ cs, headingId }: { cs: CaseStudy; headingId?: string }) {
  return (
    <article style={{ display: "flex", flexDirection: "column" }}>
      <Media
        img={cs.hero}
        label="[CASE STUDY HERO IMAGE]"
        aspect="16 / 8"
        cover
        priority
        sizes="(max-width: 1100px) 100vw, 960px"
      />
      <div
        style={{
          padding: "48px clamp(24px, 6%, 72px) 64px",
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

        <dl
          style={{
            margin: 0,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: 10,
          }}
        >
          {cs.meta.map((m) => (
            <div
              key={m.label}
              style={{
                background: "rgba(232,220,214,0.05)",
                borderRadius: 12,
                padding: "14px 16px",
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <dt style={{ fontSize: 11, fontWeight: 500, color: "rgba(232,220,214,0.6)" }}>{m.label}</dt>
              <dd style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>{m.value}</dd>
            </div>
          ))}
        </dl>

        {cs.sections.map((s, i) => (
          <section key={s.title} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "rgba(232,220,214,0.6)",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 style={{ margin: 0, fontSize: 24, fontWeight: 700, letterSpacing: "-0.015em" }}>{s.title}</h3>
            </div>
            {s.body.map((p, j) => (
              <p key={j} style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: muted, maxWidth: 680 }}>
                {p}
              </p>
            ))}
            {s.images?.map((img) => (
              <Media key={img.src} img={img} label="" sizes="(max-width: 1100px) 100vw, 820px" style={{ borderRadius: 12 }} />
            ))}
            {!s.images?.length && s.placeholderImage && (
              <Media label={`[${s.title.toUpperCase()} IMAGE]`} aspect="16 / 9" style={{ borderRadius: 12 }} />
            )}
          </section>
        ))}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
          {cs.impact.map((k, i) => (
            <div
              key={i}
              style={{
                background: "rgba(232,220,214,0.05)",
                borderRadius: 12,
                padding: 20,
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              <span style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--accent)" }}>
                {k.metric}
              </span>
              <span style={{ fontSize: 13, color: muted }}>{k.label}</span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
