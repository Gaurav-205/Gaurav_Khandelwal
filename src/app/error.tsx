'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <h1 className="text-4xl font-montserrat font-normal mb-4">Something went wrong</h1>
        <p className="text-white/70 font-montserrat font-light mb-8">
          We encountered an unexpected error. Please try again or return to the homepage.
        </p>
        <div className="space-x-4">
          <button
            onClick={reset}
            className="inline-block text-white font-montserrat font-normal text-sm tracking-wide border border-white/30 px-6 py-2 rounded-full hover:bg-white hover:text-black transition-all duration-300"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-block text-white font-montserrat font-normal text-sm tracking-wide border border-white/30 px-6 py-2 rounded-full hover:bg-white hover:text-black transition-all duration-300"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}