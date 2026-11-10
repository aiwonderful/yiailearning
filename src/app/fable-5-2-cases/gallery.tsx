'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { mediaTypeLabel, type GalleryCard } from '@/lib/fable-format';
import styles from './cases.module.css';

type CategoryCount = { name: string; count: number };

export default function Gallery({ cards, categories }: { cards: GalleryCard[]; categories: CategoryCount[] }) {
  const [active, setActive] = useState('全部');
  const visible = active === '全部' ? cards : cards.filter((card) => card.category === active);

  return (
    <section id="cases" className={styles.section} aria-label="案例列表">
      <div className={styles.sectionHeading}>
        <div>
          <p className={styles.eyebrow}>01 / 效果图</p>
          <h2>按分类找到那个案例</h2>
        </div>
        <span className={styles.count} aria-live="polite">{visible.length} / {cards.length} 例</span>
      </div>
      <div className={styles.filters} aria-label="按分类筛选案例">
        {[{ name: '全部', count: cards.length }, ...categories].map((category) => (
          <button
            type="button"
            key={category.name}
            aria-pressed={active === category.name}
            onClick={() => setActive(category.name)}
          >
            {category.name}
            <span>{category.count}</span>
          </button>
        ))}
      </div>
      <div className={styles.caseGrid}>
        {visible.map((card, index) => (
          <article className={styles.card} key={card.id}>
            <Link
              href={`/fable-5-2-cases/${card.id}`}
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
              />
            </Link>
            <div className={styles.cardBody}>
              <div className={styles.cardMeta}>
                <span>{card.category} · {mediaTypeLabel(card.image.mediaType)}{card.imageCount > 1 ? ` · ${card.imageCount} 张` : ''}</span>
                <span className={styles.serial}>{card.serial}</span>
              </div>
              <h3><Link href={`/fable-5-2-cases/${card.id}`}>{card.title}</Link></h3>
              <p className={styles.oneLiner}>{card.oneLiner}</p>
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
              {card.official ? <p className={styles.officialTag}>Anthropic 官方发布</p> : null}
              {card.ipNotice ? <p className={styles.officialTag}>只做案例说明</p> : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
