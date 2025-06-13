
'use client';

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { WORKS_DATA_CONFIG } from '@/lib/constants';
import Autoplay from "embla-carousel-autoplay";
import type { WorkItemConfig } from '@/types';
import { useLanguage } from '@/hooks/useLanguage';

export default function WorksSlideshow() {
  const { t, isLoading, language } = useLanguage();

  if (isLoading) {
    return <div className="p-1 h-full">Loading works...</div>;
  }

  return (
    <Carousel 
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 5000,
          stopOnInteraction: true,
        }),
      ]}
      className="w-full max-w-4xl mx-auto"
    >
      <CarouselContent>
        {WORKS_DATA_CONFIG.map((work: WorkItemConfig, index: number) => (
          <CarouselItem key={work.id + language} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1 h-full">
              <Card className="h-full flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative w-full h-64">
                  <Image
                    src={work.imageUrl}
                    alt={t(work.titleKey)}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-t-lg"
                    data-ai-hint={work.aiHint}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={index === 0}
                    loading={index !== 0 ? "lazy" : "eager"}
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">{t(work.titleKey)}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription>{t(work.descriptionKey)}</CardDescription>
                </CardContent>
                <CardFooter>
                  {/* Intentionally empty as per previous request */}
                </CardFooter>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
