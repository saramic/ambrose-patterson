import { ExternalLink, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  HUGH_RAMSAY_VIDEO_URL,
  HUGH_RAMSAY_VIDEO_SOURCE,
  hughRamsayVideoChapters,
  hughRamsayVideoHighlights,
  hughRamsayHighlightLabel,
} from "@/content/hughRamsayVideo";

export function HughRamsayVideoSection() {
  return (
    <div className="flex flex-col gap-14">
      <a
        href={HUGH_RAMSAY_VIDEO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group">
        <Card className="border-primary/30 bg-primary/5 transition-shadow group-hover:shadow-md">
          <CardContent className="flex items-center gap-4">
            <span className="flex items-center justify-center size-10 rounded-full bg-primary/10 text-primary shrink-0">
              <Play size={16} fill="currentColor" />
            </span>
            <div className="flex flex-col gap-0.5">
              <span className="font-sans text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                Watch the original on Facebook
              </span>
              <span className="font-sans text-xs text-muted-foreground">
                Published by the {HUGH_RAMSAY_VIDEO_SOURCE}
              </span>
            </div>
            <ExternalLink
              size={14}
              className="text-muted-foreground shrink-0 ml-auto"
            />
          </CardContent>
        </Card>
      </a>

      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div className="flex flex-col gap-3">
          <p className="font-sans text-xs tracking-[0.18em] uppercase text-muted-foreground mb-1">
            Chapters
          </p>
          {hughRamsayVideoChapters.map((chapter) => (
            <div
              key={chapter.start}
              className="flex items-start gap-4 p-2 -mx-2">
              <span className="font-heading text-sm text-primary tabular-nums w-12 shrink-0 pt-0.5">
                {chapter.start}
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="font-sans text-sm text-foreground">
                  {chapter.title}
                </span>
                <span className="font-sans text-xs text-muted-foreground leading-relaxed">
                  {chapter.summary}
                </span>
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <p className="font-sans text-xs tracking-[0.18em] uppercase text-muted-foreground mb-1">
            Quotes worth reading
          </p>
          {hughRamsayVideoHighlights.map((highlight) => (
            <Card key={highlight.start} className="border-border/60 bg-card">
              <CardContent className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <Badge
                    variant="outline"
                    className="font-sans text-xs tracking-wide">
                    {hughRamsayHighlightLabel(highlight.type)}
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
