import fs from 'fs';
import path from 'path';
import { render, screen } from '@testing-library/react';

jest.mock('@/lib/posts', () => ({
  getAllPosts: jest.fn(async () => []),
}));

import RoadmapPage, { metadata } from '../page';
import robots from '@/app/robots';
import sitemap from '@/app/sitemap';
import {
  roadmapDescription,
  roadmapFaqSchema,
  roadmapFaqs,
  roadmapH1,
  roadmapTitle,
} from '@/data/roadmap';

const root = process.cwd();

describe('roadmap page', () => {
  it('uses the primary title and description, and the same FAQ source for visible text and schema', () => {
    expect(metadata.title).toEqual({ absolute: roadmapTitle });
    expect(metadata.description).toBe(roadmapDescription);

    const { container } = render(<RoadmapPage />);
    const html = container.innerHTML;

    expect(screen.getByRole('heading', { level: 1, name: roadmapH1 })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toHaveTextContent('首页');
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toHaveTextContent('学习路线图');
    expect(html).toContain('"@type":"FAQPage"');
    expect(html).toContain('"@type":"BreadcrumbList"');
    expect(html).not.toContain('HowTo');
    expect(html).not.toContain('八到十一');
    expect(html).not.toContain('一到两小时');
    expect(html).not.toContain('前10');
    expect(html).not.toContain('23 字');

    const schema = roadmapFaqSchema(roadmapFaqs);
    expect(schema.mainEntity).toHaveLength(9);
    schema.mainEntity.forEach((item, index) => {
      expect(item.name).toBe(roadmapFaqs[index].question);
      expect(item.acceptedAnswer.text).toBe(roadmapFaqs[index].answer);
      expect(screen.getByRole('heading', { name: item.name })).toBeInTheDocument();
      expect(screen.getByText(item.acceptedAnswer.text)).toBeInTheDocument();
      expect(html).toContain(item.acceptedAnswer.text);
    });

    expect(screen.getByText(/七到十一周/)).toBeInTheDocument();
    expect(screen.getByText(/按「每天一小时」的节奏/)).toBeInTheDocument();
    expect(screen.getAllByText('学什么')).toHaveLength(6);
    expect(screen.getAllByText('动手做什么')).toHaveLength(6);
    expect(screen.getAllByText('一句话目标：')).toHaveLength(6);
    expect(screen.getAllByText('怎么算学会：')).toHaveLength(6);
    expect(screen.getAllByText('常见卡点：')).toHaveLength(6);
    expect(screen.getByText(/每周记一次：收录了几个页面、有几个词有曝光。先看这两项/)).toBeInTheDocument();
    expect(screen.getByText(/自己按「内容类 \/ 工具类 \/ 服务类」各挑一个/)).toBeInTheDocument();
    expect(html).not.toContain('只看这三项');
    expect(html).not.toContain('榜单页没有');
    expect(html).not.toContain('缺失');
    expect(html).not.toContain('待补');
    expect(html).not.toContain('被截断');
    expect(html).not.toContain('noindex');
  });

  it('only links to pages that exist', () => {
    render(<RoadmapPage />);
    const hrefs = screen.getAllByRole('link').map((link) => link.getAttribute('href'));
    expect(hrefs).toEqual(expect.arrayContaining([
      '/',
      '/posts/ai-tools-for-beginners',
      '/resources',
      '/loop-engineer',
      '/scroll-world-landing-page-tutorial',
      '/ui-ux-pro-max-skill-tutorial',
      '/vibe-coding',
      '/posts/website-deployment-guide',
      '/gpt-6-cases',
      '/fable-5-2-cases',
      '/gpt-image-2-6-cases',
      '/seedream-5-5-cases',
      '/gemini-4-carbon-cases',
      '/ai-money',
      '/about',
    ]));

    expect(fs.existsSync(path.join(root, 'src/data/posts/ai-tools-for-beginners.md'))).toBe(true);
    expect(fs.existsSync(path.join(root, 'src/data/posts/website-deployment-guide.md'))).toBe(true);
    [
      'resources',
      'loop-engineer',
      'vibe-coding',
      'ai-money',
      'about',
      'scroll-world-landing-page-tutorial',
      'ui-ux-pro-max-skill-tutorial',
      'gpt-6-cases',
      'fable-5-2-cases',
      'gpt-image-2-6-cases',
      'seedream-5-5-cases',
      'gemini-4-carbon-cases',
    ].forEach((segment) => {
      expect(fs.existsSync(path.join(root, 'src/app', segment, 'page.tsx'))).toBe(true);
    });
  });

  it('adds /roadmap to the sitemap and allows it in robots', async () => {
    const rules = robots().rules;
    const disallow = Array.isArray(rules) ? rules.flatMap((rule) => rule.disallow ?? []) : rules?.disallow ?? [];
    const blocked = Array.isArray(disallow) ? disallow : [disallow];
    expect(blocked).not.toContain('/roadmap');

    const urls = (await sitemap()).map((entry) => entry.url);
    expect(urls).toContain('http://localhost:3000/roadmap');
  });
});
