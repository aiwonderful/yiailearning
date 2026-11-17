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
    expect(screen.getByText(/自己按「内容类 \/ 工具类 \/ 服务类」各挑一个/)).toBeInTheDocument();
    expect(screen.getByText(/榜单页没有按这三类分栏/)).toBeInTheDocument();
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
      '/ai-money',
      '/about',
    ]));

    expect(fs.existsSync(path.join(root, 'src/data/posts/ai-tools-for-beginners.md'))).toBe(true);
    ['resources', 'loop-engineer', 'ai-money', 'about'].forEach((segment) => {
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
