import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import Header from "@/components/Header";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import ConsultationModal from "@/components/ConsultationModal";
import BackToTop from "@/components/BackToTop";
import { site } from "@/data/site";
import "./globals.css";

// Poppins for the whole site. next/font serves it from this site (no request
// to Google from visitors' browsers) and avoids a flash of the fallback font.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "CA in Thane",
    "chartered accountant Mumbai",
    "GST return filing",
    "income tax filing",
    "Virtual CFO services",
    "statutory compliance",
    "legal drafting",
    "company registration Thane",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#021a3d" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  name: site.name,
  description: site.description,
  telephone: site.phone,
  email: site.email,
  url: site.url,
  legalName: site.legalName,
  address: {
    "@type": "PostalAddress",
    streetAddress: "321, Lodha Signet, Kolshet Rd, Kolshet Industrial Area",
    addressLocality: "Thane West",
    addressRegion: "MH",
    postalCode: "400604",
    addressCountry: "IN",
  },
  areaServed: ["Thane", "Mumbai", "Navi Mumbai"],
  openingHours: "Mo-Sa 10:00-19:00",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning here only silences attribute differences on
    // <html>/<body> themselves, which is what browser extensions (password
    // managers, translators, dark-mode and grammar tools) cause by injecting
    // attributes before React hydrates. Real mismatches inside the app still
    // report normally.
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <TopBar />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFab />
        <ConsultationModal />
        <BackToTop />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
