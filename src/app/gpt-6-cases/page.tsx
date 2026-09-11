import type { Metadata } from 'next';
import Link from 'next/link';
import collection from '@/data/casebooks/gpt-6.json';
import Casebook from './casebook';
import styles from './casebook.module.css';

const title = 'GPT-6 案例集：20 个真实案例与 10 条最佳实践';
const description = '从网页、3D 与视频，到音乐、办公和机器人：逐例整理 GPT-6 Astra 的输入、工作流、成果与原始来源，提炼可迁移的实践方法。';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: 'https://yilearnai.com/gpt-6-cases' },
  openGraph: { title, description, url: 'https://yilearnai.com/gpt-6-cases', type: 'article', publishedTime: '2026-09-11', modifiedTime: '2026-09-11' },
  twitter: { title, description },
};

export default function GPT6CasesPage() {
  return (
    <div className={styles.page}>
      <div className={styles.breadcrumb}><Link href="/resources">资料库</Link><span>/</span><span>GPT-6 专题</span></div>
      <header className={styles.hero}>
        <div className={styles.edition}><span>小亦的 AI 学习实验室</span><span>CASEBOOK / 01</span></div>
        <div className={styles.heroGrid}>
          <div>
            <p className={styles.eyebrow}>GPT-6 ASTRA · 实践观察</p>
            <h1>从一次演示，<br />到你的下一次<span>实践。</span></h1>
            <p className={styles.intro}>20 个案例，看看 GPT-6 如何进入真实的创作与工作流程。保留输入、方法、成果与局限，把值得借鉴的做法带走。</p>
            <nav className={styles.heroLinks} aria-label="专题目录"><a href="#cases">阅读案例 <span aria-hidden="true">↓</span></a><a href="#practices">10 条最佳实践</a><a href="#workflow">复用这套流程</a></nav>
          </div>
          <div className={styles.issue} aria-label="20 个案例，10 条实践，6 类场景">
            <span className={styles.issueLabel}>GPT-6 / FIELD NOTES</span>
            <div className={styles.issueNumber}>20<span>个案例</span></div>
            <div className={styles.issueBottom}><span><strong>10</strong> 条实践</span><span><strong>06</strong> 类场景</span></div>
          </div>
        </div>
        <div className={styles.heroFoot}><span>小亦 · 整理</span><span>资料核验截至 2026.09.08 · 网页发布 2026.09.11</span></div>
      </header>
      <aside className={styles.evidenceNote}><strong>阅读说明</strong><p>原始资料已查阅。仅地球仪表盘做过部分成品交互检查，其余以作者报告为主；本集未独立复现生成或实验过程。每例保留来源与验证边界。</p></aside>
      <Casebook collection={collection} />
    </div>
  );
}
