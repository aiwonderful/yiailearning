export const GPT_IMAGE_CATEGORIES = [
  '官方发布与演示',
  'GIF 动图',
  '表情包与贴纸',
  '人像与写真',
  '海报与平面设计',
  '插画与风格化视觉',
  '图片编辑与参考图',
  '模型对比',
  '混用工作流',
] as const;

export const GPT_IMAGE_OFFICIAL_PAGE = 'https://openai.com/index/introducing-images-2-6/';

const WORKFLOW_PROMPT_MARKER = '提示词（原帖公开）：';

export type GptImage = {
  src: string;
  width: number;
  height: number;
  media_type: string;
  original_post_url: string;
};

export type GptImageCase = {
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
  model_attribution: 'official_blog' | 'official_thread' | 'author_claimed';
  mixed: boolean;
  workflow: string[];
  live_demo_url: string | null;
  related_urls: string[];
  featured_by_url: string | null;
  images: GptImage[];
};

export type GptGalleryCard = {
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
  image: { src: string; width: number; height: number; mediaType: string };
};

export function isOfficialAttribution(value: string) {
  return value === 'official_blog' || value === 'official_thread';
}

export function kindLabel(mixed: boolean) {
  return mixed ? '混用工作流' : '纯 GPT Image 2.6';
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
    case 'gif_preview':
      return 'GIF 静态预览';
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
    if (host.endsWith('openai.com')) return 'OpenAI';
    return host;
  } catch {
    return '链接';
  }
}

export function relatedLinkLabel(url: string) {
  if (url === GPT_IMAGE_OFFICIAL_PAGE) return 'OpenAI 发布说明';
  return linkHostLabel(url);
}
