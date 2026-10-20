import type { Metadata } from "next";
import { Syne, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://worthlesshauntedmeat.org"),
  title: {
    default: "Worthless Haunted Meat",
    template: "%s | Worthless Haunted Meat",
  },
  description:
    "We discover what people love, then use technology to help them do more of it, and we empower them to be force multipliers by sharing our knowledge, skills, and tools, not just the solutions themselves.",
  keywords: ["nonprofit", "technology", "community", "Texas", "501c3"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://worthlesshauntedmeat.org",
    siteName: "Worthless Haunted Meat",
    title: "Worthless Haunted Meat",
    description:
      "We discover what people love, then use technology to help them do more of it, and we empower them to be force multipliers by sharing our knowledge, skills, and tools, not just the solutions themselves.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Worthless Haunted Meat",
    description:
      "We discover what people love, then use technology to help them do more of it, and we empower them to be force multipliers by sharing our knowledge, skills, and tools, not just the solutions themselves.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Nav />
        <main id="main-content" className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
