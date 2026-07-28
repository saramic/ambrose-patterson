import Image from "next/image";
import { SectionHeader } from "./SectionHeader";
import janeAlexanderImage from "@/assets/images/jane-alexander.jpg";

export function AuthorSection() {
  return (
    <section id="author" className="bg-sage-tint border-y border-border">
      <div className="max-w-5xl mx-auto px-6 py-20 md:py-24 flex flex-col gap-14">
        <SectionHeader label="About" title="The Author" />
        <div className="grid md:grid-cols-[1fr_2fr] gap-10 items-start max-w-4xl mx-auto w-full">
          {/* Author portrait */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div
              className="rounded-sm w-40 overflow-hidden bg-white"
              style={{ border: "1px solid oklch(0.87 0.012 85)" }}>
              <Image
                src={janeAlexanderImage}
                alt="Jane Alexander"
                placeholder="blur"
                sizes="160px"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
            <div className="text-center md:text-left">
              <p className="font-heading text-base">Jane Alexander</p>
              <p className="font-sans text-xs text-muted-foreground tracking-wide mt-0.5">
                Writer · Researcher · Curator
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className="font-sans text-sm leading-[1.85] text-foreground/80">
              Jane Alexander grew up surrounded by paintings by her great-great
              uncle Ambrose Patterson. He was a younger brother of her
              great-grandmother Louisa Braithwaite, who with her husband
              William, acquired a large collection of works by Patterson. By
              descent, many of these remain in her extended family&apos;s
              collections.
            </p>
            <p className="font-sans text-sm leading-[1.85] text-foreground/80">
              A writer, researcher and curator, Jane worked in the public
              galleries sector of Victoria for more than thirty years, holding
              directorships of the McClelland Gallery and Sculpture Park and the
              Mornington Peninsula Regional Gallery. Her interest in Patterson
              initially resulted in a minor thesis towards a Master of Arts,
              followed closely by a touring exhibition of his works in
              1992–1993.
            </p>
            <p className="font-sans text-sm leading-[1.85] text-foreground/80">
              In the past five years she has undertaken extensive research and
              written this illuminating monograph — the first authoritative and
              comprehensive reference on this significant Australian-American
              artist.
            </p>
            <div className="mt-2 border-l-2 border-mauve pl-4">
              <p className="font-heading italic text-foreground/70 text-sm leading-relaxed">
                &ldquo;With unfettered access to family archives and thousands
                of primary sources, the author&apos;s scholarly work will
                enlighten readers, collectors and museum professionals
                alike.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
