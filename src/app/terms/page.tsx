
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Review the terms and conditions for using the Droppurity website and services.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsOfUsePage() {
  return (
    <div className="py-8 sm:py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-10 sm:mb-14">
          <h1 className="text-3xl sm:text-4xl font-bold font-headline text-primary">
            Terms & Conditions
          </h1>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Please read these terms and conditions carefully before using our services.
          </p>
        </header>
        <Card className="shadow-xl max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle>Droppurity Service Agreement</CardTitle>
                 <CardDescription>Last updated: July 29, 2024</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-muted-foreground prose prose-sm max-w-none">
              <p>Welcome to Droppurity. These Terms and Conditions govern your rental or purchase of our water purification products and services. By entering into an agreement with us, you accept these terms in full.</p>

              <div className="space-y-4">
                  <h2 className="!mb-2">1. Service Agreement</h2>
                  <p>1.1. The rental and sale services provided by Droppurity are subject to this agreement. By signing the service agreement, the customer agrees to the terms outlined herein.</p>
                  <p>1.2. These Terms and Conditions may be modified or updated from time to time. Any modifications will be communicated to the customer and are effective from the date of notice.</p>
              </div>

              <div className="space-y-4">
                  <h2 className="!mb-2">2. Rental Period</h2>
                  <p>2.1. The rental period for the equipment is specified in the rental agreement. Extension of the rental period may incur additional charges.</p>
                  <p>2.2. Equipment must be returned in the same condition as it was delivered, barring normal wear and tear. Any damage or malfunction must be reported immediately.</p>
              </div>
              
              <div className="space-y-4">
                  <h2 className="!mb-2">3. Lock-in Period & Early Termination (For Rentals)</h2>
                  <p>3.1. All rental plans are subject to a mandatory **12-month lock-in period** from the date of installation.</p>
                  <p>3.2. If the customer chooses to terminate the service before the completion of the 12-month lock-in period, an early termination fee equivalent to three (3) months of the rental subscription fee will be charged. This fee is in addition to any charges for damages.</p>
              </div>

              <div className="space-y-4">
                  <h2 className="!mb-2">4. Installation & KYC Requirements</h2>
                  <p>4.1. Installation will proceed only after the submission and verification of the following documents: valid identification proof (Aadhaar card, Voter ID, etc.), address proof (utility bills, rent agreement, etc.), and a signed rental agreement.</p>
                  <p>4.2. The installation process may involve minor drilling. While our technicians take utmost care, Droppurity is not liable for minor damages to walls, floors, or structural components.</p>
                  <p>4.3. If alterations to existing plumbing are required, the customer agrees to bear the costs. Droppurity is not responsible for any damage to existing pipelines.</p>
              </div>

              <div className="space-y-4">
                  <h2 className="!mb-2">5. Maintenance & Servicing (For Rentals)</h2>
                  <p>5.1. As long as the rental subscription is active, all maintenance, including filter changes and repairs due to normal functioning, is provided free of charge.</p>
                  <p>5.2. In case of a malfunction, the customer must immediately contact Droppurity. Service will be provided based on the terms of the active rental plan.</p>
              </div>

              <div className="space-y-4">
                  <h2 className="!mb-2">6. Sales Terms & Conditions</h2>
                  <h3 className="!text-sm !mb-1">6.1. Product Purchase & Warranty</h3>
                  <p>All products sold by Droppurity come with a standard manufacturer's warranty from the date of purchase, which covers manufacturing defects and technical malfunctions under normal usage. The warranty is void if the product's seal is broken, it is physically damaged, or unauthorized repairs are attempted. Please refer to the specific product warranty card for details.</p>
                  <h3 className="!text-sm !mb-1">6.2. Returns & Refunds</h3>
                  <p>All sales of water purifiers are final. Droppurity does not accept returns or provide refunds for products that have been purchased outright. We encourage customers to take advantage of our 7-day risk-free trial for rental units to ensure satisfaction before making a purchase decision.</p>
              </div>

              <div className="space-y-4">
                <h2 className="!mb-2">7. Shipping Policy</h2>
                <p>7.1. Delivery and installation will be completed within 48 hours of successful order placement and verification.</p>
              </div>

              <div className="space-y-4">
                  <h2 className="!mb-2">8. Equipment Condition & Charges for Damages</h2>
                  <p>8.1. The customer agrees to inspect the equipment upon delivery. Any discrepancies must be reported within 24 hours.</p>
                  <p>8.2. The customer is responsible for the equipment's safekeeping. If the equipment is damaged, lost, or malfunctions due to misuse during the rental period, the customer must notify Droppurity immediately. The repair or replacement cost will be billed to the customer as per the charges outlined below:</p>
                  <ul className="!mt-2">
                      <li>Front cover damage: ₹1,000</li>
                      <li>Main body damage: ₹1,700</li>
                      <li>Missing or malfunctioning Pump: ₹2,500</li>
                      <li>Missing or malfunctioning Membrane: ₹2,500</li>
                      <li>Missing or malfunctioning Filter: ₹500 per piece</li>
                      <li>Missing or malfunctioning SMPS (Power supply): ₹700</li>
                  </ul>
              </div>
              
              <div className="space-y-4">
                  <h2 className="!mb-2">9. Liability</h2>
                  <p>9.1. Droppurity is not responsible for damages resulting from misuse, unauthorized alterations, or negligence by the customer.</p>
                  <p>9.2. Droppurity's liability is limited to the value of the service provided. We are not liable for indirect or consequential damages.</p>
              </div>

              <div className="space-y-4">
                  <h2 className="!mb-2">10. Payment Terms</h2>
                  <p>10.1. The customer agrees to pay all rental and other charges on time. Late payments may incur penalties as specified in the service agreement.</p>
                  <p>10.2. All damage charges will be invoiced separately and must be paid by the due date.</p>
              </div>

              <div className="space-y-4">
                  <h2 className="!mb-2">11. Governing Law</h2>
                  <p>11.1. This agreement and any disputes arising from it will be governed by the laws of India, with exclusive jurisdiction in the courts of Jharkhand.</p>
              </div>

              <div className="space-y-4">
                  <h2 className="!mb-2">12. General Provisions</h2>
                  <p>12.1. This document constitutes the entire agreement between the customer and Droppurity. No other promises, representations, or agreements, whether verbal or written, shall be binding unless they are in writing and signed by both parties.</p>
              </div>

              <div className="space-y-4">
                  <h2 className="!mb-2">13. Contact Information</h2>
                  <p>For any queries or support, please contact us at:</p>
                  <ul className="!mt-2">
                      <li>Email: <a href="mailto:official@droppurity.in" className="text-primary hover:underline">official@droppurity.in</a></li>
                      <li>Phone: +91 79797 84087</li>
                  </ul>
              </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
