
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
        question: "What happens if I move to a new house?",
        answer: "We offer free relocation services. Just inform us a few days in advance, and we'll move and reinstall your purifier at your new address for free."
    }
]

export default function FaqPage() {
  return (
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
  );
}
