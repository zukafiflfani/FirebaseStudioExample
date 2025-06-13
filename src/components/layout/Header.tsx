
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { NAV_LINKS_CONFIG } from '@/lib/constants';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import React, { useState, useEffect, MouseEvent as ReactMouseEvent } from 'react';
import { useLanguage } from '@/hooks/useLanguage';

export default function Header() {
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t, isLoading } = useLanguage();

  useEffect(() => {
    const updateHash = () => {
      setActiveHash(window.location.hash);
    };
    updateHash();
    window.addEventListener('hashchange', updateHash, false);
    
    const currentHash = window.location.hash;
    if (currentHash) {
      setActiveHash(currentHash);
      const targetElement = document.getElementById(currentHash.substring(1));
      if (targetElement) {
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      setActiveHash('#home');
    }

    return () => {
      window.removeEventListener('hashchange', updateHash, false);
    };
  }, []);

  const handleSmoothScroll = (e: ReactMouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(href.indexOf('#') + 1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      if (history.pushState) {
        history.pushState(null, '', `#${targetId}`);
      } else {
        window.location.hash = `#${targetId}`;
      }
      setActiveHash(`#${targetId}`); 

      targetElement.scrollIntoView({
        behavior: 'smooth',
      });
    }

    if (mobileMenuOpen) {
      setMobileMenuOpen(false); 
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ka' : 'en');
  };
  
  if (isLoading) {
    // You might want a more sophisticated loading state here
    return (
      <header className="bg-card shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>Loading...</div>
        </div>
      </header>
    );
  }

  const appName = t('appName');

  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          href="/#home"
          onClick={(e) => handleSmoothScroll(e, '/#home')}
          aria-label={`${appName} homepage`}
        >
          <Image src="/logo.png" alt={`${appName} Logo`} width={80} height={80} priority style={{ objectFit: 'contain' }} />
        </Link>

        <nav className="hidden md:flex space-x-6 items-center">
          {NAV_LINKS_CONFIG.map((link) => {
            const linkPath = link.href.startsWith('/') ? link.href : `/${link.href}`;
            const linkHash = linkPath.includes('#') ? linkPath.substring(linkPath.indexOf('#')) : '';
            const isActive = (pathname === '/' || pathname === '') && activeHash === linkHash;
            return (
              <Link
                key={link.labelKey}
                href={linkPath}
                onClick={(e) => handleSmoothScroll(e, linkPath)}
                className={cn(
                  "text-foreground hover:text-primary transition-colors font-medium text-lg", 
                  isActive ? "text-primary" : ""
                )}
              >
                {t(link.labelKey)}
              </Link>
            );
          })}
          <Button variant="outline" size="sm" onClick={toggleLanguage} className="ml-4">
            <Languages className="h-4 w-4 mr-2" />
            {language === 'en' ? t('language.toggle.en') : t('language.toggle.ka')}
          </Button>
        </nav>

        <div className="md:hidden flex items-center">
          <Button variant="ghost" size="icon" onClick={toggleLanguage} className="mr-2">
            <Languages className="h-5 w-5 text-primary" />
             <span className="sr-only">{language === 'en' ? t('language.toggle.en') : t('language.toggle.ka')}</span>
          </Button>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" onClick={() => setMobileMenuOpen(true)}>
                <Menu className="h-6 w-6 text-primary" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px] bg-background">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="p-6">
                <Link
                  href="/#home"
                  onClick={(e) => {
                    handleSmoothScroll(e, '/#home');
                    setMobileMenuOpen(false);
                  }}
                  aria-label={`${appName} homepage`}
                  className="mb-8 block"
                >
                  <Image src="/logo.png" alt={`${appName} Logo`} width={80} height={80} priority style={{ objectFit: 'contain' }} />
                </Link>
                <nav className="flex flex-col space-y-6">
                  {NAV_LINKS_CONFIG.map((link) => {
                    const linkPath = link.href.startsWith('/') ? link.href : `/${link.href}`;
                    const linkHash = linkPath.includes('#') ? linkPath.substring(linkPath.indexOf('#')) : '';
                    const isActive = (pathname === '/' || pathname === '') && activeHash === linkHash;
                    return (
                      <Link
                        key={link.labelKey}
                        href={linkPath}
                        onClick={(e) => handleSmoothScroll(e, linkPath)}
                        className={cn(
                          "text-lg text-foreground hover:text-primary transition-colors",
                          isActive ? "text-primary font-semibold" : ""
                        )}
                      >
                        {t(link.labelKey)}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
