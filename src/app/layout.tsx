import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Geist } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
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
      className={cn("font-sans", geist.variable, playfair.variable)}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
