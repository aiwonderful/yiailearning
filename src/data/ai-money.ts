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
    title: '从航海变现 700 元，到单月最高 6000+：AI 小说还能做吗？',
    topics: ['content'],
    rank: 1,
    publishedAt: '2026-09-01',
    resultLabel: '单月最高变现 6000+',
    resultPeriod: '下班后兼职，一年实操复盘',
    summary: '一位职场人从一次 AI 小说实践开始，在下班后持续尝试短篇创作。一年里，她经历了首次拿到收益、连续不过稿和重新稳定产出的阶段；目前每周投入约 4 小时，每月创作 3 至 5 篇，月收益在 2000 至 6000 元之间。',
    questions: [
      '下班后的零散时间，怎样安排才适合长期做内容副业？',
      '第一次拿到结果后，怎样判断这个方向是否值得继续投入？',
      '连续不过稿时，应该从哪些维度复盘？',
      '内容市场变化后，怎样重新找到自己的位置？',
      '人在创作中应该保留哪些判断？',
    ],
    quotes: [
      '我原以为找到提示词、照着流程写下去就可以了，可市场也很快变了。',
      '短篇需要追热点，而且要会迭代！',
      '我还是那个我，提示词也还是那一套，只是我更贴合市场，也在适合创新的地方创新了。',
    ],
  },
  {
    slug: 'ai-business-studio-growth',
    status: 'published',
    title: '从普通上班族到 10 人+ AI 业务工作室，一年做到月销售额 20 万+',
    topics: ['service'],
    rank: 2,
    publishedAt: '2026-08-10',
    resultLabel: '团队月销售额 20万+',
    resultPeriod: '从职场转向 AI 业务的一年',
    summary: '一位普通上班族在过去一年转向 AI 业务，从个人接单逐步发展为 10 人以上的工作室，团队月销售额达到 20 万元以上。复盘围绕业务选择、个人能力与客户需求的匹配，以及团队从单兵作战走向稳定协作的过程展开。',
    questions: [
      '选择一个 AI 业务时，怎样判断它是否值得长期投入？',
      '个人从接到第一单开始，怎样逐步建立客户信任？',
      '业务增长后，什么时候该从个人走向团队？',
      '团队扩张前，哪些能力必须先在个人阶段跑通？',
      '如何让业务积累不只停留在账户数字上？',
    ],
    quotes: [
      '第一位考虑的是复利，不是赚钱。',
      'AI技能变现，不是卖AI本身，而是用AI去解决别人的具体问题。',
      '所谓技能，不是懂原理，而是能交付任务。',
    ],
  },
  {
    slug: 'ai-tool-two-week-validation',
    status: 'published',
    title: '从一个真实困扰出发，做出轻量 AI 工具，两周变现接近 2 万',
    topics: ['product'],
    rank: 3,
    publishedAt: '2026-08-28',
    resultLabel: '2 周变现接近 2 万',
    resultPeriod: '项目上线后的两周验证期',
    summary: '一位有产品经历的实践者从自己长期遇到的具体困扰出发，做出一款轻量 AI 工具。两周内，项目获得接近 2 万元收入，其中包含产品付费与服务收入。复盘关注的是需求是否真实、产品是否足够简单，以及获客与交付中暴露出的新问题。',
    questions: [
      '怎样分辨一个个人困扰是否也是他人的付费问题？',
      '轻量 AI 工具的第一版，应该先验证什么？',
      '用户第一次付费前，最在意的到底是什么？',
      '产品刚出现收入时，怎样判断它是否来自真实需求？',
      '在产品、获客与交付之间，时间应该如何分配？',
    ],
    quotes: [
      '如果只把这件事写成“我用 AI 编程两周赚了两万”，其实没什么价值。',
      '自己经历，给你方向。市场反馈，给你验证。',
      '这就不叫解决问题，这叫把问题换了个地方放。',
    ],
  },
  {
    slug: 'ai-coding-first-order',
    status: 'published',
    title: '零代码基础，25 天用 AI 编程变现 5100 元：从 0 到接单交付',
    topics: ['service', 'automation'],
    rank: 4,
    publishedAt: '2026-07-25',
    resultLabel: '25 天变现 5100 元',
    resultPeriod: '25 天内完成首批客户交付',
    summary: '一位没有编程基础的自由职业者，在接触 AI 编程后尝试承接网页、小程序等需求。25 天内，他获得约 5100 元收入，也完成了首批定制交付。复盘记录了从学习、展示作品到接住咨询的过程，以及新手面对不同需求时的判断与取舍。',
    questions: [
      '没有代码基础时，怎样判断一个需求是否能承接？',
      '客户为什么会为新手的交付买单？',
      '第一次报价前，哪些边界必须先确认？',
      '怎样把已有作品变成持续的咨询机会？',
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
    title: '两周上线 AI 内容工作流，十余天积分充值超 1 万的产品复盘',
    topics: ['content', 'product', 'automation'],
    rank: 5,
    publishedAt: '2026-07-10',
    resultLabel: '上线十余天充值 1万+',
    resultPeriod: '两周开发，十余天首轮付费',
    summary: '一位不会写代码的内容从业者，把自己在内容生产中的长期摩擦整理成一套 AI 工作流产品。项目从零开发到上线用了两周，上线十余天后积分充值超过 1 万元。复盘聚焦真实需求、流程设计与产品上线后能否稳定交付之间的关系。',
    questions: [
      '如何从重复出现的工作摩擦里发现产品机会？',
      '一套 AI 工作流产品，用户真正愿意为什么付费？',
      '从演示版到可收费版本，中间要跨过哪些问题？',
      '产品上线后，哪些问题才会真正出现？',
      '内容生产场景里，怎样兼顾效率与稳定性？',
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
