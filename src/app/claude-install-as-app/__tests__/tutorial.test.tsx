import fs from 'fs';
import path from 'path';

const root = process.cwd();

it('publishes the Claude Install as app guide from the 2026-11-25 sources', () => {
  const sitemap = fs.readFileSync(path.join(root, 'src/app/sitemap.ts'), 'utf8');
  const page = fs.readFileSync(path.join(root, 'src/app/claude-install-as-app/page.tsx'), 'utf8');
  const home = fs.readFileSync(path.join(root, 'src/app/page.tsx'), 'utf8');
  const resources = fs.readFileSync(path.join(root, 'src/app/resources/page.tsx'), 'utf8');

  expect(sitemap).toContain('/claude-install-as-app');
  expect(page).toContain('canonical: pageUrl');
  expect(page).toContain('材料核对于 2026-11-25（北京时间）');
  expect(page).toContain('没有在 Mac 或 Windows 上真机复测');
  expect(page).toContain('6.28899.0');
  expect(page).toContain('rolling out in beta');
  expect(page).toContain('Free、Pro、Max、Ultra、Team、Enterprise');
  expect(page).toContain('Linux（beta）');
  expect(page).toContain("Don't allow");
  expect(page).toContain('Full access to this computer');
  expect(page).toContain('Organization settings');
  expect(page).toContain('Uninstall');
  expect(page).toContain('Open installed app');
  expect(page).toContain('isArtifactAppsEnabled');
  expect(page).toContain('不受零数据保留覆盖');
  expect(page).toContain('HIPAA-ready');
  expect(page).toContain('未经本站实测');
  expect(page.split('未经本站实测').length - 1).toBeGreaterThanOrEqual(3);
  expect(page).toContain('这次没有做的');
  expect(page).toContain('欢迎窗口里的示例由 Felix 制作，这些演示不是 Anthropic 官方产品');
  expect(page).toContain('https://claude.com/resources/articles/install-as-app');
  expect(page).toContain('https://support.claude.com/en/articles/18516354-install-an-artifact-as-an-app');
  expect(page).toContain('https://support.claude.com/en/articles/12138966-release-notes');
  expect(page).toContain('https://support.claude.com/en/articles/16994751-artifacts-admin-guide-for-team-and-enterprise-plans');
  expect(page).toContain('https://support.claude.com/en/articles/10065433-install-claude-desktop');
  expect(page).toContain('https://claude.com/download');
  expect(page).toContain('https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work');
  expect(page).toContain('https://x.com/ClaudeDevs/status/2125315491522650299');
  expect(page).toContain('https://x.com/dotey/status/2125368995746308453');
  expect(page).toContain('Make a Pomodoro timer that lives in my menu bar.');
  expect(page).toContain('请做一个番茄钟小工具');
  expect(page).toContain('请做一个个人记账小工具');
  expect(page).toContain('请做一个内容选题看板');
  expect(page).not.toContain('我们亲测');
  expect(page).not.toContain('4.9 万');
  expect(home).toContain('href="/claude-install-as-app"');
  expect(resources).toContain('href="/claude-install-as-app"');

  for (const file of [
    'anthropic-official-article-hero-1920.jpg',
    'claudedevs-official-demo-title-menu.jpg',
    'claudedevs-official-demo-install-dialog.jpg',
    'claudedevs-official-demo-standalone-window.jpg',
    'dotey-zh-three-permission-levels-t225s.jpg',
    'dotey-zh-claude-apps-folder-t90s.jpg',
  ]) {
    expect(fs.existsSync(path.join(root, 'public/images/claude-install-as-app', file))).toBe(true);
    expect(page).toContain(file);
  }
});
