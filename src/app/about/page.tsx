
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, Droplet } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="py-12 sm:py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold font-headline text-primary">
            About Droppurity
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Dedicated to providing clean, safe, and healthy drinking water solutions for everyone.
          </p>
        </header>

        <section className="mb-12 sm:mb-16">
          <Card className="overflow-hidden shadow-xl">
            <div className="md:flex">
              <div className="md:w-1/2">
                <Image
                  src="https://placehold.co/800x800.png"
                  alt="Team working on water solutions"
                  width={800}
                  height={600}
                  className="object-cover h-full w-full"
                  data-ai-hint="team collaboration"
                />
              </div>
              <div className="md:w-1/2 p-6 sm:p-10 flex flex-col justify-center">
                <h2 className="text-2xl sm:text-3xl font-semibold font-headline text-foreground mb-4">Our Story</h2>
                <p className="text-muted-foreground mb-4">
                  Founded with a simple mission: to make pure drinking water accessible and affordable. We believe that access to clean water is a fundamental right, and we are committed to innovating and delivering the best water purification technologies.
                </p>
                <p className="text-muted-foreground">
                  Over the years, Droppurity has grown into a trusted name, known for its reliable products, exceptional customer service, and commitment to sustainability. We continuously strive to improve our offerings and make a positive impact on the health and well-being of our customers.
                </p>
              </div>
            </div>
          </Card>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-12 sm:mb-16 text-center">
          <Card className="shadow-lg">
            <CardHeader>
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-2">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="font-headline text-xl text-foreground">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">To provide innovative and reliable water purification solutions that ensure every household and business has access to safe and healthy drinking water.</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader>
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-2">
                 <Droplet className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="font-headline text-xl text-foreground">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">To be a leading force in promoting public health through advanced water purification technologies, fostering a healthier future for communities worldwide.</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader>
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-2">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="font-headline text-xl text-foreground">Our Values</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-muted-foreground space-y-1 list-inside">
                <li>Customer Focus</li>
                <li>Integrity & Quality</li>
                <li>Innovation</li>
                <li>Sustainability</li>
              </ul>
            </CardContent>
          </Card>
        </section>
        
        <section className="text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold font-headline text-foreground mb-4">Meet the (Placeholder) Team</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Our dedicated team of experts is passionate about water quality and customer satisfaction.
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
                {[1,2,3,4].map(i => (
                    <Card key={i} className="shadow-md">
                        <CardContent className="pt-6">
                            <Image src={`https://placehold.co/800x800.png`} alt={`Team member ${i}`} width={150} height={150} className="rounded-full mx-auto mb-4" data-ai-hint="person portrait" />
                            <h3 className="font-semibold text-foreground">Team Member {i}</h3>
                            <p className="text-sm text-primary">Role / Title</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>

      </div>
    </div>
  );
}
