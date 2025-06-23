
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function TermsOfUsePage() {
  return (
    <div className="py-8 sm:py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-10 sm:mb-14">
          <h1 className="text-3xl sm:text-4xl font-bold font-headline text-primary">
            Terms of Use
          </h1>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Please read these terms and conditions carefully.
          </p>
        </header>
        <Card className="shadow-xl max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle>Terms and Conditions</CardTitle>
                 <CardDescription>Last updated: July 29, 2024</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
                <p>This is a placeholder for your Terms of Use. This document is a legal agreement between you and your users. It should outline the rules and regulations for using your website and services.</p>
                <p>Key sections to include are:</p>
                <ul className="list-disc list-inside space-y-2">
                    <li>Acceptance of Terms</li>
                    <li>User Accounts and Responsibilities</li>
                    <li>Use of Services and Prohibited Conduct</li>
                    <li>Intellectual Property Rights</li>
                    <li>Subscription, Payment, and Cancellation Policies</li>
                    <li>Limitation of Liability</li>
                    <li>Governing Law</li>
                    <li>Changes to These Terms</li>
                </ul>
                <p>It is highly recommended to consult with a legal professional to draft your Terms of Use to ensure they are legally sound and tailored to your business.</p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
