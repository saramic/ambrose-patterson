import Link from "next/link";
import { SiteNav } from "@/components/book/SiteNav";
import { HeroSection } from "@/components/book/HeroSection";
import { ArtistSection } from "@/components/book/ArtistSection";
import { BookSection } from "@/components/book/BookSection";
import { AuthorSection } from "@/components/book/AuthorSection";
import { PurchaseSection } from "@/components/book/PurchaseSection";
import { SiteFooter } from "@/components/book/SiteFooter";
import { SectionHeader } from "@/components/book/SectionHeader";
import { BookCoverMockup } from "@/components/book/BookCoverMockup";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

function ComponentFrame({
  name,
  description,
  bg = "bg-background",
  children,
}: {
  name: string;
  description?: string;
  bg?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-0 border border-border rounded-sm overflow-hidden">
      <div className="bg-muted/60 border-b border-border px-4 py-2 flex items-baseline gap-3">
        <span className="font-sans text-xs font-semibold tracking-widest uppercase text-foreground">
          {name}
        </span>
        {description && (
          <span className="font-sans text-xs text-muted-foreground">
            {description}
          </span>
        )}
      </div>
      <div className={`${bg} p-8`}>{children}</div>
    </div>
  );
}

export default function UIGallery() {
  return (
    <div className="min-h-screen bg-background">
      {/* Gallery header */}
      <div className="border-b border-border bg-muted/30 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 h-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-sans text-xs font-bold tracking-widest uppercase text-primary">
              /ui
            </span>
            <Separator orientation="vertical" className="h-4 opacity-40" />
            <span className="font-sans text-xs text-muted-foreground">
              Component gallery — Ambrose Patterson design system
            </span>
          </div>
          <Link
            href="/"
            className="font-sans text-xs tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors">
            ← Live site
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col gap-10">
        {/* ── Primitives ─────────────────────────────────── */}
        <section className="flex flex-col gap-6">
          <h2 className="font-heading text-xl text-foreground border-b border-border pb-3">
            Primitives
          </h2>

          <ComponentFrame name="Button" description="All variants">
            <div className="flex flex-wrap gap-3 items-center">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </div>
          </ComponentFrame>

          <ComponentFrame name="Button" description="Sizes">
            <div className="flex flex-wrap gap-3 items-center">
              <Button size="xs">Extra Small</Button>
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
          </ComponentFrame>

          <ComponentFrame name="Button" description="As anchor — used for CTAs">
            <div className="flex flex-wrap gap-3 items-center">
              <a
                href="#"
                className={buttonVariants({
                  size: "lg",
                  className: "font-sans tracking-wider uppercase text-xs px-8",
                })}>
                Order Now — $89.95 AUS
              </a>
              <a
                href="#"
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                  className: "font-sans tracking-wider uppercase text-xs",
                })}>
                About the Book
              </a>
            </div>
          </ComponentFrame>

          <ComponentFrame name="Badge" description="All variants">
            <div className="flex flex-wrap gap-3 items-center">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
          </ComponentFrame>

          <ComponentFrame
            name="Badge"
            description="Used for artistic movements">
            <div className="flex flex-wrap gap-2">
              {[
                "Impressionism",
                "Post-Impressionism",
                "Fauvism",
                "Printmaking",
                "Muralism",
              ].map((m) => (
                <Badge
                  key={m}
                  variant="outline"
                  className="font-sans text-xs tracking-wide">
                  {m}
                </Badge>
              ))}
            </div>
          </ComponentFrame>

          <ComponentFrame
            name="Card"
            description="Stat card — used in Book section">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl">
              {[
                { value: "240", label: "Pages" },
                { value: "100+", label: "Illustrations" },
                { value: "18", label: "Chapters" },
                { value: "100k+", label: "Words" },
              ].map(({ value, label }) => (
                <Card
                  key={label}
                  className="border-border/60 text-center py-6 px-4">
                  <CardContent className="p-0 flex flex-col items-center gap-1">
                    <span className="font-heading text-4xl text-primary">
                      {value}
                    </span>
                    <span className="font-sans text-xs tracking-[0.18em] uppercase text-muted-foreground">
                      {label}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ComponentFrame>

          <ComponentFrame
            name="Separator"
            description="Horizontal and vertical">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="font-sans text-xs text-muted-foreground">
                  Horizontal
                </span>
                <Separator />
              </div>
              <div className="flex items-center gap-4 h-8">
                <span className="font-sans text-xs text-muted-foreground">
                  Vertical
                </span>
                <Separator orientation="vertical" className="h-6" />
                <span className="font-sans text-xs text-muted-foreground">
                  between items
                </span>
                <Separator orientation="vertical" className="h-6" />
                <span className="font-sans text-xs text-muted-foreground">
                  in nav
                </span>
              </div>
            </div>
          </ComponentFrame>
        </section>

        {/* ── Book components ─────────────────────────────── */}
        <section className="flex flex-col gap-6">
          <h2 className="font-heading text-xl text-foreground border-b border-border pb-3">
            Book Components
          </h2>

          <ComponentFrame
            name="SectionHeader"
            description="Centre-aligned (default)">
            <SectionHeader
              label="1877–1966"
              title="The Artist"
              subtitle="A protégé of Nellie Melba, a peer of Matisse."
            />
          </ComponentFrame>

          <ComponentFrame name="SectionHeader" description="Left-aligned">
            <SectionHeader label="Monograph" title="The Book" align="left" />
          </ComponentFrame>

          <ComponentFrame
            name="BookCoverMockup"
            description="CSS-rendered cover — no image dependency">
            <div className="flex justify-center">
              <BookCoverMockup />
            </div>
          </ComponentFrame>
        </section>

        {/* ── Page sections ───────────────────────────────── */}
        <section className="flex flex-col gap-2">
          <h2 className="font-heading text-xl text-foreground border-b border-border pb-3">
            Page Sections
          </h2>
          <p className="font-sans text-xs text-muted-foreground mb-4">
            Full sections as they appear on the live site — rendered at natural
            width.
          </p>
        </section>

        <ComponentFrame
          name="SiteNav"
          description="Sticky header with anchor links"
          bg="bg-transparent">
          <div className="relative border border-dashed border-border/40 rounded-sm overflow-hidden">
            <SiteNav />
          </div>
        </ComponentFrame>

        <ComponentFrame
          name="HeroSection"
          description="Book cover + title + CTA"
          bg="bg-transparent">
          <HeroSection />
        </ComponentFrame>

        <ComponentFrame
          name="ArtistSection"
          description="Bio + timeline + movement badges"
          bg="bg-transparent">
          <ArtistSection />
        </ComponentFrame>

        <ComponentFrame
          name="BookSection"
          description="Stats + production credits"
          bg="bg-transparent">
          <BookSection />
        </ComponentFrame>

        <ComponentFrame
          name="AuthorSection"
          description="Jane Alexander bio + pull quote"
          bg="bg-transparent">
          <AuthorSection />
        </ComponentFrame>

        <ComponentFrame
          name="PurchaseSection"
          description="Price card + mailto CTA"
          bg="bg-transparent">
          <PurchaseSection />
        </ComponentFrame>

        <ComponentFrame
          name="SiteFooter"
          description="Dark footer with ACVA mark"
          bg="bg-transparent">
          <SiteFooter />
        </ComponentFrame>
      </div>
    </div>
  );
}
