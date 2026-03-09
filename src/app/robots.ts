import { MetadataRoute } from 'next'
import { ENV } from '@/lib/env'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = ENV.BASE_URL
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}