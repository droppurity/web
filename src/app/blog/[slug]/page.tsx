
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/config/blogData';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin, BookOpen } from 'lucide-react';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: `${post.title} | Droppurity Blog`,
    description: post.excerpt,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: 'article',
      authors: [post.author],
      publishedTime: post.date,
    },
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Get related posts (all posts except current)
  const relatedPosts = blogPosts.filter((p) => p.slug !== post.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": `https://droppurity.in${post.image}`,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Droppurity",
      "logo": {
        "@type": "ImageObject",
        "url": "https://droppurity.in/logo.png"
      }
    },
    "datePublished": post.date,
    "description": post.excerpt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://droppurity.in/blog/${post.slug}`
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="py-8 sm:py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <Link href="/blog" className="inline-flex items-center text-primary font-semibold mb-8 hover:translate-x-[-4px] transition-transform">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
          </Link>
          
          <header className="mb-10">
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              <span className="flex items-center gap-1"><User className="w-4 h-4" /> {post.author}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-headline text-primary mb-6 leading-[1.2]">
              {post.title}
            </h1>
            <p className="text-xl text-muted-foreground italic leading-relaxed">
              {post.excerpt}
            </p>
          </header>

          <Card className="shadow-2xl mb-12 overflow-hidden border-none rounded-2xl">
            <div className="relative aspect-video w-full">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_80px] gap-8">
            <article className="prose prose-lg dark:prose-invert max-w-none text-foreground prose-h2:text-primary prose-h3:text-primary/80 prose-strong:text-foreground prose-a:text-primary hover:prose-a:underline prose-img:rounded-xl">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>

            {/* Sticky Sidebar Sharing */}
            <aside className="hidden lg:flex flex-col items-center gap-6 sticky top-24 h-fit">
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest vertical-rl mb-2">Share</div>
              <Button variant="outline" size="icon" className="rounded-full hover:bg-blue-100 hover:text-blue-600 border-primary/10">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full hover:bg-sky-100 hover:text-sky-600 border-primary/10">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full hover:bg-blue-100 hover:text-blue-700 border-primary/10">
                <Linkedin className="w-5 h-5" />
              </Button>
            </aside>
          </div>

          {/* Related Blog Posts — Internal Cross-Links */}
          {relatedPosts.length > 0 && (
            <div className="mt-12 pt-8 border-t border-primary/10">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                More from Our Blog
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="p-4 bg-secondary/30 rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all group"
                  >
                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm leading-snug">
                      {related.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">
                      {related.excerpt}
                    </p>
                    <span className="text-xs text-primary font-semibold mt-2 inline-block">
                      Read More →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 pt-8 border-t border-primary/10 text-center">
            <h3 className="text-2xl font-bold text-primary mb-4">Ready to Switch to Better Water?</h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Join thousands of happy customers and upgrade to a premium purifier on rent. Zero maintenance, zero hidden costs, 100% pure water.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="px-10 py-6 rounded-full text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                <Link href="/plans">View Rental Plans</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-10 py-6 rounded-full text-lg border-primary/20 hover:bg-primary/5">
                <Link href="/trial">Book Free Trial</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

