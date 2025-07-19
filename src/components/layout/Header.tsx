
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Menu, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { useState, useEffect, useRef } from 'react';
import { usePwaInstall } from '@/hooks/usePwaInstall';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/plans', label: 'Our Plans' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact Us' },
];

const getFilenameFromUrl = (url: string): string => {
  const parts = url.split('/');
  return parts[parts.length -1];
}

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);
  const { canInstall, installPwa } = usePwaInstall();
  const logoPath = "/logo.png";
  const logoFilename = getFilenameFromUrl(logoPath);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 56) { // 56px is header height
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`bg-card shadow-sm sticky top-0 z-50 transition-transform duration-300 ease-in-out ${
        isHeaderVisible ? 'transform-none' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center">
            <Image src={logoPath} alt={logoFilename} width={72} height={28} className="object-contain" priority />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Button key={item.label} variant="ghost" asChild className="text-sm px-3 py-1.5 h-auto">
                <Link href={item.href} className="text-foreground">
                  {item.label}
                </Link>
              </Button>
            ))}
            {canInstall && (
              <Button onClick={installPwa} size="sm" className="ml-2">
                <Download className="mr-2 h-4 w-4" />
                Install App
              </Button>
            )}
          </nav>

          {/* Mobile Navigation Trigger */}
          <div className="md:hidden flex items-center">
            {canInstall && (
              <Button onClick={installPwa} variant="ghost" size="icon" className="mr-1">
                <Download className="h-5 w-5" />
                 <span className="sr-only">Install App</span>
              </Button>
            )}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs bg-card p-0">
                <div className="flex flex-col h-full">
                  <div className="flex items-center p-4 border-b">
                    <SheetTitle asChild>
                      <Link href="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                         <Image src={logoPath} alt={logoFilename} width={72} height={28} className="object-contain" />
                      </Link>
                    </SheetTitle>
                  </div>
                  <nav className="flex flex-col gap-1 p-4 flex-grow overflow-y-auto">
                    {navItems.map((item) => (
                      <Button
                        key={item.label}
                        variant="ghost"
                        className="justify-start text-base py-2.5"
                        asChild
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Link href={item.href}>
                          {item.label}
                        </Link>
                      </Button>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
