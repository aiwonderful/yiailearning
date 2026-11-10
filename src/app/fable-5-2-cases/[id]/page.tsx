import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ShengcaiInviteCard from '@/components/ShengcaiInviteCard';
import { siteConfig } from '@/lib/config';
import { fableCases, getFableCase } from '@/lib/fable-cases';
import CaseDetail from '../detail';
import styles from '../cases.module.css';

type PageParams = { id: string };

export function generateStaticParams() {
  return fableCases.map((item) => ({ id: item.id }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: PageParams }): Metadata {
  const item = getFableCase(params.id);
  if (!item) return { title: '未找到这个案例' };
  const title = `${item.title}：Claude Fable 5.2 案例`;
  const description = `${item.one_liner}（Claude Fable 5.2 案例，作者 ${item.author.name}）`;
  const url = `${siteConfig.url}/fable-5-2-cases/${item.id}`;
  const image = item.images[0];
  return {
    title,
    description,
    keywords: ['Claude Fable 5.2', 'Claude Fable 5.2 案例', item.category, item.author.name],
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

export default function FableCasePage({ params }: { params: PageParams }) {
  const item = getFableCase(params.id);
  if (!item) notFound();
  return (
    <div className={styles.page}>
      <CaseDetail item={item} />
      <ShengcaiInviteCard className="mt-14" />
    </div>
  );
}
