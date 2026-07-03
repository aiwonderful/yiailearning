import React from 'react';
import Link from 'next/link';
import PageTitle from '../../components/PageTitle';

const resourceTypes = [
  {
    title: '课题资料包',
    description: '围绕一个主题收集背景资料、关键链接、工具、案例和术语解释。',
    examples: ['AI Agent 入门', 'Cursor 工作流', '个人网站发布'],
  },
  {
    title: '工具实践卡',
    description: '记录一个工具真实解决了什么问题、怎么用、适合谁、不适合谁。',
    examples: ['视频下载工具', '自动化脚本', 'AI 写作流程'],
  },
  {
    title: '项目复盘',
    description: '把一个小项目的需求、实现、卡点、结果和下一步整理成可复用经验。',
    examples: ['博客优化', 'Vibe Coding 作品', '飞书同步流程'],
  },
];

const updateChecklist = [
  '用一句话写清楚这个课题为什么值得整理',
  '补 3-5 个关键资料或工具链接',
  '写下自己的真实判断，不只复制资料',
  '加一个下一步行动，让内容可以继续迭代',
];

export default function ResourcesPage() {
  return (
    <div className="space-y-14">
      <section className="rounded-[1.75rem] border border-[#DCE4DD] bg-[#F8F7F2] p-7 shadow-soft md:p-10">
        <div className="max-w-3xl">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#4D6254]">
            Resource Library
          </div>
          <PageTitle>资料库</PageTitle>
          <p className="mt-5 text-lg leading-8 text-secondary">
            这里会承接我对某个课题产生兴趣后的第一批整理：资料、链接、工具、案例和自己的判断。它不要求一开始完美，但要求可以被继续更新。
          </p>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {resourceTypes.map((type, index) => (
          <article key={type.title} className="relative overflow-hidden rounded-xl border border-subtle/70 bg-card-light p-6 shadow-soft dark:border-white/10 dark:bg-card-dark">
            <span className="absolute right-4 top-2 font-serif text-6xl font-black text-primary/10">
              0{index + 1}
            </span>
            <div className="relative">
              <h2 className="text-xl font-bold text-primary">{type.title}</h2>
              <p className="mt-4 leading-7 text-secondary">{type.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {type.examples.map((example) => (
                  <span key={example} className="rounded-full bg-[#7D8F81]/12 px-3 py-1 text-xs font-semibold text-[#4D6254]">
                    {example}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="grid gap-8 rounded-[1.75rem] bg-[#ECEFE8] p-7 md:p-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9C563F]">Update Checklist</div>
          <h2 className="mt-3 font-serif text-3xl font-black text-[#20242A]">每次新增资料先过这一关</h2>
          <p className="mt-4 leading-8 text-[#59616B]">
            这个清单是为了降低更新压力。先发布一个清楚的小版本，再慢慢把它补厚。
          </p>
        </div>

        <div className="space-y-3">
          {updateChecklist.map((item, index) => (
            <div key={item} className="grid grid-cols-[44px_1fr] items-start gap-4 rounded-xl bg-[#F8F7F2] p-4 shadow-soft">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3F566E] font-serif font-black text-[#F8F7F2]">
                {index + 1}
              </span>
              <p className="leading-7 text-[#59616B]">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-[#7D8F81]/20 bg-[#7D8F81]/8 p-7 md:p-10">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <h2 className="font-serif text-3xl font-black text-[#20242A]">资料最终会进入博客文章</h2>
            <p className="mt-4 max-w-3xl leading-8 text-[#59616B]">
              当前站点的发布系统已经支持 Markdown。以后复制 `src/data/posts/_content-template.md`，改成新的文件名并填内容，就可以生成一篇新的资料或心得。
            </p>
          </div>
          <Link href="/posts" className="btn btn-primary">
            查看文章库
          </Link>
        </div>
      </section>
    </div>
  );
}
