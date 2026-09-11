import type { Metadata } from "next";
import { SiteNav } from "@/components/book/SiteNav";
import { SiteFooter } from "@/components/book/SiteFooter";
import { SectionHeader } from "@/components/book/SectionHeader";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const SITE_URL = "https://ambrosepatterson.com.au";

export const revalidate = 3600;

const TITLE = "Purchase — Ambrose Patterson: His Life & Art by Jane Alexander";

export function generateMetadata(): Metadata {
  const description =
    "Buy Ambrose Patterson: His Life & Art by Jane Alexander direct from ACVA or from the following bookshops.";

  return {
    title: TITLE,
    description,
    alternates: { canonical: "/purchase" },
    openGraph: {
      type: "website",
      url: `${SITE_URL}/purchase`,
      title: TITLE,
      description,
    },
  };
}

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
              subtitle="Ambrose Patterson: His Life & Art by Jane Alexander can be purchased direct from ACVA or from the following bookshops."
            />

            <div className="flex flex-col gap-8">
              <div className="max-w-3xl w-full mx-auto flex flex-col gap-4 bg-muted/40 rounded-sm p-8 border border-border/50">
                <h3 className="font-heading text-2xl text-foreground">
                  ACVA Direct
                </h3>
                <p className="font-sans text-base text-foreground/80 leading-relaxed">
                  Email{" "}
                  <a
                    href="mailto:jane.alexander.acva@gmail.com"
                    className="text-foreground hover:text-primary transition-colors">
                    Jane Alexander direct
                  </a>{" "}
                  for book prices, postage costs and all trade/wholesale
                  enquiries.
                </p>
                <a
                  href="mailto:jane.alexander.acva@gmail.com?subject=Book%20Enquiry%20%E2%80%94%20Ambrose%20Patterson%3A%20His%20Life%20%26%20Art"
                  className={buttonVariants({
                    size: "lg",
                    className:
                      "font-sans tracking-wider uppercase text-xs w-full justify-center",
                  })}>
                  Email ACVA Direct
                </a>
              </div>
            </div>

            <Separator className="opacity-40" />

            <div className="grid gap-8 md:grid-cols-2">
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
                    <span className="text-muted-foreground">Phone</span>{" "}
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
                  View on Douglas Stewart Fine Books
                </a>
              </div>

              <div className="max-w-3xl w-full mx-auto flex flex-col gap-4 bg-muted/40 rounded-sm p-8 border border-border/50">
                <h3 className="font-heading text-2xl text-foreground">
                  Readings Books - Carlton
                </h3>
                <address className="font-sans text-sm text-foreground/80 leading-relaxed not-italic">
                  <a
                    href="https://www.google.com/maps/search/Carlton+309+Lygon+Street?entry=gmail&source=g"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-primary transition-colors">
                    309 Lygon Street
                  </a>
                  <br />
                  Carlton 3053
                  <br />
                  Australia
                </address>
                <div className="flex flex-col gap-1 text-sm font-sans">
                    <p>
                      <span className="text-muted-foreground">Phone</span>{" "}
                      <a
                        href="tel:+61393476633"
                        className="text-foreground hover:text-primary transition-colors">
                        (03) 9347 6633
                      </a>
                    </p>
                    <p>
                      <span className="text-muted-foreground">Email</span>{" "}
                      <a
                        href="mailto:carlton@readings.com.au"
                        className="text-foreground hover:text-primary transition-colors">
                        carlton@readings.com.au
                      </a>
                    </p>
                  </div>
                <a
                  href="https://www.readings.com.au/search/results?query=ambrose+patterson"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({
                    size: "lg",
                    className:
                      "font-sans tracking-wider uppercase text-xs w-full justify-center",
                  })}>
                  View on Readings Books
                </a>
              </div>
            </div>

            <Separator className="opacity-40" />

            <div className="flex flex-col gap-8">
              <div className="max-w-3xl w-full mx-auto flex flex-col gap-5 bg-muted/40 rounded-sm p-8 border border-border/50">
                <h3 className="font-heading text-2xl text-foreground">
                  Stockists
                </h3>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="font-sans text-sm text-foreground/80 leading-relaxed">
                    <h4 className="font-heading text-xl text-foreground mb-2">
                      National Gallery of Australia
                    </h4>
                    <address className="font-sans text-sm text-foreground/80 leading-relaxed not-italic">
                      Canberra, ACT
                    </address>
                    <div className="mt-3 flex flex-col gap-1 text-sm font-sans">
                      <p>
                        <span className="text-muted-foreground">Phone</span>{" "}
                        <a
                          href="tel:+61262406411"
                          className="text-foreground hover:text-primary transition-colors">
                          +61 2 6240 6411
                        </a>
                      </p>
                      <p>
                        <span className="text-muted-foreground">Email</span>{" "}
                        <a
                          href="mailto:shop@nga.gov.au"
                          className="text-foreground hover:text-primary transition-colors">
                          shop@nga.gov.au
                        </a>
                      </p>
                    </div>
                    <a
                      href="https://nga.gov.au/visit/art-store/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonVariants({
                        size: "lg",
                        className:
                          "font-sans tracking-wider uppercase text-xs w-full justify-center mt-4",
                      })}>
                      Visit National Gallery of Australia
                    </a>
                  </div>

                  <div className="font-sans text-sm text-foreground/80 leading-relaxed">
                    <h4 className="font-heading text-xl text-foreground mb-2">
                      National Library of Australia
                    </h4>
                    <address className="font-sans text-sm text-foreground/80 leading-relaxed not-italic">
                      Canberra, ACT
                    </address>
                    <div className="mt-3 flex flex-col gap-1 text-sm font-sans">
                      <p>
                        <span className="text-muted-foreground">Phone</span>{" "}
                        <a
                          href="tel:+61262621111"
                          className="text-foreground hover:text-primary transition-colors">
                          +61 2 6262 1111
                        </a>
                      </p>
                      <p>
                        <span className="text-muted-foreground">Email</span>{" "}
                        <a
                          href="mailto:library.shop@nla.gov.au"
                          className="text-foreground hover:text-primary transition-colors">
                          library.shop@nla.gov.au
                        </a>
                      </p>
                    </div>
                    <a
                      href="https://www.library.gov.au/visit/bookshop"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonVariants({
                        size: "lg",
                        className:
                          "font-sans tracking-wider uppercase text-xs w-full justify-center mt-4",
                      })}>
                      Visit National Library of Australia
                    </a>
                  </div>

                  <div className="font-sans text-sm text-foreground/80 leading-relaxed">
                    <h4 className="font-heading text-xl text-foreground mb-2">
                      Art Gallery of South Australia
                    </h4>
                    <address className="font-sans text-sm text-foreground/80 leading-relaxed not-italic">
                      Adelaide, South Australia
                    </address>
                    <div className="mt-3 flex flex-col gap-1 text-sm font-sans">
                      <p>
                        <span className="text-muted-foreground">Phone</span>{" "}
                        <a
                          href="tel:+61870851683"
                          className="text-foreground hover:text-primary transition-colors">
                          +61 8 7085 1683
                        </a>
                      </p>
                      <p>
                        <span className="text-muted-foreground">Email</span>{" "}
                        <a
                          href="mailto:shop@artgallery.sa.gov.au"
                          className="text-foreground hover:text-primary transition-colors">
                          shop@artgallery.sa.gov.au
                        </a>
                      </p>
                    </div>
                    <a
                      href="https://www.agsa.sa.gov.au/visit/gallery-shop/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonVariants({
                        size: "lg",
                        className:
                          "font-sans tracking-wider uppercase text-xs w-full justify-center mt-4",
                      })}>
                      Visit Art Gallery of South Australia
                    </a>
                  </div>

                  <div className="hidden md:block" aria-hidden="true" />
                </div>
              </div>
            </div>

            <p className="max-w-3xl mx-auto w-full px-6 text-sm text-muted-foreground leading-relaxed text-left">
              Stockists will periodically be updated.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
