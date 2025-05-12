"use client";

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import PostCard from '../../components/PostCard';

type Post = {
  slug: string;
  meta: {
    title: string;
    date: string;
    tags?: string[];
    excerpt?: string;
  };
};

export default function SearchablePosts({ initialPosts }: { initialPosts: Post[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const searchParams = useSearchParams();
  
  useEffect(() => {
    // Get tag from URL if available
    const tagFromUrl = searchParams.get('tag');
    if (tagFromUrl) {
      setSelectedTag(tagFromUrl);
    }
  }, [searchParams]);
  
  // Extract all unique tags from posts
  const allTags = Array.from(
    new Set(
      initialPosts.flatMap(post => post.meta.tags || [])
    )
  ).filter(Boolean);

  // Filter posts based on search query and selected tag
  const filteredPosts = initialPosts.filter(post => {
    const matchesSearch = 
      post.meta.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.meta.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) || true);
    
    const matchesTag = !selectedTag || (post.meta.tags && post.meta.tags.includes(selectedTag));
    
    return matchesSearch && matchesTag;
  });

  return (
    <>
      {/* 搜索和标签筛选 */}
      <div className="mb-12 space-y-6">
        <div className="relative">
          <input 
            type="text" 
            placeholder="搜索文章..." 
            className="w-full px-5 py-3 bg-card border border-subtle rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-secondary placeholder-secondary placeholder-opacity-50 transition-all duration-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="absolute right-3 top-3 text-secondary hover:text-primary transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        {allTags.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm text-secondary">按标签筛选：</div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag('')}
                className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                  selectedTag === '' 
                    ? 'bg-primary text-white shadow-sm' 
                    : 'bg-muted text-secondary hover:bg-muted/80 hover:scale-105'
                }`}
              >
                全部
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                    selectedTag === tag 
                      ? 'bg-primary text-white shadow-sm' 
                      : 'bg-muted text-secondary hover:bg-muted/80 hover:scale-105'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 文章列表 */}
      <div className="space-y-8">
        {filteredPosts.map((post) => (
          <PostCard 
            key={post.slug}
            slug={post.slug}
            title={post.meta.title}
            date={post.meta.date}
            tags={post.meta.tags}
            excerpt={post.meta.excerpt}
            onTagClick={(tag) => setSelectedTag(tag)}
          />
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-16 bg-card rounded-lg border border-subtle shadow-sm">
          <h3 className="text-xl font-semibold mb-2 text-primary">
            {searchQuery || selectedTag ? '没有找到相关文章' : '暂无文章'}
          </h3>
          <p className="text-secondary">
            {searchQuery || selectedTag ? '请尝试其他关键词或标签' : '敬请期待更多内容...'}
          </p>
        </div>
      )}
    </>
  );
} 