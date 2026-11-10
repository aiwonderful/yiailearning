import raw from '@/data/casebooks/fable-5-2.json';
import {
  FABLE_CATEGORIES,
  isOfficialAttribution,
  needsIpNotice,
  type FableCase,
  type GalleryCard,
} from './fable-format';

type RawCollection = {
  title: string;
  collected_at: string;
  count: number;
  official_page: string;
  official_launch_post: string;
  categories: string[];
  cases: FableCase[];
};

function assertCollection(data: RawCollection) {
  if (data.categories.join('|') !== FABLE_CATEGORIES.join('|')) {
    throw new Error('Fable case categories do not match the published set');
  }
  if (data.count !== 54 || data.cases.length !== 54) {
    throw new Error(`Expected 54 Fable cases, found ${data.cases.length}`);
  }
  const ids = new Set<string>();
  const categories: readonly string[] = FABLE_CATEGORIES;
  for (const item of data.cases) {
    if (ids.has(item.id)) throw new Error(`Duplicate Fable case id: ${item.id}`);
    ids.add(item.id);
    if (!categories.includes(item.category)) throw new Error(`${item.id} has an unknown category`);
    if (!item.title || !item.one_liner || !item.method) throw new Error(`${item.id} is missing copy`);
    if (!item.author?.name || !item.author.url?.startsWith('http')) throw new Error(`${item.id} is missing an author`);
    if (!item.source_url?.startsWith('http')) throw new Error(`${item.id} is missing a source url`);
    if (!item.tools?.length) throw new Error(`${item.id} is missing tools`);
    if (!item.images?.length) throw new Error(`${item.id} is missing an image`);
    for (const image of item.images) {
      if (!image.src?.startsWith('/images/fable-5-2/')) throw new Error(`${item.id} image is not a local file`);
      if (!image.original_post_url?.startsWith('http')) throw new Error(`${item.id} image is missing its post`);
      if (image.width < 1 || image.height < 1) throw new Error(`${item.id} image is missing dimensions`);
    }
    if (item.prompt.status === 'published') {
      if (!item.prompt.text?.trim()) throw new Error(`${item.id} is marked published without prompt text`);
    } else if (item.prompt.status !== 'unpublished' || item.prompt.text) {
      throw new Error(`${item.id} has an invalid prompt status`);
    }
  }
}

const data = raw as RawCollection;
assertCollection(data);

export const fableCollection = data;
export const fableCases = data.cases;
export const fableImageCount = fableCases.reduce((sum, item) => sum + item.images.length, 0);

export function getFableCase(id: string) {
  return fableCases.find((item) => item.id === id);
}

export function getGalleryCards(): GalleryCard[] {
  return fableCases.map((item, index) => ({
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
    ipNotice: needsIpNotice(item.notes),
    imageCount: item.images.length,
    image: {
      src: item.images[0].src,
      width: item.images[0].width,
      height: item.images[0].height,
      mediaType: item.images[0].media_type,
    },
  }));
}

export function getCategoryCounts() {
  return FABLE_CATEGORIES.map((name) => ({
    name,
    count: fableCases.filter((item) => item.category === name).length,
  }));
}
