import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ – RO Water Purifier on Rent | Droppurity',
  description: 'Get answers to all your questions about Droppurity\'s water purifier rental service – pricing, installation, maintenance, relocation, security deposit, and 7-day risk-free trial.',
  alternates: {
    canonical: '/faq',
  },
  openGraph: {
    title: 'Frequently Asked Questions | Droppurity RO Purifier Rental',
    description: 'Everything you need to know about renting an RO water purifier from Droppurity. Free installation, lifetime maintenance, 7-day trial & more.',
    url: 'https://www.droppurity.in/faq',
  },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
