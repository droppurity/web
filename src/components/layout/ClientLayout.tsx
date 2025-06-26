"use client";

import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import FreeTrialDialog from '@/components/droppurity/FreeTrialDialog';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Don't show header on the full-page plan selection view
  const showHeader = pathname !== '/plans';

  const [isTrialDialogOpen, setIsTrialDialogOpen] = useState(false);
  const triggeredRef = useRef(false);

  useEffect(() => {
    // Do not show the dialog on form-related or secondary pages
    if (['/form', '/thank-you', '/contact', '/about', '/plans', '/faq', '/careers', '/blog', '/privacy', '/terms'].includes(pathname)) {
        return;
    }
    
    const openDialogOnce = () => {
        // Check session storage first, then check the ref to ensure it only runs once
        if (sessionStorage.getItem('trialDialogShown') === 'true' || triggeredRef.current) {
            return;
        }
        triggeredRef.current = true;
        sessionStorage.setItem('trialDialogShown', 'true');
        setIsTrialDialogOpen(true);
    };

    const timers = [
        setTimeout(() => openDialogOnce(), 2000),
        setTimeout(() => openDialogOnce(), 10000),
        setTimeout(() => openDialogOnce(), 20000),
        setTimeout(() => openDialogOnce(), 50000),
    ];

    const handleScroll = () => {
        openDialogOnce();
    };

    window.addEventListener('scroll', handleScroll, { once: true });

    // Cleanup function to clear timers when the component unmounts or path changes
    return () => {
        timers.forEach(clearTimeout);
        // The scroll listener is auto-removed by `once: true`, but it's safe to call removeEventListener anyway
        window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]); // Rerun this logic if the user navigates to a new page

  return (
    <>
      {showHeader && <Header />}
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
      <Toaster />
      <FreeTrialDialog open={isTrialDialogOpen} onOpenChange={setIsTrialDialogOpen} />
    </>
  );
}
