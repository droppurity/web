
import type { Metadata } from 'next';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle, Shield, TrendingUp, Wallet } from 'lucide-react';

export const metadata: Metadata = {
  title: 'RO Water Purifier on Rent – A Smart Choice for Every Home',
  description: 'Discover why renting an RO water purifier is a smart, flexible, and affordable choice. Get pure, healthy water with zero down payment and lifetime free maintenance.',
  alternates: {
    canonical: '/blog',
  },
};

const benefits = [
  {
    icon: Wallet,
    title: 'Zero Initial Investment',
    text: 'Avoid the hefty upfront cost of buying a new purifier. Our rental plans start at an incredibly low monthly price with just a small, refundable security deposit.',
  },
  {
    icon: Shield,
    title: 'Lifetime Free Maintenance',
    text: 'Say goodbye to service costs! We cover all maintenance, including regular filter changes and repairs, for as long as you subscribe.',
  },
  {
    icon: TrendingUp,
    title: 'Flexibility & Easy Upgrades',
    text: 'Your needs can change, and so can your purifier. Easily upgrade to a different model or plan without the hassle of selling your old unit.',
  },
  {
    icon: CheckCircle,
    title: 'Assured Purity & Quality',
    text: 'We ensure your purifier is always in top condition, providing you with consistently pure and healthy drinking water without any worries.',
  },
];

export default function BlogPostPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "RO Water Purifier on Rent – A Smart Choice for Every Home",
    "image": "https://www.droppurity.in/hero.png", 
    "author": {
      "@type": "Organization",
      "name": "Droppurity"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Droppurity",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.droppurity.in/logo.png"
      }
    },
    "datePublished": new Date().toISOString(),
    "description": "Discover why renting an RO water purifier is a smart, flexible, and affordable choice. Get pure, healthy water with zero down payment and lifetime free maintenance."
  };

  return (
    <>
       <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="py-8 sm:py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <article className="max-w-3xl mx-auto">
            <header className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold font-headline text-primary">
                RO Water Purifier on Rent – A Smart Choice for Every Home
              </h1>
              <p className="mt-3 text-base sm:text-lg text-muted-foreground">
                Thinking about getting an RO purifier? Renting might be your best move.
              </p>
            </header>

            <Card className="shadow-lg mb-8 overflow-hidden">
                <div className="relative w-full aspect-video">
                    <Image
                        src="/hero.png" 
                        alt="A family enjoying pure water from a rented RO purifier"
                        fill
                        className="object-cover"
                        data-ai-hint="family kitchen water"
                    />
                </div>
            </Card>

            <div className="prose prose-lg max-w-none mx-auto text-foreground">
              <p className="lead">
                Everyone deserves access to clean and safe drinking water. While buying a water purifier is an option, the trend of taking an <strong>RO water purifier on rent</strong> is quickly gaining popularity. It’s a flexible, cost-effective, and hassle-free solution that fits perfectly with a modern lifestyle. Let’s explore why renting is a smart choice.
              </p>

              <h2 className="text-foreground">Why Choose a Water Purifier Rental?</h2>
              <p>
                Renting a water purifier frees you from the burdens of ownership. It’s not just about avoiding a large initial payment; it’s about enjoying pure water with complete peace of mind. Here are the key advantages:
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 my-8">
                {benefits.map((benefit) => (
                    <Card key={benefit.title} className="shadow-md hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-center gap-4 p-4">
                            <div className="bg-primary/10 p-3 rounded-full">
                                <benefit.icon className="w-6 h-6 text-primary" />
                            </div>
                            <CardTitle className="text-lg font-semibold text-foreground">{benefit.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                            <p className="text-sm text-muted-foreground">{benefit.text}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="prose prose-lg max-w-none mx-auto text-foreground">
                <h2 className="text-foreground">Is an RO Rental Right for You?</h2>
                <p>An <strong>RO purifier for home</strong> on a rental basis is an excellent option for many people, including:</p>
                <ul>
                    <li><strong>Renters and Tenants:</strong> Move without the worry of uninstalling and reinstalling a purifier you own. We offer free relocation.</li>
                    <li><strong>Budget-Conscious Families:</strong> Get the best-in-class purification technology without straining your finances.</li>
                    <li><strong>Busy Professionals:</strong> Enjoy a "set it and forget it" service where all maintenance is handled for you.</li>
                </ul>
                
                <h2 className="text-foreground">Conclusion: The Clear Choice for Pure Water</h2>
                <p>
                  Opting for an <strong>affordable RO rental</strong> is more than just a transaction; it's a subscription to good health and convenience. With no large upfront costs and zero maintenance worries, you can enjoy the benefits of pure water effortlessly.
                </p>
            </div>

             <div className="text-center mt-10">
                <h3 className="text-xl font-semibold text-foreground mb-3">Ready to Experience the Difference?</h3>
                <p className="text-muted-foreground mb-5">
                    Explore our flexible plans and start your journey to healthier living today.
                </p>
                <Button asChild size="lg">
                    <Link href="/plans">Explore Our Rental Plans</Link>
                </Button>
            </div>
            
          </article>
        </div>
      </div>
    </>
  );
}
