import { MetadataRoute } from 'next';
import { getAllPosts } from '../lib/posts';
import { siteConfig } from '../lib/config';
import { fableCases } from '../lib/fable-cases';
import { gptImageCases } from '../lib/gpt-image-cases';
import { geminiCases } from '../lib/gemini-cases';
import { seedreamCases } from '../lib/seedream-cases';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  
  const postUrls = posts.map((post) => ({
    url: `${siteConfig.url}/posts/${post.slug}`,
    lastModified: new Date(post.meta.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const staticUrls = [
    {
      url: `${siteConfig.url}/gpt-6-cases`,
      lastModified: new Date('2026-09-11'),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/fable-5-2-cases`,
      lastModified: new Date('2026-11-10'),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/gpt-image-2-6-cases`,
      lastModified: new Date('2026-11-10'),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/seedream-5-5-cases`,
      lastModified: new Date('2026-11-10'),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/gemini-4-carbon-cases`,
      lastModified: new Date('2026-11-11'),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/scroll-world-landing-page-tutorial`,
      lastModified: new Date('2026-11-13'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${siteConfig.url}/posts`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/ai-money`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/loop-engineer`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/grok-bot-guide`,
      lastModified: new Date('2026-10-19'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/vibe-coding`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/resources`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];

  const fableCaseUrls = fableCases.map((item) => ({
    url: `${siteConfig.url}/fable-5-2-cases/${item.id}`,
    lastModified: new Date(item.published_at_utc),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const gptImageCaseUrls = gptImageCases.map((item) => ({
    url: `${siteConfig.url}/gpt-image-2-6-cases/${item.id}`,
    lastModified: new Date(item.published_at_utc),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const seedreamCaseUrls = seedreamCases.map((item) => ({
    url: `${siteConfig.url}/seedream-5-5-cases/${item.id}`,
    lastModified: new Date(item.published_at_utc),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const geminiCaseUrls = geminiCases.map((item) => ({
    url: `${siteConfig.url}/gemini-4-carbon-cases/${item.id}`,
    lastModified: new Date(item.published_at_utc),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticUrls, ...fableCaseUrls, ...gptImageCaseUrls, ...seedreamCaseUrls, ...geminiCaseUrls, ...postUrls];
} 
