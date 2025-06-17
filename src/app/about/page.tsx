
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, Droplet } from 'lucide-react';

export default function AboutPage() {
  const getFilenameFromUrl = (url: string): string => url.substring(url.lastIndexOf('/') + 1);

  return (
    <div className="py-6 sm:py-10 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl font-bold font-headline text-primary">
            About Droppurity
          </h1>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Dedicated to providing clean, safe, and healthy drinking water solutions for everyone.
          </p>
        </header>

        <section className="mb-8 sm:mb-12">
          <Card className="overflow-hidden shadow-xl">
            <div className="md:flex">
              <div className="md:w-1/2">
                <Image
                  src="https://placehold.co/800x600.png"
                  alt={getFilenameFromUrl("https://placehold.co/800x600.png")}
                  width={800}
                  height={600}
                  className="object-cover h-full w-full"
                  data-ai-hint="team collaboration"
                />
              </div>
              <div className="md:w-1/2 p-5 sm:p-6 flex flex-col justify-center">
                <h2 className="text-lg sm:text-xl font-semibold font-headline text-foreground mb-2.5">Our Story</h2>
                <p className="text-muted-foreground mb-2.5 text-xs sm:text-sm">
                  Founded with a simple mission: to make pure drinking water accessible and affordable. We believe that access to clean water is a fundamental right, and we are committed to innovating and delivering the best water purification technologies.
                </p>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  Over the years, Droppurity has grown into a trusted name, known for its reliable products, exceptional customer service, and commitment to sustainability. We continuously strive to improve our offerings and make a positive impact on the health and well-being of our customers.
                </p>
              </div>
            </div>
          </Card>
        </section>

        <section className="grid md:grid-cols-3 gap-5 mb-8 sm:mb-12 text-center">
          <Card className="shadow-lg">
            <CardHeader className="p-3">
              <div className="mx-auto bg-primary/10 p-2 rounded-full w-fit mb-1">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="font-headline text-base text-foreground">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <p className="text-muted-foreground text-xs">To provide innovative and reliable water purification solutions that ensure every household and business has access to safe and healthy drinking water.</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader className="p-3">
              <div className="mx-auto bg-primary/10 p-2 rounded-full w-fit mb-1">
                 <Droplet className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="font-headline text-base text-foreground">Our Vision</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <p className="text-muted-foreground text-xs">To be a leading force in promoting public health through advanced water purification technologies, fostering a healthier future for communities worldwide.</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader className="p-3">
              <div className="mx-auto bg-primary/10 p-2 rounded-full w-fit mb-1">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="font-headline text-base text-foreground">Our Values</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <ul className="text-muted-foreground space-y-0.5 list-inside text-xs">
                <li>Customer Focus</li>
                <li>Integrity & Quality</li>
                <li>Innovation</li>
                <li>Sustainability</li>
              </ul>
            </CardContent>
          </Card>
        </section>
        
        <section className="text-center">
            <h2 className="text-lg sm:text-xl font-semibold font-headline text-foreground mb-2.5">Meet the (Placeholder) Team</h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-5 text-xs sm:text-sm">
                Our dedicated team of experts is passionate about water quality and customer satisfaction.
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
                {[1,2,3,4].map(i => (
                    <Card key={i} className="shadow-md">
                        <CardContent className="pt-4">
                            <Image src={`https://placehold.co/150x150.png`} alt={getFilenameFromUrl(`https://placehold.co/150x150.png`)} width={100} height={100} className="rounded-full mx-auto mb-2.5" data-ai-hint="person portrait" />
                            <h3 className="font-semibold text-foreground text-sm">Team Member {i}</h3>
                            <p className="text-[10px] text-primary">Role / Title</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>

      </div>
    </div>
  );
}
