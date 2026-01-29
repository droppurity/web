import { CityData } from '@/config/cityData';

export default function CitySEOContent({ city }: { city: CityData }) {
    return (
        <section className="py-12 bg-background border-t border-border/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">

                <article className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-muted-foreground">
                    <h2 className="text-2xl font-bold text-foreground mb-4">
                        Why Rent an RO Water Purifier in {city.name}?
                    </h2>
                    <p>
                        Access to clean, safe drinking water is essential, and in a bustling city like <strong>{city.name}</strong>, ensuring purity can be a challenge.
                        Traditional methods like boiling or buying water cans are often inconvenient, expensive, or unreliable.
                        That's where <strong>Droppurity</strong> comes in. We offer a smart, hassle-free alternative:
                        <strong>RO Water Purifier on Rent in {city.name}</strong>.
                    </p>

                    <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
                        The Smartest Way to Drink Pure Water in {city.name}
                    </h3>
                    <p>
                        Why buy an expensive machine when you can simply subscribe? Our subscription plans are designed for the modern lifestyle of {city.name}.
                        Whether you live in an apartment, independent house, or are renting a shared space, our <strong>Zero-Installation Fee</strong> and
                        <strong>Lifetime Free Maintenance</strong> policy means you never have to worry about water quality again.
                    </p>
                    <p className="mt-2">
                        Our IoT-enabled purifiers monitor water quality in real-time, ensuring that every drop you drink meets the highest safety standards.
                        If the filter quality drops, our proactive service team in {city.name} is alerted instantly to schedule a service visit—often before you even notice.
                    </p>

                    <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
                        Key Benefits for {city.name} Residents
                    </h3>
                    <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Zero Down Payment:</strong> Start your purified water journey without heavy upfront costs.</li>
                        <li><strong>7-Day Risk-Free Trial:</strong> Try our service in {city.name} for a week. If you're not satisfied, we take it back, no questions asked.</li>
                        <li><strong>Free Relocation:</strong> Moving within {city.name}? We relocate your purifier for free.</li>
                        <li><strong>Tailored for {city.name} Water:</strong> Our RO+UV+Copper filters are calibrated to treat the specific TDS levels commonly found in {city.name}'s water supply.</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
                        Comparison: Buying vs. Renting RO in {city.name}
                    </h3>
                    <div className="overflow-x-auto my-6 border rounded-lg">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs uppercase bg-muted/50 text-muted-foreground">
                                <tr>
                                    <th className="px-6 py-3">Feature</th>
                                    <th className="px-6 py-3">Buying RO</th>
                                    <th className="px-6 py-3 text-primary font-bold">Droppurity Rental</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                <tr className="bg-background">
                                    <td className="px-6 py-4 font-medium">Upfront Cost</td>
                                    <td className="px-6 py-4 text-red-500">₹15,000 - ₹20,000</td>
                                    <td className="px-6 py-4 text-green-600 font-bold">₹0 (Zero)</td>
                                </tr>
                                <tr className="bg-background">
                                    <td className="px-6 py-4 font-medium">Installation</td>
                                    <td className="px-6 py-4 text-red-500">₹500 - ₹1,000</td>
                                    <td className="px-6 py-4 text-green-600 font-bold">FREE</td>
                                </tr>
                                <tr className="bg-background">
                                    <td className="px-6 py-4 font-medium">Maintenance (Yearly)</td>
                                    <td className="px-6 py-4 text-red-500">₹3,000 - ₹5,000</td>
                                    <td className="px-6 py-4 text-green-600 font-bold">FREE</td>
                                </tr>
                                <tr className="bg-background">
                                    <td className="px-6 py-4 font-medium">Filter Replacement</td>
                                    <td className="px-6 py-4 text-red-500">Paid</td>
                                    <td className="px-6 py-4 text-green-600 font-bold">FREE</td>
                                </tr>
                                <tr className="bg-background">
                                    <td className="px-6 py-4 font-medium">Relocation</td>
                                    <td className="px-6 py-4 text-red-500">Paid & Hassle</td>
                                    <td className="px-6 py-4 text-green-600 font-bold">FREE</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
                        Areas We Serve in {city.name}
                    </h3>
                    <p>
                        We deliver and install across all major neighborhoods. Check our <em>{city.localPlanTitle}</em> to find predetermined packages that suit your family size.
                        Stop relying on unverified water jars. Switch to your personal, hygienic RO water purifier today.
                    </p>

                    <p className="text-sm mt-8 border-t pt-4 italic">
                        {city.localTitle} — The trusted choice for thousands of families.
                    </p>
                </article>

            </div>
        </section>
    );
}
