import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, GalleryHorizontalEnd, Bus, MonitorPlay } from 'lucide-react';
import { APP_NAME, WORKS_DATA } from '@/lib/constants';

const services = [
  {
    icon: <GalleryHorizontalEnd className="h-10 w-10 text-primary mb-4" />,
    title: 'Billboard Design',
    description: 'Eye-catching designs for maximum impact on large-scale billboards.',
  },
  {
    icon: <Bus className="h-10 w-10 text-primary mb-4" />,
    title: 'Transit Ads',
    description: 'Creative advertising solutions for buses, trains, and transit shelters.',
  },
  {
    icon: <MonitorPlay className="h-10 w-10 text-primary mb-4" />,
    title: 'Digital Displays',
    description: 'Dynamic and engaging content for digital outdoor advertising screens.',
  },
];

export default function HomePage() {
  const featuredWorks = WORKS_DATA.slice(0, 2);

  return (
    <div className="space-y-16 md:space-y-24">
      {/* Hero Section */}
      <section className="relative text-center py-16 md:py-24 rounded-lg overflow-hidden bg-secondary">
        <Image
          src="https://placehold.co/1200x500.png"
          alt="Outdoor advertising collage"
          layout="fill"
          objectFit="cover"
          className="opacity-20"
          data-ai-hint="outdoor advertising"
        />
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary">
            Welcome to {APP_NAME}
          </h1>
          <p className="text-lg md:text-xl text-foreground max-w-3xl mx-auto mb-8">
            We craft innovative and impactful outdoor advertising solutions that capture attention and deliver results. Let us bring your brand to life in the great outdoors.
          </p>
          <div className="space-x-4">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/works">
                View Our Work <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">
                Get in Touch
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Expertise</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.title} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex justify-center">{service.icon}</div>
                <CardTitle className="text-2xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Works Preview */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Featured Works</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {featuredWorks.map((work) => (
            <Card key={work.id} className="overflow-hidden shadow-lg">
              <Image
                src={work.imageUrl}
                alt={work.title}
                width={800}
                height={600}
                className="w-full h-64 object-cover"
                data-ai-hint={work.aiHint}
              />
              <CardHeader>
                <CardTitle>{work.title}</CardTitle>
                <CardDescription>{work.description}</CardDescription>
              </CardHeader>
              <CardContent>
                 <Button asChild variant="link" className="text-primary p-0">
                    <Link href={`/works#${work.id}`}>Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                 </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/works">Explore All Works <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
