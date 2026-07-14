import { ExternalLink, Image as ImageIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  AROUND_THE_WEB_INTRO,
  resourceCategories,
} from "@/content/aroundTheWeb";

export function AroundTheWebSection() {
  return (
    <div className="flex flex-col gap-14">
      <p className="font-sans text-sm leading-[1.85] text-foreground/80 max-w-2xl">
        {AROUND_THE_WEB_INTRO}
      </p>

      {resourceCategories.map((category) => (
        <div key={category.key} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="font-heading text-lg text-foreground">
              {category.label}
            </h3>
            <p className="font-sans text-xs text-muted-foreground tracking-wide">
              {category.kicker}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {category.entries.map((entry) => (
              <a
                key={entry.url}
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group">
                <Card className="h-full border-border/60 bg-card transition-shadow group-hover:shadow-md">
                  <CardContent className="flex flex-col gap-2">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-sans text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug">
                        {entry.title}
                      </span>
                      <ExternalLink
                        size={14}
                        className="text-muted-foreground shrink-0 mt-0.5"
                      />
                    </div>
                    <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                      {entry.summary}
                    </p>
                    {entry.hasImages && (
                      <Badge
                        variant="outline"
                        className="font-sans text-xs tracking-wide self-start gap-1">
                        <ImageIcon size={11} />
                        {entry.imageNote || "Images"}
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
