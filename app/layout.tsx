import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const satoshi = localFont({
  src: [
    { path: "./fonts/Satoshi-Variable.woff2", weight: "300 900", style: "normal" },
    { path: "./fonts/Satoshi-VariableItalic.woff2", weight: "300 900", style: "italic" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://chancbaylor.com"),
  title: "Chanc Baylor | Senior Product Designer",
  description:
    "Chanc Baylor designs the hard parts of enterprise products: onboarding, permissions and data-heavy workflows.",
  openGraph: {
    title: "Chanc Baylor | Senior Product Designer",
    description:
      "Enterprise product design: onboarding, permissions and data-heavy workflows.",
    url: "https://chancbaylor.com",
    siteName: "Chanc Baylor",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={satoshi.variable}>
      <body>{children}</body>
    </html>
  );
}
