import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import PageTitle from '@/components/PageTitle';
import { siteConfig } from '@/lib/config';
import {
  roadmapClosing,
  roadmapDescription,
  roadmapFaqSchema,
  roadmapFaqs,
  roadmapH1,
  roadmapInlineText,
  roadmapIntro,
  roadmapStages,
  roadmapTitle,
  type RoadmapInline,
} from '@/data/roadmap';

export const metadata: Metadata = {
  title: { absolute: roadmapTitle },
  description: roadmapDescription,
  robots: { index: true, follow: true },
  alternates: { canonical: `${siteConfig.url}/roadmap` },
  openGraph: {
    title: roadmapTitle,
    description: roadmapDescription,
    url: `${siteConfig.url}/roadmap`,
    type: 'article',
  },
};

function InlineText({ nodes }: { nodes: readonly RoadmapInline[] }) {
  return nodes.map((node, index) => {
    if (node.kind === 'link') {
      return (
        <Link key={`${node.href}-${index}`} href={node.href} className="font-semibold text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary">
          {node.text}
        </Link>
      );
    }
    if (node.kind === 'strong') {
      return <strong key={`${node.text}-${index}`} className="font-semibold text-primary">{node.text}</strong>;
    }
    return <span key={`${node.text.slice(0, 12)}-${index}`}>{node.text}</span>;
  });
}

export default function RoadmapPage() {
  const faqSchema = roadmapFaqSchema(roadmapFaqs);

  return (
    <div className="mx-auto max-w-4xl">
      <Breadcrumb
        items={[
          { name: '首页', href: '/' },
          { name: '学习路线图', href: '/roadmap', current: true },
        ]}
      />

      <article className="card overflow-hidden">
        <header className="border-b border-subtle/80 bg-[linear-gradient(135deg,rgba(184,149,94,0.10),rgba(125,143,129,0.08),rgba(194,106,74,0.06))] px-5 py-8 dark:border-white/10 md:px-8 md:py-10">
          <div className="mb-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
            学习路线
          </div>
          <PageTitle className="!mb-5 max-w-4xl text-3xl leading-tight md:text-4xl">{roadmapH1}</PageTitle>
          <div className="max-w-3xl space-y-4 text-base leading-8 text-secondary md:text-lg">
            {roadmapIntro.map((paragraph) => (
              <p key={roadmapInlineText(paragraph)}>{<InlineText nodes={paragraph} />}</p>
            ))}
          </div>
        </header>

        <div className="space-y-12 px-5 py-8 md:px-8 md:py-10">
          <section aria-labelledby="roadmap-overview">
            <h2 id="roadmap-overview" className="text-2xl font-bold text-primary">六个阶段一览</h2>
            <ol className="mt-5 space-y-3">
              {roadmapStages.map((stage, index) => (
                <li key={stage.id} className="flex gap-3 text-base leading-7 text-secondary">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">{index + 1}</span>
                  <a href={`#${stage.id}`} className="hover:text-primary">{stage.summary}</a>
                </li>
              ))}
            </ol>
          </section>

          {roadmapStages.map((stage) => (
            <section key={stage.id} id={stage.id} aria-labelledby={`${stage.id}-title`} className="scroll-mt-28">
              <h2 id={`${stage.id}-title`} className="text-2xl font-bold text-primary">{stage.heading}</h2>
              <p className="mt-4 leading-8 text-secondary">
                <strong className="font-semibold text-primary">一句话目标：</strong>
                {stage.goal}
              </p>
              {stage.blocks.map((block) => (
                <div key={block.heading} className="mt-6">
                  <h3 className="text-lg font-semibold text-primary">{block.heading}</h3>
                  <ul className="mt-3 list-disc space-y-2 pl-5 leading-8 text-secondary">
                    {block.bullets.map((bullet) => (
                      <li key={roadmapInlineText(bullet)}>{<InlineText nodes={bullet} />}</li>
                    ))}
                  </ul>
                </div>
              ))}
              {stage.learned ? (
                <p className="mt-6 leading-8 text-secondary">
                  <strong className="font-semibold text-primary">怎么算学会：</strong>
                  {stage.learned}
                </p>
              ) : null}
              {stage.stuck ? (
                <p className="mt-3 leading-8 text-secondary">
                  <strong className="font-semibold text-primary">常见卡点：</strong>
                  <InlineText nodes={stage.stuck} />
                </p>
              ) : null}
            </section>
          ))}

          <section aria-labelledby="roadmap-faq">
            <h2 id="roadmap-faq" className="text-2xl font-bold text-primary">常见问题</h2>
            <div className="mt-5 space-y-6">
              {roadmapFaqs.map((faq) => (
                <article key={faq.question}>
                  <h3 className="text-lg font-semibold text-primary">{faq.question}</h3>
                  <p className="mt-2 leading-8 text-secondary">{faq.answer}</p>
                </article>
              ))}
            </div>
          </section>

          <p className="border-t border-subtle pt-6 leading-8 text-secondary dark:border-white/10">
            <InlineText nodes={roadmapClosing} />
          </p>
        </div>
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </div>
  );
}
