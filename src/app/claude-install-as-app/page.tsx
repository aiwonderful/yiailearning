import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';
import styles from './tutorial.module.css';

const title = 'Claude 一键把网页小工具变成桌面应用：Install as app 上手指南';
const description =
  'Claude for Mac 和 Windows 从 6.28899.0 起，可以把 Artifact 安装成带独立图标和窗口的桌面应用。本文按 2026-11-25 的官方帮助页和公告整理安装、三档权限、Team 与 Enterprise 的默认设置和卸载。本站这次没有真机复测。';
const pagePath = '/claude-install-as-app';
const pageUrl = `${siteConfig.url}${pagePath}`;
const img = '/images/claude-install-as-app';

const articleUrl = 'https://claude.com/resources/articles/install-as-app';
const helpUrl = 'https://support.claude.com/en/articles/18516354-install-an-artifact-as-an-app';
const releaseUrl = 'https://support.claude.com/en/articles/12138966-release-notes';
const adminUrl = 'https://support.claude.com/en/articles/16994751-artifacts-admin-guide-for-team-and-enterprise-plans';
const desktopUrl = 'https://support.claude.com/en/articles/10065433-install-claude-desktop';
const downloadUrl = 'https://claude.com/download';
const usageUrl = 'https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work';
const claudeDevsUrl = 'https://x.com/ClaudeDevs/status/2125315491522650299';
const doteyUrl = 'https://x.com/dotey/status/2125368995746308453';

const examples = [
  {
    name: 'Linnet',
    blurb: 'a full layered image editor',
    href: 'https://claude.ai/artifact/HPtmhTpoSdHmRKNCJEUsoS',
  },
  {
    name: 'Phosphor',
    blurb: 'a file manager that looks made for a movie set',
    href: 'https://claude.ai/artifact/UtJhPrH24ejRTTWRtohwbx',
  },
  {
    name: 'Sift',
    blurb: 'sets up folder rules and uses Claude to keep your stuff organized',
    href: 'https://claude.ai/artifact/BDCr8b2L6rbJQXhsztAL2x',
  },
  {
    name: 'Tern',
    blurb: 'a terminal with Claude by your side to help and explain',
    href: 'https://claude.ai/artifact/7QjDeZEKPQUsDUCmFEjvyy',
  },
  {
    name: 'Vitals',
    blurb: 'a menu bar and tray app for peeking at your computer’s performance',
    href: 'https://claude.ai/artifact/NSkw2jaPZdkdqkrVfswSGc',
  },
  {
    name: '工程师演示合集',
    blurb: 'more demo apps made by one of our engineers',
    href: 'https://claude.ai/artifact/9j53nCVcrSdZyCHtxUZkWJ',
  },
] as const;

const demoTitles = [
  'Debris Space Tracker',
  "Imre's plate 14",
  "Rowan's 18,000 trees",
  "Where's Malik's PO?",
  "Kenji's rev C",
  "Tom's crossing",
] as const;

const pomodoroPrompt = `请做一个番茄钟小工具，先作为 Artifact 给我预览，我确认能用后再让我安装为桌面应用（Install as app）。

目标：
- 用于日常专注工作，默认 25 分钟专注、5 分钟短休息，每 4 个番茄后进入 15 分钟长休息。这三个时长都允许我在界面里改。
- 安装到 Mac 或 Windows 后，希望它能出现在 macOS 菜单栏或 Windows 托盘里，关掉主窗口也不要直接退出。
- 专注结束、休息结束时发送系统通知。请在需要通知和菜单栏/托盘权限时再向我申请，不要申请访问我的文件，也不要运行本机程序。
- 主窗口里需要有：开始 / 暂停 / 重置、当前阶段（专注或休息）、剩余时间、今天已完成的番茄数。
- 菜单栏或托盘里显示剩余时间，点击可暂停或继续。
- 界面用中文，配色干净，窗口保持小巧。请先让我在 Artifact 里把一次完整的专注和休息流程点一遍。`;

const ledgerPrompt = `请做一个个人记账小工具，先作为 Artifact 给我预览，我确认能用后再安装为桌面应用（Install as app）。

我希望打开后就能直接记一笔账，而不是每次都去翻旧对话。

功能：
- 快速记一笔：金额、收支类型（收入 / 支出）、分类、日期、备注。支出默认分类包括餐饮、交通、住房、订阅、日用、学习、其他，也允许我新增分类。
- 首页显示本月收入、本月支出、结余，以及本月各类别占比。
- 提供按月查看的流水列表，支持按分类筛选，并可以编辑或删除某条记录。
- 数据保存在这个应用自己的数据里即可。这次不要读写我电脑上的表格或文件夹，也不要申请「完全访问这台电脑」。如果之后需要导出 CSV，先在界面里生成下载，而不是直接改我的本地文件。
- 如果可以，请提供一个可选的提醒：每月最后一天提醒我核对账目。这个提醒只有在我允许通知权限后才启用。
- 界面用中文，适合日常快速打开，不要做成复杂的财务系统。请先在 Artifact 里让我试记几笔账，并看到本月汇总有变化。`;

const boardPrompt = `请做一个内容选题看板，先作为 Artifact 给我预览，我确认能用后再安装为桌面应用（Install as app）。

使用场景：我在做 AI 工具教程和实测内容，需要把「今天看到的选题」快速记下来，并跟踪它进行到哪一步。

看板列：
- 灵感池
- 资料收集中
- 写稿中
- 待发布
- 已发布

每张卡片需要有：标题、一句话角度、内容类型（实测教程 / 案例合集 / 快讯）、来源链接、优先级（高 / 中 / 低）、截止日期（可选）、备注。我可以在列与列之间拖拽卡片，也可以搜索标题和备注。

另外请提供：
- 一键新增选题的表单，打开应用后就能马上记下一条，不必先找设置页。
- 本周概览：各列有多少条、本周到期的有哪些。
- 可选提醒：如果我允许通知权限，就在截止日期当天提醒我。不要申请访问我的本地文件或运行本机程序。
- 界面用中文，像一块可以钉在桌面上的小看板。请先让我在 Artifact 里新增 3 条选题，并把其中一条从「灵感池」拖到「写稿中」。`;

export const metadata: Metadata = {
  title,
  description,
  keywords: ['Claude Install as app', 'Artifact 桌面应用', 'Claude 桌面版', '番茄钟', 'AI 小工具'],
  alternates: { canonical: pageUrl },
  openGraph: {
    title,
    description,
    url: pageUrl,
    type: 'article',
    images: [{
      url: `${img}/anthropic-official-article-hero-1920.jpg`,
      width: 1920,
      height: 1080,
      alt: 'Anthropic 官方介绍文主图：复古像素风桌面，Library 菜单打开，欢迎窗口署名 Felix，并写明这些演示不是 Anthropic 官方产品',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [`${img}/anthropic-official-article-hero-1920.jpg`],
  },
};

function Out({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
}

function MenuPath({ parts }: { parts: readonly string[] }) {
  return (
    <>
      {parts.map((part, index) => (
        <span key={`${index}-${part}`}>
          {index > 0 ? ' > ' : null}
          <code>{part}</code>
        </span>
      ))}
    </>
  );
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
      <Image src={src} alt={alt} width={width} height={height} quality={90} />
      <figcaption>
        <span>{caption}</span>
        <Out href={href}>{link}</Out>
      </figcaption>
    </figure>
  );
}

export default function ClaudeInstallAsAppPage() {
  return (
    <div className={styles.page}>
      <div className={styles.breadcrumb}>
        <Link href="/resources">资料库</Link>
        <span aria-hidden="true">/</span>
        <span>上手指南</span>
      </div>
      <p className={styles.copyrightBanner}>
        材料核对于 2026-11-25（北京时间）。本站这次没有在 Mac 或 Windows 上真机复测，步骤和权限说明都依据官方帮助页和公告。按钮名称、确认框原文和演示画面来自官方材料，不是本站自己点出来的结果。原理部分另外引用了宝玉（<Out href={doteyUrl}>@dotey</Out>）当天的公开分析。
      </p>

      <header className={styles.hero}>
        <div className={styles.edition}>
          <span>小亦的 AI 学习实验室</span>
          <span>上手指南 · 2026-11-25</span>
        </div>
        <div className={styles.heroGrid}>
          <div>
            <p className={styles.eyebrow}>CLAUDE DESKTOP · INSTALL AS APP</p>
            <h1>{title}</h1>
            <p className={styles.intro}>
              对常常让 Claude 做小工具、却每次都要翻聊天记录才能打开的人，这个功能要解决的是：把已经做好的 Artifact 安装成一个能在程序坞或开始菜单里打开的应用。它有自己的图标和窗口，也可以在你允许后发通知、放到菜单栏。它不是传统意义上导出一个完全离线的安装包。
            </p>
            <nav className={styles.heroLinks} aria-label="本页目录">
              <a href="#steps">步骤</a>
              <a href="#permissions">权限</a>
              <a href="#prompts">提示词</a>
              <Out href={articleUrl}>官方介绍文 ↗</Out>
            </nav>
          </div>
          <figure className={styles.heroPhoto}>
            <Image
              src={`${img}/anthropic-official-article-hero-1920.jpg`}
              alt="Anthropic 官方介绍文主图：复古像素风桌面，左侧 Library 菜单打开，欢迎窗口署名 Felix，并写明这些演示不是官方 Anthropic 产品。旁边开着 Marrow、Linnet、Tern 等窗口"
              width={1920}
              height={1080}
              priority
              quality={90}
            />
            <figcaption>
              <span>官方介绍文主图。欢迎窗口里的示例由 Felix 制作，这些演示不是 Anthropic 官方产品。</span>
              <Out href={articleUrl}>官方介绍文</Out>
            </figcaption>
          </figure>
        </div>
        <div className={styles.heroFoot}>
          <span>整理：小亦 · 材料核对于 2026-11-25 · 未做真机复测</span>
          <Out href={helpUrl}>Install an artifact as an app</Out>
        </div>
      </header>

      <div className={styles.layout}>
        <nav className={styles.toc} aria-label="教程目录">
          <a href="#summary">1 先看结论</a>
          <a href="#what">2 它是什么</a>
          <a href="#steps">3 上手步骤</a>
          <a href="#open">4 打开和卸载</a>
          <a href="#permissions">5 三档权限</a>
          <a href="#teams">6 团队与企业</a>
          <a href="#prompts">7 三条提示词</a>
          <a href="#limits">8 限制</a>
          <a href="#how">9 原理</a>
          <a href="#examples">10 官方示例</a>
          <a href="#not-done">11 没有做的</a>
          <a href="#sources">12 来源</a>
        </nav>

        <article className={styles.article}>
          <section className={styles.section} id="summary">
            <h2>先看结论，再决定怎么用</h2>
            <p>
              依据是 Anthropic 官方介绍文 <Out href={articleUrl}>Turn artifacts into Mac and Windows apps</Out>、帮助中心 <Out href={helpUrl}>Install an artifact as an app</Out>、2026-11-24 的 <Out href={releaseUrl}>Release notes</Out>，以及官方账号 <Out href={claudeDevsUrl}>@ClaudeDevs 的原帖和演示视频</Out>。发布说明里的功能名是 Install artifacts as apps (beta)。
            </p>
            <ul>
              <li>
                先把 Claude for Mac 或 Claude for Windows 更新到 <strong>6.28899.0 或更高</strong>。据官方说明，macOS 用 <MenuPath parts={['Claude', 'Check for Updates']} />，Windows 在菜单按钮（☰）下用 <MenuPath parts={['Help', 'Check for Updates']} />。下载入口在 <Out href={downloadUrl}>claude.com/download</Out>。桌面版本身的系统要求，据安装帮助页，是 macOS 13（Ventura）或更高、Windows 10 或更高。
              </li>
              <li>
                这是 beta，正在分批推送。官方原文是 rolling out in beta，不是所有人同一秒看到。更新后如果还看不到 <code>Install as app</code>，先确认版本；Team / Enterprise 再问所有者是否已打开。官方桌面版默认走 Stable，Latest 大约每天会收到新版本，新功能可能更早到达。这次没有核验「改到 Latest 就一定能看到该功能」。
              </li>
              <li>
                适用平台目前只有 <strong>Mac 和 Windows</strong>。Linux、网页和手机据官方说明都不能把 Artifact 安装成应用。Claude Desktop 本身已有 Linux（beta），但这和 Install as app 不是一回事。
              </li>
              <li>
                官方帮助写明，正在向 Free、Pro、Max、Ultra、Team、Enterprise 推送。官方介绍文写 rolling out in beta on all plans。没有另付一笔「应用安装费」。你让 Claude 做这个工具，以及这个工具在运行时调用 Claude，都会计入你当前套餐的用量。额度以账号里的用量说明为准，本文不编造数字。
              </li>
              <li>
                推荐用法是：先在对话里把小工具做成 Artifact 并试用，确认能用，再点 <code>Install as app</code>。中文可以把它理解成「安装为应用」。官方按钮原文是 <code>Install as app</code>。中文界面是否就用这几个字，这次没有核验。
              </li>
              <li>
                默认情况下，它只拥有浏览器级别的能力，不能碰你的文件，也不能运行程序。通知、菜单栏、全局快捷键、置顶窗口，以及读写文件，都要另外允许。
              </li>
            </ul>
          </section>

          <section className={styles.section} id="what">
            <h2>这个功能是什么，适合谁用</h2>
            <p>
              据官方说明，Install as app 可以把 Claude 为你做的 Artifact 安装成 Mac 或 Windows 上的应用。安装后，它不再只出现在 Claude 的对话侧边，而是有自己的窗口和图标，可以像其他应用一样打开。
            </p>
            <p>
              它仍然是同一个 Artifact。你或共同编辑者改了内容，应用也会更新，不必重新打包。打开时必须在线，并且已经登录 Claude Desktop。它可以使用 Claude，也可以使用你已经接入的连接器（connectors）。官方明确写了：不必自行打包或签名（You don’t have to package or sign it），也不用 API Key，不用再登录一次，它使用你现有的 Claude 账号。
            </p>
            <p>
              @ClaudeDevs 在 2026-11-25 03:47（北京时间）的原帖里写道：
            </p>
            <blockquote className={styles.quote}>{`You can now install Claude artifacts as desktop apps on Mac and Windows.

Ask Claude to build an artifact, click "Install as app", and open it like any other app. It can use your connectors and, if you allow it, send notifications or add a menu bar item.`}</blockquote>
            <p>官方举例包括：定期从日历和邮箱拉取信息的会议准备页，以及当天待发货的订单追踪工具。</p>
            <h3>更适合这些情况</h3>
            <ul>
              <li>你已经有一个会反复打开的小工具，例如计时器、看板、清单，不想每次都到旧对话里找。</li>
              <li>你希望它出现在程序坞、开始菜单或菜单栏，必要时还能发通知。</li>
              <li>你不想自己打包、签名，也不想再申请一个 API Key。</li>
            </ul>
            <h3>不太适合这些情况</h3>
            <ul>
              <li>你需要完全离线使用。据官方说明，打开应用必须在线并保持登录。</li>
              <li>你主要在 Linux、网页或手机上用 Claude。</li>
              <li>你的 Artifact 是用 Docs、Slides、Sheets 等模板做的，或是旧版 Artifact（legacy artifacts）、Claude Cowork 的 live artifact。这些目前都不能安装。</li>
              <li>你所在的组织使用 HIPAA-ready 配置或混合部署（hybrid deployments）。官方写明这两类组织无法使用该功能，即使用户想开也开不了。</li>
            </ul>
            <p>
              浏览器里的 Add to Dock、Add browser shortcut、Add to Home Screen 只是快捷方式，没有这里说的桌面能力。不要把这两件事当成同一个功能。
            </p>
          </section>

          <section className={styles.section} id="steps">
            <h2>上手步骤（据官方说明）</h2>
            <p>
              以下步骤摘自官方帮助中心，并对照了 @ClaudeDevs 演示视频里的英语界面。中文版桌面客户端上的按钮原文，这次没有核验。
            </p>

            <h3>1. 更新 Claude 桌面版</h3>
            <p>
              安装或更新 Claude for Mac 或 Claude for Windows，确认版本至少是 <strong>6.28899.0</strong>。可到 <Out href={downloadUrl}>claude.com/download</Out> 下载，或在应用内检查更新。macOS 是 <MenuPath parts={['Claude', 'Check for Updates']} />。Windows 是菜单按钮（☰）下的 <MenuPath parts={['Help', 'Check for Updates']} />。
            </p>

            <h3>2. 先做成 Artifact，并自己试用</h3>
            <p>在 Claude Desktop 的对话里，直接描述你想要的小工具。官方给过这些例子：</p>
            <ul>
              <li><code>Make a Pomodoro timer that lives in my menu bar.</code></li>
              <li><code>Make a small Mac app that reminds me to stretch every hour.</code></li>
              <li><code>Make a Windows app that renames the photos in a folder by date.</code></li>
            </ul>
            <p>
              第三条会读写本地文件。按官方权限规则，安装后需要你允许「完全访问这台电脑」；在 Team / Enterprise 上，管理员还得先打开这一档。如果只是先试用界面，不必一上来就要这个权限。
            </p>
            <p>
              官方演示里用的提示词是 <code>Build me an app that tracks every piece of space junk in orbit.</code> Claude 回复 <code>{"Here's your space junk tracker."}</code>，生成了名为 Debris Space Tracker 的 Artifact，先在对话右侧预览。
            </p>

            <h3>3. 点 Install as app，并在确认框里同意</h3>
            <p>在 Claude Desktop 主窗口打开该 Artifact，然后用下面任一方式：</p>
            <ul>
              <li>打开 Artifact 的标题菜单，或在 Artifact 上右键，选择 <code>Install as app</code>；</li>
              <li>在 <code>Share</code> 菜单里选择 <code>Install as app</code>；</li>
              <li>如果这个 Artifact 自己带了安装按钮，也可以点它。</li>
            </ul>
            <p>无论走哪一条，Claude 都会再弹出确认框，让你再确认一次。</p>
            <Shot
              src={`${img}/claudedevs-official-demo-title-menu.jpg`}
              alt="ClaudeDevs 官方演示截图，英语界面：Debris Space Tracker 的标题菜单展开，光标停在带 Beta 标记的 Install as app。菜单里还能看到 Share、Export、Pop out、Permissions 等项。非本站复测"
              width={1920}
              height={1080}
              caption="官方演示视频约第 4 秒，英语界面。标题菜单里 Install as app 右侧有 Beta。中文版按钮原文这次没有核验。非本站复测。"
              href={claudeDevsUrl}
              link="@ClaudeDevs 原帖"
            />
            <p>
              官方演示（英语界面）的标题菜单里，实际出现过这些文案。中文版是否一一对应，这次没有核验：菜单顶部是 <code>Edited 4 minutes ago</code>，然后是 <code>Share</code>、<code>Export</code>、<code>Pop out</code>、<code>Open in web</code>、<code>Unpin</code>、<code>Install as app</code>（右侧有 Beta）、<code>Rename</code>、<code>Duplicate</code>、<code>Move to...</code>、<code>Refresh</code>、<code>Permissions</code>、<code>Give feedback</code>、<code>Related artifacts</code>、<code>Close tab</code>、<code>Delete</code>。
            </p>
            <Shot
              src={`${img}/claudedevs-official-demo-install-dialog.jpg`}
              alt="ClaudeDevs 官方演示截图，英语界面：确认框标题是 Install Debris Space Tracker as an app，带 Beta 标签。正文说明它会成为有自己窗口和图标的独立程序，未经允许不能访问文件或运行程序。按钮是 Cancel 和 Install。非本站复测"
              width={1920}
              height={1080}
              caption="官方演示视频约第 5 秒。确认框说明：未经允许，它不能访问文件，也不能运行程序。按钮是 Cancel 和 Install。非本站复测。"
              href={claudeDevsUrl}
              link="@ClaudeDevs 原帖"
            />
            <p>官方演示里，确认框原文是：</p>
            <blockquote className={styles.quote}>{`Install “Debris Space Tracker” as an app?（带 Beta 标签）

If you continue, “Debris Space Tracker” will be installed as a standalone program and get its own windows and icons. It can’t reach your files or run programs unless you allow it.

按钮：Cancel / Install`}</blockquote>
            <p>
              演示视频里，安装过程表现为图标飞向 Dock，随后应用在独立窗口打开，Claude 对话窗口仍留在后面。视频结尾卡片写着：Build, run, and share desktop apps with Claude，以及 Now available in beta in Claude for macOS &amp; Windows。
            </p>
            <Shot
              src={`${img}/claudedevs-official-demo-standalone-window.jpg`}
              alt="ClaudeDevs 官方演示截图：Debris Space Tracker 已在独立窗口运行，后方仍是写着 Build me an app that tracks every piece of space junk in orbit 的 Claude 对话，Dock 上出现新图标。画面中的轨道物体数量是演示界面文字，不是本站核实的数据。非本站复测"
              width={1920}
              height={1080}
              caption="官方演示视频约第 10 秒。Debris Space Tracker 在独立窗口打开，Claude 对话还在后面，Dock 出现新图标。画面中的轨道物体数量是演示界面文字，不是本站核实的数据。非本站复测。"
              href={claudeDevsUrl}
              link="@ClaudeDevs 原帖"
            />
            <p>
              如果没有看到 <code>Install as app</code>，据官方说明先更新桌面版；Team 和 Enterprise 用户再向所有者确认功能是否已打开。也有可能是这个 Artifact 属于不能安装的类型，见文末限制。版本已经到 6.28899.0，个别账号仍可能暂时看不到，因为功能还在分批推送。
            </p>
          </section>

          <section className={styles.section} id="open">
            <h2>打开、停用与卸载</h2>
            <h3>打开</h3>
            <ul>
              <li>
                <strong>macOS：</strong>
                打开用户主目录 Applications 里的 <code>Claude Apps</code> 文件夹。官方写的是 home folder 里的 Applications，不是系统级 <code>/Applications</code> 根目录。要留在 Dock，就右键图标选 <MenuPath parts={['Options', 'Keep in Dock']} />。也可以用 Spotlight 或 Apps 启动器找到。
              </li>
              <li>
                <strong>Windows：</strong>
                开始菜单的 <code>Claude Apps</code> 文件夹，或桌面上的快捷方式。
              </li>
              <li>
                <strong>仍在 Claude Desktop 里：</strong>
                在 Artifact 上选 <code>Open installed app</code>，或走 <MenuPath parts={['File', 'Apps']} />，选中应用后再选 <code>Open</code>。Windows 上 <code>File</code> 在菜单按钮（☰）下面。
              </li>
            </ul>
            <Shot
              src={`${img}/dotey-zh-claude-apps-folder-t90s.jpg`}
              alt="宝玉（@dotey）中文讲解视频截图：路径示意「你的应用程序 > Claude Apps > 订单追踪.app」，画面注明拆的是 Mac 版 Claude 6.28899.6 的静态分析。本站未拆包复核"
              width={1280}
              height={720}
              caption="宝玉（@dotey）中文讲解视频约第 90 秒。路径是他的示意：你的应用程序 > Claude Apps > 订单追踪.app。画面写明拆的是 Mac 版 Claude 6.28899.6 的静态分析。本站没有拆包复核。"
              href={doteyUrl}
              link="宝玉原帖"
            />
            <p>
              这张图来自宝玉的公开讲解，不是官方帮助页的截图。他把已安装应用说成放在名为 <code>Claude Apps</code> 的文件夹里的一个真 <code>.app</code>。文件夹这一层和官方「用户主目录 Applications 里的 Claude Apps」对得上。图上的「订单追踪.app」和版本号 6.28899.6 是他的静态分析示意，本站没有拆包复核，也不要把 6.28899.6 当成官方写明的最低版本。官方写的最低版本是 6.28899.0。
            </p>
            <h3>关掉窗口不等于退出</h3>
            <p>
              如果应用有菜单栏项目或托盘图标，关掉窗口后它还会继续运行。要停掉它：macOS 从 Dock 退出，或在它是当前应用时按 <code>Cmd+Q</code>；Windows 在托盘图标菜单里选 <code>Exit</code>。
            </p>
            <h3>卸载</h3>
            <ol>
              <li>在 Claude Desktop 里打开 <MenuPath parts={['File', 'Apps']} />。Windows 上 <code>File</code> 在菜单按钮（☰）下面。</li>
              <li>选中该应用。</li>
              <li>选择 <code>Uninstall</code>。</li>
            </ol>
            <p>
              据官方说明：macOS 上应用会进入废纸篓（Trash）；Windows 上会去掉快捷方式。如果还固定在 Dock、任务栏或开始菜单，需要自己再移除一次。卸载会撤回你给过的权限，但不会删除原来的 Artifact。如果 Artifact 被删除、下架，或不再分享给你，通常在打开应用时，Claude 会提议卸载。
            </p>
          </section>

          <section className={styles.section} id="permissions">
            <h2>三档权限</h2>
            <p>
              官方介绍文把权限分成三档。帮助中心给出了具体请求项。应用要使用这些能力时必须先询问，你选 <code>Allow</code> 或 <code>{"Don't allow"}</code>。下面按官方说明列，不是本站点出来的结果。
            </p>
            <Shot
              src={`${img}/dotey-zh-three-permission-levels-t225s.jpg`}
              alt="宝玉（@dotey）中文讲解视频截图：三档权限。第一档默认是浏览器级，能做的跟网页一样，碰不到文件。第二档是应用权限，列出置顶窗口、全局快捷键和发通知。第三档是完全访问，可以运行程序并读写删除文件，不会每次都问。公开讲解，非本站复测"
              width={1280}
              height={720}
              caption="宝玉（@dotey）中文讲解视频约第 225 秒。他把权限画成三档：浏览器级、应用权限、完全访问。这是公开讲解，不是官方界面，也不是本站复测。"
              href={doteyUrl}
              link="宝玉原帖"
            />
            <p>
              宝玉这张图把第二档写成置顶窗口、全局快捷键和发通知。官方帮助中心在需要单独允许的能力里，还列出了 macOS 菜单栏项目和 Windows 托盘图标。菜单栏和托盘以官方帮助页为准，不要只按这张图理解。
            </p>
            <div className={styles.tableWrap}>
              <table>
                <thead>
                  <tr>
                    <th scope="col">档位 / 权限</th>
                    <th scope="col">据官方说明，它能做什么</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>默认（Default）</td>
                    <td>只能做浏览器里也能做的事。安装确认框也写了：未经允许，不能碰你的文件，也不能运行程序。</td>
                  </tr>
                  <tr>
                    <td>通知（Notifications）</td>
                    <td>你在用其他应用时，仍可显示通知。</td>
                  </tr>
                  <tr>
                    <td>键盘快捷键（Keyboard shortcuts）</td>
                    <td>你在用其他应用时，仍可响应组合键。</td>
                  </tr>
                  <tr>
                    <td>置顶窗口（Float over other windows）</td>
                    <td>把内容画在其他窗口上方，并能读取鼠标在屏幕上的位置。</td>
                  </tr>
                  <tr>
                    <td>macOS 菜单栏项目 / Windows 托盘图标</td>
                    <td>应用打开时，在菜单栏或托盘显示一个项目。</td>
                  </tr>
                  <tr>
                    <td>完全访问这台电脑（Full access to this computer）</td>
                    <td>运行程序，以及在不必每次询问的情况下读取、修改或删除文件。同时也覆盖上面那些权限，除非你或组织把它们关掉。</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>这些规则都来自官方帮助和介绍文，不要简化成「勾一次就永远有效」：</p>
            <ul>
              <li>一次 <code>Allow</code> 只覆盖当前这一版应用。之后任何更新，包括你自己改的，Claude 都会再问一次。</li>
              <li><code>{"Don't allow"}</code> 会保持到你主动改掉。</li>
              <li>如果应用从其他网站加载代码，那部分代码可以在不再询问的情况下发生变化。官方明确写了这条风险。</li>
              <li>如果应用来自组织外部，或 Claude 无法确认作者，请求时会显示警告。</li>
              <li>
                完全访问只能给你自己做的应用。在 Team / Enterprise 上，也可以给本组织成员做的应用。官方说 Anthropic 不会在你安装前审查这些应用，只把完全访问给信任的应用。
              </li>
              <li>
                在 Free / Pro / Max / Ultra 上，「组织外部」指的是除你以外的任何用户。如果应用有一部分是组织外的人写的，或 Claude 无法确认作者，一般不允许它请求完全访问。
              </li>
              <li>
                更改或撤回权限：macOS 在应用打开时点菜单栏里的应用名，选 <code>Permissions</code>；Windows 右键标题栏（或按 <code>Alt+Space</code>）选 <code>Permissions</code>；也可在 <MenuPath parts={['File', 'Apps']} /> 里选。关掉完全访问可能会重载或关闭应用，先保存工作。它会停掉该应用启动的程序（已脱离应用的进程除外），但不会撤销应用已经做过的修改。
              </li>
              <li>如果你失去对该应用的访问（例如分享者停止分享），它启动的程序也会停，通常最多约 20 分钟；离线、未登录或切到其他组织时，可能更久。</li>
              <li>同一菜单里若有 <code>Report Artifact</code>，可以用来举报应用。</li>
            </ul>
          </section>

          <section className={styles.section} id="teams">
            <h2>Team、Enterprise 和管理员</h2>
            <ul>
              <li>
                <strong>Team 默认：</strong>
                功能默认打开，但最高权限「完全访问电脑（full access）」默认关闭，需管理员再打开。
              </li>
              <li>
                <strong>Enterprise 默认：</strong>
                整个功能默认关闭，需所有者在 <MenuPath parts={['Organization settings', 'Artifacts']} /> 打开。
              </li>
              <li>
                <strong>不能使用的组织类型：</strong>
                HIPAA-ready 配置的组织、混合部署。这两类即使用户想开也开不了。
              </li>
              <li>
                <strong>教育类：</strong>
                Claude for Teachers 和 K-12 组织没有「完全访问」；安装应用也可能关闭或不可用。官方没有给出更细的学校类型清单。
              </li>
            </ul>
            <p>
              管理员可在 <MenuPath parts={['Organization settings', 'Artifacts']} /> 分别开关 <code>Install as app</code>、<code>App permissions</code>、<code>Full access to the computer</code>。更改最多约一小时生效。这些设置只在当前选中的组织下生效。
            </p>
            <p>
              若要覆盖公司电脑上的个人账号，需用 MDM 设备策略。MDM 只能用来关闭功能，键名分别为 <code>isArtifactAppsEnabled</code>、<code>isArtifactAppPermissionsEnabled</code>、<code>isArtifactAppFullAccessEnabled</code>。这是给管理员的脚注，不是普通用户的操作步骤。
            </p>
            <p>
              零数据保留（ZDR）：对 Claude Code 开启了 ZDR 的组织，所有者打开 Artifacts 和 Install as app 后仍可安装；但官方写明，这些已安装应用不受零数据保留覆盖。组织级 ZDR 或客户管理加密密钥（CMEK）的组织，三项相关设置起步都是关闭。
            </p>
          </section>

          <section className={styles.section} id="prompts">
            <h2>三个可直接复制的场景提示词</h2>
            <p className={styles.note}>
              未经本站实测。下面三条是按官方能力写成的提示词草稿，方便你复制到 Claude Desktop 里先做 Artifact，试好再安装。这些提示词这次没有实际投喂，也没有安装结果可以展示。生成质量、能不能顺利要到菜单栏或通知权限，都需要你自己在桌面版里看。
            </p>
            <p>
              写提示词时建议同时说明：先做一个可在 Artifact 里预览的界面；如果需要通知或菜单栏，安装后再向用户请求相应权限；默认不要申请完全访问，除非功能确实要读写本地文件。
            </p>

            <h3>场景 1：菜单栏番茄钟</h3>
            <p className={styles.promptNote}>未经本站实测。适合需要专注计时、希望它住在菜单栏、到点能提醒，但不希望它有权读写你的文件。</p>
            <p>
              官方帮助中心的短示例是 <code>Make a Pomodoro timer that lives in my menu bar.</code> 如果你想要更明确的行为，可以用下面这段：
            </p>
            <pre className={styles.code}>{pomodoroPrompt}</pre>
            <p>
              据官方说明，菜单栏 / 托盘和通知都属于需要你额外允许的应用权限，不是装上就自动有。关掉窗口后它会不会继续计时，取决于你是否允许了菜单栏或托盘，以及你之后有没有真正退出应用。
            </p>

            <h3>场景 2：个人记账小工具</h3>
            <p className={styles.promptNote}>未经本站实测。适合想记一笔日常收支、按分类看月度汇总，但暂时不想把完全访问交给应用。</p>
            <pre className={styles.code}>{ledgerPrompt}</pre>
            <p>
              这样写是为了把能力限制在官方所说的「默认相当于浏览器」范围内。官方示例里的文件管理、按日期重命名照片，会用到完全访问；个人记账不必一上来就要那么高的权限。
            </p>

            <h3>场景 3：内容选题看板</h3>
            <p className={styles.promptNote}>未经本站实测。适合做网站或自媒体的人，想把选题、资料和状态做成一个可随时打开的看板。</p>
            <pre className={styles.code}>{boardPrompt}</pre>
            <p>
              如果你希望这个看板读取日历或邮箱里的截止日期，那是官方提到的连接器用法：应用可以像 Artifact 一样使用你已接入的连接器。但连接哪些服务、授权是否成功，取决于你账号里已经接好的连接器，本站这次没有验证。
            </p>
          </section>

          <section className={styles.section} id="limits">
            <h2>限制和常见问题</h2>
            <p>下面这些问题，答案都来自官方帮助中心或官方介绍文，不是本站复测。</p>
            <h3>必须联网、必须登录吗？</h3>
            <p>
              必须。据官方说明，打开已安装应用时，你需要在线并已登录 Claude Desktop。宝玉的判断与此一致：它像套了壳的网页应用，你的账号还要有权限访问对应的 Artifact。
            </p>
            <h3>会不会额外收费？</h3>
            <p>
              官方没有为这个功能单列价格。它在各套餐以测试版分批开放。做应用，以及应用调用 Claude，都会计入你当前套餐的用量限额。说明见 <Out href={usageUrl}>How do usage and length limits work?</Out>。额度具体是多少，以你账号里的用量说明为准，本文不编造数字。
            </p>
            <h3>和浏览器里「添加到程序坞 / 添加到主屏幕」有什么差别？</h3>
            <p>
              据官方说明，那些只是快捷方式，没有这里描述的桌面能力，例如受控的通知、菜单栏或托盘，以及在允许后与操作系统互动。
            </p>
            <h3>哪些 Artifact 不能安装？</h3>
            <p>
              据官方在发布时的限制：Linux、网页、手机不可用；用 Docs、Slides、Sheets 等模板做的 Artifact 不能安装；旧版 Artifact，以及 Claude Cowork 的 live artifact 也不能安装。HIPAA-ready 组织和混合部署不能使用。教育类账号可能没有完全访问，安装功能也可能不可用。
            </p>
            <h3>装好以后，改了 Artifact 要不要重装？</h3>
            <p>
              据官方说明，不必。它还是同一个 Artifact，改了之后应用会一起更新。不过，你之前批准的权限只对旧版本有效，更新后 Claude 会再问一次，包括你自己做的修改。
            </p>
            <h3>可以给它完全访问我的电脑吗？</h3>
            <p>
              可以申请，但限制很严。完全访问意味着它可以运行程序，并在不必每次询问的情况下读取、修改或删除文件。官方建议只把它交给你信任、并且是你自己（在 Team / Enterprise 上也可以是本组织同事）做的应用，因为 Anthropic 不会预先审查。来自组织外部、或作者无法确认的应用，通常不能请求完全访问。关掉该权限时，先保存工作；它不会撤销应用已经做过的修改。
            </p>
            <h3>Team 或 Enterprise 里为什么我看不到这个功能？</h3>
            <p>
              据官方管理员指南：Team 默认打开 Install as app，但完全访问默认关闭；Enterprise 则是整个功能默认关闭，需要所有者在 <MenuPath parts={['Organization settings', 'Artifacts']} /> 打开。设置变更最多约一小时生效。详情见 <Out href={adminUrl}>Artifacts admin guide for Team and Enterprise plans</Out>。
            </p>
            <h3>怎么卸载？卸载会删掉原来的小工具吗？</h3>
            <p>
              在 <MenuPath parts={['File', 'Apps']} /> 里选中应用，再选 <code>Uninstall</code>。据官方说明，这会移除应用和你给过的权限，但不会删除 Artifact。macOS 上它会进入废纸篓，Windows 上会去掉快捷方式。如果还留在 Dock、任务栏或开始菜单，需要再手动移除。如果对方取消了分享，或 Artifact 被删除，打开应用时通常会提示你卸载。
            </p>
            <h3>Computer use 能操作这些已安装应用吗？</h3>
            <p>
              据官方在发布时的说明：在 macOS 上，Claude 使用电脑时能看见已安装应用，但不能在里面点击或输入。
            </p>
          </section>

          <section className={styles.section} id="how">
            <h2>它的原理，以及为什么不是「导出离线软件」</h2>
            <p>
              官方把这件事讲得很直接：安装后你看到的还是那个 Artifact，只是换到了独立窗口里；它跟着 Artifact 更新；打开时要联网并登录；用的是你的 Claude 账号和连接器。
            </p>
            <p>
              宝玉在 2026-11-25 07:20（北京时间）的原帖里写道：
            </p>
            <blockquote className={styles.quote}>{`Claude 桌面版新出了 Install as app 功能，Claude 给你做的网页、小工具（Artifact），可以装成 Mac 和 Windows 上的应用，有自己的图标和窗口。

我大概分析了一下原理，有点像 Chrome 的 Web App，就是网页套一个壳，Claude 这个网页 App 还是要在线联网的，需要你自己的 Claude 账号有访问 Artifact 网页的权限才能正常用。`}</blockquote>
            <p>
              他在同一条帖子里附了两段讲解视频（英、中各一条）。中文视频里，他用「房卡」作比喻，并写明「拆的是 Mac 版 Claude 6.28899.6 · 静态分析」。按他的公开分析：装进电脑的其实像一张房卡，前台是你电脑上的 Claude（视频里指向 <code>/Applications/Claude.app</code>）；它是一个真的 <code>.app</code>，放在名为 <code>Claude Apps</code> 的文件夹里；所以不用 API Key，也不用再登录一次；Artifact 改了不必重装，「房间重新装修，卡还是那张，下次打开就是新版。」
            </p>
            <p>
              视频里出现的 <code>Info.plist</code> 字段示例（<code>ClaudeArtifactAppId</code>，以及指向 <code>/Applications/Claude.app</code>）是宝玉的静态分析示意，本站没有拆包复核。这里只转述他把原理比作房卡、以及 Chrome 网页套壳。不要把具体 plist 字段当成已经由本站验证的技术事实。他视频里指向的 <code>/Applications/Claude.app</code> 是本机上的 Claude 桌面版本身；已安装的小工具，按官方帮助页，放在用户主目录 Applications 里的 <code>Claude Apps</code> 文件夹，不是系统级 <code>/Applications</code> 根目录。
            </p>
            <p>对使用者更有实际意义、而且已经能与官方文档对上的判断是：</p>
            <ul>
              <li>不用再申请 API Key，也不用再登录一次。</li>
              <li>改了 Artifact，一般不必重装应用，但权限要重新批。</li>
              <li>离线、未登录，或失去对该 Artifact 的访问时，应用不会按普通本地软件那样继续完整工作。</li>
              <li>调用 Claude 算你自己套餐的用量。Team 默认打开、完全访问默认关闭；Enterprise 要管理员先打开；HIPAA-ready 和混合部署暂不可用。</li>
            </ul>
          </section>

          <section className={styles.section} id="examples">
            <h2>官方展示过的示例</h2>
            <p>
              官方介绍文写 People at Anthropic have used these to make，并给出可点击的 Artifact 链接。本次没有登录打开这些页面，不能描述它们打开后的交互细节，只能引用官方文案，以及主图上看得见的内容。
            </p>
            <div className={styles.tableWrap}>
              <table>
                <thead>
                  <tr>
                    <th scope="col">名称</th>
                    <th scope="col">官方一句介绍</th>
                  </tr>
                </thead>
                <tbody>
                  {examples.map((item) => (
                    <tr key={item.name}>
                      <td><Out href={item.href}>{item.name}</Out></td>
                      <td>{item.blurb}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              主图是复古像素风桌面，Library 菜单打开，能看见 Linnet、Tern、Marrow 等窗口。欢迎窗口署名 Felix。欢迎窗口里的示例由 Felix 制作，这些演示不是 Anthropic 官方产品。Phosphor、Sift 这类涉及文件管理的示例，会碰到完全访问。Anthropic 不在安装前审查这些应用，完全访问只留给你信任的应用。
            </p>
            <p>
              官方演示视频后半段还展示了若干独立窗口，标题分别可见：
              {demoTitles.map((name, index) => (
                <span key={name}>
                  {index > 0 ? '、' : ''}
                  <code>{name}</code>
                </span>
              ))}
              。它们是官方宣传片里的演示，不是本站已经装上并跑通的应用。标题里的数字和名称也不要当成经过本站核实的业务数据。
            </p>
          </section>

          <section className={styles.section} id="not-done">
            <h2>这次没有做的</h2>
            <ul>
              <li>没有在 Mac 或 Windows 上登录 Claude Desktop，实际安装、打开、授权或卸载任何一个应用。</li>
              <li>没有核验中文界面里的按钮原文是否与英语演示完全对应。</li>
              <li>没有把文中三条提示词真正发给 Claude，也没有对应的成品截图。三条都未经本站实测。</li>
              <li>没有打开 Linnet、Phosphor、Sift、Tern、Vitals 或工程师演示合集，确认它们当前是否仍可安装。</li>
              <li>没有测量做一个应用或让应用调用 Claude 会消耗多少套餐额度。</li>
              <li>没有测试 Linux 桌面版、网页版或手机版是否出现了官方文档尚未记载的入口。</li>
              <li>没有复核宝玉提到的 Info.plist 字段，也没有拆 Mac 版 Claude 6.28899.6。</li>
              <li>没有核验把桌面版发布通道改成 Latest 就一定能看到 Install as app。</li>
            </ul>
          </section>

          <section className={styles.section} id="sources">
            <h2>来源</h2>
            <ul>
              <li>Anthropic 官方介绍文：Turn artifacts into Mac and Windows apps，<Out href={articleUrl}>{articleUrl}</Out></li>
              <li>Claude 帮助中心：Install an artifact as an app，<Out href={helpUrl}>{helpUrl}</Out></li>
              <li>Claude 帮助中心 Release notes（2026-11-24，Install artifacts as apps (beta)），<Out href={releaseUrl}>{releaseUrl}</Out></li>
              <li>Claude 帮助中心：Artifacts admin guide for Team and Enterprise plans，<Out href={adminUrl}>{adminUrl}</Out></li>
              <li>Claude 帮助中心：Install Claude Desktop，<Out href={desktopUrl}>{desktopUrl}</Out></li>
              <li>官方下载页：<Out href={downloadUrl}>{downloadUrl}</Out></li>
              <li>用量说明：How do usage and length limits work?，<Out href={usageUrl}>{usageUrl}</Out></li>
              <li>@ClaudeDevs 官方原帖与演示视频（2026-11-25 03:47，北京时间），<Out href={claudeDevsUrl}>{claudeDevsUrl}</Out></li>
              <li>宝玉（@dotey）公开解读与讲解视频（2026-11-25 07:20，北京时间），<Out href={doteyUrl}>{doteyUrl}</Out></li>
              {examples.map((item) => (
                <li key={item.href}>
                  官方示例：{item.name}，<Out href={item.href}>{item.href}</Out>
                </li>
              ))}
            </ul>
            <p>
              资料库里另外两篇教程是 <Link href="/ui-ux-pro-max-skill-tutorial">UI UX Pro Max 对照</Link> 和 <Link href="/scroll-world-landing-page-tutorial">Scroll-World 落地页拆解</Link>。那两篇是落地页，和这次的桌面应用不是同一件事。
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
