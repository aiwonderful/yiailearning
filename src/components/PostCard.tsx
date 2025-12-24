"use client"; // PostCard now handles client-side interactions

import React from 'react';
import Link from 'next/link';

type PostCardProps = {
  slug: string;
  title: string;
  date: string;
  tags?: string[];
  excerpt?: string;
  coverImage?: string; // 保留接口兼容性，但不使用
  onTagClick?: (tag: string) => void;
};

export default function PostCard({
  slug,
  title,
  date,
  tags,
  excerpt,
  onTagClick
}: PostCardProps) {

  const formattedDate = new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <article className="group relative flex flex-col p-6 bg-card rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 border border-subtle/50 hover:border-primary/20">
      <div className="flex-1">
        <div className="flex items-center gap-3 text-sm text-secondary/80 mb-3">
          <time dateTime={date} className="font-medium">
            {formattedDate}
          </time>
          {tags && tags.length > 0 && (
            <>
              <span className="w-1 h-1 rounded-full bg-secondary/30" />
              <div className="flex gap-2">
                {tags.slice(0, 2).map(tag => (
                  <span
                    key={tag}
                    className="hover:text-primary transition-colors cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      if (onTagClick) onTagClick(tag);
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>

        <h3 className="text-xl font-bold mb-3 text-primary group-hover:text-primary/80 transition-colors line-clamp-2">
          <Link href={`/posts/${slug}`}>
            <span className="absolute inset-0" />
            {title}
          </Link>
        </h3>

        {excerpt && (
          <p className="text-secondary leading-relaxed line-clamp-3 mb-4">
            {excerpt}
          </p>
        )}
      </div>

      <div className="mt-auto pt-4 flex items-center text-primary font-medium text-sm">
        <span className="group-hover:underline underline-offset-4">阅读全文</span>
        <svg
          className="w-4 h-4 ml-1 transform transition-transform duration-300 group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </article>
  );
}