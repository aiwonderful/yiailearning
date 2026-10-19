'use client';

import { useEffect, useRef, useState } from 'react';
import guide from '@/data/grok-bot-study-guide.json';
import styles from './guide.module.css';

type StudyState = {
  completed: string[];
  notes: Record<string, string>;
  answers: Record<string, number>;
  best: number;
  attempts: number;
  last: number | null;
};

const storageKey = 'grok-bot-study-v1';
const emptyState = (): StudyState => ({ completed: [], notes: {}, answers: {}, best: 0, attempts: 0, last: null });
const chapterIds = new Set(guide.chapters.map((chapter) => chapter.id));
const introMarkup = { __html: guide.intro };
const quizMarkup = { __html: guide.quizHtml };
const chapterMarkup = Object.fromEntries(guide.chapters.map((chapter) => [chapter.id, { __html: chapter.html }]));

export default function GuideClient() {
  const [state, setState] = useState<StudyState>(emptyState);
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState('');
  const [showNotes, setShowNotes] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const guideRef = useRef<HTMLDivElement>(null);
  const hydratedRef = useRef(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<StudyState>;
        if (!Array.isArray(parsed.completed) || !parsed.notes || typeof parsed.notes !== 'object' || !parsed.answers || typeof parsed.answers !== 'object') {
          throw new Error('Invalid study record');
        }
        setState({
          ...emptyState(),
          ...parsed,
          completed: parsed.completed.filter((id): id is string => typeof id === 'string' && chapterIds.has(id)),
          best: Number.isFinite(parsed.best) ? parsed.best! : 0,
          attempts: Number.isInteger(parsed.attempts) ? parsed.attempts! : 0,
        });
      }
    } catch {
      setStatus('本地记录无法读取；本次仍可学习，建议导出记录保存。');
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      setStatus('本地存储不可用；请导出记录保存。');
    }
  }, [ready, state]);

  useEffect(() => {
    if (!ready || !guideRef.current || hydratedRef.current) return;
    hydratedRef.current = true;
    guideRef.current.querySelectorAll<HTMLTextAreaElement>('textarea[data-note]').forEach((textarea) => {
      textarea.value = state.notes[textarea.dataset.note || ''] || '';
    });
    guideRef.current.querySelectorAll<HTMLInputElement>('#quiz input[type="radio"]').forEach((input) => {
      input.checked = state.answers[input.name] === Number(input.value);
    });
  }, [ready, state.answers, state.notes]);

  const save = (next: StudyState) => {
    setState(next);
    setStatus('已保存在当前浏览器');
  };

  const nextChapter = guide.chapters.find((chapter) => !state.completed.includes(chapter.id));
  const noteCount = Object.values(state.notes).filter((note) => typeof note === 'string' && note.trim()).length;
  const percent = Math.round((state.completed.length / guide.chapters.length) * 100);

  const exportNotes = () => {
    const lines = [
      '# Grok Bot 学习记录',
      `导出时间：${new Date().toISOString()}`,
      '资料核验：2026-10-19',
      `测验最佳 ${state.best}/${guide.quiz.length}；尝试 ${state.attempts} 次；最近得分 ${state.last ?? '未提交'}`,
    ];
    guide.chapters.forEach((chapter) => {
      lines.push(`\n## ${state.completed.includes(chapter.id) ? '[x]' : '[ ]'} ${chapter.title}`, state.notes[chapter.id] || '（无笔记）');
    });
    Object.entries(state.notes).forEach(([id, note]) => {
      if (!chapterIds.has(id) && typeof note === 'string' && note.trim()) lines.push(`\n## 旧版章节笔记：${id}`, note);
    });
    lines.push('\n## 测验作答');
    guide.quiz.forEach((question, index) => {
      lines.push(`${index + 1}. ${question.q}\n作答：${question.o[state.answers[`q${index}`]] ?? '未作答'}`);
    });
    const url = URL.createObjectURL(new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'grok-bot-learning-record.md';
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const reset = () => {
    save(emptyState());
    setScore(null);
    guideRef.current?.querySelectorAll<HTMLTextAreaElement>('textarea[data-note]').forEach((textarea) => { textarea.value = ''; });
    guideRef.current?.querySelectorAll<HTMLInputElement>('#quiz input[type="radio"]').forEach((input) => { input.checked = false; });
    dialogRef.current?.close();
    setStatus('学习记录已重置');
  };

  return (
    <div className={styles.guide} ref={guideRef}>
      <div className={styles.layout}>
        <aside className={styles.sidebar} aria-label="章节目录">
          <div className={styles.sidebarTitle}>GROK BOT / 学习手册</div>
          <nav>
            {guide.chapters.map((chapter) => (
              <a key={chapter.id} className={state.completed.includes(chapter.id) ? styles.done : ''} href={`#${chapter.id}`}>
                <span aria-hidden="true">{state.completed.includes(chapter.id) ? '✓' : '○'}</span> {chapter.title}
              </a>
            ))}
            <a href="#quiz">○ 知识检查</a>
          </nav>
        </aside>

        <div className={styles.content}>
          <header className={styles.hero}>
            <div className={styles.eyebrow}>DEEP STUDY GUIDE · 修订 2026.10.19</div>
            <h1>从一个收藏，<br />走到一次真实交付。</h1>
            <div className={styles.intro} dangerouslySetInnerHTML={introMarkup} />
          </header>

          <div className={styles.dashboard}>
            <strong>你的学习工作台</strong>
            <p>{percent}% 完成 · {state.completed.length}/{guide.chapters.length} 章 · {noteCount} 条笔记 · 最佳 {state.best}/{guide.quiz.length} · {state.attempts} 次测验</p>
            <progress max="100" value={state.completed.length / guide.chapters.length * 100} aria-label="章节完成进度" />
            <a className={styles.continue} href={nextChapter ? `#${nextChapter.id}` : '#quiz'}>
              {nextChapter ? `继续学习：${nextChapter.title}` : '全部已读，前往知识检查'} →
            </a>
            <div className={styles.actions}>
              <button type="button" onClick={() => setShowNotes(!showNotes)}>{showNotes ? '收起全部笔记' : '查看全部笔记'}</button>
              <button type="button" onClick={exportNotes}>导出学习记录</button>
              <button type="button" onClick={() => dialogRef.current?.showModal()}>重置记录</button>
            </div>
            <p className={styles.small}>记录仅存当前浏览器，不会上传；换浏览器或清除数据前请导出。</p>
          </div>
          <p className={styles.status} role="status" aria-live="polite">{status}</p>

          {showNotes && (
            <section className={styles.chapter}>
              <h2>全部章节笔记</h2>
              {noteCount === 0 ? <p>尚无笔记。</p> : guide.chapters.filter((chapter) => state.notes[chapter.id]?.trim()).map((chapter) => (
                <article key={chapter.id} className={styles.noteSummary}>
                  <h3>{chapter.title}</h3><p>{state.notes[chapter.id]}</p>
                </article>
              ))}
            </section>
          )}

          {guide.chapters.map((chapter) => (
            <section className={styles.chapter} id={chapter.id} key={chapter.id}>
              <div className={styles.chapterHead}>
                <h2>{chapter.title}</h2>
                <button
                  type="button"
                  aria-pressed={state.completed.includes(chapter.id)}
                  onClick={() => save({ ...state, completed: state.completed.includes(chapter.id) ? state.completed.filter((id) => id !== chapter.id) : [...state.completed, chapter.id] })}
                >{state.completed.includes(chapter.id) ? '已完成 ✓ · 撤销' : '标记完成'}</button>
              </div>
              <div
                className={styles.chapterBody}
                dangerouslySetInnerHTML={chapterMarkup[chapter.id]}
                onInput={(event) => {
                  const target = event.target;
                  if (target instanceof HTMLTextAreaElement && target.dataset.note) {
                    save({ ...state, notes: { ...state.notes, [target.dataset.note]: target.value } });
                  }
                }}
              />
            </section>
          ))}

          <section className={styles.chapter} id="quiz">
            <h2>情景测验 · 检查你的判断</h2>
            <div
              className={styles.chapterBody}
              dangerouslySetInnerHTML={quizMarkup}
              onClick={(event) => {
                const target = event.target;
                if (target instanceof HTMLInputElement && target.type === 'radio') {
                  save({ ...state, answers: { ...state.answers, [target.name]: Number(target.value) } });
                }
              }}
              onSubmit={(event) => {
                event.preventDefault();
                const result = guide.quiz.filter((question, index) => state.answers[`q${index}`] === question.a).length;
                setScore(result);
                save({ ...state, best: Math.max(state.best, result), attempts: state.attempts + 1, last: result });
              }}
            />
            {state.attempts > 0 && (
              <div className={styles.quizFeedback} aria-live="polite">
                <strong>本次 {score ?? state.last}/{guide.quiz.length}，已提交 {state.attempts} 次。</strong>
                {guide.quiz.map((question, index) => (
                  <p key={question.q}>{index + 1}. {state.answers[`q${index}`] === undefined ? '未作答' : state.answers[`q${index}`] === question.a ? '正确 ✓' : '需复习 ✕'}。{question.e}</p>
                ))}
              </div>
            )}
          </section>
          <p className={styles.footerNote}>资料核验日期：2026-10-19。进度用于辅助学习，掌握程度以实践证据为准。</p>
        </div>
      </div>
      <dialog ref={dialogRef} className={styles.dialog} aria-labelledby="reset-title">
        <h2 id="reset-title">重置本指南的学习记录？</h2>
        <p>会清除章节进度、笔记和测验成绩。可先取消并导出备份。</p>
        <div className={styles.actions}>
          <button type="button" onClick={() => dialogRef.current?.close()}>取消</button>
          <button type="button" onClick={reset}>确认清除</button>
        </div>
      </dialog>
    </div>
  );
}
