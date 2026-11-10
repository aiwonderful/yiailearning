import type { Metadata } from 'next';
import Link from 'next/link';
import ShengcaiInviteCard from '@/components/ShengcaiInviteCard';
import { siteConfig } from '@/lib/config';
import {
  gptImageCases,
  gptImageCollection,
  gptImageImageCount,
  getGptImageCategoryCounts,
  getGptImageGalleryCards,
} from '@/lib/gpt-image-cases';
import Gallery from './gallery';
import styles from './cases.module.css';

const title = 'GPT Image 2.6 案例合集：64 个带效果图的 GIF、表情包与混用工作流';
const description = '按分类浏览 64 个 GPT Image 2.6 案例的效果图：官方发布与演示、GIF 动图、表情包与贴纸、人像写真、海报平面、模型对比，以及混用其他工具的工作流。每条署名作者并链回原帖，区分纯 GPT Image 2.6 和混用工作流。';
const pageUrl = `${siteConfig.url}/gpt-image-2-6-cases`;

export const metadata: Metadata = {
  title,
  description,
  keywords: ['GPT Image 2.6', 'GPT Image 2.6 案例', 'ChatGPT Images 2.6', 'gpt-image-2.6', 'AI 绘图案例', 'GIF', '混用工作流'],
  alternates: { canonical: pageUrl },
  openGraph: {
    title,
    description,
    url: pageUrl,
    type: 'website',
    images: [{
      url: gptImageCases[0].images[0].src,
      width: gptImageCases[0].images[0].width,
      height: gptImageCases[0].images[0].height,
      alt: `${gptImageCases[0].title}，作者 ${gptImageCases[0].author.name}`,
    }],
  },
  twitter: { card: 'summary_large_image', title, description },
};

export default function GptImageCasesPage() {
  return (
    <div className={styles.page}>
      <div className={styles.breadcrumb}>
        <Link href="/resources">资料库</Link>
        <span aria-hidden="true">/</span>
        <span>GPT Image 2.6 案例</span>
      </div>
      <p className={styles.copyrightBanner}>图片和演示归原作者所有，本页仅作截图预览与整理。</p>
      <header className={styles.hero}>
        <div className={styles.edition}>
          <span>小亦的 AI 学习实验室</span>
          <span>CASEBOOK / 03</span>
        </div>
        <div className={styles.heroGrid}>
          <div>
            <p className={styles.eyebrow}>GPT IMAGE 2.6 · 案例合集</p>
            <h1>GPT Image 2.6<br /><span>案例合集</span></h1>
            <p className={styles.intro}>
              {gptImageCases.length} 个带效果图的案例。先从缩略图认出成品，再按分类打开：中文说明、做法、用到的工具，以及作者愿意公开的提示词。卡片上的标签区分纯 GPT Image 2.6 和混用工作流。
            </p>
            <nav className={styles.heroLinks} aria-label="本页目录">
              <a href="#cases">看效果图 <span aria-hidden="true">↓</span></a>
              <a href={gptImageCollection.official_page} target="_blank" rel="noopener noreferrer">OpenAI 发布说明 ↗</a>
            </nav>
          </div>
          <div className={styles.issue} aria-label={`${gptImageCases.length} 个案例，${gptImageCollection.categories.length} 个分类，${gptImageImageCount} 张效果图`}>
            <span className={styles.issueLabel}>GPT IMAGE 2.6 / SCREENSHOTS</span>
            <div className={styles.issueNumber}>{gptImageCases.length}<span>个案例</span></div>
            <div className={styles.issueBottom}>
              <span><strong>{gptImageCollection.pure_count}</strong> 纯 2.6</span>
              <span><strong>{gptImageCollection.mixed_count}</strong> 混用</span>
            </div>
          </div>
        </div>
        <div className={styles.heroFoot}>
          <span>小亦 · 整理</span>
          <span>资料核验截至 {gptImageCollection.collected_at.replace(/-/g, '.')}</span>
        </div>
      </header>
      <aside className={styles.evidenceNote}>
        <strong>阅读说明</strong>
        <p>
          本页由小亦整理，供学习对照，不代表 OpenAI。只收录原帖或官方标明为 ChatGPT Images 2.6 / GPT-Image-2.6（含 Flare、Sunburst）的作品。效果图来自原帖照片，或视频和 GIF 的静态预览，本站没有逐条复现，也没有转载完整视频。混用其他工具的条目单独标成「混用工作流」，并按原帖写出每一步；原帖没说明的步骤保留「原帖未说明」。OpenAI 官方发布称出图比此前快约 50%，Flare 在低画质下最快约 6 秒，并新增原生 GIF、可保存参考图、API 侧 SVG 导出，API 型号为 gpt-image-2.6-flare 与 gpt-image-2.6-sunburst。这些数据和功能说明引自
          {' '}
          <a href={gptImageCollection.official_page} target="_blank" rel="noopener noreferrer">OpenAI 官方发布</a>
          ，本站未复测。原帖没有给出的提示词，页面写「未公开提示词」，不另补。
          {' '}
          <a href={gptImageCollection.official_launch_post} target="_blank" rel="noopener noreferrer">官方发布帖 ↗</a>
        </p>
      </aside>
      <Gallery cards={getGptImageGalleryCards()} categories={getGptImageCategoryCounts()} />
      <ShengcaiInviteCard className="mt-14" />
    </div>
  );
}
