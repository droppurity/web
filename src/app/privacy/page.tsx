
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
            <CardContent className="space-y-6 text-muted-foreground prose prose-sm max-w-none">
                <p>At Droppurity (brand under <strong>Drop Technologies Private Ltd</strong>), we are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner.</p>
                
                <div className="space-y-4">
                    <h2 className="!mb-2">1. Information We Collect</h2>
                    <p>We collect information you provide directly to us when you subscribe to our services, such as your name, email address, phone number, and installation address. We also collect usage data and IoT-based health monitoring data from your purifier to ensure optimal performance.</p>
                </div>

                <div className="space-y-4">
                    <h2 className="!mb-2">2. How We Use Your Information</h2>
                    <p>We use your information to provide, maintain, and improve our services, including processing your subscription, scheduling maintenance, and communicating with you about your account.</p>
                </div>

                <div className="space-y-4">
                    <h2 className="!mb-2">3. Data Sharing</h2>
                    <p>We do not sell your personal information. We may share your data with trusted partners who assist us in providing our services, such as installation and maintenance teams, and for legal or regulatory requirements.</p>
                </div>

                <div className="space-y-4">
                    <h2 className="!mb-2">4. Data Security</h2>
                    <p>We implement robust security measures to protect your personal information from unauthorized access, alteration, or disclosure.</p>
                </div>

                <div className="space-y-4">
                    <h2 className="!mb-2">5. Contact Information</h2>
                    <p>For any privacy-related queries, please contact our Data Protection Officer at:</p>
                    <ul className="!mt-2">
                        <li><strong>Drop Technologies Private Ltd</strong></li>
                        <li>2nd cross, Vinayaka Layout, Rayasandra, Bengaluru - 560100</li>
                        <li>Email: <a href="mailto:official@droppurity.in" className="text-primary hover:underline">official@droppurity.in</a></li>
                    </ul>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
