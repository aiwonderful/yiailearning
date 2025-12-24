'use client';

import React from 'react';
import Link from 'next/link';
import { getRelatedPosts, getRelatedPostsByTags, getPopularPosts } from '@/lib/related-posts';
import { PostMeta } from '@/types';

interface RelatedPostsProps {
  currentPost: PostMeta & { slug: string };
  allPosts: (PostMeta & { slug: string })[];
  limit?: number;
  variant?: 'default' | 'by-tags' | 'popular';
  showReason?: boolean;
  className?: string;
}

export function RelatedPosts({
  currentPost,
  allPosts,
  limit = 5,
  variant = 'default',
  showReason = true,
  className = '',
}: RelatedPostsProps) {
  let relatedPosts;

  switch (variant) {
    case 'by-tags':
      relatedPosts = getRelatedPostsByTags(currentPost, allPosts, 3);
      break;
    case 'popular':
      relatedPosts = getPopularPosts(allPosts, limit);
      break;
    default:
      relatedPosts = getRelatedPosts(currentPost, allPosts, { limit });
      break;
  }

  // 如果是按标签分组显示
  if (variant === 'by-tags' && typeof relatedPosts === 'object') {
    return (
      <div className={className}>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          相关文章
        </h3>

        <div className="space-y-6">
          {Object.entries(relatedPosts).map(([tag, posts]) => (
            <div key={tag} className="space-y-3">
              <h4 className="text-sm font-medium text-blue-600 dark:text-blue-400">
                标签: {tag}
              </h4>

              <div className="grid gap-3">
                {posts.map((post: any) => (
                  <RelatedPostCard
                    key={post.slug}
                    post={post}
                    showReason={showReason}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 如果是数组形式 (普通模式和热门模式)
  if (Array.isArray(relatedPosts) && relatedPosts.length > 0) {
    const title = variant === 'popular' ? '热门文章' : '相关文章';

    return (
      <div className={className}>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {title}
        </h3>

        <div className="grid gap-3">
          {relatedPosts.map((post) => (
            <RelatedPostCard
              key={post.slug}
              post={post}
              showReason={showReason}
            />
          ))}
        </div>
      </div>
    );
  }

  return null;
}

// 相关文章卡片组件
interface RelatedPostCardProps {
  post: PostMeta & {
    slug: string;
    similarity?: number;
    reason?: string;
  };
  showReason?: boolean;
}

function RelatedPostCard({ post, showReason }: RelatedPostCardProps) {
  const similarityPercentage = post.similarity
    ? Math.round(post.similarity * 100)
    : 0;

  return (
    <article className="group">
      <Link
        href={`/posts/${post.slug}`}
        className="block p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all"
      >
        <div className="flex items-start gap-4">
          {/* 缩略图占位 */}
          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex-shrink-0 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-400 dark:text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>

          <div className="flex-1 min-w-0">
            {/* 文章标题 */}
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
              {post.title}
            </h4>

            {/* 文章摘要 */}
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {post.summary || post.excerpt}
            </p>

            <div className="mt-2 flex items-center justify-between">
              {/* 标签 */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded dark:bg-gray-700 dark:text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* 相似度或日期 */}
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {post.similarity ? (
                  <span className="inline-flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    {similarityPercentage}% 匹配
                  </span>
                ) : (
                  new Date(post.date).toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })
                )}
              </div>
            </div>

            {/* 推荐原因 */}
            {showReason && post.reason && post.similarity && (
              <div className="mt-2">
                <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded dark:bg-blue-900 dark:text-blue-200">
                  {post.reason}
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}

// 横向相关文章展示组件
interface RelatedPostsHorizontalProps {
  currentPost: PostMeta & { slug: string };
  allPosts: (PostMeta & { slug: string })[];
  limit?: number;
  className?: string;
}

export function RelatedPostsHorizontal({
  currentPost,
  allPosts,
  limit = 5,
  className = '',
}: RelatedPostsHorizontalProps) {
  const relatedPosts = getRelatedPosts(currentPost, allPosts, { limit });

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        相关文章
      </h3>

      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
        {relatedPosts.map((post) => (
          <article
            key={post.slug}
            className="flex-shrink-0 w-64 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
          >
            <Link href={`/posts/${post.slug}`}>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2">
                {post.title}
              </h4>
              <p className="mt-2 text-xs text-gray-600 dark:text-gray-400 line-clamp-3">
                {post.summary || post.excerpt}
              </p>
              <div className="mt-2 flex items-center gap-1">
                {post.tags?.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="px-1.5 py-0.5 text-xs bg-gray-100 text-gray-700 rounded dark:bg-gray-700 dark:text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

export default RelatedPosts;
