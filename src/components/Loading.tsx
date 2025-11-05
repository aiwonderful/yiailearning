import { LoadingProps } from '@/types';

export function Loading({ message = '加载中...', className, size = 'medium' }: LoadingProps) {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  };

  const textSizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  };

  return (
    <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
      <div className="relative">
        <div className={`${sizeClasses[size]} border-2 border-gray-200 dark:border-gray-700 rounded-full animate-spin`}>
          <div className={`${sizeClasses[size]} border-2 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full animate-spin`}></div>
        </div>
      </div>
      {message && (
        <p className={`mt-4 text-gray-600 dark:text-gray-400 ${textSizeClasses[size]}`}>
          {message}
        </p>
      )}
    </div>
  );
}

// 骨架屏组件
export function SkeletonCard() {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 animate-pulse">
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-4"></div>
      <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-2"></div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-4/6"></div>
      </div>
      <div className="flex gap-2 mt-4">
        <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
        <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
      </div>
    </div>
  );
}

export function SkeletonList({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-6">
      {Array.from({ length: count }, (_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}

// 页面加载组件
export function PageLoading({ message = '页面加载中...' }: { message?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loading message={message} size="large" />
    </div>
  );
}

// 按钮加载状态
export function ButtonLoading({ className }: { className?: string }) {
  return (
    <div className={`inline-flex items-center ${className}`}>
      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}