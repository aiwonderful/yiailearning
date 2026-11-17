import fs from 'fs';
import path from 'path';

const root = process.cwd();
const read = (relativePath: string) => fs.readFileSync(path.join(root, relativePath), 'utf8');

describe('remaining SEO copy', () => {
  it('keeps the first-batch roadmap guarantees and adds dated collection pages', () => {
    const roadmap = read('src/data/roadmap.ts');
    const robots = read('src/app/robots.ts');
    const sitemap = read('src/app/sitemap.ts');
    const posts = read('src/app/posts/SearchablePosts.tsx');
    const money = read('src/app/ai-money/page.tsx');
    const fable = read('src/app/fable-5-2-cases/page.tsx');
    const image = read('src/app/gpt-image-2-6-cases/page.tsx');

    expect(roadmap).toContain('阶段六：变现与持续输出');
    expect(roadmap).not.toContain('被截断');
    expect(robots).not.toContain("'/roadmap'");
    expect(sitemap).toContain('/roadmap');
    expect(posts).not.toContain('useSearchParams');
    expect(money).not.toContain('?topic=');
    expect(money).toContain('篇不重复案例');
    expect(fable).toContain('datePublished');
    expect(fable).toContain('2026-11-10');
    expect(image).toContain('datePublished');
    expect(image).toContain('2026-11-10');
    expect(fs.existsSync(path.join(root, 'audits/case-subpages.csv'))).toBe(true);
  });
});
