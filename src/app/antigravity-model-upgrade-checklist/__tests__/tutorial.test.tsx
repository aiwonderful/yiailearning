import fs from 'fs';
import path from 'path';

const root = process.cwd();

it('publishes the Antigravity model upgrade tutorial from the 2026-11-24 sources', () => {
  const sitemap = fs.readFileSync(path.join(root, 'src/app/sitemap.ts'), 'utf8');
  const page = fs.readFileSync(
    path.join(root, 'src/app/antigravity-model-upgrade-checklist/page.tsx'),
    'utf8',
  );
  const home = fs.readFileSync(path.join(root, 'src/app/page.tsx'), 'utf8');
  const resources = fs.readFileSync(path.join(root, 'src/app/resources/page.tsx'), 'utf8');
  const roadmap = fs.readFileSync(path.join(root, 'src/data/roadmap.ts'), 'utf8');

  expect(sitemap).toContain('/antigravity-model-upgrade-checklist');
  expect(page).toContain('canonical: pageUrl');
  expect(page).toContain('summary_large_image');
  expect(page).toContain('材料核对于 2026-11-24（北京时间）');
  expect(page).toContain('这次写作没有登录 Antigravity 做第一手复测');
  expect(page).toContain('进度清单（Progress checklist）');
  expect(page).toContain('rolling out');
  expect(page).toContain('标准免费或促销的 Pro 试用，和付费 Pro 不是同一档');
  expect(page).toContain('2026-11-30');
  expect(page).toContain('Gemini 3.8 Flash');
  expect(page).toContain('100% left');
  expect(page).toContain('Terminal-Bench 4.1');
  expect(page).toContain('task groups（任务组）');
  expect(page).toContain('也不要把 task groups 写成这次新功能的名字');
  expect(page).toContain('正文不把它当成按钮名');
  expect(page).toContain('这次没有做的');
  expect(page).not.toContain('22%');
  expect(page).not.toContain('$19');
  expect(page).not.toContain('$99');
  expect(home).toContain('href="/antigravity-model-upgrade-checklist"');
  expect(resources).toContain('href="/antigravity-model-upgrade-checklist"');
  expect(roadmap).toContain('/antigravity-model-upgrade-checklist');

  for (const url of [
    'https://x.com/_mohansolo/status/2124960419429458207',
    'https://x.com/_mohansolo/status/2124960739358282189',
    'https://x.com/_mohansolo/status/2124971131312734707',
    'https://x.com/_mohansolo/status/2124917777630961911',
    'https://x.com/_mohansolo/status/2125002306584506750',
    'https://x.com/_mohansolo/status/2125002566195179902',
    'https://x.com/RohanPhadte/status/2124978100345995731',
    'https://x.com/antigravity/status/2125032843550028030',
    'https://x.com/dotey/status/2124998487221694583',
    'https://x.com/dotey/status/2125001715346714894',
    'https://antigravity.google/docs/models/',
    'https://antigravity.google/docs/plans/',
    'https://antigravity.google/pricing/',
    'https://antigravity.google/docs/changelog/',
    'https://antigravity.google/docs/cli/commands/usage/',
    'https://antigravity.google/docs/plan/',
    'https://antigravity.google/docs/tools/',
    'https://antigravity.google/blog/gemini-4-hydrogen-in-google-antigravity/',
  ]) {
    expect(page).toContain(url);
  }

  for (const file of [
    'official-checklist-progress-4s-1920x1080.jpg',
    'official-checklist-done-8s-1920x1080.jpg',
    'mohan-checklist-done-1100x554.jpg',
    'mohan-orchestrator-settings-1448x562.jpg',
    'dotey-antigravity-carbon-1672x1530.jpg',
    'dotey-gemini-web-carbon-locked-2000x1690.jpg',
  ]) {
    const image = path.join(root, 'public/images/antigravity-model-upgrade-checklist', file);
    expect(fs.existsSync(image)).toBe(true);
    expect(page).toContain(file);
  }
});
