import fs from 'fs';
import path from 'path';
import collection from '@/data/casebooks/gpt-6.json';

describe('GPT-6 heading', () => {
  it('matches the counted cases and practices', () => {
    expect(collection.cases).toHaveLength(20);
    expect(collection.practices).toHaveLength(10);

    const source = fs.readFileSync(path.join(process.cwd(), 'src/app/gpt-6-cases/page.tsx'), 'utf8');
    expect(source).toContain('<h1>GPT-6 案例集：20 个真实案例与 10 条最佳实践</h1>');
    expect(source).not.toContain('从一次演示');
  });
});
