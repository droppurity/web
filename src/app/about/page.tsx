
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, Droplet } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="py-8 sm:py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-10 sm:mb-14">
          <h1 className="text-3xl sm:text-4xl font-bold font-headline text-primary">
            About Droppurity
          </h1>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Dedicated to providing clean, safe, and healthy drinking water solutions for everyone.
          </p>
        </header>

        <section className="mb-10 sm:mb-14">
          <Card className="overflow-hidden shadow-xl">
            <div className="md:flex">
              <div className="md:w-1/2">
                <Image
                  src="https://placehold.co/800x600.png"
                  alt="Team working on water solutions"
                  width={800}
                  height={600}
                  className="object-cover h-full w-full"
                  data-ai-hint="team collaboration"
                />
              </div>
              <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
                <h2 className="text-xl sm:text-2xl font-semibold font-headline text-foreground mb-3">Our Story</h2>
                <p className="text-muted-foreground mb-3 text-sm sm:text-base">
                  Founded with a simple mission: to make pure drinking water accessible and affordable. We believe that access to clean water is a fundamental right, and we are committed to innovating and delivering the best water purification technologies.
                </p>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Over the years, Droppurity has grown into a trusted name, known for its reliable products, exceptional customer service, and commitment to sustainability. We continuously strive to improve our offerings and make a positive impact on the health and well-being of our customers.
                </p>
              </div>
            </div>
          </Card>
        </section>

        <section className="grid md:grid-cols-3 gap-6 mb-10 sm:mb-14 text-center">
          <Card className="shadow-lg">
            <CardHeader className="p-4">
              <div className="mx-auto bg-primary/10 p-2.5 rounded-full w-fit mb-1.5">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <CardTitle className="font-headline text-lg text-foreground">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-muted-foreground text-sm">To provide innovative and reliable water purification solutions that ensure every household and business has access to safe and healthy drinking water.</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader className="p-4">
              <div className="mx-auto bg-primary/10 p-2.5 rounded-full w-fit mb-1.5">
                 <Droplet className="w-7 h-7 text-primary" />
              </div>
              <CardTitle className="font-headline text-lg text-foreground">Our Vision</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-muted-foreground text-sm">To be a leading force in promoting public health through advanced water purification technologies, fostering a healthier future for communities worldwide.</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader className="p-4">
              <div className="mx-auto bg-primary/10 p-2.5 rounded-full w-fit mb-1.5">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <CardTitle className="font-headline text-lg text-foreground">Our Values</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <ul className="text-muted-foreground space-y-0.5 list-inside text-sm">
                <li>Customer Focus</li>
                <li>Integrity & Quality</li>
                <li>Innovation</li>
                <li>Sustainability</li>
              </ul>
            </CardContent>
          </Card>
        </section>
        
        <section className="text-center">
            <h2 className="text-xl sm:text-2xl font-semibold font-headline text-foreground mb-3">Meet the (Placeholder) Team</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-6 text-sm sm:text-base">
                Our dedicated team of experts is passionate about water quality and customer satisfaction.
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                {[1,2,3,4].map(i => (
                    <Card key={i} className="shadow-md">
                        <CardContent className="pt-5">
                            <Image src={`https://placehold.co/150x150.png`} alt={`Team member ${i}`} width={120} height={120} className="rounded-full mx-auto mb-3" data-ai-hint="person portrait" />
                            <h3 className="font-semibold text-foreground text-base">Team Member {i}</h3>
                            <p className="text-xs text-primary">Role / Title</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>

      </div>
    </div>
  );
}
