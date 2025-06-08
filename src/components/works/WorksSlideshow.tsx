
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
import { WORKS_DATA } from '@/lib/constants';
import Autoplay from "embla-carousel-autoplay"
import type { WorkItem } from '@/types';

export default function WorksSlideshow() {
  return (
    <Carousel 
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
      className="w-full max-w-4xl mx-auto"
    >
      <CarouselContent>
        {WORKS_DATA.map((work: WorkItem, index: number) => (
          <CarouselItem key={work.id} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1 h-full">
              <Card className="h-full flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative w-full h-64">
                  <Image
                    src={work.imageUrl}
                    alt={work.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-t-lg"
                    data-ai-hint={work.aiHint}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={index === 0}
                    loading={index !== 0 ? "lazy" : undefined} // Explicitly lazy for non-priority, priority implies eager
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">{work.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription>{work.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  {/* Project ID removed as per request */}
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
