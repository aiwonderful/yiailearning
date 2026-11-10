import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ShengcaiInviteCard from '@/components/ShengcaiInviteCard';
import { siteConfig } from '@/lib/config';
import { gptImageCases, getGptImageCase } from '@/lib/gpt-image-cases';
import CaseDetail from '../detail';
import styles from '../cases.module.css';

type PageParams = { id: string };

export function generateStaticParams() {
  return gptImageCases.map((item) => ({ id: item.id }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: PageParams }): Metadata {
  const item = getGptImageCase(params.id);
  if (!item) return { title: '未找到这个案例' };
  const title = `${item.title}：GPT Image 2.6 案例`;
  const description = `${item.one_liner}（GPT Image 2.6 案例，${item.mixed ? '混用工作流' : '纯 GPT Image 2.6'}，作者 ${item.author.name}）`;
  const url = `${siteConfig.url}/gpt-image-2-6-cases/${item.id}`;
  const image = item.images[0];
  return {
    title,
    description,
    keywords: ['GPT Image 2.6', 'GPT Image 2.6 案例', item.category, item.author.name, item.mixed ? '混用工作流' : '纯 GPT Image 2.6'],
    authors: [{ name: item.author.name, url: item.author.url }],
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      publishedTime: item.published_at_utc,
      images: [{
        url: image.src,
        width: image.width,
        height: image.height,
        alt: `${item.title}，作者 ${item.author.name}`,
      }],
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default function GptImageCasePage({ params }: { params: PageParams }) {
  const item = getGptImageCase(params.id);
  if (!item) notFound();
  return (
    <div className={styles.page}>
      <CaseDetail item={item} />
      <ShengcaiInviteCard className="mt-14" />
    </div>
  );
}
