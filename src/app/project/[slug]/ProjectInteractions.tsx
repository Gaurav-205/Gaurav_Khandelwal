'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { trackPageView } from '@/lib/analytics';

interface ProjectInteractionsProps {
  slug: string;
}

/**
 * Client island — owns only browser-side side-effects for a project detail page:
 *   • page-view analytics
 *   • ESC key → navigate home
 *   • scrollbar hiding / restoring
 *
 * Renders nothing; all visible markup lives in ProjectClient.
 */
export default function ProjectInteractions({ slug }: ProjectInteractionsProps) {
  const router = useRouter();

  useEffect(() => {
    trackPageView(`/project/${slug}`);

    document.documentElement.classList.add('hide-scrollbar');
    document.body.classList.add('hide-scrollbar');
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') router.push('/');
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.documentElement.classList.remove('hide-scrollbar');
      document.body.classList.remove('hide-scrollbar');
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [router, slug]);

  return null;
}
