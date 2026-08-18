import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import settings from "@/data/settings.json";
import Providers from "./providers";
import Loader from "@/components/Loader";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyReserveButton from "@/components/StickyReserveButton";

// Best-effort visual match for the real @gastrocafe.svoi Instagram logo
// (thin, delicate serif) — swapped from the heavier, higher-contrast
// Playfair Display at the user's request.
const displayFont = Cormorant_Garamond({
  variable: "--font-display-serif",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const siteUrl = "https://w1teen8.github.io/svoi-gastrocafe";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: settings.seo.title,
    template: `%s — ${settings.brand.fullName}`,
  },
  description: settings.seo.description,
  keywords: settings.seo.keywords,
  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: siteUrl,
    siteName: settings.brand.fullName,
    title: settings.seo.title,
    description: settings.seo.description,
  },
  twitter: {
    card: "summary_large_image",
    title: settings.seo.title,
    description: settings.seo.description,
  },
  alternates: {
    canonical: siteUrl,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: settings.brand.fullName,
  address: {
    "@type": "PostalAddress",
    addressLocality: settings.brand.city,
    addressCountry: "UA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: settings.contacts.coordinates.lat,
    longitude: settings.contacts.coordinates.lng,
  },
  telephone: settings.contacts.phone,
  servesCuisine: "Ukrainian, European, Gastro",
  priceRange: "$$",
  url: siteUrl,
  sameAs: [settings.contacts.instagram],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={`${displayFont.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-bg font-sans text-primary antialiased">
        <Providers>
          <Loader />
          <SmoothScroll />
          <CustomCursor />
          <ScrollProgress />
          <Navbar />
          {children}
          <Footer />
          <StickyReserveButton />
        </Providers>
      </body>
    </html>
  );
}
