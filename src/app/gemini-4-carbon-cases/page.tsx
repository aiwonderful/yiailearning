import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';
import { GEMINI_CATEGORIES, GEMINI_OFFICIAL } from '@/lib/gemini-format';
import {
  geminiCases,
  geminiCollection,
  geminiImageCount,
  geminiMixedCount,
  geminiSceneCount,
  getGeminiCategoryCounts,
  getGeminiGalleryCards,
} from '@/lib/gemini-cases';
import Gallery from './gallery';
import styles from './cases.module.css';

const title = 'Gemini 4 Carbon 案例合集：57 个带效果图的 3D、仿真、游戏与混用工作流';
const description = '按分类浏览 57 个 Gemini 4 Carbon 案例的效果图：官方发布、3D 场景与物理仿真、游戏原型、网站与数据工具、SVG、同题对比和混用工作流。3D 和仿真类案例占比较高。每条署名作者并链回原帖。价格和跑分为官方数据。';
const pageUrl = `${siteConfig.url}/gemini-4-carbon-cases`;
const launch = geminiCollection.launch;

export const metadata: Metadata = {
  title,
  description,
  keywords: ['Gemini 4 Carbon', 'Gemini 4 Carbon 案例', 'Google DeepMind', 'AI 案例', '3D', '混用工作流'],
  alternates: { canonical: pageUrl },
  openGraph: {
    title,
    description,
    url: pageUrl,
    type: 'website',
    images: [{
      url: geminiCases[0].images[0].src,
      width: geminiCases[0].images[0].width,
      height: geminiCases[0].images[0].height,
      alt: `${geminiCases[0].title}，作者 ${geminiCases[0].author.name}`,
    }],
  },
  twitter: { card: 'summary_large_image', title, description },
};

export default function GeminiCasesPage() {
  return (
    <div className={styles.page}>
      <div className={styles.breadcrumb}>
        <Link href="/resources">资料库</Link>
        <span aria-hidden="true">/</span>
        <span>Gemini 4 Carbon 案例</span>
      </div>
      <p className={styles.copyrightBanner}>图片版权归原作者或 Google / Google DeepMind。本页只放截图预览，不放整段视频。</p>
      <header className={styles.hero}>
        <div className={styles.edition}>
          <span>小亦的 AI 学习实验室</span>
          <span>CASEBOOK / 05</span>
        </div>
        <div className={styles.heroGrid}>
          <div>
            <p className={styles.eyebrow}>GEMINI 4 CARBON · 案例合集</p>
            <h1>Gemini 4 Carbon<br /><span>案例合集</span></h1>
            <p className={styles.intro}>
              Google 发布的前沿模型，{launch.announced} 宣布，{launch.generally_available} 正式开放。{geminiCases.length} 个带效果图的案例，3D 和仿真类案例占比较高。先从缩略图认出成品，再按分类打开中文说明、做法、工具和公开提示词。混用其他工具的条目标成「混用工作流」。
            </p>
            <nav className={styles.heroLinks} aria-label="本页目录">
              <a href="#cases">看效果图 <span aria-hidden="true">↓</span></a>
              <a href={GEMINI_OFFICIAL.blogIntro} target="_blank" rel="noopener noreferrer">官方介绍 ↗</a>
              <a href={GEMINI_OFFICIAL.blogAvailable} target="_blank" rel="noopener noreferrer">正式开放 ↗</a>
            </nav>
          </div>
          <div className={styles.issue} aria-label={`${geminiCases.length} 个案例，${GEMINI_CATEGORIES.length} 个分类，${geminiImageCount} 张效果图`}>
            <span className={styles.issueLabel}>GEMINI 4 CARBON / SCREENSHOTS</span>
            <div className={styles.issueNumber}>{geminiCases.length}<span>个案例</span></div>
            <div className={styles.issueBottom}>
              <span><strong>{geminiSceneCount}</strong> 3D 与仿真</span>
              <span><strong>{geminiMixedCount}</strong> 混用</span>
            </div>
          </div>
        </div>
        <div className={styles.heroFoot}>
          <span>小亦 · 整理</span>
          <span>资料核验截至 {geminiCollection.collected_at}</span>
        </div>
      </header>
      <aside className={styles.evidenceNote}>
        <strong>阅读说明</strong>
        <div className={styles.evidenceBody}>
          <p>本页由小亦整理，供学习对照，不代表 Google。{geminiCollection.model_scope}</p>
          <p>{geminiCollection.method_note}</p>
          <p>
            价格和跑分均为官方数据，引自
            {' '}
            <a href={GEMINI_OFFICIAL.blogIntro} target="_blank" rel="noopener noreferrer">Gemini 4 Carbon 介绍</a>
            {' '}
            与
            {' '}
            <a href={GEMINI_OFFICIAL.blogAvailable} target="_blank" rel="noopener noreferrer">Gemini 4 Carbon 现已开放</a>
            ，本站未复测。
          </p>
          <ul className={styles.claimList}>
            {launch.claims.map((claim) => <li key={claim}>{claim}</li>)}
          </ul>
          <p>{geminiCollection.copyright}</p>
          <p className={styles.officialLinks}>
            <a href={GEMINI_OFFICIAL.blogDevelopers} target="_blank" rel="noopener noreferrer">开发者说明 ↗</a>
            <a href={GEMINI_OFFICIAL.launchSundar} target="_blank" rel="noopener noreferrer">Sundar 发布帖 ↗</a>
            <a href={GEMINI_OFFICIAL.launchLogan} target="_blank" rel="noopener noreferrer">Logan 宣布帖 ↗</a>
            <a href={GEMINI_OFFICIAL.availableLogan} target="_blank" rel="noopener noreferrer">Logan 开放帖 ↗</a>
          </p>
        </div>
      </aside>
      <Gallery cards={getGeminiGalleryCards()} categories={getGeminiCategoryCounts()} />
    </div>
  );
}
