export const SEEDREAM_CATEGORIES = [
  '官方发布与演示',
  '多轮编辑与一致性',
  '透明素材与贴纸',
  '人像与写实摄影',
  '海报、排版与小字',
  '电商、角色与设计物料',
  '混用工作流',
  '模型对比',
] as const;

export const SEEDREAM_OFFICIAL = {
  pageZh: 'https://seed.bytedance.com/zh/seedream5_5',
  pageEn: 'https://seed.bytedance.com/en/seedream5_5',
  blogZh: 'https://seed.bytedance.com/zh/blog/more-realistic-images-more-stable-editing-across-100-rounds-introducing-seedream-5-5',
  blogEn: 'https://seed.bytedance.com/en/blog/more-realistic-images-more-stable-editing-across-100-rounds-introducing-seedream-5-5',
  launchPost: 'https://x.com/ByteDanceSeed_/status/2119720475068920181',
  dreamina: 'https://dreamina.capcut.com/seedream/seedream-5-5',
} as const;

const WORKFLOW_PROMPT_MARKER = '提示词（原帖公开）：';

export type SeedreamImage = {
  src: string;
  width: number;
  height: number;
  media_type: string;
  animated: boolean;
  original_post_url: string;
  copyright_note: string;
};

export type SeedreamCase = {
  id: string;
  title: string;
  category: string;
  one_liner: string;
  author: { name: string; username: string | null; url: string };
  source_url: string;
  published_at_utc: string;
  published_at_shanghai: string;
  tools: string[];
  prompt: { status: 'published' | 'unpublished'; text: string | null; note: string | null };
  method: string;
  notes: string | null;
  model: string;
  model_attribution: 'official_page' | 'official_thread' | 'official_blog' | 'author_claimed';
  mixed: boolean;
  workflow: string[];
  live_demo_url: string | null;
  repo_url: string | null;
  related_urls: string[];
  featured_by_url: string | null;
  images: SeedreamImage[];
};

export type SeedreamGalleryCard = {
  id: string;
  title: string;
  category: string;
  oneLiner: string;
  serial: string;
  authorName: string;
  authorUrl: string;
  sourceUrl: string;
  tools: string[];
  official: boolean;
  mixed: boolean;
  imageCount: number;
  image: { src: string; width: number; height: number; mediaType: string; animated: boolean };
};

export function isOfficialAttribution(value: string) {
  return value === 'official_page' || value === 'official_thread' || value === 'official_blog';
}

export function kindLabel(mixed: boolean) {
  return mixed ? '混用工作流' : '纯 Seedream 5.5';
}

export function visiblePromptNote(note: string | null, status: string) {
  if (!note) return null;
  const cleaned = status === 'unpublished' ? note.replace(/^未公开提示词[。.]?\s*/, '').trim() : note.trim();
  return cleaned || null;
}

export function splitWorkflowStep(step: string) {
  const index = step.indexOf(WORKFLOW_PROMPT_MARKER);
  if (index === -1) return { body: step, prompt: null as string | null, promptLabel: null as string | null };
  let body = step.slice(0, index).trim();
  const prompt = step.slice(index + WORKFLOW_PROMPT_MARKER.length).trim();
  const labelMatch = body.match(/([A-Za-z0-9][A-Za-z0-9.+-]*)\s*$/);
  let promptLabel = '这一步';
  if (labelMatch && labelMatch[1].length <= 12 && labelMatch.index !== undefined) {
    promptLabel = labelMatch[1];
    body = body.slice(0, labelMatch.index).trim();
  }
  return { body: body || step, prompt: prompt || null, promptLabel };
}

export function mediaTypeLabel(type: string) {
  switch (type) {
    case 'animated_gif':
      return '动图';
    case 'animated_gif_thumbnail':
      return '动图封面';
    case 'video_thumbnail':
      return '视频封面';
    case 'photo':
      return '原帖图片';
    default:
      return '效果预览';
  }
}

export function linkHostLabel(url: string) {
  try {
    const host = new URL(url).hostname.replace(/^www\./, '');
    if (host === 'x.com') return 'X';
    if (host === 'github.com') return 'GitHub';
    if (host === 'seed.bytedance.com' || host.endsWith('.bytedance.com')) return 'ByteDance Seed';
    if (host === 'dreamina.capcut.com') return 'Dreamina';
    return host;
  } catch {
    return '链接';
  }
}

export function relatedLinkLabel(url: string) {
  if (url === SEEDREAM_OFFICIAL.pageZh) return 'Seedream 5.5 中文产品页';
  if (url === SEEDREAM_OFFICIAL.pageEn) return 'Seedream 5.5 英文产品页';
  if (url === SEEDREAM_OFFICIAL.blogZh) return '官方博客';
  if (url === SEEDREAM_OFFICIAL.blogEn) return '官方英文博客';
  if (url === SEEDREAM_OFFICIAL.launchPost) return '官方发布帖';
  if (url === SEEDREAM_OFFICIAL.dreamina) return 'Dreamina';
  return linkHostLabel(url);
}
