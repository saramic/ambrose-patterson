import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Geist } from "next/font/google";
import { Libre_Baskerville } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const SITE_URL = "https://ambrosepatterson.com";
const OG_TITLE = "Ambrose Patterson: His Life & Art";
const OG_DESCRIPTION =
  "The first authoritative monograph on the significant Australian-American modernist — from bohemian Paris at the fin de siècle to the Pacific Northwest. By Jane Alexander.";

export const metadata: Metadata = {
  title: {
    default: OG_TITLE,
    template: `%s — Ambrose Patterson`,
  },
  description: OG_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    siteName: "Ambrose Patterson: His Life & Art",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ambrose Patterson: His Life & Art — book cover",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("font-sans", geist.variable, libreBaskerville.variable)}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
