import Link from 'next/link';
import { getAllPosts } from '../../lib/posts';
import SearchablePosts from './SearchablePosts';
import PageTitle from '../../components/PageTitle';
import React, { Suspense } from 'react';

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
    </div>
  );
} 