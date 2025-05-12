import React from 'react';
import PageTitle from '../../components/PageTitle';

export default function ResourcesPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <PageTitle>学习资源</PageTitle>
        <p className="text-secondary leading-relaxed max-w-2xl mt-4">
          这里将汇集各种有用的AI学习工具、网站、课程和社区资源，帮助你更好地学习和成长。
        </p>
      </div>

      {/* Placeholder for resource list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="bg-card border border-subtle rounded-lg p-6">
            <h3 className="text-xl font-semibold text-primary mb-2">资源名称 {item}</h3>
            <p className="text-secondary text-sm mb-3">
              这是一个资源的简短描述，稍后会填充实际内容。
            </p>
            <a 
              href="#" 
              className="text-accent hover:text-accent/80 font-medium text-sm transition-colors"
            >
              访问资源 &rarr;
            </a>
          </div>
        ))}
      </div>
      <p className="mt-8 text-center text-secondary">
        更多资源正在整理中，敬请期待...
      </p>
    </div>
  );
} 