'use client';

import Link from 'next/link';
import { Check, BookOpen, ArrowRight } from 'lucide-react';
import type { CityData } from '@/config/cityData';
import { Card } from "@/components/ui/card";
import { bangaloreLocalities } from '@/config/localityData';
import { blogPosts } from '@/config/blogData';

interface CitySEOContentProps {
  city: CityData;
}

export default function CitySEOContent({ city }: CitySEOContentProps) {
  const cityName = city.name;
  const isBangalore = city.slug === 'bengaluru';

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">

        {/* Comparison Table */}
        <div className="mb-12">
          <h3 className="text-xl sm:text-2xl font-bold font-headline text-center text-slate-900 mb-6">
            Comparison: Buying vs. Renting RO in {cityName}
          </h3>
          <Card className="shadow-lg overflow-hidden border-border max-w-2xl mx-auto">
            {[
              { label: 'Feature', buy: 'Buying RO', rent: 'Droppurity Rental', isHead: true },
              { label: 'Upfront Cost', buy: '₹15,000 - ₹20,000', rent: '₹0 (Zero)' },
              { label: 'Installation', buy: '₹500 - ₹1,000', rent: 'FREE' },
              { label: 'Maintenance (Yearly)', buy: '₹3,000 - ₹5,000', rent: 'FREE' },
              { label: 'Filter Replacement', buy: 'Paid', rent: 'FREE' },
              { label: 'Relocation', buy: 'Paid & Hassle', rent: 'FREE' },
            ].map((row, i) => (
              <div key={i} className={`grid grid-cols-[40%_30%_30%] ${i < 5 ? 'border-b border-slate-100' : ''} ${row.isHead ? 'bg-blue-50/50 border-b border-slate-200' : ''}`}>
                <div className={`p-3 sm:p-4 text-[13px] sm:text-[15px] ${row.isHead ? 'font-bold text-sm sm:text-base' : 'font-medium'} text-slate-700 border-r ${row.isHead ? 'border-slate-200' : 'border-slate-100'} flex items-center`}>{row.label}</div>
                <div className={`p-3 sm:p-4 text-[13px] sm:text-[15px] ${row.isHead ? 'font-bold text-sm sm:text-base text-slate-500' : 'font-semibold text-slate-600'} border-r ${row.isHead ? 'border-slate-200' : 'border-slate-100'} text-center flex items-center justify-center`}>{row.buy}</div>
                <div className={`p-3 sm:p-4 text-[13px] sm:text-[15px] ${row.isHead ? 'font-bold text-sm sm:text-base text-primary bg-blue-50/80' : 'font-bold text-green-600 bg-blue-50/30'} text-center flex items-center justify-center`}>{row.rent}</div>
              </div>
            ))}
          </Card>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Want a deeper breakdown? Read our{' '}
            <Link href="/blog/ro-purifier-rental-vs-buying" className="text-primary font-semibold hover:underline">
              full cost comparison: RO Rental vs Buying
            </Link>
          </p>
        </div>

        {/* SEO text content with internal links */}
        <div className="space-y-6 text-slate-700 leading-relaxed font-body">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-headline text-slate-900 mb-4">
              Why Rent an RO Water Purifier in {cityName}?
            </h2>
            <p>
              Access to clean, safe drinking water is essential, and in a bustling city like {cityName}, ensuring purity can be a challenge. That&apos;s where Droppurity comes in. We offer a smart, hassle-free alternative:{' '}
              <Link href="/plans" className="font-semibold text-primary hover:underline">RO Water Purifier on Rent in {cityName}</Link>, starting at just ₹299/month.
            </p>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-headline text-slate-900 mt-8 mb-3">
              The Smartest Way to Drink Pure Water in {cityName}
            </h3>
            <p className="mb-4">
              Why buy an expensive machine when you can simply subscribe? Our{' '}
              <Link href="/plans" className="font-semibold text-primary hover:underline">subscription plans</Link>{' '}
              are designed for the modern lifestyle of {cityName}. Our <strong className="font-semibold text-primary">Zero-Installation Fee</strong> and <strong className="font-semibold text-primary">Lifetime Free Maintenance</strong> policy means you never have to worry.{' '}
              {isBangalore && (
                <>Read our guide on <Link href="/blog/best-water-purifier-for-rented-apartments" className="text-primary font-semibold hover:underline">best water purifier for rented apartments</Link>.</>
              )}
            </p>
            <p>
              Our IoT-enabled purifiers monitor water quality in real-time, ensuring that every drop you drink meets the highest safety standards.
            </p>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-headline text-slate-900 mt-8 mb-4">
              Key Benefits for {cityName} Residents
            </h3>
            <ul className="space-y-3 list-none pl-0">
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span><strong className="font-semibold text-slate-800">Zero Down Payment:</strong>{' '}
                  <Link href="/plans" className="text-primary font-semibold hover:underline">Affordable rental plans from ₹299/month</Link>.
                </span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span><strong className="font-semibold text-slate-800">7-Day Risk-Free Trial:</strong>{' '}
                  <Link href="/trial" className="text-primary font-semibold hover:underline">Book your free trial</Link> in {cityName}.</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span><strong className="font-semibold text-slate-800">Free Relocation:</strong> Moving within {cityName}? We relocate your purifier for free.</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span><strong className="font-semibold text-slate-800">Tailored for {cityName} Water:</strong> RO+UV+Copper filters calibrated for {cityName}&apos;s TDS levels.{' '}
                  {isBangalore && <Link href="/blog/alkaline-water-benefits-ph-8-5" className="text-primary font-semibold hover:underline">Learn about alkaline water benefits</Link>}
                </span>
              </li>
            </ul>
            <p className="mt-4 text-sm">
              Have questions? Visit our <Link href="/faq" className="text-primary font-semibold hover:underline">FAQ page</Link> for answers about pricing, installation & maintenance.
            </p>
          </div>

          {/* Blog links section */}
          {blogPosts.length > 0 && (
            <div className="mt-10 pt-8 border-t border-slate-200">
              <h3 className="text-xl sm:text-2xl font-bold font-headline text-slate-900 mb-4 text-center">
                Learn More: Guides & Tips
              </h3>
              <div className="grid sm:grid-cols-3 gap-3">
                {blogPosts.slice(0, 3).map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-primary/30 hover:shadow-md transition-all group">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-primary" />
                      <span className="text-[11px] text-muted-foreground uppercase font-medium tracking-wider">Guide</span>
                    </div>
                    <h4 className="font-semibold text-slate-800 group-hover:text-primary transition-colors text-sm leading-snug">{post.title}</h4>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-3">
                <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-primary font-semibold hover:underline">
                  Read all guides & articles <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {isBangalore && (
            <div className="mt-12 pt-8 border-t border-slate-200">
              <h3 className="text-xl sm:text-2xl font-bold font-headline text-slate-900 mb-2 text-center">
                RO Water Purifier on Rent – Bangalore Areas
              </h3>
              <p className="text-center text-sm text-muted-foreground mb-6">
                We serve all major localities across Bengaluru with free installation and same-area relocation
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-sm text-slate-600 text-center">
                {bangaloreLocalities.map((area) => (
                  <Link key={area.slug} href={`/bengaluru/${area.slug}`} className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 hover:border-primary/40 hover:bg-primary/5 hover:text-primary transition-colors font-medium">
                    RO on rent in {area.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
