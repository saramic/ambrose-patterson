import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

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
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
