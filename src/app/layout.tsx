
"use client";

import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import { usePathname } from 'next/navigation';

// Since this is a client component, we're adding SEO tags directly in the <head>.
// For a server component, using the Next.js Metadata API would be preferred.

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const showHeader = pathname !== '/plans';
  
  // SEO Configuration
  const siteUrl = "https://www.droppurity.in"; // Replace with your actual domain
  const canonicalUrl = `${siteUrl}${pathname}`;
  const ogImageUrl = `${siteUrl}/hero.png`;
  const siteTitle = "Droppurity: Smart Water Purifiers on Rent | Lifetime Free Maintenance";
  const siteDescription = "Get a Droppurity smart RO water purifier on rent. Enjoy pure, healthy water with zero down payment, lifetime free maintenance, and a 7-day risk-free trial. Plans from ₹299/mo.";

  const schema = {
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
  };

  return (
    <html lang="en">
      <head>
        {/* Basic SEO Tags */}
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
        <meta name="keywords" content="drop, drop aqua, puja ro water, ganga, gangotri, pani, ro pani, saaf pani, best ro purifier, ro purifier near me, best ro purifier in bokaro, ro in chas, ro in ranchi, ro in jamshedpur, ro in patna, ro in jharkhad, ro in west bengal, cheap and best ro purifier, best ro filer, filter on rent, rent ro" />
        <meta name="author" content="Droppurity" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Google-specific SEO */}
        <meta name="google-site-verification" content="YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:site_name" content="Droppurity" />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:description" content={siteDescription} />
        <meta name="twitter:image" content={ogImageUrl} />

        {/* Structured Data (JSON-LD) for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />

        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        {showHeader && <Header />}
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <Toaster />
      </body>
    </html>
  );
}
