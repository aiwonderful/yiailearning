'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { kindLabel, mediaTypeLabel, type GeminiGalleryCard } from '@/lib/gemini-format';
import styles from './cases.module.css';

type CategoryCount = { name: string; count: number };
type Kind = 'all' | 'pure' | 'mixed';

export default function Gallery({ cards, categories }: { cards: GeminiGalleryCard[]; categories: CategoryCount[] }) {
  const [category, setCategory] = useState('全部');
  const [kind, setKind] = useState<Kind>('all');
  const pureCount = cards.filter((card) => !card.mixed).length;
  const mixedCount = cards.filter((card) => card.mixed).length;
  const visible = cards.filter((card) => {
    if (category !== '全部' && card.category !== category) return false;
    if (kind === 'pure' && card.mixed) return false;
    if (kind === 'mixed' && !card.mixed) return false;
    return true;
  });
  const kinds: { id: Kind; label: string; count: number }[] = [
    { id: 'all', label: '全部案例', count: cards.length },
    { id: 'pure', label: '纯 Carbon', count: pureCount },
    { id: 'mixed', label: '混用工作流', count: mixedCount },
  ];

  return (
    <section id="cases" className={styles.section} aria-label="案例列表">
      <div className={styles.sectionHeading}>
        <div>
          <p className={styles.eyebrow}>01 / 效果图</p>
          <h2>按分类找到那个案例</h2>
        </div>
        <span className={styles.count} aria-live="polite">{visible.length} / {cards.length} 例</span>
      </div>
      <p className={styles.filterLabel} id="gemini-kind-label">生成方式</p>
      <div className={styles.modeFilters} role="group" aria-labelledby="gemini-kind-label">
        {kinds.map((item) => (
          <button
            type="button"
            key={item.id}
            aria-pressed={kind === item.id}
            onClick={() => setKind(item.id)}
          >
            {item.label}
            <span>{item.count}</span>
          </button>
        ))}
      </div>
      <p className={styles.filterHint}>「纯 Carbon」沿用合集整理时的标记，表示这条没有再标成混用工作流。工具仍按原帖列出，不要理解成纯模型一次成型。</p>
      <p className={styles.filterLabel} id="gemini-category-label">分类</p>
      <div className={styles.filters} role="group" aria-labelledby="gemini-category-label">
        {[{ name: '全部', count: cards.length }, ...categories].map((item) => (
          <button
            type="button"
            key={item.name}
            aria-pressed={category === item.name}
            onClick={() => setCategory(item.name)}
          >
            {item.name}
            <span>{item.count}</span>
          </button>
        ))}
      </div>
      {visible.length === 0 ? (
        <p className={styles.empty}>当前筛选下没有案例。换一个分类或生成方式看看。</p>
      ) : (
        <div className={styles.caseGrid}>
          {visible.map((card, index) => (
            <article className={styles.card} key={card.id}>
              <Link
                href={`/gemini-4-carbon-cases/${card.id}`}
                className={styles.thumbLink}
                aria-label={`${card.title} 效果预览`}
              >
                <Image
                  src={card.image.src}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className={styles.thumb}
                  style={{ objectFit: 'contain' }}
                  priority={index < 3}
                  loading={index < 3 ? undefined : 'lazy'}
                />
              </Link>
              <div className={styles.cardBody}>
                <div className={styles.cardMeta}>
                  <span>{card.category} · {mediaTypeLabel(card.image.mediaType)}{card.imageCount > 1 ? ` · ${card.imageCount} 张` : ''}</span>
                  <span className={styles.serial}>{card.serial}</span>
                </div>
                <h3><Link href={`/gemini-4-carbon-cases/${card.id}`}>{card.title}</Link></h3>
                <p className={styles.oneLiner}>{card.oneLiner}</p>
                <p className={styles.badgeRow}>
                  <span className={`${styles.badge} ${card.mixed ? styles.badgeMixed : styles.badgePure}`}>{kindLabel(card.mixed)}</span>
                </p>
              </div>
              <div className={styles.cardFoot}>
                <p className={styles.tools}>{card.tools.join(' · ')}</p>
                <p className={styles.byline}>
                  <a href={card.authorUrl} target="_blank" rel="noopener noreferrer">
                    作者 {card.authorName}
                    <span className={styles.srOnly}>（新窗口）</span>
                  </a>
                  <a href={card.sourceUrl} target="_blank" rel="noopener noreferrer">
                    原帖<span className={styles.srOnly}>（新窗口）</span>
                  </a>
                </p>
                {card.official ? <p className={styles.officialTag}>Google 官方发布</p> : null}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
