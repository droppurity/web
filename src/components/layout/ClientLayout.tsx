
"use client";

import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import InstallPwaButton from '@/components/layout/InstallPwaButton';
import { usePathname } from 'next/navigation';
import AppAuthProvider from './AuthProvider';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Don't show header/footer on login page or full-page plan selection view
  const showHeader = pathname !== '/plans' && pathname !== '/login';
  const showFooter = pathname !== '/login';


  return (
    <AppAuthProvider>
      {showHeader && <Header />}
      <main className="flex-grow">
        {children}
      </main>
      {showFooter && <Footer />}
      <WhatsAppButton />
      <InstallPwaButton />
      <Toaster />
    </AppAuthProvider>
  );
}
