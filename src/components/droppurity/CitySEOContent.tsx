'use client';

import { Check } from 'lucide-react';
import type { CityData } from '@/config/cityData';
import { Card } from "@/components/ui/card";

interface CitySEOContentProps {
  city: CityData;
}

export default function CitySEOContent({ city }: CitySEOContentProps) {
  const cityName = city.name;

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">

        {/* Comparison Table — shown first, right below the callback */}
        <div className="mb-12">
            <h3 className="text-xl sm:text-2xl font-bold font-headline text-center text-slate-900 mb-6">
                Comparison: Buying vs. Renting RO in {cityName}
            </h3>

            <Card className="shadow-lg overflow-hidden border-border max-w-2xl mx-auto">
              <div className="grid grid-cols-[40%_30%_30%] bg-blue-50/50 border-b border-slate-200">
                <div className="p-3 sm:p-4 text-sm sm:text-base font-bold text-slate-700 border-r border-slate-200 flex items-center">Feature</div>
                <div className="p-3 sm:p-4 text-sm sm:text-base font-bold text-center text-slate-500 border-r border-slate-200 flex items-center justify-center">Buying RO</div>
                <div className="p-3 sm:p-4 text-sm sm:text-base font-bold text-center text-primary bg-blue-50/80 flex items-center justify-center">Droppurity Rental</div>
              </div>

              <div className="grid grid-cols-[40%_30%_30%] border-b border-slate-100">
                <div className="p-3 sm:p-4 text-[13px] sm:text-[15px] font-medium text-slate-700 border-r border-slate-100 flex items-center">Upfront Cost</div>
                <div className="p-3 sm:p-4 text-[13px] sm:text-[15px] font-semibold text-slate-600 border-r border-slate-100 text-center flex items-center justify-center">₹15,000 - ₹20,000</div>
                <div className="p-3 sm:p-4 text-[13px] sm:text-[15px] font-bold text-green-600 bg-blue-50/30 text-center flex items-center justify-center">₹0 (Zero)</div>
              </div>

              <div className="grid grid-cols-[40%_30%_30%] border-b border-slate-100">
                <div className="p-3 sm:p-4 text-[13px] sm:text-[15px] font-medium text-slate-700 border-r border-slate-100 flex items-center">Installation</div>
                <div className="p-3 sm:p-4 text-[13px] sm:text-[15px] font-semibold text-slate-600 border-r border-slate-100 text-center flex items-center justify-center">₹500 - ₹1,000</div>
                <div className="p-3 sm:p-4 text-[13px] sm:text-[15px] font-bold text-green-600 bg-blue-50/30 text-center flex items-center justify-center">FREE</div>
              </div>

              <div className="grid grid-cols-[40%_30%_30%] border-b border-slate-100">
                <div className="p-3 sm:p-4 text-[13px] sm:text-[15px] font-medium text-slate-700 border-r border-slate-100 flex items-center">Maintenance (Yearly)</div>
                <div className="p-3 sm:p-4 text-[13px] sm:text-[15px] font-semibold text-slate-600 border-r border-slate-100 text-center flex items-center justify-center">₹3,000 - ₹5,000</div>
                <div className="p-3 sm:p-4 text-[13px] sm:text-[15px] font-bold text-green-600 bg-blue-50/30 text-center flex items-center justify-center">FREE</div>
              </div>

              <div className="grid grid-cols-[40%_30%_30%] border-b border-slate-100">
                <div className="p-3 sm:p-4 text-[13px] sm:text-[15px] font-medium text-slate-700 border-r border-slate-100 flex items-center">Filter Replacement</div>
                <div className="p-3 sm:p-4 text-[13px] sm:text-[15px] font-semibold text-slate-600 border-r border-slate-100 text-center flex items-center justify-center">Paid</div>
                <div className="p-3 sm:p-4 text-[13px] sm:text-[15px] font-bold text-green-600 bg-blue-50/30 text-center flex items-center justify-center">FREE</div>
              </div>

              <div className="grid grid-cols-[40%_30%_30%]">
                <div className="p-3 sm:p-4 text-[13px] sm:text-[15px] font-medium text-slate-700 border-r border-slate-100 flex items-center">Relocation</div>
                <div className="p-3 sm:p-4 text-[13px] sm:text-[15px] font-semibold text-slate-600 border-r border-slate-100 text-center leading-snug flex items-center justify-center">Paid &amp; Hassle</div>
                <div className="p-3 sm:p-4 text-[13px] sm:text-[15px] font-bold text-green-600 bg-blue-50/30 text-center flex items-center justify-center">FREE</div>
              </div>
            </Card>
        </div>

        {/* Intro / SEO text */}
        <div className="space-y-6 text-slate-700 leading-relaxed font-body">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-headline text-slate-900 mb-4">
              Why Rent an RO Water Purifier in {cityName}?
            </h2>
            <p>
              Access to clean, safe drinking water is essential, and in a bustling city like {cityName}, ensuring purity can be a challenge. Traditional methods like boiling or buying water cans are often inconvenient, expensive, or unreliable. That&apos;s where Droppurity comes in. We offer a smart, hassle-free alternative: <strong className="font-semibold">RO Water Purifier on Rent in {cityName}</strong>.
            </p>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-headline text-slate-900 mt-8 mb-3">
              The Smartest Way to Drink Pure Water in {cityName}
            </h3>
            <p className="mb-4">
              Why buy an expensive machine when you can simply subscribe? Our subscription plans are designed for the modern lifestyle of {cityName}. Whether you live in an apartment, independent house, or are renting a shared space, our <strong className="font-semibold text-primary">Zero-Installation Fee</strong> and <strong className="font-semibold text-primary">Lifetime Free Maintenance</strong> policy means you never have to worry about water quality again.
            </p>
            <p>
              Our IoT-enabled purifiers monitor water quality in real-time, ensuring that every drop you drink meets the highest safety standards. If the filter quality drops, our proactive service team in {cityName} is alerted instantly to schedule a service visit—often before you even notice.
            </p>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-headline text-slate-900 mt-8 mb-4">
              Key Benefits for {cityName} Residents
            </h3>
            <ul className="space-y-3 list-none pl-0">
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span><strong className="font-semibold text-slate-800">Zero Down Payment:</strong> Start your purified water journey without heavy upfront costs.</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span><strong className="font-semibold text-slate-800">7-Day Risk-Free Trial:</strong> Try our service in {cityName} for a week. If you&apos;re not satisfied, we take it back, no questions asked.</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span><strong className="font-semibold text-slate-800">Free Relocation:</strong> Moving within {cityName}? We relocate your purifier for free.</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span><strong className="font-semibold text-slate-800">Tailored for {cityName} Water:</strong> Our RO+UV+Copper filters are calibrated to treat the specific TDS levels commonly found in {cityName}&apos;s water supply.</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
