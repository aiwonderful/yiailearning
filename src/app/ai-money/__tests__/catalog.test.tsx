import fs from 'fs';
import path from 'path';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AiMoneyPage from '../page';
import AiMoneyCatalog from '../AiMoneyCatalog';
import type { AiMoneyCase } from '@/data/ai-money';

const cases: AiMoneyCase[] = [
  {
    slug: 'content-case',
    status: 'published',
    title: '内容案例',
    author: '甲',
    topics: ['content'],
    rank: 1,
    publishedAt: '2026-08-01T00:00:00.000Z',
    resultLabel: '1',
    results: [{ value: '1', label: '结果' }],
    summary: '内容摘要',
    ctaCopy: '',
    questions: [],
    quotes: [],
  },
  {
    slug: 'service-case',
    status: 'published',
    title: '服务案例',
    author: '乙',
    topics: ['service'],
    rank: 2,
    publishedAt: '2026-08-02T00:00:00.000Z',
    resultLabel: '2',
    results: [{ value: '2', label: '结果' }],
    summary: '服务摘要',
    ctaCopy: '',
    questions: [],
    quotes: [],
  },
];

describe('/ai-money filters', () => {
  it('does not render crawlable topic query links', async () => {
    const pageSource = fs.readFileSync(path.join(process.cwd(), 'src/app/ai-money/page.tsx'), 'utf8');
    const catalogSource = fs.readFileSync(path.join(process.cwd(), 'src/app/ai-money/AiMoneyCatalog.tsx'), 'utf8');
    expect(pageSource).not.toContain('?topic=');
    expect(catalogSource).not.toContain('?topic=');
    expect(pageSource).toContain("canonical: `${siteConfig.url}/ai-money`");

    const user = userEvent.setup();
    render(
      <AiMoneyCatalog
        cases={cases}
        initialTopic="content"
        topicOptions={[
          { value: 'content', label: 'AI内容与流量' },
          { value: 'service', label: 'AI工具与服务' },
        ]}
      />,
    );

    const html = document.body.innerHTML;
    expect(html).toContain('/ai-money/content-case');
    expect(html).toContain('/ai-money/service-case');
    expect(html).not.toContain('topic=');
    expect(screen.getByRole('link', { name: /内容案例/ })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /服务案例/ })).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /AI工具与服务/ }));
    expect(screen.getByRole('link', { name: /服务案例/ })).toBeInTheDocument();
    expect(document.body.innerHTML).not.toContain('topic=');
  });

  it('still accepts an old topic query on the server page', () => {
    render(<AiMoneyPage searchParams={{ topic: 'automation' }} />);
    const hrefs = screen.getAllByRole('link', { hidden: true }).map((link) => link.getAttribute('href') || '');
    expect(hrefs.some((href) => href.includes('topic='))).toBe(false);
    expect(hrefs.some((href) => href.startsWith('/ai-money/'))).toBe(true);
    expect(screen.getByRole('button', { name: /AI自动化/ })).toHaveAttribute('aria-pressed', 'true');
  });
});
