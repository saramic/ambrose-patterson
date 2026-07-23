"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  SPOT_IMAGE_ORIGINAL,
  SPOT_IMAGE_ALTERED,
  spotDifferences,
} from "@/content/spotTheDifferenceGame";

const GAME_SECONDS = 90;

type Status = "playing" | "won" | "timeout";

function ImagePanel({
  src,
  alt,
  found,
  status,
  onFound,
}: {
  src: string;
  alt: string;
  found: Set<string>;
  status: Status;
  onFound: (id: string) => void;
}) {
  return (
    <div className="relative flex-1 min-w-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="w-full rounded-sm ring-1 ring-border select-none"
        draggable={false}
      />
      {spotDifferences.map((d) => (
        <button
          key={d.id}
          type="button"
          onClick={() => onFound(d.id)}
          disabled={status !== "playing"}
          aria-label={
            found.has(d.id)
              ? `Found: ${d.label}`
              : "Click if this looks different"
          }
          className={cn(
            "absolute rounded-full -translate-x-1/2 -translate-y-1/2 transition-colors",
            found.has(d.id)
              ? "ring-2 ring-primary bg-primary/15"
              : "hover:bg-background/20",
          )}
          style={{
            left: `${d.xPct}%`,
            top: `${d.yPct}%`,
            width: `${d.radiusPct * 2}%`,
            height: `${d.radiusPct * 2}%`,
          }}
        />
      ))}
    </div>
  );
}

export function SpotTheDifferenceGame() {
  const [found, setFound] = useState<Set<string>>(new Set());
  const [timeLeft, setTimeLeft] = useState(GAME_SECONDS);
  const [won, setWon] = useState(false);
  const status: Status = won ? "won" : timeLeft <= 0 ? "timeout" : "playing";

  useEffect(() => {
    if (status !== "playing") return;
    const timer = setTimeout(
      () => setTimeLeft((s) => Math.max(0, s - 1)),
      1000,
    );
    return () => clearTimeout(timer);
  }, [timeLeft, status]);

  function handleFound(id: string) {
    if (status !== "playing" || found.has(id)) return;
    const next = new Set(found);
    next.add(id);
    setFound(next);
    if (next.size === spotDifferences.length) setWon(true);
  }

  function reset() {
    setFound(new Set());
    setTimeLeft(GAME_SECONDS);
    setWon(false);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <span className="font-sans text-sm text-foreground">
          Found {found.size} of {spotDifferences.length}
        </span>
        <span className="font-heading text-lg text-primary tabular-nums">
          {status === "timeout"
            ? "0:00"
            : `${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, "0")}`}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <ImagePanel
          src={SPOT_IMAGE_ORIGINAL}
          alt="Still life with flowers — detail from the cover of Ambrose Patterson: His Life & Art"
          found={found}
          status={status}
          onFound={handleFound}
        />
        <ImagePanel
          src={SPOT_IMAGE_ALTERED}
          alt="The same still life, with 5 details changed"
          found={found}
          status={status}
          onFound={handleFound}
        />
      </div>

      {status !== "playing" && (
        <div className="flex items-center justify-between gap-4 rounded-sm border border-border/60 bg-card px-4 py-3">
          <span className="font-sans text-sm text-foreground">
            {status === "won"
              ? `All 5 found with ${timeLeft}s to spare!`
              : `Time's up — you found ${found.size} of ${spotDifferences.length}.`}
          </span>
          <Button
            size="sm"
            onClick={reset}
            className="font-sans text-xs tracking-wide">
            Play again
          </Button>
        </div>
      )}
    </div>
  );
}
