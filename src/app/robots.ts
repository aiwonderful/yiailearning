import { MetadataRoute } from 'next';
import { siteConfig } from '../lib/config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/', '/_next/'],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
} 