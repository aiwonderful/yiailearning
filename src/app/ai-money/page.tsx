import type { Metadata } from 'next';
import Link from 'next/link';
import AiMoneyPageView from '@/components/AiMoneyPageView';
import ShengcaiInviteCard from '@/components/ShengcaiInviteCard';
import AiMoneyCatalog from './AiMoneyCatalog';
import {
  aiMoneyTopicOptions,
  getPublishedAiMoneyCases,
  type AiMoneyTopic,
} from '@/data/ai-money';
import { siteConfig } from '@/lib/config';

const title = 'AI变现榜单：AI 副业案例';
const description = '按内容与流量、工具与服务、知识产品、自动化和出海整理 AI 变现复盘。同一篇可以有多个标签，篇数按不重复案例计。';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteConfig.url}/ai-money` },
  openGraph: { title, description, url: `${siteConfig.url}/ai-money` },
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
              AI变现榜单：AI 副业怎么做出结果
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-[#356158]">
              这些是已经发布的 AI 变现和 AI 副业复盘：作者怎么开始、卡在哪里、做出了什么成绩。下面先按站内现有的六个标签查看，再看完整名单。
            </p>
            <a href="#experience-card" className="mt-4 inline-flex min-h-11 items-center rounded-full bg-[#067C6A] px-5 py-2 text-sm font-bold text-white hover:bg-[#056B5C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#067C6A]">免费领 3 天体验卡，阅读完整复盘 ↓</a>
          </div>
        </div>
      </section>

      <section aria-labelledby="ai-money-topics" className="rounded-3xl border border-[#DCE4DD] bg-[#FFFDF8] p-5 md:p-7">
        <h2 id="ai-money-topics" className="font-serif text-2xl font-black text-[#20242A]">按现有标签查看</h2>
        <p className="mt-3 max-w-3xl leading-7 text-[#53665C]">
          目前是 {cases.length} 篇不重复案例。一篇可以同时带多个标签，所以各组数字加起来会大于 {cases.length}。这里不另做内容、工具、服务三组，避免把多标签再数成新的案例。
        </p>
        <nav aria-label="案例标签" className="mt-4 flex flex-wrap gap-2">
          {topicOptions.map((topic) => (
            <a key={topic.value} href={`#topic-${topic.value}`} className="rounded-full bg-[#EAF2EF] px-4 py-2 text-sm font-semibold text-[#356158]">
              {topic.label}
            </a>
          ))}
        </nav>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {topicOptions.map((topic) => {
            const grouped = cases.filter((item) => item.topics.includes(topic.value));
            return (
              <section key={topic.value} id={`topic-${topic.value}`} className="scroll-mt-28">
                <h3 className="text-lg font-bold text-[#163832]">{topic.label}</h3>
                <p className="mt-1 text-sm text-[#53665C]">{grouped.length} 篇带有这个标签</p>
                <ul className="mt-3 space-y-2">
                  {grouped.map((item) => (
                    <li key={item.slug}>
                      <Link href={`/ai-money/${item.slug}`} className="text-sm font-semibold leading-6 text-[#067C6A] hover:underline">
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </section>

      <AiMoneyCatalog cases={cases} topicOptions={topicOptions} initialTopic={selectedTopic} />

      <ShengcaiInviteCard id="experience-card" />
    </div>
  );
}
