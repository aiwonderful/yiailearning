import type { Metadata } from 'next';
import Breadcrumb from '@/components/Breadcrumb';
import { siteConfig } from '@/lib/config';
import GuideClient from './GuideClient';
import ShengcaiInviteCard from '@/components/ShengcaiInviteCard';

const title = 'Grok Bot 怎么用：创建、配置与写指令';
const description = '按手册里已有的章节练习：先创建并接通 Bot，再把岗位写进配置，把任务写成可检查的指令，然后看技能、定时和原文案例。';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteConfig.url}/grok-bot-guide` },
  openGraph: { title, description, url: `${siteConfig.url}/grok-bot-guide` },
};

export default function GrokBotGuidePage() {
  return (
    <div className="mx-auto max-w-7xl">
      <Breadcrumb items={[
        { name: '资料库', href: '/resources' },
        { name: 'Grok Bot 学习手册', href: '/grok-bot-guide', current: true },
      ]} />
      <nav aria-label="按三件事阅读" className="mb-8 grid gap-3 md:grid-cols-3">
        <a href="#first-task" className="rounded-2xl border border-subtle/80 bg-card-light p-4 dark:border-white/10 dark:bg-card-dark">
          <span className="block font-semibold text-primary">怎么用</span>
          <span className="mt-2 block text-sm leading-6 text-secondary">从「先把环境接通」开始：创建 Bot，并确认它读到了你给的资料。</span>
        </a>
        <a href="#bot-basics" className="rounded-2xl border border-subtle/80 bg-card-light p-4 dark:border-white/10 dark:bg-card-dark">
          <span className="block font-semibold text-primary">怎么配置</span>
          <span className="mt-2 block text-sm leading-6 text-secondary">「建好一位 Bot」写岗位；技能、记忆和定时在后面的「基础 5」。</span>
        </a>
        <a href="#prompt-basics" className="rounded-2xl border border-subtle/80 bg-card-light p-4 dark:border-white/10 dark:bg-card-dark">
          <span className="block font-semibold text-primary">怎么写指令</span>
          <span className="mt-2 block text-sm leading-6 text-secondary">「怎样写任务」把目标、输入、交付和停止条件写进一次请求。</span>
        </a>
      </nav>
      <GuideClient />
      <ShengcaiInviteCard className="mt-10" />
    </div>
  );
}
