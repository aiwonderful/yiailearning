'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 报告错误到Sentry
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <ErrorBoundary
          error={error}
          reset={reset}
          fallback={
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
              <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-red-100 dark:bg-red-900/20 rounded-full mb-4">
                  <svg
                    className="w-8 h-8 text-red-600 dark:text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>

                <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">
                  出现错误
                </h2>

                <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                  抱歉，页面遇到了意外错误。我们已经记录了这个问题。
                </p>

                <div className="space-y-3">
                  <button
                    onClick={reset}
                    className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    重试
                  </button>

                  <a
                    href="/"
                    className="block w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 text-center rounded transition-colors"
                  >
                    返回首页
                  </a>
                </div>

                {process.env.NODE_ENV === 'development' && (
                  <details className="mt-6">
                    <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                      错误详情 (开发模式)
                    </summary>
                    <pre className="mt-2 text-xs bg-gray-100 dark:bg-gray-900 p-3 rounded overflow-auto text-red-600 dark:text-red-400">
                      {error.message}
                      {error.stack && `\n\n${error.stack}`}
                    </pre>
                  </details>
                )}
              </div>
            </div>
          }
        />
      </body>
    </html>
  );
}
