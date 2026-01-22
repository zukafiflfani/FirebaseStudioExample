
import type { NavLinkConfig, WorkItemConfig } from '@/types';

// APP_NAME is now handled by translations: t('appName')

export const NAV_LINKS_CONFIG: NavLinkConfig[] = [
  { href: '/#home', labelKey: 'home' },
  { href: '/#works', labelKey: 'ourWorks' },
];

export const WORKS_DATA_CONFIG: WorkItemConfig[] = [
  {
    id: '1',
    titleKey: 'worksUrbanBillboardTitle',
    descriptionKey: 'worksUrbanBillboardDescription',
    imageUrl: '/works/IMG_0231.png', // Make sure this image exists in public/works/
    aiHint: 'city billboard',
  },
  {
    id: '2',
    titleKey: 'worksTransitAdTitle',
    descriptionKey: 'worksTransitAdDescription',
    imageUrl: '/works/IMG_0249.png', // Make sure this image exists in public/works/
    aiHint: 'bus ad',
  },
  {
    id: '3',
    titleKey: 'dd',
    descriptionKey: 'worksDigitalDisplayDescription',
    imageUrl: '/works/IMG_6649.png', // Make sure this image exists in public/works/
    aiHint: 'digital display',
  },
  {
    id: '4',
    titleKey: 'worksRetailStorefrontTitle',
    descriptionKey: 'worksRetailStorefrontDescription',
    imageUrl: '/works/IMG_6816.png', // Make sure this image exists in public/works/
    aiHint: 'storefront signage',
  },
  {
    id: '5',
    titleKey: 'worksStadiumBannerTitle',
    descriptionKey: 'worksStadiumBannerDescription',
    imageUrl: '/works/IMG_7598.png', // Make sure this image exists in public/works/
    aiHint: 'stadium banner',
  },
  {
    id: '6',
    titleKey: 'worksEventAdTitle',
    descriptionKey: 'worksEventAdDescription',
    imageUrl: '/works/IMG_8360.png', // Make sure this image exists in public/works/
    aiHint: 'event installation',
  },
];
