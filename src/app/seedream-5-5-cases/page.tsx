import type { Metadata } from 'next';
import Link from 'next/link';
import ShengcaiInviteCard from '@/components/ShengcaiInviteCard';
import { siteConfig } from '@/lib/config';
import {
  seedreamCases,
  seedreamCollection,
  seedreamImageCount,
  getSeedreamCategoryCounts,
  getSeedreamGalleryCards,
} from '@/lib/seedream-cases';
import Gallery from './gallery';
import styles from './cases.module.css';

const title = 'Seedream 5.5 案例合集：64 个带效果图的编辑、透明素材与混用工作流';
const description = '按分类浏览 64 个 Seedream 5.5 案例的效果图：官方发布、多轮编辑、透明素材、人像摄影、海报排版、电商物料和模型对比，以及混用其他工具的工作流。每条署名作者并链回原帖，区分纯 Seedream 5.5 和混用工作流。';
const pageUrl = `${siteConfig.url}/seedream-5-5-cases`;

export const metadata: Metadata = {
  title,
  description,
  keywords: ['Seedream 5.5', '即梦 Seedream 5.5', 'Doubao-Seedream-5.5', 'Seedream 5.5 案例', 'AI 绘图案例', '混用工作流'],
  alternates: { canonical: pageUrl },
  openGraph: {
    title,
    description,
    url: pageUrl,
    type: 'website',
    images: [{
      url: seedreamCases[0].images[0].src,
      width: seedreamCases[0].images[0].width,
      height: seedreamCases[0].images[0].height,
      alt: `${seedreamCases[0].title}，作者 ${seedreamCases[0].author.name}`,
    }],
  },
  twitter: { card: 'summary_large_image', title, description },
};

export default function SeedreamCasesPage() {
  return (
    <div className={styles.page}>
      <div className={styles.breadcrumb}>
        <Link href="/resources">资料库</Link>
        <span aria-hidden="true">/</span>
        <span>Seedream 5.5 案例</span>
      </div>
      <p className={styles.copyrightBanner}>图片和演示归原作者所有；官方演示归官方发布。本页仅作截图预览与整理。</p>
      <header className={styles.hero}>
        <div className={styles.edition}>
          <span>小亦的 AI 学习实验室</span>
          <span>CASEBOOK / 04</span>
        </div>
        <div className={styles.heroGrid}>
          <div>
            <p className={styles.eyebrow}>SEEDREAM 5.5 · 案例合集</p>
            <h1>Seedream 5.5<br /><span>案例合集</span></h1>
            <p className={styles.intro}>
              {seedreamCases.length} 个带效果图的案例。先从缩略图认出成品，再按分类打开：中文说明、做法、用到的工具，以及作者愿意公开的提示词。卡片上的标签区分纯 Seedream 5.5 和混用工作流。
            </p>
            <nav className={styles.heroLinks} aria-label="本页目录">
              <a href="#cases">看效果图 <span aria-hidden="true">↓</span></a>
              <a href={seedreamCollection.official_blog} target="_blank" rel="noopener noreferrer">官方博客 ↗</a>
            </nav>
          </div>
          <div className={styles.issue} aria-label={`${seedreamCases.length} 个案例，${seedreamCollection.categories.length} 个分类，${seedreamImageCount} 张效果图`}>
            <span className={styles.issueLabel}>SEEDREAM 5.5 / SCREENSHOTS</span>
            <div className={styles.issueNumber}>{seedreamCases.length}<span>个案例</span></div>
            <div className={styles.issueBottom}>
              <span><strong>{seedreamCollection.pure_count}</strong> 纯 5.5</span>
              <span><strong>{seedreamCollection.mixed_count}</strong> 混用</span>
            </div>
          </div>
        </div>
        <div className={styles.heroFoot}>
          <span>小亦 · 整理</span>
          <span>资料核验截至 {seedreamCollection.collected_at.replace(/-/g, '.')}</span>
        </div>
      </header>
      <aside className={styles.evidenceNote}>
        <strong>阅读说明</strong>
        <div className={styles.evidenceBody}>
          <p>
            本页由小亦整理，供学习对照，不代表字节跳动 Seed。只收录原帖或官方标明为 {seedreamCollection.official_name} 的作品。效果图来自原帖照片、动图或视频封面，本站没有逐条复现，也没有转载完整视频。混用其他工具的条目单独标成「混用工作流」，并按原帖写出每一步；原帖没说明的步骤保留「原帖未说明」。下列说法引自
            {' '}
            <a href={seedreamCollection.official_blog} target="_blank" rel="noopener noreferrer">官方博客</a>
            {' '}
            与
            {' '}
            <a href={seedreamCollection.official_page} target="_blank" rel="noopener noreferrer">中文产品页</a>
            ，本站未复测。
          </p>
          <ul className={styles.claimList}>
            {seedreamCollection.official_claims.map((claim) => <li key={claim}>{claim}</li>)}
          </ul>
          <p>
            原帖没有给出的提示词，页面写「未公开提示词」，不另补。
            {' '}
            <a href={seedreamCollection.official_launch_post} target="_blank" rel="noopener noreferrer">官方发布帖 ↗</a>
            {' '}
            <a href={seedreamCollection.official_blog_en} target="_blank" rel="noopener noreferrer">英文博客 ↗</a>
          </p>
        </div>
      </aside>
      <Gallery cards={getSeedreamGalleryCards()} categories={getSeedreamCategoryCounts()} />
      <ShengcaiInviteCard className="mt-14" />
    </div>
  );
}
