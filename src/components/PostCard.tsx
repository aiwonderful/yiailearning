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
  
  // Format date in Chinese locale
  const formattedDate = new Date(date).toLocaleDateString('zh-CN', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <article className="overflow-hidden rounded-xl bg-card border border-subtle transition-all duration-300 hover:shadow-md hover:translate-y-[-2px] p-6">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold mb-3 text-primary hover:text-primary/90 transition-colors">
          <Link href={`/posts/${slug}`} className="hover:no-underline">
            {title}
          </Link>
        </h2>
        
        <div className="flex items-center mb-4 text-sm">
          <time dateTime={date} className="text-secondary">
            {formattedDate}
          </time>
          
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap ml-4 gap-2">
              {tags.map(tag => (
                <span 
                  key={tag} 
                  className="bg-muted text-secondary text-xs px-2 py-1 rounded-full cursor-pointer 
                           hover:bg-primary/10 hover:text-primary transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onTagClick) {
                      onTagClick(tag);
                    }
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        
        {excerpt && (
          <p className="text-secondary mb-5 line-clamp-3 flex-grow">
            {excerpt}
          </p>
        )}
        
        <Link 
          href={`/posts/${slug}`} 
          className="self-start mt-auto inline-flex items-center text-primary font-medium
                   transition-all duration-200 hover:translate-x-1 group"
        >
          阅读全文 
          <span className="ml-1 transform transition-transform duration-200 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </article>
  );
} 