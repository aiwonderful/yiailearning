'use client';

import { useEffect, useRef } from 'react';
import styles from './tutorial.module.css';

const DURATION = 30;

const CHAPTERS = [
  { id: 'sky', label: '天空', range: '30–23 秒', test: (t: number) => t >= 23 },
  { id: 'terrace', label: '露台', range: '23–18.5', test: (t: number) => t >= 18.5 },
  { id: 'inside', label: '室内', range: '18.5–16', test: (t: number) => t >= 16 },
  { id: 'house', label: '房子', range: '16–10', test: (t: number) => t >= 10 },
  { id: 'model', label: '白模', range: '10–3', test: (t: number) => t >= 3 },
  { id: 'plan', label: '平面图', range: '3–0', test: () => true },
];

function chapterAt(time: number) {
  return CHAPTERS.find((chapter) => chapter.test(time)) ?? CHAPTERS[CHAPTERS.length - 1];
}

function clock(time: number) {
  const clamped = Math.max(0, Math.min(DURATION, time));
  const whole = Math.floor(clamped);
  const tenth = Math.min(9, Math.floor((clamped - whole) * 10));
  return `00:${String(whole).padStart(2, '0')}.${tenth}`;
}

function drawFrame(ctx: CanvasRenderingContext2D, width: number, height: number, time: number) {
  const t = Math.max(0, Math.min(DURATION, time));
  ctx.clearRect(0, 0, width, height);

  if (t < 4) drawPlan(ctx, width, height);
  else if (t < 10) drawModel(ctx, width, height, (t - 4) / 6);
  else if (t < 13) drawHouse(ctx, width, height, (t - 10) / 3);
  else if (t < 20) drawInterior(ctx, width, height, (t - 13) / 7);
  else if (t < 25) drawTerrace(ctx, width, height, (t - 20) / 5);
  else drawAerial(ctx, width, height, (t - 25) / 5);

  ctx.fillStyle = 'rgba(22,21,19,0.78)';
  ctx.fillRect(12, height - 36, 132, 24);
  ctx.fillStyle = '#f8f6ec';
  ctx.font = '12px sans-serif';
  ctx.fillText('示意 · 不是原片', 22, height - 20);
}

function drawPlan(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.fillStyle = '#3a291f';
  ctx.fillRect(0, 0, width, height);
  const x = width * 0.2;
  const y = height * 0.12;
  const planWidth = width * 0.6;
  const planHeight = height * 0.7;
  ctx.fillStyle = '#f7f3ea';
  ctx.fillRect(x, y, planWidth, planHeight);
  ctx.strokeStyle = '#161513';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(x + 14, y + 14, planWidth - 28, planHeight - 28);
  ctx.beginPath();
  ctx.moveTo(x + planWidth * 0.56, y + 14);
  ctx.lineTo(x + planWidth * 0.56, y + planHeight - 14);
  ctx.moveTo(x + 14, y + planHeight * 0.62);
  ctx.lineTo(x + planWidth * 0.56, y + planHeight * 0.62);
  ctx.stroke();
  ctx.strokeStyle = '#3d6d78';
  ctx.strokeRect(x + planWidth * 0.72, y + planHeight * 0.18, planWidth * 0.16, planHeight * 0.64);
}

function drawModel(ctx: CanvasRenderingContext2D, width: number, height: number, progress: number) {
  ctx.fillStyle = '#d9d3c6';
  ctx.fillRect(0, 0, width, height);
  const rise = 40 + progress * (height * 0.34);
  const x = width * 0.28;
  const y = height * 0.62 - rise;
  ctx.fillStyle = '#f4f1ea';
  ctx.fillRect(x, y, width * 0.44, rise);
  ctx.fillStyle = '#e7e1d6';
  ctx.fillRect(x + width * 0.08, y - rise * 0.28, width * 0.24, rise * 0.28);
  ctx.strokeStyle = '#161513';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(x, y, width * 0.44, rise);
}

function drawHouse(ctx: CanvasRenderingContext2D, width: number, height: number, progress: number) {
  const sky = ctx.createLinearGradient(0, 0, 0, height);
  sky.addColorStop(0, '#f3d7a4');
  sky.addColorStop(1, '#c9d3bf');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = '#7d8f6e';
  ctx.fillRect(0, height * 0.72, width, height * 0.28);
  const x = width * 0.22;
  const y = height * 0.34;
  const glass = `rgba(90,110,112,${0.35 + progress * 0.55})`;
  ctx.fillStyle = glass;
  ctx.fillRect(x, y, width * 0.56, height * 0.38);
  ctx.fillStyle = `rgba(156,107,60,${progress})`;
  ctx.fillRect(x + width * 0.1, y - height * 0.16, width * 0.3, height * 0.16);
  ctx.fillStyle = '#9bb0b4';
  ctx.fillRect(x + width * 0.5, height * 0.58, width * 0.22, height * 0.08);
}

function drawInterior(ctx: CanvasRenderingContext2D, width: number, height: number, progress: number) {
  ctx.fillStyle = '#e7d7be';
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = '#c4a27a';
  ctx.fillRect(0, 0, width, height * 0.16);
  ctx.fillStyle = '#d8d2c6';
  ctx.fillRect(0, height * 0.78, width, height * 0.22);
  ctx.fillStyle = '#f3efe6';
  ctx.fillRect(width * (0.12 + progress * 0.08), height * 0.52, width * 0.28, height * 0.2);
  ctx.fillStyle = '#9c6b3c';
  ctx.fillRect(width * 0.52, height * 0.48, width * 0.3, height * 0.08);
  ctx.fillStyle = '#161513';
  for (let i = 0; i < 4; i += 1) {
    ctx.fillRect(width * (0.56 + i * 0.06), height * 0.28, 2, height * 0.18);
  }
}

function drawTerrace(ctx: CanvasRenderingContext2D, width: number, height: number, progress: number) {
  const sky = ctx.createLinearGradient(0, 0, 0, height);
  sky.addColorStop(0, '#f0d2a0');
  sky.addColorStop(1, '#d5dece');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = '#e6e0d4';
  ctx.fillRect(0, height * 0.62, width, height * 0.38);
  ctx.fillStyle = '#6f93a0';
  ctx.fillRect(width * 0.46, height * (0.66 - progress * 0.04), width * 0.42, height * 0.12);
  ctx.fillStyle = '#8aa4a6';
  ctx.fillRect(width * 0.08, height * 0.28, width * 0.34, height * 0.34);
  ctx.fillStyle = '#9c6b3c';
  ctx.fillRect(width * 0.14, height * 0.18, width * 0.2, height * 0.1);
}

function drawAerial(ctx: CanvasRenderingContext2D, width: number, height: number, progress: number) {
  const sky = ctx.createLinearGradient(0, 0, 0, height);
  sky.addColorStop(0, '#e7c98a');
  sky.addColorStop(0.55, '#b9c7be');
  sky.addColorStop(1, '#6d8a62');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, width, height);
  const scale = 1 - progress * 0.35;
  const houseWidth = width * 0.28 * scale;
  const houseHeight = height * 0.16 * scale;
  const x = width * 0.36;
  const y = height * (0.42 + progress * 0.08);
  ctx.fillStyle = '#d7dde0';
  ctx.fillRect(x, y, houseWidth, houseHeight);
  ctx.fillStyle = '#9c6b3c';
  ctx.fillRect(x + houseWidth * 0.18, y - houseHeight * 0.45, houseWidth * 0.5, houseHeight * 0.45);
  ctx.fillStyle = '#6f93a0';
  ctx.fillRect(x + houseWidth + 8, y + houseHeight * 0.2, houseWidth * 0.7, houseHeight * 0.35);
  ctx.fillStyle = '#2f4a32';
  ctx.beginPath();
  ctx.arc(width * 0.18, height * 0.58, 18 + progress * 10, 0, Math.PI * 2);
  ctx.arc(width * 0.78, height * 0.7, 22, 0, Math.PI * 2);
  ctx.fill();
}

export default function ScrubDemo() {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const clockRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let shown = DURATION;
    let frame = 0;
    let alive = true;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(width * ratio));
      canvas.height = Math.max(1, Math.floor(height * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const paint = (time: number) => {
      drawFrame(context, canvas.clientWidth, canvas.clientHeight, time);
      const chapter = chapterAt(time);
      if (clockRef.current) {
        clockRef.current.textContent = `${clock(time)} · ${chapter.label}`;
      }
      stage.querySelectorAll<HTMLElement>('[data-chapter]').forEach((item) => {
        item.dataset.active = item.dataset.chapter === chapter.id ? 'true' : 'false';
      });
    };

    resize();
    paint(DURATION);
    const observer = new ResizeObserver(() => {
      resize();
      paint(shown);
    });
    observer.observe(canvas);

    if (reduced) {
      return () => {
        alive = false;
        observer.disconnect();
      };
    }

    const tick = () => {
      if (!alive) return;
      const max = stage.scrollHeight - stage.clientHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, stage.scrollTop / max)) : 0;
      const target = DURATION * (1 - progress);
      shown += (target - shown) * 0.14;
      if (Math.abs(target - shown) < 0.02) shown = target;
      paint(shown);
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);

    return () => {
      alive = false;
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className={styles.demo}>
      <div
        className={styles.demoStage}
        ref={stageRef}
        tabIndex={0}
        aria-label="在这个框里滚动。示意从片尾的天空倒回片头的平面图，不是 Meng To 的影片。"
      >
        <div className={styles.demoSpacer} />
      </div>
      <div className={styles.demoHud}>
        <canvas ref={canvasRef} className={styles.demoCanvas} aria-hidden="true" />
        <div className={styles.demoReadout}>
          <p ref={clockRef}>00:30.0 · 天空</p>
          <p>在框内滚动</p>
          <ol>
            {CHAPTERS.map((chapter) => (
              <li key={chapter.id} data-chapter={chapter.id} data-active={chapter.id === 'sky' ? 'true' : 'false'}>
                <span>{chapter.label}</span>
                <span>{chapter.range}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
