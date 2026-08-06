import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { QRGenerator } from "@/components/ui/qr-generator";

export const metadata: Metadata = {
  title: "Graphics — Internal",
  robots: { index: false, follow: false },
};

function QRCard({
  src,
  label,
  description,
}: {
  src: string;
  label: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-3 border border-border rounded-sm overflow-hidden">
      <div className="bg-muted/30 flex items-center justify-center p-6">
        <Image src={src} alt={label} width={200} height={200} />
      </div>
      <div className="px-4 pb-4 flex flex-col gap-1">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
        <a
          href={src}
          download
          className="text-xs tracking-widest uppercase text-primary hover:underline mt-2">
          Download →
        </a>
      </div>
    </div>
  );
}

export default function GraphicsPreview() {
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
              /ui/graphics
            </span>
            <Separator orientation="vertical" className="h-4 opacity-40" />
            <span className="text-xs text-muted-foreground">
              Default graphics &amp; brand assets
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
        {/* QR codes */}
        <section className="flex flex-col gap-6">
          <div>
            <h2 className="text-xl border-b border-border pb-3">QR Codes</h2>
            <p className="text-sm text-muted-foreground mt-3">
              Default set for ambrosepatterson.com.au — for print, signage and
              collateral.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <QRCard
              src="/images/ambrosepatterson_com_au_qr.png"
              label="Plain"
              description="Standard black-on-white, no embedded mark."
            />
            <QRCard
              src="/images/ambrosepatterson_com_au_qr_logo.png"
              label="With ACVA mark"
              description="Center mark embedded, high error-correction."
            />
          </div>

          <Separator className="opacity-40" />

          <div>
            <h3 className="text-sm font-medium text-foreground">
              Generate a custom QR code
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Any URL or text, any colour combination — for one-off print runs
              or campaign-specific links.
            </p>
          </div>
          <QRGenerator />
        </section>
      </div>
    </div>
  );
}
