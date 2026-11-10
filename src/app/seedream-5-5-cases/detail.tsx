import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { seedreamCases } from '@/lib/seedream-cases';
import {
  SEEDREAM_OFFICIAL,
  isOfficialAttribution,
  kindLabel,
  mediaTypeLabel,
  relatedLinkLabel,
  splitWorkflowStep,
  visiblePromptNote,
  type SeedreamCase,
} from '@/lib/seedream-format';
import styles from './cases.module.css';

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <span className={styles.srOnly}>（新窗口）</span>
    </a>
  );
}

export default function CaseDetail({ item }: { item: SeedreamCase }) {
  const index = seedreamCases.findIndex((entry) => entry.id === item.id);
  const prev = index > 0 ? seedreamCases[index - 1] : null;
  const next = index >= 0 && index < seedreamCases.length - 1 ? seedreamCases[index + 1] : null;
  const official = isOfficialAttribution(item.model_attribution);
  const promptNote = visiblePromptNote(item.prompt.note, item.prompt.status);
  const related = Array.from(new Set([
    ...(item.featured_by_url ? [item.featured_by_url] : []),
    ...item.related_urls,
    ...(item.repo_url ? [item.repo_url] : []),
  ].filter((url) => url && url !== item.source_url)));
  const authorLabel = item.author.username ? `${item.author.name} (@${item.author.username})` : item.author.name;

  return (
    <article className={styles.detail}>
      <div className={styles.breadcrumb}>
        <Link href="/resources">资料库</Link>
        <span aria-hidden="true">/</span>
        <Link href="/seedream-5-5-cases">Seedream 5.5 案例</Link>
        <span aria-hidden="true">/</span>
        <span>{item.title}</span>
      </div>
      <p className={styles.copyrightBanner}>图片和演示归原作者所有；官方演示归官方发布。本页仅作截图预览与整理。</p>
      <header className={styles.detailHeader}>
        <div className={styles.kicker}>
          <span>{item.category}</span>
          <span className={`${styles.badge} ${item.mixed ? styles.badgeMixed : styles.badgePure}`}>{kindLabel(item.mixed)}</span>
          {index >= 0 ? <span className={styles.serial}>{String(index + 1).padStart(2, '0')} / {String(seedreamCases.length).padStart(2, '0')}</span> : null}
        </div>
        <h1>{item.title}</h1>
        <p className={styles.lede}>{item.one_liner}</p>
        <p className={styles.meta}>
          <ExternalLink href={item.author.url}>作者 {authorLabel}</ExternalLink>
          <span>{item.published_at_shanghai}</span>
          <ExternalLink href={item.source_url}>原帖 ↗</ExternalLink>
        </p>
        <p className={styles.evidence}>
          {official ? (
            <>
              本条来自字节跳动 Seed 官方发布。官方称未编辑区域可在多达 100 轮编辑中保持像素级稳定，并原生支持 RGBA 透明素材。这些说明引自
              {' '}
              <ExternalLink href={SEEDREAM_OFFICIAL.blogZh}>官方博客</ExternalLink>
              ，本站未复测。
            </>
          ) : item.mixed ? (
            '这条按原帖整理为混用工作流：分步写明哪一步用了 Seedream 5.5，哪一步用了其他工具。原帖没写清的步骤保留「原帖未说明」。本站未独立复现。'
          ) : (
            '作者自称这条作品由 Seedream 5.5 完成。本站未独立复现，用到的工具按原帖列出。'
          )}
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
              priority={imageIndex === 0 && !image.animated}
              loading={imageIndex === 0 && !image.animated ? undefined : 'lazy'}
              unoptimized={image.animated}
              sizes="(max-width: 768px) 100vw, 960px"
              style={{ width: '100%', height: 'auto' }}
              className={styles.fullImage}
            />
            <figcaption>
              <span>{image.copyright_note} · {mediaTypeLabel(image.media_type)}</span>
              <ExternalLink href={image.original_post_url}>查看原帖 ↗</ExternalLink>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className={styles.copy}>
        {item.mixed ? (
          <section aria-label="分步流程">
            <h2>分步流程</h2>
            <p>下面按原帖已有的说明排列。写到 Seedream 5.5 的步骤就是用它出图或做参考的步骤，其余步骤使用原帖点名的其他工具。</p>
            <ol className={styles.workflow}>
              {item.workflow.map((step) => {
                const parts = splitWorkflowStep(step);
                return (
                  <li key={step}>
                    <p>{parts.body}</p>
                    {parts.prompt ? (
                      <details className={styles.prompt}>
                        <summary>
                          <span>{parts.promptLabel && parts.promptLabel !== '这一步' ? `展开 ${parts.promptLabel} 公开的提示词` : '展开这一步公开的提示词'}</span>
                          <span className={styles.plus} aria-hidden="true">+</span>
                        </summary>
                        <div className={styles.promptBody}>
                          <pre className={styles.promptText}>{parts.prompt}</pre>
                        </div>
                      </details>
                    ) : null}
                  </li>
                );
              })}
            </ol>
          </section>
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
            <p><ExternalLink href={item.live_demo_url}>在线演示 · {relatedLinkLabel(item.live_demo_url)} ↗</ExternalLink></p>
          </section>
        ) : null}

        {related.length > 0 ? (
          <section>
            <h2>相关链接</h2>
            <ul className={styles.links}>
              {related.map((url) => (
                <li key={url}><ExternalLink href={url}>{relatedLinkLabel(url)} ↗</ExternalLink></li>
              ))}
            </ul>
          </section>
        ) : null}

        {item.notes ? <p className={styles.noteLine}>整理备注：{item.notes}</p> : null}
      </div>

      <nav className={styles.pager} aria-label="相邻案例">
        {prev ? (
          <Link href={`/seedream-5-5-cases/${prev.id}`}>
            <span>上一条</span>
            <strong>{prev.title}</strong>
          </Link>
        ) : <span />}
        {next ? (
          <Link href={`/seedream-5-5-cases/${next.id}`} className={styles.pagerNext}>
            <span>下一条</span>
            <strong>{next.title}</strong>
          </Link>
        ) : <span />}
      </nav>
    </article>
  );
}
