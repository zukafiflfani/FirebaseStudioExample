
'use client';

import Link from 'next/link';
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
    updateHash(); // Initial check
    window.addEventListener('hashchange', updateHash, false);
    
    // Optional: More advanced active link highlighting based on scroll position
    // would require a scroll event listener and intersection observer.
    // For now, hashchange is sufficient for click-based navigation.

    return () => {
      window.removeEventListener('hashchange', updateHash, false);
    };
  }, []);

  const handleSmoothScroll = (e: ReactMouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(href.indexOf('#') + 1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      // Manually update the URL hash. This helps with history and activeHash state.
      if (history.pushState) {
        history.pushState(null, '', `#${targetId}`);
      } else {
        window.location.hash = `#${targetId}`;
      }
      setActiveHash(`#${targetId}`); // Update state for immediate re-render of active link

      targetElement.scrollIntoView({
        behavior: 'smooth',
      });
    }

    if (mobileMenuOpen) {
      setMobileMenuOpen(false); // Close mobile menu after clicking a link
    }
  };

  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          href="/#home"
          className="text-2xl font-headline font-bold text-primary"
          onClick={(e) => handleSmoothScroll(e, '/#home')}
        >
          {APP_NAME}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {NAV_LINKS.map((link) => {
            const linkHash = link.href.substring(link.href.indexOf('#'));
            const isActive = pathname === '/' && activeHash === linkHash;
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
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
                  className="text-2xl font-headline font-bold text-primary mb-8 block"
                  onClick={(e) => handleSmoothScroll(e, '/#home')}
                >
                  {APP_NAME}
                </Link>
                <nav className="flex flex-col space-y-6">
                  {NAV_LINKS.map((link) => {
                    const linkHash = link.href.substring(link.href.indexOf('#'));
                    const isActive = pathname === '/' && activeHash === linkHash;
                    return (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={(e) => handleSmoothScroll(e, link.href)}
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
