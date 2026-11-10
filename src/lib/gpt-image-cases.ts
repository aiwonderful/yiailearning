import raw from '@/data/casebooks/gpt-image-2-6.json';
import {
  GPT_IMAGE_CATEGORIES,
  isOfficialAttribution,
  type GptGalleryCard,
  type GptImageCase,
} from './gpt-image-format';

type RawCollection = {
  title: string;
  collected_at: string;
  count: number;
  pure_count: number;
  mixed_count: number;
  official_page: string;
  official_launch_post: string;
  api_models: string[];
  official_claims: string[];
  categories: string[];
  cases: GptImageCase[];
};

function assertCollection(data: RawCollection) {
  if (data.categories.join('|') !== GPT_IMAGE_CATEGORIES.join('|')) {
    throw new Error('GPT Image case categories do not match the published set');
  }
  if (data.count !== 64 || data.cases.length !== 64) {
    throw new Error(`Expected 64 GPT Image cases, found ${data.cases.length}`);
  }
  const mixed = data.cases.filter((item) => item.mixed);
  const pure = data.cases.filter((item) => !item.mixed);
  if (mixed.length !== 16 || pure.length !== 48 || data.mixed_count !== 16 || data.pure_count !== 48) {
    throw new Error(`Expected 48 pure and 16 mixed GPT Image cases, found ${pure.length} / ${mixed.length}`);
  }
  const ids = new Set<string>();
  const categories: readonly string[] = GPT_IMAGE_CATEGORIES;
  for (const item of data.cases) {
    if (ids.has(item.id)) throw new Error(`Duplicate GPT Image case id: ${item.id}`);
    ids.add(item.id);
    if (!categories.includes(item.category)) throw new Error(`${item.id} has an unknown category`);
    if (item.mixed !== (item.category === '混用工作流')) {
      throw new Error(`${item.id} mixed flag does not match its category`);
    }
    if (!item.title || !item.one_liner || !item.method) throw new Error(`${item.id} is missing copy`);
    if (!item.author?.name || !item.author.url?.startsWith('http')) throw new Error(`${item.id} is missing an author`);
    if (!item.source_url?.startsWith('http')) throw new Error(`${item.id} is missing a source url`);
    if (!item.tools?.length) throw new Error(`${item.id} is missing tools`);
    if (!item.images?.length) throw new Error(`${item.id} is missing an image`);
    for (const image of item.images) {
      if (!image.src?.startsWith('/images/gpt-image-2-6/')) throw new Error(`${item.id} image is not a local file`);
      if (!image.original_post_url?.startsWith('http')) throw new Error(`${item.id} image is missing its post`);
      if (image.width < 1 || image.height < 1) throw new Error(`${item.id} image is missing dimensions`);
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
  }
}

const data = raw as RawCollection;
assertCollection(data);

export const gptImageCollection = data;
export const gptImageCases = data.cases;
export const gptImageImageCount = gptImageCases.reduce((sum, item) => sum + item.images.length, 0);

export function getGptImageCase(id: string) {
  return gptImageCases.find((item) => item.id === id);
}

export function getGptImageGalleryCards(): GptGalleryCard[] {
  return gptImageCases.map((item, index) => ({
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

export function getGptImageCategoryCounts() {
  return GPT_IMAGE_CATEGORIES.map((name) => ({
    name,
    count: gptImageCases.filter((item) => item.category === name).length,
  }));
}
