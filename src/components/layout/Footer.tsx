
import Link from 'next/link';
import Image from 'next/image';
import { Twitter, Linkedin, Facebook, Instagram, Youtube, MessageCircle, ArrowUpCircle } from 'lucide-react';

const socialLinks = [
  { icon: Twitter, href: 'https://x.com/droppurity', label: 'Droppurity Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com/company/droppurity', label: 'Droppurity LinkedIn' },
  { icon: Facebook, href: 'https://facebook.com/droppurity', label: 'Droppurity Facebook' },
  { icon: Instagram, href: 'https://instagram.com/droppurity', label: 'Droppurity Instagram' },
  { icon: MessageCircle, href: 'https://wa.me/917979784087', label: 'Droppurity WhatsApp' },
  { icon: Youtube, href: 'https://youtube.com/@droppurity', label: 'Droppurity YouTube' },
];

const getFilenameFromUrl = (url: string): string => {
  const parts = url.split('/');
  return parts[parts.length -1];
}

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  const logoPath = "/logof.png";
  const logoFilename = getFilenameFromUrl(logoPath);

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          
          {/* Column 1: Logo and Address */}
          <div className="sm:col-span-2 md:col-span-1 space-y-3">
            <Link href="/" className="flex items-center">
              <Image src={logoPath} alt={logoFilename} width={100} height={39.5} className="object-contain" />
            </Link>
            <p className="text-xs text-primary-foreground/80">
              Smart Purifiers on Rent. Free Maintenance for Life.
            </p>
            <div>
              <p className="text-xs text-primary-foreground/80">
                <strong>Main Branch:</strong><br />
                Plot No. 21, Adarsh Nagar,<br />
                Opp. Shivaji Chowk, Khadgaon Road,<br />
                WADI, NAGPUR - 440 023. (MH.)
              </p>
              <p className="text-xs text-primary-foreground/80 mt-1.5">
                <strong>Corporate Office:</strong><br />
                B-503, Shivalik Enclave, Obaria Road,<br />
                Hatia, Near Nandan Palace,<br />
                Ranchi - 834003
              </p>
              <p className="text-xs text-primary-foreground/80 mt-1.5">
                <strong>Patna Office:</strong><br />
                East ram Krishna nagar,<br />
                near gdm college, Patna - 800027.
              </p>
              <p className="text-xs text-primary-foreground/80 mt-1.5">
                <strong>Bokaro Office:</strong><br />
                Shivpuri colony, chas,<br />
                Bokaro, Jharkhand - 827013.
              </p>
            </div>
          </div>

          {/* Column 2: Premium Drinking Water */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-yellow-300">Premium Drinking Water</h3>
            <ul className="space-y-1.5">
              <li><Link href="/" className="text-xs text-primary-foreground/90 hover:text-primary-foreground transition-colors">Home</Link></li>
              <li><Link href="/plans" className="text-xs text-primary-foreground/90 hover:text-primary-foreground transition-colors">Plans</Link></li>
              <li><Link href="/#how-it-works" className="text-xs text-primary-foreground/90 hover:text-primary-foreground transition-colors">How it works</Link></li>
              <li><Link href="/#droppurity-advantage" className="text-xs text-primary-foreground/90 hover:text-primary-foreground transition-colors">Droppurity Advantage</Link></li>
              <li><Link href="/plans" className="text-xs text-primary-foreground/90 hover:text-primary-foreground transition-colors">Our Products</Link></li>
            </ul>
          </div>

          {/* Column 3: Explore */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-yellow-300">Explore</h3>
            <ul className="space-y-1.5">
              <li><Link href="/about" className="text-xs text-primary-foreground/90 hover:text-primary-foreground transition-colors">About</Link></li>
              <li><Link href="/careers" className="text-xs text-primary-foreground/90 hover:text-primary-foreground transition-colors">Careers</Link></li>
              <li><Link href="/blog" className="text-xs text-primary-foreground/90 hover:text-primary-foreground transition-colors">Blog</Link></li>
              <li><Link href="/faq" className="text-xs text-primary-foreground/90 hover:text-primary-foreground transition-colors">FAQs</Link></li>
              <li><Link href="/contact" className="text-xs text-primary-foreground/90 hover:text-primary-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Column 4: Terms and Refer */}
          <div className="space-y-6">
            <div className="space-y-3">
                <h3 className="text-base font-semibold text-yellow-300">Terms</h3>
                <ul className="space-y-1.5">
                  <li><Link href="/privacy" className="text-xs text-primary-foreground/90 hover:text-primary-foreground transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="text-xs text-primary-foreground/90 hover:text-primary-foreground transition-colors">Terms of Use</Link></li>
                </ul>
            </div>
            <div className="space-y-3">
                <h3 className="text-base font-semibold text-yellow-300">Refer & Earn</h3>
                <ul className="space-y-1.5">
                    <li>
                        <Link href="/#refer-and-earn" className="text-xs text-primary-foreground/90 hover:text-primary-foreground transition-colors">
                            Refer now
                        </Link>
                    </li>
                </ul>
            </div>
          </div>

        </div>

        {/* Social Media and Scroll to Top */}
        <div className="border-t border-primary-foreground/30 pt-6 flex flex-col sm:flex-row justify-between items-center gap-5">
          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <Link key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="text-primary-foreground/90 hover:text-primary-foreground transition-colors">
                <social.icon className="w-5 h-5" />
              </Link>
            ))}
          </div>
          <button
            onClick={scrollToTop}
            className="p-1.5 rounded-full bg-blue-700 hover:bg-blue-800 transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUpCircle className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center text-[10px] text-primary-foreground/80">
          <p>&copy; {new Date().getFullYear()} Droppurity. All rights reserved. Smart Purifiers on Rent.</p>
        </div>
      </div>
    </footer>
  );
}
