import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SectionHeader } from "./SectionHeader";

export function PurchaseSection() {
  return (
    <section id="purchase" className="bg-background">
      <div className="max-w-5xl mx-auto px-6 py-20 md:py-24 flex flex-col gap-14">
        <SectionHeader
          label="Get Your Copy"
          title="Purchase"
          subtitle="Direct orders only. Email to arrange your purchase — trade and international enquiries welcome."
        />
        <div className="max-w-xl mx-auto w-full flex flex-col gap-8">
          {/* Price card */}
          <div className="border border-border rounded-sm overflow-hidden">
            <div className="bg-primary px-8 py-5 flex items-center justify-between">
              <div>
                <p className="font-sans text-xs tracking-[0.2em] uppercase text-primary-foreground/70">
                  Hard-cover Monograph
                </p>
                <p className="font-heading text-3xl text-primary-foreground mt-1">
                  $89.95{" "}
                  <span className="text-lg font-sans font-normal">AUS</span>
                </p>
              </div>
              <div className="text-right">
                <p className="font-sans text-xs text-primary-foreground/60">
                  + postage &amp; packaging
                </p>
                <p className="font-sans text-xs text-primary-foreground/60 mt-0.5">
                  Trade &amp; international rates available
                </p>
              </div>
            </div>
            <div className="bg-card px-8 py-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <p className="font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground">
                  How to Order
                </p>
                <p className="font-sans text-sm text-foreground/80 leading-relaxed">
                  Email to arrange your purchase. Include your name, postal
                  address and quantity. Jane will respond with payment and
                  delivery details.
                </p>
              </div>
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
            </div>
          </div>

          <Separator className="opacity-40" />

          <div className="flex flex-col sm:flex-row justify-between gap-4 text-xs font-sans text-muted-foreground">
            <div>
              <span className="tracking-widest uppercase">ISBN</span>
              <span className="ml-2 text-foreground">978-0-6467-3365-4</span>
            </div>
            <div>
              <span className="tracking-widest uppercase">Format</span>
              <span className="ml-2 text-foreground">Hard-cover, 240pp</span>
            </div>
            <div>
              <span className="tracking-widest uppercase">Publisher</span>
              <span className="ml-2 text-foreground">ACVA, Australia</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
