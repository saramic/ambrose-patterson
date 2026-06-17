import { AcvaLogo } from "./AcvaLogo";

export function BookCoverMockup({ className }: { className?: string }) {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        width: "280px",
        height: "360px",
        boxShadow: "8px 8px 32px oklch(0.16 0.018 55 / 0.35)",
        borderRadius: "2px",
        overflow: "hidden",
        flexShrink: 0,
      }}>
      {/* Spine */}
      <div
        style={{
          width: "32px",
          background: "oklch(0.50 0.21 3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}>
        <span
          style={{
            color: "white",
            fontSize: "9px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontFamily: "var(--font-heading), serif",
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            whiteSpace: "nowrap",
          }}>
          Ambrose Patterson
        </span>
      </div>
      {/* Front cover */}
      <div
        style={{
          flex: 1,
          background:
            "linear-gradient(155deg, oklch(0.78 0.11 80) 0%, oklch(0.68 0.10 110) 30%, oklch(0.55 0.12 250 / 0.6) 65%, oklch(0.62 0.13 40) 100%)",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "20px 18px",
        }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, oklch(0.16 0.018 55 / 0.72) 0%, transparent 55%)",
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h3
            style={{
              color: "white",
              fontFamily: "var(--font-heading), serif",
              fontSize: "22px",
              lineHeight: 1.1,
              fontWeight: 700,
              marginBottom: "6px",
              letterSpacing: "0.01em",
            }}>
            AMBROSE
            <br />
            PATTERSON
          </h3>
          <p
            style={{
              color: "white",
              fontFamily: "var(--font-heading), serif",
              fontSize: "12px",
              fontStyle: "italic",
              marginBottom: "14px",
              opacity: 0.9,
            }}>
            His Life &amp; Art
          </p>
          <p
            style={{
              color: "white",
              fontFamily: "var(--font-sans), sans-serif",
              fontSize: "9px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              opacity: 0.8,
            }}>
            Jane Alexander
          </p>
        </div>
        {/* ACVA logo */}
        <div
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            zIndex: 1,
            opacity: 0.9,
          }}>
          <AcvaLogo size={36} className="text-white" />
        </div>
      </div>
    </div>
  );
}
