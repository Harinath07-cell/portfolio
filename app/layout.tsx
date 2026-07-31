import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  metadataBase: new URL("https://harinath.dev"),
  title: {
    default: `${siteConfig.name} — Product Builder & AI Explorer`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.shortDescription,
  keywords: [
    "S. Harinath",
    "Portfolio",
    "Computer Science",
    "AI Explorer",
    "Product Builder",
    "Full Stack Developer",
    "Kumaraguru College of Technology",
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    title: `${siteConfig.name} — Product Builder & AI Explorer`,
    description: siteConfig.shortDescription,
    type: "website",
    url: "https://harinath.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Product Builder & AI Explorer`,
    description: siteConfig.shortDescription,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative overflow-x-hidden">
        <LoadingScreen />
        <SmoothScroll>
          <div aria-hidden className="noise-overlay" />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
