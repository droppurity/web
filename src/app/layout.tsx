
import type { Metadata } from 'next';
import './globals.css';
import ClientLayout from '@/components/layout/ClientLayout';

const siteUrl = "https://www.droppurity.in";
const siteTitle = "RO on Rent @ ₹299/month | Free Installation & Service – Droppurity";
const siteDescription = "Get RO water purifier on rent for just ₹299/month. Free installation, free maintenance & filter replacement. Ideal for homes & rented houses. Book now.";
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
  keywords: ["ro water purifier on rent", "water purifier rental", "ro on rent", "droppurity", "ro water filter for home", "best ro purifier", "ro purifier near me", "best ro purifier", "cheap and best ro purifier", "best ro filer", "filter on rent", "rent ro"],
  authors: [{ name: 'Droppurity', url: siteUrl }],
  creator: 'Droppurity',
  robots: {
    index: true,
    follow: true,
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
        alt: 'A Droppurity RO water purifier, perfect for any home.',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [ogImageUrl],
  },
  verification: {
    google: 'YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE',
  },
  alternates: {
    canonical: '/',
  },
  other: {
    'application/ld+json': JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Droppurity",
      "serviceType": "RO Water Purifier Rental",
      "provider": {
        "@type": "Organization",
        "name": "Droppurity",
        "url": siteUrl,
        "logo": `${siteUrl}/logo.png`,
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91-79797-84087",
          "contactType": "Customer Service",
          "email": "official@droppurity.in"
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Shivpuri colony, chas",
          "addressLocality": "Bokaro",
          "postalCode": "827013",
          "addressRegion": "Jharkhand",
          "addressCountry": "IN"
        },
        "sameAs": [
          "https://x.com/droppurity",
          "https://linkedin.com/company/droppurity",
          "https://facebook.com/droppurity",
          "https://instagram.com/droppurity",
          "https://youtube.com/@droppurity"
        ]
      },
      "areaServed": {
        "@type": "Country",
        "name": "India"
      },
      "offers": {
        "@type": "Offer",
        "price": "299",
        "priceCurrency": "INR",
        "description": "Monthly rental starting from ₹299."
      },
      "description": "Smart RO water purifiers on rent with lifetime free maintenance."
    })
  }
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
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
