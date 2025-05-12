"use client"; // PostCard now handles client-side interactions

import React from 'react';
import Link from 'next/link';
// import Image from 'next/image';

type PostCardProps = {
  slug: string;
  title: string;
  date: string;
  tags?: string[];
  excerpt?: string;
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
  
  // Generate a deterministic color based on the post title for placeholder images
  const getPlaceholderColor = (title: string) => {
    let hash = 0;
    for (let i = 0; i < title.length; i++) {
      hash = title.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = Math.abs(hash).toString(16).substring(0, 6);
    return `#${color.padEnd(6, '0')}`;
  };

  // Generate placeholder image URL based on title for consistent images
  const imageUrl = `https://source.unsplash.com/featured/600x400?ai,technology,${encodeURIComponent(title.substring(0, 20))}`;
  const placeholderColor = getPlaceholderColor(title);
  
  // Format date in Chinese locale
  const formattedDate = new Date(date).toLocaleDateString('zh-CN', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <article className="overflow-hidden rounded-xl bg-card border border-subtle transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {/* Featured Image */}
        <div className="relative h-52 md:h-full w-full md:col-span-1 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundColor: placeholderColor,
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: 'cover'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-40"></div>
        </div>
        
        {/* Content */}
        <div className="p-6 md:col-span-2 flex flex-col">
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
                      e.preventDefault(); // Keep default prevention if necessary
                      if (onTagClick) { // Check if onTagClick is provided
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
            <p className="text-secondary mb-5 line-clamp-2 flex-grow">
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
      </div>
    </article>
  );
} 