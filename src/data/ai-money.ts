export const aiMoneyTopicOptions = [
  { value: 'content', label: 'AI内容与流量' },
  { value: 'service', label: 'AI工具与服务' },
  { value: 'product', label: 'AI知识产品' },
  { value: 'automation', label: 'AI自动化' },
  { value: 'overseas', label: '出海与跨境' },
  { value: 'other', label: '其他实操' },
] as const;

export type AiMoneyTopic = (typeof aiMoneyTopicOptions)[number]['value'];

export type AiMoneyCase = {
  slug: string;
  status: 'draft' | 'in_review' | 'published' | 'hidden';
  title: string;
  topics: AiMoneyTopic[];
  rank: number;
  publishedAt: string;
  resultLabel: string;
  resultPeriod?: string;
  summary: string;
  questions: string[];
  quotes: string[];
};

// 只在这里放通过人工审核、可公开展示的脱敏解读。
// 原帖全文、作者身份、内部链接及审核记录存放在私有内容系统，不能进入前端构建产物。
const aiMoneyCases: AiMoneyCase[] = [
  {
    slug: 'ai-fiction-part-time-income',
    status: 'published',
    title: '下班后每周 4 小时，AI 小说副业如何做到单月 6000+？',
    topics: ['content'],
    rank: 1,
    publishedAt: '2026-09-01',
    resultLabel: '单月最高变现 6000+',
    resultPeriod: '下班后兼职持续一年',
    summary: '一位职场人把下班后的零散时间用于 AI 辅助小说创作。从首次验证收益，到经历连续不过稿后重新跑通，她把这件事做成了每周约 4 小时、每月可持续产出的兼职项目。案例重点不在某条提示词，而在如何判断市场变化、控制时间投入，并持续迭代内容质量。',
    questions: [
      '下班后的零散时间，怎样安排才适合长期做内容副业？',
      '第一次拿到结果后，怎样判断这个方向是否值得继续投入？',
      '市场变化导致连续不过稿时，应该从哪些维度复盘？',
      'AI 在创作中适合承担哪些工作，人又该保留哪些判断？',
    ],
    quotes: [],
  },
  {
    slug: 'ai-business-studio-growth',
    status: 'published',
    title: '从上班族到 10 人 AI 业务工作室，月销售额 20 万+ 的一年复盘',
    topics: ['service'],
    rank: 2,
    publishedAt: '2026-08-10',
    resultLabel: '团队月销售额 20万+',
    resultPeriod: '转型 AI 业务一年后',
    summary: '一位普通职场人转向 AI 业务后，用一年时间组建了 10 人以上的小团队，并做到月销售额 20 万以上。案例回看的是一个人如何从零开始寻找可持续的业务方向，再把个人能力、客户需求和团队协作逐步连接起来；重点是长期积累，而非追逐某个短期热门技巧。',
    questions: [
      '选择 AI 业务时，怎样判断它能否形成长期积累？',
      '个人从接到第一单开始，怎样逐步建立客户信任？',
      '哪些业务环节适合先由个人完成，哪些适合交给团队？',
      '团队扩张前，怎样避免只增加工作量却没有积累？',
    ],
    quotes: [],
  },
  {
    slug: 'ai-tool-two-week-validation',
    status: 'published',
    title: '从个人困扰到轻量 AI 工具：两周验证接近 2 万变现',
    topics: ['product'],
    rank: 3,
    publishedAt: '2026-08-28',
    resultLabel: '2 周变现接近 2 万',
    resultPeriod: '产品首轮验证期',
    summary: '作者从自己的一个具体困扰出发，做出轻量 AI 工具，并在两周内完成第一轮接近 2 万元的变现验证。这个案例展示的不是工具制作细节，而是如何把真实困扰转成有人愿意付费的问题，再在产品、定价和交付之间不断验证。',
    questions: [
      '怎样分辨一个个人困扰是否也是他人的付费问题？',
      '轻量 AI 工具的第一版，应先验证什么？',
      '产品刚出现收入时，怎样判断收入来自真实需求还是偶然？',
      '在做产品、获客与交付之间，时间应该如何分配？',
    ],
    quotes: [],
  },
  {
    slug: 'ai-coding-first-order',
    status: 'published',
    title: '零代码基础，25 天用 AI 编程变现 5100 元的接单复盘',
    topics: ['service', 'automation'],
    rank: 4,
    publishedAt: '2026-07-25',
    resultLabel: '25 天变现 5100 元',
    resultPeriod: '从学习到首批交付',
    summary: '一位没有编程基础的实践者，尝试用 AI 编程完成首批客户交付，并在 25 天内变现 5100 元。案例聚焦新手如何从“会用工具”走到“能对结果负责”：先建立可展示的成果，再选择自己能承接的需求，并在报价、范围与交付压力之间做取舍。',
    questions: [
      '没有代码基础时，怎样判断一个 AI 编程需求是否能接？',
      '客户为什么会为新手的交付买单？',
      '第一次报价前，哪些范围必须先确认？',
      '哪些需求看似有收入，却可能让新手陷入交付风险？',
    ],
    quotes: [],
  },
  {
    slug: 'xiaohongshu-ai-workstation',
    status: 'published',
    title: '两周上线 AI 内容工作流，十余天充值 1 万+ 的产品复盘',
    topics: ['content', 'product', 'automation'],
    rank: 5,
    publishedAt: '2026-07-10',
    resultLabel: '上线十余天充值 1万+',
    resultPeriod: '从开发到首轮付费',
    summary: '作者把自己长期遇到的内容生产问题整理成一个 AI 工作流产品，用两周完成上线，并在十余天内获得 1 万元以上充值。案例讨论的是如何从零散工具之间的真实摩擦找到产品机会，再把需求判断、流程设计、上线后的稳定性和付费验证放在同一条链路里。',
    questions: [
      '如何从重复出现的工作摩擦里发现产品机会？',
      '一套 AI 工作流产品，用户真正愿意为什么付费？',
      '从演示版到可收费版本，中间要跨过哪些问题？',
      '内容生产场景里，怎样兼顾效率、质量和平台边界？',
    ],
    quotes: [],
  },
];

export function getPublishedAiMoneyCases() {
  return aiMoneyCases
    .filter((item) => item.status === 'published')
    .sort((a, b) => a.rank - b.rank || Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
}

export function getAiMoneyCaseBySlug(slug: string) {
  return getPublishedAiMoneyCases().find((item) => item.slug === slug);
}

export function getAiMoneyTopicLabel(topic: AiMoneyTopic) {
  return aiMoneyTopicOptions.find((item) => item.value === topic)?.label ?? topic;
}
