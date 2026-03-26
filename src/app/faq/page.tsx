
"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Plus, Minus, Phone, Mail, MessageCircle, HelpCircle, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqCategories = [
  {
    id: 'general',
    label: 'General',
    icon: '💧',
    faqs: [
      {
        question: 'What is Droppurity?',
        answer: 'Droppurity is India\'s smart water purifier rental service. We deliver, install, and maintain IoT-enabled RO water purifiers at your doorstep — so you never have to worry about drinking water again. We combine the latest purification technology with a hassle-free subscription model.'
      },
      {
        question: 'Where does Droppurity operate?',
        answer: 'We are currently operational in Bengaluru, Hyderabad, Delhi NCR (Delhi, Noida, Ghaziabad, Gurugram, Faridabad), Mumbai, Pune, Chennai, Kolkata, and Bokaro Steel City. We are expanding rapidly to new cities every quarter.'
      },
      {
        question: 'What is smart water purifier rental?',
        answer: 'Smart rental is the smarter way of getting a water purifier. Instead of spending ₹15,000–₹25,000 upfront to buy one, we install our IoT-enabled purifier at your place free of cost (no upfront investment) and provide lifetime free maintenance (no expensive AMC contracts). You just pay a small monthly subscription starting at ₹299.'
      },
      {
        question: 'Why is renting better than buying a water purifier?',
        answer: 'Buying a water purifier means a heavy upfront cost plus ₹3,000–₹5,000/year on maintenance. With Droppurity rental, you get: zero upfront cost, free installation, lifetime free maintenance, free filter replacements, free relocation if you move, and a 7-day risk-free trial. More than 65% of people who own a water purifier don\'t get pure water simply because they skip expensive maintenance — with us, you never have to worry about that.'
      },
      {
        question: 'I want to use Droppurity for my office. How do I go about it?',
        answer: 'We\'d love to serve your workplace! Please send us a brief email at official@droppurity.in or call us at +91-79797-84087, and our commercial team will get back to you with attractive bulk/corporate offers tailored to your office needs.'
      },
      {
        question: 'What quality certifications does Droppurity have?',
        answer: 'Our purifiers meet ISO quality standards and water output quality is certified by leading labs. We use RO+UV+UF multi-stage purification that removes 99.9% of bacteria, viruses, and dissolved impurities while retaining essential minerals.'
      },
    ]
  },
  {
    id: 'subscription',
    label: 'Plans & Subscription',
    icon: '📋',
    faqs: [
      {
        question: 'What is the starting price for renting a water purifier?',
        answer: 'Droppurity plans start at just ₹299/month for the Basic plan on the Droppurity RO+ purifier (on a 12-month tenure). Plans vary based on the purifier model (RO+, Copper, Alkaline), capacity (Basic 500L/month or Value Unlimited), and tenure (monthly, 7-month, or 12-month). All prices are inclusive — no hidden charges.'
      },
      {
        question: 'Are there any hidden charges?',
        answer: 'Absolutely not. Our pricing is fully transparent. Your monthly rental covers everything: the purifier machine, free installation, lifetime maintenance, filter replacements, and free relocation. The only additional charge is a 100% refundable security deposit collected at the time of installation.'
      },
      {
        question: 'What is the security deposit amount?',
        answer: 'We collect a 100% refundable security deposit at the time of installation. The exact amount depends on your chosen plan. This deposit is fully refunded when you return the purifier in good condition.'
      },
      {
        question: 'What is the minimum subscription tenure?',
        answer: 'We do not have a mandatory minimum tenure for monthly plans. You can disconnect anytime by giving us a 30-day notice. However, if you opt for our 7-month or 12-month discounted plans, early cancellation may affect pro-rated refunds.'
      },
      {
        question: 'Can I change my plan after subscribing?',
        answer: 'Yes! You can upgrade or downgrade your plan at any time by contacting our customer support team. Changes will be applied from your next billing cycle.'
      },
      {
        question: 'Do I still have to pay if I\'m not at home or not using the purifier?',
        answer: 'Getting Droppurity on rent is like renting a home — the monthly rental applies regardless of usage. However, if you\'re travelling or away for an extended period, contact our support team and we\'ll work out the best option for you, including potential plan pauses for long absences.'
      },
      {
        question: 'Will my remaining litre balance carry forward?',
        answer: 'Yes! Your unused balance carries forward as long as you continue on the same subscription plan. The balance resets only if you change plans.'
      },
      {
        question: 'Do you offer discounts for longer tenure plans?',
        answer: 'Yes! We offer significant savings on longer tenures. A 7-month plan saves you more per month compared to monthly billing, and a 12-month plan gives you the absolute best rate. Check our Plans page for the latest pricing.'
      },
    ]
  },
  {
    id: 'installation',
    label: 'Installation & Trial',
    icon: '🛠️',
    faqs: [
      {
        question: 'What is the 7-day risk-free trial?',
        answer: 'We know it takes more than a 15-minute demo to evaluate a water purifier. That\'s why we give you a full 7-day risk-free trial. Pay only the refundable security deposit, get your purifier installed, and use it for 7 days. If you\'re not 100% satisfied for any reason, we uninstall it and refund your entire deposit — no questions asked.'
      },
      {
        question: 'How quickly is the purifier installed?',
        answer: 'We guarantee installation within 48 hours of your booking and successful deposit payment. In most cities, we aim for same-day or next-day installation.'
      },
      {
        question: 'Are there any installation charges?',
        answer: 'Zero. Installation is completely free. Our certified technician comes to your home or office with all required tools and fittings, and handles the complete setup at no cost.'
      },
      {
        question: 'What documents do you need for installation?',
        answer: 'We need a valid ID proof and address proof. Your rental agreement is considered valid address proof. That\'s it — no complicated paperwork.'
      },
      {
        question: 'Does the purifier require drilling or changes to my water/power lines?',
        answer: 'Most customers use the purifier as a wall-hanging or counter-top unit — both options are available. Our experienced installation team handles all necessary plumbing and electrical connections during installation. For rented apartments, we ensure the installation is clean and easily reversible.'
      },
      {
        question: 'Can I get the purifier installed in a rented apartment?',
        answer: 'Absolutely! Our rental service is specifically designed for tenants. Since you don\'t own the purifier, there\'s no big investment. And if you move, we relocate it for free.'
      },
      {
        question: 'Will the purifier work on my input water?',
        answer: 'Our purifiers work optimally on water with TDS up to 1500 PPM. During installation, our technician tests your raw water quality to ensure it meets the required standards before proceeding. This covers most sources — municipal, borewell, and tanker water across Indian cities.'
      },
    ]
  },
  {
    id: 'maintenance',
    label: 'Maintenance & Service',
    icon: '🔧',
    faqs: [
      {
        question: 'Is maintenance really free for a lifetime?',
        answer: 'Yes, 100% free. As long as you have an active Droppurity subscription, all maintenance is free — routine servicing, filter changes, UV lamp replacements, membrane swaps, and repairs. We proactively monitor your purifier via IoT and schedule service before you even notice an issue.'
      },
      {
        question: 'How often do you service the water purifier?',
        answer: 'Service frequency depends on three factors: the quality of your input water, the volume of water processed, and time since the last service. Our IoT system monitors these parameters in real time and automatically flags when maintenance is due.'
      },
      {
        question: 'How often do you replace the filters?',
        answer: 'Filter and cartridge replacements typically happen every 3–6 months depending on usage and water quality. Our IoT-enabled purifiers monitor filter health in real time, and we proactively schedule replacements — you don\'t need to track or remind us. All replacements are 100% free.'
      },
      {
        question: 'What if I\'m facing issues with the purifier?',
        answer: 'Simply switch off the purifier and call our support at +91-79797-84087 or email official@droppurity.in. We\'ll dispatch a technician within 24–48 hours. If the issue can\'t be resolved quickly, we\'ll provide a temporary replacement so your water supply is never interrupted.'
      },
      {
        question: 'What if the water taste doesn\'t seem right?',
        answer: 'If you\'ve been using bottled water or a different purifier, give it a couple of days to adjust. If you still feel the taste isn\'t right, contact our support team and we\'ll schedule a service visit to test and recalibrate your purifier settings.'
      },
      {
        question: 'How do you use IoT to ensure water safety?',
        answer: 'Our IoT-based remote health monitoring system continuously tracks device health, filter status, water quality, and usage patterns. We use this data to schedule proactive maintenance — ensuring you always get not just clean, but healthy drinking water. Think of it as a health tracker for your purifier.'
      },
    ]
  },
  {
    id: 'purifier',
    label: 'Purifier Types & Technology',
    icon: '⚡',
    faqs: [
      {
        question: 'What types of water purifiers does Droppurity offer?',
        answer: 'We offer three purifier models: (1) Droppurity RO+ — RO+UV+UF purification, ideal for most households, starting ₹299/mo. (2) Droppurity Copper — RO+UV with natural copper infusion for immunity boost, starting ₹349/mo. (3) Droppurity Alkaline — RO+UV with alkaline pH balance up to 8.5, ideal for acidity relief, starting ₹399/mo.'
      },
      {
        question: 'What is an Alkaline water purifier? Is it better?',
        answer: 'An alkaline purifier raises the pH of your drinking water to around 8.5, mimicking natural spring water. It helps neutralize excess acidity in the body, improves hydration, and retains essential minerals lost during standard RO filtration. It\'s especially beneficial for people with acidity, digestive concerns, or active lifestyles.'
      },
      {
        question: 'What is a Copper water purifier?',
        answer: 'Our Droppurity Copper purifier infuses purified water with natural copper ions. Copper-enriched water — rooted in Ayurveda — supports digestion, boosts immunity, and has natural anti-bacterial properties. It\'s ideal for families wanting the dual benefits of RO purification and copper enrichment.'
      },
      {
        question: 'What is the purification and tank capacity?',
        answer: 'Droppurity purifiers have a purification capacity of 15 litres/hour and a storage tank capacity of 8–10 litres. This comfortably serves families of 2–6 members for daily cooking and drinking needs.'
      },
      {
        question: 'Will the purifier retain essential minerals?',
        answer: 'Yes! Our purification process includes a TDS balancer that preserves essential minerals like Calcium, Magnesium, and Potassium that your body needs. You get water that is not just pure, but healthy.'
      },
      {
        question: 'What is the TDS level of the output water?',
        answer: 'Our purifiers bring output TDS to the safe 50–150 PPM range, which is optimal for health. The exact output depends on your incoming water quality — our technician tests and fine-tunes the purifier during installation.'
      },
      {
        question: 'How much electricity and water does the purifier consume?',
        answer: 'An RO purifier consumes approximately 50–60 Watts, which is very low — about 1/4th the power of a modern 5-star refrigerator. Monthly electricity cost works out to just ₹30–50. Water rejection is optimized to minimize wastage.'
      },
    ]
  },
  {
    id: 'relocation',
    label: 'Relocation & Cancellation',
    icon: '🚚',
    faqs: [
      {
        question: 'Do you charge for relocation if I move?',
        answer: 'Not at all! Free relocation is included in all active subscriptions. Whether you\'re moving within the same city or to another city where Droppurity operates, just inform us a few days in advance. We handle uninstallation, transport, and re-installation at your new address — all for free.'
      },
      {
        question: 'What if I want to cancel my subscription?',
        answer: 'You can cancel anytime. Contact our support team and we\'ll arrange a convenient time to uninstall the purifier. Your security deposit is refunded within 5–7 business days after the purifier is collected in good condition, minus any outstanding dues.'
      },
      {
        question: 'When will my security deposit be refunded?',
        answer: 'Your security deposit is refunded within 5 working days from the date of device pickup. Any pending dues (unpaid subscription charges) or damage charges (normal wear and tear excepted) will be deducted before the refund is processed.'
      },
      {
        question: 'How is my refund calculated for long-term plans?',
        answer: 'For monthly subscriptions, the current month\'s charge is non-refundable after payment. For long-term plans (7-month/12-month), unused months are refunded at the regular monthly rate. Example: If you paid for 6 months but used 3, you get a refund for the remaining 3 months calculated at regular monthly pricing, plus your security deposit.'
      },
      {
        question: 'Can my family continue using the purifier if I\'m not at home?',
        answer: 'Absolutely. The purifier operates independently once installed. Any family member can continue using it normally. We recommend syncing the IoT app periodically for optimal monitoring.'
      },
    ]
  },
];

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  // Filter FAQs based on search
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return faqCategories;
    
    const query = searchQuery.toLowerCase();
    return faqCategories
      .map(cat => ({
        ...cat,
        faqs: cat.faqs.filter(
          faq => faq.question.toLowerCase().includes(query) || faq.answer.toLowerCase().includes(query)
        )
      }))
      .filter(cat => cat.faqs.length > 0);
  }, [searchQuery]);

  const isSearching = searchQuery.trim().length > 0;

  // Get current category FAQs
  const currentFaqs = isSearching
    ? filteredCategories.flatMap(cat => cat.faqs)
    : faqCategories.find(cat => cat.id === activeCategory)?.faqs || [];

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const allFaqs = faqCategories.flatMap(cat => cat.faqs);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": allFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0f1629] via-[#1a1f4e] to-[#2b1055] text-white overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <HelpCircle className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-300">Help Center</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-headline leading-tight">
              How Can We Help You?
            </h1>
            <p className="mt-4 text-base sm:text-lg text-blue-200/80 max-w-xl mx-auto">
              Find answers to common questions about our water purifier rental service, plans, installation, and maintenance.
            </p>

            {/* Search Bar */}
            <div className="mt-8 max-w-lg mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search your question..."
                  className="w-full pl-12 pr-4 py-3.5 sm:py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 text-sm sm:text-base transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-sm"
                  >
                    Clear
                  </button>
                )}
              </div>
              {isSearching && (
                <p className="text-sm text-cyan-300/70 mt-2">
                  {currentFaqs.length} result{currentFaqs.length !== 1 ? 's' : ''} found
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content Section */}
      <section className="bg-gradient-to-b from-[#0f1629] to-[#131a3a] min-h-[60vh]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
          <div className="max-w-5xl mx-auto">
            {/* Category Navigation + FAQ Content */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              
              {/* Category Sidebar */}
              {!isSearching && (
                <div className="lg:w-64 flex-shrink-0">
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-2 lg:sticky lg:top-24">
                    <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0">
                      {faqCategories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => {
                            setActiveCategory(cat.id);
                            setOpenFaq(null);
                          }}
                          className={cn(
                            "flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap lg:whitespace-normal text-left w-full",
                            activeCategory === cat.id
                              ? "bg-cyan-400 text-slate-900 shadow-lg shadow-cyan-400/20"
                              : "text-slate-300 hover:text-white hover:bg-white/5"
                          )}
                        >
                          <span className="text-base">{cat.icon}</span>
                          <span>{cat.label}</span>
                        </button>
                      ))}
                    </nav>
                  </div>
                </div>
              )}

              {/* FAQ List */}
              <div className="flex-1 min-w-0">
                {isSearching && filteredCategories.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="text-5xl mb-4">🔍</div>
                    <h3 className="text-xl font-bold text-white mb-2">No results found</h3>
                    <p className="text-slate-400 text-sm">
                      Try a different search term or{' '}
                      <button onClick={() => setSearchQuery('')} className="text-cyan-400 hover:underline">
                        browse all categories
                      </button>
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {currentFaqs.map((faq, index) => {
                      const faqId = `${activeCategory}-${index}`;
                      const isOpen = openFaq === faqId;
                      
                      return (
                        <div
                          key={faqId}
                          className="border border-white/10 rounded-xl overflow-hidden bg-white/[0.03] hover:bg-white/[0.05] transition-colors"
                        >
                          <button
                            onClick={() => toggleFaq(faqId)}
                            className="w-full flex items-center gap-3 p-4 sm:p-5 text-left"
                          >
                            <div className={cn(
                              "w-7 h-7 flex-shrink-0 rounded-full flex items-center justify-center transition-all duration-300",
                              isOpen 
                                ? "bg-cyan-400 text-slate-900" 
                                : "bg-white/10 text-cyan-400"
                            )}>
                              {isOpen ? (
                                <Minus className="w-4 h-4" strokeWidth={2.5} />
                              ) : (
                                <Plus className="w-4 h-4" strokeWidth={2.5} />
                              )}
                            </div>
                            <span className={cn(
                              "font-semibold text-sm sm:text-base transition-colors",
                              isOpen ? "text-cyan-400" : "text-white"
                            )}>
                              {faq.question}
                            </span>
                          </button>
                          
                          <div className={cn(
                            "overflow-hidden transition-all duration-300 ease-in-out",
                            isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                          )}>
                            <div className="px-4 sm:px-5 pb-4 sm:pb-5 pl-14 sm:pl-16">
                              <p className="text-slate-300 text-sm leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Still Need Help CTA */}
      <section className="bg-[#131a3a] py-12 sm:py-16 border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Still Have Questions?
            </h2>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto">
              Our team is available to help you with any queries about our water purifier rental service.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <a
                href="tel:+917979784087"
                className="inline-flex items-center gap-2 bg-cyan-400 text-slate-900 font-bold px-6 py-3 rounded-xl hover:bg-cyan-300 transition-colors shadow-lg shadow-cyan-400/20 w-full sm:w-auto justify-center"
              >
                <Phone className="w-4 h-4" />
                Call: 79797-84087
              </a>
              <a
                href="mailto:official@droppurity.in"
                className="inline-flex items-center gap-2 border border-white/20 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/5 transition-colors w-full sm:w-auto justify-center"
              >
                <Mail className="w-4 h-4" />
                Email Us
              </a>
              <a
                href="https://wa.me/917979784087"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-400 transition-colors shadow-lg shadow-green-500/20 w-full sm:w-auto justify-center"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links — SEO Internal Links */}
      <section className="bg-[#0f1629] py-10 sm:py-12 border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid sm:grid-cols-3 gap-4">
              <Link
                href="/plans"
                className="group flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/30 hover:bg-white/[0.07] transition-all"
              >
                <div>
                  <h3 className="font-semibold text-white text-sm group-hover:text-cyan-400 transition-colors">View Rental Plans</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Starting ₹299/month</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
              </Link>
              <Link
                href="/trial"
                className="group flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/30 hover:bg-white/[0.07] transition-all"
              >
                <div>
                  <h3 className="font-semibold text-white text-sm group-hover:text-cyan-400 transition-colors">Book Free Trial</h3>
                  <p className="text-xs text-slate-400 mt-0.5">7-day risk-free</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
              </Link>
              <Link
                href="/blog"
                className="group flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/30 hover:bg-white/[0.07] transition-all"
              >
                <div>
                  <h3 className="font-semibold text-white text-sm group-hover:text-cyan-400 transition-colors">Read Our Blog</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Guides & tips</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
