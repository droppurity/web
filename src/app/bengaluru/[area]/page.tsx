import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check, MapPin, Phone, Droplets, Shield, Clock, ArrowRight, Star, IndianRupee, Wrench, BookOpen } from 'lucide-react';
import { bangaloreLocalities, getLocalityBySlug, getAllLocalitySlugs, type LocalityData } from '@/config/localityData';
import AreaTrialForm from '@/components/droppurity/AreaTrialForm';
import { blogPosts } from '@/config/blogData';

// Generate static pages for all localities
export async function generateStaticParams() {
  return getAllLocalitySlugs().map((area) => ({ area }));
}

export async function generateMetadata({ params }: { params: Promise<{ area: string }> }): Promise<Metadata> {
  const { area: areaSlug } = await params;
  const locality = getLocalityBySlug(areaSlug);

  if (!locality) {
    return { title: 'Area Not Found' };
  }

  const siteUrl = 'https://www.droppurity.in';
  const title = `RO Water Purifier on Rent in ${locality.name}, Bengaluru | ₹299/mo – Droppurity`;
  const description = `Rent an RO water purifier in ${locality.name}, Bengaluru starting ₹299/month. Free installation within 48 hrs, lifetime free maintenance, free filter replacement & free relocation. 7-day risk-free trial in ${locality.name}. Book now!`;

  return {
    title,
    description,
    keywords: locality.keywords,
    alternates: {
      canonical: `${siteUrl}/bengaluru/${locality.slug}`,
    },
    openGraph: {
      title: `RO Purifier on Rent in ${locality.name} | ₹299/mo | Free Install – Droppurity`,
      description: `Get a premium RO water purifier on rent in ${locality.name}, Bengaluru. Starting ₹299/mo with free installation, free maintenance, and a 7-day trial.`,
      url: `${siteUrl}/bengaluru/${locality.slug}`,
      type: 'website',
      locale: 'en_IN',
      siteName: 'Droppurity',
    },
    twitter: {
      card: 'summary_large_image',
      title: `RO Purifier on Rent in ${locality.name} | Droppurity`,
      description: `Rent a water purifier in ${locality.name}, Bengaluru from ₹299/mo. Free install, lifetime service. 7-day trial.`,
    },
  };
}

// FAQ data specific to locality - with internal links for SEO
function getLocalityFAQs(locality: LocalityData) {
  return [
    {
      question: `What is the cost of renting an RO purifier in ${locality.name}, Bengaluru?`,
      answer: `Droppurity offers RO water purifier rental in ${locality.name} starting at just ₹299/month with zero upfront costs. This includes free installation, free lifetime maintenance, and free filter replacements. Check our complete pricing on the plans page.`,
      hasLinks: true,
      linkHtml: `Droppurity offers <a href="/plans" class="text-primary font-semibold hover:underline">RO water purifier rental plans</a> in ${locality.name} starting at just ₹299/month with zero upfront costs. This includes free installation, free lifetime maintenance, and free filter replacements.`,
    },
    {
      question: `Does Droppurity provide free installation in ${locality.name}?`,
      answer: `Yes! We provide completely free installation in ${locality.name} and all across Bengaluru within 48 hours of booking. Our trained technicians handle everything – you just need to show us where you want the purifier installed.`,
    },
    {
      question: `What type of RO purifier is best for ${locality.name}'s water?`,
      answer: `${locality.waterQualityNote} Our RO+UV+UF purifiers with multi-stage filtration are ideal for ${locality.name}'s water quality. We also offer Copper and Alkaline variants for added health benefits.`,
      hasLinks: true,
      linkHtml: `${locality.waterQualityNote} Our RO+UV+UF purifiers with multi-stage filtration are ideal for ${locality.name}'s water quality. We also offer <a href="/plans" class="text-primary font-semibold hover:underline">Copper and Alkaline variants</a> for added health benefits. Read our <a href="/blog/alkaline-water-benefits-ph-8-5" class="text-primary font-semibold hover:underline">guide on alkaline water benefits</a>.`,
    },
    {
      question: `Can I try before subscribing in ${locality.name}?`,
      answer: `Absolutely! We offer a 7-day risk-free trial in ${locality.name}. If you're not satisfied with our service, we'll pick up the purifier and refund your security deposit – no questions asked.`,
      hasLinks: true,
      linkHtml: `Absolutely! We offer a <a href="/trial" class="text-primary font-semibold hover:underline">7-day risk-free trial</a> in ${locality.name}. If you're not satisfied with our service, we'll pick up the purifier and refund your security deposit – no questions asked.`,
    },
    {
      question: `What if I relocate within ${locality.name} or Bengaluru?`,
      answer: `No worries! We provide free relocation service across Bengaluru. Whether you're moving within ${locality.name} or to another area like ${locality.nearbyAreas.slice(0, 2).join(' or ')}, we'll reinstall your purifier at no extra cost.`,
    },
    {
      question: `How quickly can I get an RO purifier installed in ${locality.name}?`,
      answer: `We offer 48-hour installation in ${locality.name}. Book your free trial today and our team will contact you to schedule a convenient installation time.`,
      hasLinks: true,
      linkHtml: `We offer 48-hour installation in ${locality.name}. <a href="/trial" class="text-primary font-semibold hover:underline">Book your free trial today</a> and our team will contact you to schedule a convenient installation time.`,
    },
  ];
}

export default async function AreaPage({ params }: { params: Promise<{ area: string }> }) {
  const { area: areaSlug } = await params;
  const locality = getLocalityBySlug(areaSlug);

  if (!locality) {
    notFound();
  }

  const siteUrl = 'https://www.droppurity.in';
  const faqs = getLocalityFAQs(locality);

  // JSON-LD Schemas
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/bengaluru/${locality.slug}/#localbusiness`,
    "name": `Droppurity – RO Water Purifier on Rent in ${locality.name}, Bengaluru`,
    "url": `${siteUrl}/bengaluru/${locality.slug}`,
    "description": `Rent an RO water purifier in ${locality.name}, Bengaluru starting at ₹299/month. Free installation, lifetime maintenance, 7-day risk-free trial.`,
    "telephone": "+91-79797-84087",
    "email": "official@droppurity.in",
    "priceRange": "₹₹",
    "areaServed": {
      "@type": "Place",
      "name": `${locality.name}, Bengaluru`,
      "containedInPlace": {
        "@type": "City",
        "name": "Bengaluru",
      },
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `RO Water Purifier Rental Plans in ${locality.name}`,
      "itemListElement": [
        {
          "@type": "Offer",
          "name": `RO Water Purifier on Rent in ${locality.name} – Basic Plan`,
          "price": "299",
          "priceCurrency": "INR",
          "description": `Droppurity RO+ Basic Plan in ${locality.name}. 25 Litres/day. Free installation and lifetime maintenance.`,
          "availability": "https://schema.org/InStock",
        },
      ],
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": siteUrl },
      { "@type": "ListItem", "position": 2, "name": "Bengaluru", "item": `${siteUrl}/bengaluru` },
      { "@type": "ListItem", "position": 3, "name": locality.name, "item": `${siteUrl}/bengaluru/${locality.slug}` },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Water Purifier Rental",
    "provider": {
      "@type": "Organization",
      "name": "Droppurity",
      "url": siteUrl,
    },
    "areaServed": {
      "@type": "Place",
      "name": `${locality.name}, Bengaluru, Karnataka, India`,
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "RO Water Purifier Rental Plans",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Droppurity RO+ Water Purifier",
          },
          "price": "299",
          "priceCurrency": "INR",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "299",
            "priceCurrency": "INR",
            "unitText": "month",
          },
        },
      ],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
            {/* Breadcrumbs */}
            <nav className="text-sm text-blue-200 mb-6">
              <ol className="flex items-center gap-1.5 flex-wrap">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li>/</li>
                <li><Link href="/bengaluru" className="hover:text-white transition-colors">Bengaluru</Link></li>
                <li>/</li>
                <li className="text-white font-medium">{locality.name}</li>
              </ol>
            </nav>

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                <MapPin className="w-4 h-4" />
                <span>Serving {locality.name}, Bengaluru</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-headline leading-tight">
                RO Water Purifier on Rent in {locality.name}
              </h1>
              <p className="mt-3 text-lg sm:text-xl text-blue-100 leading-relaxed max-w-2xl">
                Get India&apos;s smartest RO water purifier delivered to your doorstep in {locality.name}. 
                <strong className="text-white"> Starting at just ₹299/month</strong> with free installation & lifetime free maintenance.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm bg-white/10 px-3 py-1.5 rounded-lg">
                  <Clock className="w-4 h-4 text-yellow-300" />
                  <span>48-Hour Installation</span>
                </div>
                <div className="flex items-center gap-2 text-sm bg-white/10 px-3 py-1.5 rounded-lg">
                  <Shield className="w-4 h-4 text-green-300" />
                  <span>7-Day Risk-Free Trial</span>
                </div>
                <div className="flex items-center gap-2 text-sm bg-white/10 px-3 py-1.5 rounded-lg">
                  <Wrench className="w-4 h-4 text-orange-300" />
                  <span>Lifetime Free Maintenance</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trial Form Section */}
        <AreaTrialForm locality={locality} />

        {/* Quick Highlights */}
        <section className="py-8 sm:py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {[
                { icon: IndianRupee, title: '₹299/month', subtitle: 'Starting Price', color: 'text-green-600 bg-green-50' },
                { icon: Shield, title: 'Free Install', subtitle: 'Zero Setup Cost', color: 'text-blue-600 bg-blue-50' },
                { icon: Wrench, title: 'Free Service', subtitle: 'Lifetime Maintenance', color: 'text-orange-600 bg-orange-50' },
                { icon: Droplets, title: '7-Day Trial', subtitle: '100% Risk-Free', color: 'text-cyan-600 bg-cyan-50' },
              ].map((item, i) => (
                <div key={i} className="text-center p-4 sm:p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className={`inline-flex p-3 rounded-full ${item.color} mb-3`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-foreground text-sm sm:text-base">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">{item.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Area + Water Quality */}
        <section className="py-10 sm:py-14 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-2xl sm:text-3xl font-bold font-headline text-slate-900 mb-6">
              Why Rent an RO Water Purifier in {locality.name}?
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              {locality.description}
            </p>

            {/* Water Quality Alert */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 sm:p-6 mb-8">
              <div className="flex items-start gap-3">
                <Droplets className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-blue-900 mb-1.5">Water Quality in {locality.name}</h3>
                  <p className="text-blue-800 text-sm leading-relaxed">{locality.waterQualityNote}</p>
                </div>
              </div>
            </div>

            {/* Benefits Grid */}
            <h3 className="text-xl sm:text-2xl font-bold font-headline text-slate-900 mb-5">
              Benefits of Droppurity in {locality.name}
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: 'Zero Upfront Cost', desc: `Start using a premium RO purifier in ${locality.name} without paying anything upfront. Just a fully refundable security deposit.` },
                { title: 'Free 48-Hour Installation', desc: `Our trained technicians will install your purifier anywhere in ${locality.name} within 48 hours of booking – completely free.` },
                { title: 'Lifetime Free Maintenance', desc: `We cover all maintenance, filter replacements, and repairs for the entire duration of your subscription in ${locality.name}.` },
                { title: '7-Day Risk-Free Trial', desc: `Try our service for 7 days. Not satisfied? We pick it up from your ${locality.name} address and refund your deposit.` },
                { title: 'Free Relocation', desc: `Moving within ${locality.name} or to areas like ${locality.nearbyAreas.slice(0, 2).join(' or ')}? We relocate your purifier for free.` },
                { title: 'Multiple Purifier Options', desc: 'Choose from RO+UV, Copper, and Alkaline variants – each calibrated for Bengaluru\'s water quality.' },
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-lg border border-slate-100 shadow-sm">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-800 text-sm">{benefit.title}</h4>
                    <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-10 sm:py-14 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-2xl sm:text-3xl font-bold font-headline text-center text-slate-900 mb-3">
              RO Purifier Rental Plans in {locality.name}
            </h2>
            <p className="text-center text-muted-foreground mb-8 max-w-xl mx-auto">
              Choose the plan that fits your needs. All plans include free installation, maintenance, and filter replacements.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
              {/* RO+ */}
              <div className="border border-slate-200 rounded-xl p-5 hover:shadow-lg transition-shadow relative">
                <div className="absolute -top-3 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">Best Value</div>
                <h4 className="font-bold text-lg text-slate-900 mt-2">Droppurity RO+</h4>
                <p className="text-xs text-muted-foreground mb-3">RO + UV + UF Purification</p>
                <div className="text-3xl font-extrabold text-primary">₹299<span className="text-sm font-normal text-muted-foreground">/month</span></div>
                <p className="text-[11px] text-muted-foreground mt-0.5">On 12-month plan</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Free Installation</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Free Maintenance</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Free Relocation</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> 10L Storage Tank</li>
                </ul>
                <Link href="/plans" className="mt-4 block text-center text-sm font-semibold text-primary hover:underline">
                  View All RO Rental Plans →
                </Link>
              </div>
              {/* Copper */}
              <div className="border-2 border-primary rounded-xl p-5 shadow-lg relative bg-primary/[0.02]">
                <div className="absolute -top-3 left-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"><Star className="w-3 h-3" /> Bestseller</div>
                <h4 className="font-bold text-lg text-slate-900 mt-2">Droppurity Copper</h4>
                <p className="text-xs text-muted-foreground mb-3">RO + UV + Copper Infusion</p>
                <div className="text-3xl font-extrabold text-primary">₹349<span className="text-sm font-normal text-muted-foreground">/month</span></div>
                <p className="text-[11px] text-muted-foreground mt-0.5">Mini plan, 12-month</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Free Installation</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Copper Enriched Water</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Immunity Boost</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Free Maintenance</li>
                </ul>
                <Link href="/plans" className="mt-4 block text-center text-sm font-semibold text-primary hover:underline">
                  Compare All Purifier Plans →
                </Link>
              </div>
              {/* Alkaline */}
              <div className="border border-slate-200 rounded-xl p-5 hover:shadow-lg transition-shadow relative">
                <div className="absolute -top-3 left-4 bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full">Popular</div>
                <h4 className="font-bold text-lg text-slate-900 mt-2">Droppurity Alkaline</h4>
                <p className="text-xs text-muted-foreground mb-3">RO + UV + Alkaline pH 8.5</p>
                <div className="text-3xl font-extrabold text-primary">₹399<span className="text-sm font-normal text-muted-foreground">/month</span></div>
                <p className="text-[11px] text-muted-foreground mt-0.5">Mini plan, 12-month</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Free Installation</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Alkaline pH Balance</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Anti-Acidity Benefits</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Free Maintenance</li>
                </ul>
                <Link href="/plans" className="mt-4 block text-center text-sm font-semibold text-primary hover:underline">
                  See Affordable Rental Plans →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-10 sm:py-14 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-2xl sm:text-3xl font-bold font-headline text-center text-slate-900 mb-8">
              How to Rent an RO Purifier in {locality.name}
            </h2>
            <div className="grid sm:grid-cols-4 gap-4 sm:gap-6">
              {[
                { step: '1', emoji: '📅', title: 'Book Free Trial', desc: `Fill the form above or call us. We serve all of ${locality.name}.` },
                { step: '2', emoji: '🛠️', title: 'Free Installation', desc: 'Our team installs the purifier at your home within 48 hours.' },
                { step: '3', emoji: '❤️', title: '7-Day Trial', desc: 'Use it free for 7 days. Love it? Choose a plan. Not happy? Full refund.' },
                { step: '4', emoji: '✨', title: 'Enjoy Pure Water', desc: 'Lifetime free maintenance and filter changes. Zero hassle.' },
              ].map((item) => (
                <div key={item.step} className="text-center p-4">
                  <div className="text-3xl mb-2">{item.emoji}</div>
                  <div className="inline-flex w-8 h-8 bg-primary text-white rounded-full items-center justify-center text-sm font-bold mb-2">{item.step}</div>
                  <h4 className="font-semibold text-slate-800 text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-10 sm:py-14 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold font-headline text-center text-slate-900 mb-6">
              Buying vs Renting RO in {locality.name}
            </h2>
            <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="p-3 sm:p-4 text-left font-bold text-slate-700 border-r border-slate-200 w-[35%]">Feature</th>
                    <th className="p-3 sm:p-4 text-center font-bold text-slate-500 border-r border-slate-200 w-[30%]">Buying RO</th>
                    <th className="p-3 sm:p-4 text-center font-bold text-primary bg-blue-50/50 w-[35%]">Droppurity Rental</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Upfront Cost', '₹15,000 – ₹25,000', '₹0 (Zero)'],
                    ['Installation', '₹500 – ₹1,000', 'FREE'],
                    ['Maintenance/Year', '₹3,000 – ₹5,000', 'FREE (Lifetime)'],
                    ['Filter Replacement', '₹1,500 – ₹3,000', 'FREE'],
                    ['Relocation', '₹500 – ₹1,500', 'FREE'],
                    ['Repair Charges', '₹500+/visit', 'FREE'],
                  ].map(([feature, buying, renting], i) => (
                    <tr key={i} className="border-t border-slate-100">
                      <td className="p-3 sm:p-4 font-medium text-slate-700 border-r border-slate-100">{feature}</td>
                      <td className="p-3 sm:p-4 text-center text-slate-500 border-r border-slate-100">{buying}</td>
                      <td className="p-3 sm:p-4 text-center font-bold text-green-600 bg-blue-50/20">{renting}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-10 sm:py-14 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold font-headline text-center text-slate-900 mb-8">
              Frequently Asked Questions – {locality.name}
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details key={i} className="group bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <summary className="p-4 sm:p-5 cursor-pointer font-semibold text-slate-800 text-sm sm:text-base flex items-center justify-between hover:bg-slate-50 transition-colors list-none">
                    <span>{faq.question}</span>
                    <span className="text-primary text-lg font-bold ml-2 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.hasLinks ? (
                      <span dangerouslySetInnerHTML={{ __html: faq.linkHtml! }} />
                    ) : (
                      faq.answer
                    )}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Helpful Guides — SEO Internal Links to Blog */}
        <section className="py-10 sm:py-14 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-xl sm:text-2xl font-bold font-headline text-center text-slate-900 mb-3">
              Helpful Guides for {locality.name} Residents
            </h2>
            <p className="text-center text-muted-foreground text-sm mb-6">
              Learn more about water purification, rental tips, and making the best choice for your home in {locality.name}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {blogPosts.slice(0, 3).map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-primary/30 hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-4 h-4 text-primary" />
                    <span className="text-xs text-muted-foreground">Guide</span>
                  </div>
                  <h3 className="font-semibold text-slate-800 group-hover:text-primary transition-colors text-sm leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">
                    {post.excerpt}
                  </p>
                </Link>
              ))}
            </div>
            <div className="text-center mt-4">
              <Link href="/blog" className="text-sm text-primary font-semibold hover:underline">
                Read all guides & articles →
              </Link>
            </div>
          </div>
        </section>

        {/* Nearby Areas */}
        <section className="py-10 sm:py-14 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-xl sm:text-2xl font-bold font-headline text-center text-slate-900 mb-3">
              Also Serving Nearby Areas
            </h2>
            <p className="text-center text-muted-foreground text-sm mb-6">
              Along with {locality.name}, we deliver and service RO purifiers across these Bengaluru localities
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {bangaloreLocalities
                .filter((l) => l.slug !== locality.slug)
                .map((area) => (
                  <Link
                    key={area.slug}
                    href={`/bengaluru/${area.slug}`}
                    className="bg-slate-50 hover:bg-primary/5 hover:border-primary/30 border border-slate-200 px-3 sm:px-4 py-2 rounded-lg text-sm text-slate-700 hover:text-primary transition-colors font-medium"
                  >
                    {area.name}
                  </Link>
                ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-10 sm:py-14 bg-gradient-to-r from-primary to-blue-700 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold font-headline mb-3">
              Get Pure Water in {locality.name} Today
            </h2>
            <p className="text-blue-100 mb-6 max-w-lg mx-auto">
              Join thousands of happy families in {locality.name} enjoying clean, safe drinking water from Droppurity.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="tel:+917979784087"
                className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
              >
                <Phone className="w-5 h-5" />
                Call: 79797-84087
              </a>
              <Link
                href="/plans"
                className="inline-flex items-center gap-2 border-2 border-white/60 text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                View All Rental Plans
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
