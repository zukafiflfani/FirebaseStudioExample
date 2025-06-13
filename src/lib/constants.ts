
import type { NavLinkConfig, WorkItemConfig } from '@/types';

// APP_NAME is now handled by translations: t('appName')

export const NAV_LINKS_CONFIG: NavLinkConfig[] = [
  { href: '/#home', labelKey: 'nav.home' },
  { href: '/#works', labelKey: 'nav.ourWorks' },
  { href: '/#contact', labelKey: 'nav.contactUs' },
];

export const WORKS_DATA_CONFIG: WorkItemConfig[] = [
  {
    id: '1',
    titleKey: 'works.urbanBillboard.title',
    descriptionKey: 'works.urbanBillboard.description',
    imageUrl: '/works/city-billboard.png', // Make sure this image exists in public/works/
    aiHint: 'city billboard',
  },
  {
    id: '2',
    titleKey: 'works.transitAd.title',
    descriptionKey: 'works.transitAd.description',
    imageUrl: '/works/bus-ad.png', // Make sure this image exists in public/works/
    aiHint: 'bus ad',
  },
  {
    id: '3',
    titleKey: 'works.digitalDisplay.title',
    descriptionKey: 'works.digitalDisplay.description',
    imageUrl: '/works/digital-display.png', // Make sure this image exists in public/works/
    aiHint: 'digital display',
  },
  {
    id: '4',
    titleKey: 'works.retailStorefront.title',
    descriptionKey: 'works.retailStorefront.description',
    imageUrl: '/works/storefront-signage.png', // Make sure this image exists in public/works/
    aiHint: 'storefront signage',
  },
  {
    id: '5',
    titleKey: 'works.stadiumBanner.title',
    descriptionKey: 'works.stadiumBanner.description',
    imageUrl: '/works/stadium-banner.png', // Make sure this image exists in public/works/
    aiHint: 'stadium banner',
  },
  {
    id: '6',
    titleKey: 'works.eventAd.title',
    descriptionKey: 'works.eventAd.description',
    imageUrl: '/works/event-installation.png', // Make sure this image exists in public/works/
    aiHint: 'event installation',
  },
];
