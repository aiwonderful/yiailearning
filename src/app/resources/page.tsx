import React from 'react';
import PageTitle from '../../components/PageTitle';

export default function ResourcesPage() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* 开发中提示 */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 dark:bg-amber-900/20 dark:border-amber-800">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-amber-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
          </svg>
          <span className="text-amber-800 font-medium dark:text-amber-200">
            资源整理中
          </span>
        </div>
        <p className="text-amber-700 text-sm mt-2 dark:text-amber-300">
          精选的AI学习资源正在整理中，将包含工具推荐、课程资源、社区论坛等内容。敬请期待！
        </p>
      </div>

      <div className="mb-8">
        <PageTitle>学习资源</PageTitle>
        <p className="text-secondary leading-relaxed max-w-2xl mt-4">
          这里将汇集各种有用的AI学习工具、网站、课程和社区资源，帮助你更好地学习和成长。
        </p>
      </div>

      {/* 临时内容预览 */}
      <div className="card p-8 text-center">
        <div className="max-w-md mx-auto">
          <svg className="w-16 h-16 text-muted mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
          </svg>
          <h3 className="text-xl font-semibold text-primary mb-2">资源库建设中</h3>
          <p className="text-secondary mb-4">
            我们正在精心筛选和整理最优质的AI学习资源，包括：
          </p>
          <ul className="text-left text-secondary text-sm space-y-2 max-w-sm mx-auto">
            <li>• 在线课程和教程推荐</li>
            <li>• 实用工具和平台介绍</li>
            <li>• 开源项目和代码资源</li>
            <li>• 学习社区和论坛</li>
            <li>• 书籍和论文推荐</li>
          </ul>
          <p className="text-muted text-sm mt-6">
            目前可以先阅读我们的<a href="/posts" className="text-primary hover:underline">博客文章</a>，获取实用的学习建议。
          </p>
        </div>
      </div>
    </div>
  );
} 