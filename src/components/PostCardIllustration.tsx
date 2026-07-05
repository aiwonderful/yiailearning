'use client';

import Image from 'next/image';

type PostCardIllustrationProps = {
  tag: string;
  title: string;
};

const coverThemes = [
  {
    bg: 'from-[#FFF7EB] via-[#F8F7F2] to-[#EAF0E8]',
    accent: '#F4A261',
    ink: '#20242A',
    soft: '#FFFDF8',
    muted: '#7D8F81',
  },
  {
    bg: 'from-[#F8F7F2] via-[#EEF4EA] to-[#FFF7EB]',
    accent: '#7D8F81',
    ink: '#20242A',
    soft: '#FFFDF8',
    muted: '#C26A4A',
  },
  {
    bg: 'from-[#FFFDF8] via-[#F3ECE4] to-[#EAF0E8]',
    accent: '#C26A4A',
    ink: '#20242A',
    soft: '#FFFDF8',
    muted: '#F4A261',
  },
];

export default function PostCardIllustration({ tag, title }: PostCardIllustrationProps) {
  const seed = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const theme = coverThemes[seed % coverThemes.length];

  return (
    <div className={`relative h-full w-full overflow-hidden bg-gradient-to-br ${theme.bg} p-4`}>
      <div
        className="absolute -right-9 -top-10 h-28 w-28 rounded-full opacity-[0.18]"
        style={{ backgroundColor: theme.accent }}
      />
      <div
        className="absolute -bottom-12 left-5 h-28 w-28 rounded-full opacity-[0.16]"
        style={{ backgroundColor: theme.muted }}
      />

      <svg
        viewBox="0 0 320 150"
        className="absolute inset-0 h-full w-full"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M34 112 C80 64 116 132 164 78 C205 32 235 90 288 45"
          stroke={theme.accent}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="7 8"
          opacity="0.28"
        />
        <path
          d="M42 42 C74 32 94 44 116 30"
          stroke={theme.ink}
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.16"
        />
        <path
          d="M236 118 C258 103 273 109 292 94"
          stroke={theme.ink}
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.16"
        />
      </svg>

      <div className="relative z-10 flex h-full min-h-0 flex-col justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-[#FFFDF8] bg-[#FFF7EB] shadow-soft">
            <Image
              src="/brand/xiaoyi-avatar-v2.png"
              alt=""
              width={320}
              height={320}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="min-w-0 rounded-full border border-[#E7D8C8] bg-[#FFFDF8]/90 px-4 py-2 shadow-sm">
            <div className="truncate text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: theme.accent }}>
              Xiaoyi Note
            </div>
            <div className="mt-0.5 max-w-[11rem] truncate text-xs font-semibold text-[#59616B]">
              {tag}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[8px_1fr] overflow-hidden rounded-2xl border border-[#E7D8C8] bg-[#FFFDF8]/[0.92] shadow-soft">
          <div style={{ backgroundColor: theme.accent }} />
          <div className="min-w-0 px-4 py-3">
            <div className="text-xs font-bold tracking-[0.18em] text-[#A65A2A]">
              小亦的学习卡片
            </div>
            <div className="mt-1 truncate text-sm font-semibold text-[#20242A]">
              AI 工具 · Agent 工作流 · 真实项目记录
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
