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
  ctaCopy: string;
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
    summary: '空鸣是一名职场人，下班后拿出每周约 4 小时做 AI 小说。航海期间，她用两篇短篇拿到 700+ 稿费，也把一本长篇做到首月 3000+。市场变化后，她一度连续多篇不过稿；摸索一年后，重新稳定每月写几篇，兼职收入做到 2000 至 6000 元。',
    ctaCopy: '她把从首个结果、连续不过稿到重新跑通的完整复盘，写进了生财精华帖。',
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
    summary: '绿子原本是一名普通上班族，决定全职做 AI 业务后，从个人服务一步步做起。订单增长时，单兵交付开始接不住，她才开始把业务拆成团队协作。一年后，工作室已有 10 多人、月销售额 20 万+；这篇复盘记录了她从一个人到一支团队的选择和变化。',
    ctaCopy: '她把项目选择、业务增长和团队搭建中的判断，都写进了这篇生财精华帖。',
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
    summary: 'Logan 做过产品，却一直卡在“想把一个想法做成产品、却不会写代码”。他从自己真实的社交展示困扰出发，做了一款只解决一个问题的轻量工具。上线两周，项目收入接近 2 万元；从有人咨询到真正付费，他也不断调整产品是否足够简单、交付是否能接住。',
    ctaCopy: '他把从一个个人困扰，到验证需求、做出产品和接住订单的全过程写进了生财精华帖。',
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
    summary: '年轻人从大厂销售转为自由职业后，开始碰 AI 编程，但看不懂英文，也不会写代码。他先做出自己的小程序，再把作品放出去等咨询；从犹豫能不能接，到完成第一批交付，25 天里拿到约 5100 元收入。这篇复盘写下了他如何把“不会”变成第一笔真实收入。',
    ctaCopy: '他把零基础做作品、接到咨询、报价和完成首批交付的过程，写进了生财精华帖。',
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
    summary: '尹星河长期做内容业务，最耗时间的不是某个工具，而是素材、创作、管理和发布之间反复切换。他把这个困扰做成一套内容工作站，两周从零上线。前十来天就有用户充值超过 1 万元；真正开始收费后，他又遇到稳定性、交付和持续迭代这些新问题。',
    ctaCopy: '他把从真实工作摩擦到上线收费、再到处理产品问题的完整复盘，写进了生财精华帖。',
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
