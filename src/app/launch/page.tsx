import type { Metadata } from "next";
import Link from "next/link";
import { AcvaLogo } from "@/components/book/AcvaLogo";
import { LaunchCountdown } from "@/components/book/LaunchCountdown";

export const metadata: Metadata = {
  title: "15 · VIII · 2026 — Ambrose Patterson",
  description:
    "Something is coming to light. Melbourne, Victoria. 15 August 2026.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/launch" },
};

const DARK = "oklch(0.07 0.01 55)";
const CREAM = "oklch(0.93 0.01 80)";
const SPINE_RED = "oklch(0.665 0.178 20.1)";
const GOLD = "oklch(0.72 0.09 80)";
const DIM = "oklch(0.38 0.01 75)";
const SUBTLE = "oklch(0.20 0.01 60)";

function Rule() {
  return (
    <div
      aria-hidden
      style={{
        width: "100%",
        height: "1px",
        background: `linear-gradient(to right, transparent, oklch(0.93 0.01 80 / 0.10), transparent)`,
      }}
    />
  );
}

function VLine({ color = DIM }: { color?: string }) {
  return (
    <div
      aria-hidden
      style={{
        width: "1px",
        height: "52px",
        background: `linear-gradient(to bottom, transparent, ${color}, transparent)`,
        margin: "0 auto",
      }}
    />
  );
}

export default function LaunchPage() {
  return (
    <div
      style={{
        minHeight: "100dvh",
        backgroundColor: DARK,
        color: CREAM,
        fontFamily: "var(--font-serif), serif",
        overflowX: "hidden",
        position: "relative",
      }}>
      {/* Atmospheric gradient */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          background: `
            radial-gradient(ellipse 70% 50% at 50% 20%, oklch(0.665 0.178 20.1 / 0.07) 0%, transparent 65%),
            radial-gradient(ellipse 50% 70% at 80% 80%, oklch(0.72 0.09 80 / 0.04) 0%, transparent 55%)
          `,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Dot-grid texture */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: `radial-gradient(oklch(0.93 0.01 80 / 0.025) 1px, transparent 1px)`,
          backgroundSize: "36px 36px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Inset border — invitation feel */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: "20px",
          border: `1px solid oklch(0.93 0.01 80 / 0.07)`,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <div style={{ position: "relative", zIndex: 2 }}>
        {/* Top bar */}
        <div
          style={{
            padding: "clamp(20px, 4vw, 32px) clamp(28px, 6vw, 56px)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <div style={{ color: CREAM }}>
            <AcvaLogo size={26} />
          </div>
          <p
            style={{
              fontSize: "8px",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: DIM,
            }}>
            Private · By Invitation
          </p>
        </div>

        {/* ── HERO ────────────────────────────────────────────── */}
        <section
          style={{
            minHeight: "70vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "clamp(32px, 6vw, 60px) clamp(28px, 6vw, 56px)",
            gap: "clamp(20px, 3vw, 32px)",
          }}>
          {/* Ornament row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(12px, 2vw, 20px)",
            }}>
            <div
              style={{
                width: "clamp(32px, 6vw, 72px)",
                height: "1px",
                background: SPINE_RED,
                opacity: 0.45,
              }}
            />
            <span
              style={{
                color: SPINE_RED,
                fontSize: "8px",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
              }}>
              ACVA · Melbourne · MMXXVI
            </span>
            <div
              style={{
                width: "clamp(32px, 6vw, 72px)",
                height: "1px",
                background: SPINE_RED,
                opacity: 0.45,
              }}
            />
          </div>

          {/* Date */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <h1
              style={{
                fontSize: "clamp(72px, 18vw, 160px)",
                fontWeight: 700,
                lineHeight: 0.85,
                letterSpacing: "-0.03em",
                color: CREAM,
                margin: 0,
              }}>
              15
            </h1>
            <p
              style={{
                fontSize: "clamp(16px, 3vw, 28px)",
                letterSpacing: "0.40em",
                textTransform: "uppercase",
                color: GOLD,
                fontWeight: 400,
                margin: 0,
              }}>
              August · 2026
            </p>
          </div>

          {/* Time + place */}
          <p
            style={{
              fontSize: "clamp(11px, 1.4vw, 14px)",
              letterSpacing: "0.18em",
              color: DIM,
              fontStyle: "italic",
              margin: 0,
            }}>
            Five o&apos;clock in the afternoon · Melbourne, Victoria
          </p>

          <VLine color={SPINE_RED} />

          {/* Countdown */}
          <LaunchCountdown />

          <VLine />

          <p
            style={{
              fontSize: "9px",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: DIM,
              margin: 0,
            }}>
            Books available from this evening
          </p>
        </section>

        {/* ── WAX SEAL ────────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "clamp(24px, 4vw, 48px) 0",
          }}>
          <div
            style={{
              width: "88px",
              height: "88px",
              borderRadius: "50%",
              backgroundColor: SPINE_RED,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 0 1px oklch(0.665 0.178 20.1 / 0.40), 0 0 32px oklch(0.665 0.178 20.1 / 0.25), 0 0 64px oklch(0.665 0.178 20.1 / 0.10)`,
            }}>
            <div style={{ color: "white" }}>
              <AcvaLogo size={50} />
            </div>
          </div>
        </div>

        {/* ── NARRATIVE ───────────────────────────────────────── */}
        <section
          style={{
            maxWidth: "560px",
            margin: "0 auto",
            padding: "clamp(32px, 5vw, 60px) clamp(28px, 6vw, 56px)",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: "clamp(20px, 3vw, 28px)",
          }}>
          <Rule />

          <p
            style={{
              fontSize: "clamp(17px, 2.2vw, 22px)",
              fontStyle: "italic",
              lineHeight: 1.65,
              color: `oklch(0.78 0.01 80)`,
              margin: 0,
            }}>
            Something long kept in shadow is about to come to light.
          </p>

          <p
            style={{
              fontSize: "clamp(12px, 1.4vw, 14px)",
              lineHeight: 1.95,
              color: DIM,
              margin: 0,
            }}>
            For nine decades, the full story of Ambrose Patterson — Australian
            modernist, Paris bohemian, Pacific Northwest pioneer — has existed
            only in fragments. In letters scattered across three continents. In
            archives still half-catalogued. In the memories of those who knew
            him.
          </p>

          <p
            style={{
              fontSize: "clamp(12px, 1.4vw, 14px)",
              lineHeight: 1.95,
              color: DIM,
              margin: 0,
            }}>
            On an August evening in Melbourne, that changes.
          </p>

          <p
            style={{
              fontSize: "clamp(12px, 1.4vw, 14px)",
              lineHeight: 1.95,
              color: DIM,
              margin: 0,
            }}>
            From that evening,{" "}
            <em style={{ color: `oklch(0.65 0.01 80)` }}>
              Ambrose Patterson: His Life &amp; Art
            </em>{" "}
            — the first authoritative monograph — will be available.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              padding: "8px 0",
            }}>
            <p
              style={{
                fontSize: "clamp(12px, 1.4vw, 14px)",
                fontStyle: "italic",
                color: `oklch(0.62 0.01 80)`,
                margin: 0,
              }}>
              By Jane Alexander
            </p>
            <p
              style={{
                fontSize: "9px",
                letterSpacing: "0.20em",
                color: SUBTLE,
                margin: 0,
              }}>
              ISBN 978-0-6467-3365-4
            </p>
          </div>

          <Rule />
        </section>

        {/* ── LOCATION BOX ────────────────────────────────────── */}
        <section
          style={{
            maxWidth: "340px",
            margin: "0 auto clamp(48px, 8vw, 96px)",
            padding: "0 clamp(28px, 6vw, 56px)",
          }}>
          <div
            style={{
              border: `1px solid oklch(0.93 0.01 80 / 0.09)`,
              padding: "clamp(22px, 3vw, 32px) clamp(24px, 4vw, 36px)",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              position: "relative",
              textAlign: "center",
            }}>
            {/* Corner marks */}
            {[
              {
                top: "-1px",
                left: "-1px",
                borderTop: `1px solid ${SPINE_RED}`,
                borderLeft: `1px solid ${SPINE_RED}`,
              },
              {
                top: "-1px",
                right: "-1px",
                borderTop: `1px solid ${SPINE_RED}`,
                borderRight: `1px solid ${SPINE_RED}`,
              },
              {
                bottom: "-1px",
                left: "-1px",
                borderBottom: `1px solid ${SPINE_RED}`,
                borderLeft: `1px solid ${SPINE_RED}`,
              },
              {
                bottom: "-1px",
                right: "-1px",
                borderBottom: `1px solid ${SPINE_RED}`,
                borderRight: `1px solid ${SPINE_RED}`,
              },
            ].map((s, i) => (
              <span
                key={i}
                aria-hidden
                style={{
                  position: "absolute",
                  width: "10px",
                  height: "10px",
                  ...s,
                }}
              />
            ))}

            <p
              style={{
                fontSize: "8px",
                letterSpacing: "0.30em",
                textTransform: "uppercase",
                color: SPINE_RED,
                margin: 0,
              }}>
              A Private Occasion
            </p>

            <div
              style={{
                width: "80%",
                height: "1px",
                background: `oklch(0.93 0.01 80 / 0.10)`,
                margin: "0 auto",
              }}
            />

            <p
              style={{
                fontSize: "clamp(13px, 1.5vw, 15px)",
                lineHeight: 1.75,
                color: `oklch(0.60 0.01 75)`,
                margin: 0,
              }}>
              Melbourne, Victoria
              <br />
              Australia
            </p>

            <p
              style={{
                fontSize: "11px",
                letterSpacing: "0.16em",
                color: DIM,
                fontVariantNumeric: "tabular-nums",
                margin: 0,
              }}>
              37°49′S · 144°58′E
            </p>

            <p
              style={{
                fontSize: "10px",
                letterSpacing: "0.14em",
                fontStyle: "italic",
                color: SUBTLE,
                margin: 0,
              }}>
              Southern hemisphere, winter
            </p>
          </div>
        </section>

        {/* ── BACK LINK ───────────────────────────────────────── */}
        <div
          style={{
            textAlign: "center",
            paddingBottom: "clamp(40px, 6vw, 64px)",
          }}>
          <Link
            href="/"
            style={{
              fontSize: "9px",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: DIM,
              textDecoration: "none",
            }}>
            ← ambrosepatterson.com
          </Link>
        </div>
      </div>
    </div>
  );
}
