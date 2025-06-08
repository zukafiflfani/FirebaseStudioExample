
'use client';

import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, GalleryHorizontalEnd, Bus, MonitorPlay, Mail, Phone, MapPin } from 'lucide-react';
import { APP_NAME, WORKS_DATA } from '@/lib/constants';
import { Skeleton } from '@/components/ui/skeleton';

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

const WorksSlideshow = dynamic(() => import('@/components/works/WorksSlideshow'), {
  loading: () => (
    <div className="flex justify-center items-center h-64">
      <p>Loading slideshow...</p>
    </div>
  ),
  ssr: false, 
});

const ContactFormComponent = dynamic(() => import('@/components/contact/ContactForm'), {
  loading: () => (
    <div className="space-y-8 max-w-xl mx-auto bg-card p-8 rounded-lg shadow-xl">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  ),
  ssr: false, 
});


export default function HomePage() {
  return (
    <div className="space-y-16 md:space-y-24">
      {/* Hero Section */}
      <section id="home" className="relative text-center py-16 md:py-24 rounded-lg overflow-hidden bg-secondary">
        <Image
          src="/hero-background.svg"
          alt="AD TIME branded background"
          layout="fill"
          objectFit="cover"
          className="opacity-20"
          data-ai-hint="brand pattern"
          priority
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
              <Link href="/#works">
                View Our Work <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/#contact">
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

      {/* Our Works Section */}
      <section id="works" className="py-16 md:py-20 bg-card">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
            Our Portfolio
          </h1>
          <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Explore a selection of our finest outdoor advertising campaigns. Each project showcases our commitment to creativity, quality, and impact.
          </p>
          <WorksSlideshow />
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="py-16 md:py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-primary">
            Get In Touch
          </h1>
          <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            We&apos;re excited to hear about your project! Fill out the form below, or reach out to us via phone or email.
          </p>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-primary mr-4 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold">Our Office</h3>
                    <p className="text-muted-foreground">123 AdCraft Avenue, Creative City, CC 12345</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-primary mr-4 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold">Email Us</h3>
                    <a href="mailto:hello@adcraft.studio" className="text-muted-foreground hover:text-primary">hello@adcraft.studio</a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-primary mr-4 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold">Call Us</h3>
                    <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary">+1 (234) 567-890</a>
                  </div>
                </div>
              </div>
              <p className="mt-8 text-sm text-muted-foreground">
                Office Hours: Monday - Friday, 9:00 AM - 6:00 PM
              </p>
            </div>

            <div>
              <ContactFormComponent />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
