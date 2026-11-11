import fs from 'fs';
import path from 'path';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import sitemap from '@/app/sitemap';
import ResourcesPage from '@/app/resources/page';
import { siteConfig } from '@/lib/config';
import {
  GEMINI_OFFICIAL,
  kindLabel,
  linkHostLabel,
  mediaTypeLabel,
  relatedLinkLabel,
  splitWorkflowStep,
  visiblePromptNote,
} from '@/lib/gemini-format';
import {
  getGeminiCategoryCounts,
  getGeminiGalleryCards,
  geminiCases,
  geminiCollection,
  geminiImageCount,
  geminiMixedCount,
  geminiSceneCount,
} from '@/lib/gemini-cases';
import { generateMetadata, generateStaticParams } from '../[id]/page';
import CaseDetail from '../detail';
import Gallery from '../gallery';
import GeminiCasesPage, { metadata } from '../page';

jest.mock('@/lib/posts', () => ({
  getAllPosts: jest.fn(async () => []),
}));

const cards = getGeminiGalleryCards();
const categories = getGeminiCategoryCounts();

function articlesWith(text: string) {
  return screen.getAllByRole('article').filter((article) => within(article).queryByText(text));
}

it('publishes all 57 cases with local attributed previews', () => {
  expect(geminiCases).toHaveLength(57);
  expect(new Set(geminiCases.map((item) => item.id)).size).toBe(57);
  expect(geminiImageCount).toBe(58);
  expect(geminiSceneCount).toBe(23);
  expect(geminiMixedCount).toBe(11);
  expect(geminiCollection.launch.announced).toBe('2026-10-28');
  expect(geminiCollection.launch.generally_available).toBe('2026-11-10');
  expect(geminiCollection.launch.official_blog_intro).toBe(GEMINI_OFFICIAL.blogIntro);
  expect(geminiCollection.launch.official_blog_available).toBe(GEMINI_OFFICIAL.blogAvailable);
  expect(categories.map((category) => [category.name, category.count])).toEqual([
    ['官方发布与演示', 10],
    ['3D 场景与物理仿真', 23],
    ['游戏与可玩原型', 8],
    ['网站、应用与数据工具', 4],
    ['SVG 与创意编程', 2],
    ['同题对比实测', 7],
    ['混用工作流', 3],
  ]);
  const imageFiles = new Set<string>();
  for (const item of geminiCases) {
    expect(item.author.name).toBeTruthy();
    expect(item.author.url).toMatch(/^https:\/\//);
    expect(item.source_url).toMatch(/^https:\/\//);
    expect(item.tools.length).toBeGreaterThan(0);
    if (item.mixed) {
      expect(item.workflow.length).toBeGreaterThan(0);
    } else {
      expect(item.workflow).toEqual([]);
    }
    for (const image of item.images) {
      const file = path.join(process.cwd(), 'public', image.src.replace(/^\//, ''));
      expect(fs.existsSync(file)).toBe(true);
      expect(fs.statSync(file).size).toBeLessThan(500 * 1024);
      expect(image.src.startsWith('/images/gemini-4-carbon/')).toBe(true);
      expect(image.original_post_url).toMatch(/^https:\/\//);
      expect(image.copyright_note).toBeTruthy();
      imageFiles.add(file);
    }
  }
  expect(imageFiles.size).toBe(58);
  const onDisk = fs.readdirSync(path.join(process.cwd(), 'public/images/gemini-4-carbon'));
  expect(onDisk).toHaveLength(58);
  expect(generateStaticParams()).toEqual(geminiCases.map((item) => ({ id: item.id })));
});

it('renders the collection, official figures, and filters by kind and category', () => {
  render(<GeminiCasesPage />);
  expect(metadata.alternates?.canonical).toBe(`${siteConfig.url}/gemini-4-carbon-cases`);
  expect(screen.getByRole('heading', { level: 1, name: /Gemini 4 Carbon/ })).toBeInTheDocument();
  expect(screen.getByText(/2026-10-28 宣布，2026-11-10 正式开放/)).toBeInTheDocument();
  expect(screen.getByText(/3D 和仿真类案例占比较高/)).toBeInTheDocument();
  expect(screen.getByText(/价格和跑分均为官方数据/)).toBeInTheDocument();
  expect(screen.getByText(/每百万 token 输入 2 美元/)).toBeInTheDocument();
  expect(screen.getByText(/CursorBench 4.0/)).toBeInTheDocument();
  expect(screen.getByText(/不要把借助 Blender、Unity、FreeCAD、Omni、Nano Banana、Lyria 等工具的作品说成纯模型一次成型/)).toBeInTheDocument();
  expect(screen.getByText('图片版权归原作者或 Google / Google DeepMind。本页只放截图预览，不放整段视频。')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: '官方介绍 ↗' })).toHaveAttribute('href', GEMINI_OFFICIAL.blogIntro);
  expect(screen.getByRole('link', { name: '正式开放 ↗' })).toHaveAttribute('href', GEMINI_OFFICIAL.blogAvailable);
  expect(screen.getByRole('link', { name: 'Gemini 4 Carbon 介绍' })).toHaveAttribute('href', GEMINI_OFFICIAL.blogIntro);
  expect(screen.getByRole('link', { name: 'Gemini 4 Carbon 现已开放' })).toHaveAttribute('href', GEMINI_OFFICIAL.blogAvailable);
  expect(screen.queryByRole('region', { name: '生财有术 3 天体验卡' })).not.toBeInTheDocument();
  expect(screen.getAllByRole('article')).toHaveLength(57);
  expect(articlesWith('纯 Carbon')).toHaveLength(46);
  expect(articlesWith('混用工作流')).toHaveLength(11);
  expect(articlesWith('Google 官方发布')).toHaveLength(10);
  expect(screen.getAllByRole('link', { name: /作者 / })).toHaveLength(57);
  expect(screen.getAllByRole('link', { name: /原帖/ })).toHaveLength(57);

  const published = geminiCases.find((item) => item.id === 'sunset-drone-show');
  if (!published?.prompt.text) throw new Error('missing published prompt');
  expect(screen.queryByText(published.prompt.text)).not.toBeInTheDocument();

  const kindGroup = screen.getByRole('group', { name: '生成方式' });
  fireEvent.click(within(kindGroup).getByRole('button', { name: /混用工作流/ }));
  expect(within(kindGroup).getByRole('button', { name: /混用工作流/ })).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getAllByRole('article')).toHaveLength(11);
  expect(screen.getByText('11 / 57 例')).toBeInTheDocument();

  const categoryGroup = screen.getByRole('group', { name: '分类' });
  fireEvent.click(within(categoryGroup).getByRole('button', { name: /3D 场景与物理仿真/ }));
  expect(screen.getAllByRole('article')).toHaveLength(3);
  expect(screen.getByText('3 / 57 例')).toBeInTheDocument();

  fireEvent.click(within(kindGroup).getByRole('button', { name: /纯 Carbon/ }));
  fireEvent.click(within(categoryGroup).getByRole('button', { name: /混用工作流/ }));
  expect(screen.queryAllByRole('article')).toHaveLength(0);
  expect(screen.getByText('当前筛选下没有案例。换一个分类或生成方式看看。')).toBeInTheDocument();

  fireEvent.click(within(kindGroup).getByRole('button', { name: /全部案例/ }));
  fireEvent.click(within(categoryGroup).getByRole('button', { name: /^全部/ }));
  expect(screen.getAllByRole('article')).toHaveLength(57);
});

it('shows an official case with an unpublished prompt and a local preview', () => {
  const item = geminiCases.find((entry) => entry.id === 'official-sundar-announce');
  if (!item) throw new Error('missing official-sundar-announce');
  const detailMetadata = generateMetadata({ params: { id: item.id } });
  expect(detailMetadata.alternates?.canonical).toBe(`${siteConfig.url}/gemini-4-carbon-cases/${item.id}`);
  render(<CaseDetail item={item} />);
  expect(screen.getByRole('heading', { level: 1, name: item.title })).toBeInTheDocument();
  expect(screen.getByText('纯 Carbon')).toBeInTheDocument();
  expect(screen.getByText('未公开提示词')).toBeInTheDocument();
  expect(screen.getByText('官方发布帖，不是提示词案例。')).toBeInTheDocument();
  expect(screen.queryByText('展开公开提示词')).not.toBeInTheDocument();
  expect(screen.queryByText('分步流程')).not.toBeInTheDocument();
  expect(screen.queryByText(/纯模型一次成型/)).not.toBeInTheDocument();
  expect(screen.getByText(/本条来自 Google 官方发布/)).toBeInTheDocument();
  expect(screen.getByText(/官方数据/)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /作者 Sundar Pichai/ })).toHaveAttribute('href', item.author.url);
  expect(screen.getByText(item.published_at_shanghai)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /^原帖 ↗/ })).toHaveAttribute('href', item.source_url);
  expect(screen.getByRole('img', { name: new RegExp(item.title) })).toHaveAttribute('src', item.images[0].src);
  expect(screen.getByRole('link', { name: /查看原帖/ })).toHaveAttribute('href', item.images[0].original_post_url);
  expect(screen.getByRole('link', { name: /下一条/ })).toBeInTheDocument();
  expect(screen.queryByRole('link', { name: /上一条/ })).not.toBeInTheDocument();
});

it('shows the pelican mixed workflow without treating it as a one-shot render', () => {
  const item = geminiCases.find((entry) => entry.id === 'official-pelican-campus');
  if (!item) throw new Error('missing official-pelican-campus');
  render(<CaseDetail item={item} />);
  expect(screen.getAllByText('混用工作流').length).toBeGreaterThan(0);
  expect(screen.getByRole('heading', { level: 2, name: '分步流程' })).toBeInTheDocument();
  expect(within(screen.getByRole('region', { name: '分步流程' })).getAllByRole('listitem')).toHaveLength(item.workflow.length);
  for (const step of item.workflow) expect(screen.getByText(step)).toBeInTheDocument();
  expect(screen.getAllByText(/原帖未说明/).length).toBeGreaterThan(0);
  expect(screen.getByText(/不要把它看成纯模型一次成型/)).toBeInTheDocument();
  expect(screen.getByText('未公开提示词')).toBeInTheDocument();
  expect(screen.queryByText('展开公开提示词')).not.toBeInTheDocument();
  expect(screen.getAllByRole('img')).toHaveLength(item.images.length);
  expect(screen.getByText('Blender')).toBeInTheDocument();
  expect(screen.getByText('Lyria')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /在线演示/ })).toHaveAttribute('href', item.live_demo_url);
  expect(screen.getAllByRole('img').every((img) => String(img.getAttribute('src')).startsWith('/images/gemini-4-carbon/'))).toBe(true);
});

it('keeps a public prompt collapsed and credits a different poster', () => {
  const item = geminiCases.find((entry) => entry.id === 'simon-yonkers-mech');
  const posted = geminiCases.find((entry) => entry.id === 'official-eiffel-exhibit');
  const last = geminiCases[geminiCases.length - 1];
  if (!item?.prompt.text || !posted?.posted_by) throw new Error('missing detail fixtures');
  render(<CaseDetail item={item} />);
  expect(screen.getByText('展开公开提示词')).toBeInTheDocument();
  expect(screen.getByText(item.prompt.text)).toBeInTheDocument();
  expect(screen.getByText('混用工作流')).toBeInTheDocument();
  expect(screen.getByText(item.method)).toBeInTheDocument();

  cleanup();
  render(<CaseDetail item={posted} />);
  expect(screen.getByRole('link', { name: /作者 Google DeepMind/ })).toHaveAttribute('href', posted.author.url);
  expect(screen.getByRole('link', { name: /发布 Koray Kavukcuoglu/ })).toHaveAttribute('href', posted.posted_by.url);

  cleanup();
  render(<CaseDetail item={last} />);
  expect(screen.getByRole('link', { name: /上一条/ })).toBeInTheDocument();
  expect(screen.queryByRole('link', { name: /下一条/ })).not.toBeInTheDocument();
});

it('adds the collection and every case to the sitemap, home page, and resource library', async () => {
  const urls = (await sitemap()).map((entry) => entry.url);
  expect(urls.some((url) => url.endsWith('/gemini-4-carbon-cases'))).toBe(true);
  for (const item of geminiCases) {
    expect(urls.some((url) => url.endsWith(`/gemini-4-carbon-cases/${item.id}`))).toBe(true);
  }
  render(<ResourcesPage />);
  expect(screen.getByRole('link', { name: /打开 Gemini 4 Carbon 案例合集/ })).toHaveAttribute('href', '/gemini-4-carbon-cases');
  const home = fs.readFileSync(path.join(process.cwd(), 'src/app/page.tsx'), 'utf8');
  const listPage = fs.readFileSync(path.join(process.cwd(), 'src/app/gemini-4-carbon-cases/page.tsx'), 'utf8');
  const detailPage = fs.readFileSync(path.join(process.cwd(), 'src/app/gemini-4-carbon-cases/[id]/page.tsx'), 'utf8');
  expect(home).toContain('href="/gemini-4-carbon-cases"');
  expect(listPage).not.toContain('ShengcaiInviteCard');
  expect(detailPage).not.toContain('ShengcaiInviteCard');
});

it('formats workflow prompts, notes, and link labels', () => {
  expect(visiblePromptNote('未公开提示词。官方只展示了成品。', 'unpublished')).toBe('官方只展示了成品。');
  expect(visiblePromptNote('未公开提示词', 'unpublished')).toBeNull();
  expect(visiblePromptNote(null, 'unpublished')).toBeNull();
  expect(splitWorkflowStep('第1步：用 Gemini 4 Carbon 写场景。原帖未说明提示词。')).toEqual({
    body: '第1步：用 Gemini 4 Carbon 写场景。原帖未说明提示词。',
    prompt: null,
    promptLabel: null,
  });
  expect(splitWorkflowStep('第2步：交给 Blender。Blender 提示词（原帖公开）：campus')).toEqual({
    body: '第2步：交给 Blender。',
    prompt: 'campus',
    promptLabel: 'Blender',
  });
  expect(mediaTypeLabel('video_thumbnail')).toBe('视频封面');
  expect(mediaTypeLabel('photo')).toBe('原帖图片');
  expect(mediaTypeLabel('other')).toBe('效果预览');
  expect(kindLabel(false)).toBe('纯 Carbon');
  expect(kindLabel(true)).toBe('混用工作流');
  expect(linkHostLabel('https://x.com/sundarpichai')).toBe('X');
  expect(linkHostLabel('https://github.com/google-gemini/demolab')).toBe('GitHub');
  expect(linkHostLabel('https://www.youtube.com/watch?v=dNbkThtNzS8')).toBe('YouTube');
  expect(linkHostLabel('https://aistudio.google.com/apps/bundled/pelican-campus-quest')).toBe('Google AI Studio');
  expect(linkHostLabel(GEMINI_OFFICIAL.blogIntro)).toBe('Google');
  expect(linkHostLabel('not a url')).toBe('链接');
  expect(relatedLinkLabel(GEMINI_OFFICIAL.blogIntro)).toBe('Gemini 4 Carbon 介绍');
  expect(relatedLinkLabel(GEMINI_OFFICIAL.blogAvailable)).toBe('Gemini 4 Carbon 现已开放');
  expect(relatedLinkLabel(GEMINI_OFFICIAL.blogDevelopers)).toBe('开发者说明');
  expect(relatedLinkLabel(GEMINI_OFFICIAL.launchSundar)).toBe('官方发布帖');
  expect(relatedLinkLabel(GEMINI_OFFICIAL.availableLogan)).toBe('正式开放帖');
  expect(relatedLinkLabel(GEMINI_OFFICIAL.pelican)).toBe('官方鹈鹕演示帖');
  expect(relatedLinkLabel('https://x.com/sundarpichai')).toBe('X');
  expect(cards).toHaveLength(57);
});

it('renders the gallery from prepared cards', () => {
  render(<Gallery cards={cards} categories={categories} />);
  expect(screen.getByRole('link', { name: `${cards[0].title} 效果预览` })).toHaveAttribute('href', `/gemini-4-carbon-cases/${cards[0].id}`);
  const link = screen.getByRole('link', { name: `${cards[0].title} 效果预览` });
  expect(link.querySelector('img')).toHaveAttribute('src', cards[0].image.src);
});
