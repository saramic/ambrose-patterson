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

export const metadata: Metadata = {
  title: "Ambrose Patterson: The Book About the Man - Coming Soon",
  description:
    "An anticipated biographical exploration of Ambrose Patterson's extraordinary life and legacy. Coming soon to readers everywhere.",
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
