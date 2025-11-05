'use client';

import React from 'react';
import { calculateReadingTime, formatReadingTime, isQuickRead, getReadingTimeColorClass } from '@/lib/reading-time';
import { ClockIcon } from '@heroicons/react/24/outline';

interface ReadingTimeProps {
  content: string;
  className?: string;
  showIcon?: boolean;
  showWordCount?: boolean;
  showLabel?: boolean;
  locale?: 'zh-CN' | 'en';
  preset?: 'fast' | 'average' | 'thorough';
}

export function ReadingTime({
  content,
  className = '',
  showIcon = true,
  showWordCount = false,
  showLabel = true,
  locale = 'zh-CN',
  preset = 'average',
}: ReadingTimeProps) {
  const readingTime = calculateReadingTime(content, {
    wordsPerMinute: preset === 'fast' ? 400 : preset === 'thorough' ? 200 : 300,
  });

  const formattedTime = formatReadingTime(readingTime, locale);
  const isQuick = isQuickRead(readingTime);
  const colorClass = getReadingTimeColorClass(readingTime);

  return (
    <div className={`flex items-center gap-2 ${colorClass} ${className}`}>
      {showIcon && (
        <ClockIcon className="w-4 h-4 flex-shrink-0" />
      )}

      <div className="flex items-center gap-2 text-sm">
        {showLabel && (
          <span className="font-medium">
            {locale === 'zh-CN' ? '阅读时间' : 'Reading time'}
          </span>
        )}

        <span>
          {formattedTime}
        </span>

        {showWordCount && (
          <span className="text-gray-500 dark:text-gray-400">
            ({readingTime.words} {locale === 'zh-CN' ? '字' : 'words'})
          </span>
        )}
      </div>

      {isQuick && (
        <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full dark:bg-green-900 dark:text-green-200">
          {locale === 'zh-CN' ? '快读' : 'Quick'}
        </span>
      )}
    </div>
  );
}

// 紧凑版阅读时间组件
export function ReadingTimeCompact({
  content,
  className = '',
}: Pick<ReadingTimeProps, 'content' | 'className'>) {
  const readingTime = calculateReadingTime(content);

  return (
    <div className={`flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 ${className}`}>
      <ClockIcon className="w-4 h-4" />
      <span>{readingTime.text}</span>
    </div>
  );
}

// 带动画的阅读时间组件
export function ReadingTimeAnimated({
  content,
  className = '',
}: Pick<ReadingTimeProps, 'content' | 'className'>) {
  const [isVisible, setIsVisible] = React.useState(false);
  const [readingTime, setReadingTime] = React.useState(calculateReadingTime(content));

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      } ${className}`}
    >
      <ReadingTime content={content} showIcon showWordCount />
    </div>
  );
}

// 统计信息组件
interface ReadingStatsProps {
  content: string;
  className?: string;
}

export function ReadingStats({ content, className = '' }: ReadingStatsProps) {
  const readingTime = calculateReadingTime(content);

  const stats = [
    {
      label: '字数',
      value: `${readingTime.words}`,
      unit: locale === 'zh-CN' ? '字' : 'words',
    },
    {
      label: '阅读时间',
      value: readingTime.text,
      unit: '',
    },
    {
      label: '预估语音时长',
      value: Math.ceil(readingTime.words / 200), // 假设语音速度200字/分钟
      unit: '分钟',
    },
  ];

  return (
    <div className={`grid grid-cols-3 gap-4 ${className}`}>
      {stats.map((stat, index) => (
        <div
          key={index}
          className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
        >
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {stat.value}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {stat.label}
          </div>
          {stat.unit && (
            <div className="text-xs text-gray-500 dark:text-gray-500">
              {stat.unit}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// 阅读进度指示器
interface ReadingProgressProps {
  content: string;
  className?: string;
}

export function ReadingProgress({ content, className = '' }: ReadingProgressProps) {
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const updateScrollProgress = () => {
      const element = contentRef.current;
      if (!element) return;

      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const totalScroll = scrollHeight - clientHeight;
      const currentScroll = scrollTop;

      const progress = (currentScroll / totalScroll) * 100;
      setScrollProgress(Math.min(Math.max(progress, 0), 100));
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div className={className}>
      {/* 阅读进度条 */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-800 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* 内容容器 (用于滚动检测) */}
      <div ref={contentRef}>
        {/* 这里放置实际的文章内容 */}
      </div>
    </div>
  );
}

// 导出默认组件
export default ReadingTime;
