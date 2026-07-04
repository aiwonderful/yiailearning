import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '../lib/posts';
import PostCard from '../components/PostCard';
import { siteConfig } from '../lib/config';

const focusAreas = [
  {
    label: 'AI Workflow',
    title: 'AI 工作流与工具实践',
    description: '关注 Cursor、Codex、自动化工具和真实使用场景，把复杂工具拆成普通人能跟上的方法。',
  },
  {
    label: 'Agent Loop',
    title: 'Loop Engineering 与 Agent 协作',
    description: '研究如何让 AI 不只是回答问题，而是参与可验证、可复盘、可持续的任务循环。',
  },
  {
    label: 'Knowledge Lab',
    title: '个人知识库与学习资料',
    description: '把 AI 学习、内容创作、资料整理和个人项目连接起来，形成长期可回看的学习资产。',
  },
];

const featuredEntries = [
  {
    title: 'Loop Engineering 学习指南',
    description: '从 Prompt 到可运行的 Agent 循环，系统理解目标、状态、验证和停止条件。',
    href: '/loop-engineer',
  },
  {
    title: '资料库',
    description: '集中放置 AI 工具、学习路线、实践资料和可复用的内容索引。',
    href: '/resources',
  },
  {
    title: 'Vibe Coding',
    description: '记录用 AI 辅助开发、快速验证想法和搭建可展示作品的实践。',
    href: '/vibe-coding',
  },
];

const heroNotes = [
  {
    label: 'Agent Loop',
    title: 'Loop Engineering',
    description: '把目标、状态、验证和停止条件整理成可运行的闭环。',
    href: '/loop-engineer',
  },
  {
    label: 'Knowledge Base',
    title: '资料库',
    description: '把感兴趣的课题先变成资料包，再慢慢沉淀成文章。',
    href: '/resources',
  },
  {
    label: 'Build Log',
    title: 'Vibe Coding',
    description: '记录 AI 辅助开发中的真实尝试、卡点和复盘。',
    href: '/vibe-coding',
  },
];

export default async function HomePage() {
  const allPosts = await getAllPosts();
  const featuredPost = allPosts[0];
  const recentPosts = allPosts.slice(0, 3);
  const tagCount = new Set(allPosts.flatMap((post) => post.meta.tags || [])).size;

  return (
    <div className="space-y-24">
      <section className="overflow-hidden rounded-[1.75rem] border border-[#DCE4DD] bg-[#F8F7F2] p-5 shadow-soft md:p-8 lg:p-10">
        <div className="mb-10 flex flex-col gap-5 rounded-2xl border border-[#E7D8C8] bg-[#FFFDF8]/85 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-5">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-[#F3A164]/35 bg-[#FFF7EB] shadow-soft">
              <Image
                src="/brand/xiaoyi-avatar-v2.png"
                alt="小亦头像"
                width={320}
                height={320}
                priority
                className="h-full w-full object-cover"
              />
            </span>
            <span className="min-w-0">
              <span className="block text-xs font-bold uppercase tracking-[0.16em] text-[#A65A2A]">Xiaoyi</span>
              <span className="block truncate font-serif text-xl font-black text-[#20242A]">小亦的 AI 学习实验室</span>
            </span>
          </Link>

          <nav aria-label="首页导航" className="flex gap-2 overflow-x-auto md:justify-end">
            {siteConfig.navigation.map((item) => (
              <Link
                key={`hero-${item.name}`}
                href={item.href}
                className="shrink-0 rounded-full px-3 py-2 text-sm font-semibold text-[#59616B] transition-colors hover:bg-[#F4A261]/12 hover:text-[#A65A2A]"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="space-y-8">
            <div className="max-w-xl text-sm leading-6 text-[#59616B]">
              <span className="font-semibold text-[#20242A]">用真实项目记录 AI 工具、Agent 工作流和知识管理。</span>
              <span className="ml-2 text-[#A65A2A]">持续更新</span>
            </div>

            <div className="space-y-5">
              <h1 className="max-w-4xl text-balance font-serif text-4xl font-black leading-tight text-[#20242A] md:text-6xl">
                我是小亦，记录 AI 工具、Agent 工作流和个人知识管理的真实实践。
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[#59616B]">
                这里是我的公开学习实验室：不追逐宏大叙事，只记录我如何使用 AI、理解新工具、搭建工作流，并把学习过程变成可复用的经验。
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/loop-engineer" className="btn btn-primary px-6 py-3 text-base">
                学习 Loop Engineering
                <span aria-hidden="true">→</span>
              </Link>
              <Link href="/resources" className="btn btn-secondary px-6 py-3 text-base">
                查看资料库
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-[#6E7F91]/15 bg-[#6E7F91]/8 p-4">
                <div className="text-sm text-[#59616B]">已发布内容</div>
                <div className="mt-2 text-3xl font-black text-[#3F566E]">{allPosts.length}</div>
              </div>
              <div className="rounded-xl border border-[#7D8F81]/20 bg-[#7D8F81]/10 p-4">
                <div className="text-sm text-[#59616B]">覆盖标签</div>
                <div className="mt-2 text-3xl font-black text-[#20242A]">{tagCount}</div>
              </div>
              <div className="rounded-xl border border-[#C26A4A]/15 bg-[#C26A4A]/8 p-4">
                <div className="text-sm text-[#59616B]">最近更新</div>
                <div className="mt-2 text-lg font-bold text-[#9C563F]">
                  {featuredPost
                    ? new Date(featuredPost.meta.date).toLocaleDateString('zh-CN', {
                        month: 'long',
                        day: 'numeric',
                      })
                    : '暂无'}
                </div>
              </div>
            </div>
          </div>

          <div className="relative min-h-[420px] overflow-hidden rounded-[1.25rem] border border-[#E7D8C8] bg-[#FFFDF8] p-5">
            <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#F4A261]/15" />
            <div className="absolute -bottom-20 left-12 h-52 w-52 rounded-full bg-[#7D8F81]/12" />

            <div className="relative flex h-full min-h-[380px] flex-col justify-between">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#A65A2A]">
                    Xiaoyi Desk
                  </div>
                  <h2 className="mt-3 max-w-sm font-serif text-3xl font-black leading-tight text-[#20242A]">
                    今天把一个课题整理成可以继续推进的材料。
                  </h2>
                </div>
                <div className="hidden h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-[#F3A164]/35 bg-[#FFF7EB] shadow-soft sm:block">
                  <Image
                    src="/brand/xiaoyi-avatar-v2.png"
                    alt="小亦头像"
                    width={320}
                    height={320}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="mt-8 space-y-3">
                {heroNotes.map((note, index) => (
                  <Link
                    key={note.href}
                    href={note.href}
                    className="group grid grid-cols-[42px_1fr] gap-4 rounded-2xl border border-[#E7D8C8] bg-[#F8F7F2]/88 p-4 shadow-soft transition-colors hover:border-[#F3A164]/55 hover:bg-[#FFF7EB]"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#20242A] font-serif text-lg font-black text-[#FFFDF8]">
                      {index + 1}
                    </span>
                    <span>
                      <span className="block text-xs font-bold uppercase tracking-[0.16em] text-[#A65A2A]">
                        {note.label}
                      </span>
                      <span className="mt-1 block text-lg font-bold text-[#20242A]">{note.title}</span>
                      <span className="mt-1 block text-sm leading-6 text-[#59616B]">{note.description}</span>
                    </span>
                  </Link>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-[#7D8F81]/20 bg-[#7D8F81]/10 p-4 text-sm leading-6 text-[#4D6254]">
                这里不是展示“AI 很厉害”，而是记录我怎样把 AI 用进学习、写作、开发和个人知识库。
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-[0.36fr_1fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#4D6254]">Focus Areas</div>
          <h2 className="mt-3 font-serif text-3xl font-black leading-tight text-[#20242A] md:text-4xl">
            我长期关注的三个方向
          </h2>
          <p className="mt-5 leading-8 text-[#59616B]">
            这些内容面向同样想用 AI 提升学习、创作和开发效率的人。重点不是炫技，而是把真实过程讲清楚。
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {focusAreas.map((area, index) => (
            <article key={area.title} className="relative overflow-hidden rounded-xl border border-subtle/70 bg-card-light p-6 shadow-soft dark:border-white/10 dark:bg-card-dark">
              <span className="absolute right-4 top-2 font-serif text-6xl font-black text-primary/10">
                0{index + 1}
              </span>
              <div className="relative">
                <span className="inline-flex rounded-full bg-[#7D8F81]/12 px-3 py-1 text-xs font-bold text-[#4D6254]">
                  {area.label}
                </span>
                <h3 className="mt-5 text-xl font-bold text-primary">{area.title}</h3>
                <p className="mt-4 leading-7 text-secondary">{area.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[1.75rem] bg-[#20242A] px-7 py-10 text-[#F8F7F2] shadow-soft md:px-10">
        <div className="mb-8 max-w-2xl">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#B9C3AC]">Start Here</div>
          <h2 className="mt-3 font-serif text-3xl font-black leading-tight md:text-4xl">
            可以从这些入口开始了解我在研究什么
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {featuredEntries.map((entry) => (
            <Link
              key={entry.href}
              href={entry.href}
              className="rounded-xl border border-[#F8F7F2]/10 bg-[#F8F7F2]/6 p-5 transition-colors hover:border-[#B9C3AC]/45 hover:bg-[#F8F7F2]/10"
            >
              <h3 className="font-bold text-[#F8F7F2]">{entry.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#D9DED7]">{entry.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#4D6254]">Latest Notes</div>
            <h2 className="mt-3 font-serif text-3xl font-black text-[#20242A] md:text-4xl">最近更新</h2>
            <p className="mt-3 text-secondary">我最近公开记录的 AI 学习、工具使用和项目实践。</p>
          </div>
          <Link href="/posts" className="btn btn-secondary">
            查看全部文章
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {recentPosts.map((post) => (
            <PostCard
              key={post.slug}
              slug={post.slug}
              title={post.meta.title}
              date={post.meta.date}
              tags={post.meta.tags}
              excerpt={post.meta.excerpt}
            />
          ))}
        </div>
      </section>

      {featuredPost && (
        <section className="grid gap-8 rounded-[1.75rem] border border-[#DCE4DD] bg-[#ECEFE8] p-7 md:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9C563F]">Featured Note</div>
            <h2 className="mt-3 font-serif text-3xl font-black leading-tight text-[#20242A] md:text-4xl">
              当前推荐阅读
            </h2>
            <p className="mt-5 leading-8 text-[#59616B]">
              如果你是第一次来到这里，可以先读这篇文章，再继续浏览资料库和专题页面。
            </p>
          </div>

          <Link href={`/posts/${featuredPost.slug}`} className="rounded-xl bg-[#F8F7F2] p-6 shadow-soft transition-transform hover:-translate-y-1">
            <div className="text-sm font-semibold text-[#4D6254]">
              {new Date(featuredPost.meta.date).toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
            <h3 className="mt-4 text-2xl font-bold leading-snug text-[#20242A]">{featuredPost.meta.title}</h3>
            {featuredPost.meta.excerpt && (
              <p className="mt-4 leading-7 text-[#59616B]">{featuredPost.meta.excerpt}</p>
            )}
            <span className="mt-6 inline-flex font-semibold text-primary">
              开始阅读 <span aria-hidden="true">→</span>
            </span>
          </Link>
        </section>
      )}
    </div>
  );
}
