
import type { NavLinkConfig, WorkItemConfig } from '@/types';

// APP_NAME is now handled by translations: t('appName')

export const NAV_LINKS_CONFIG: NavLinkConfig[] = [
  { href: '/#home', labelKey: 'home' },
  { href: '/#works', labelKey: 'ourWorks' },
  { href: '/#contact', labelKey: 'contactUs' },
];

export const WORKS_DATA_CONFIG: WorkItemConfig[] = [
  {
    id: '1',
    titleKey: 'worksUrbanBillboardTitle',
    descriptionKey: 'worksUrbanBillboardDescription',
    imageUrl: '/works/city-billboard.png',
    aiHint: 'city billboard',
  },
  {
    id: '2',
    titleKey: 'worksTransitAdTitle',
    descriptionKey: 'worksTransitAdDescription',
    imageUrl: '/works/bus-ad.png',
    aiHint: 'bus ad',
  },
  {
    id: '3',
    titleKey: 'worksDigitalDisplayTitle',
    descriptionKey: 'worksDigitalDisplayDescription',
    imageUrl: '/works/digital-display.png',
    aiHint: 'digital display',
  },
  {
    id: '4',
    titleKey: 'worksRetailStorefrontTitle',
    descriptionKey: 'worksRetailStorefrontDescription',
    imageUrl: '/works/storefront-signage.png',
    aiHint: 'storefront signage',
  },
  {
    id: '5',
    titleKey: 'worksStadiumBannerTitle',
    descriptionKey: 'worksStadiumBannerDescription',
    imageUrl: '/works/stadium-banner.png',
    aiHint: 'stadium banner',
  },
  {
    id: '6',
    titleKey: 'worksEventAdTitle',
    descriptionKey: 'worksEventAdDescription',
    imageUrl: '/works/event-installation.png',
    aiHint: 'event installation',
  },
];
