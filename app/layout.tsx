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
  title: {
    default: "Worthless Haunted Meat",
    template: "%s | Worthless Haunted Meat",
  },
  description:
    "We discover what people love — then we use AI to help them do more of it, and teach them to bring others along.",
  keywords: ["nonprofit", "AI", "community", "Texas", "501c3"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://worthlesshauntedmeat.org",
    siteName: "Worthless Haunted Meat",
    title: "Worthless Haunted Meat",
    description:
      "We discover what people love — then we use AI to help them do more of it, and teach them to bring others along.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Worthless Haunted Meat",
    description:
      "We discover what people love — then we use AI to help them do more of it, and teach them to bring others along.",
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
