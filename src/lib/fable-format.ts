export const FABLE_CATEGORIES = [
  '官方科研与工程',
  'Three.js / 3D / Blender',
  '游戏与可玩交互',
  '动态设计与代码动画',
  '设计与界面',
  '解释与教学',
  '应用与系统',
] as const;

export type FableImage = {
  src: string;
  width: number;
  height: number;
  media_type: string;
  original_post_url: string;
};

export type FableCase = {
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
  live_demo_url: string | null;
  related_urls: string[];
  images: FableImage[];
};

export type GalleryCard = {
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
  ipNotice: boolean;
  imageCount: number;
  image: { src: string; width: number; height: number; mediaType: string };
};

export function isOfficialAttribution(value: string) {
  return value === 'official_blog' || value === 'official_thread';
}

export function needsIpNotice(notes: string | null) {
  return Boolean(notes && /知识产权|商标|版权/.test(notes));
}

export function visiblePromptNote(note: string | null, status: string) {
  if (!note) return null;
  const cleaned = status === 'unpublished' ? note.replace(/^未公开提示词[。.]?\s*/, '').trim() : note.trim();
  return cleaned || null;
}

export function mediaTypeLabel(type: string) {
  switch (type) {
    case 'video_thumbnail':
      return '视频封面';
    case 'video_frame':
      return '视频帧';
    case 'official_poster':
      return '官方海报';
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
    if (host.endsWith('anthropic.com')) return 'Anthropic';
    return host;
  } catch {
    return '链接';
  }
}
