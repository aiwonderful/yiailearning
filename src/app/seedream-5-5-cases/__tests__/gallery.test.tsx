import fs from 'fs';
import path from 'path';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import sitemap from '@/app/sitemap';
import ResourcesPage from '@/app/resources/page';
import {
  SEEDREAM_OFFICIAL,
  kindLabel,
  linkHostLabel,
  mediaTypeLabel,
  relatedLinkLabel,
  splitWorkflowStep,
  visiblePromptNote,
} from '@/lib/seedream-format';
import {
  getSeedreamCategoryCounts,
  getSeedreamGalleryCards,
  seedreamCases,
  seedreamCollection,
  seedreamImageCount,
} from '@/lib/seedream-cases';
import { generateStaticParams } from '../[id]/page';
import CaseDetail from '../detail';
import Gallery from '../gallery';
import SeedreamCasesPage from '../page';

jest.mock('@/lib/posts', () => ({
  getAllPosts: jest.fn(async () => []),
}));

const cards = getSeedreamGalleryCards();
const categories = getSeedreamCategoryCounts();

function articlesWith(text: string) {
  return screen.getAllByRole('article').filter((article) => within(article).queryByText(text));
}

function webpAnimated(file: string) {
  const data = fs.readFileSync(file);
  let index = 12;
  let animated = false;
  while (index + 8 <= data.length) {
    const tag = data.toString('ascii', index, index + 4);
    const size = data.readUInt32LE(index + 4);
    if (tag === 'VP8X') animated = animated || Boolean(data[index + 8] & 2);
    if (tag === 'ANMF') animated = true;
    index += 8 + size + (size & 1);
  }
  return animated;
}

it('publishes all 64 cases with local attributed previews', () => {
  expect(seedreamCases).toHaveLength(64);
  expect(new Set(seedreamCases.map((item) => item.id)).size).toBe(64);
  expect(seedreamImageCount).toBe(118);
  expect(seedreamCollection.announced).toBe('2026-11-09');
  expect(seedreamCollection.official_page).toBe(SEEDREAM_OFFICIAL.pageZh);
  expect(seedreamCollection.official_blog).toBe(SEEDREAM_OFFICIAL.blogZh);
  expect(seedreamCollection.official_launch_post).toBe(SEEDREAM_OFFICIAL.launchPost);
  expect(seedreamCollection.official_claims.some((claim) => claim.includes('100 轮'))).toBe(true);
  expect(categories.map((category) => [category.name, category.count])).toEqual([
    ['官方发布与演示', 1],
    ['多轮编辑与一致性', 16],
    ['透明素材与贴纸', 10],
    ['人像与写实摄影', 11],
    ['海报、排版与小字', 7],
    ['电商、角色与设计物料', 6],
    ['混用工作流', 4],
    ['模型对比', 9],
  ]);
  expect(seedreamCases.filter((item) => item.mixed)).toHaveLength(4);
  expect(seedreamCases.filter((item) => !item.mixed)).toHaveLength(60);
  const imageFiles = new Set<string>();
  let animated = 0;
  for (const item of seedreamCases) {
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
      expect(image.animated).toBe(webpAnimated(file));
      if (!image.animated) expect(fs.statSync(file).size).toBeLessThan(500 * 1024);
      expect(image.original_post_url).toMatch(/^https:\/\//);
      expect(image.copyright_note).toBeTruthy();
      if (image.animated) animated += 1;
      imageFiles.add(file);
    }
  }
  expect(imageFiles.size).toBe(118);
  expect(animated).toBe(24);
  const onDisk = fs.readdirSync(path.join(process.cwd(), 'public/images/seedream-5-5'));
  expect(onDisk).toHaveLength(118);
  expect(generateStaticParams()).toHaveLength(64);
});

it('renders the collection, filters by kind and category, and labels every card', () => {
  render(<SeedreamCasesPage />);
  expect(screen.getByRole('heading', { level: 1, name: /Seedream 5.5/ })).toBeInTheDocument();
  expect(screen.getByText('图片和演示归原作者所有；官方演示归官方发布。本页仅作截图预览与整理。')).toBeInTheDocument();
  expect(screen.getByText(/不代表字节跳动 Seed/)).toBeInTheDocument();
  expect(screen.getByText(/100 轮编辑中保持像素级稳定/)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /官方博客 ↗/ })).toHaveAttribute('href', SEEDREAM_OFFICIAL.blogZh);
  expect(screen.getByRole('link', { name: '中文产品页' })).toHaveAttribute('href', SEEDREAM_OFFICIAL.pageZh);
  expect(screen.getByRole('link', { name: /官方发布帖/ })).toHaveAttribute('href', SEEDREAM_OFFICIAL.launchPost);
  expect(screen.getByRole('region', { name: '生财有术 3 天体验卡' })).toBeInTheDocument();
  expect(screen.getAllByRole('article')).toHaveLength(64);
  expect(articlesWith('纯 Seedream 5.5')).toHaveLength(60);
  expect(articlesWith('混用工作流')).toHaveLength(4);
  expect(articlesWith('ByteDance Seed 官方发布')).toHaveLength(20);
  expect(screen.getAllByRole('link', { name: /作者 / })).toHaveLength(64);
  expect(screen.getAllByRole('link', { name: /原帖/ })).toHaveLength(64);

  const published = seedreamCases.find((item) => item.id === 'official-rgba-run');
  if (!published?.prompt.text) throw new Error('missing published prompt');
  expect(screen.queryByText(published.prompt.text)).not.toBeInTheDocument();

  const kindGroup = screen.getByRole('group', { name: '生成方式' });
  fireEvent.click(within(kindGroup).getByRole('button', { name: /混用工作流/ }));
  expect(within(kindGroup).getByRole('button', { name: /混用工作流/ })).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getAllByRole('article')).toHaveLength(4);
  expect(screen.getByText('4 / 64 例')).toBeInTheDocument();
  expect(articlesWith('纯 Seedream 5.5')).toHaveLength(0);

  fireEvent.click(within(kindGroup).getByRole('button', { name: /纯 Seedream 5.5/ }));
  expect(screen.getAllByRole('article')).toHaveLength(60);
  expect(articlesWith('混用工作流')).toHaveLength(0);

  const categoryGroup = screen.getByRole('group', { name: '分类' });
  fireEvent.click(within(categoryGroup).getByRole('button', { name: /透明素材与贴纸/ }));
  expect(screen.getAllByRole('article')).toHaveLength(10);
  expect(screen.getByText('10 / 64 例')).toBeInTheDocument();

  fireEvent.click(within(kindGroup).getByRole('button', { name: /混用工作流/ }));
  fireEvent.click(within(categoryGroup).getByRole('button', { name: /官方发布与演示/ }));
  expect(screen.queryAllByRole('article')).toHaveLength(0);
  expect(screen.getByText('当前筛选下没有案例。换一个分类或生成方式看看。')).toBeInTheDocument();

  fireEvent.click(within(kindGroup).getByRole('button', { name: /全部案例/ }));
  fireEvent.click(within(categoryGroup).getByRole('button', { name: /^全部/ }));
  expect(screen.getAllByRole('article')).toHaveLength(64);
});

it('shows an official pure case with an unpublished prompt and a local preview', () => {
  const item = seedreamCases.find((entry) => entry.id === 'official-launch-x');
  if (!item) throw new Error('missing official-launch-x');
  render(<CaseDetail item={item} />);
  expect(screen.getByRole('heading', { level: 1, name: item.title })).toBeInTheDocument();
  expect(screen.getByText('纯 Seedream 5.5')).toBeInTheDocument();
  expect(screen.getByText('未公开提示词')).toBeInTheDocument();
  expect(screen.queryByText('展开公开提示词')).not.toBeInTheDocument();
  expect(screen.queryByText('分步流程')).not.toBeInTheDocument();
  expect(screen.getByText(/本条来自字节跳动 Seed 官方发布/)).toBeInTheDocument();
  const blogs = screen.getAllByRole('link', { name: /官方博客/ });
  expect(blogs.length).toBeGreaterThan(0);
  for (const link of blogs) expect(link).toHaveAttribute('href', SEEDREAM_OFFICIAL.blogZh);
  expect(screen.getByRole('link', { name: /作者 ByteDance Seed/ })).toHaveAttribute('href', item.author.url);
  expect(screen.getByText(item.published_at_shanghai)).toBeInTheDocument();
  expect(screen.getByRole('img', { name: new RegExp(item.title) })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /查看原帖/ })).toHaveAttribute('href', item.images[0].original_post_url);
  expect(screen.getAllByText(/版权归 ByteDance Seed/).length).toBeGreaterThan(0);
  expect(screen.getByRole('link', { name: /下一条/ })).toBeInTheDocument();
  expect(screen.queryByRole('link', { name: /上一条/ })).not.toBeInTheDocument();
});

it('keeps a public prompt collapsed and shows every preview', () => {
  const item = seedreamCases.find((entry) => entry.id === 'official-rgba-run');
  const posters = seedreamCases.find((entry) => entry.id === 'uisdc-virtual-styling');
  const cover = seedreamCases.find((entry) => entry.id === 'nanyuan-guohua-gif');
  if (!item?.prompt.text || !posters || !cover) throw new Error('missing pure fixtures');
  render(<CaseDetail item={item} />);
  expect(screen.getByText('纯 Seedream 5.5')).toBeInTheDocument();
  expect(screen.getByText('展开公开提示词')).toBeInTheDocument();
  expect(screen.getByText(item.prompt.text)).toBeInTheDocument();
  expect(screen.queryByText('未公开提示词')).not.toBeInTheDocument();
  expect(screen.queryByText('分步流程')).not.toBeInTheDocument();
  const preview = screen.getByRole('img', { name: new RegExp(item.title) });
  expect(preview).toHaveAttribute('src', item.images[0].src);
  expect(preview.getAttribute('src')).not.toContain('/_next/image');
  expect(item.images[0].animated).toBe(true);

  cleanup();
  render(<CaseDetail item={posters} />);
  expect(screen.getAllByRole('img')).toHaveLength(posters.images.length);
  posters.images.forEach((image, index) => {
    expect(screen.getAllByRole('link', { name: /查看原帖/ })[index]).toHaveAttribute('href', image.original_post_url);
  });

  cleanup();
  render(<CaseDetail item={cover} />);
  expect(screen.getByText('未公开提示词')).toBeInTheDocument();
  expect(screen.getByText(/作者说明了多轮是在加花枝、添红果、补题字/)).toBeInTheDocument();
  expect(screen.getByText(/动图封面/)).toBeInTheDocument();
  expect(cover.images[0].animated).toBe(false);
});

it('shows a mixed workflow in full, including steps the source left unexplained', () => {
  const farm = seedreamCases.find((entry) => entry.id === 'ghostly-seedance-mixed');
  const stickers = seedreamCases.find((entry) => entry.id === 'huashu-gif-stickers-mixed');
  const calligraphy = seedreamCases.find((entry) => entry.id === 'uisdc-calligraphy-mixed');
  const last = seedreamCases[seedreamCases.length - 1];
  if (!farm || !stickers?.prompt.text || !calligraphy) throw new Error('missing mixed fixtures');

  render(<CaseDetail item={farm} />);
  expect(screen.getAllByText('混用工作流').length).toBeGreaterThan(0);
  expect(screen.getByRole('heading', { level: 2, name: '分步流程' })).toBeInTheDocument();
  expect(within(screen.getByRole('region', { name: '分步流程' })).getAllByRole('listitem')).toHaveLength(farm.workflow.length);
  for (const step of farm.workflow) expect(screen.getByText(step)).toBeInTheDocument();
  expect(screen.getAllByText(/原帖未说明/).length).toBeGreaterThan(0);
  expect(screen.getAllByText('Seedream 5.5').length).toBeGreaterThan(0);
  expect(screen.getByText('Seedance 2.5')).toBeInTheDocument();
  expect(screen.getByText('Suno')).toBeInTheDocument();
  expect(screen.getByText('未公开提示词')).toBeInTheDocument();
  expect(screen.queryByText('展开公开提示词')).not.toBeInTheDocument();

  cleanup();
  render(<CaseDetail item={stickers} />);
  expect(screen.getByText('展开公开提示词')).toBeInTheDocument();
  expect(screen.getByText(stickers.prompt.text)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /GitHub/ })).toHaveAttribute('href', stickers.repo_url);
  expect(within(screen.getByRole('region', { name: '分步流程' })).getAllByRole('listitem')).toHaveLength(stickers.workflow.length);
  const animated = screen.getAllByRole('img').find((img) => img.getAttribute('src') === stickers.images[0].src);
  expect(animated).toBeTruthy();
  expect(animated?.getAttribute('src')).not.toContain('/_next/image');

  cleanup();
  render(<CaseDetail item={calligraphy} />);
  expect(screen.getAllByText(/原帖未说明/).length).toBeGreaterThan(0);
  expect(screen.getByText(calligraphy.prompt.text || '')).toBeInTheDocument();

  cleanup();
  render(<CaseDetail item={last} />);
  expect(screen.getByText('纯 Seedream 5.5')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /上一条/ })).toBeInTheDocument();
  expect(screen.queryByRole('link', { name: /下一条/ })).not.toBeInTheDocument();
});

it('adds the collection and every case to the sitemap and the resource library', async () => {
  const urls = (await sitemap()).map((entry) => entry.url);
  expect(urls.some((url) => url.endsWith('/seedream-5-5-cases'))).toBe(true);
  for (const item of seedreamCases) {
    expect(urls.some((url) => url.endsWith(`/seedream-5-5-cases/${item.id}`))).toBe(true);
  }
  render(<ResourcesPage />);
  expect(screen.getByRole('link', { name: /打开 Seedream 5.5 案例合集/ })).toHaveAttribute('href', '/seedream-5-5-cases');
  const home = fs.readFileSync(path.join(process.cwd(), 'src/app/page.tsx'), 'utf8');
  expect(home).toContain('href="/seedream-5-5-cases"');
});

it('formats workflow prompts, notes, and link labels', () => {
  expect(visiblePromptNote('未公开提示词。官方只展示了成品。', 'unpublished')).toBe('官方只展示了成品。');
  expect(visiblePromptNote('未公开提示词', 'unpublished')).toBeNull();
  expect(visiblePromptNote(null, 'unpublished')).toBeNull();
  expect(visiblePromptNote(' 作者公开了原文。 ', 'published')).toBe('作者公开了原文。');
  expect(splitWorkflowStep('第1步：用 Seedream 5.5 出图。原帖未说明提示词。')).toEqual({
    body: '第1步：用 Seedream 5.5 出图。原帖未说明提示词。',
    prompt: null,
    promptLabel: null,
  });
  expect(splitWorkflowStep('第2步：交给 Photoshop。Photoshop 提示词（原帖公开）：overlay')).toEqual({
    body: '第2步：交给 Photoshop。',
    prompt: 'overlay',
    promptLabel: 'Photoshop',
  });
  expect(mediaTypeLabel('animated_gif')).toBe('动图');
  expect(mediaTypeLabel('animated_gif_thumbnail')).toBe('动图封面');
  expect(mediaTypeLabel('video_thumbnail')).toBe('视频封面');
  expect(mediaTypeLabel('photo')).toBe('原帖图片');
  expect(mediaTypeLabel('other')).toBe('效果预览');
  expect(kindLabel(false)).toBe('纯 Seedream 5.5');
  expect(kindLabel(true)).toBe('混用工作流');
  expect(linkHostLabel('https://x.com/ByteDanceSeed_')).toBe('X');
  expect(linkHostLabel(SEEDREAM_OFFICIAL.blogZh)).toBe('ByteDance Seed');
  expect(linkHostLabel('https://github.com/alchaincyf/huashu-selfie-sticker')).toBe('GitHub');
  expect(linkHostLabel(SEEDREAM_OFFICIAL.dreamina)).toBe('Dreamina');
  expect(linkHostLabel('https://www.uisdc.com/hangye/jm-seedream')).toBe('uisdc.com');
  expect(linkHostLabel('not a url')).toBe('链接');
  expect(relatedLinkLabel(SEEDREAM_OFFICIAL.pageZh)).toBe('Seedream 5.5 中文产品页');
  expect(relatedLinkLabel(SEEDREAM_OFFICIAL.pageEn)).toBe('Seedream 5.5 英文产品页');
  expect(relatedLinkLabel(SEEDREAM_OFFICIAL.blogZh)).toBe('官方博客');
  expect(relatedLinkLabel(SEEDREAM_OFFICIAL.blogEn)).toBe('官方英文博客');
  expect(relatedLinkLabel(SEEDREAM_OFFICIAL.launchPost)).toBe('官方发布帖');
  expect(relatedLinkLabel(SEEDREAM_OFFICIAL.dreamina)).toBe('Dreamina');
  expect(relatedLinkLabel('https://x.com/ByteDanceSeed_')).toBe('X');
  expect(cards).toHaveLength(64);
});

it('renders the gallery from prepared cards and keeps animated files on their own url', () => {
  render(<Gallery cards={cards} categories={categories} />);
  expect(screen.getByRole('link', { name: `${cards[0].title} 效果预览` })).toHaveAttribute('href', `/seedream-5-5-cases/${cards[0].id}`);
  expect(screen.getAllByText(/动图/).length).toBeGreaterThan(0);
  const animatedCard = cards.find((card) => card.image.animated);
  if (!animatedCard) throw new Error('missing animated card');
  const link = screen.getByRole('link', { name: `${animatedCard.title} 效果预览` });
  const image = link.querySelector('img');
  expect(image).toHaveAttribute('src', animatedCard.image.src);
  expect(image?.getAttribute('loading')).toBe('lazy');
  expect(image?.getAttribute('src')).not.toContain('/_next/image');
});

it('collapses a workflow prompt and shows a demo link when a case includes them', () => {
  const base = seedreamCases.find((entry) => entry.id === 'ghostly-seedance-mixed');
  if (!base) throw new Error('missing mixed fixture');
  const item = {
    ...base,
    id: 'synthetic-demo',
    live_demo_url: 'https://example.com/demo',
    workflow: ['第2步：交给 Photoshop。Photoshop 提示词（原帖公开）：overlay'],
  };
  render(<CaseDetail item={item} />);
  expect(screen.getByText('第2步：交给 Photoshop。')).toBeInTheDocument();
  expect(screen.getByText('展开 Photoshop 公开的提示词')).toBeInTheDocument();
  expect(screen.getByText('overlay')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /在线演示/ })).toHaveAttribute('href', 'https://example.com/demo');
});
