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
  author: string;
  topics: AiMoneyTopic[];
  rank: number;
  publishedAt: string;
  resultLabel: string;
  resultPeriod?: string;
  results: Array<{ value: string; label: string }>;
  summary: string;
  questions: string[];
  quotes: string[];
};

// 只在这里放通过人工审核、可公开展示的脱敏解读。
// 允许展示原帖中公开出现的作者昵称、成绩、脱敏摘要、问题与观点原话；
// 原帖全文、操作步骤、内部链接及审核记录不能进入前端构建产物。
const aiMoneyCases: AiMoneyCase[] = [
  {
    slug: 'ai-fiction-part-time-income',
    status: 'published',
    title: '从航海变现700到单月最高变现6000+，AI 小说现在还能做吗，分享我这一年来的实战复盘',
    author: '空鸣',
    topics: ['content'],
    rank: 1,
    publishedAt: '2026-09-01',
    resultLabel: '单月最高变现 6000+',
    resultPeriod: '下班后兼职，一年实操复盘',
    results: [
      { value: '6000+', label: '月最高兼职收入' },
      { value: '700+', label: '航海期首篇稿费' },
    ],
    summary: '作者空鸣是一名职场人，下班后兼职用 AI 写小说。去年三月参加生财 AI 小说航海入门，短篇投稿起步稿费七百多元，长篇首月收益三千多元。此后一年多里市场几度变化，他一度连续多篇投稿被拒，重新摸索后又能稳定过稿，如今每月只写几篇，兼职收益能到两千到六千元。',
    questions: [
      '下班后兼职写 AI 小说，真的能靠稿费赚到钱吗？',
      '长篇和短篇小说分别要靠什么方式赚钱？',
      '内容和方法都没大变，为什么突然连续投稿不过稿？',
      '市场风向变了要怎样才能重新稳定过稿？',
      '好不容易起量之后心态为什么反而容易崩？',
      '什么样的人适合入局靠 AI 写小说赚钱？',
    ],
    quotes: [
      '由此可见，一个网站的变化，一小块市场的变化，并不是整个市场的变化。只要市场上需求还在，即使承接流量的网站变了，哪里流量多，我们也可以去哪里。',
      '自己在这里还能相对轻松地赚钱吗？只要能，这个项目就还可以做。',
    ],
  },
  {
    slug: 'ai-business-studio-growth',
    status: 'published',
    title: '一年时间，我是如何通过 AI 业务变现，做到 10 人+ AI 业务工作室',
    author: '绿子',
    topics: ['service'],
    rank: 2,
    publishedAt: '2026-08-10',
    resultLabel: '团队月销售额 20万+',
    resultPeriod: '从职场转向 AI 业务的一年',
    results: [
      { value: '20万+', label: '团队月销售额' },
      { value: '10人+', label: 'AI 业务工作室规模' },
    ],
    summary: '作者绿子此前是一名普通上班族，2025 年开始全职投入 AI 业务。从个人服务起步后，她把接单、交付与客户关系逐步做成团队协作；一年后，工作室已有 10 多人，月销售额 20 万+。这篇复盘讲的是如何判断长期项目、寻找与自身匹配的业务，并从个人走向团队。',
    questions: [
      '选择一个 AI 业务时，怎样判断它是否值得长期投入？',
      'AI 业务有哪些可以从个人开始验证的方向？',
      '普通人做 AI 业务，应如何选择与自己匹配的项目？',
      'AI 能在哪些业务环节带来真实的降本提效？',
      '个人业务做到什么阶段，才适合开始组建团队？',
      '从个人到 10 人工作室，最容易在哪些地方失控？',
    ],
    quotes: [
      '第一位考虑的是复利，不是赚钱。',
      '所谓技能，不是懂原理，而是能交付任务。',
      '工具谁都有，场景无处不在，真正值钱的，是中间那个“加工”的动作。',
    ],
  },
  {
    slug: 'ai-tool-two-week-validation',
    status: 'published',
    title: '2 周变现 2 万，起因只是为了解决自己的一个展示困扰',
    author: 'Logan',
    topics: ['product'],
    rank: 3,
    publishedAt: '2026-08-28',
    resultLabel: '2 周变现接近 2 万',
    resultPeriod: '项目上线后的两周验证期',
    results: [
      { value: '2万', label: '两周项目收入' },
      { value: '8000元', label: '单笔服务收入' },
    ],
    summary: '作者 Logan 曾做过产品工作，长期困在“想把一个想法做成产品、却不会写代码”的问题里。他从自己在社交展示上的真实困扰出发，做了一款轻量 AI 工具。上线两周，项目收入接近 2 万元，其中包括产品付费和一笔服务收入；复盘记录了需求、产品和交付分别遇到的考验。',
    questions: [
      '怎样分辨一个个人困扰是否也是他人的付费问题？',
      '轻量 AI 工具的第一版，应该先验证什么？',
      '用户愿意付费的，是工具、教程还是最终结果？',
      '第一版产品如何判断是否足够简单？',
      '产品刚出现收入时，怎样判断它是否来自真实需求？',
      '项目有了订单后，真正的瓶颈会出现在哪里？',
    ],
    quotes: [
      '如果只把这件事写成“我用 AI 编程两周赚了两万”，其实没什么价值。',
      '自己经历，给你方向。市场反馈，给你验证。',
      '他不是来参观你会多少模型的。他是来解决一个具体问题的。',
    ],
  },
  {
    slug: 'ai-coding-first-order',
    status: 'published',
    title: '零代码基础，我用 AI 编程 25 天变现 5100 元：从 0 到接单交付',
    author: '年轻人',
    topics: ['service', 'automation'],
    rank: 4,
    publishedAt: '2026-07-25',
    resultLabel: '25 天变现 5100 元',
    resultPeriod: '25 天内完成首批客户交付',
    results: [
      { value: '5100元', label: '25 天相关收入' },
      { value: '4个', label: '已上线个人小程序' },
    ],
    summary: '作者年轻人此前在大厂做云计算销售，转为自由职业后开始探索 AI 方向。他没有代码基础，先做出自己的小程序，又从公开展示的作品中获得定制咨询。6 月 10 日到 7 月 5 日，他靠相关需求获得约 5100 元收入；这篇复盘讲的是怎样从完全陌生到接住第一批交付。',
    questions: [
      '不懂代码和英文，真的还能接住 AI 编程需求吗？',
      '零基础的第一批作品，应该怎样展示给潜在客户？',
      '新手从哪些类型的需求开始，更容易完成第一次交付？',
      '客户为什么会为一个新手的交付买单？',
      '第一次报价前，哪些边界必须先确认？',
      '哪些需求看似有收入，却可能让新手陷入交付风险？',
    ],
    quotes: [
      '不懂英文、不懂一行代码，通过AI 编程，照样接单赚钱。',
      '每一次实操都在给自己攒经验、把技能一点点撑大。',
      '认知差在哪，钱就在哪。',
    ],
  },
  {
    slug: 'xiaohongshu-ai-workstation',
    status: 'published',
    title: '我用 AI 搭了一套内容工作站，10 天变现 1 万+ 的产品复盘',
    author: '尹星河',
    topics: ['content', 'product', 'automation'],
    rank: 5,
    publishedAt: '2026-07-10',
    resultLabel: '上线十余天充值 1万+',
    resultPeriod: '两周开发，十余天首轮付费',
    results: [
      { value: '1万+', label: '十余天积分充值' },
      { value: '2周', label: '从零开发到正式上线' },
    ],
    summary: '作者尹星河长期做小红书虚拟电商和培训陪跑，一直被内容从素材、创作到发布的碎片化流程困扰。5 月下旬开始，他用两周做出一套内容工作流产品；上线十来天，网站积分充值超过 1 万元。这篇复盘讲真实需求如何变成可收费产品，以及上线后如何面对稳定交付。',
    questions: [
      '如何从重复出现的工作摩擦里发现产品机会？',
      '一套 AI 工作流产品，用户真正愿意为什么付费？',
      '内容生产的多个环节，怎样才算真正形成闭环？',
      '从演示版到可收费版本，中间要跨过哪些问题？',
      '产品上线后，哪些问题才会真正出现？',
      '小团队怎样同时处理产品迭代与稳定交付？',
    ],
    quotes: [
      '真正决定这件事能不能成的，仍然是需求判断、流程设计，以及上线之后有没有能力稳定交付。',
      'AI 内容的核心，不是 AI 率，而是信息密度。',
      'AI 不会替你做产品。它只会放大你原本的产品能力。',
    ],
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
