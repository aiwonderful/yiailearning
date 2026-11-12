export const GEMINI_CATEGORIES = [
  '官方发布与演示',
  '3D 场景与物理仿真',
  '游戏与可玩原型',
  '网站、应用与数据工具',
  'SVG 与创意编程',
  '同题对比实测',
  '混用工作流',
] as const;

export const GEMINI_OFFICIAL = {
  blogIntro: 'https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-carbon/',
  blogAvailable: 'https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-carbon-now-available/',
  blogDevelopers: 'https://blog.google/innovation-and-ai/technology/developers-tools/gemini-4-carbon-developers/',
  launchSundar: 'https://x.com/sundarpichai/status/2115489219804352921',
  launchLogan: 'https://x.com/OfficialLoganK/status/2115489284404940898',
  availableLogan: 'https://x.com/OfficialLoganK/status/2120186016254624039',
  pelican: 'https://x.com/sundarpichai/status/2120198811297694192',
} as const;

const WORKFLOW_PROMPT_MARKER = '提示词（原帖公开）：';

export type GeminiImage = {
  src: string;
  width: number;
  height: number;
  media_type: string;
  original_post_url: string;
  copyright_note: string;
};

export type GeminiPerson = {
  name: string;
  username: string | null;
  url: string;
};

export type GeminiCase = {
  id: string;
  title: string;
  category: string;
  one_liner: string;
  author: GeminiPerson;
  posted_by: GeminiPerson | null;
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
  repo_url: string | null;
  related_urls: string[];
  featured_by_url: string | null;
  images: GeminiImage[];
};

export type GeminiGalleryCard = {
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
  isNew: boolean;
  imageCount: number;
  image: { src: string; width: number; height: number; mediaType: string };
};

export function isOfficialAttribution(value: string) {
  return value === 'official_blog' || value === 'official_thread';
}

export function kindLabel(mixed: boolean) {
  return mixed ? '混用工作流' : '纯 Carbon';
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
    if (host === 'youtube.com' || host === 'youtu.be') return 'YouTube';
    if (host === 'aistudio.google.com') return 'Google AI Studio';
    if (host === 'blog.google' || host.endsWith('.google.com') || host === 'google.com') return 'Google';
    return host;
  } catch {
    return '链接';
  }
}

export function relatedLinkLabel(url: string) {
  if (url === GEMINI_OFFICIAL.blogIntro) return 'Gemini 4 Carbon 介绍';
  if (url === GEMINI_OFFICIAL.blogAvailable) return 'Gemini 4 Carbon 现已开放';
  if (url === GEMINI_OFFICIAL.blogDevelopers) return '开发者说明';
  if (url === GEMINI_OFFICIAL.launchSundar || url === GEMINI_OFFICIAL.launchLogan) return '官方发布帖';
  if (url === GEMINI_OFFICIAL.availableLogan) return '正式开放帖';
  if (url === GEMINI_OFFICIAL.pelican) return '官方鹈鹕演示帖';
  return linkHostLabel(url);
}
