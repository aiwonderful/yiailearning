import Link from 'next/link';
import { getPostSlugs, getPostBySlug } from '../../../lib/posts';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { siteConfig } from '../../../lib/config';
import Breadcrumb from '../../../components/Breadcrumb';
import { AuthorCard } from '../../../components/AuthorSchema';

type Heading = {
  id: string;
  text: string;
  level: number;
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const post = await getPostBySlug(params.slug);
    const url = `${siteConfig.url}/posts/${params.slug}`;
    
    return {
      title: post.meta.title,
      description: post.meta.excerpt || post.meta.summary || siteConfig.description,
      keywords: post.meta.tags?.join(', '),
      authors: [{ name: 'Yi Learning' }],
      openGraph: {
        title: post.meta.title,
        description: post.meta.excerpt || post.meta.summary || siteConfig.description,
        url: url,
        siteName: siteConfig.title,
        images: [
          {
            url: '/og-image.jpg',
            width: 1200,
            height: 630,
            alt: post.meta.title,
          }
        ],
        locale: 'zh_CN',
        type: 'article',
        publishedTime: post.meta.date,
        tags: post.meta.tags,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.meta.title,
        description: post.meta.excerpt || post.meta.summary || siteConfig.description,
        images: ['/og-image.jpg'],
      },
      alternates: {
        canonical: url,
      },
    };
  } catch (error) {
    return {
      title: 'Post Not Found',
      description: 'The requested post could not be found.',
    };
  }
}

// 从HTML内容中提取目录
function extractTableOfContents(content: string): Heading[] {
  const headingRegex = /<h([2-3]) id="([^"]+)">(.+?)<\/h[2-3]>/g;
  const headings: Heading[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    headings.push({
      level: parseInt(match[1]),
      id: match[2],
      text: match[3].replace(/<[^>]+>/g, '') // 移除内部HTML标签
    });
  }

  return headings;
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map(slug => ({ slug: slug.replace(/\.md$/, '') }));
}

export default async function Post({ params }: { params: { slug: string } }) {
  try {
    const post = await getPostBySlug(params.slug);
    const toc = extractTableOfContents(post.content);

    // 面包屑导航数据
    const breadcrumbItems = [
      { name: '文章', href: '/posts' },
      { name: post.meta.title, href: `/posts/${params.slug}`, current: true }
    ];

    // 作者信息
    const authorInfo = {
      name: "Yi Learning",
      description: "专注AI学习分享的博主，致力于帮助更多人进入人工智能领域",
      url: siteConfig.url,
      image: "/author-avatar.jpg",
      jobTitle: "AI学习博主",
      sameAs: [
        "https://github.com/yourusername",
        "https://twitter.com/yourusername"
      ]
    };

    return (
      <div className="max-w-5xl mx-auto">
        {/* 面包屑导航 */}
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* 主内容区 */}
          <div className="md:w-3/4">
            <article className="card p-8">
              <header className="mb-10">
                <h1 className="text-3xl font-bold mb-4 text-primary">{post.meta.title}</h1>
                <div className="flex flex-wrap items-center mb-4">
                  <p className="text-secondary">
                    {new Date(post.meta.date).toLocaleDateString('zh-CN', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                  {post.meta.tags && post.meta.tags.length > 0 && (
                    <div className="flex ml-4 space-x-2">
                      {post.meta.tags.map(tag => (
                        <Link 
                          key={tag} 
                          href={`/posts?tag=${tag}`}
                          className="bg-muted text-secondary text-xs px-2 py-1 rounded-full hover:bg-primary hover:bg-opacity-10 transition-colors"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </header>

              <div 
                className="prose prose-lg max-w-none prose-headings:text-primary prose-a:text-primary prose-strong:text-secondary prose-li:text-secondary prose-p:text-secondary prose-blockquote:text-secondary prose-blockquote:border-primary"
                dangerouslySetInnerHTML={{ __html: post.content }} 
              />

              {/* 结构化数据 */}
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BlogPosting",
                    "headline": post.meta.title,
                    "description": post.meta.excerpt || post.meta.summary,
                    "image": `${siteConfig.url}/og-image.jpg`,
                    "datePublished": post.meta.date,
                    "dateModified": post.meta.date,
                    "author": {
                      "@type": "Person",
                      "name": "Yi Learning"
                    },
                    "publisher": {
                      "@type": "Organization",
                      "name": siteConfig.title,
                      "logo": {
                        "@type": "ImageObject",
                        "url": `${siteConfig.url}/logo.png`
                      }
                    },
                    "mainEntityOfPage": {
                      "@type": "WebPage",
                      "@id": `${siteConfig.url}/posts/${params.slug}`
                    },
                    "keywords": post.meta.tags?.join(', '),
                    "articleSection": "AI学习",
                    "inLanguage": "zh-CN"
                  })
                }}
              />

              {/* 作者信息 */}
              <div className="mt-10 pt-8 border-t border-subtle">
                <AuthorCard author={authorInfo} />
              </div>

              <div className="mt-6 pt-6 border-t border-subtle">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary">分享这篇文章</span>
                  <div className="flex space-x-4">
                    <button className="text-secondary hover:text-primary transition-colors duration-200">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22,4.6c-0.8,0.3-1.6,0.6-2.5,0.7c0.9-0.5,1.6-1.4,1.9-2.4c-0.8,0.5-1.8,0.9-2.7,1.1C18,3.2,16.8,2.6,15.5,2.6 c-2.4,0-4.3,2-4.3,4.3c0,0.3,0,0.7,0.1,1C7.9,7.7,5,5.9,3,3.2C2.6,3.9,2.4,4.6,2.4,5.4c0,1.5,0.8,2.8,1.9,3.6 c-0.7,0-1.4-0.2-2-0.5v0.1c0,2.1,1.5,3.8,3.5,4.2c-0.4,0.1-0.8,0.2-1.2,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,1.7,2.2,3,4.1,3 c-1.5,1.2-3.4,1.9-5.5,1.9c-0.4,0-0.7,0-1.1-0.1c2,1.3,4.3,2,6.8,2c8.1,0,12.6-6.7,12.6-12.6c0-0.2,0-0.4,0-0.6 C20.6,6.2,21.4,5.5,22,4.6z" />
                      </svg>
                    </button>
                    <button className="text-secondary hover:text-primary transition-colors duration-200">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6 c0,0,1.4,0,2.8,1.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4 c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3 C22,6.1,16.9,1.4,10.9,2.1z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* 侧边栏 */}
          <div className="md:w-1/4">
            <div className="sticky top-8">
              {/* 目录 */}
              {toc.length > 0 && (
                <div className="card p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-text">文章目录</h3>
                  <nav>
                    <ul className="space-y-2">
                      {toc.map((heading) => (
                        <li 
                          key={heading.id} 
                          className={`${heading.level === 3 ? 'ml-4' : ''}`}
                        >
                          <a 
                            href={`#${heading.id}`} 
                            className="text-text hover:text-primary/80 transition-colors duration-200"
                          >
                            {heading.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              )}
              
              {/* 标签云 */}
              {post.meta.tags && post.meta.tags.length > 0 && (
                <div className="card p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-primary">文章标签</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.meta.tags.map(tag => (
                      <Link 
                        key={tag} 
                        href={`/posts?tag=${tag}`}
                        className="bg-muted text-secondary text-sm px-3 py-1 rounded-full hover:bg-primary hover:bg-opacity-10 transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              
              {/* 相关推荐 */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold mb-4 text-primary">精选内容</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/roadmap" className="text-secondary hover:text-primary transition-colors duration-200">
                      AI学习路线图
                    </Link>
                  </li>
                  <li>
                    <Link href="/resources" className="text-secondary hover:text-primary transition-colors duration-200">
                      AI学习资源导航
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return notFound();
  }
} 