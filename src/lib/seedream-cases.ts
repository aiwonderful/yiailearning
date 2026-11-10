import raw from '@/data/casebooks/seedream-5-5.json';
import {
  SEEDREAM_CATEGORIES,
  SEEDREAM_OFFICIAL,
  isOfficialAttribution,
  type SeedreamGalleryCard,
  type SeedreamCase,
} from './seedream-format';

type RawCollection = {
  title: string;
  collected_at: string;
  count: number;
  pure_count: number;
  mixed_count: number;
  announced: string;
  official_name: string;
  official_page: string;
  official_page_en: string;
  official_blog: string;
  official_blog_en: string;
  official_launch_post: string;
  dreamina_page: string;
  official_claims: string[];
  categories: string[];
  cases: SeedreamCase[];
};

function assertCollection(data: RawCollection) {
  if (data.categories.join('|') !== SEEDREAM_CATEGORIES.join('|')) {
    throw new Error('Seedream case categories do not match the published set');
  }
  if (data.announced !== '2026-11-09') throw new Error('Seedream launch date does not match the official release');
  if (data.official_page !== SEEDREAM_OFFICIAL.pageZh) throw new Error('Seedream official page does not match the launch record');
  if (data.official_page_en !== SEEDREAM_OFFICIAL.pageEn) throw new Error('Seedream English page does not match the launch record');
  if (data.official_blog !== SEEDREAM_OFFICIAL.blogZh) throw new Error('Seedream official blog does not match the launch record');
  if (data.official_blog_en !== SEEDREAM_OFFICIAL.blogEn) throw new Error('Seedream English blog does not match the launch record');
  if (data.official_launch_post !== SEEDREAM_OFFICIAL.launchPost) throw new Error('Seedream launch post does not match the launch record');
  if (data.dreamina_page !== SEEDREAM_OFFICIAL.dreamina) throw new Error('Seedream Dreamina page does not match the launch record');
  if (!data.official_name.includes('Seedream 5.5') || data.official_claims.length < 1) {
    throw new Error('Seedream launch record is missing its name or claims');
  }
  if (data.count !== 64 || data.cases.length !== 64) {
    throw new Error(`Expected 64 Seedream cases, found ${data.cases.length}`);
  }
  const mixed = data.cases.filter((item) => item.mixed);
  const pure = data.cases.filter((item) => !item.mixed);
  if (mixed.length !== 4 || pure.length !== 60 || data.mixed_count !== 4 || data.pure_count !== 60) {
    throw new Error(`Expected 60 pure and 4 mixed Seedream cases, found ${pure.length} / ${mixed.length}`);
  }
  const ids = new Set<string>();
  const categories: readonly string[] = SEEDREAM_CATEGORIES;
  const attributions = new Set(['official_page', 'official_thread', 'official_blog', 'author_claimed']);
  for (const item of data.cases) {
    if (ids.has(item.id)) throw new Error(`Duplicate Seedream case id: ${item.id}`);
    ids.add(item.id);
    if (!categories.includes(item.category)) throw new Error(`${item.id} has an unknown category`);
    if (item.mixed !== (item.category === '混用工作流')) {
      throw new Error(`${item.id} mixed flag does not match its category`);
    }
    if (!attributions.has(item.model_attribution)) throw new Error(`${item.id} has an unknown attribution`);
    if (!item.title || !item.one_liner || !item.method) throw new Error(`${item.id} is missing copy`);
    if (!item.author?.name || !item.author.url?.startsWith('http')) throw new Error(`${item.id} is missing an author`);
    if (!item.source_url?.startsWith('http')) throw new Error(`${item.id} is missing a source url`);
    if (!item.published_at_utc || !item.published_at_shanghai) throw new Error(`${item.id} is missing a date`);
    if (!item.tools?.length || item.tools.some((tool) => !tool.trim())) throw new Error(`${item.id} is missing tools`);
    if (!item.images?.length) throw new Error(`${item.id} is missing an image`);
    for (const image of item.images) {
      if (!image.src?.startsWith('/images/seedream-5-5/')) throw new Error(`${item.id} image is not a local file`);
      if (!image.original_post_url?.startsWith('http')) throw new Error(`${item.id} image is missing its post`);
      if (!image.copyright_note?.trim()) throw new Error(`${item.id} image is missing its credit`);
      if (image.width < 1 || image.height < 1) throw new Error(`${item.id} image is missing dimensions`);
      if (typeof image.animated !== 'boolean') throw new Error(`${item.id} image is missing an animation flag`);
    }
    if (item.mixed) {
      if (!item.workflow?.length || item.workflow.some((step) => !step.trim())) {
        throw new Error(`${item.id} is mixed without a complete workflow`);
      }
    } else if (item.workflow?.length) {
      throw new Error(`${item.id} is pure but still has a workflow`);
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
}

const data = raw as RawCollection;
assertCollection(data);

export const seedreamCollection = data;
export const seedreamCases = data.cases;
export const seedreamImageCount = seedreamCases.reduce((sum, item) => sum + item.images.length, 0);

export function getSeedreamCase(id: string) {
  return seedreamCases.find((item) => item.id === id);
}

export function getSeedreamGalleryCards(): SeedreamGalleryCard[] {
  return seedreamCases.map((item, index) => ({
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
      animated: item.images[0].animated,
    },
  }));
}

export function getSeedreamCategoryCounts() {
  return SEEDREAM_CATEGORIES.map((name) => ({
    name,
    count: seedreamCases.filter((item) => item.category === name).length,
  }));
}
