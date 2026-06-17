"use client";

import { useEffect, useState } from "react";

// 15 August 2026 at 17:00 AEST (UTC+10) = 07:00 UTC
const LAUNCH = new Date("2026-08-15T07:00:00Z");

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(): TimeLeft | null {
  const diff = LAUNCH.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
  };
}

const CREAM = "oklch(0.93 0.01 80)";
const GOLD = "oklch(0.72 0.09 80)";
const DIM = "oklch(0.38 0.01 75)";

export function LaunchCountdown() {
  // undefined = SSR/not yet hydrated; null = past launch date; TimeLeft = active
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null | undefined>(
    undefined,
  );

  useEffect(() => {
    const update = () => setTimeLeft(getTimeLeft());
    update();
    const id = setInterval(update, 1_000);
    return () => clearInterval(id);
  }, []);

  if (timeLeft === undefined) return <div style={{ height: "80px" }} />;

  if (timeLeft === null) {
    return (
      <p
        style={{
          fontSize: "14px",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: GOLD,
        }}>
        Available now
      </p>
    );
  }

  const parts: { value: number; label: string }[] = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Min" },
    { value: timeLeft.seconds, label: "Sec" },
  ];

  return (
    <div
      style={{
        display: "flex",
        gap: "clamp(16px, 4vw, 40px)",
        alignItems: "flex-end",
        flexWrap: "wrap",
        justifyContent: "center",
      }}>
      {parts.map(({ value, label }, i) => (
        <div
          key={label}
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: "clamp(16px, 4vw, 40px)",
          }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
            }}>
            <span
              style={{
                fontFamily: "var(--font-serif), serif",
                fontSize: "clamp(36px, 7vw, 64px)",
                fontWeight: 700,
                lineHeight: 1,
                color: CREAM,
                minWidth: "2ch",
                textAlign: "center",
                fontVariantNumeric: "tabular-nums",
              }}>
              {String(value).padStart(2, "0")}
            </span>
            <span
              style={{
                fontSize: "8px",
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: DIM,
              }}>
              {label}
            </span>
          </div>
          {i < parts.length - 1 && (
            <span
              aria-hidden
              style={{
                color: DIM,
                fontSize: "clamp(20px, 3vw, 28px)",
                marginBottom: "clamp(16px, 3vw, 22px)",
                opacity: 0.35,
                lineHeight: 1,
              }}>
              ·
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
