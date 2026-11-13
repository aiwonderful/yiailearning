import fs from 'fs';
import path from 'path';
import { heroFilmPrompt, landingPagePrompt } from '../prompts';

it('publishes the scroll-world tutorial with the public prompts', () => {
  const sitemap = fs.readFileSync(path.join(process.cwd(), 'src/app/sitemap.ts'), 'utf8');
  expect(sitemap).toContain('/scroll-world-landing-page-tutorial');

  const page = fs.readFileSync(
    path.join(process.cwd(), 'src/app/scroll-world-landing-page-tutorial/page.tsx'),
    'utf8',
  );
  const home = fs.readFileSync(path.join(process.cwd(), 'src/app/page.tsx'), 'utf8');
  const resources = fs.readFileSync(path.join(process.cwd(), 'src/app/resources/page.tsx'), 'utf8');

  expect(page).toContain("canonical: pageUrl");
  expect(page).toContain('未公开提示词');
  expect(page).toContain('原帖未说明');
  expect(page).toContain('-g 4');
  expect(page).not.toMatch(/\$0\.06|\$0\.60|\$1\.80/);
  expect(home).toContain('href="/scroll-world-landing-page-tutorial"');
  expect(resources).toContain('href="/scroll-world-landing-page-tutorial"');
  expect(heroFilmPrompt.startsWith('One continuous 30-second shot')).toBe(true);
  expect(heroFilmPrompt).toHaveLength(3419);
  expect(landingPagePrompt).toHaveLength(5958);
  expect(landingPagePrompt.startsWith('Then the landing page.')).toBe(true);
});
