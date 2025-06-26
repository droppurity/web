
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Droppurity Blog',
  description: 'Read the latest news, updates, and articles from the Droppurity team about water purity, health, and our products.',
  alternates: {
    canonical: '/blog',
  },
};

export default function BlogPage() {
  return (
    <div className="py-8 sm:py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-10 sm:mb-14">
          <h1 className="text-3xl sm:text-4xl font-bold font-headline text-primary">
            Blog
          </h1>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            News, updates, and articles from the Droppurity team.
          </p>
        </header>
        <Card className="shadow-xl max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Coming Soon!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Our blog is currently under construction. Please check back later for exciting content about water purity, health, and our products.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
