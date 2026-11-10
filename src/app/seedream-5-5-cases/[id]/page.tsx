import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ShengcaiInviteCard from '@/components/ShengcaiInviteCard';
import { siteConfig } from '@/lib/config';
import { seedreamCases, getSeedreamCase } from '@/lib/seedream-cases';
import CaseDetail from '../detail';
import styles from '../cases.module.css';

type PageParams = { id: string };

export function generateStaticParams() {
  return seedreamCases.map((item) => ({ id: item.id }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: PageParams }): Metadata {
  const item = getSeedreamCase(params.id);
  if (!item) return { title: '未找到这个案例' };
  const title = `${item.title}：Seedream 5.5 案例`;
  const description = `${item.one_liner}（Seedream 5.5 案例，${item.mixed ? '混用工作流' : '纯 Seedream 5.5'}，作者 ${item.author.name}）`;
  const url = `${siteConfig.url}/seedream-5-5-cases/${item.id}`;
  const image = item.images[0];
  return {
    title,
    description,
    keywords: ['Seedream 5.5', 'Seedream 5.5 案例', item.category, item.author.name, item.mixed ? '混用工作流' : '纯 Seedream 5.5'],
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

export default function SeedreamCasePage({ params }: { params: PageParams }) {
  const item = getSeedreamCase(params.id);
  if (!item) notFound();
  return (
    <div className={styles.page}>
      <CaseDetail item={item} />
      <ShengcaiInviteCard className="mt-14" />
    </div>
  );
}
