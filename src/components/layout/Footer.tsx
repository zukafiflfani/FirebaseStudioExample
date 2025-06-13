
'use client';

import { Copyright } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t, isLoading } = useLanguage();

  if (isLoading) {
    // Basic loading state, can be improved
    return (
      <footer className="bg-card text-muted-foreground py-8 border-t">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">Loading...</p>
        </div>
      </footer>
    );
  }

  const appName = t('appName');

  return (
    <footer className="bg-card text-muted-foreground py-8 border-t">
      <div className="container mx-auto px-4 text-center">
        <p className="flex items-center justify-center text-sm">
          <Copyright className="h-4 w-4 mr-1" /> {t('footerCopyright', { currentYear, appName })}
        </p>
        <p className="text-xs mt-2">
          {t('footerTagline')}
        </p>
      </div>
    </footer>
  );
}
