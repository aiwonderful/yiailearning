import Link from 'next/link';
import { getAllPosts } from '../../lib/posts';
import SearchablePosts from './SearchablePosts';
import PageTitle from '../../components/PageTitle';
import React, { Suspense, lazy } from 'react';
import { Loading } from '@/components/Loading';

// 动态导入组件以实现代码分割
const PerformanceStats = lazy(() =>
  import('../../components/PerformanceMonitor').then(mod => ({ default: mod.PerformanceStats }))
);

export default async function BlogIndexPage() {
  const posts = await getAllPosts();
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <PageTitle>博客文章</PageTitle>
        <p className="text-secondary leading-relaxed max-w-2xl">
          分享我的AI学习经验与笔记，希望能帮助到更多非科班转行的朋友。
        </p>
      </div>

      <Suspense fallback={<div className="text-center py-10">加载中...</div>}>
        <SearchablePosts initialPosts={posts} />
      </Suspense>

      {/* 性能监控面板 - 懒加载 */}
      <div className="mt-12">
        <Suspense fallback={<div className="h-32 bg-white dark:bg-gray-800 rounded-lg animate-pulse" />}>
          <PerformanceStats className="max-w-md" />
        </Suspense>
      </div>
    </div>
  );
} 