import type { Metadata } from 'next';
import Breadcrumb from '@/components/Breadcrumb';
import { siteConfig } from '@/lib/config';
import GuideClient from './GuideClient';

export const metadata: Metadata = {
  title: 'Grok Bot 学习手册：从收藏到真实交付',
  description: '跟着真实工作流学习 Grok Bot：创建 Bot、写任务、协作、技能与定时任务，并通过案例、练习和测验完成一次交付。',
  alternates: { canonical: `${siteConfig.url}/grok-bot-guide` },
};

export default function GrokBotGuidePage() {
  return (
    <div className="mx-auto max-w-7xl">
      <Breadcrumb items={[
        { name: '资料库', href: '/resources' },
        { name: 'Grok Bot 学习手册', href: '/grok-bot-guide', current: true },
      ]} />
      <GuideClient />
    </div>
  );
}
