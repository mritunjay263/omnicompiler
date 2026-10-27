import { MetadataRoute } from 'next';
import { BRAND } from '@/lib/brand';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || BRAND.url;

  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/api/og'],
      disallow: ['/api/run', '/api/auth/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
