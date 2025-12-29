
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Careers at Droppurity',
  description: 'Join the Droppurity team and help us on our mission to provide pure and healthy water for everyone. Explore current job openings.',
  alternates: {
    canonical: '/careers',
  },
};

export default function CareersPage() {
  return (
    <div className="py-8 sm:py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-10 sm:mb-14">
          <h1 className="text-3xl sm:text-4xl font-bold font-headline text-primary">
            Careers
          </h1>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Join our mission to provide pure water for everyone.
          </p>
        </header>
        <Card className="shadow-xl max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Current Openings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We do not have any open positions at the moment, but we are always looking for talented individuals. Please check back later or send your resume to <a href="mailto:careers@droppurity.in" className="text-primary hover:underline">careers@droppurity.in</a>.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
