import fs from 'fs';
import path from 'path';

const root = process.cwd();

it('publishes the UI UX Pro Max tutorial with the 2026-11-16 comparison', () => {
  const sitemap = fs.readFileSync(path.join(root, 'src/app/sitemap.ts'), 'utf8');
  const robots = fs.readFileSync(path.join(root, 'src/app/robots.ts'), 'utf8');
  const page = fs.readFileSync(
    path.join(root, 'src/app/ui-ux-pro-max-skill-tutorial/page.tsx'),
    'utf8',
  );
  const home = fs.readFileSync(path.join(root, 'src/app/page.tsx'), 'utf8');
  const resources = fs.readFileSync(path.join(root, 'src/app/resources/page.tsx'), 'utf8');

  expect(sitemap).toContain('/ui-ux-pro-max-skill-tutorial');
  expect(robots).toContain('/demos/ui-ux-pro-max/');
  expect(page).toContain('canonical: pageUrl');
  expect(page).toContain('npm install -g ui-ux-pro-max-cli');
  expect(page).toContain('npx --yes ui-ux-pro-max-cli init --ai cursor');
  expect(page).toContain('--design-system');
  expect(page).toContain('Calistoga');
  expect(page).toContain('#F8FAFC');
  expect(page).toContain('#EA580C');
  expect(page).toContain('#000000');
  expect(page).toContain('150,127');
  expect(page).toContain('15,874');
  expect(page).toContain('25,523');
  expect(page).toContain('5,042');
  expect(page).toContain('2026-11-16');
  expect(page).toContain('Data-Dense Dashboard');
  expect(page).toContain('unrecognized arguments: --preview');
  expect(page).toContain('unrecognized arguments: --tokens css');
  expect(page).toContain('没有购买 Premium');
  expect(page).toContain('不能当成 Premium 已经免费');
  expect(page).toContain('没有开 Cursor 对话');
  expect(home).toContain('href="/ui-ux-pro-max-skill-tutorial"');
  expect(resources).toContain('href="/ui-ux-pro-max-skill-tutorial"');

  const installAt = page.indexOf('npm install -g ui-ux-pro-max-cli');
  const staleAt = page.indexOf('npm install -g uipro-cli');
  expect(installAt).toBeGreaterThan(-1);
  expect(staleAt).toBeGreaterThan(installAt);

  for (const file of [
    'without-desktop-1280x800.png',
    'with-desktop-1280x800.png',
    'without-desktop-full.png',
    'with-desktop-full.png',
    'without-mobile-390x844.png',
    'with-mobile-390x844.png',
    'without-mobile-full.png',
    'with-mobile-full.png',
  ]) {
    const image = path.join(root, 'public/images/ui-ux-pro-max', file);
    expect(fs.existsSync(image)).toBe(true);
    expect(page).toContain(file);
  }

  expect(fs.existsSync(path.join(root, 'public/demos/ui-ux-pro-max/without.html'))).toBe(true);
  expect(fs.existsSync(path.join(root, 'public/demos/ui-ux-pro-max/with.html'))).toBe(true);
});
