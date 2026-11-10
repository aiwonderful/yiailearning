import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '没有找到这个页面',
  description: '这个地址没有对应的内容。可以回到首页，或从文章库继续看。',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  openGraph: {
    title: '没有找到这个页面',
    description: '这个地址没有对应的内容。可以回到首页，或从文章库继续看。',
  },
};

export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl rounded-[1.75rem] border border-subtle/70 bg-card-light p-8 shadow-soft dark:border-white/10 dark:bg-card-dark md:p-12">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">404</p>
      <h1 className="mt-4 font-serif text-4xl font-black leading-tight text-text-main-light dark:text-text-main-dark md:text-5xl">
        没有找到这个页面
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-8 text-secondary dark:text-muted">
        这个地址没有对应的内容。可以回到首页，或从文章库看看已经写好的文章。
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="btn btn-primary">
          回到首页
        </Link>
        <Link href="/posts" className="btn btn-secondary">
          查看文章库
        </Link>
        <Link href="/resources" className="btn btn-ghost">
          去资料库
        </Link>
      </div>
    </section>
  );
}
