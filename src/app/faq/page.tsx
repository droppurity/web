
import type { Metadata } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

const faqCategories = [
  {
    category: "Plans & Pricing",
    faqs: [
      {
        question: "What is the starting price for renting a water purifier?",
        answer: "Droppurity rental plans start at just ₹299/month for the Basic plan on the Droppurity RO+ purifier. Plans vary based on the purifier model (RO+, Copper, Alkaline) and the capacity (Basic 25L/day, Standard 50L/day, Premium Unlimited). All prices are inclusive — no hidden charges."
      },
      {
        question: "Are there any hidden charges in Droppurity plans?",
        answer: "Absolutely not. Our pricing is fully transparent. Your monthly rental covers everything: the purifier machine, free installation, lifetime maintenance, filter replacements, and free relocation. The only additional charge is a fully refundable security deposit collected at the time of installation."
      },
      {
        question: "What is the security deposit amount?",
        answer: "A refundable security deposit is collected at the time of installation. This deposit is 100% refundable when you return the purifier in good condition. The deposit amount depends on the plan you choose."
      },
      {
        question: "Can I change my plan after subscribing?",
        answer: "Yes! You can upgrade or downgrade your plan at any time by contacting our customer support team. We'll adjust your billing accordingly from the next billing cycle."
      },
      {
        question: "Do you offer a discount for longer tenure plans?",
        answer: "Yes, we offer significant savings on longer tenure subscriptions. A 7-month plan offers better value than monthly billing, and a 12-month plan gives you the best per-month rate. Check our Plans page for the latest pricing on each tenure."
      },
    ]
  },
  {
    category: "Installation & Trial",
    faqs: [
      {
        question: "What is the 7-day risk-free trial?",
        answer: "You can try our purifier for 7 days with zero commitment. Pay a fully refundable security deposit, get the purifier installed at your home, and experience it for a week. If you're not 100% satisfied for any reason, we'll uninstall it and refund your deposit — no questions asked."
      },
      {
        question: "How quickly is the purifier installed after booking?",
        answer: "We guarantee installation within 48 hours of your booking confirmation and successful security deposit payment. In most cities, we aim for same-day or next-day installation."
      },
      {
        question: "Are there any installation charges?",
        answer: "No, installation is absolutely free. We send a certified technician to your home or office, and the complete installation is done at zero cost to you."
      },
      {
        question: "Do I need to provide anything for installation?",
        answer: "Our technician brings all required tools and fittings. You only need to ensure there's a nearby water inlet connection (kitchen tap or pipeline) and a power socket. We handle everything else."
      },
      {
        question: "Can I get the purifier installed in a rented house or flat?",
        answer: "Absolutely. Our rentals are specifically designed for people living in rented apartments and houses. Since you don't own the purifier, there's no big investment — and if you move, we relocate the purifier for free."
      },
    ]
  },
  {
    category: "Maintenance & Service",
    faqs: [
      {
        question: "Is maintenance really free for a lifetime?",
        answer: "Yes, completely free. As long as you have an active Droppurity subscription, all maintenance including routine servicing, filter changes, UV lamp replacements, and repairs is 100% free. We proactively monitor your purifier via IoT and schedule service before you even notice an issue."
      },
      {
        question: "How often is the filter replaced?",
        answer: "Filter replacements depend on water quality and usage, but typically occur every 3–6 months. Our IoT-enabled purifiers monitor filter health in real time, and our service team proactively schedules replacements — you don't have to track or remind us."
      },
      {
        question: "What if the purifier stops working or breaks down?",
        answer: "Just contact our customer support and we'll dispatch a technician within 24–48 hours. If the issue cannot be resolved quickly, we'll provide a temporary replacement purifier so your water supply is never interrupted."
      },
      {
        question: "How do I schedule a service visit?",
        answer: "You can schedule a service visit by calling our customer support at +91-79797-84087 or emailing us at official@droppurity.in. We also proactively reach out when scheduled maintenance is due."
      },
    ]
  },
  {
    category: "Relocation & Cancellation",
    faqs: [
      {
        question: "Do you charge for relocating the purifier if I move?",
        answer: "Not at all. Free relocation is included in all active subscriptions. If you're moving within the same city or to another city where Droppurity operates, just inform us a few days in advance and we'll handle the uninstallation, transport, and re-installation at your new address — for free."
      },
      {
        question: "What happens if I want to cancel my subscription?",
        answer: "You can cancel anytime. Simply contact our support team, and we'll arrange a convenient time to uninstall the purifier. Your refundable security deposit will be returned within 5–7 business days after the purifier is collected."
      },
      {
        question: "Is there a minimum subscription period?",
        answer: "There is no mandatory minimum period for our monthly plans. However, if you have subscribed to a 7-month or 12-month tenure plan at a discounted rate, early cancellation may affect pro-rated refunds. Our team will clarify this based on your specific plan."
      },
    ]
  },
  {
    category: "Purifier Types & Technology",
    faqs: [
      {
        question: "What types of water purifiers does Droppurity offer on rent?",
        answer: "Droppurity offers three purifier types: (1) Droppurity RO+ — our standard RO+UV+Copper purifier ideal for most households, starting at ₹299/mo. (2) Droppurity Copper — enriched with natural copper minerals for immunity, starting at ₹384/mo. (3) Droppurity Alkaline — boosts water pH up to 8.5, ideal for people with acidity concerns, starting at ₹374/mo."
      },
      {
        question: "What is an Alkaline water purifier? Is it better?",
        answer: "An alkaline water purifier raises the pH of your drinking water to around 8.5, which may help neutralize acidity in the body. It also retains essential minerals lost during standard RO filtration. If you or your family members experience acidity or digestive issues, alkaline water is highly beneficial."
      },
      {
        question: "What is a Copper water purifier?",
        answer: "Our Droppurity Copper purifier infuses purified water with natural copper ions. Copper-enriched water has Ayurvedic roots and is known to support digestion, boost immunity, and have anti-bacterial properties. It's ideal for those who want the health benefits of copper along with clean RO water."
      },
      {
        question: "Does the purifier have IoT / smart monitoring?",
        answer: "Yes! Our purifiers are IoT-enabled. They continuously monitor water quality, filter health, and usage in real-time. If any parameter falls below optimal levels, our service team is alerted automatically and proactively schedules a maintenance visit — often before you're even aware of an issue."
      },
      {
        question: "What is the TDS (Total Dissolved Solids) level of the output water?",
        answer: "Our RO purifiers bring TDS down to the safe drinking range of 50–150 ppm, which is optimal for health. The exact output TDS depends on your incoming water quality. Our technician will test your water during installation and fine-tune the purifier accordingly."
      },
    ]
  },
];

export default function FaqPage() {
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
      <div className="py-8 sm:py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <header className="text-center mb-10 sm:mb-14">
            <h1 className="text-3xl sm:text-4xl font-bold font-headline text-primary">
              Frequently Asked Questions
            </h1>
            <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about renting an RO water purifier from Droppurity — pricing, installation, maintenance, relocation & more.
            </p>
          </header>

          <div className="space-y-8">
            {faqCategories.map((category, catIndex) => (
              <Card key={catIndex} className="shadow-xl">
                <CardHeader className="pb-2">
                  <CardTitle className="text-primary text-lg">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.faqs.map((faq, faqIndex) => (
                      <AccordionItem value={`cat${catIndex}-item-${faqIndex}`} key={faqIndex}>
                        <AccordionTrigger className="text-left font-semibold text-sm sm:text-base">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 text-center p-6 bg-primary/5 rounded-xl border border-primary/10">
            <p className="text-sm text-muted-foreground">
              Still have questions? We&apos;re happy to help.{' '}
              <a href="tel:+917979784087" className="text-primary font-semibold hover:underline">
                Call us at +91-79797-84087
              </a>{' '}
              or{' '}
              <a href="mailto:official@droppurity.in" className="text-primary font-semibold hover:underline">
                email official@droppurity.in
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
