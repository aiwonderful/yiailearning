import type { Metadata } from 'next';
import AiMoneyPageView from '@/components/AiMoneyPageView';
import ShengcaiInviteCard from '@/components/ShengcaiInviteCard';
import AiMoneyCatalog from './AiMoneyCatalog';
import {
  aiMoneyTopicOptions,
  getPublishedAiMoneyCases,
  type AiMoneyTopic,
} from '@/data/ai-money';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'AI变现榜单',
  description: '收录从零起步、经历试错后跑出结果的 AI 变现实战复盘；完整过程可领取生财有术 3 天体验卡查看。',
  alternates: { canonical: `${siteConfig.url}/ai-money` },
  openGraph: { url: `${siteConfig.url}/ai-money` },
};

type AiMoneyPageProps = {
  searchParams?: { topic?: string };
};

export default function AiMoneyPage({ searchParams }: AiMoneyPageProps) {
  const cases = getPublishedAiMoneyCases();
  const selectedTopic = aiMoneyTopicOptions.some((item) => item.value === searchParams?.topic)
    ? (searchParams?.topic as AiMoneyTopic)
    : undefined;
  const activeTopics = new Set(cases.flatMap((item) => item.topics));
  const topicOptions = aiMoneyTopicOptions.filter((topic) => activeTopics.has(topic.value));

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <AiMoneyPageView type="list" topic={selectedTopic} />
      <section className="relative overflow-hidden rounded-[2rem] border border-[#B7DED6] bg-[#EAF7F3] px-6 py-6 md:px-10 md:py-8">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#18B39A]/15 blur-3xl" />
        <div className="absolute -bottom-24 left-1/4 h-52 w-52 rounded-full bg-[#F4A261]/15 blur-3xl" />
        <div className="relative text-center">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-bold tracking-widest text-[#067C6A]">小亦精选 · 生财实战案例</p>
            <h1 className="mt-3 font-serif text-4xl font-black leading-tight text-[#163832] md:text-5xl">
              AI变现榜单
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-[#356158]">
              用 AI 做什么能赚到钱？看看这些人怎么开始、卡在哪里、做出了什么成绩。
            </p>
            <a href="#experience-card" className="mt-4 inline-flex min-h-11 items-center rounded-full bg-[#067C6A] px-5 py-2 text-sm font-bold text-white hover:bg-[#056B5C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#067C6A]">免费领 3 天体验卡，阅读完整复盘 ↓</a>
          </div>
        </div>
      </section>

      <AiMoneyCatalog cases={cases} topicOptions={topicOptions} initialTopic={selectedTopic} />

      <ShengcaiInviteCard id="experience-card" />
    </div>
  );
}
