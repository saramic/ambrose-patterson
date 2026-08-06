import type { Metadata } from "next";
import { SiteNav } from "@/components/book/SiteNav";
import { SiteFooter } from "@/components/book/SiteFooter";
import { SectionHeader } from "@/components/book/SectionHeader";
import { testimonials } from "@/content/testimonials";

const SITE_URL = "https://ambrosepatterson.com.au";

const TITLE = "Testimonials — Ambrose Patterson: His Life & Art";
const DESCRIPTION =
  "What those closest to Ambrose Patterson's legacy are saying about Jane Alexander's new monograph.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/testimonials" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/testimonials`,
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />
      <main className="flex-1">
        <section className="bg-background">
          <div className="max-w-5xl mx-auto px-6 py-20 md:py-24 flex flex-col gap-14">
            <SectionHeader
              label="In Their Words"
              title="Testimonials"
              subtitle="What those closest to Patterson's legacy are saying about the book."
            />
            <div className="flex flex-col gap-10 max-w-3xl mx-auto w-full">
              {testimonials.map((t) => (
                <blockquote
                  key={`${t.name}-${t.date}`}
                  className="border-l-2 border-mauve pl-6 py-1">
                  <p className="font-heading italic text-foreground text-lg md:text-xl leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <footer className="mt-4 font-sans text-xs tracking-widest uppercase text-muted-foreground">
                    — {t.name} · {t.date}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
