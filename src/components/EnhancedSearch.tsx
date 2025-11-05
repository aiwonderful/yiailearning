'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface SearchResult {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  excerpt?: string;
  score: number;
}

interface SearchSuggestion {
  text: string;
  type: 'tag' | 'recent' | 'popular';
  count?: number;
}

interface EnhancedSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
  showSuggestions?: boolean;
  maxSuggestions?: number;
  enableHistory?: boolean;
  enablePopular?: boolean;
}

export function EnhancedSearch({
  onSearch,
  placeholder = '搜索文章、标签...',
  className = '',
  showSuggestions = true,
  maxSuggestions = 8,
  enableHistory = true,
  enablePopular = true,
}: EnhancedSearchProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [searchHistory, setSearchHistory] = useLocalStorage<string[]>('search-history', []);
  const [popularSearches] = useState<string[]>(['AI工具', '机器学习', '深度学习', '神经网络', 'Python']);

  const debouncedQuery = useDebounce(query, 300);

  // 搜索建议
  const suggestions = useMemo((): SearchSuggestion[] => {
    if (!showSuggestions || !isOpen) return [];

    const suggestions: SearchSuggestion[] = [];

    // 1. 搜索历史 (最近5个)
    if (enableHistory && query === '') {
      const recentHistory = searchHistory.slice(0, 5);
      recentHistory.forEach(text => {
        suggestions.push({ text, type: 'recent' });
      });
    }

    // 2. 热门搜索 (当没有输入时显示)
    if (enablePopular && query === '') {
      const popular = popularSearches
        .filter(text => !recentHistory.includes(text))
        .slice(0, 3);
      popular.forEach(text => {
        suggestions.push({ text, type: 'popular' });
      });
    }

    // 3. 标签搜索建议
    if (query.length > 0) {
      const matchingTags = [
        'AI工具推荐',
        '人工智能',
        '机器学习',
        '深度学习',
        '神经网络',
        'Python',
        'TensorFlow',
        'PyTorch',
        '计算机视觉',
        '自然语言处理',
      ].filter(tag => tag.includes(query));

      matchingTags.forEach(text => {
        suggestions.push({ text, type: 'tag', count: 10 });
      });
    }

    return suggestions.slice(0, maxSuggestions);
  }, [query, isOpen, searchHistory, popularSearches, enableHistory, enablePopular, maxSuggestions, showSuggestions]);

  // 执行搜索
  useEffect(() => {
    if (debouncedQuery.trim()) {
      onSearch(debouncedQuery);

      // 添加到搜索历史
      if (enableHistory) {
        setSearchHistory(prev => {
          const newHistory = [debouncedQuery, ...prev.filter(h => h !== debouncedQuery)];
          return newHistory.slice(0, 20); // 最多保存20条历史
        });
      }
    }
  }, [debouncedQuery, onSearch, enableHistory, setSearchHistory]);

  // 键盘导航
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!isOpen || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % suggestions.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + suggestions.length) % suggestions.length);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          const suggestion = suggestions[selectedIndex];
          setQuery(suggestion.text);
          onSearch(suggestion.text);
          setIsOpen(false);
        } else {
          onSearch(query);
          setIsOpen(false);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  }, [isOpen, suggestions, selectedIndex, query, onSearch]);

  // 处理输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(true);
    setSelectedIndex(-1);
  };

  // 处理建议点击
  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.text);
    onSearch(suggestion.text);
    setIsOpen(false);
  };

  // 清除搜索
  const clearSearch = () => {
    setQuery('');
    setIsOpen(false);
  };

  // 获取建议图标
  const getSuggestionIcon = (type: SearchSuggestion['type']) => {
    switch (type) {
      case 'recent':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'popular':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 'tag':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a.997.997 0 01-1.414 0l-7-7A1.997 1.997 0 013 12V7a4 4 0 014-4z" />
          </svg>
        );
    }
  };

  // 获取建议类型标签颜色
  const getSuggestionColor = (type: SearchSuggestion['type']) => {
    switch (type) {
      case 'recent':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
      case 'popular':
        return 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300';
      case 'tag':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* 搜索输入框 */}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full px-4 py-3 pl-12 pr-12 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
          autoComplete="off"
        />

        {/* 搜索图标 */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* 清除按钮 */}
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* 加载指示器 (可以添加) */}
      </div>

      {/* 搜索建议下拉框 */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={`${suggestion.type}-${suggestion.text}`}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 ${
                index === selectedIndex ? 'bg-blue-50 dark:bg-blue-900/50' : ''
              }`}
            >
              <span className="text-gray-400 dark:text-gray-500">
                {getSuggestionIcon(suggestion.type)}
              </span>
              <span className="flex-1 text-gray-900 dark:text-gray-100">
                {suggestion.text}
              </span>
              {suggestion.count && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {suggestion.count}
                </span>
              )}
              <span className={`text-xs px-2 py-1 rounded-full ${getSuggestionColor(suggestion.type)}`}>
                {suggestion.type === 'recent' && '最近'}
                {suggestion.type === 'popular' && '热门'}
                {suggestion.type === 'tag' && '标签'}
              </span>
            </button>
          ))}

          {/* 底部提示 */}
          <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              使用 ↑↓ 键导航，Enter 键选择，ESC 键关闭
            </p>
          </div>
        </div>
      )}

      {/* 背景点击关闭 */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

// 高级搜索组件
export function AdvancedSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    tags: [] as string[],
    dateRange: 'all', // all, week, month, year
    sortBy: 'relevance', // relevance, date, title
  });

  // 执行搜索
  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    try {
      // 这里应该调用实际的搜索API
      // 模拟搜索结果
      await new Promise(resolve => setTimeout(resolve, 300));

      const mockResults: SearchResult[] = [
        {
          slug: 'ai-tools-for-beginners',
          title: 'AI初学者工具推荐',
          summary: '推荐最适合初学者的AI工具和平台',
          tags: ['AI工具', '初学者'],
          score: 0.95,
        },
      ];

      setSearchResults(mockResults);
    } catch (error) {
      console.error('搜索失败:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="space-y-6">
      <EnhancedSearch
        onSearch={handleSearch}
        placeholder="搜索文章、标签或内容..."
        className="w-full max-w-2xl mx-auto"
      />

      {/* 搜索结果 */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">搜索中...</p>
        </div>
      )}

      {searchResults.length > 0 && (
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            找到 {searchResults.length} 篇相关文章
          </p>

          {searchResults.map(result => (
            <article
              key={result.slug}
              className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                <a href={`/posts/${result.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                  {result.title}
                </a>
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                {result.summary}
              </p>
              <div className="flex flex-wrap gap-2">
                {result.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
