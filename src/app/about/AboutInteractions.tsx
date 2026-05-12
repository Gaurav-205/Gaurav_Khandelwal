'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { trackPageView } from '@/lib/analytics';

/**
 * Client island — owns only the behaviours that require the browser:
 *   • scroll-spy (updates the active sidebar label)
 *   • ESC key → navigate home
 *   • page-view analytics
 *   • scrollbar hiding
 *
 * Receives the active-section setter via a render-prop so the static
 * sidebar markup (in AboutContent) can reflect the current section.
 */
export default function AboutInteractions({
  onSectionChange,
}: {
  onSectionChange: (id: string) => void;
}) {
  const router = useRouter();

  useEffect(() => {
    trackPageView('/about');

    // Hide scrollbar
    document.documentElement.classList.add('hide-scrollbar');
    document.body.classList.add('hide-scrollbar');
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    document.documentElement.style.setProperty('scrollbar-width', 'none');
    document.documentElement.style.setProperty('-ms-overflow-style', 'none');
    document.body.style.setProperty('scrollbar-width', 'none');
    document.body.style.setProperty('-ms-overflow-style', 'none');

    const SECTIONS = ['informations', 'fields', 'socials', 'contact'];

    const handleScroll = () => {
      const mid = window.scrollY + window.innerHeight / 2;
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el && mid >= el.offsetTop && mid < el.offsetTop + el.offsetHeight) {
          onSectionChange(id);
          break;
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') router.push('/');
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyDown);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      document.documentElement.classList.remove('hide-scrollbar');
      document.body.classList.remove('hide-scrollbar');
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
      document.documentElement.style.removeProperty('scrollbar-width');
      document.documentElement.style.removeProperty('-ms-overflow-style');
      document.body.style.removeProperty('scrollbar-width');
      document.body.style.removeProperty('-ms-overflow-style');
    };
  }, [router, onSectionChange]);

  return null; // purely behavioural — renders nothing
}
