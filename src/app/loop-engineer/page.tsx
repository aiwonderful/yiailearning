import type { Metadata } from 'next';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';
import { rehype } from 'rehype';
import rehypeSlug from 'rehype-slug';
import rehypePrism from 'rehype-prism-plus';
import Breadcrumb from '@/components/Breadcrumb';
import WeChatSubscribeCard from '@/components/WeChatSubscribeCard';
import { siteConfig } from '@/lib/config';

type Heading = {
  id: string;
  text: string;
  level: number;
};

const templateLinks = [
  {
    href: '/loop-engineering/templates/LOOP.md',
    title: 'LOOP.md',
    description: '定义循环目标、触发方式、权限边界、验证证据和停止条件。',
  },
  {
    href: '/loop-engineering/templates/STATE.md',
    title: 'STATE.md',
    description: '记录跨轮次事实，让下一轮 Agent 能从稳定状态继续。',
  },
  {
    href: '/loop-engineering/templates/EVALS.md',
    title: 'EVALS.md',
    description: '把“做得更好”变成可比较、可复盘的评估样本。',
  },
  {
    href: '/loop-engineering/templates/RUN_LOG.md',
    title: 'RUN_LOG.md',
    description: '保存每次运行的输入、动作、验证结果、成本和下一步。',
  },
];

export const metadata: Metadata = {
  title: 'Loop Engineering 学习与实践指南',
  description: '从 Prompt 到 Loop Engineering：学习如何设计、运行和治理 Agent 循环。',
  alternates: {
    canonical: `${siteConfig.url}/loop-engineer`,
  },
};

function normalizeMarkdown(markdown: string) {
  return markdown
    .replace(/^# Loop Engineering 学习与实践指南\s*/, '')
    .replace(/## 目录[\s\S]*?\n---\n+/, '');
}

function extractTableOfContents(content: string): Heading[] {
  const headingRegex = /<h([2-3]) id="([^"]+)">(.+?)<\/h[2-3]>/g;
  const headings: Heading[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    headings.push({
      level: Number(match[1]),
      id: match[2],
      text: match[3].replace(/<[^>]+>/g, ''),
    });
  }

  return headings;
}

async function getLoopEngineeringContent() {
  const sourcePath = path.join(process.cwd(), 'src/data/loop-engineering.md');
  const markdown = normalizeMarkdown(fs.readFileSync(sourcePath, 'utf8'));

  const processedContent = await remark()
    .use(html)
    .process(markdown);

  const finalContent = await rehype()
    .use(rehypeSlug)
    .use(rehypePrism, { showLineNumbers: true })
    .process(processedContent.toString());

  return finalContent
    .toString()
    .replace(/^<html><head><\/head><body>/, '')
    .replace(/<\/body><\/html>$/, '')
    .replaceAll('href="templates/', 'href="/loop-engineering/templates/');
}

export default async function LoopEngineerPage() {
  const content = await getLoopEngineeringContent();
  const toc = extractTableOfContents(content);

  return (
    <div className="max-w-6xl mx-auto">
      <Breadcrumb
        items={[
          { name: '资料库', href: '/resources' },
          { name: 'Loop Engineering', href: '/loop-engineer', current: true },
        ]}
      />

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="lg:w-[min(100%,780px)] lg:flex-1">
          <article className="card overflow-hidden">
            <header className="border-b border-subtle/80 bg-[linear-gradient(135deg,rgba(184,149,94,0.10),rgba(125,143,129,0.08),rgba(194,106,74,0.06))] px-5 py-8 dark:border-white/10 md:px-8 md:py-10">
              <div className="mb-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
                学习资料
              </div>
              <div className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-subtle dark:text-muted">
                Agent Loop / Coding Workflow
              </div>
              <h1 className="mb-5 font-serif text-3xl font-black leading-tight text-primary md:text-5xl">
                Loop Engineering 学习与实践指南
              </h1>
              <p className="max-w-3xl text-base leading-8 text-secondary md:text-lg">
                从一次 Prompt 的优化，进阶到可设计、可运行、可验证、可治理的 Agent 循环。这个页面会作为小亦资料库里的长期学习入口。
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#先说结论" className="btn btn-primary">
                  开始阅读
                </a>
                <a href="#30-天学习路线" className="btn btn-secondary">
                  30 天路线
                </a>
              </div>
            </header>

            <div
              className="article-prose px-5 py-8 md:px-8 md:py-10 [&_table]:block [&_table]:overflow-x-auto"
              dangerouslySetInnerHTML={{ __html: content }}
            />

            <section className="mx-5 border-t border-subtle py-8 md:mx-8">
              <div className="mb-5">
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-subtle">
                  Practice Templates
                </div>
                <h2 className="mt-2 text-2xl font-bold text-primary">实践模板</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {templateLinks.map((template) => (
                  <a
                    key={template.href}
                    href={template.href}
                    className="rounded-xl border border-subtle/80 bg-card-light/70 p-5 transition-colors hover:border-primary/30 hover:bg-primary/5 dark:border-white/10 dark:bg-card-dark/70"
                  >
                    <div className="font-mono text-sm font-bold text-primary">{template.title}</div>
                    <p className="mt-3 text-sm leading-6 text-secondary">{template.description}</p>
                  </a>
                ))}
              </div>
            </section>

            <div className="mx-5 border-t border-subtle py-6 md:mx-8">
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/resources" className="btn btn-secondary">
                  返回资料库
                </Link>
                <Link href="/posts" className="btn btn-ghost">
                  查看博客
                </Link>
              </div>
            </div>
          </article>
        </div>

        <aside className="lg:w-72">
          <div className="sticky top-24 space-y-6">
            {toc.length > 0 && (
              <div className="card p-6">
                <h2 className="mb-4 text-lg font-semibold text-primary">目录</h2>
                <nav>
                  <ul className="space-y-2">
                    {toc.map((heading) => (
                      <li key={heading.id} className={heading.level === 3 ? 'ml-4' : ''}>
                        <a
                          href={`#${heading.id}`}
                          className="block rounded-xl border border-transparent px-3 py-2 text-sm leading-6 text-secondary transition-colors duration-200 hover:border-primary/20 hover:bg-primary/5 hover:text-primary dark:hover:border-primary/25"
                        >
                          {heading.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            )}

            <div className="card p-6">
              <h2 className="mb-3 text-lg font-semibold text-primary">适合怎么用</h2>
              <p className="text-sm leading-7 text-secondary">
                先按目录建立概念，再用模板做一个低风险 report-only loop，最后把实践复盘写成资料库或博客内容。
              </p>
            </div>

            <WeChatSubscribeCard compact />
          </div>
        </aside>
      </div>
    </div>
  );
}
