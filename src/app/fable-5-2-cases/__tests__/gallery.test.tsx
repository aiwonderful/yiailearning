import fs from 'fs';
import path from 'path';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import sitemap from '@/app/sitemap';
import {
  linkHostLabel,
  mediaTypeLabel,
  needsIpNotice,
  visiblePromptNote,
} from '@/lib/fable-format';
import { fableCases, getCategoryCounts, getGalleryCards } from '@/lib/fable-cases';
import FableCasesPage from '../page';
import CaseDetail from '../detail';
import Gallery from '../gallery';

jest.mock('@/lib/posts', () => ({
  getAllPosts: jest.fn(async () => []),
}));

const cards = getGalleryCards();
const categories = getCategoryCounts();

it('publishes all 54 cases with a local attributed image', () => {
  expect(fableCases).toHaveLength(54);
  expect(new Set(fableCases.map((item) => item.id)).size).toBe(54);
  expect(categories.map((category) => [category.name, category.count])).toEqual([
    ['官方科研与工程', 5],
    ['Three.js / 3D / Blender', 15],
    ['游戏与可玩交互', 12],
    ['动态设计与代码动画', 9],
    ['设计与界面', 7],
    ['解释与教学', 4],
    ['应用与系统', 2],
  ]);
  for (const item of fableCases) {
    expect(item.author.name).toBeTruthy();
    expect(item.source_url).toMatch(/^https:\/\//);
    expect(item.tools.length).toBeGreaterThan(0);
    for (const image of item.images) {
      const file = path.join(process.cwd(), 'public', image.src.replace(/^\//, ''));
      expect(fs.existsSync(file)).toBe(true);
      expect(fs.statSync(file).size).toBeLessThan(500 * 1024);
    }
  }
});

it('renders the collection, filters by category, and keeps author plus source on every card', () => {
  render(<FableCasesPage />);
  expect(screen.getByRole('heading', { level: 1, name: /Claude Fable 5.2/ })).toBeInTheDocument();
  expect(screen.getByText('图片和演示归原作者所有，本页仅作截图预览与整理。')).toBeInTheDocument();
  expect(screen.getAllByRole('article')).toHaveLength(54);
  expect(screen.getAllByRole('link', { name: /作者 / })).toHaveLength(54);
  expect(screen.getAllByRole('link', { name: /原帖/ })).toHaveLength(54);
  expect(screen.getAllByText(/^Anthropic 官方发布$/)).toHaveLength(5);
  expect(screen.getAllByText('只做案例说明')).toHaveLength(3);
  expect(screen.getByText(/Blender · RunPod/)).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /游戏与可玩交互/ }));
  expect(screen.getByRole('button', { name: /游戏与可玩交互/ })).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getAllByRole('article')).toHaveLength(12);
  expect(screen.getByText('12 / 54 例')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /全部/ }));
  expect(screen.getAllByRole('article')).toHaveLength(54);
});

it('shows an unpublished prompt, official numbers, and both device photos', () => {
  const item = fableCases.find((entry) => entry.id === 'official-devices');
  if (!item) throw new Error('missing official-devices');
  render(<CaseDetail item={item} />);
  expect(screen.getByRole('heading', { level: 1, name: item.title })).toBeInTheDocument();
  expect(screen.getByText('未公开提示词')).toBeInTheDocument();
  expect(screen.queryByText('展开公开提示词')).not.toBeInTheDocument();
  expect(screen.getByText(/本条来自 Anthropic 官方发布/)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /作者 Anthropic/ })).toHaveAttribute('href', item.author.url);
  expect(screen.getAllByRole('img')).toHaveLength(2);
  const postLinks = screen.getAllByRole('link', { name: /查看原帖/ });
  expect(postLinks[0]).toHaveAttribute('href', item.images[0].original_post_url);
  expect(postLinks[1]).toHaveAttribute('href', item.images[1].original_post_url);
  expect(postLinks[0].getAttribute('href')).not.toBe(postLinks[1].getAttribute('href'));

  const first = fableCases[0];
  render(<CaseDetail item={first} />);
  expect(screen.getAllByRole('link', { name: /上一条/ })).toHaveLength(1);
});

it('keeps a public prompt collapsed in wording, lists real tools, and warns on branded cases', () => {
  const toy = fableCases.find((entry) => entry.id === 'toy-room-game');
  const room = fableCases.find((entry) => entry.id === 'riley-blender-room');
  const playable = fableCases.find((entry) => entry.id === 'stonehenge');
  const last = fableCases[fableCases.length - 1];
  if (!toy?.prompt.text || !room || !playable?.live_demo_url) throw new Error('missing fixture case');

  render(<CaseDetail item={toy} />);
  expect(screen.getByText('展开公开提示词')).toBeInTheDocument();
  expect(screen.getByText(toy.prompt.text)).toBeInTheDocument();
  expect(screen.queryByText('未公开提示词')).not.toBeInTheDocument();
  expect(screen.getByRole('note')).toHaveTextContent('只做案例说明');
  expect(screen.getByRole('note')).toHaveTextContent(toy.notes || '');
  expect(screen.queryByRole('link', { name: /下载/ })).not.toBeInTheDocument();

  cleanup();
  render(<CaseDetail item={room} />);
  expect(screen.getByText('RunPod（10 GPU）')).toBeInTheDocument();
  expect(screen.getByText('Blender')).toBeInTheDocument();
  expect(screen.getByText(/作者自称使用 Claude Fable 5.2/)).toBeInTheDocument();
  expect(screen.queryByText(/整理备注/)).not.toBeInTheDocument();

  cleanup();
  render(<CaseDetail item={playable} />);
  expect(screen.getByRole('link', { name: /在线演示/ })).toHaveAttribute('href', playable.live_demo_url);

  cleanup();
  render(<CaseDetail item={last} />);
  expect(screen.getByRole('link', { name: /上一条/ })).toBeInTheDocument();
  expect(screen.queryByRole('link', { name: /下一条/ })).not.toBeInTheDocument();
});

it('adds the collection and every case to the sitemap', async () => {
  const urls = (await sitemap()).map((entry) => entry.url);
  expect(urls.some((url) => url.endsWith('/fable-5-2-cases'))).toBe(true);
  for (const item of fableCases) {
    expect(urls.some((url) => url.endsWith(`/fable-5-2-cases/${item.id}`))).toBe(true);
  }
});

it('formats prompt notes and link labels without inventing a prompt', () => {
  expect(visiblePromptNote('未公开提示词。官方只写了任务。', 'unpublished')).toBe('官方只写了任务。');
  expect(visiblePromptNote('未公开提示词', 'unpublished')).toBeNull();
  expect(visiblePromptNote(null, 'unpublished')).toBeNull();
  expect(visiblePromptNote(' 作者公开了原文。 ', 'published')).toBe('作者公开了原文。');
  expect(needsIpNotice(null)).toBe(false);
  expect(needsIpNotice('普通备注')).toBe(false);
  expect(needsIpNotice('涉及商标')).toBe(true);
  expect(mediaTypeLabel('video_thumbnail')).toBe('视频封面');
  expect(mediaTypeLabel('video_frame')).toBe('视频帧');
  expect(mediaTypeLabel('official_poster')).toBe('官方海报');
  expect(mediaTypeLabel('photo')).toBe('原帖图片');
  expect(mediaTypeLabel('other')).toBe('效果预览');
  expect(linkHostLabel('https://x.com/claudeai/status/1')).toBe('X');
  expect(linkHostLabel('https://www.anthropic.com/news')).toBe('Anthropic');
  expect(linkHostLabel('https://github.com/example/repo')).toBe('GitHub');
  expect(linkHostLabel('https://example.com/demo')).toBe('example.com');
  expect(linkHostLabel('not a url')).toBe('链接');
  expect(cards).toHaveLength(54);
});

it('renders the gallery from prepared cards', () => {
  render(<Gallery cards={cards} categories={categories} />);
  expect(screen.getByRole('link', { name: `${cards[0].title} 效果预览` })).toHaveAttribute('href', `/fable-5-2-cases/${cards[0].id}`);
  expect(screen.getAllByText(/2 张/).length).toBeGreaterThan(0);
});
