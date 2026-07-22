import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/book/SiteNav";
import { SiteFooter } from "@/components/book/SiteFooter";
import { SectionHeader } from "@/components/book/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { games } from "@/content/games";

const SITE_URL = "https://ambrosepatterson.com.au";
const PAGE_TITLE = "Games & Interactives";
const PAGE_DESCRIPTION =
  "Small interactive ways to explore Ambrose Patterson's life and work, one idea at a time.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/games" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/games`,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

export default function GamesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />
      <main className="flex-1">
        <section className="bg-background">
          <div className="max-w-5xl mx-auto px-6 py-20 md:py-24 flex flex-col gap-14">
            <SectionHeader
              label="Play"
              title="Games & Interactives"
              subtitle={PAGE_DESCRIPTION}
            />
            <div className="grid md:grid-cols-2 gap-4">
              {games.map((game) => {
                const content = (
                  <Card
                    className={
                      game.href
                        ? "h-full border-border/60 bg-card transition-shadow group-hover:shadow-md"
                        : "h-full border-border/60 bg-card opacity-70"
                    }>
                    <CardContent className="flex flex-col gap-2">
                      <div className="flex items-start justify-between gap-2">
                        <span
                          className={
                            game.href
                              ? "font-sans text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug"
                              : "font-sans text-sm font-medium text-foreground leading-snug"
                          }>
                          {game.title}
                        </span>
                        <Badge
                          variant={game.href ? "outline" : "secondary"}
                          className="font-sans text-xs tracking-wide shrink-0">
                          {game.href ? game.mood : "Coming soon"}
                        </Badge>
                      </div>
                      <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                        {game.description}
                      </p>
                    </CardContent>
                  </Card>
                );

                return game.href ? (
                  <Link key={game.slug} href={game.href} className="group">
                    {content}
                  </Link>
                ) : (
                  <div key={game.slug}>{content}</div>
                );
              })}
            </div>
            <Link
              href="/press"
              className="font-sans text-xs tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors self-start">
              ← Back to Press
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
