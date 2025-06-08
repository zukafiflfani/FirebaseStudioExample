
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { NAV_LINKS, APP_NAME } from '@/lib/constants';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import React, { useState, useEffect, MouseEvent as ReactMouseEvent } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        // setTimeout to ensure layout is stable after initial render
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      // Default to #home if no hash
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

  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          href="/#home"
          onClick={(e) => handleSmoothScroll(e, '/#home')}
          aria-label={`${APP_NAME} homepage`}
        >
          <Image src="/logo.png" alt={`${APP_NAME} Logo`} width={60} height={60} priority style={{ objectFit: 'contain' }} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {NAV_LINKS.map((link) => {
            const linkPath = link.href.startsWith('/') ? link.href : `/${link.href}`;
            const linkHash = linkPath.includes('#') ? linkPath.substring(linkPath.indexOf('#')) : '';
            const isActive = (pathname === '/' || pathname === '') && activeHash === linkHash;
            return (
              <Link
                key={link.label}
                href={linkPath}
                onClick={(e) => handleSmoothScroll(e, linkPath)}
                className={cn(
                  "text-foreground hover:text-primary transition-colors font-medium",
                  isActive ? "text-primary" : ""
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" onClick={() => setMobileMenuOpen(true)}>
                <Menu className="h-6 w-6 text-primary" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px] bg-background">
              <div className="p-6">
                <Link
                  href="/#home"
                  onClick={(e) => {
                    handleSmoothScroll(e, '/#home');
                    setMobileMenuOpen(false);
                  }}
                  aria-label={`${APP_NAME} homepage`}
                  className="mb-8 block"
                >
                  <Image src="/logo.png" alt={`${APP_NAME} Logo`} width={60} height={60} priority style={{ objectFit: 'contain' }} />
                </Link>
                <nav className="flex flex-col space-y-6">
                  {NAV_LINKS.map((link) => {
                    const linkPath = link.href.startsWith('/') ? link.href : `/${link.href}`;
                    const linkHash = linkPath.includes('#') ? linkPath.substring(linkPath.indexOf('#')) : '';
                    const isActive = (pathname === '/' || pathname === '') && activeHash === linkHash;
                    return (
                      <Link
                        key={link.label}
                        href={linkPath}
                        onClick={(e) => handleSmoothScroll(e, linkPath)}
                        className={cn(
                          "text-lg text-foreground hover:text-primary transition-colors",
                          isActive ? "text-primary font-semibold" : ""
                        )}
                      >
                        {link.label}
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
