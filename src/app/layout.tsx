
import type { Metadata } from 'next';
import './globals.css';
import ClientLayout from '@/components/layout/ClientLayout';

const siteUrl = "https://droppurity.in";
const siteTitle = "RO Water Purifier on Rent | ₹299/mo | Free Install & Service – Droppurity";
const siteDescription = "Book a 7-Day Risk-Free Trial – RO Water Purifier on Rent in Bengaluru starting from ₹299/month only. Copper & Alkaline options available. Free installation, lifetime free maintenance. Don't like it? 100% refund. Droppurity.";
const ogImageUrl = `${siteUrl}/hero.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | Droppurity`,
  },
  description: siteDescription,
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png' },
    ],
  },
  keywords: [
    "ro water purifier on rent",
    "water purifier on rent",
    "ro on rent",
    "water purifier rental",
    "ro purifier rental india",
    "droppurity",
    "ro water filter for home",
    "best ro purifier on rent",
    "ro purifier near me",
    "alkaline water purifier on rent",
    "copper water purifier on rent",
    "water purifier subscription",
    "rent ro purifier monthly",
    "free installation water purifier",
    "lifetime maintenance ro purifier",
    "water purifier bangalore",
    "water purifier delhi",
    "water purifier mumbai",
    "water purifier hyderabad",
    "water purifier pune",
    "water purifier chennai",
    "purifier on rent without deposit",
    "7 day free trial water purifier",
    "ro purifier for rented house",
    "zero cost ro purifier",
    "cheapest ro purifier",
    "drinking water near me",
    "reverse osmosis",
    "kent ro",
    "livpure",
    "pureit ro",
    "aquaguard on rent",
    "drinkprime.in",
    "blue star ro",
    "ao smith water purifier",
    "water purifier comparison india",
    "top water purifier brands",
    "ro vs uv purifier",
    "water filter near me",
    "safe drinking water",
    "smart water purifier",
    "iot water purifier",
  ],
  authors: [{ name: 'Droppurity', url: siteUrl }],
  creator: 'Drop Technologies Private Ltd',
  publisher: 'Drop Technologies Private Ltd',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    title: siteTitle,
    description: siteDescription,
    siteName: "Droppurity",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: 'Droppurity RO Water Purifier on Rent – Starting at ₹299/month',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [ogImageUrl],
    site: "@droppurity",
    creator: "@droppurity",
  },
  verification: {
    google: 'YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE',
  },
  alternates: {
    canonical: siteUrl,
  },
  category: 'home appliances',
};

// Organization + Service + Offer JSON-LD schema
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "@id": `${siteUrl}/#organization`,
  "name": "Droppurity",
  "url": siteUrl,
  "logo": {
    "@type": "ImageObject",
    "url": `${siteUrl}/logo.png`,
    "width": 200,
    "height": 60,
  },
  "description": "Droppurity offers smart RO water purifiers on rent with lifetime free maintenance, free installation, and a 7-day risk-free trial across India.",
  "telephone": "+91-79797-84087",
  "email": "official@droppurity.in",
  "foundingDate": "2022",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "2nd cross, Vinayaka Layout, Rayasandra",
    "addressLocality": "Bengaluru",
    "postalCode": "560100",
    "addressRegion": "Karnataka",
    "addressCountry": "IN",
  },
  "areaServed": [
    { "@type": "City", "name": "Bengaluru" },
    { "@type": "City", "name": "Delhi" },
    { "@type": "City", "name": "Mumbai" },
    { "@type": "City", "name": "Hyderabad" },
    { "@type": "City", "name": "Pune" },
    { "@type": "City", "name": "Chennai" },
    { "@type": "City", "name": "Kolkata" },
    { "@type": "City", "name": "Noida" },
    { "@type": "City", "name": "Gurugram" },
    { "@type": "City", "name": "Faridabad" },
    { "@type": "City", "name": "Ghaziabad" },
    { "@type": "City", "name": "Bokaro Steel City" },
  ],
  "sameAs": [
    "https://x.com/droppurity",
    "https://linkedin.com/company/droppurity",
    "https://facebook.com/droppurity",
    "https://instagram.com/droppurity",
    "https://youtube.com/@droppurity",
  ],
  "priceRange": "₹₹",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "RO Water Purifier Rental Plans",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Droppurity RO+ Water Purifier",
          "description": "Advanced RO+UV+Copper purification. Ideal for standard families.",
          "brand": { "@type": "Brand", "name": "Droppurity" },
        },
        "price": "299",
        "priceCurrency": "INR",
        "priceSpecification": { "@type": "UnitPriceSpecification", "price": "299", "priceCurrency": "INR", "unitText": "month" },
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Droppurity Copper Water Purifier",
          "description": "Enriched with natural copper minerals for immunity and wellness.",
          "brand": { "@type": "Brand", "name": "Droppurity" },
        },
        "price": "384",
        "priceCurrency": "INR",
        "priceSpecification": { "@type": "UnitPriceSpecification", "price": "384", "priceCurrency": "INR", "unitText": "month" },
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Droppurity Alkaline Water Purifier",
          "description": "Restores essential minerals and provides up to 8.5 pH balance. Ideal for acidity concerns.",
          "brand": { "@type": "Brand", "name": "Droppurity" },
        },
        "price": "374",
        "priceCurrency": "INR",
        "priceSpecification": { "@type": "UnitPriceSpecification", "price": "374", "priceCurrency": "INR", "unitText": "month" },
      },
    ],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  "url": siteUrl,
  "name": "Droppurity",
  "description": siteDescription,
  "publisher": { "@id": `${siteUrl}/#organization` },
  "potentialAction": {
    "@type": "SearchAction",
    "target": { "@type": "EntryPoint", "urlTemplate": `${siteUrl}/plans?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Book 7-Day Free Trial – Bengaluru", "item": `${siteUrl}/trial` },
    { "@type": "ListItem", "position": 2, "name": "Copper RO Purifier on Rent", "item": `${siteUrl}/plans#copper` },
    { "@type": "ListItem", "position": 3, "name": "Alkaline RO Purifier on Rent", "item": `${siteUrl}/plans#alkaline` },
    { "@type": "ListItem", "position": 4, "name": "Our Plans", "item": `${siteUrl}/plans` },
    { "@type": "ListItem", "position": 5, "name": "Rent RO Purifier in Bangalore", "item": `${siteUrl}/bengaluru` },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
          <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
