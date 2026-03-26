
import type { Metadata } from 'next';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { blogPosts } from '@/config/blogData';
import { Badge } from '@/components/ui/badge';
import { Calendar, User } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Droppurity Blog | Pure Water Insights & Tips',
  description: 'Expert advice on water purifiers, rental vs buying, alkaline water benefits, and healthy living tips from the experts at Droppurity.',
  alternates: {
    canonical: '/blog',
  },
};

export default function BlogListPage() {
  return (
    <div className="py-8 sm:py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12 max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold font-headline text-primary mb-4">
            Droppurity Blog
          </h1>
          <p className="text-lg text-muted-foreground">
            Stay informed about water purification filters, healthy living, and smart ways to save on your home essentials.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug}>
              <Card className="h-full flex flex-col overflow-hidden hover:shadow-2xl transition-all duration-300 border-primary/10 hover:border-primary/30 group">
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary/90 text-white hover:bg-primary">Article</Badge>
                  </div>
                </div>
                <CardHeader className="flex-none pb-2">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
                  </div>
                  <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </CardContent>
                <div className="p-6 pt-0 mt-auto">
                  <Button variant="ghost" className="p-0 text-primary font-semibold hover:bg-transparent group-hover:translate-x-1 transition-transform">
                    Read More &rarr;
                  </Button>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* CTA Section — Internal Links to Transactional Pages */}
        <div className="mt-16 pt-8 border-t border-primary/10 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-primary mb-3">Ready to Get Pure Water at Home?</h2>
          <p className="text-muted-foreground mb-6">
            Explore our <Link href="/plans" className="text-primary font-semibold hover:underline">affordable RO rental plans</Link> starting at ₹299/month with free installation and lifetime free maintenance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Button asChild size="lg" className="px-8">
              <Link href="/plans">View Rental Plans</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8 border-primary/20 hover:bg-primary/5">
              <Link href="/trial">Book Free Trial</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
