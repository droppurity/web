
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, Droplet, User } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Droppurity',
  description: 'Learn about Droppurity\'s mission to provide clean, safe, and healthy drinking water solutions for everyone.',
  alternates: {
    canonical: '/about',
  },
};

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
          <Card className="shadow-xl bg-card">
            <CardHeader className="items-center text-center p-6">
              <CardTitle className="text-2xl sm:text-3xl font-bold font-headline text-foreground">Our Story</CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-8 text-center max-w-3xl mx-auto">
              <p className="text-muted-foreground mb-4 text-sm sm:text-base leading-relaxed">
                Founded with a simple mission: to make pure drinking water accessible and affordable. We believe that access to clean water is a fundamental right, and we are committed to innovating and delivering the best water purification technologies.
              </p>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                Over the years, Droppurity has grown into a trusted name, known for its reliable products, exceptional customer service, and commitment to sustainability. We continuously strive to improve our offerings and make a positive impact on the health and well-being of our customers.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-14 text-center">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="p-4 sm:p-6">
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-2">
                <Target className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
              </div>
              <CardTitle className="font-headline text-lg sm:text-xl text-foreground">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <p className="text-muted-foreground text-sm">To provide innovative and reliable water purification solutions that ensure every household and business has access to safe and healthy drinking water.</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="p-4 sm:p-6">
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-2">
                 <Droplet className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
              </div>
              <CardTitle className="font-headline text-lg sm:text-xl text-foreground">Our Vision</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <p className="text-muted-foreground text-sm">To be a leading force in promoting public health through advanced water purification technologies, fostering a healthier future for communities worldwide.</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="p-4 sm:p-6">
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-2">
                <Users className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
              </div>
              <CardTitle className="font-headline text-lg sm:text-xl text-foreground">Our Values</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <ul className="text-muted-foreground space-y-1 list-inside text-sm">
                <li>Customer Focus</li>
                <li>Integrity & Quality</li>
                <li>Innovation</li>
                <li>Sustainability</li>
              </ul>
            </CardContent>
          </Card>
        </section>
        
        <section className="text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold font-headline text-foreground mb-4">Meet the Team</h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8 text-sm sm:text-base">
                Our dedicated team of experts is passionate about water quality and customer satisfaction.
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
                {[
                    { name: 'Prakash Jha', role: 'CEO & Founder' },
                    { name: 'Rohan Mehra', role: 'Head of Engineering' },
                    { name: 'Sunita Patel', role: 'Marketing Director' },
                    { name: 'Anjali Sharma', role: 'Operations Manager' },
                ].map((member, i) => (
                    <Card key={i} className="shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
                        <CardContent className="p-6 flex flex-col items-center justify-center">
                            <div className="bg-primary/10 p-4 rounded-full mb-4">
                                <User className="w-10 h-10 text-primary" />
                            </div>
                            <h3 className="font-semibold text-foreground text-lg">{member.name}</h3>
                            <p className="text-sm text-primary">{member.role}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>

      </div>
    </div>
  );
}
