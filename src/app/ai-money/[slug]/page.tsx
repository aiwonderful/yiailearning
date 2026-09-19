import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AiMoneyPageView from '@/components/AiMoneyPageView';
import ExperienceCardQR from '@/components/ExperienceCardQR';
import { getAiMoneyCaseBySlug, getAiMoneyTopicLabel, getPublishedAiMoneyCases } from '@/data/ai-money';

type CasePageProps = { params: { slug: string } };

export async function generateStaticParams() {
  return getPublishedAiMoneyCases().map((item) => ({ slug: item.slug }));
}

export function generateMetadata({ params }: CasePageProps): Metadata {
  const item = getAiMoneyCaseBySlug(params.slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.summary,
    alternates: { canonical: `/ai-money/${item.slug}` },
  };
}

export default function AiMoneyCasePage({ params }: CasePageProps) {
  const item = getAiMoneyCaseBySlug(params.slug);
  if (!item) notFound();

  return (
    <article className="mx-auto max-w-3xl">
      <AiMoneyPageView type="detail" caseId={item.slug} topic={item.topics.join(',')} />
      <Link href="/ai-money" className="inline-flex text-sm font-bold text-[#067C6A] hover:text-[#056B5C]">← 返回 AI变现榜单</Link>
      <div className="mt-7 rounded-[2rem] border border-[#B7DED6] bg-[#F8FCFA] p-7 shadow-soft md:p-10">
        <div className="flex flex-wrap gap-2">
          {item.topics.map((topic) => <span key={topic} className="rounded-full bg-[#EAF7F3] px-3 py-1 text-xs font-bold text-[#067C6A]">{getAiMoneyTopicLabel(topic)}</span>)}
        </div>
        <h1 className="mt-5 font-serif text-4xl font-black leading-tight text-[#20242A] md:text-5xl">{item.title}</h1>
        <p className="mt-3 text-sm font-bold text-[#067C6A]">作者 {item.author}</p>
        <div className="mt-7 rounded-2xl bg-[#163832] p-5 text-[#F8FCFA]">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#A9DDD1]">作者拿到的成绩</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {item.results.map((result) => <div key={`${result.value}-${result.label}`}><p className="text-3xl font-black">{result.value}</p><p className="mt-1 text-sm text-[#D6E9E4]">{result.label}</p></div>)}
          </div>
          {item.resultPeriod && <p className="mt-4 border-t border-white/15 pt-3 text-sm text-[#D6E9E4]">{item.resultPeriod}</p>}
        </div>
        <section className="mt-9">
          <h2 className="text-2xl font-black text-[#20242A]">这篇讲了什么</h2>
          <p className="mt-4 text-lg leading-8 text-[#59616B]">{item.summary}</p>
        </section>
        <section className="mt-9">
          <h2 className="text-2xl font-black text-[#20242A]">这篇帖子解决了什么问题</h2>
          <ol className="mt-4 space-y-3">
            {item.questions.map((question, index) => <li key={question} className="rounded-xl border border-[#DCE4DD] bg-white px-4 py-3 text-[#35424B]"><span className="mr-3 font-black text-[#067C6A]">{String(index + 1).padStart(2, '0')}</span>{question}</li>)}
          </ol>
        </section>
        {item.quotes.length > 0 && <section className="mt-9"><h2 className="text-2xl font-black text-[#20242A]">原作者原话</h2><div className="mt-4 space-y-3">{item.quotes.map((quote) => <blockquote key={quote} className="border-l-4 border-[#18B39A] bg-[#EAF7F3] px-5 py-4 leading-7 text-[#356158]">“{quote}”</blockquote>)}</div></section>}
        <div className="mt-10 rounded-2xl border border-[#B7DED6] bg-[#EAF7F3] p-6">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#067C6A]">Full Case in Shengcai</p>
          <h2 className="mt-2 text-xl font-black text-[#163832]">想看这篇完整复盘和 {item.questions.length} 个问题的答案？</h2>
          <p className="mt-2 leading-7 text-[#356158]">{item.ctaCopy} 扫码免费领 3 天体验卡，即可查看原帖全文。</p>
          <ExperienceCardQR className="mt-5" />
        </div>
      </div>
    </article>
  );
}
