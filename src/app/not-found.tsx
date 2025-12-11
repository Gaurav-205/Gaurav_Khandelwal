import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <h1 className="text-6xl font-montserrat font-normal mb-4">404</h1>
        <h2 className="text-2xl font-montserrat font-normal mb-4">Page Not Found</h2>
        <p className="text-white/70 font-montserrat font-light mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block text-white font-montserrat font-normal text-sm tracking-wide border border-white/30 px-6 py-2 rounded-full hover:bg-white hover:text-black transition-all duration-300"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}