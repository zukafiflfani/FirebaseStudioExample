
export type NavLink = {
  href: string;
  label: string; // This will become a translation key
};

export type NavLinkConfig = {
  href: string;
  labelKey: string;
};

export type WorkItem = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  aiHint: string;
};

export type WorkItemConfig = {
  id: string;
  titleKey: string;
  descriptionKey: string;
  imageUrl: string;
  aiHint: string;
};

export type Language = 'en' | 'ka';

export type Translations = {
  [key: string]: string | Translations;
};
