
"use client";

import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton'; // Added import
import { usePathname } from 'next/navigation';

// Metadata can still be defined, but it might be better to move it to specific page files if layout becomes fully client-side dependent for title etc.
// export const metadata: Metadata = {
//   title: 'Droppurity - Pure Water, Pure Life',
//   description: 'Discover the best water purifier solutions with Droppurity.',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const showHeader = pathname !== '/plans';

  return (
    <html lang="en">
      <head>
        <title>Droppurity - Pure Water, Pure Life</title>
        <meta name="description" content="Discover the best water purifier solutions with Droppurity." />
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
        <WhatsAppButton /> {/* Added WhatsApp button component */}
        <Toaster />
      </body>
    </html>
  );
}
