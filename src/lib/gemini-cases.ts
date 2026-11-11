import raw from '@/data/casebooks/gemini-4-carbon.json';
import {
  GEMINI_CATEGORIES,
  GEMINI_OFFICIAL,
  isOfficialAttribution,
  type GeminiGalleryCard,
  type GeminiCase,
} from './gemini-format';

type RawImage = GeminiCase['images'][number] & {
  path?: string;
  source_media_url?: string;
};

type RawCase = Omit<GeminiCase, 'workflow' | 'images'> & {
  workflow?: string[];
  images: RawImage[];
};

type RawCollection = {
  title: string;
  collected_at: string;
  collected_at_shanghai: string;
  model_scope: string;
  launch: {
    official_name: string;
    announced: string;
    generally_available: string;
    official_blog_intro: string;
    official_blog_available: string;
    official_blog_developers: string;
    official_launch_post_sundar: string;
    official_launch_post_logan: string;
    official_available_post_logan: string;
    official_pelican_post: string;
    claims: string[];
  };
  count: number;
  method_note: string;
  exclusions: string[];
  copyright: string;
  cases: RawCase[];
};

function assertCollection(data: RawCollection) {
  const launch = data.launch;
  if (launch.announced !== '2026-10-28') throw new Error('Gemini 4 Carbon announce date does not match the official post');
  if (launch.generally_available !== '2026-11-10') throw new Error('Gemini 4 Carbon availability date does not match the official post');
  if (launch.official_name !== 'Gemini 4 Carbon') throw new Error('Gemini launch record is missing its name');
  if (launch.official_blog_intro !== GEMINI_OFFICIAL.blogIntro) throw new Error('Gemini intro blog does not match the launch record');
  if (launch.official_blog_available !== GEMINI_OFFICIAL.blogAvailable) throw new Error('Gemini availability blog does not match the launch record');
  if (launch.official_blog_developers !== GEMINI_OFFICIAL.blogDevelopers) throw new Error('Gemini developer blog does not match the launch record');
  if (launch.official_launch_post_sundar !== GEMINI_OFFICIAL.launchSundar) throw new Error('Gemini Sundar post does not match the launch record');
  if (launch.official_launch_post_logan !== GEMINI_OFFICIAL.launchLogan) throw new Error('Gemini Logan post does not match the launch record');
  if (launch.official_available_post_logan !== GEMINI_OFFICIAL.availableLogan) throw new Error('Gemini availability post does not match the launch record');
  if (launch.official_pelican_post !== GEMINI_OFFICIAL.pelican) throw new Error('Gemini pelican post does not match the launch record');
  if (launch.claims.length < 1) throw new Error('Gemini launch record is missing official claims');
  if (!data.model_scope.trim() || !data.method_note.includes('原帖未说明') || !data.copyright.includes('官方')) {
    throw new Error('Gemini collection is missing its scope, method note, or copyright');
  }
  if (data.count !== 57 || data.cases.length !== 57) {
    throw new Error(`Expected 57 Gemini cases, found ${data.cases.length}`);
  }
  const ids = new Set<string>();
  const categories: readonly string[] = GEMINI_CATEGORIES;
  const attributions = new Set(['official_blog', 'official_thread', 'author_claimed']);
  const seenCategories = new Set<string>();
  for (const item of data.cases) {
    if (ids.has(item.id)) throw new Error(`Duplicate Gemini case id: ${item.id}`);
    ids.add(item.id);
    if (!categories.includes(item.category)) throw new Error(`${item.id} has an unknown category`);
    seenCategories.add(item.category);
    if (item.category === '混用工作流' && !item.mixed) {
      throw new Error(`${item.id} is in the mixed category without the mixed flag`);
    }
    if (!attributions.has(item.model_attribution)) throw new Error(`${item.id} has an unknown attribution`);
    if (!item.title || !item.one_liner || !item.method) throw new Error(`${item.id} is missing copy`);
    if (!item.author?.name || !item.author.url?.startsWith('http')) throw new Error(`${item.id} is missing an author`);
    if (item.posted_by && (!item.posted_by.name || !item.posted_by.url?.startsWith('http'))) {
      throw new Error(`${item.id} has a bad poster`);
    }
    if (!item.source_url?.startsWith('http')) throw new Error(`${item.id} is missing a source url`);
    if (!item.published_at_utc || !item.published_at_shanghai) throw new Error(`${item.id} is missing a date`);
    if (!item.tools?.length || item.tools.some((tool) => !tool.trim())) throw new Error(`${item.id} is missing tools`);
    if (!item.images?.length) throw new Error(`${item.id} is missing an image`);
    for (const image of item.images) {
      if (!image.src?.startsWith('/images/gemini-4-carbon/')) throw new Error(`${item.id} image is not a local file`);
      if (image.path && image.path !== image.src) throw new Error(`${item.id} image path does not match src`);
      if (!image.original_post_url?.startsWith('http')) throw new Error(`${item.id} image is missing its post`);
      if (!image.copyright_note?.trim()) throw new Error(`${item.id} image is missing its credit`);
      if (image.width < 1 || image.height < 1) throw new Error(`${item.id} image is missing dimensions`);
    }
    if (item.mixed) {
      if (!item.workflow?.length || item.workflow.some((step) => !step.trim())) {
        throw new Error(`${item.id} is mixed without a complete workflow`);
      }
    } else if (item.workflow?.length) {
      throw new Error(`${item.id} is not mixed but still has a workflow`);
    }
    if (item.prompt.status === 'published') {
      if (!item.prompt.text?.trim()) throw new Error(`${item.id} is marked published without prompt text`);
    } else if (item.prompt.status !== 'unpublished' || item.prompt.text) {
      throw new Error(`${item.id} has an invalid prompt status`);
    }
    for (const url of [item.live_demo_url, item.repo_url, item.featured_by_url, ...item.related_urls]) {
      if (url && !url.startsWith('http')) throw new Error(`${item.id} has a bad link`);
    }
  }
  if (seenCategories.size !== GEMINI_CATEGORIES.length) throw new Error('Gemini collection is missing a category');
  const sceneCount = data.cases.filter((item) => item.category === '3D 场景与物理仿真').length;
  const largest = Math.max(...GEMINI_CATEGORIES.map((name) => data.cases.filter((item) => item.category === name).length));
  if (sceneCount !== largest) throw new Error('3D and simulation cases are no longer the largest group');
  const mixed = data.cases.filter((item) => item.mixed).length;
  if (mixed < 1) throw new Error('Gemini collection is missing mixed workflows');
}

const data = raw as RawCollection;
assertCollection(data);

export const geminiCollection = data;
export const geminiCases: GeminiCase[] = data.cases.map((item) => ({
  ...item,
  posted_by: item.posted_by ?? null,
  workflow: item.workflow ?? [],
  images: item.images.map((image) => ({
    src: image.src,
    width: image.width,
    height: image.height,
    media_type: image.media_type,
    original_post_url: image.original_post_url,
    copyright_note: image.copyright_note,
  })),
}));
export const geminiImageCount = geminiCases.reduce((sum, item) => sum + item.images.length, 0);
export const geminiMixedCount = geminiCases.filter((item) => item.mixed).length;
export const geminiSceneCount = geminiCases.filter((item) => item.category === '3D 场景与物理仿真').length;

export function getGeminiCase(id: string) {
  return geminiCases.find((item) => item.id === id);
}

export function getGeminiGalleryCards(): GeminiGalleryCard[] {
  return geminiCases.map((item, index) => ({
    id: item.id,
    title: item.title,
    category: item.category,
    oneLiner: item.one_liner,
    serial: String(index + 1).padStart(2, '0'),
    authorName: item.author.name,
    authorUrl: item.author.url,
    sourceUrl: item.source_url,
    tools: item.tools,
    official: isOfficialAttribution(item.model_attribution),
    mixed: item.mixed,
    imageCount: item.images.length,
    image: {
      src: item.images[0].src,
      width: item.images[0].width,
      height: item.images[0].height,
      mediaType: item.images[0].media_type,
    },
  }));
}

export function getGeminiCategoryCounts() {
  return GEMINI_CATEGORIES.map((name) => ({
    name,
    count: geminiCases.filter((item) => item.category === name).length,
  }));
}
