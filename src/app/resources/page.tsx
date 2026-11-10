import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import PageTitle from '../../components/PageTitle';
import { siteConfig } from '@/lib/config';

const title = '资料库';
const description = '围绕一个课题整理资料、链接、工具、案例和自己的判断。已经写完的内容可以先从文章库看。';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteConfig.url}/resources` },
  openGraph: {
    title: `${title} | ${siteConfig.title}`,
    description,
    url: `${siteConfig.url}/resources`,
  },
};

const resourceTypes = [
  {
    title: '课题资料包',
    description: '围绕一个主题收集背景资料、关键链接、工具、案例和术语解释。',
    examples: ['AI Agent 入门', 'Cursor 工作流', '个人网站发布'],
  },
  {
    title: '工具实践卡',
    description: '记录一个工具真实解决了什么问题、怎么用、适合谁、不适合谁。',
    examples: ['视频下载工具', '自动化脚本', 'AI 写作流程'],
  },
  {
    title: '项目复盘',
    description: '把一个小项目的需求、实现、卡点、结果和下一步整理成可复用经验。',
    examples: ['博客优化', 'Vibe Coding 作品', '飞书同步流程'],
  },
];

export default function ResourcesPage() {
  return (
    <div className="space-y-14">
      <section className="rounded-[1.75rem] border border-[#DCE4DD] bg-[#F8F7F2] p-7 shadow-soft md:p-10">
        <div className="max-w-3xl">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#4D6254]">
            Resource Library
          </div>
          <PageTitle className="text-[#20242A]">资料库</PageTitle>
          <p className="mt-5 text-lg leading-8 text-secondary">
            这里会承接我对某个课题产生兴趣后的第一批整理：资料、链接、工具、案例和自己的判断。它不要求一开始完美，但要求可以被继续更新。
          </p>
        </div>
      </section>

      <Link href="/seedream-5-5-cases" className="group block rounded-[1.75rem] border border-[#4b5546] bg-[#202920] p-7 text-[#f8f6ec] md:p-10">
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-[#d6b47b]"><span>新专题 · Seedream 5.5</span><span>64 个案例 / 8 个分类</span></div>
        <h2 className="mt-5 text-2xl font-semibold leading-relaxed md:text-3xl">先看效果图，再分清纯 5.5 和混用工作流。</h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[#d4d9cc]">多轮编辑、透明素材、人像、海报和模型对比。每条署名作者并链回原帖；混用案例按步骤写清 Seedream 5.5 和其他工具。</p>
        <span className="mt-6 inline-block border-b border-[#d6b47b] pb-1 text-base text-[#e9bf78]">打开 Seedream 5.5 案例合集 →</span>
      </Link>

      <Link href="/gpt-image-2-6-cases" className="group block rounded-[1.75rem] border border-[#4b5546] bg-[#202920] p-7 text-[#f8f6ec] md:p-10">
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-[#d6b47b]"><span>新专题 · GPT Image 2.6</span><span>64 个案例 / 9 个分类</span></div>
        <h2 className="mt-5 text-2xl font-semibold leading-relaxed md:text-3xl">先看效果图，再分清纯 2.6 和混用工作流。</h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[#d4d9cc]">GIF 动图、表情包、人像、海报和模型对比。每条署名作者并链回原帖；混用案例按步骤写清 GPT Image 2.6 和其他工具。</p>
        <span className="mt-6 inline-block border-b border-[#d6b47b] pb-1 text-base text-[#e9bf78]">打开 GPT Image 2.6 案例合集 →</span>
      </Link>

      <Link href="/fable-5-2-cases" className="group block rounded-[1.75rem] border border-[#4b5546] bg-[#202920] p-7 text-[#f8f6ec] md:p-10">
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-[#d6b47b]"><span>新专题 · Claude Fable 5.2</span><span>54 个案例 / 7 个分类</span></div>
        <h2 className="mt-5 text-2xl font-semibold leading-relaxed md:text-3xl">先看效果图，再打开那个案例。</h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[#d4d9cc]">官方科研、三维与 Blender、可玩原型、动态设计和落地页。每条署名作者并链回原帖，工具和公开提示词按原帖标注。</p>
        <span className="mt-6 inline-block border-b border-[#d6b47b] pb-1 text-base text-[#e9bf78]">打开 Claude Fable 5.2 案例合集 →</span>
      </Link>

      <Link href="/gpt-6-cases" className="group block rounded-[1.75rem] border border-[#4b5546] bg-[#202920] p-7 text-[#f8f6ec] md:p-10">
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-[#d6b47b]"><span>新专题 · GPT-6 Astra</span><span>20 个案例 / 10 条实践</span></div>
        <h2 className="mt-5 text-2xl font-semibold leading-relaxed md:text-3xl">从一次演示，到你的下一次实践。</h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[#d4d9cc]">从网页、3D 与视频，到音乐、办公和机器人。按场景阅读案例，展开输入与流程，查看原始来源，把值得借鉴的做法带走。</p>
        <span className="mt-6 inline-block border-b border-[#d6b47b] pb-1 text-base text-[#e9bf78]">阅读 GPT-6 案例集 →</span>
      </Link>

      <section className="grid gap-6 rounded-[1.75rem] border border-primary/20 bg-card-light p-7 shadow-soft dark:bg-card-dark md:grid-cols-[1fr_auto] md:items-center md:p-10">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Featured Guide</div>
          <h2 className="mt-3 font-serif text-3xl font-black text-text-main-light dark:text-text-main-dark">Grok Bot 学习手册</h2>
          <p className="mt-4 max-w-2xl leading-8 text-secondary dark:text-muted">
            从创建 Bot、写清任务开始，跟着真实案例练习内容协作与 AI 编程。17 个章节配有笔记、进度记录和情景测验。
          </p>
        </div>
        <Link href="/grok-bot-guide" className="btn btn-primary">开始学习 →</Link>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {resourceTypes.map((type, index) => (
          <article key={type.title} className="relative overflow-hidden rounded-xl border border-subtle/70 bg-card-light p-6 shadow-soft dark:border-white/10 dark:bg-card-dark">
            <span className="absolute right-4 top-2 font-serif text-6xl font-black text-primary/10">
              0{index + 1}
            </span>
            <div className="relative">
              <h2 className="text-xl font-bold text-primary">{type.title}</h2>
              <p className="mt-4 leading-7 text-secondary dark:text-muted">{type.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {type.examples.map((example) => (
                  <span key={example} className="rounded-full bg-[#7D8F81]/12 px-3 py-1 text-xs font-semibold text-[#4D6254] dark:bg-white/10 dark:text-[#D7E4DA]">
                    {example}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-[1.75rem] border border-subtle/70 bg-card-light p-7 shadow-soft dark:border-white/10 dark:bg-card-dark md:p-10">
        <h2 className="font-serif text-3xl font-black text-text-main-light dark:text-text-main-dark">这些资料我会持续补全</h2>
        <p className="mt-4 max-w-3xl leading-8 text-secondary dark:text-muted">
          我通常会先写清楚这个课题为什么值得看，补上关键链接，再写下自己的判断，而不是只搬运资料。
        </p>
      </section>

      <section className="rounded-[1.75rem] border border-subtle/70 bg-card-light p-7 shadow-soft dark:border-white/10 dark:bg-card-dark md:p-10">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <h2 className="font-serif text-3xl font-black text-text-main-light dark:text-text-main-dark">资料会慢慢整理成文章</h2>
            <p className="mt-4 max-w-3xl leading-8 text-secondary dark:text-muted">
              资料库里的专题、工具笔记和项目复盘，后面会写成博客。想先看已经写完的内容，可以从文章库开始。
            </p>
          </div>
          <Link href="/posts" className="btn btn-primary">
            查看文章库
          </Link>
        </div>
      </section>
    </div>
  );
}
