import type { NavLink, WorkItem } from '@/types';

export const APP_NAME = "AdCraft Studio";

export const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/works', label: 'Our Works' },
  { href: '/contact', label: 'Contact Us' },
];

export const WORKS_DATA: WorkItem[] = [
  {
    id: '1',
    title: 'Urban Billboard Campaign',
    description: 'A striking billboard design for downtown cityscapes, maximizing visibility and impact.',
    imageUrl: 'https://placehold.co/800x600.png',
    aiHint: 'city billboard',
  },
  {
    id: '2',
    title: 'Transit Advertising Solution',
    description: 'Engaging bus and subway advertisements that capture the attention of commuters.',
    imageUrl: 'https://placehold.co/800x600.png',
    aiHint: 'bus ad',
  },
  {
    id: '3',
    title: 'Digital Display Innovation',
    description: 'Dynamic content for digital screens in high-traffic public spaces.',
    imageUrl: 'https://placehold.co/800x600.png',
    aiHint: 'digital display',
  },
  {
    id: '4',
    title: 'Retail Storefront Activation',
    description: 'Creative window displays and outdoor signage for retail businesses.',
    imageUrl: 'https://placehold.co/800x600.png',
    aiHint: 'storefront signage',
  },
  {
    id: '5',
    title: 'Stadium Banner Ads',
    description: 'Large-format banners designed for maximum impact in sports stadiums.',
    imageUrl: 'https://placehold.co/800x600.png',
    aiHint: 'stadium banner',
  },
  {
    id: '6',
    title: 'Event Ad Installations',
    description: 'Custom outdoor advertising installations for events and festivals.',
    imageUrl: 'https://placehold.co/800x600.png',
    aiHint: 'event installation',
  },
];
