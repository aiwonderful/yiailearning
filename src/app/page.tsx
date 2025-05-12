import Link from 'next/link';
import { getAllPosts } from '../lib/posts';
import PageTitle from '../components/PageTitle';
import PostCard from '../components/PostCard';

export default async function HomePage() {
  const allPosts = await getAllPosts();
  const featuredPosts = allPosts.slice(0, 3); // 取最新的3篇文章作为特色文章
  
  return (
    <div className="max-w-6xl mx-auto">
      {/* 首页横幅 */}
      <div className="relative card overflow-hidden mb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 z-0"></div>
        <div className="relative z-10 p-8 md:p-12 flex flex-col items-start">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            AI学习笔记
          </h1>
          <p className="text-xl md:text-2xl text-secondary mb-6 max-w-2xl leading-relaxed">
            分享我的AI学习经验与笔记，希望能帮助到更多非科班转行的朋友。
          </p>
          <div className="flex flex-wrap gap-4 mt-2">
            <Link 
              href="/posts" 
              className="btn btn-primary"
            >
              浏览所有文章
            </Link>
            <Link 
              href="/roadmap" 
              className="btn btn-secondary"
            >
              查看学习路线
            </Link>
          </div>
        </div>
      </div>
      
      {/* 最新文章 */}
      <div className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-primary">最新文章</h2>
          <Link href="/posts" className="text-primary hover:underline hover:opacity-90 transition-opacity">
            查看全部 →
          </Link>
        </div>
        
        <div className="space-y-8">
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
      </div>
      
      {/* 关于我 */}
      <div className="card p-8 md:p-10">
        <h2 className="text-2xl font-bold mb-6 text-primary">关于本站</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-2">
            <p className="text-secondary mb-4 leading-relaxed">
              我是一位非计算机专业出身的AI学习者，在自学人工智能的过程中整理了这些笔记和资源。从基础的Python编程到深度学习模型实现，这里记录了我的学习历程和心得体会。
            </p>
            <p className="text-secondary mb-4 leading-relaxed">
              作为非科班出身的学习者，我深知在AI领域起步时面临的挑战。这个博客旨在为其他类似背景的学习者提供一个更加友好、实用的学习参考，希望能够帮助更多人顺利进入这个领域。
            </p>
            <p className="mt-6">
              <Link href="/roadmap" className="btn btn-primary">
                查看我的学习路线 →
              </Link>
            </p>
          </div>
          <div className="bg-muted rounded-lg p-6 border border-subtle">
            <h3 className="font-semibold mb-4">学习要点</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span className="text-secondary text-sm">循序渐进，打好基础</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span className="text-secondary text-sm">理论结合实践，多做项目</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span className="text-secondary text-sm">持续学习，跟进最新技术</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span className="text-secondary text-sm">加入社区，互相学习交流</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span className="text-secondary text-sm">保持好奇心和耐心</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 