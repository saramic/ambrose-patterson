import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Press Notices — Ambrose Patterson: His Life & Art",
  description:
    "What the critics say about Ambrose Patterson: His Life & Art by Jane Alexander.",
};

const NP = "oklch(0.95 0.028 88)"; // aged newsprint
const AGED = "oklch(0.91 0.026 86)"; // slightly darker for boxes
const INK = "oklch(0.09 0.01 50)"; // near-black ink
const CRIMSON = "oklch(0.50 0.21 3)";
const GOLD = "oklch(0.66 0.10 82)";
const CREAM = "oklch(0.97 0.012 88)";

function Stars({ n = 5, size = "1em" }: { n?: number; size?: string }) {
  return (
    <span
      style={{
        color: GOLD,
        fontSize: size,
        letterSpacing: "0.14em",
      }}>
      {"★".repeat(n)}
    </span>
  );
}

function ThickRule() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
      <div style={{ height: "4px", backgroundColor: INK }} />
      <div style={{ height: "1px", backgroundColor: INK }} />
    </div>
  );
}

function ThinRule({ margin = "0" }: { margin?: string }) {
  return (
    <div
      style={{ height: "1px", backgroundColor: INK, opacity: 0.35, margin }}
    />
  );
}

function OrnamentRule() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        margin: "0",
      }}>
      <div style={{ flex: 1, height: "1px", backgroundColor: INK }} />
      <span
        style={{
          fontSize: "10px",
          letterSpacing: "0.3em",
          color: CRIMSON,
        }}>
        ✦ ✦ ✦
      </span>
      <div style={{ flex: 1, height: "1px", backgroundColor: INK }} />
    </div>
  );
}

const reviews = [
  {
    publication: "The Pacific Northwestern",
    location: "Seattle",
    reviewer: "Eleanor M. Holloway",
    stars: 5,
    headline: "PATTERSON RESTORED TO HIS RIGHTFUL THRONE",
    body: "For too long has this remarkable man been passed over by the arbiters of taste who rule from their Manhattan fastnesses. Jane Alexander's meticulous and graceful scholarship has righted a grievous wrong. Buy this book. Press it upon your friends. Discuss it at dinner. You will not be disappointed.",
  },
  {
    publication: "The Modernist Chronicle",
    location: "Chicago",
    reviewer: "Prof. H. R. Abernathy",
    stars: 5,
    headline: "INDISPENSABLE — SIMPLY INDISPENSABLE",
    body: "One closes this magnificent volume with the sensation of having been in the presence of genius — both Patterson's and Miss Alexander's. The illustrations alone are worth thrice the asking price. A permanent addition to the scholarly literature.",
  },
  {
    publication: "The Athenæum",
    location: "London",
    reviewer: "Anon.",
    stars: 5,
    headline: "TRIUMPHANT ON EVERY PAGE",
    body: "Nothing short of essential for anyone with the slightest interest in the history of modernist painting on two continents. Alexander writes with authority, warmth, and an eye for the telling detail. The chapters on the Paris years are alone worth the voyage.",
  },
  {
    publication: "The Melbourne Argus",
    location: "Melbourne, Australia",
    reviewer: "R. J. Whitmore",
    stars: 5,
    headline: "AUSTRALIA RECLAIMS ITS OWN",
    body: "Patterson has too long been claimed by the Americans as their discovery. Miss Alexander's superb work reminds us that this visionary artist was shaped first by the sunburned antipodean earth before Paris and Seattle had their way with him. A book of permanent importance to this nation's cultural life.",
  },
  {
    publication: "Arts & Letters Weekly",
    location: "San Francisco",
    reviewer: "Constance P. Fairweather",
    stars: 5,
    headline: "THE BOOK EVERY CIVILISED PERSON MUST OWN",
    body: "Authoritative, beautifully illustrated, and written with a scholar's rigour and a poet's ear. Miss Alexander has given us the Patterson we deserved to have decades ago. One can only be grateful, and eagerly await whatever she undertakes next.",
  },
];

export default function ReviewsPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: NP,
        color: INK,
        fontFamily: "var(--font-serif), serif",
        padding: "clamp(12px, 2.5vw, 28px)",
      }}>
      {/* ── OUTER DOUBLE BORDER ───────────────────────────── */}
      <div
        style={{
          border: `5px solid ${INK}`,
          padding: "4px",
        }}>
        <div
          style={{
            border: `1px solid ${INK}`,
            padding: "clamp(16px, 3vw, 40px)",
          }}>
          {/* Back link */}
          <div style={{ textAlign: "right", marginBottom: "12px" }}>
            <Link
              href="/"
              style={{
                fontSize: "9px",
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: INK,
                opacity: 0.45,
                textDecoration: "none",
              }}>
              ← ambrosepatterson.com
            </Link>
          </div>

          {/* ── MASTHEAD ──────────────────────────────────── */}
          <header style={{ textAlign: "center" }}>
            <ThickRule />
            <div
              style={{
                padding: "6px 0 5px",
                borderBottom: `1px solid ${INK}`,
              }}>
              <p
                style={{
                  fontSize: "8px",
                  letterSpacing: "0.38em",
                  textTransform: "uppercase",
                  margin: 0,
                  color: CRIMSON,
                }}>
                ✦&ensp; Special Literary Supplement &ensp;✦&ensp; Ambrose
                Patterson: His Life &amp; Art &ensp;✦
              </p>
            </div>

            <h1
              style={{
                fontSize: "clamp(44px, 10vw, 108px)",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                lineHeight: 0.88,
                margin: "clamp(12px, 2vw, 20px) 0 clamp(8px, 1.5vw, 14px)",
              }}>
              The Press
              <br />
              Notices
            </h1>

            <p
              style={{
                fontSize: "clamp(9px, 1.3vw, 12px)",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                margin: "0 0 clamp(8px, 1.5vw, 14px)",
                opacity: 0.7,
              }}>
              Opinions &ensp;·&ensp; Critiques &ensp;·&ensp; Encomia
              &ensp;·&ensp; From Across the Globe
            </p>

            <div
              style={{
                borderTop: `1px solid ${INK}`,
                borderBottom: `1px solid ${INK}`,
                padding: "5px 0",
                marginBottom: "0",
              }}>
              <div
                style={{
                  borderTop: `3px solid ${INK}`,
                  borderBottom: `3px solid ${INK}`,
                  padding: "4px 0",
                }}>
                <p
                  style={{
                    fontSize: "clamp(11px, 1.6vw, 14px)",
                    letterSpacing: "0.22em",
                    margin: 0,
                    color: CRIMSON,
                  }}>
                  <Stars size="1.1em" />
                  &ensp;&ensp; Universally Acclaimed &ensp;&ensp;
                  <Stars size="1.1em" />
                </p>
              </div>
            </div>
          </header>

          {/* ── FEATURED REVIEW ───────────────────────────── */}
          <div
            style={{
              margin: "clamp(20px, 3vw, 36px) 0",
              border: `3px double ${INK}`,
              padding: "clamp(20px, 3.5vw, 44px)",
              textAlign: "center",
              backgroundColor: AGED,
              position: "relative",
            }}>
            {/* Corner ornaments */}
            {[
              { top: "8px", left: "10px" },
              { top: "8px", right: "10px" },
              { bottom: "8px", left: "10px" },
              { bottom: "8px", right: "10px" },
            ].map((pos, i) => (
              <span
                key={i}
                aria-hidden
                style={{
                  position: "absolute",
                  fontSize: "14px",
                  color: GOLD,
                  lineHeight: 1,
                  ...pos,
                }}>
                ◆
              </span>
            ))}

            <p
              style={{
                fontSize: "10px",
                letterSpacing: "0.30em",
                textTransform: "uppercase",
                margin: "0 0 16px",
              }}>
              <Stars />
              &ensp; The American Art Review &ensp;·&ensp; New York &ensp;{" "}
              <Stars />
            </p>

            <h2
              style={{
                fontSize: "clamp(22px, 5vw, 56px)",
                fontWeight: 700,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                lineHeight: 1.0,
                margin: "0 0 10px",
              }}>
              A Masterwork
              <br />
              of the Biographical Art!
            </h2>

            <p
              style={{
                fontSize: "clamp(11px, 1.5vw, 15px)",
                fontStyle: "italic",
                margin: "0 0 clamp(16px, 2.5vw, 24px)",
                opacity: 0.65,
              }}>
              Miss Alexander Delivers the Definitive Account of a Life Lived
              Entirely in Paint
            </p>

            <ThinRule margin="0 0 clamp(14px, 2vw, 22px)" />

            <p
              style={{
                fontSize: "clamp(13px, 1.6vw, 17px)",
                lineHeight: 1.9,
                maxWidth: "660px",
                margin: "0 auto clamp(14px, 2vw, 22px)",
                fontStyle: "italic",
              }}>
              &ldquo;Miss Alexander has produced a volume of such magnificent
              scope and penetrating insight that one must declare it the finest
              monograph of this or any recent season. Patterson emerges from
              these pages not merely as a painter of considerable talent but as
              a figure of towering consequence in the story of modernism&rsquo;s
              westward migration. To read this book is to have a life restored
              to you.&rdquo;
            </p>

            <ThinRule margin="0 0 clamp(12px, 2vw, 20px)" />

            <p
              style={{
                fontSize: "11px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}>
              — Augustus B. Cartwright, Senior Critic
            </p>
          </div>

          {/* ── THREE-COLUMN SECTION ──────────────────────── */}
          <div style={{ marginBottom: "clamp(16px, 3vw, 32px)" }}>
            <OrnamentRule />
            <p
              style={{
                textAlign: "center",
                fontSize: "9px",
                letterSpacing: "0.38em",
                textTransform: "uppercase",
                margin: "10px 0",
                opacity: 0.55,
              }}>
              Further Notices from the Press
            </p>
            <OrnamentRule />
          </div>

          <div
            style={{
              columns: "3",
              columnGap: "clamp(16px, 2.5vw, 28px)",
              columnRule: `1px solid ${INK}`,
              marginBottom: "clamp(24px, 4vw, 48px)",
            }}>
            {reviews.slice(0, 3).map((r) => (
              <div
                key={r.publication}
                style={{
                  breakInside: "avoid",
                  paddingBottom: "clamp(16px, 2.5vw, 24px)",
                }}>
                <p
                  style={{
                    fontSize: "8px",
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    marginBottom: "6px",
                    color: CRIMSON,
                  }}>
                  <Stars n={r.stars} size="0.9em" />
                </p>
                <h3
                  style={{
                    fontSize: "clamp(13px, 1.8vw, 18px)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    lineHeight: 1.15,
                    letterSpacing: "0.03em",
                    margin: "0 0 8px",
                  }}>
                  {r.headline}
                </h3>
                <ThinRule margin="0 0 8px" />
                <p
                  style={{
                    fontSize: "clamp(11px, 1.2vw, 13px)",
                    lineHeight: 1.85,
                    margin: "0 0 10px",
                    fontStyle: "italic",
                  }}>
                  &ldquo;{r.body}&rdquo;
                </p>
                <p
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    opacity: 0.6,
                  }}>
                  — {r.reviewer}
                  <br />
                  <em style={{ fontStyle: "normal", opacity: 0.8 }}>
                    {r.publication}, {r.location}
                  </em>
                </p>
              </div>
            ))}
          </div>

          {/* ── PULL QUOTE BAND ───────────────────────────── */}
          <div
            style={{
              backgroundColor: INK,
              color: NP,
              padding: "clamp(28px, 4vw, 52px) clamp(20px, 4vw, 48px)",
              textAlign: "center",
              margin: "0 0 clamp(24px, 4vw, 48px)",
              position: "relative",
            }}>
            <span
              aria-hidden
              style={{
                position: "absolute",
                top: "clamp(12px, 2vw, 20px)",
                left: "clamp(16px, 2.5vw, 28px)",
                fontSize: "clamp(48px, 8vw, 80px)",
                color: CRIMSON,
                lineHeight: 1,
                fontFamily: "Georgia, serif",
                opacity: 0.7,
              }}>
              &ldquo;
            </span>
            <span
              aria-hidden
              style={{
                position: "absolute",
                bottom: "clamp(4px, 1vw, 8px)",
                right: "clamp(16px, 2.5vw, 28px)",
                fontSize: "clamp(48px, 8vw, 80px)",
                color: CRIMSON,
                lineHeight: 1,
                fontFamily: "Georgia, serif",
                opacity: 0.7,
              }}>
              &rdquo;
            </span>
            <p
              style={{
                fontSize: "clamp(16px, 2.8vw, 28px)",
                fontStyle: "italic",
                lineHeight: 1.55,
                maxWidth: "680px",
                margin: "0 auto clamp(14px, 2vw, 22px)",
                position: "relative",
                zIndex: 1,
              }}>
              The book Patterson deserved to have written about him fifty years
              ago — and worth waiting every one of those years for.
            </p>
            <p
              style={{
                fontSize: "10px",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: GOLD,
                position: "relative",
                zIndex: 1,
              }}>
              — The Sydney Morning Herald
            </p>
          </div>

          {/* ── TWO-COLUMN SECTION ────────────────────────── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(16px, 2.5vw, 32px)",
              marginBottom: "clamp(24px, 4vw, 48px)",
            }}>
            {reviews.slice(3).map((r, i) => (
              <div
                key={r.publication}
                style={{
                  borderTop: `3px solid ${INK}`,
                  borderLeft: i === 0 ? "none" : `1px solid ${INK}`,
                  paddingTop: "clamp(14px, 2vw, 20px)",
                  paddingLeft: i === 1 ? "clamp(14px, 2vw, 20px)" : "0",
                }}>
                <p
                  style={{
                    fontSize: "8px",
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    marginBottom: "8px",
                  }}>
                  <Stars n={r.stars} />
                  &ensp;
                  <span style={{ color: CRIMSON }}>
                    {r.publication} · {r.location}
                  </span>
                </p>
                <h3
                  style={{
                    fontSize: "clamp(16px, 2.2vw, 24px)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    lineHeight: 1.1,
                    letterSpacing: "0.03em",
                    margin: "0 0 10px",
                  }}>
                  {r.headline}
                </h3>
                <ThinRule margin="0 0 10px" />
                <p
                  style={{
                    fontSize: "clamp(12px, 1.3vw, 14px)",
                    lineHeight: 1.85,
                    margin: "0 0 12px",
                    fontStyle: "italic",
                  }}>
                  &ldquo;{r.body}&rdquo;
                </p>
                <p
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    opacity: 0.6,
                  }}>
                  — {r.reviewer}
                </p>
              </div>
            ))}
          </div>

          {/* ── THE VERDICT ───────────────────────────────── */}
          <div
            style={{
              textAlign: "center",
              margin: "0 0 clamp(20px, 3vw, 36px)",
              padding: "clamp(24px, 3.5vw, 44px)",
              border: `1px solid ${INK}`,
              backgroundColor: AGED,
              position: "relative",
            }}>
            <div
              style={{
                position: "absolute",
                inset: "6px",
                border: `1px solid ${INK}`,
                pointerEvents: "none",
              }}
            />
            <p
              style={{
                fontSize: "9px",
                letterSpacing: "0.36em",
                textTransform: "uppercase",
                margin: "0 0 14px",
                color: CRIMSON,
              }}>
              ◆ &ensp; The Verdict &ensp; ◆
            </p>
            <div
              style={{
                fontSize: "clamp(32px, 6vw, 60px)",
                color: GOLD,
                letterSpacing: "0.18em",
                lineHeight: 1,
                margin: "0 0 8px",
              }}>
              ★★★★★
            </div>
            <p
              style={{
                fontSize: "clamp(22px, 4vw, 44px)",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                margin: "0 0 16px",
              }}>
              Five Stars
            </p>
            <ThinRule margin="0 0 16px" />
            <p
              style={{
                fontSize: "clamp(12px, 1.4vw, 15px)",
                fontStyle: "italic",
                letterSpacing: "0.05em",
                opacity: 0.75,
                margin: 0,
              }}>
              &ldquo;Essential. Extraordinary. Unmissable.&rdquo;
            </p>
          </div>

          {/* ── FOOTER RULE ──────────────────────────────── */}
          <ThickRule />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 0 0",
              flexWrap: "wrap",
              gap: "8px",
            }}>
            <p
              style={{
                fontSize: "8px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                opacity: 0.45,
                margin: 0,
              }}>
              Published by ACVA Pty Ltd &ensp;·&ensp; ISBN 978-0-6467-3365-4
            </p>
            <Link
              href="/"
              style={{
                fontSize: "8px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: INK,
                opacity: 0.45,
                textDecoration: "none",
              }}>
              ← ambrosepatterson.com
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
