
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Read the Droppurity privacy policy to understand how we collect, use, and protect your personal information.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-8 sm:py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-10 sm:mb-14">
          <h1 className="text-3xl sm:text-4xl font-bold font-headline text-primary">
            Privacy Policy
          </h1>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Your privacy is important to us.
          </p>
        </header>
        <Card className="shadow-xl max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle>Our Commitment to Your Privacy</CardTitle>
                 <CardDescription>Last updated: July 29, 2024</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
                <p>This is a placeholder for your Privacy Policy. A comprehensive privacy policy is crucial for any business that collects user data. It should transparently explain what data you collect, how you use it, who you share it with, and how you protect it.</p>
                <p>Key sections to include are:</p>
                <ul className="list-disc list-inside space-y-2">
                    <li>Information We Collect (e.g., personal details, usage data)</li>
                    <li>How We Use Your Information</li>
                    <li>Data Sharing and Disclosure</li>
                    <li>Data Security</li>
                    <li>Your Rights and Choices</li>
                    <li>Changes to This Policy</li>
                    <li>Contact Information</li>
                </ul>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
