
"use client";

import { Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const testimonials: { name: string; review: string; rating: number }[] = [];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}
      />
    ))}
  </div>
);

export default function TestimonialsSection() {
  const googleBusinessProfileUrl = "https://g.co/kgs/NZijxvy";

  return (
    <section className="py-8 sm:py-12 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold font-headline text-primary">
            Trusted by Families Like Yours
          </h2>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            See what our happy customers are saying about Droppurity.
          </p>
        </header>

        <div className="mb-8 sm:mb-12">
          {testimonials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col bg-card">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg font-semibold text-foreground">{testimonial.name}</CardTitle>
                      <StarRating rating={testimonial.rating} />
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground">"{testimonial.review}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center bg-card p-6 rounded-lg shadow-sm border">
                <p className="text-muted-foreground">We value authentic feedback! See what our real customers are saying on Google.</p>
            </div>
          )}
        </div>

        <div className="text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg">
            <a href={googleBusinessProfileUrl} target="_blank" rel="noopener noreferrer">
              Write a Review on Google
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-card">
             <a href={googleBusinessProfileUrl} target="_blank" rel="noopener noreferrer">
              Read All Reviews
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
