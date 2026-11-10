import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fableCases } from '@/lib/fable-cases';
import {
  isOfficialAttribution,
  linkHostLabel,
  mediaTypeLabel,
  needsIpNotice,
  visiblePromptNote,
  type FableCase,
} from '@/lib/fable-format';
import styles from './cases.module.css';

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <span className={styles.srOnly}>（新窗口）</span>
    </a>
  );
}

export default function CaseDetail({ item }: { item: FableCase }) {
  const index = fableCases.findIndex((entry) => entry.id === item.id);
  const prev = index > 0 ? fableCases[index - 1] : null;
  const next = index >= 0 && index < fableCases.length - 1 ? fableCases[index + 1] : null;
  const official = isOfficialAttribution(item.model_attribution);
  const promptNote = visiblePromptNote(item.prompt.note, item.prompt.status);
  const ipNotice = needsIpNotice(item.notes);
  const related = item.related_urls.filter((url) => url && url !== item.source_url);
  const authorLabel = item.author.username ? `${item.author.name} (@${item.author.username})` : item.author.name;

  return (
    <article className={styles.detail}>
      <div className={styles.breadcrumb}>
        <Link href="/resources">资料库</Link>
        <span aria-hidden="true">/</span>
        <Link href="/fable-5-2-cases">Claude Fable 5.2 案例</Link>
        <span aria-hidden="true">/</span>
        <span>{item.title}</span>
      </div>
      <p className={styles.copyrightBanner}>图片和演示归原作者所有，本页仅作截图预览与整理。</p>
      <header className={styles.detailHeader}>
        <div className={styles.kicker}>
          <span>{item.category}</span>
          {index >= 0 ? <span className={styles.serial}>{String(index + 1).padStart(2, '0')} / {String(fableCases.length).padStart(2, '0')}</span> : null}
        </div>
        <h1>{item.title}</h1>
        <p className={styles.lede}>{item.one_liner}</p>
        <p className={styles.meta}>
          <ExternalLink href={item.author.url}>作者 {authorLabel}</ExternalLink>
          <span>{item.published_at_shanghai}</span>
          <ExternalLink href={item.source_url}>原帖 ↗</ExternalLink>
        </p>
        <p className={styles.evidence}>
          {official
            ? '本条来自 Anthropic 官方发布。其中的数字未经过本站复现。'
            : '作者自称使用 Claude Fable 5.2。本站未独立复现，工具按原帖列出。'}
        </p>
      </header>

      <div className={styles.figures}>
        {item.images.map((image, imageIndex) => (
          <figure className={styles.figure} key={image.src}>
            <Image
              src={image.src}
              alt={`${item.title} 效果预览 ${imageIndex + 1}，作者 ${item.author.name}，${mediaTypeLabel(image.media_type)}`}
              width={image.width}
              height={image.height}
              priority={imageIndex === 0}
              sizes="(max-width: 768px) 100vw, 960px"
              style={{ width: '100%', height: 'auto' }}
              className={styles.fullImage}
            />
            <figcaption>
              <span>图片归 {item.author.name} 所有 · {mediaTypeLabel(image.media_type)} · 仅作截图预览</span>
              <ExternalLink href={image.original_post_url}>查看原帖 ↗</ExternalLink>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className={styles.copy}>
        {ipNotice && item.notes ? (
          <aside className={styles.warning} role="note">
            <strong>只做案例说明</strong>
            <p>{item.notes}</p>
          </aside>
        ) : null}

        <section>
          <h2>做法</h2>
          <p className={styles.method}>{item.method}</p>
        </section>

        <section>
          <h2>用到的工具</h2>
          <ul className={styles.toolList}>
            {item.tools.map((tool) => <li key={tool}>{tool}</li>)}
          </ul>
        </section>

        <section>
          <h2>提示词</h2>
          {item.prompt.status === 'published' && item.prompt.text ? (
            <details className={styles.prompt}>
              <summary>
                <span>展开公开提示词</span>
                <span className={styles.plus} aria-hidden="true">+</span>
              </summary>
              <div className={styles.promptBody}>
                {promptNote ? <p>{promptNote}</p> : null}
                <pre className={styles.promptText}>{item.prompt.text}</pre>
                <p>这里只收原帖已经公开的内容。上下文和后续修改以原帖为准。</p>
                <ExternalLink href={item.source_url}>在原帖查看 ↗</ExternalLink>
              </div>
            </details>
          ) : (
            <>
              <p className={styles.promptStatus}>未公开提示词</p>
              {promptNote ? <p>{promptNote}</p> : null}
            </>
          )}
        </section>

        {item.live_demo_url ? (
          <section>
            <h2>作者的在线演示</h2>
            <p><ExternalLink href={item.live_demo_url}>在线演示 · {linkHostLabel(item.live_demo_url)} ↗</ExternalLink></p>
          </section>
        ) : null}

        {related.length > 0 ? (
          <section>
            <h2>相关链接</h2>
            <ul className={styles.links}>
              {related.map((url) => (
                <li key={url}><ExternalLink href={url}>{linkHostLabel(url)} ↗</ExternalLink></li>
              ))}
            </ul>
          </section>
        ) : null}

        {item.notes && !ipNotice ? <p className={styles.noteLine}>整理备注：{item.notes}</p> : null}
      </div>

      <nav className={styles.pager} aria-label="相邻案例">
        {prev ? (
          <Link href={`/fable-5-2-cases/${prev.id}`}>
            <span>上一条</span>
            <strong>{prev.title}</strong>
          </Link>
        ) : <span />}
        {next ? (
          <Link href={`/fable-5-2-cases/${next.id}`} className={styles.pagerNext}>
            <span>下一条</span>
            <strong>{next.title}</strong>
          </Link>
        ) : <span />}
      </nav>
    </article>
  );
}
