'use client';

import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, GalleryHorizontalEnd, Bus, Monitor, Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const servicesData = [
  {
    icon: <GalleryHorizontalEnd className="h-10 w-10 text-primary mb-4" />,
    titleKey: 'expertiseBillboardTitle',
    descriptionKey: 'expertiseBillboardDescription',
  },
  {
    icon: <Bus className="h-10 w-10 text-primary mb-4" />,
    titleKey: 'expertiseTransitTitle',
    descriptionKey: 'expertiseTransitDescription',
  },
  {
    icon: <Monitor className="h-10 w-10 text-primary mb-4" />,
    titleKey: 'expertiseDigitalTitle',
    descriptionKey: 'expertiseDigitalDescription',
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


export default function HomePage() {
  const { t, isLoading, language } = useLanguage(); // Added language for potential key prop changes

  if (isLoading) {
    // Basic loading state, can be improved
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading content...</p>
      </div>
    );
  }
  
  const appName = t('appName');

  return (
    <div className="space-y-16 md:space-y-24">
      {/* Hero Section */}
      <section id="home" className="relative text-center py-16 md:py-24 rounded-lg overflow-hidden bg-secondary">
        <Image
          src="/hero-background.svg"
          alt={t('appName') + ' branded background'}
          layout="fill"
          objectFit="cover"
          className="opacity-20"
          data-ai-hint="brand pattern"
          priority
        />
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary">
            {t('heroWelcome', { appName: appName })}
          </h1>
          <p className="text-lg md:text-xl text-foreground max-w-3xl mx-auto mb-8">
            {t('heroDescription')}
          </p>
          <div className="space-x-4">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/#works">
                {t('heroButtonViewWork')} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t('expertiseTitle')}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <Card key={service.titleKey + language} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex justify-center">{service.icon}</div>
                <CardTitle className="text-2xl">{t(service.titleKey)}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{t(service.descriptionKey)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Our Works Section */}
      <section id="works" className="py-16 md:py-20 bg-card">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
            {t('portfolioTitle')}
          </h1>
          <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            {t('portfolioDescription')}
          </p>
          <WorksSlideshow key={language} /> {/* Add key to re-render on language change if it uses translations internally */}
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-primary">
            {t('contactTitle')}
          </h2>
          <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            {t('contactDescription')}
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-center items-center p-6">
              <div className="flex justify-center mb-4">
                <Phone className="h-10 w-10 text-primary" />
              </div>
              <CardHeader className="p-0 mb-2">
                <CardTitle className="text-2xl">{t('contactPhone')}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-xl font-bold text-foreground">{t('contactPhoneNumber')}</p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-center items-center p-6">
              <div className="flex justify-center mb-4">
                <Mail className="h-10 w-10 text-primary" />
              </div>
              <CardHeader className="p-0 mb-2">
                <CardTitle className="text-2xl">{t('contactEmail')}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <a href={`mailto:${t('contactEmailAddress')}`} className="text-xl font-bold text-foreground hover:underline">
                  {t('contactEmailAddress')}
                </a>
              </CardContent>
            </Card>
            <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-center items-center p-6">
              <div className="flex justify-center mb-4">
                <MapPin className="h-10 w-10 text-primary" />
              </div>
              <CardHeader className="p-0 mb-2">
                <CardTitle className="text-2xl">{t('contactInfoOffice')}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-lg text-foreground">
                  {t('contactInfoOfficeAddress')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
