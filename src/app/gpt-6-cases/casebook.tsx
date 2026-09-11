'use client';

import { useEffect, useState } from 'react';
import type data from '@/data/casebooks/gpt-6.json';
import styles from './casebook.module.css';

type Collection = typeof data;
const groups = [
  { name: '网页与游戏', ids: ['globe-dashboard', 'bubble-wrap', 'jelly-baby', 'signaldesk-app'] },
  { name: '视觉与 3D', ids: ['holo-card', 'verdant-forest', 'palace-blender', 'listing-film', 'canva-portrait', 'steam-train'] },
  { name: '视频与音乐', ids: ['final-cut-prep', 'clips55-edit', 'tcell-video', 'ableton-music'] },
  { name: '办公研究', ids: ['research-workbook'] },
  { name: '工程与硬件', ids: ['kicad-layout', 'adam-cad', 'robot-control'] },
  { name: '模型评测', ids: ['godot-effort', 'arc-harness'] },
];

const basisLabels: Record<string, string> = {
  official_guidance: '官方建议',
  cross_case_pattern: '跨案例观察',
  single_case_lesson: '单例经验',
  hypothesis: '待验证假设',
};
const promptLabels: Record<string, string> = { full: '完整提示词见来源', partial: '部分提示词已公开', reconstructed: '提示词为编辑重构', not_available: '完整提示词未公开' };
const template = `我希望完成【具体任务】，最终给【读者或用户】使用。
请交付【文件、网页或工程】，并满足【3–5 个可以检查的条件】。
参考材料是【链接或文件】，必须保留【关键内容】，可自行决定【常规细节】。
先利用已知信息推进；仅在缺失信息会改变结果时提出具体问题。
制作中检查【关键中间结果】，发现问题就修正。
完成后按验收条件检查，报告实际完成项、未测项及剩余问题。
把输入素材、可调整参数、制作步骤与输出分开保存，说明哪些部分尚未验证可复用。`;

const workflow = [
  ['定范围', '确定主题、读者与用途，列出需要覆盖的场景。'],
  ['找原文', '从原作者、作品和源码寻找证据，合并同一作品的转帖。'],
  ['拆案例', '写清输入、工具、过程、结果，以及人工参与和局限。'],
  ['提做法', '连接证据与行动，写清适用条件、验收方法和失效边界。'],
  ['持续更新', '保留稳定的案例编号，补充新材料、失败记录和作者纠正。'],
];

export default function Casebook({ collection }: { collection: Collection }) {
  const [group, setGroup] = useState('全部');
  const [copyState, setCopyState] = useState('复制模板');
  const cases = collection.cases.filter(item => group === '全部' || groups.find(g => g.name === group)?.ids.includes(item.id));

  useEffect(() => {
    const showLinkedCase = () => {
      const id = window.location.hash.slice(1);
      if (collection.cases.some(item => item.id === id)) setGroup('全部');
    };
    showLinkedCase();
    window.addEventListener('hashchange', showLinkedCase);
    return () => window.removeEventListener('hashchange', showLinkedCase);
  }, [collection.cases]);

  useEffect(() => {
    const reveal = () => {
      const element = document.getElementById(window.location.hash.slice(1));
      const details = element instanceof HTMLDetailsElement ? element : element?.querySelector('details');
      if (details) {
        details.open = true;
        element?.scrollIntoView({ block: 'start' });
      }
    };
    reveal();
    window.addEventListener('hashchange', reveal);
    return () => window.removeEventListener('hashchange', reveal);
  }, [group]);

  const copyTemplate = async () => {
    try { await navigator.clipboard.writeText(template); setCopyState('已复制'); }
    catch { setCopyState('请选中下方文字复制'); }
  };

  const sourceLabel = (url: string, kind: string) => {
    const host = new URL(url).hostname;
    if (host === 'github.com') return 'GitHub 源码';
    if (host === 'x.com') return '作者原帖 · X';
    if (kind === 'artifact') return '在线作品';
    return kind === 'official' ? '官方文档' : host.replace(/^www\./, '');
  };

  return (
    <>
      <section id="cases" className={styles.section}>
        <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>01 / 案例集</p><h2>找到与你有关的那个场景</h2></div><span className={styles.count} aria-live="polite">{cases.length} / 20 例</span></div>
        <div className={styles.filters} aria-label="按场景筛选案例">
          {['全部', ...groups.map(g => g.name)].map(name => <button type="button" key={name} aria-pressed={group === name} onClick={() => setGroup(name)}>{name}<span>{name === '全部' ? 20 : groups.find(g => g.name === name)?.ids.length}</span></button>)}
        </div>
        <div className={styles.caseGrid}>
          {cases.map(item => <article className={styles.caseCard} key={item.id} id={item.id}>
            <div className={styles.cardMeta}><span>{groups.find(g => g.ids.includes(item.id))?.name}</span><span className={styles.serial}>{String(collection.cases.indexOf(item) + 1).padStart(2, '0')}</span></div>
            <h3>{item.title}</h3><p className={styles.author}>{item.author}</p><p className={styles.summary}>{item.summary}</p>
            <div className={styles.cardFooter}><span className={styles.evidenceTag}>{item.id === 'globe-dashboard' ? '部分成品交互已检查' : '作者报告 · 未独立复现'}</span><a className={styles.sourceLink} href={collection.sources.find(s => s.id === item.source_ids[0])?.url} target="_blank" rel="noopener noreferrer">原始来源 <span aria-hidden="true">↗</span></a></div>
            <details className={styles.details}>
              <summary><span>展开流程与实践笔记</span><span aria-hidden="true" className={styles.plus}>+</span></summary>
              <div className={styles.detailBody}>
                <div><h4>输入与提示词</h4><span className={styles.promptTag}>{promptLabels[item.input.prompt_status]}</span><p>{item.input.description}</p></div>
                <div><h4>已知流程</h4><ol>{item.workflow.map(step => <li key={step}>{step}</li>)}</ol></div>
                <div><h4>成果与证据</h4><p>{item.result.description}</p></div>
                <div className={styles.tryBox}><h4>你可以这样尝试</h4><p className={styles.smallNote}>以下为编辑建议，未独立复现。</p><ol>{item.reproduction.steps.map(step => <li key={step}>{step.replace(/^编辑建议[：:]/, '')}</li>)}</ol></div>
                <div><h4>局限与未验证部分</h4><ul>{item.limitations.map(note => <li key={note}>{note}</li>)}</ul></div>
                {'editorial_takeaway' in item && item.editorial_takeaway && <div className={styles.takeaway}><h4>带走一个做法</h4><p>{item.editorial_takeaway}</p></div>}
                {!!item.practice_ids.length && <div><h4>关联实践</h4><div className={styles.related}>{item.practice_ids.map(id => <a key={id} href={`#${id}`}>{collection.practices.find(p => p.id === id)?.title}</a>)}</div></div>}
                <div><h4>继续查看原始材料</h4><div className={styles.related}>{item.source_ids.map(id => { const source = collection.sources.find(s => s.id === id); return source ? <a key={id} href={source.url} target="_blank" rel="noopener noreferrer">{sourceLabel(source.url, source.kind)} ↗</a> : null; })}</div></div>
              </div>
            </details>
          </article>)}
        </div>
      </section>
      <section id="practices" className={styles.section}>
        <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>02 / 最佳实践</p><h2>把案例里的方法，带进自己的工作</h2></div><span className={styles.count}>10 条</span></div>
        <p className={styles.sectionIntro}>区分官方建议、跨案例观察、单例经验和待验证假设。这里的「最佳实践」是方法整理，不代表每条做法已被证明最优。</p>
        <div className={styles.practices}>
          {collection.practices.map((practice, index) => <details className={styles.practice} key={practice.id} id={practice.id}>
            <summary><span className={styles.practiceNumber}>{String(index + 1).padStart(2, '0')}</span><h3>{practice.title}</h3><span className={styles.basis}>{basisLabels[practice.basis]}</span><span className={styles.plus} aria-hidden="true">+</span></summary>
            <div className={styles.practiceBody}>
              <div className={styles.practiceColumns}><div><h4>怎么做</h4><p>{practice.action}</p><h4>适用条件</h4><p>{practice.when}</p></div><div><h4>如何验收</h4><p>{practice.acceptance}</p><h4>边界</h4><p>{practice.boundary}</p></div></div>
              <div className={styles.related}>{practice.case_ids.map(id => <a key={id} href={`#${id}`} onClick={() => setGroup('全部')}>{collection.cases.find(c => c.id === id)?.title}</a>)}{practice.source_ids.map(id => {const source = collection.sources.find(s => s.id === id);return source ? <a key={id} href={source.url} target="_blank" rel="noopener noreferrer">{sourceLabel(source.url, source.kind)} ↗</a> : null;})}</div>
            </div>
          </details>)}
        </div>
      </section>
      <section id="workflow" className={styles.section}>
        <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>03 / 可复用的方法</p><h2>换一个主题，继续积累</h2></div></div>
        <p className={styles.sectionIntro}>整理下一个模型、工具或工作流时，沿用这五步。以 20–30 个独立案例为目标，数量服从证据，保留失败与纠正。</p>
        <ol className={styles.workflow}>{workflow.map(([name, description], index) => <li key={name}><span>{String(index + 1).padStart(2, '0')}</span><h3>{name}</h3><p>{description}</p></li>)}</ol>
        <div className={styles.template}>
          <div className={styles.templateHeading}><div><p className={styles.eyebrow}>从你的任务开始</p><h3>一份可以直接改写的任务模板</h3></div><button type="button" onClick={copyTemplate}>{copyState}</button></div>
          <p className={styles.smallNote}>编辑自拟 · 不是原作者提示词 · 未做 A/B 测试</p>
          <pre>{template}</pre><span className={styles.srOnly} role="status">{copyState === '复制模板' ? '' : copyState}</span>
        </div>
      </section>
      <div className={styles.closing}><p>保留过程，也保留不确定性。<br /><strong>好案例的价值，是让下一次实践有据可循。</strong></p><a href="#cases">回到案例集 ↑</a></div>
    </>
  );
}
