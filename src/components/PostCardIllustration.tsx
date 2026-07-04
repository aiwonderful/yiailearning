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
  },
  {
    bg: 'from-[#F8F7F2] via-[#EEF4EA] to-[#FFF7EB]',
    accent: '#7D8F81',
    ink: '#20242A',
    soft: '#FFFDF8',
  },
  {
    bg: 'from-[#FFFDF8] via-[#F3ECE4] to-[#EAF0E8]',
    accent: '#C26A4A',
    ink: '#20242A',
    soft: '#FFFDF8',
  },
];

export default function PostCardIllustration({ tag, title }: PostCardIllustrationProps) {
  const seed = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const theme = coverThemes[seed % coverThemes.length];
  const shortTitle = title.length > 22 ? `${title.slice(0, 22)}...` : title;

  return (
    <div className={`relative h-full w-full overflow-hidden bg-gradient-to-br ${theme.bg}`}>
      <div
        className="absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-20"
        style={{ backgroundColor: theme.accent }}
      />
      <div
        className="absolute -bottom-10 left-8 h-24 w-24 rounded-full opacity-15"
        style={{ backgroundColor: theme.accent }}
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

      <div className="absolute left-5 top-5 flex items-center gap-3">
        <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-white bg-[#FFF7EB] shadow-soft">
          <Image
            src="/brand/xiaoyi-avatar-v2.png"
            alt=""
            width={320}
            height={320}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="rounded-2xl border border-white/80 bg-white/75 px-3 py-2 shadow-sm backdrop-blur">
          <div className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: theme.accent }}>
            Xiaoyi Note
          </div>
          <div className="mt-0.5 text-xs font-semibold text-[#59616B]">{tag}</div>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 w-[58%] rounded-2xl border border-white/80 bg-white/82 p-4 shadow-soft backdrop-blur">
        <div className="mb-2 flex gap-1">
          <span className="h-1.5 w-8 rounded-full" style={{ backgroundColor: theme.accent }} />
          <span className="h-1.5 w-3 rounded-full bg-[#20242A]/18" />
          <span className="h-1.5 w-3 rounded-full bg-[#20242A]/12" />
        </div>
        <div className="line-clamp-2 text-sm font-bold leading-5 text-[#20242A]">
          {shortTitle}
        </div>
      </div>
    </div>
  );
}
