import type { Metadata } from 'next';
import Link from 'next/link';
import PageTitle from '@/components/PageTitle';

export const metadata: Metadata = {
  title: '我的作品',
  description: '小亦用 AI 辅助开发并持续迭代的真实网站、微信小程序与开源项目。',
};

const websites = [
  {
    title: 'Try Seedance 2 AI',
    domain: 'tryseedance2ai.com',
    description: '我做的 Seedance 2.0 AI 视频生成网站，支持从文字或图片开始生成视频。',
    url: 'https://tryseedance2ai.com',
    tags: ['AI Video', 'Seedance 2.0', '在线网站'],
    featured: true,
  },
  {
    title: 'Blade of Glorp',
    domain: 'bladeofglorp.com',
    description: '一个围绕独特视觉和交互体验展开的网站作品。',
    url: 'https://bladeofglorp.com',
    tags: ['Web Design', 'Interactive', 'Website'],
    featured: false,
  },
  {
    title: 'Maelstrom Rod',
    domain: 'maelstromrod.bladeofglorp.com',
    description: '一个用图文叙事整理主题内容与详细指南的独立子站。',
    url: 'https://maelstromrod.bladeofglorp.com',
    tags: ['Guide', 'Visuals', 'Website'],
    featured: false,
  },
];

const repos = [
  {
    name: 'auto_split_frames',
    description: '自动拆分并处理视频帧的小工具，包含 Base64 输出处理能力。',
    url: 'https://github.com/yestar2023-alt/auto_split_frames',
    language: 'Python',
  },
  {
    name: 'yestar2023-alt',
    description: '我的 GitHub 主页，持续记录用 AI 辅助开发的实验与项目。',
    url: 'https://github.com/yestar2023-alt',
    language: 'GitHub Profile',
  },
];

const miniPrograms = [
  {
    name: '情侣超甜头像',
    category: '头像内容工具',
    status: '已上架',
    description:
      '面向想换情侣头像、找恋爱氛围头像的人，整理适合社交平台使用的头像内容，让选择头像这件小事更轻松。',
    searchHint: '微信内搜索「情侣超甜头像」',
    tags: ['情侣头像', '内容整理', '微信小程序'],
    accent: 'rose',
  },
  {
    name: '早睡打卡鸭',
    category: '习惯打卡工具',
    status: '已上架',
    description:
      '用轻量打卡陪伴早睡习惯养成，适合把睡前目标、连续记录和每日反馈做成一个更容易坚持的小闭环。',
    searchHint: '微信内搜索「早睡打卡鸭」',
    tags: ['早睡计划', '习惯养成', '微信小程序'],
    accent: 'blue',
  },
];

export default function VibeCodingPage() {
  const featuredSite = websites.find((site) => site.featured);
  const otherSites = websites.filter((site) => !site.featured);

  return (
    <div className="space-y-14">
      <section className="rounded-[1.75rem] border border-[#DCE4DD] bg-[#F8F7F2] p-7 shadow-soft md:p-10">
        <div className="max-w-3xl">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#9C563F]">
            Built By Xiaoyi
          </div>
          <PageTitle>我的作品</PageTitle>
          <p className="-mt-4 text-lg leading-8 text-secondary">
            这里放我用 AI 辅助开发、部署并持续迭代的真实项目。它们不是概念展示，而是已经上线、上架或公开可访问的作品。
          </p>
        </div>
      </section>

      {featuredSite && (
        <section className="grid gap-8 rounded-[1.75rem] border border-[#E7D8C8] bg-[#FFFDF8] p-7 shadow-soft md:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#A65A2A]">Latest Website</div>
            <h2 className="mt-3 font-serif text-3xl font-black leading-tight text-[#20242A] md:text-4xl">
              {featuredSite.title}
            </h2>
            <p className="mt-2 text-sm font-semibold text-[#9C563F]">{featuredSite.domain}</p>
            <p className="mt-5 max-w-xl leading-8 text-[#59616B]">{featuredSite.description}</p>
            <a
              href={featuredSite.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mt-7"
            >
              访问网站 <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="relative min-h-[260px] overflow-hidden rounded-xl border border-[#DCE4DD] bg-[#ECEFE8] p-6 md:p-8">
            <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-[#F4A261]/15" />
            <div className="absolute -bottom-16 left-8 h-44 w-44 rounded-full bg-[#7D8F81]/15" />
            <div className="relative flex h-full min-h-[210px] flex-col justify-between">
              <div className="flex items-start justify-between gap-4">
                <span className="rounded-full border border-[#C26A4A]/20 bg-[#FFF7EB] px-3 py-1 text-xs font-bold text-[#A65A2A]">
                  AI VIDEO
                </span>
                <span className="font-serif text-5xl font-black text-[#3F566E]/15">01</span>
              </div>
              <div className="rounded-xl border border-[#E7D8C8] bg-[#FFFDF8]/90 p-5 shadow-soft">
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#4D6254]">Xiaoyi Project</div>
                <div className="mt-3 font-serif text-2xl font-black text-[#20242A]">从想法到可访问的网站</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {featuredSite.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-[#7D8F81]/12 px-3 py-1 text-xs font-semibold text-[#4D6254]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="grid gap-8 rounded-[1.75rem] bg-[#20242A] p-7 text-[#F8F7F2] shadow-soft md:p-10 lg:grid-cols-[0.35fr_1fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F4A261]">
            WeChat Mini Programs
          </div>
          <h2 className="mt-3 font-serif text-3xl font-black leading-tight md:text-4xl">
            已上架的小程序
          </h2>
          <p className="mt-5 leading-8 text-[#D9DED7]">
            这些是我已经做完并上架的微信小程序。它们更偏日常使用场景：一个解决头像选择，一个陪伴习惯打卡。
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {miniPrograms.map((program, index) => (
            <article
              key={program.name}
              className="relative overflow-hidden rounded-2xl border border-[#F8F7F2]/10 bg-[#F8F7F2]/6 p-6 transition-colors hover:border-[#F4A261]/45 hover:bg-[#F8F7F2]/10"
            >
              <span
                className={`absolute -right-3 top-2 font-serif text-7xl font-black ${
                  program.accent === 'rose' ? 'text-[#E84A5F]/16' : 'text-[#2B7FD8]/18'
                }`}
              >
                0{index + 1}
              </span>
              <div className="relative flex min-h-[320px] flex-col">
                <div className="flex flex-wrap items-center gap-3 pr-16">
                  <span className="rounded-full bg-[#F4D758] px-3 py-1 text-xs font-bold text-[#20242A]">
                    {program.status}
                  </span>
                  <span className="rounded-full border border-[#F8F7F2]/12 px-3 py-1 text-xs font-semibold text-[#D9DED7]">
                    {program.category}
                  </span>
                </div>

                <h3 className="mt-7 font-serif text-3xl font-black leading-tight text-[#FFFDF8]">
                  {program.name}
                </h3>
                <p className="mt-5 leading-8 text-[#D9DED7]">{program.description}</p>

                <div className="mt-6 rounded-xl border border-[#F4D758]/25 bg-[#F4D758]/10 p-4">
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#F4D758]">
                    How to Find
                  </div>
                  <p className="mt-2 font-semibold text-[#FFFDF8]">{program.searchHint}</p>
                </div>

                <div className="mt-auto flex flex-wrap gap-2 pt-6">
                  {program.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-[#FFFDF8]/8 px-3 py-1 text-xs font-semibold text-[#D9DED7]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-7 max-w-2xl">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#4D6254]">More Websites</div>
          <h2 className="mt-3 font-serif text-3xl font-black text-[#20242A]">其他已上线的网站</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {otherSites.map((site, index) => (
            <article key={site.url} className="relative overflow-hidden rounded-xl border border-subtle/70 bg-card-light p-6 shadow-soft dark:border-white/10 dark:bg-card-dark">
              <span className="absolute right-4 top-2 font-serif text-6xl font-black text-primary/10">0{index + 2}</span>
              <div className="relative flex h-full flex-col">
                <div className="pr-14">
                  <h3 className="text-xl font-bold text-primary">{site.title}</h3>
                  <p className="mt-2 break-all text-sm font-semibold text-[#9C563F]">{site.domain}</p>
                </div>
                <p className="mt-4 leading-7 text-secondary">{site.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {site.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-[#7D8F81]/12 px-3 py-1 text-xs font-semibold text-[#4D6254]">
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-fit items-center gap-2 font-semibold text-primary transition-colors hover:text-primary-hover"
                >
                  访问网站 <span aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[1.75rem] bg-[#ECEFE8] p-7 md:p-10">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9C563F]">Open Source Notes</div>
            <h2 className="mt-3 font-serif text-3xl font-black text-[#20242A]">GitHub 上的实践</h2>
            <p className="mt-4 leading-8 text-[#59616B]">把开发过程中的小工具、代码实验和可复用的项目留在这里。</p>
          </div>
          <a
            href="https://github.com/yestar2023-alt"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary shrink-0"
          >
            查看 GitHub <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {repos.map((repo) => (
            <a
              key={repo.url}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-[#DCE4DD] bg-[#FFFDF8] p-6 shadow-soft transition-colors hover:border-[#B8955E]/45"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-mono text-lg font-bold text-[#20242A] transition-colors group-hover:text-primary">{repo.name}</h3>
                <span className="shrink-0 rounded-full bg-[#3F566E]/10 px-3 py-1 text-xs font-semibold text-[#3F566E]">{repo.language}</span>
              </div>
              <p className="mt-4 leading-7 text-[#59616B]">{repo.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 font-semibold text-primary">查看项目 <span aria-hidden="true">→</span></span>
            </a>
          ))}
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-[#7D8F81]/20 bg-[#7D8F81]/8 p-7 md:p-10">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <h2 className="font-serif text-3xl font-black text-[#20242A]">开发过程也会写进这里</h2>
            <p className="mt-4 max-w-3xl leading-8 text-[#59616B]">
              除了成品，我也会记录用 Codex、AI 工具和部署服务把一个想法变成网站的过程、卡点和复盘。
            </p>
          </div>
          <Link href="/posts" className="btn btn-primary">查看博客</Link>
        </div>
      </section>
    </div>
  );
}
