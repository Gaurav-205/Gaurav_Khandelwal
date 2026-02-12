import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Handle CORS for static assets (SVG images for WebGL)
  if (request.nextUrl.pathname.startsWith('/projects/')) {
    const response = NextResponse.next();
    
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET');
    response.headers.set('Cross-Origin-Resource-Policy', 'cross-origin');
    response.headers.set('Cross-Origin-Embedder-Policy', 'unsafe-none');
    
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/projects/:path*',
};
