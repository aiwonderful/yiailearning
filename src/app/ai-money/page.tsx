import type { Metadata } from 'next';
import Link from 'next/link';
import AiMoneyPageView from '@/components/AiMoneyPageView';
import ExperienceCardCTA from '@/components/ExperienceCardCTA';
import {
  aiMoneyTopicOptions,
  getAiMoneyTopicLabel,
  getPublishedAiMoneyCases,
  type AiMoneyTopic,
} from '@/data/ai-money';

export const metadata: Metadata = {
  title: 'AI变现榜单',
  description: '收录真实 AI 变现案例的脱敏解读。想了解完整方法，可领取生财有术 3 天体验卡。',
  alternates: { canonical: '/ai-money' },
};

type AiMoneyPageProps = {
  searchParams?: { topic?: string };
};

export default function AiMoneyPage({ searchParams }: AiMoneyPageProps) {
  const cases = getPublishedAiMoneyCases();
  const selectedTopic = aiMoneyTopicOptions.some((item) => item.value === searchParams?.topic)
    ? (searchParams?.topic as AiMoneyTopic)
    : undefined;
  const visibleCases = selectedTopic ? cases.filter((item) => item.topics.includes(selectedTopic)) : cases;
  const activeTopics = new Set(cases.flatMap((item) => item.topics));

  return (
    <div className="mx-auto max-w-6xl space-y-12">
      <AiMoneyPageView type="list" topic={selectedTopic} />
      <section className="relative overflow-hidden rounded-[2rem] border border-[#B7DED6] bg-[#EAF7F3] px-6 py-10 shadow-soft md:px-10 md:py-14">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#18B39A]/15 blur-3xl" />
        <div className="absolute -bottom-24 left-1/4 h-52 w-52 rounded-full bg-[#F4A261]/15 blur-3xl" />
        <div className="relative max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#067C6A]">AI Money Cases</p>
          <h1 className="mt-4 font-serif text-4xl font-black leading-tight text-[#163832] md:text-6xl">
            AI变现榜单
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#356158]">
            收录真实 AI 变现案例的脱敏解读。先看结果、背景和关键问题；完整方法与原始案例，留在生财有术里继续研究。
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <ExperienceCardCTA placement="hero" />
            <span className="text-sm text-[#356158]">电脑扫码；手机长按保存二维码后，用微信扫一扫。</span>
          </div>
        </div>
      </section>

      <section className="flex flex-col justify-between gap-5 rounded-2xl border border-subtle/80 bg-card-light/85 p-5 shadow-soft dark:border-white/10 dark:bg-card-dark/85 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-bold text-[#163832] dark:text-white">按你关心的方向筛选</p>
          <p className="mt-1 text-sm text-secondary">只展示已经过人工审核、可公开阅读的案例解读。</p>
        </div>
        <div className="flex flex-wrap gap-2" aria-label="案例主题筛选">
          <Link
            href="/ai-money"
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${!selectedTopic ? 'bg-[#067C6A] text-white' : 'bg-[#EAF2EF] text-[#356158] hover:bg-[#D8ECE6]'}`}
          >
            全部
          </Link>
          {aiMoneyTopicOptions.filter((topic) => activeTopics.has(topic.value)).map((topic) => (
            <Link
              key={topic.value}
              href={`/ai-money?topic=${topic.value}`}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${selectedTopic === topic.value ? 'bg-[#067C6A] text-white' : 'bg-[#EAF2EF] text-[#356158] hover:bg-[#D8ECE6]'}`}
            >
              {topic.label}
            </Link>
          ))}
        </div>
      </section>

      {visibleCases.length ? (
        <section className="grid gap-5 md:grid-cols-2">
          {visibleCases.map((item) => (
            <article key={item.slug} className="flex flex-col rounded-[1.5rem] border border-[#DCE4DD] bg-[#FFFDF8] p-6 shadow-soft transition hover:-translate-y-1 hover:border-[#8BC8BC]">
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {item.topics.map((topic) => (
                    <span key={topic} className="rounded-full bg-[#EAF7F3] px-3 py-1 text-xs font-bold text-[#067C6A]">
                      {getAiMoneyTopicLabel(topic)}
                    </span>
                  ))}
                </div>
                <span className="shrink-0 text-sm font-black text-[#067C6A]">{item.resultLabel}</span>
              </div>
              <h2 className="mt-5 text-2xl font-black leading-tight text-[#20242A]">
                <Link href={`/ai-money/${item.slug}`} className="transition hover:text-[#067C6A]">{item.title}</Link>
              </h2>
              <p className="mt-2 text-sm font-semibold text-[#067C6A]">作者 {item.author}</p>
              <p className="mt-4 flex-1 leading-7 text-[#59616B]">{item.summary}</p>
              <Link href={`/ai-money/${item.slug}`} className="mt-6 inline-flex font-bold text-[#067C6A] hover:text-[#056B5C]">
                查看案例解读 <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </section>
      ) : (
        <section className="rounded-[1.75rem] border border-dashed border-[#B7DED6] bg-[#F8FCFA] px-6 py-12 text-center md:px-12">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#067C6A]">Editorial Review</p>
          <h2 className="mt-3 font-serif text-3xl font-black text-[#20242A]">首批案例正在审核整理</h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-[#59616B]">
            我们只会发布经过脱敏、事实复核并符合公开展示边界的案例解读。完整内容可先通过体验卡进入生财有术查看。
          </p>
          <ExperienceCardCTA placement="list" className="mt-7" />
        </section>
      )}

      <section className="rounded-[1.75rem] bg-[#163832] px-7 py-9 text-[#F8FCFA] md:px-10">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#A9DDD1]">Continue Learning</p>
        <div className="mt-3 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="font-serif text-3xl font-black">想看具体方法和完整案例？</h2>
            <p className="mt-3 max-w-2xl leading-7 text-[#D6E9E4]">领取体验卡后，在生财有术中继续查看原始内容与更多项目机会。</p>
          </div>
          <ExperienceCardCTA placement="footer" className="shrink-0 bg-[#F4C971] text-[#163832] shadow-none hover:bg-[#F7D98F]" />
        </div>
      </section>
    </div>
  );
}
