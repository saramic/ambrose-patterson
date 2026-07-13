"use client";

import { useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { parseTimestamp } from "@/lib/video-time";
import {
  chapters,
  highlights,
  highlightLabel,
  hasVideo,
  YOUTUBE_VIDEO_ID,
} from "@/content/interview";

export function InterviewPlayer() {
  const [range, setRange] = useState<{ start: number; end: number } | null>(
    null,
  );
  const playerRef = useRef<HTMLDivElement>(null);

  function playFrom(startLabel: string, endLabel: string) {
    if (!hasVideo) return;
    setRange({
      start: parseTimestamp(startLabel),
      end: parseTimestamp(endLabel),
    });
    playerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const embedSrc = range
    ? `https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?start=${range.start}&end=${range.end}&autoplay=1&rel=0`
    : `https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?rel=0`;

  return (
    <div className="flex flex-col gap-14">
      {hasVideo ? (
        <div
          ref={playerRef}
          className="aspect-video w-full rounded-sm overflow-hidden ring-1 ring-border scroll-mt-20">
          <iframe
            key={embedSrc}
            src={embedSrc}
            title="Danielle Knapp on Ambrose Patterson"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="aspect-video w-full rounded-sm ring-1 ring-border bg-muted/40 flex items-center justify-center">
          <p className="font-sans text-xs tracking-[0.18em] uppercase text-muted-foreground">
            Video coming soon
          </p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* Chapters */}
        <div className="flex flex-col gap-3">
          <p className="font-sans text-xs tracking-[0.18em] uppercase text-muted-foreground mb-1">
            Chapters
          </p>
          {chapters.map((chapter) => (
            <button
              key={chapter.start}
              type="button"
              disabled={!hasVideo}
              onClick={() => playFrom(chapter.start, chapter.end)}
              className={cn(
                "group flex items-start gap-4 text-left rounded-sm p-2 -mx-2 transition-colors",
                hasVideo && "hover:bg-muted/50",
                !hasVideo && "cursor-default",
              )}>
              <span className="font-heading text-sm text-primary tabular-nums w-12 shrink-0 pt-0.5">
                {chapter.start}
              </span>
              <span className="flex flex-col gap-0.5">
                <span
                  className={cn(
                    "font-sans text-sm text-foreground transition-colors",
                    hasVideo && "group-hover:text-primary",
                  )}>
                  {chapter.title}
                </span>
                <span className="font-sans text-xs text-muted-foreground leading-relaxed">
                  {chapter.summary}
                </span>
              </span>
            </button>
          ))}
        </div>

        {/* Highlights */}
        <div className="flex flex-col gap-4">
          <p className="font-sans text-xs tracking-[0.18em] uppercase text-muted-foreground mb-1">
            Highlights worth clipping
          </p>
          {highlights.map((highlight) => (
            <Card
              key={highlight.start}
              className={cn(
                "border-border/60 bg-card transition-shadow",
                hasVideo && "cursor-pointer hover:shadow-md",
              )}
              onClick={() => playFrom(highlight.start, highlight.end)}>
              <CardContent className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <Badge
                    variant="outline"
                    className="font-sans text-xs tracking-wide">
                    {highlightLabel(highlight.type)}
                  </Badge>
                  <span className="font-sans text-xs text-muted-foreground tabular-nums">
                    {highlight.start}–{highlight.end}
                  </span>
                </div>
                <p className="font-heading italic text-foreground/85 text-sm leading-relaxed">
                  &ldquo;{highlight.displayQuote}&rdquo;
                </p>
                <p className="font-sans text-xs text-muted-foreground">
                  — {highlight.speaker}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
