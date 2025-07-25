
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
            Please read these terms and conditions carefully.
          </p>
        </header>
        <Card className="shadow-xl max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle>Terms and Conditions</CardTitle>
                 <CardDescription>Last updated: July 29, 2024</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground prose prose-sm max-w-none">
              <h2>1. Rental Agreement</h2>
              <p>1.1 The rental services provided by Drop Purity are subject to these Terms and Conditions. By signing the rental agreement, the customer agrees to the terms outlined here.</p>
              <p>1.2 These Terms and Conditions may be modified or updated from time to time. Any modifications will be communicated to the customer and are effective from the date of notice.</p>
              
              <h2>2. Rental Period</h2>
              <p>2.1 The rental period for the equipment is specified in the rental agreement. Early termination or extension of the rental period may incur additional charges.</p>
              <p>2.2 Equipment should be returned in the same condition as it was delivered to the customer. Any damage or malfunction must be reported immediately.</p>
              
              <h2>3. Equipment Condition & Damage</h2>
              <p>3.1 The customer agrees to inspect the rented equipment upon delivery. Any discrepancies or damages must be reported within 24 hours.</p>
              <p>3.2 The customer is responsible for the equipment's maintenance and ensuring it remains in good working condition during the rental period.</p>
              
              <h2>4. Charges for Damages</h2>
              <ul>
                  <li>Front cover damage: Rs. 1,000</li>
                  <li>Main body damage: Rs. 1,700</li>
                  <li>Missing or malfunctioning Pump: Rs. 2,500</li>
                  <li>Missing or malfunctioning Membrane: Rs. 2,500</li>
                  <li>Missing or malfunctioning Filter: Rs. 500 per piece</li>
                  <li>Missing or malfunctioning SMPS (Power supply): Rs. 700</li>
              </ul>
              <p>3.3 If the equipment is damaged, lost, or malfunctions during the rental period, the customer must notify Drop Purity immediately. The repair or replacement cost will be billed to the customer as per the damage charges outlined above.</p>
              
              <h2>5. Installation & KYC Requirements</h2>
              <p>5.1 Installation of the equipment will be done by Drop Purity only after submission of the following documents:</p>
              <ul>
                  <li>Valid identification proof (Aadhaar card, Voter ID, etc.)</li>
                  <li>Address proof (Utility bills, Rent agreement, etc.)</li>
                  <li>A signed rental agreement</li>
                  <li>Any other documents as required by Drop Purity for verification.</li>
              </ul>
              <p>5.2 The installation process may involve minor drilling or fitting for the equipment. Drop Purity is not liable for any damages caused to the walls, floors, or any structural components of the property during the installation.</p>
              <p>5.3 If any alterations to existing pipelines or plumbing are required for installation, the customer agrees to bear the costs of such alterations. Drop Purity will not be responsible for any damage to the pipelines.</p>
              
              <h2>6. Maintenance & Servicing</h2>
              <p>6.1 The customer is expected to use the equipment as per the manufacturer's instructions and ensure that it remains in working condition.</p>
              <p>6.2 In case of a malfunction, the customer should immediately contact Drop Purity for troubleshooting and possible repair services. The company will determine if the issue is covered under the warranty or if it is chargeable based on the damage.</p>
              
              <h2>7. Liability</h2>
              <p>7.1 Drop Purity is not responsible for any direct or indirect damages resulting from the misuse, unauthorized alterations, or negligence of the customer regarding the rented equipment.</p>
              <p>7.2 Drop Purity is not liable for any damages to the property (including pipelines or other infrastructure) caused during the installation of the equipment.</p>
              <p>7.3 Drop Purity is not liable for any damages or losses resulting from natural calamities (such as floods, earthquakes, or storms) during the rental period.</p>
              <p>7.4 The customer is liable for the equipment from the time it is delivered to the time it is returned in good condition.</p>
              
              <h2>8. Return of Equipment</h2>
              <p>8.1 The customer must return the equipment by the due date specified in the rental agreement.</p>
              <p>8.2 Failure to return the equipment on time may result in additional rental charges, as outlined in the agreement.</p>
              
              <h2>9. Payment Terms</h2>
              <p>9.1 The customer agrees to pay the rental charges on time, as outlined in the agreement. Late payments may incur penalties.</p>
              <p>9.2 All damages will be invoiced to the customer, and payment for repairs or replacement must be made as per the due date.</p>
              
              <h2>10. Termination of Rental Agreement</h2>
              <p>10.1 Either party can terminate the rental agreement by giving written notice in accordance with the terms mentioned in the agreement.</p>
              <p>10.2 Upon termination, the customer must return the equipment immediately in good condition. Any outstanding dues will need to be cleared before the return.</p>
              
              <h2>11. Governing Law</h2>
              <p>11.1 This rental agreement and any disputes arising from it will be governed by the laws of Jharkhand, India.</p>
              
              <h2>12. Contact Information</h2>
              <p>For any queries or support related to the rented equipment, please contact us at:</p>
              <ul>
                  <li>Email: <a href="mailto:official@droppurity.com">official@droppurity.com</a></li>
                  <li>Phone: 7979784087</li>
              </ul>
              <h2>13. Sales Terms & Conditions</h2>

              <h3>13.1 Product Purchase Agreement</h3>
              <p>By purchasing a product from Drop Purity, the customer agrees to abide by the terms mentioned in this agreement.</p>
              <p>All sales are final. Drop Purity does not accept returns under any circumstances.</p>

              <h3>13.2 Warranty Policy</h3>
              <p>All products sold by Drop Purity come with a standard mentioned warranty from the date of purchase, unless stated otherwise.</p>
              <p>The warranty covers manufacturing defects and technical malfunctions under normal usage conditions.</p>

              <h3>13.3 Conditions That Void Warranty</h3>
              <p>The warranty will be void if:</p>
              <ul>
                  <li>The product's seal is broken or tampered with.</li>
                  <li>The serial number or identifying labels are removed, altered, or tampered with.</li>
                  <li>The product is physically damaged due to mishandling, water exposure (for non-waterproof parts), fire, or external accidents.</li>
                  <li>There are unauthorized modifications, repairs, or alterations by a third party not approved by Drop Purity.</li>
                  <li>The equipment is found to be misused, not operated according to the manufacturer's instructions, or subjected to negligence.</li>
                  <li>Any parts (such as filters, membranes, or pumps) are missing or replaced with non-genuine components.</li>
              </ul>

              <h3>13.4 Replacement & Repair Policy</h3>
              <p>If a defect is found within the warranty period, Drop Purity will repair or replace the defective part at no extra charge.</p>
              <p>The customer must provide a valid purchase invoice to claim the warranty.</p>
              <p>Shipping or transportation costs for warranty claims are to be borne by the customer.</p>
              <p>No refunds or returns will be entertained under any circumstances.</p>

              <h2>14. Charges for Damages</h2>
              <ul>
                  <li>Front cover damage: Rs. 1,000</li>
                  <li>Main body damage: Rs. 1,700</li>
                  <li>Missing or malfunctioning Pump: Rs. 2,500</li>
                  <li>Missing or malfunctioning Membrane: Rs. 2,500</li>
                  <li>Missing or malfunctioning Filter: Rs. 500 per piece</li>
                  <li>Missing or malfunctioning SMPS (Power supply): Rs. 700</li>
              </ul>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
