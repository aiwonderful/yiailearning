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
const aiMoneyCases: AiMoneyCase[] = [];

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
