import fs from 'fs';
import path from 'path';
import { render, screen } from '@testing-library/react';

jest.mock('@/lib/posts', () => {
  const fs = require('fs');
  const path = require('path');
  const matter = require('gray-matter');

  return {
    getAllPosts: async () => {
      const directory = path.join(process.cwd(), 'src/data/posts');
      return fs
        .readdirSync(directory)
        .filter((file: string) => file.endsWith('.md'))
        .map((file: string) => {
          const parsed = matter(fs.readFileSync(path.join(directory, file), 'utf8'));
          return {
            slug: file.replace(/\.md$/, ''),
            meta: parsed.data,
          };
        })
        .filter((post: { meta: { draft?: boolean; published?: boolean } }) => post.meta.draft !== true && post.meta.published !== false);
    },
  };
});

import BlogIndexPage from '../page';
import SearchablePosts from '../SearchablePosts';

describe('/posts index', () => {
  it('renders every published article link without the client loading shell', async () => {
    const source = fs.readFileSync(path.join(process.cwd(), 'src/app/posts/page.tsx'), 'utf8');
    const clientSource = fs.readFileSync(path.join(process.cwd(), 'src/app/posts/SearchablePosts.tsx'), 'utf8');
    expect(source).not.toContain('加载中');
    expect(source).not.toContain('useSearchParams');
    expect(clientSource).not.toContain('useSearchParams');

    const page = await BlogIndexPage({});
    render(page);

    const html = document.body.innerHTML;
    expect(html).toMatch(/<a[^>]+href="\/posts\/ai-tools-for-beginners"/);
    expect(html).not.toMatch(/>加载中\.\.\.</);

    const hrefs = screen.getAllByRole('link').map((link) => link.getAttribute('href'));
    const articleLinks = hrefs.filter((href) => href?.startsWith('/posts/'));
    expect(new Set(articleLinks)).toEqual(new Set([
      '/posts/getting-started-with-ai',
      '/posts/website-deployment-guide',
      '/posts/ai-tools-for-beginners',
      '/posts/codex-sites-personal-time-management-tool',
      '/posts/shengcai-november-voyage-selection-2026',
      '/posts/shengcai-november-voyage-2026',
      '/posts/shortcut-review',
      '/posts/openclaw-agent-memory',
    ]));
    expect(hrefs).toContain('/roadmap');
  });

  it('filters with component state and still keeps article links in the document', () => {
    render(
      <SearchablePosts
        initialTag="部署"
        initialPosts={[
          { slug: 'website-deployment-guide', meta: { title: '部署指南', date: '2026-01-01', tags: ['部署'], excerpt: '上线' } },
          { slug: 'ai-tools-for-beginners', meta: { title: '工具清单', date: '2026-01-02', tags: ['工具'], excerpt: '入门' } },
        ]}
      />,
    );

    expect(screen.getByRole('link', { name: '部署指南' })).toHaveAttribute('href', '/posts/website-deployment-guide');
    expect(screen.queryByRole('link', { name: '工具清单' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: '部署' })).toBeInTheDocument();
  });
});
