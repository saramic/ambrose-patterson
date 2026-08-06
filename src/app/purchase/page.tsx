import type { Metadata } from "next";
import { SiteNav } from "@/components/book/SiteNav";
import { SiteFooter } from "@/components/book/SiteFooter";
import { SectionHeader } from "@/components/book/SectionHeader";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const SITE_URL = "https://ambrosepatterson.com.au";

const TITLE =
  "Purchase — Ambrose Patterson: His Life & Art by Jane Alexander";
const DESCRIPTION =
  "Buy Ambrose Patterson: His Life & Art by Jane Alexander direct from ACVA or through Douglas Stewart Fine Books.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/purchase" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/purchase`,
    title: TITLE,
    description: DESCRIPTION,
  },
};

const acvaOptions = [
  {
    destination: "Australia only",
    detail:
      "Single books ($80AUD) plus packaging & post ($20) – total $100.00.",
  },
  {
    destination: "To the USA from Australia",
    detail:
      "Single book ($80AUD) plus packaging & post ($80AUD) – total $160.00AUD.",
  },
  {
    destination: "Economy sea to the UK from Australia",
    detail:
      "Single book ($80AUD) plus packaging & post ($70AUD) – total $150.00AUD.",
  },
  {
    destination: "Standard international to the UK from Australia",
    detail:
      "Single book ($80AUD) plus packaging & post $87.45AUD – total $167.45AUD.",
  },
];

export default function PurchasePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />
      <main className="flex-1">
        <section className="bg-background">
          <div className="max-w-5xl mx-auto px-6 py-20 md:py-24 flex flex-col gap-16">
            <SectionHeader
              label="Get Your Copy"
              title="Purchase the Book"
              subtitle="Ambrose Patterson: His Life & Art by Jane Alexander — order direct from ACVA or through Douglas Stewart Fine Books."
            />

            {/* ACVA Direct */}
            <div className="flex flex-col gap-8">
              <div className="max-w-3xl w-full mx-auto flex flex-col gap-4 bg-muted/40 rounded-sm p-8 border border-border/50">
                <h3 className="font-heading text-2xl text-foreground">
                  ACVA Direct
                </h3>
                <p className="font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground -mt-1">
                  How to Order
                </p>
                <ul className="flex flex-col gap-3 list-disc pl-5">
                  {acvaOptions.map((opt) => (
                    <li
                      key={opt.destination}
                      className="font-sans text-xs text-foreground/80 leading-relaxed">
                      <span className="text-foreground font-medium">
                        {opt.destination}:
                      </span>{" "}
                      {opt.detail}
                    </li>
                  ))}
                </ul>
                <p className="font-sans text-xs text-muted-foreground">
                  All other destinations and options need to be individually
                  quoted.
                </p>
                <Separator className="opacity-40" />
                <p className="font-sans text-sm text-foreground/80 leading-relaxed">
                  To enquire or arrange the direct purchase of a book, email
                  with your name, phone number and postal address, after which
                  further arrangements will be made.
                </p>
                <a
                  href="mailto:jane.alexander.acva@gmail.com?subject=Order%20Enquiry%20%E2%80%94%20Ambrose%20Patterson%3A%20His%20Life%20%26%20Art"
                  className={buttonVariants({
                    size: "lg",
                    className:
                      "font-sans tracking-wider uppercase text-xs w-full justify-center",
                  })}>
                  Email to Order
                </a>
                <p className="font-sans text-xs text-center text-muted-foreground">
                  jane.alexander.acva@gmail.com
                </p>
                <Separator className="opacity-40" />
                <p className="font-sans text-xs text-muted-foreground text-center">
                  Wholesale book enquiries to{" "}
                  <a
                    href="mailto:jane.alexander.acva@gmail.com"
                    className="text-foreground hover:text-primary transition-colors">
                    jane.alexander.acva@gmail.com
                  </a>
                </p>
              </div>
            </div>

            <Separator className="opacity-40" />

            {/* Douglas Stewart Fine Books */}
            <div className="flex flex-col gap-8">
              <div className="max-w-3xl w-full mx-auto flex flex-col gap-4 bg-muted/40 rounded-sm p-8 border border-border/50">
                <h3 className="font-heading text-2xl text-foreground">
                  Douglas Stewart Fine Books
                </h3>
                <address className="font-sans text-sm text-foreground/80 leading-relaxed not-italic">
                  720 High Street
                  <br />
                  Armadale, Victoria 3143
                  <br />
                  Australia
                </address>
                <div className="flex flex-col gap-1 text-sm font-sans">
                  <p>
                    <span className="text-muted-foreground">Telephone</span>{" "}
                    <a
                      href="tel:+61390660200"
                      className="text-foreground hover:text-primary transition-colors">
                      +61 (0) 3 9066 0200
                    </a>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Email</span>{" "}
                    <a
                      href="mailto:info@DouglasStewart.com.au"
                      className="text-foreground hover:text-primary transition-colors">
                      info@DouglasStewart.com.au
                    </a>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Website</span>{" "}
                    <a
                      href="https://douglasstewart.com.au"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-primary transition-colors">
                      www.DouglasStewart.com.au
                    </a>
                  </p>
                </div>
                <a
                  href="https://douglasstewart.com.au/product/ambrose-patterson-his-life-art-signed-copy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({
                    size: "lg",
                    className:
                      "font-sans tracking-wider uppercase text-xs w-full justify-center",
                  })}>
                  View Signed Copy on Douglas Stewart Fine Books
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
