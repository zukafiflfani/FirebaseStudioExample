import { APP_NAME } from '@/lib/constants';
import { Copyright } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-card text-muted-foreground py-8 border-t">
      <div className="container mx-auto px-4 text-center">
        <p className="flex items-center justify-center text-sm">
          <Copyright className="h-4 w-4 mr-1" /> {currentYear} {APP_NAME}. All rights reserved.
        </p>
        <p className="text-xs mt-2">
          Crafting Outdoor Advertising Excellence
        </p>
      </div>
    </footer>
  );
}
