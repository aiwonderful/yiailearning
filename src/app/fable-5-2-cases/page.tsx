import type { Metadata } from 'next';
import Link from 'next/link';
import ShengcaiInviteCard from '@/components/ShengcaiInviteCard';
import { siteConfig } from '@/lib/config';
import { fableCases, fableCollection, fableImageCount, getCategoryCounts, getGalleryCards } from '@/lib/fable-cases';
import Gallery from './gallery';
import styles from './cases.module.css';

const title = 'Claude Fable 5.2 案例合集：54 个带效果图的真实案例';
const description = '按分类浏览 54 个 Claude Fable 5.2 案例：官方科研与工程、Three.js / 3D / Blender、游戏原型、动态设计和界面。每条有效果图、作者署名、原帖链接，以及公开的做法和提示词。';
const pageUrl = `${siteConfig.url}/fable-5-2-cases`;

export const metadata: Metadata = {
  title,
  description,
  keywords: ['Claude Fable 5.2', 'Claude Fable 5.2 案例', 'Fable 5.2', 'Anthropic', 'Three.js', 'Blender', 'AI 案例'],
  alternates: { canonical: pageUrl },
  openGraph: {
    title,
    description,
    url: pageUrl,
    type: 'website',
    images: [{
      url: fableCases[0].images[0].src,
      width: fableCases[0].images[0].width,
      height: fableCases[0].images[0].height,
      alt: `${fableCases[0].title}，作者 ${fableCases[0].author.name}`,
    }],
  },
  twitter: { card: 'summary_large_image', title, description },
};

export default function FableCasesPage() {
  return (
    <div className={styles.page}>
      <div className={styles.breadcrumb}>
        <Link href="/resources">资料库</Link>
        <span aria-hidden="true">/</span>
        <span>Claude Fable 5.2 案例</span>
      </div>
      <p className={styles.copyrightBanner}>图片和演示归原作者所有，本页仅作截图预览与整理。</p>
      <header className={styles.hero}>
        <div className={styles.edition}>
          <span>小亦的 AI 学习实验室</span>
          <span>CASEBOOK / 02</span>
        </div>
        <div className={styles.heroGrid}>
          <div>
            <p className={styles.eyebrow}>CLAUDE FABLE 5.2 · 案例合集</p>
            <h1>Claude Fable 5.2<br /><span>案例合集</span></h1>
            <p className={styles.intro}>
              {fableCases.length} 个带效果图的案例。先从缩略图认出成品，再按分类打开：中文说明、做法、用到的工具，以及作者愿意公开的提示词。
            </p>
            <nav className={styles.heroLinks} aria-label="本页目录">
              <a href="#cases">看效果图 <span aria-hidden="true">↓</span></a>
              <a href={fableCollection.official_page} target="_blank" rel="noopener noreferrer">Anthropic 发布说明 ↗</a>
            </nav>
          </div>
          <div className={styles.issue} aria-label={`${fableCases.length} 个案例，${fableCollection.categories.length} 个分类`}>
            <span className={styles.issueLabel}>FABLE 5.2 / SCREENSHOTS</span>
            <div className={styles.issueNumber}>{fableCases.length}<span>个案例</span></div>
            <div className={styles.issueBottom}>
              <span><strong>0{fableCollection.categories.length}</strong> 个分类</span>
              <span><strong>{fableImageCount}</strong> 张效果图</span>
            </div>
          </div>
        </div>
        <div className={styles.heroFoot}>
          <span>小亦 · 整理</span>
          <span>资料核验截至 {fableCollection.collected_at.replace(/-/g, '.')}</span>
        </div>
      </header>
      <aside className={styles.evidenceNote}>
        <strong>阅读说明</strong>
        <p>
          只收录明确标明为 Claude Fable 5.2 的作品。效果来自作者原帖或官方材料，本站没有逐条复现。Blender、Remotion、Three.js 或其他工具会按原帖写在卡片上，不把成品说成纯模型一次出图。官方科研与工程里的耗时、代理数量和评测分数来自 Anthropic 官方发布。原帖没有给出的提示词，页面写「未公开提示词」，不另补。
          {' '}
          <a href={fableCollection.official_launch_post} target="_blank" rel="noopener noreferrer">官方发布帖 ↗</a>
        </p>
      </aside>
      <Gallery cards={getGalleryCards()} categories={getCategoryCounts()} />
      <ShengcaiInviteCard className="mt-14" />
    </div>
  );
}
