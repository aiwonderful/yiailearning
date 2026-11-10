import fs from 'fs';
import path from 'path';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import sitemap from '@/app/sitemap';
import ResourcesPage from '@/app/resources/page';
import {
  kindLabel,
  linkHostLabel,
  mediaTypeLabel,
  relatedLinkLabel,
  splitWorkflowStep,
  visiblePromptNote,
} from '@/lib/gpt-image-format';
import {
  getGptImageCategoryCounts,
  getGptImageGalleryCards,
  gptImageCases,
  gptImageImageCount,
} from '@/lib/gpt-image-cases';
import { generateStaticParams } from '../[id]/page';
import CaseDetail from '../detail';
import Gallery from '../gallery';
import GptImageCasesPage from '../page';

jest.mock('@/lib/posts', () => ({
  getAllPosts: jest.fn(async () => []),
}));

const cards = getGptImageGalleryCards();
const categories = getGptImageCategoryCounts();

function articlesWith(text: string) {
  return screen.getAllByRole('article').filter((article) => within(article).queryByText(text));
}

it('publishes all 64 cases with local attributed previews', () => {
  expect(gptImageCases).toHaveLength(64);
  expect(new Set(gptImageCases.map((item) => item.id)).size).toBe(64);
  expect(gptImageImageCount).toBe(114);
  expect(categories.map((category) => [category.name, category.count])).toEqual([
    ['官方发布与演示', 4],
    ['GIF 动图', 20],
    ['表情包与贴纸', 7],
    ['人像与写真', 3],
    ['海报与平面设计', 2],
    ['插画与风格化视觉', 1],
    ['图片编辑与参考图', 1],
    ['模型对比', 10],
    ['混用工作流', 16],
  ]);
  expect(gptImageCases.filter((item) => item.mixed)).toHaveLength(16);
  expect(gptImageCases.filter((item) => !item.mixed)).toHaveLength(48);
  const imageFiles = new Set<string>();
  for (const item of gptImageCases) {
    expect(item.author.name).toBeTruthy();
    expect(item.author.url).toMatch(/^https:\/\//);
    expect(item.source_url).toMatch(/^https:\/\//);
    expect(item.tools.length).toBeGreaterThan(0);
    if (item.mixed) {
      expect(item.workflow.length).toBeGreaterThan(0);
      expect(item.category).toBe('混用工作流');
    } else {
      expect(item.workflow).toEqual([]);
    }
    for (const image of item.images) {
      const file = path.join(process.cwd(), 'public', image.src.replace(/^\//, ''));
      expect(fs.existsSync(file)).toBe(true);
      expect(fs.statSync(file).size).toBeLessThan(500 * 1024);
      expect(image.original_post_url).toMatch(/^https:\/\//);
      imageFiles.add(file);
    }
  }
  expect(imageFiles.size).toBe(114);
  expect(generateStaticParams()).toHaveLength(64);
});

it('renders the collection, filters by kind and category, and labels every card', () => {
  render(<GptImageCasesPage />);
  expect(screen.getByRole('heading', { level: 1, name: /GPT Image 2.6/ })).toBeInTheDocument();
  expect(screen.getByText('图片和演示归原作者所有，本页仅作截图预览与整理。')).toBeInTheDocument();
  expect(screen.getByText(/不代表 OpenAI/)).toBeInTheDocument();
  expect(screen.getByText(/API 型号为 gpt-image-2\.6-flare 与 gpt-image-2\.6-sunburst/)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /OpenAI 发布说明/ })).toHaveAttribute('href', 'https://openai.com/index/introducing-images-2-6/');
  expect(screen.getByRole('region', { name: '生财有术 3 天体验卡' })).toBeInTheDocument();
  expect(screen.getAllByRole('article')).toHaveLength(64);
  expect(articlesWith('纯 GPT Image 2.6')).toHaveLength(48);
  expect(articlesWith('混用工作流')).toHaveLength(16);
  expect(articlesWith('OpenAI 官方发布')).toHaveLength(4);
  expect(screen.getAllByRole('link', { name: /作者 / })).toHaveLength(64);
  expect(screen.getAllByRole('link', { name: /原帖/ })).toHaveLength(64);

  const published = gptImageCases.find((item) => item.id === 'pixel-jungle');
  if (!published?.prompt.text) throw new Error('missing published prompt');
  expect(screen.queryByText(published.prompt.text)).not.toBeInTheDocument();

  const kindGroup = screen.getByRole('group', { name: '生成方式' });
  fireEvent.click(within(kindGroup).getByRole('button', { name: /混用工作流/ }));
  expect(within(kindGroup).getByRole('button', { name: /混用工作流/ })).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getAllByRole('article')).toHaveLength(16);
  expect(screen.getByText('16 / 64 例')).toBeInTheDocument();
  expect(articlesWith('纯 GPT Image 2.6')).toHaveLength(0);

  fireEvent.click(within(kindGroup).getByRole('button', { name: /纯 GPT Image 2.6/ }));
  expect(screen.getAllByRole('article')).toHaveLength(48);
  expect(articlesWith('混用工作流')).toHaveLength(0);

  const categoryGroup = screen.getByRole('group', { name: '分类' });
  fireEvent.click(within(categoryGroup).getByRole('button', { name: /GIF 动图/ }));
  expect(screen.getAllByRole('article')).toHaveLength(20);
  expect(screen.getByText('20 / 64 例')).toBeInTheDocument();

  fireEvent.click(within(kindGroup).getByRole('button', { name: /混用工作流/ }));
  fireEvent.click(within(categoryGroup).getByRole('button', { name: /官方发布与演示/ }));
  expect(screen.queryAllByRole('article')).toHaveLength(0);
  expect(screen.getByText('当前筛选下没有案例。换一个分类或生成方式看看。')).toBeInTheDocument();

  fireEvent.click(within(kindGroup).getByRole('button', { name: /全部案例/ }));
  fireEvent.click(within(categoryGroup).getByRole('button', { name: /^全部/ }));
  expect(screen.getAllByRole('article')).toHaveLength(64);
});

it('shows an official pure case with an unpublished prompt and a local preview', () => {
  const item = gptImageCases.find((entry) => entry.id === 'openai-launch');
  if (!item) throw new Error('missing openai-launch');
  render(<CaseDetail item={item} />);
  expect(screen.getByRole('heading', { level: 1, name: item.title })).toBeInTheDocument();
  expect(screen.getByText('纯 GPT Image 2.6')).toBeInTheDocument();
  expect(screen.getByText('未公开提示词')).toBeInTheDocument();
  expect(screen.queryByText('展开公开提示词')).not.toBeInTheDocument();
  expect(screen.queryByText('分步流程')).not.toBeInTheDocument();
  expect(screen.getByText(/本条来自 OpenAI 官方发布/)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /OpenAI 官方发布/ })).toHaveAttribute('href', 'https://openai.com/index/introducing-images-2-6/');
  expect(screen.getByRole('link', { name: /作者 OpenAI/ })).toHaveAttribute('href', item.author.url);
  expect(screen.getByRole('img', { name: new RegExp(item.title) })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /查看原帖/ })).toHaveAttribute('href', item.images[0].original_post_url);
  expect(screen.getByText(/图片归 OpenAI 所有/)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /上一条/ })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /下一条/ })).toBeInTheDocument();

  cleanup();
  render(<CaseDetail item={gptImageCases[0]} />);
  expect(screen.queryByRole('link', { name: /上一条/ })).not.toBeInTheDocument();
  expect(screen.getByRole('link', { name: /下一条/ })).toBeInTheDocument();
});

it('keeps a public prompt collapsed in wording and shows every preview', () => {
  const item = gptImageCases.find((entry) => entry.id === 'dancing-cat');
  const posters = gptImageCases.find((entry) => entry.id === 'asset-turntables');
  if (!item?.prompt.text || !posters) throw new Error('missing pure fixtures');
  render(<CaseDetail item={item} />);
  expect(screen.getByText('纯 GPT Image 2.6')).toBeInTheDocument();
  expect(screen.getByText('展开公开提示词')).toBeInTheDocument();
  expect(screen.getByText(item.prompt.text)).toBeInTheDocument();
  expect(screen.queryByText('未公开提示词')).not.toBeInTheDocument();
  expect(screen.queryByText('分步流程')).not.toBeInTheDocument();
  expect(screen.queryByText(/一次生成/)).not.toBeInTheDocument();

  cleanup();
  render(<CaseDetail item={posters} />);
  expect(screen.getAllByRole('img')).toHaveLength(posters.images.length);
  posters.images.forEach((image, index) => {
    expect(screen.getAllByRole('link', { name: /查看原帖/ })[index]).toHaveAttribute('href', image.original_post_url);
  });
});

it('shows a mixed workflow in full, including steps the source left unexplained', () => {
  const farm = gptImageCases.find((entry) => entry.id === 'farm-language-game');
  const relay = gptImageCases.find((entry) => entry.id === 'gif-to-h3-video');
  const demo = gptImageCases.find((entry) => entry.id === 'watercolor-flipbook');
  const last = gptImageCases[gptImageCases.length - 1];
  if (!farm || !relay?.prompt.text || !demo?.live_demo_url) throw new Error('missing mixed fixtures');

  render(<CaseDetail item={farm} />);
  expect(screen.getAllByText('混用工作流').length).toBeGreaterThan(0);
  expect(screen.getByRole('heading', { level: 2, name: '分步流程' })).toBeInTheDocument();
  expect(within(screen.getByRole('region', { name: '分步流程' })).getAllByRole('listitem')).toHaveLength(farm.workflow.length);
  for (const step of farm.workflow) expect(screen.getByText(step)).toBeInTheDocument();
  expect(screen.getAllByText(/原帖未说明/).length).toBeGreaterThan(0);
  expect(screen.getByText('GPT-Image-2.6')).toBeInTheDocument();
  expect(screen.getByText('Claude Opus 5.5')).toBeInTheDocument();
  expect(screen.getByText('未公开提示词')).toBeInTheDocument();
  expect(screen.queryByText(/纯 GPT Image 2.6 一次生成/)).not.toBeInTheDocument();
  expect(screen.queryByText('展开公开提示词')).not.toBeInTheDocument();

  cleanup();
  render(<CaseDetail item={relay} />);
  expect(screen.getByText(/在 ChatGPT（GPT Image 2.6）上先生成/)).toBeInTheDocument();
  expect(screen.getAllByText(/交给 Minimax H3/).length).toBeGreaterThan(0);
  expect(screen.getByText('展开 H3 公开的提示词')).toBeInTheDocument();
  expect(screen.getByText(/Transform the reference video into Doom 2/)).toBeInTheDocument();
  expect(screen.getByText('展开公开提示词')).toBeInTheDocument();
  expect(screen.getByText(relay.prompt.text)).toBeInTheDocument();

  cleanup();
  render(<CaseDetail item={demo} />);
  expect(screen.getByRole('link', { name: /在线演示/ })).toHaveAttribute('href', demo.live_demo_url);
  expect(screen.getAllByText(/原帖未说明/).length).toBeGreaterThan(0);

  cleanup();
  render(<CaseDetail item={last} />);
  expect(screen.getAllByText('混用工作流').length).toBeGreaterThan(0);
  expect(screen.getByRole('link', { name: /上一条/ })).toBeInTheDocument();
  expect(screen.queryByRole('link', { name: /下一条/ })).not.toBeInTheDocument();
  expect(last.workflow.join('\n')).toMatch(/原帖未说明/);
  expect(screen.getByText(last.workflow[0])).toBeInTheDocument();
});

it('adds the collection and every case to the sitemap and the resource library', async () => {
  const urls = (await sitemap()).map((entry) => entry.url);
  expect(urls.some((url) => url.endsWith('/gpt-image-2-6-cases'))).toBe(true);
  for (const item of gptImageCases) {
    expect(urls.some((url) => url.endsWith(`/gpt-image-2-6-cases/${item.id}`))).toBe(true);
  }
  render(<ResourcesPage />);
  expect(screen.getByRole('link', { name: /打开 GPT Image 2.6 案例合集/ })).toHaveAttribute('href', '/gpt-image-2-6-cases');
  const home = fs.readFileSync(path.join(process.cwd(), 'src/app/page.tsx'), 'utf8');
  expect(home).toContain('href="/gpt-image-2-6-cases"');
});

it('formats workflow prompts, notes, and link labels', () => {
  expect(visiblePromptNote('未公开提示词。官方只展示了成品。', 'unpublished')).toBe('官方只展示了成品。');
  expect(visiblePromptNote('未公开提示词', 'unpublished')).toBeNull();
  expect(visiblePromptNote(null, 'unpublished')).toBeNull();
  expect(visiblePromptNote(' 作者公开了原文。 ', 'published')).toBe('作者公开了原文。');
  expect(splitWorkflowStep('第1步：用 GPT Image 2.6 出图。原帖未说明提示词。')).toEqual({
    body: '第1步：用 GPT Image 2.6 出图。原帖未说明提示词。',
    prompt: null,
    promptLabel: null,
  });
  expect(splitWorkflowStep('第3步：交给 Kling。Kling 提示词（原帖公开）：camera move')).toEqual({
    body: '第3步：交给 Kling。',
    prompt: 'camera move',
    promptLabel: 'Kling',
  });
  expect(mediaTypeLabel('gif_preview')).toBe('GIF 静态预览');
  expect(mediaTypeLabel('video_thumbnail')).toBe('视频封面');
  expect(mediaTypeLabel('photo')).toBe('原帖图片');
  expect(mediaTypeLabel('other')).toBe('效果预览');
  expect(kindLabel(false)).toBe('纯 GPT Image 2.6');
  expect(kindLabel(true)).toBe('混用工作流');
  expect(linkHostLabel('https://x.com/OpenAI/status/1')).toBe('X');
  expect(linkHostLabel('https://openai.com/index/introducing-images-2-6/')).toBe('OpenAI');
  expect(linkHostLabel('https://www.openai.com/index/introducing-images-2-6/')).toBe('OpenAI');
  expect(linkHostLabel('https://github.com/example/repo')).toBe('GitHub');
  expect(linkHostLabel('https://example.com/demo')).toBe('example.com');
  expect(linkHostLabel('not a url')).toBe('链接');
  expect(relatedLinkLabel('https://openai.com/index/introducing-images-2-6/')).toBe('OpenAI 发布说明');
  expect(relatedLinkLabel('https://x.com/OpenAI')).toBe('X');
  expect(cards).toHaveLength(64);
});

it('renders the gallery from prepared cards', () => {
  render(<Gallery cards={cards} categories={categories} />);
  expect(screen.getByRole('link', { name: `${cards[0].title} 效果预览` })).toHaveAttribute('href', `/gpt-image-2-6-cases/${cards[0].id}`);
  expect(screen.getAllByText(/2 张/).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/GIF 静态预览/).length).toBeGreaterThan(0);
});
