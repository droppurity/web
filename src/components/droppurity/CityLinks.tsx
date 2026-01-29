import Link from 'next/link';
import { cityData } from '@/config/cityData';

export default function CityLinks({ currentCitySlug }: { currentCitySlug: string }) {
    const otherCities = cityData.filter(c => c.slug !== currentCitySlug);

    return (
        <section className="py-8 bg-muted/30 border-t">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h3 className="text-lg font-semibold mb-4 text-primary">Serve Locations Nearby</h3>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                    {otherCities.map((city) => (
                        <Link
                            key={city.slug}
                            href={`/${city.slug}`}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
                        >
                            RO Rent in {city.name}
                        </Link>
                    ))}
                </div>
                <p className="text-xs text-muted-foreground mt-6 mb-4">
                    We provide doorstep RO water purifier rental services across all major locations.
                    Choose your city to see available plans and local offers.
                </p>

                <div className="border-t pt-4">
                    <h4 className="text-xs font-semibold mb-2 text-muted-foreground uppercase tracking-wider">Popular Searches</h4>
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                        <Link href="/plans" className="hover:text-primary transition-colors">RO on Rent @ ₹299</Link>
                        <span className="text-muted-foreground/30">•</span>
                        <Link href="/plans" className="hover:text-primary transition-colors">Cheap RO Rental</Link>
                        <span className="text-muted-foreground/30">•</span>
                        <Link href="/" className="hover:text-primary transition-colors">RO on Rent Near Me</Link>
                        <span className="text-muted-foreground/30">•</span>
                        <Link href="/contact" className="hover:text-primary transition-colors">RO Installation</Link>
                        <span className="text-muted-foreground/30">•</span>
                        <Link href="/about" className="hover:text-primary transition-colors">Best RO Rental Company</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
