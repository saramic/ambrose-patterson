import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteNav } from "@/components/book/SiteNav";
import { SiteFooter } from "@/components/book/SiteFooter";
import { SectionHeader } from "@/components/book/SectionHeader";
import { RelatedArtistSection } from "@/components/book/RelatedArtistSection";
import { relatedArtists } from "@/content/relatedArtists";

const SITE_URL = "https://ambrosepatterson.com.au";

interface PageProps {
  params: Promise<{ artist: string }>;
}

export function generateStaticParams() {
  return relatedArtists.map((artist) => ({ artist: artist.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { artist: slug } = await params;
  const artist = relatedArtists.find((a) => a.slug === slug);
  if (!artist) return {};

  const title = `${artist.name} and Ambrose Patterson`;
  const description = artist.connectionToPatterson;
  const url = `${SITE_URL}/press/around-the-web/${artist.slug}`;

  return {
    title,
    description,
    alternates: { canonical: `/press/around-the-web/${artist.slug}` },
    openGraph: { type: "website", url, title, description },
  };
}

export default async function RelatedArtistPage({ params }: PageProps) {
  const { artist: slug } = await params;
  const artist = relatedArtists.find((a) => a.slug === slug);
  if (!artist) notFound();

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: artist.name,
    description: artist.connectionToPatterson,
    url: `${SITE_URL}/press/around-the-web/${artist.slug}`,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <SiteNav />
      <main className="flex-1">
        <section className="bg-background">
          <div className="max-w-5xl mx-auto px-6 py-20 md:py-24 flex flex-col gap-14">
            <SectionHeader
              label="Related Artist"
              title={`${artist.name}${artist.dates ? ` (${artist.dates})` : ""}`}
              subtitle={`How ${artist.name} connects to Ambrose Patterson, and where to read and see more.`}
            />
            <RelatedArtistSection artist={artist} />
            <Link
              href="/press/around-the-web"
              className="font-sans text-xs tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors self-start">
              ← Back to Around the Web
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
