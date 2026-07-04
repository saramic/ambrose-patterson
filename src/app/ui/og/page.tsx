import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "OG Preview — Internal",
  robots: { index: false, follow: false },
};

const META = {
  title: "Ambrose Patterson: His Life & Art",
  description:
    "The first authoritative monograph on the significant Australian-American modernist — from bohemian Paris at the fin de siècle to the Pacific Northwest. By Jane Alexander.",
  domain: "ambrosepatterson.com.au",
  imageAlt: "Ambrose Patterson: His Life & Art — book cover",
};

function OGImagePreview({
  className,
  style,
  sizes = "500px",
}: {
  className?: string;
  style?: React.CSSProperties;
  sizes?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className ?? ""}`} style={style}>
      <Image
        src="/og-image.jpg"
        alt={META.imageAlt}
        fill
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}

function CardLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground mb-3">
      {children}
    </p>
  );
}

export default function OGPreview() {
  return (
    <div className="min-h-screen bg-background">
      {/* Gallery header */}
      <div className="border-b border-border bg-muted/30 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 h-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/ui"
              className="text-xs tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors">
              ← /ui
            </Link>
            <Separator orientation="vertical" className="h-4 opacity-40" />
            <span className="text-xs font-bold tracking-widest uppercase text-primary">
              /ui/og
            </span>
            <Separator orientation="vertical" className="h-4 opacity-40" />
            <span className="text-xs text-muted-foreground">
              Open Graph &amp; social card previews
            </span>
          </div>
          <Link
            href="/"
            className="text-xs tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors">
            ← Live site
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col gap-16">
        {/* OG Image itself */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xl border-b border-border pb-3">OG Image</h2>
          <p className="text-sm text-muted-foreground">
            1200 × 630 px — used by all platforms. Rendered from{" "}
            <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
              /public/og-image.jpg
            </code>
            .
          </p>
          <OGImagePreview
            className="w-full rounded-sm"
            style={{ aspectRatio: "1200/630" } as React.CSSProperties}
          />
        </section>

        <Separator className="opacity-40" />

        {/* Facebook / LinkedIn */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xl border-b border-border pb-3">
            Facebook &amp; LinkedIn
          </h2>
          <CardLabel>Large card — image above, text below</CardLabel>
          <div className="max-w-[500px] border border-[#dddfe2] rounded overflow-hidden shadow-sm bg-white">
            <OGImagePreview
              className="w-full"
              style={{ aspectRatio: "1200/630" } as React.CSSProperties}
            />
            <div className="px-3 py-2.5 border-t border-[#dddfe2]">
              <p className="text-[11px] uppercase text-[#606770] tracking-wide">
                {META.domain}
              </p>
              <p
                className="text-[#1c1e21] font-semibold text-sm leading-snug mt-0.5"
                style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>
                {META.title}
              </p>
              <p
                className="text-[#606770] text-xs leading-snug mt-0.5 line-clamp-1"
                style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>
                {META.description}
              </p>
            </div>
          </div>
        </section>

        <Separator className="opacity-40" />

        {/* Twitter / X */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xl border-b border-border pb-3">Twitter / X</h2>
          <CardLabel>summary_large_image card</CardLabel>
          <div className="max-w-[500px] border border-[#cfd9de] rounded-2xl overflow-hidden bg-white shadow-sm">
            <OGImagePreview
              className="w-full"
              style={{ aspectRatio: "1200/630" } as React.CSSProperties}
            />
            <div className="px-3 py-2.5">
              <p
                className="text-[#536471] text-xs leading-snug line-clamp-2"
                style={{ fontFamily: "system-ui, sans-serif" }}>
                {META.description}
              </p>
              <p
                className="text-[#536471] text-xs mt-1"
                style={{ fontFamily: "system-ui, sans-serif" }}>
                {META.domain}
              </p>
            </div>
          </div>
        </section>

        <Separator className="opacity-40" />

        {/* iMessage / WhatsApp */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xl border-b border-border pb-3">
            iMessage &amp; WhatsApp
          </h2>
          <CardLabel>Compact horizontal card</CardLabel>
          <div className="max-w-[320px]">
            {/* iMessage bubble */}
            <div className="bg-[#e9e9eb] rounded-2xl overflow-hidden">
              <OGImagePreview
                className="w-full"
                style={{ aspectRatio: "1200/630" } as React.CSSProperties}
              />
              <div className="px-3 py-2">
                <p
                  className="text-[#000] font-semibold text-xs leading-snug"
                  style={{ fontFamily: "system-ui, sans-serif" }}>
                  {META.title}
                </p>
                <p
                  className="text-[#3c3c43] text-[11px] leading-snug mt-0.5 opacity-60 line-clamp-2"
                  style={{ fontFamily: "system-ui, sans-serif" }}>
                  {META.description}
                </p>
                <p
                  className="text-[#3c3c43] text-[10px] mt-1 opacity-40 uppercase tracking-wide"
                  style={{ fontFamily: "system-ui, sans-serif" }}>
                  {META.domain}
                </p>
              </div>
            </div>
          </div>
        </section>

        <Separator className="opacity-40" />

        {/* Slack / Discord */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xl border-b border-border pb-3">
            Slack &amp; Discord
          </h2>
          <CardLabel>Unfurl embed — left border, text + thumbnail</CardLabel>
          {/* Slack style */}
          <div className="max-w-[500px] flex gap-3 pl-3 border-l-4 border-[#e01e5a]">
            <div className="flex-1 flex flex-col gap-0.5">
              <p
                className="text-[#1264a3] font-bold text-sm"
                style={{ fontFamily: "system-ui, sans-serif" }}>
                {META.title}
              </p>
              <p
                className="text-[#1d1c1d] text-xs leading-relaxed line-clamp-3"
                style={{ fontFamily: "system-ui, sans-serif" }}>
                {META.description}
              </p>
              <p
                className="text-[#616061] text-[11px] mt-1"
                style={{ fontFamily: "system-ui, sans-serif" }}>
                {META.domain}
              </p>
            </div>
            <OGImagePreview
              className="rounded shrink-0"
              style={{ width: "80px", height: "80px" } as React.CSSProperties}
              sizes="80px"
            />
          </div>
          {/* Discord style */}
          <CardLabel>Discord embed</CardLabel>
          <div className="max-w-[432px] bg-[#2b2d31] rounded border-l-4 border-[#5865f2] p-3 flex flex-col gap-2">
            <p
              className="text-[#00aff4] text-xs font-medium"
              style={{ fontFamily: "system-ui, sans-serif" }}>
              {META.domain}
            </p>
            <p
              className="text-white font-semibold text-sm"
              style={{ fontFamily: "system-ui, sans-serif" }}>
              {META.title}
            </p>
            <p
              className="text-[#dbdee1] text-xs leading-relaxed line-clamp-3"
              style={{ fontFamily: "system-ui, sans-serif" }}>
              {META.description}
            </p>
            <OGImagePreview
              className="w-full rounded mt-1"
              style={{ aspectRatio: "1200/630" } as React.CSSProperties}
            />
          </div>
        </section>

        <Separator className="opacity-40" />

        {/* Meta tags reference */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xl border-b border-border pb-3">
            Meta tags in use
          </h2>
          <div className="bg-muted/40 rounded-sm p-5 border border-border/50 overflow-x-auto">
            <pre className="text-xs text-muted-foreground leading-relaxed whitespace-pre">{`<meta property="og:type"        content="website" />
<meta property="og:url"         content="https://ambrosepatterson.com.au" />
<meta property="og:title"       content="${META.title}" />
<meta property="og:description" content="${META.description.slice(0, 60)}…" />
<meta property="og:image"       content="/og-image.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height"content="630" />

<meta name="twitter:card"       content="summary_large_image" />
<meta name="twitter:title"      content="${META.title}" />
<meta name="twitter:image"      content="/og-image.jpg" />`}</pre>
          </div>
          <p className="text-xs text-muted-foreground">
            All generated automatically by Next.js from{" "}
            <code className="bg-muted px-1.5 py-0.5 rounded">layout.tsx</code>,
            reading{" "}
            <code className="bg-muted px-1.5 py-0.5 rounded">og-image.jpg</code>{" "}
            from <code className="bg-muted px-1.5 py-0.5 rounded">/public</code>.
          </p>
        </section>
      </div>
    </div>
  );
}
