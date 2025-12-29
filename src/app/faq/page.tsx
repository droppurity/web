
import type { Metadata } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQ)',
  description: 'Find answers to common questions about Droppurity\'s services, including our 7-day trial, free maintenance, installation, and more.',
  alternates: {
    canonical: '/faq',
  },
};

const faqs = [
    {
        question: "What is the 7-day risk-free trial?",
        answer: "You can try our purifier for 7 days by paying a refundable security deposit. If you're not satisfied, we'll uninstall it and give you a 100% refund."
    },
    {
        question: "Is maintenance really free for a lifetime?",
        answer: "Yes, as long as you have an active subscription with us, all maintenance, including filter changes and repairs, is completely free of charge."
    },
    {
        question: "How quickly is the purifier installed?",
        answer: "We guarantee installation within 48 hours of your booking and successful payment of the security deposit."
    },
    {
        question: "Are there any installation charges?",
        answer: "No, installation is completely free. We only require a fully refundable security deposit at the time of installation."
    },
    {
        question: "Do you charge for relocating the purifier if I move?",
        answer: "Not at all. We provide free relocation and re-installation services for our active subscribers. Just let us know a few days before you move, and we'll handle the rest."
    }
]

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-10 sm:mb-14">
            <h1 className="text-3xl sm:text-4xl font-bold font-headline text-primary">
              Frequently Asked Questions
            </h1>
            <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about Droppurity services.
            </p>
          </header>
          <Card className="shadow-xl max-w-3xl mx-auto">
              <CardHeader>
                  <CardTitle>Common Questions</CardTitle>
              </CardHeader>
              <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                      {faqs.map((faq, index) => (
                          <AccordionItem value={`item-${index}`} key={index}>
                              <AccordionTrigger>{faq.question}</AccordionTrigger>
                              <AccordionContent>
                              {faq.answer}
                              </AccordionContent>
                          </AccordionItem>
                      ))}
                  </Accordion>
              </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
