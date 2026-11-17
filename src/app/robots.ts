import { MetadataRoute } from 'next';
import { siteConfig } from '../lib/config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/', '/_next/', '/tools/', '/loop-engineering/index.html', '/demos/ui-ux-pro-max/'],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
} 
