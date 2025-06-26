
import type { Metadata } from 'next';
import './globals.css';
import ClientLayout from '@/components/layout/ClientLayout';

const siteUrl = "https://www.droppurity.in";
const siteTitle = "Droppurity: Smart Water Purifiers on Rent | Lifetime Free Maintenance";
const siteDescription = "Get a Droppurity smart RO water purifier on rent. Enjoy pure, healthy water with zero down payment, lifetime free maintenance, and a 7-day risk-free trial. Plans from ₹299/mo.";
const ogImageUrl = `${siteUrl}/hero.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | Droppurity`,
  },
  description: siteDescription,
  icons: {
    icon: [{ url: '/logo.png' }],
    shortcut: ['/logo.png'],
    apple: [
      { url: '/logo.png' },
      { url: '/logo.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  keywords: ["drop", "drop aqua", "puja ro water", "ganga", "gangotri", "pani", "ro pani", "saaf pani", "best ro purifier", "ro purifier near me", "best ro purifier in bokaro", "ro in chas", "ro in ranchi", "ro in jamshedpur", "ro in patna", "ro in jharkhad", "ro in west bengal", "cheap and best ro purifier", "best ro filer", "filter on rent", "rent ro"],
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
        alt: 'A family enjoying pure water from a Droppurity purifier.',
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
        "streetAddress": "Plot No. 21, Adarsh Nagar, Opp. Shivaji Chowk, Khadgaon Road",
        "addressLocality": "WADI, NAGPUR",
        "postalCode": "440023",
        "addressRegion": "MH",
        "addressCountry": "IN"
      },
      "sameAs": [
        "https://x.com/droppurity_placeholder",
        "https://linkedin.com/company/droppurity_placeholder",
        "https://facebook.com/droppurity_placeholder",
        "https://instagram.com/droppurity_placeholder",
        "https://youtube.com/@droppurity_placeholder"
      ]
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
