"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { Card, CardContent } from "@/components/ui/card";
import {
  PARIS_TO_SEATTLE_INTRO,
  parisToSeattleStops,
} from "@/content/parisToSeattleGame";

const JourneyMap = dynamic(
  () => import("./JourneyMap").then((mod) => mod.JourneyMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-80 md:h-96 w-full rounded-sm ring-1 ring-border bg-muted/40 flex items-center justify-center">
        <p className="font-sans text-xs tracking-[0.18em] uppercase text-muted-foreground">
          Loading map…
        </p>
      </div>
    ),
  },
);

export function JourneySection() {
  return (
    <div className="flex flex-col gap-10">
      <p className="font-sans text-sm leading-[1.85] text-foreground/80 max-w-2xl">
        {PARIS_TO_SEATTLE_INTRO}
      </p>

      <JourneyMap />

      <div className="flex flex-col gap-6">
        {parisToSeattleStops.map((stop, i) => (
          <div key={stop.place} className="flex gap-5">
            <div className="flex flex-col items-center">
              <span className="flex items-center justify-center size-8 rounded-full border border-primary/40 bg-primary/10 text-primary font-heading text-sm shrink-0">
                {i + 1}
              </span>
              {i < parisToSeattleStops.length - 1 && (
                <span className="w-px flex-1 bg-border mt-2" />
              )}
            </div>
            <Card className="flex-1 border-border/60 bg-card mb-2">
              <CardContent className="flex flex-col gap-2">
                <div className="flex items-baseline justify-between gap-2 flex-wrap">
                  <h3 className="font-heading text-lg text-foreground">
                    {stop.place}
                  </h3>
                  <span className="font-sans text-xs text-muted-foreground tabular-nums">
                    {stop.years}
                  </span>
                </div>
                <p className="font-sans text-sm leading-relaxed text-foreground/80">
                  {stop.body}
                </p>
                {stop.relatedLinks && (
                  <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1">
                    {stop.relatedLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="font-sans text-xs text-primary hover:underline underline-offset-2">
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
