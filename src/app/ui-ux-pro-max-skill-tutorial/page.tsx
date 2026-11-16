import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';
import styles from './tutorial.module.css';

const title = '同一份 brief，两张营销页：UI UX Pro Max 实测';
const description =
  '用官方包 ui-ux-pro-max-cli 2.15.0 的 --design-system，对照一份创作者分析落地页。不跟技能时是深色紫调；跟输出时是浅底、Calistoga，橙色按钮上是黑字。数字核对于 2026-11-16。';
const pagePath = '/ui-ux-pro-max-skill-tutorial';
const pageUrl = `${siteConfig.url}${pagePath}`;
const repoUrl = 'https://github.com/nextlevelbuilder/ui-ux-pro-max-skill';
const siteUrl = 'https://www.uupm.cc/';
const readmeZhUrl = 'https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/main/README.zh.md';
const npmUrl = 'https://www.npmjs.com/package/ui-ux-pro-max-cli';
const releaseUrl = 'https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/releases/tag/v2.15.0';
const img = '/images/ui-ux-pro-max';
const demoA = '/demos/ui-ux-pro-max/without.html';
const demoB = '/demos/ui-ux-pro-max/with.html';

const designSystemCommand = `python3 .cursor/skills/ui-ux-pro-max/scripts/search.py \\
  "SaaS analytics for content creators, trustworthy weekly plan, not generic purple AI" \\
  --design-system -p "LensBoard" -f markdown --full`;

export const metadata: Metadata = {
  title,
  description,
  keywords: ['UI UX Pro Max', 'ui-ux-pro-max-skill', 'uipro', 'Cursor', '设计系统', '落地页'],
  alternates: { canonical: pageUrl },
  openGraph: {
    title,
    description,
    url: pageUrl,
    type: 'article',
    images: [{
      url: `${img}/with-desktop-1280x800.png`,
      width: 1280,
      height: 800,
      alt: 'LensBoard 跟设计系统之后的桌面首屏：浅底、Calistoga 标题、橙色按钮',
    }],
  },
  twitter: { card: 'summary_large_image', title, description },
};

function Out({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
}

function Shot({
  src,
  alt,
  width,
  height,
  caption,
  href,
  link,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  href: string;
  link: string;
}) {
  return (
    <figure className={styles.figure}>
      <Image src={src} alt={alt} width={width} height={height} />
      <figcaption>
        <span>{caption}</span>
        <Out href={href}>{link}</Out>
      </figcaption>
    </figure>
  );
}

export default function UiUxProMaxTutorialPage() {
  return (
    <div className={styles.page}>
      <div className={styles.breadcrumb}>
        <Link href="/resources">资料库</Link>
        <span aria-hidden="true">/</span>
        <span>实测教程</span>
      </div>
      <p className={styles.copyrightBanner}>
        材料核对于 2026-11-16（北京时间）。这次用的是官方 npm CLI 和技能自带的 search.py，没有开 Cursor 对话，也没有购买 Premium。A 页写在任何 LensBoard 设计系统输出之前。
      </p>
      <header className={styles.hero}>
        <div className={styles.edition}>
          <span>小亦的 AI 学习实验室</span>
          <span>实测教程 · 2026-11-16</span>
        </div>
        <div className={styles.heroGrid}>
          <div>
            <p className={styles.eyebrow}>UI UX PRO MAX · 落地页</p>
            <h1>{title}</h1>
            <p className={styles.intro}>
              同一份产品说明，写成两张营销页。文案、导航、三张功能卡、两档价格和页脚按钮都一样。一张是常见的深色紫调，一张只跟 UI UX Pro Max 2.15.0 的设计系统输出。字体和配色分开了，版式没有。
            </p>
            <nav className={styles.heroLinks} aria-label="本页目录">
              <a href="#shots">对照</a>
              <a href="#install">安装</a>
              <a href="#pitfalls">六个坑</a>
              <Out href={repoUrl}>官方仓库 ↗</Out>
            </nav>
          </div>
          <figure className={styles.heroPhoto}>
            <Image
              src={`${img}/with-desktop-1280x800.png`}
              alt="LensBoard 跟设计系统之后的桌面首屏：浅灰底，Calistoga 深色标题，橙色 Start free 按钮"
              width={1280}
              height={800}
              priority
            />
            <figcaption>
              <span>跟设计系统之后的桌面首屏，1280×800。</span>
              <Out href={demoB}>打开这一页</Out>
            </figcaption>
          </figure>
        </div>
        <div className={styles.heroFoot}>
          <span>整理：小亦 · 材料核对于 2026-11-16</span>
          <Out href={repoUrl}>ui-ux-pro-max-skill</Out>
        </div>
      </header>

      <div className={styles.layout}>
        <nav className={styles.toc} aria-label="教程目录">
          <a href="#pages">1 两页怎么来的</a>
          <a href="#what">2 它是什么</a>
          <a href="#install">3 装进 Cursor</a>
          <a href="#output">4 设计系统输出</a>
          <a href="#shots">5 对照</a>
          <a href="#limits">6 限度</a>
          <a href="#pitfalls">7 六个坑</a>
          <a href="#alts">8 其他技能</a>
          <a href="#sources">9 出处</a>
        </nav>

        <article className={styles.article}>
          <section className={styles.section} id="pages">
            <h2>两页怎么来的</h2>
            <p>
              测的是官方 npm 包 <code>ui-ux-pro-max-cli</code>，版本 2.15.0，命令名仍是 <code>uipro</code>。页面不是在 Cursor 聊天里生成的。检索用的是装好之后、项目里的 <code>search.py --design-system</code>。
            </p>
            <p>
              虚构产品叫 LensBoard：给内容创作者用的独立分析工具。营销页要有顶栏、主标题、三张功能卡、Free / Pro 和页脚按钮。交给设计系统的检索句是：
            </p>
            <pre className={styles.code}>SaaS analytics for content creators, trustworthy weekly plan, not generic purple AI</pre>
            <p>
              A 页先写完。写的时候，LensBoard 的设计系统输出还不存在。它只用 Inter，底色 <code>#0B1220</code>，按钮和光斑走靛蓝 <code>#6366F1</code> 到紫色 <code>#8B5CF6</code>，标题是白到淡紫的渐变。卡片是深色、带一点玻璃感。对齐，能读，就是常见的 AI 紫。
            </p>
            <p>
              B 页只在 <code>--design-system</code> 跑完之后写，并且按那份输出做：浅底 <code>#F8FAFC</code>，标题字体 Calistoga，正文 Inter，信任蓝 <code>#2563EB</code>，强调色 <code>#EA580C</code>，橙色按钮上是黑字。
            </p>
            <p>两页可见文案逐字相同，测试页是英文：</p>
            <ul>
              <li>导航：LensBoard、Features、Pricing、Docs、Get started</li>
              <li>眉题：Creator analytics</li>
              <li>标题：See which posts actually grow your audience</li>
              <li>副文：LensBoard turns your publishing stats into a clear weekly plan, so you stop guessing what to post next.</li>
              <li>按钮：Start free、See features</li>
              <li>功能卡：Weekly insight report、Hook and title comparison、Audience shift alerts，以及各自那句说明</li>
              <li>价格：Free $0，Pro $19/mo，以及各自那句方案说明</li>
              <li>页脚再重复一次标题、副文和 Start free，链接是 LensBoard、Docs、Features、Pricing</li>
            </ul>
            <div className={styles.pair}>
              <Shot
                src={`${img}/without-desktop-1280x800.png`}
                alt="不跟技能的 LensBoard 桌面首屏：深蓝底，白到淡紫的渐变标题，紫色 Start free 按钮"
                width={1280}
                height={800}
                caption="A 页，不跟技能。桌面 1280×800。"
                href={demoA}
                link="打开 A 页"
              />
              <Shot
                src={`${img}/with-desktop-1280x800.png`}
                alt="跟设计系统的 LensBoard 桌面首屏：浅灰底，Calistoga 深色标题，橙色黑字 Start free 按钮"
                width={1280}
                height={800}
                caption="B 页，跟 2.15.0 设计系统。桌面 1280×800。"
                href={demoB}
                link="打开 B 页"
              />
            </div>
            <p>
              截图用无头 Chrome，视口裁到页面本身，等 <code>document.fonts.ready</code> 之后拍，没有浏览器边框。上面两张是 1280×800。整页和 390×844 的手机视口在后面，用来看价格区、页脚和顶栏按钮。
            </p>
          </section>

          <section className={styles.section} id="what">
            <h2>它是什么</h2>
            <p>
              UI UX Pro Max（仓库 <code>ui-ux-pro-max-skill</code>）是给 AI 编程助手用的本地设计资料。里面是 CSV / JSON 目录、只要 Python 3 标准库的检索脚本，以及一份让助手先检索、再写界面的 <code>SKILL.md</code>。它负责检索和约束。页面仍要自己写，它不渲染成稿。
            </p>
            <ul>
              <li>仓库：<Out href={repoUrl}>nextlevelbuilder/ui-ux-pro-max-skill</Out></li>
              <li>官网：<Out href={siteUrl}>uupm.cc</Out></li>
              <li>官方中文说明：<Out href={readmeZhUrl}>README.zh.md</Out></li>
              <li>npm：<Out href={npmUrl}>ui-ux-pro-max-cli</Out>，命令是 <code>uipro</code></li>
            </ul>
            <p>
              许可证以仓库 <code>LICENSE</code>、GitHub API 和两个包的 <code>package.json</code> 为准，都是 MIT，版权行是 Copyright (c) 2024 Next Level Builder。两个 npm 页面的 README 页脚仍写着 License: CC-BY-NC-4.0。那个页脚和包声明对不上，当天以 MIT 为准。
            </p>
            <p>
              已发布版本是 <Out href={releaseUrl}>v2.15.0</Out>。<code>published_at</code> 2026-08-13T17:10:40Z，即 2026-08-14 01:10:40（北京时间）。npm 上的 <code>ui-ux-pro-max-cli</code> 也是 2.15.0，<code>gitHead</code> 与标签 <code>a38d04c3d5c298c851dbe5e6ee1965ee3de42cb5</code> 一致。同一天用 <code>git ls-remote</code> 看到的 <code>main</code> 是 <code>e59ff376a41f7ca47b7541ad5c116495cbade3ee</code>，尖端提交在 2026-11-16 12:10:03（北京时间）。仓库说明跟的是 main，比 npm 上的 2.15.0 新。README 里的旗标和目录数字，不能直接当成已经装上的功能。
            </p>
            <p>
              下面的人气数字只代表 2026-11-16 当天，过了就不要照抄。GitHub API 在当天下午（北京时间）、后来的未登录请求撞上速率限制之前查到：星标 150,127，分叉 15,874。npm 下载接口的窗口是 2026-11-09 至 2026-11-15：<code>ui-ux-pro-max-cli</code> 25,523，旧包 <code>uipro-cli</code> 5,042。npm 网站当天对旧包显示 5,435，滚动窗口和接口不完全一样；官方包两边都是 25,523。
            </p>
            <p>
              2.15.0 安装目录里的 <code>catalog-summary.json</code> 写着 <code>verifiedAt</code> 2026-08-13。这些数字和当天的官网、也和 main 上的 README 对不上：
            </p>
            <div className={styles.tableWrap}>
              <table>
                <thead>
                  <tr><th>2.15.0 安装目录</th><th>数量</th></tr>
                </thead>
                <tbody>
                  <tr><td>风格：合计 / 可检索 / 在用 / 补充 / 弃用</td><td>88 / 79 / 50 / 29 / 9</td></tr>
                  <tr><td>产品类型、配色、推理配置</td><td>各 192</td></tr>
                  <tr><td>字体配对</td><td>74</td></tr>
                  <tr><td>批准可用的 Google Fonts</td><td>1,934</td></tr>
                  <tr><td>图标说明行 / 上游 Phosphor 校验集</td><td>105 / 1,512</td></tr>
                  <tr><td>UX 指南</td><td>119</td></tr>
                  <tr><td>动效预设</td><td>17</td></tr>
                  <tr><td>图表类型</td><td>25</td></tr>
                  <tr><td>落地页版式（landing.csv 数据行）</td><td>34</td></tr>
                  <tr><td>技术栈 / 栈指南</td><td>22 / 1,260</td></tr>
                </tbody>
              </table>
            </div>
            <p>
              官网当天仍在写 57 种风格、95 套配色、56 组字体、8 个技术栈、24 种图表、29 种落地页版式。main 的 README 已经写成可检索风格 80（在用 51）、UX 指南 120。旧包 2.2.3 的 <code>SKILL.md</code> 则自称 67 种风格、96 套配色、57 组字体、99 条 UX、25 种图表、13 个技术栈。用的时候以自己装上的那份目录为准。
            </p>
          </section>

          <section className={styles.section} id="install">
            <h2>装进 Cursor</h2>
            <p>官方 README 当天写的路径是全局安装，然后在项目里初始化。Cursor 对应 <code>--ai cursor</code>：</p>
            <pre className={styles.code}>{`npm install -g ui-ux-pro-max-cli
cd /path/to/your/project
uipro init --ai cursor`}</pre>
            <p>不想装到全局，就用 npx。这次实际跑通的是带 <code>--yes</code> 的这一条：</p>
            <pre className={styles.code}>npx --yes ui-ux-pro-max-cli init --ai cursor</pre>
            <p>
              <code>uipro init --ai cursor --global</code> 会写到 <code>~/.cursor/skills/</code>。这次没有用全局。发布说明里的 npx 例子写的是 <code>--ai claude</code>。官方 README 还列了 claude、windsurf、copilot 等其它 <code>--ai</code> 值，完整名单以仓库为准。这次只装了 cursor。
            </p>
            <p>
              测试机是 Linux，Node v24.22.1，npm 11.21.1，Python 3.13.5。我们优先用项目内安装，不装全局。在单独目录里 <code>npm install ui-ux-pro-max-cli</code>，<code>./node_modules/.bin/uipro --version</code> 打印 <code>2.15.0</code>。<code>uipro versions</code> 列出 30 个版本，并把 v2.15.0（8/14/2026）标成 latest。然后：
            </p>
            <pre className={styles.code}>{`cd /path/to/your/project
/path/to/node_modules/.bin/uipro init --ai cursor`}</pre>
            <p>成功输出是：</p>
            <pre className={styles.code}>{`info Installing for: Cursor (.cursor/skills/)
✔ Generated from templates!
success UI/UX Pro Max installed successfully!`}</pre>
            <p>
              同一条 <code>npx --yes ui-ux-pro-max-cli init --ai cursor</code> 也成功。两次生成的 <code>ui-ux-pro-max</code> 技能一致。安装器接着提示重启助手，并试一句 “Build a landing page for a SaaS product”。这次没有走那条聊天，而是直接跑本地检索脚本。
            </p>
            <p>项目里的技能目录是：</p>
            <pre className={styles.code}>{`.cursor/skills/ui-ux-pro-max/
  SKILL.md
  data/
  scripts/`}</pre>
            <p>这次官方安装是 71 个文件，大约 3.7 MB。<code>scripts/</code> 里有 <code>search.py</code>。脚本只使用 Python 3 标准库，不装包，也不联网。</p>
            <h3>同一次安装还写了别的文件夹</h3>
            <p>
              2.15.0 的 <code>uipro init --ai cursor</code> 不只有 <code>ui-ux-pro-max</code>。同一次还写出这些技能目录，frontmatter 里都是 <code>metadata.author: claudekit</code>：
            </p>
            <ul>
              <li><code>banner-design</code>（v1.0.0）</li>
              <li><code>brand</code>（v1.0.0）</li>
              <li><code>design</code>（v2.1.0），说明里提到 logo、CIP、slides、banners、icons</li>
              <li><code>design-system</code>（v1.0.0）</li>
              <li><code>slides</code>（v1.0.0）</li>
              <li><code>ui-styling</code>（v1.0.0）</li>
              <li><code>ui-ux-pro-max</code>，这次 LensBoard 只用了这一个</li>
            </ul>
            <p>
              官方 README 仍把开源的 Basic 和带品牌、logo、CIP、横幅、幻灯片的 Premium 分开写。我们没有购买 Premium，只跑了公开的 npm CLI。多出来的目录是 2.15.0 这次安装能观察到的行为，不能当成 Premium 已经免费。
            </p>
            <h3>Python 3</h3>
            <p>
              搜索要 Python 3。这次是 3.13.5，脚本跑通了。没有 Python 时，技能目录仍会装上，检索才会失败。官方文档让人自己安装 Python，并要求代理不要替用户装软件。Windows 上还要看商店别名和 PATH。这次没有在 Windows 上复测。
            </p>
          </section>

          <section className={styles.section} id="output">
            <h2>设计系统输出了什么</h2>
            <p>
              新的营销页用 <code>--design-system</code>。它把版式、风格、颜色和字体收成一份。不要把每个检索域的第一行拼在一起。LensBoard 的命令是：
            </p>
            <pre className={styles.code}>{designSystemCommand}</pre>
            <p>2.15.0 这份输出里，和页面直接相关的是：</p>
            <div className={styles.tableWrap}>
              <table>
                <tbody>
                  <tr>
                    <th>版式</th>
                    <td>Hero + Features + CTA。按钮放在主视觉和粘住的顶栏，页底再放一次。顺序是标题（可以带图）、价值说明、3 到 5 张功能卡、行动区、页脚。功能区卡片背景写的是 <code>#FAFAFA</code>。按钮文字相对底色至少 4.5:1。减少动态效果时关掉主视觉视差，停在最终静止状态。</td>
                  </tr>
                  <tr>
                    <th>风格</th>
                    <td>Glassmorphism，玻璃拟态。明暗都支持。关键词是毛玻璃、10–20px 模糊、半透明、1px 浅色边、光和层次。无障碍是有条件的：对比度 4.5:1、键盘、可见焦点、减少动态。</td>
                  </tr>
                  <tr>
                    <th>颜色</th>
                    <td>主色 <code>#2563EB</code>，其上的字 <code>#FFFFFF</code>。强调 / 按钮 <code>#EA580C</code>，其上的字 <code>#000000</code>。备注原文：Trust blue + orange CTA contrast [Accent adjusted from #F97316]。背景 <code>#F8FAFC</code>，正文 <code>#1E293B</code>，卡片 <code>#FFFFFF</code>。另外还有次色 <code>#3B82F6</code>、muted <code>#E9EFF8</code>、边框 <code>#E2E8F0</code>、焦点环 <code>#2563EB</code>。</td>
                  </tr>
                  <tr>
                    <th>字体</th>
                    <td>标题 Calistoga，正文 Inter。来源名是 SaaS Mobile Boutique (Calistoga + Inter)。Google Fonts 导入里还有 JetBrains Mono。气质词里有 human warmth，适用项包括分析面板和营销工具。</td>
                  </tr>
                  <tr>
                    <th>不要</th>
                    <td>过多动画。默认深色模式。</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              输出把产品归到 SaaS (General)，并启用了一条 <code>if_data_heavy</code> 规则，动作是 <code>style:glassmorphism</code>。所以「分析产品」在设计系统模式里走到了玻璃拟态和营销版式，不是走到密铺的仪表盘。
            </p>
            <p>
              同一条检索加上 <code>--persist</code>，写出了 <code>design-system/lensboard/MASTER.md</code>。文件里的生成时间是 2026-11-16 16:39:33。颜色表里的按钮字色是 <code>#000000</code>。这份主文件后面的按钮示例却写成了 <code>color: white</code>。B 页跟的是颜色表，橙色按钮用黑字，没有跟那行示例。
            </p>
            <h3>B 页按输出做了这些</h3>
            <ul>
              <li>浅色页，背景 <code>#F8FAFC</code>。不默认深色。</li>
              <li>橙色 <code>#EA580C</code> 上用黑字，对应 <code>--color-on-accent: #000000</code>。</li>
              <li>字标和标题用 Calistoga，正文用 Inter，价格 <code>$0</code> 和 <code>$19/mo</code> 用 JetBrains Mono。</li>
              <li>顶栏粘住。Pro 用主色边框标出来。区块仍是主视觉、功能、价格、页脚按钮。功能区底色用了输出里的 <code>#FAFAFA</code>，卡片本身是更不透明的白。</li>
              <li>顶栏、卡片和价格用 <code>backdrop-filter: blur(16px)</code> 和浅色边。顶栏背景是 <code>rgba(248, 250, 252, 0.62)</code>，功能卡是 <code>rgba(255, 255, 255, 0.72)</code>，高于目录里玻璃拟态的 15%–30% 白。再淡，深色字在 <code>#F8FAFC</code> 上过不了技能自己的 4.5:1。目录里的玻璃拟态还把霓虹紫和粉列成辅色，没有用，因为和信任蓝、也和检索句里的 not generic purple AI 冲突。</li>
              <li>主视觉后面是淡蓝和暖橙的光，没有紫色光斑。</li>
              <li>图标是 SVG。悬停 200ms。焦点环 <code>#2563EB</code>。<code>prefers-reduced-motion</code> 关掉动效。链接和按钮有 <code>cursor: pointer</code>。</li>
              <li>没有视差，没有用表情符号当图标，标题没有紫色渐变。</li>
            </ul>
            <p>
              交付清单里还有：可点元素要有指针、悬停 150–300ms、浅色对比度至少 4.5:1、键盘焦点可见、尊重减少动态、以及 375 / 768 / 1024 / 1440 这几档宽度。本次截图用的是 1280×800 和 390×844，不是清单里的那四档。
            </p>
          </section>

          <section className={styles.section} id="shots">
            <h2>对照</h2>
            <p>整页能看到功能卡、价格和页脚。A 页 1280×2059，B 页 1280×2078。区块顺序一样。</p>
            <div className={styles.pair}>
              <Shot
                src={`${img}/without-desktop-full.png`}
                alt="不跟技能的 LensBoard 整页：深色背景，紫色按钮，三张功能卡和两档价格"
                width={1280}
                height={2059}
                caption="A 页整页，1280×2059。"
                href={demoA}
                link="打开 A 页"
              />
              <Shot
                src={`${img}/with-desktop-full.png`}
                alt="跟设计系统的 LensBoard 整页：浅色背景，Calistoga 标题，橙色按钮，Pro 方案有蓝色边框"
                width={1280}
                height={2078}
                caption="B 页整页，1280×2078。"
                href={demoB}
                link="打开 B 页"
              />
            </div>
            <h3>清楚拉开的部分</h3>
            <ul>
              <li>颜色和明暗。A 页是深蓝底、靛蓝到紫色的按钮、白到淡紫的标题。B 页是 <code>#F8FAFC</code>、信任蓝 <code>#2563EB</code>、橙色按钮 <code>#EA580C</code>。输出写了避免默认深色，并写了 trust blue + orange CTA contrast。</li>
              <li>按钮字色。B 页的橙色按钮是黑字，因为设计系统把 <code>--color-on-accent</code> 设成 <code>#000000</code>，并要求文字和底色至少 4.5:1。它和常见的白字彩底不一样，但这是那份输出。A 页是白字配紫色，也能读，只是通用。</li>
              <li>字体。A 页通篇 Inter，标题偏几何、偏重。B 页标题和字标是 Calistoga，正文是 Inter，价格是 JetBrains Mono。这是个性上最大的一处差别，衬线标题更像编辑排版，和输出里的 human warmth 对得上。</li>
              <li>气氛。A 页靠模糊的紫色光斑和深色主视觉。B 页是较淡的蓝和桃色光，作为毛玻璃后面的光源，整体更静。对「可信的分析」这个产品，这个调性更合适。如果期待的是戏剧化的深色落地页，B 页第一眼也没有那么抢。</li>
            </ul>
            <h3>手机</h3>
            <p>两页都在 800px 以下收起中间的导航链接，卡片改成一列。都不是坏的手机页。B 页的 Calistoga 标题在 390px 宽里仍然放得下。粘住的顶栏里，橙色 Get started 是手机上最清楚的差别。B 页主视觉里的 See features 幽灵按钮偏淡，对比和强调都弱一点。更严地对着交付清单看，这一条大概会被标出来。</p>
            <div className={styles.pair}>
              <Shot
                src={`${img}/without-mobile-390x844.png`}
                alt="不跟技能的 LensBoard 手机首屏：深色，紫色 Get started，标题折成多行"
                width={390}
                height={844}
                caption="A 页，390×844。"
                href={demoA}
                link="打开 A 页"
              />
              <Shot
                src={`${img}/with-mobile-390x844.png`}
                alt="跟设计系统的 LensBoard 手机首屏：浅色，顶栏橙色 Get started，Calistoga 标题"
                width={390}
                height={844}
                caption="B 页，390×844。"
                href={demoB}
                link="打开 B 页"
              />
            </div>
            <details className={styles.prompt}>
              <summary>
                手机整页，宽 390
                <span className={styles.plus} aria-hidden="true">+</span>
              </summary>
              <p className={styles.promptNote}>A 页 390×2852，B 页 390×2884。功能卡、价格和页脚都在图里。</p>
              <div className={styles.pair}>
                <Shot
                  src={`${img}/without-mobile-full.png`}
                  alt="不跟技能的 LensBoard 手机整页，深色，功能卡和价格纵向排列"
                  width={390}
                  height={2852}
                  caption="A 页手机整页。"
                  href={demoA}
                  link="打开 A 页"
                />
                <Shot
                  src={`${img}/with-mobile-full.png`}
                  alt="跟设计系统的 LensBoard 手机整页，浅色，橙色按钮，功能卡和价格纵向排列"
                  width={390}
                  height={2884}
                  caption="B 页手机整页。"
                  href={demoB}
                  link="打开 B 页"
                />
              </div>
            </details>
          </section>

          <section className={styles.section} id="limits">
            <h2>这次没拉开的部分</h2>
            <ul>
              <li>版式仍是标准的一套：主视觉、三张功能卡、两张价格卡、页脚按钮。技能选的名字就是 Hero + Features + CTA。文案和结构保持一样，所以构图没有拉开，拉开的是表面：字体、颜色、明暗。没有产品截图，没有面板预览，节拍也不特别。版式说明里提到主视觉可以带图。这次没有另做一张图。</li>
              <li>玻璃拟态很轻。技能点名了 Glassmorphism，并要求 10–20px 背景模糊和半透明白。在浅色营销页上，目录里的 15%–30% 白会让深色字过不了技能自己的 4.5:1。B 页因此把白色加浓。截图里的卡片更像干净的白面板。效果在顶栏和主视觉的色块上能看见，它不是这页的主角。这是把该风格用在浅色、高对比页面上的限度。</li>
              <li>A 页没有坏。它对齐，能读，窄屏也会叠卡片。它就是默认的那种样子。技能在这里做的是把页面带离这个默认，不是修好一个坏掉的布局。</li>
              <li>换一种检索，结论会变。风格域用了一条更短的相近查询 trustworthy SaaS analytics creators，第一条是 Data-Dense Dashboard。目录把它标成 BI / 分析，并写明不要用于营销仪表盘和面向消费者的分析，原文是 Do Not Use For: Marketing dashboards, consumer-facing analytics。字体域返回的是法律和公司类配对，不是 Calistoga。B 页跟的是 <code>--design-system</code>。如果这次做的是产品里的数据面板，推荐会更密，也更不像玻璃。不能说这个技能对 LensBoard 永远选玻璃拟态。</li>
            </ul>
            <p>
              这次它做了目录该做的事：把页面从深色紫调、通篇 Inter 的模板里带出来，收成一套浅色系统，包括字体、配色、按钮对比度，以及不要默认深色。在这份受控对照里，它没有发明更特别的版式，也没有做出很抢的玻璃效果。这个结果比再写一篇安装说明更有用。
            </p>
          </section>

          <section className={styles.section} id="pitfalls">
            <h2>六个坑</h2>
            <ol className={styles.steps}>
              <li>
                <p>
                  <strong>1. 旧包 <code>uipro-cli</code> 仍会安装成功。</strong>
                  {' '}
                  <code>npm install uipro-cli</code> 当天装上的是 2.2.3，命令同样叫 <code>uipro</code>，输出也是成功。npm 没有把它标成 deprecated。2026-11-09 至 2026-11-15 它还有 5,042 次周下载。菜鸟教程的 Claude Code 实例页仍在教 <code>npm install -g uipro-cli</code>。旧技能的 <code>SKILL.md</code> 自称 67 种风格、96 套配色、57 组字体、99 条 UX、25 种图表、13 个技术栈。文件 31 个，大约 0.57 MB；2.15.0 是 71 个文件，大约 3.7 MB。颜色表 97 行对 193 行，产品 96 对 193，风格 68 对 89，字体 57 对 75，UX 指南 99 对 120。技术栈只有 13 个，没有后来的 angular、laravel、javafx、wpf、winui、avalonia、uno、uwp。没有 <code>catalog-summary.json</code>、<code>motion.csv</code>、<code>google-fonts.csv</code>。默认的 <code>uipro init --ai cursor</code> 没有从当时的 GitHub 发布物刷新，得到的目录和加 <code>--offline</code> 一样旧。<code>--help</code> 里没有 <code>uninstall</code>。它的 <code>uipro versions</code> 当天失败，返回 GitHub API rate limit exceeded。
                </p>
              </li>
              <li>
                <p>
                  <strong>2. 两个包的命令都叫 <code>uipro</code>。</strong>
                  {' '}
                  我们在各自的目录里装过：官方包打印 2.15.0，<code>uipro-cli</code> 打印 2.2.3。全局如果先留下旧包，PATH 上的 <code>uipro</code> 可以一直停在 2.2.3。先跑 <code>uipro --version</code>。优先用 <code>npx --yes ui-ux-pro-max-cli</code>，或项目里的 <code>node_modules/.bin/uipro</code>。官方排错说明：看到 unknown command &apos;uninstall&apos; 或 &apos;update&apos;，就是 CLI 旧了。2.15.0 有 <code>uipro uninstall</code>。未登录的 GitHub API 限额，官方文档写的是每小时 60 次，可以用 <code>UI_PRO_MAX_GITHUB_TOKEN</code> 或 <code>--token</code>。2.15.0 的 init 默认用包内模板，<code>--offline</code> 是兼容旗标，不是版本锁定。
                </p>
              </li>
              <li>
                <p>
                  <strong>3. main 上的 README 比 npm 2.15.0 新。</strong>
                  {' '}
                  <code>--preview</code> 和 <code>--tokens</code> 已写进当天的 GitHub README，包括中文 README。这两个旗标在 2026-11-16 才进 main，不在 npm 2.15.0 里。对装着的 2.15.0 跑 <code>search.py</code>，报错是：
                </p>
                <pre className={styles.code}>{`search.py: error: unrecognized arguments: --preview
search.py: error: unrecognized arguments: --tokens css`}</pre>
                <p>2.15.0 的帮助文本里没有这两项。以装上的 CLI 为准，不要只看当天的在线 README。官网的目录数字比 2.15.0 还旧，见上一节的表。</p>
              </li>
              <li>
                <p>
                  <strong>4. 官网的宣传数字落后于 2.15.0。</strong>
                  {' '}
                  2026-11-16 的 <Out href={siteUrl}>uupm.cc</Out> 仍写 57 种风格、95 套配色、56 组字体、8 个技术栈、24 种图表、29 种落地页版式。安装目录里是可检索风格 79、配色 192、字体配对 74、技术栈 22、图表 25、落地页版式 34。引用数量时写明版本和日期。
                </p>
              </li>
              <li>
                <p>
                  <strong>5. 没有 Python 3，技能也会装上。</strong>
                  {' '}
                  检索脚本需要 Python 3，而且只用标准库。安装步骤本身不检查这个。这次机器上有 3.13.5，脚本跑通了。官方文档把「自己安装 Python」写给使用者，把「不要替用户安装软件」写给代理。Windows 的商店别名和 PATH 这次没有复测。
                </p>
              </li>
              <li>
                <p>
                  <strong>6. 新营销页用 <code>--design-system</code>，不要盲拼各域的第一名。</strong>
                  {' '}
                  风格域把 Data-Dense Dashboard 排在第一。目录写明这种样式用于商业智能和企业报表，不要用于营销仪表盘和面向消费者的分析。字体域没有返回 Calistoga。设计系统模式给出的是玻璃拟态、Hero + Features + CTA、Calistoga / Inter、信任蓝和橙色按钮，并写了不要默认深色。做落地页跟这一份。做产品内的数据面板，再另跑，不要把这次的玻璃拟态说成唯一答案。
                </p>
              </li>
            </ol>
          </section>

          <section className={styles.section} id="alts">
            <h2>其他技能</h2>
            <p>
              下面三个名字来自 2026 年同时讨论到 UI UX Pro Max 的对照文章，不是这个仓库 README 里的官方竞品名单。2026-11-16 没有再核它们的星标和版本，所以这里不写数量。
            </p>
            <ul>
              <li>
                <strong>Anthropic <code>frontend-design</code>。</strong>
                {' '}
                一份短的官方技能，让助手按题材决定颜色、字体和版式，并避开通用的 AI 默认样子。常见装法是 Claude 市场里的 <code>frontend-design@claude-plugins-official</code>，或 <code>npx skills add anthropics/skills --skill frontend-design</code>。
              </li>
              <li>
                <strong>Taste Skill</strong>（<Out href="https://github.com/LeonxLnx/taste-skill">Leonxlnx/taste-skill</Out>）。针对公司和营销站的方向技能，近期版本带浏览器检查。
              </li>
              <li>
                <strong>Impeccable</strong>（Paul Bakaus）。那些文章更常把它推荐给已经有的界面、应用或仪表盘，并提到有的检查可以放进 CI。它不是 UI UX Pro Max 这种样式目录。
              </li>
            </ul>
            <p>
              那些文章的共同说法是：一次用一个负责口味和方向的技能。UI UX Pro Max 是带检索目录的那一个，栈也比较多。Vercel 的 <code>web-design-guidelines</code> 被写成复查时的附加项，不是替代品。
            </p>
          </section>

          <section className={styles.section} id="sources">
            <h2>出处</h2>
            <ul>
              <li><Out href={repoUrl}>GitHub 仓库</Out></li>
              <li><Out href={readmeZhUrl}>官方中文 README</Out>。它跟 main，所以可能写出 2.15.0 还没有的 <code>--preview</code>、<code>--tokens</code> 和更新的目录数字。</li>
              <li><Out href={siteUrl}>官网 uupm.cc</Out>。当天的宣传数字见上文。</li>
              <li><Out href={npmUrl}>npm：ui-ux-pro-max-cli</Out> 和 <Out href={releaseUrl}>v2.15.0 发布页</Out></li>
              <li><Out href="https://ui-ux-pro-max-skill.com/zh/docs/cli-reference/">一份非官方中文 CLI 说明</Out>，页面自标核对于 2026-11-03，并钉在 v2.15.0。它不是这次的对照测试。</li>
              <li><Out href="https://www.runoob.com/claude-code/claude-code-ui-ux-pro-max-skill.html">菜鸟教程的 Claude Code 实例</Out>仍在教 <code>uipro-cli</code>。这里只指出包名，不转述它的步骤。</li>
              <li><Out href={demoA}>A 页静态文件</Out> 和 <Out href={demoB}>B 页静态文件</Out>。这两页是这次的测试页，搜索引擎不收录。</li>
            </ul>
            <h3>这次没有做的</h3>
            <ul>
              <li>没有开 Cursor 对话，也没有把页面交给助手自由发挥。B 页是按 2.15.0 的 <code>--design-system</code> 输出写的。</li>
              <li>没有购买 Premium。额外的技能文件夹只作为 2.15.0 的安装现象记录。</li>
              <li>Claude Code 市场那两条安装命令写在官方 README 里。这台机器没有 Claude Code，没有跑。</li>
              <li>没有在 Windows 上复测 Python 的 PATH。</li>
              <li>其他技能的星标和版本没有在 2026-11-16 重查。</li>
            </ul>
            <p>
              另一篇实测教程是 <Link href="/scroll-world-landing-page-tutorial">Scroll-World 落地页拆解</Link>。那篇讲的是一条公开视频和滚动倒放，和这次的设计系统对照不是同一件事。
            </p>
            <p>
              <Link href="/resources">返回资料库</Link>
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
