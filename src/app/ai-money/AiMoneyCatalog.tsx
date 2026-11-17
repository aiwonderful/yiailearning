'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import CaseAuthor from '@/components/CaseAuthor';
import ExperienceCardQR from '@/components/ExperienceCardQR';
import {
  formatAiMoneyDate,
  getAiMoneyTopicLabel,
  type AiMoneyCase,
  type AiMoneyTopic,
} from '@/data/ai-money';

type TopicOption = {
  value: AiMoneyTopic;
  label: string;
};

type AiMoneyCatalogProps = {
  cases: AiMoneyCase[];
  topicOptions: TopicOption[];
  initialTopic?: AiMoneyTopic;
};

export default function AiMoneyCatalog({ cases, topicOptions, initialTopic }: AiMoneyCatalogProps) {
  const [selectedTopic, setSelectedTopic] = useState<AiMoneyTopic | undefined>(initialTopic);

  useEffect(() => {
    setSelectedTopic(initialTopic);
  }, [initialTopic]);

  const visibleCases = selectedTopic ? cases.filter((item) => item.topics.includes(selectedTopic)) : cases;

  const selectTopic = (topic?: AiMoneyTopic) => {
    setSelectedTopic(topic);
    if (typeof window !== 'undefined' && window.location.search.includes('topic=')) {
      window.history.replaceState(null, '', '/ai-money');
    }
  };

  return (
    <>
      <section className="flex flex-col justify-between gap-5 rounded-2xl border border-subtle/80 bg-card-light/85 p-5 shadow-soft dark:border-white/10 dark:bg-card-dark/85 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-bold text-[#163832] dark:text-white">按你关心的方向筛选</p>
          <p className="mt-1 text-sm text-secondary">{visibleCases.length} 篇案例 · 按原帖发布时间从新到旧</p>
        </div>
        <div className="flex flex-wrap gap-2" aria-label="案例主题筛选">
          <button
            type="button"
            aria-pressed={!selectedTopic}
            onClick={() => selectTopic(undefined)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${!selectedTopic ? 'bg-[#067C6A] text-white' : 'bg-[#EAF2EF] text-[#356158] hover:bg-[#D8ECE6]'}`}
          >
            全部 {cases.length}
          </button>
          {topicOptions.map((topic) => (
            <button
              type="button"
              key={topic.value}
              aria-pressed={selectedTopic === topic.value}
              onClick={() => selectTopic(topic.value)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${selectedTopic === topic.value ? 'bg-[#067C6A] text-white' : 'bg-[#EAF2EF] text-[#356158] hover:bg-[#D8ECE6]'}`}
            >
              {topic.label} {cases.filter((item) => item.topics.includes(topic.value)).length}
            </button>
          ))}
        </div>
      </section>

      {visibleCases.length ? (
        <section aria-label="精选案例" className="overflow-hidden rounded-3xl border border-[#DCE4DD] bg-[#FFFDF8]">
          <div className="flex flex-wrap justify-between gap-2 border-b border-[#DCE4DD] px-5 py-4 text-sm text-[#53665C]"><span className="font-bold">精选案例 · {visibleCases.length} 篇</span><span>项目成绩 · 收益口径见各案例</span></div>
          {cases.map((item, index) => {
            const visibleIndex = visibleCases.findIndex((visible) => visible.slug === item.slug);
            const hidden = visibleIndex === -1;
            return (
              <article key={item.slug} hidden={hidden} className="border-b border-[#E5EBE7] last:border-0">
                <Link href={`/ai-money/${item.slug}`} className="group grid grid-cols-[2rem_minmax(0,1fr)] gap-x-3 gap-y-3 px-5 py-5 transition-colors hover:bg-[#F0F8F3] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#067C6A] md:grid-cols-[2.5rem_minmax(0,1fr)_9rem] md:gap-x-5 md:px-6">
                  <span className={`pt-1 font-mono text-xl font-bold tabular-nums ${!hidden && visibleIndex < 3 ? 'text-[#067C6A]' : 'text-[#6B7971]'}`}>{String((hidden ? index : visibleIndex) + 1).padStart(2, '0')}</span>
                  <div className="min-w-0">
                    <h2 className="text-lg font-bold leading-7 text-[#202F28] group-hover:text-[#067C6A]">{item.title}</h2>
                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-[#53665C]">
                      <CaseAuthor name={item.author} avatar={item.authorAvatar} />
                      <time dateTime={item.publishedAt} className="text-xs tabular-nums">原帖 {formatAiMoneyDate(item.publishedAt)}</time>
                      {item.topics.map((topic) => <span key={topic} className="rounded-md bg-[#EAF2EC] px-2 py-0.5 text-xs text-[#356158]">{getAiMoneyTopicLabel(topic)}</span>)}
                    </div>
                    <p className="mt-2 line-clamp-2 text-base leading-7 text-[#59675F]">{item.summary}</p>
                  </div>
                  <div className="col-start-2 flex items-center justify-between gap-3 border-t border-[#DCE8DF] pt-3 md:col-start-3 md:row-start-1 md:flex-col md:items-end md:justify-center md:border-l md:border-t-0 md:pl-4 md:pt-0 md:text-right">
                    <div><p className="text-2xl font-black tabular-nums text-[#067C6A]">{item.results[0]?.value ?? item.resultLabel}</p><p className="mt-1 text-xs leading-5 text-[#53665C]">{item.results[0]?.label ?? item.resultPeriod}</p></div>
                    <span className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#067C6A]">查看复盘 <span aria-hidden="true">→</span></span>
                  </div>
                </Link>
              </article>
            );
          })}
        </section>
      ) : (
        <section className="rounded-[1.75rem] border border-dashed border-[#B7DED6] bg-[#F8FCFA] px-6 py-12 text-center md:px-12">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#067C6A]">Editorial Review</p>
          <h2 className="mt-3 font-serif text-3xl font-black text-[#20242A]">首批案例正在审核整理</h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-[#59616B]">
            我们只会发布经过事实复核、适合公开阅读的案例。想看完整内容，可先领取体验卡进入生财有术查看。
          </p>
          <ExperienceCardQR className="mx-auto mt-7 text-left" />
        </section>
      )}
    </>
  );
}
