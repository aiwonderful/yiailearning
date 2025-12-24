import Link from 'next/link';
import { getAllPosts } from '../lib/posts';
import PageTitle from '../components/PageTitle';
import PostCard from '../components/PostCard';

export default async function HomePage() {
  const allPosts = await getAllPosts();
  const featuredPosts = allPosts.slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto space-y-24">
      {/* Hero Section */}
      <section className="text-center py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10" />
        <div className="relative z-10 space-y-8 max-w-3xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            AI 学习笔记
          </h1>
          <p className="text-xl md:text-2xl text-secondary leading-relaxed font-light">
            探索人工智能的无限可能。分享非科班视角的学习心得，从基础理论到实战应用的完整记录。
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link
              href="/posts"
              className="btn btn-primary text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-primary/25 hover:-translate-y-1 transition-all duration-300"
            >
              开始阅读
            </Link>
            <a
              href="https://github.com/yestar2023-alt"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary text-lg px-8 py-3 rounded-full bg-white dark:bg-gray-800 border border-subtle dark:border-gray-700 hover:bg-muted dark:hover:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <section>
        <div className="flex justify-between items-end mb-12 px-4">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-2">最新文章</h2>
            <p className="text-secondary">记录学习路上的点点滴滴</p>
          </div>
          <Link href="/posts" className="text-primary font-medium hover:text-primary/80 transition-colors flex items-center gap-1 group">
            查看全部
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {featuredPosts.map((post) => (
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

      {/* About Section */}
      <section className="bg-muted/50 rounded-3xl p-8 md:p-16 text-center md:text-left">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-primary">关于本站</h2>
            <p className="text-secondary text-lg leading-relaxed">
              我是一个非科班出身的 AI 爱好者，主要专注于 Cursor 等 AI 编程工具以及 Agent 网站开发。这里记录了我在 Vibe Coding 路上的探索与实践。
            </p>
            <p className="text-secondary text-lg leading-relaxed">
              无论你是想了解如何用 AI 工具提升开发效率，还是对 AI Agent 应用感兴趣，希望这些心得能给你一些启发。让我们一起拥抱 AI 时代的新型开发方式！
            </p>
            <div className="pt-4">
              <Link href="/about" className="text-primary font-medium hover:underline underline-offset-4">
                了解更多关于我的故事 →
              </Link>
            </div>
          </div>
          <div className="bg-white dark:bg-card-dark p-8 rounded-2xl shadow-sm border border-subtle/50 dark:border-gray-700">
            <h3 className="font-semibold text-xl mb-6 text-primary">内容方向</h3>
            <ul className="space-y-4 text-secondary">
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">🎨</span>
                <span>Vibe Coding 实践与心得</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">🤖</span>
                <span>AI Agent 开发与应用</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">🛠️</span>
                <span>Cursor 等 AI 工具使用技巧</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">💡</span>
                <span>非科班学习 AI 开发的经验</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}