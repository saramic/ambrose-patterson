import Link from "next/link";
import { ExternalLink, Image as ImageIcon, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { RelatedArtist } from "@/content/relatedArtists";

export function RelatedArtistSection({ artist }: { artist: RelatedArtist }) {
  return (
    <div className="flex flex-col gap-14">
      <div className="flex flex-col gap-6">
        <p className="font-sans text-sm leading-[1.85] text-foreground/80 max-w-2xl">
          {artist.overview}
        </p>
        <Card className="border-primary/30 bg-primary/5 max-w-2xl">
          <CardContent className="flex flex-col gap-1.5">
            <span className="font-sans text-xs tracking-widest uppercase text-primary font-medium">
              Connection to Ambrose Patterson
            </span>
            <p className="font-sans text-sm leading-relaxed text-foreground/80">
              {artist.connectionToPatterson}
            </p>
          </CardContent>
        </Card>
        {artist.video && (
          <Link href={artist.video.href} className="group max-w-2xl">
            <Card className="border-border/60 bg-card transition-shadow group-hover:shadow-md">
              <CardContent className="flex items-center gap-3">
                <span className="flex items-center justify-center size-8 rounded-full bg-primary/10 text-primary shrink-0">
                  <Play size={13} fill="currentColor" />
                </span>
                <span className="font-sans text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {artist.video.label}
                </span>
              </CardContent>
            </Card>
          </Link>
        )}
      </div>

      {artist.categories.map((category) => (
        <div key={category.key} className="flex flex-col gap-4">
          <h3 className="font-heading text-lg text-foreground">
            {category.label}
          </h3>
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
