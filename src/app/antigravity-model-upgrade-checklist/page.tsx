import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';
import styles from './tutorial.module.css';

const title = 'Antigravity 模型大升级：Hydrogen 全员可用、Pro 解锁 Carbon，用清单功能跑长任务';
const description =
  '2026-11-24，Antigravity 宣布重置 Gemini 额度：Hydrogen 向所有档位开放，付费 Pro 解锁 Carbon，原来单独的 Argon 配额并入通用 Gemini 池。同一波更新里，长任务进度清单（Progress checklist）上线。规则来自当天的官方原帖和文档，截图标明出处。这次没有登录账号做第一手复测。';
const pagePath = '/antigravity-model-upgrade-checklist';
const pageUrl = `${siteConfig.url}${pagePath}`;
const img = '/images/antigravity-model-upgrade-checklist';

const productUrl = 'https://antigravity.google/';
const modelsUrl = 'https://antigravity.google/docs/models/';
const plansUrl = 'https://antigravity.google/docs/plans/';
const pricingUrl = 'https://antigravity.google/pricing/';
const changelogUrl = 'https://antigravity.google/docs/changelog/';
const usageUrl = 'https://antigravity.google/docs/cli/commands/usage/';
const planUrl = 'https://antigravity.google/docs/plan/';
const toolsUrl = 'https://antigravity.google/docs/tools/';
const blogUrl = 'https://antigravity.google/blog/gemini-4-hydrogen-in-google-antigravity/';

const quotaPost = 'https://x.com/_mohansolo/status/2124960419429458207';
const rollingPost = 'https://x.com/_mohansolo/status/2124960739358282189';
const argonPost = 'https://x.com/_mohansolo/status/2124971131312734707';
const orchestratorPost = 'https://x.com/_mohansolo/status/2124917777630961911';
const checklistPost = 'https://x.com/_mohansolo/status/2125002306584506750';
const morePost = 'https://x.com/_mohansolo/status/2125002566195179902';
const rohanPost = 'https://x.com/RohanPhadte/status/2124978100345995731';
const officialPost = 'https://x.com/antigravity/status/2125032843550028030';
const doteyPost = 'https://x.com/dotey/status/2124998487221694583';
const doteyArgonPost = 'https://x.com/dotey/status/2125001715346714894';

export const metadata: Metadata = {
  title,
  description,
  keywords: ['Antigravity', 'Gemini 4 Carbon', 'Gemini 4 Hydrogen', 'Progress checklist', '额度重置', 'Orchestrator'],
  alternates: { canonical: pageUrl },
  openGraph: {
    title,
    description,
    url: pageUrl,
    type: 'article',
    images: [{
      url: `${img}/official-checklist-progress-4s-1920x1080.jpg`,
      width: 1920,
      height: 1080,
      alt: '官方账号演示中的 Progress checklist：当前步骤 Batch the ranking RPCs，已运行 2 分 38 秒',
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

export default function AntigravityModelUpgradePage() {
  return (
    <div className={styles.page}>
      <div className={styles.breadcrumb}>
        <Link href="/resources">资料库</Link>
        <span aria-hidden="true">/</span>
        <span>实测教程</span>
      </div>
      <p className={styles.copyrightBanner}>
        材料核对于 2026-11-24（北京时间）。依据是 Antigravity 负责人 Varun Mohan、产品负责人 Anshul Ramachandran、团队成员 Rohan Phadte、官方账号 @antigravity 的原帖，以及当天的官方文档。社区部分只引用宝玉（@dotey）当天的公开截图。这次写作没有登录 Antigravity 做第一手复测，文中的清单耗时、步骤数和额度百分比都来自官方演示或已署名的社区截图，不是本站跑出来的结果。
      </p>
      <header className={styles.hero}>
        <div className={styles.edition}>
          <span>小亦的 AI 学习实验室</span>
          <span>实测教程 · 2026-11-24</span>
        </div>
        <div className={styles.heroGrid}>
          <div>
            <p className={styles.eyebrow}>ANTIGRAVITY · GEMINI 4</p>
            <h1>{title}</h1>
            <p className={styles.intro}>
              对用 AI 做网站或内容的独立开发者，这次更新最有用的是三件事：免费档也能用 Gemini 4 Hydrogen；付费 Google AI Pro 可以在 Antigravity 里用 Gemini 4 Carbon；跑长任务时，对话里会出现进度清单（Progress checklist），不必再另开一轮对话去问现在进行到哪了。
            </p>
            <nav className={styles.heroLinks} aria-label="本页目录">
              <a href="#start">先看结论</a>
              <a href="#tiers">档位</a>
              <a href="#checklist">进度清单</a>
              <Out href={productUrl}>下载 Antigravity ↗</Out>
            </nav>
          </div>
          <figure className={styles.heroPhoto}>
            <Image
              src={`${img}/official-checklist-progress-4s-1920x1080.jpg`}
              alt="官方账号 @antigravity 演示视频约 4 秒截图：左上角标题为 Progress checklist，当前步骤 Batch the ranking RPCs 高亮，下方写着 Batching ranking RPCs into one call、已运行 2m 38s，模型选择器是 Gemini 4 Neon High，右侧是红色停止按钮。这是官方示例任务，不是本站复测。"
              width={1920}
              height={1080}
              priority
            />
            <figcaption>
              <span>官方演示进行中：Progress checklist，当前步骤 Batch the ranking RPCs，2m 38s。非本站复测。</span>
              <Out href={officialPost}>官方原帖</Out>
            </figcaption>
          </figure>
        </div>
        <div className={styles.heroFoot}>
          <span>整理：小亦 · 材料核对于 2026-11-24（北京时间）</span>
          <Out href={modelsUrl}>官方模型文档</Out>
        </div>
      </header>

      <div className={styles.layout}>
        <nav className={styles.toc} aria-label="教程目录">
          <a href="#start">1 先看结论</a>
          <a href="#tiers">2 各档能用什么</a>
          <a href="#quota">3 额度与 Argon 池</a>
          <a href="#models">4 怎么选模型</a>
          <a href="#checklist">5 进度清单</a>
          <a href="#web">6 网页端还不一样</a>
          <a href="#notes">7 使用时注意</a>
          <a href="#skipped">8 这次没有做的</a>
          <a href="#sources">9 来源</a>
        </nav>

        <article className={styles.article}>
          <section className={styles.section} id="start">
            <h2>先看结论，再决定怎么用</h2>
            <ul>
              <li>
                先把 Antigravity App 更新到最新版。团队成员 Rohan Phadte 称进度清单在 <strong>v2.34.0</strong> 已覆盖（“Should be rolled out for all users on v2.34.0”）。官方 Changelog 里 v2.34.0 的日期是 2026-11-20，改进列表没有单独的 “Introducing checklists” 条目，只有一则 “turn step checklist” 闪烁或消失的修复。Latest 是 2026-11-23 的 <strong>v2.35.0</strong>，也没有把该功能列为标题特性。所以这里写的是：团队成员称 v2.34.0 已覆盖，建议更新到当前最新版。下载入口在 <Out href={productUrl}>antigravity.google</Out>。
              </li>
              <li>
                更新后如果还看不到新模型或清单，先等一会儿再开。负责人最初写得像已经全量生效，产品负责人 Anshul Ramachandran 随后写 “rolling out now”。Mohan 回复：“Oops yeah meant rolling out, got too excited”。这是分批推送，不是所有人同一秒看到。
              </li>
              <li>免费和 Google AI Plus 用户：打开模型选择器，确认可以选 <strong>Gemini 4 Hydrogen</strong>。它是这两档，以及标准 Google AI Pro 试用账号的默认模型。</li>
              <li>付费 Google AI Pro 或 Ultra：确认列表里出现 <strong>Gemini 4 Carbon</strong>。普通试用 Pro，以及未标明「符合条件的高端设备试用」的账号，按官方文档拿不到 Carbon。</li>
              <li>要跑功能开发、重构、多文件排错：在付费档把模型选成 <strong>Orchestrator</strong>，规划用 Neon 或 Carbon，执行用 Hydrogen。</li>
              <li>要跑会持续好几分钟的长任务：直接下指令，盯对话里的 <strong>进度清单（Progress checklist）</strong>。官方的说法是：实时看每一步，需要复核时再展开完整拆解。</li>
            </ul>
          </section>

          <section className={styles.section} id="tiers">
            <h2>各档位现在能用什么模型</h2>
            <p>
              下表摘自 2026-11-24 的官方文档 <Out href={modelsUrl}>Choose a model</Out>，不是本站测出来的权限列表。个人 Google 账号按这一表理解。
            </p>
            <div className={styles.tableWrap}>
              <table>
                <thead>
                  <tr>
                    <th>模型</th>
                    <th>Free 与 Google AI Plus</th>
                    <th>Google AI Pro</th>
                    <th>Google AI Ultra</th>
                    <th>Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Gemini 4 Neon</td>
                    <td>无</td>
                    <td>付费计划，或符合条件的设备试用</td>
                    <td>有</td>
                    <td>有</td>
                  </tr>
                  <tr>
                    <td>Gemini 4 Carbon</td>
                    <td>无</td>
                    <td>付费计划，或符合条件的设备试用</td>
                    <td>有</td>
                    <td>有</td>
                  </tr>
                  <tr>
                    <td>Gemini 4 Argon（将于 2026-11-30 下线）</td>
                    <td>无</td>
                    <td>付费计划，或符合条件的设备试用</td>
                    <td>有</td>
                    <td>有</td>
                  </tr>
                  <tr>
                    <td>Gemini 4 Hydrogen</td>
                    <td>有（这几档的默认模型）</td>
                    <td>有</td>
                    <td>有</td>
                    <td>有</td>
                  </tr>
                  <tr>
                    <td>Orchestrator</td>
                    <td>无</td>
                    <td>付费计划，或符合条件的设备试用</td>
                    <td>有</td>
                    <td>有（规划固定为 Carbon High，执行固定为 Hydrogen High）</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>需要单独记住的限制：</p>
            <ul>
              <li>
                <strong>标准免费或促销的 Pro 试用，和付费 Pro 不是同一档。</strong> 试用额度更低，模型也更少。官方写明通常包含 Hydrogen，但不包含付费档的 Neon、Carbon、Orchestrator。要立刻拿到付费 Pro 的配额和完整模型，需按官方说明申请取消试用并转为付费计划。
              </li>
              <li>Claude Sonnet 5.5 和 Claude Opus 5.5 在 Pro 上只给非试用订阅。</li>
              <li>
                Gemini 4 Argon、Gemini 3.8 Flash、GPT-OSS-120b，以及 Claude Sonnet 4.6、Claude Opus 4.6，官方标注将于 <strong>2026 年 11 月 30 日</strong>下线。若还在用 Argon，尽快改用 Neon、Carbon 或 Orchestrator。
              </li>
              <li>思考等级：多数可调 Gemini 模型是 Low、Medium（默认）、High。Neon 和 Hydrogen 额外有 Extra（CLI 里是 xhigh）。</li>
            </ul>
            <p>
              官方没有公布每周或每 5 小时到底有多少 token，也没有公布可引用的具体价格数字。计划页只用定性描述，并写明限额随任务复杂度变化、可能调整。能写清的只有刷新规则：Free / Plus 按周刷新，另有每周限额；付费 Pro / Ultra 每 5 小时刷新，直到碰到每周上限，Ultra 的限额最高。更复杂的任务会消耗更多配额。Pro 和 Ultra 可以在设置里决定，基线配额用尽后是否动用已购买或一次性促销的 AI credits，选项是 <code>Never</code> / <code>Always</code>。官方计划页写明不支持 BYOK。
            </p>
          </section>

          <section className={styles.section} id="quota">
            <h2>额度重置，以及 Argon 配额并进总池</h2>
            <p>
              2026-11-24 04:16（北京时间），Mohan <Out href={quotaPost}>宣布</Out>：因为各档位正在升级模型，<strong>Antigravity 上所有人的 Gemini 配额都会重置</strong>；付费 Pro 将可以使用 Carbon，Hydrogen 将按此前承诺向所有用户开放。原文是 “keep swarming with Neon”。
            </p>
            <p>
              大约 40 分钟后，他在 04:59 又 <Out href={argonPost}>补充</Out>：付费 Pro 原来单独的 Argon 配额池会被取消，这部分容量并入通用 Gemini 池，于是同一池子可以花在更多的 Argon、Carbon，以及他最强调的 Neon 上。
            </p>
            <p>
              宝玉当天在 <Out href={doteyArgonPost}>回复</Out>里把这件事说得更直白：如果你不怎么用 Argon，省下来的额度可以更多地给 Carbon 和 Neon。
            </p>
            <p>
              在 App 里，可在模型菜单点击 <strong>View Usage</strong>，或到 Settings 查看基线配额；在 CLI 输入 <code>/usage</code>（别名 <code>/quota</code>）。模型选择器也会显示 Weekly Limit Remaining 和 Five Hour Limit Remaining。宝玉当天截图里，Gemini 与 Claude/GPT 的 Weekly limit、5h limit 都是 <code>100% left</code>，与「刚刚重置」相符。这只说明他当时的账号已重置，不代表所有人同一时刻都已到账。
            </p>
          </section>

          <section className={styles.section} id="models">
            <h2>怎么选模型，怎么把 Orchestrator 用起来</h2>
            <p>这些步骤来自官方文档，界面名称来自官方截图。这次没有在本站账号里点过这些菜单。</p>
            <ol className={styles.steps}>
              <li>
                <strong>1. 在对话输入框下方打开模型选择器。</strong>
                文档写明：选择器就在 conversation prompt box 下面。付费账号的列表里应能看到 Neon、Carbon、Hydrogen、Orchestrator 等；Free / Plus 至少应看到 Hydrogen。官方演示里的占位文案是 <code>Ask anything, @ to mention, / for actions</code>，模型示例是 <code>Gemini 4 Neon High</code>。同一轮对话会沿用你选中的模型。如果 agent 正在跑，中途改模型不会立刻生效，要等当前轮结束，或你先取消再改。
              </li>
              <li>
                <strong>2. 按任务选模型，而不是一律上最贵的。</strong>
                改文案、补测试、升级依赖、写一段明确的脚本：直接选 <strong>Gemini 4 Hydrogen</strong>，不必再拆规划阶段。给网站加一个完整功能、跨多文件重构、排查不明显的 bug：选 <strong>Orchestrator</strong>，让大模型规划、快模型执行。架构设计、棘手的并发问题、多仓库迁移，而你希望每一步都由同一个最强模型完成：直接选 <strong>Neon</strong> 或 <strong>Carbon</strong>，不要经过 Orchestrator。
              </li>
              <li>
                <strong>3. 若使用 Orchestrator，先设好规划模型和执行模型。</strong>
                打开 <strong>Settings &gt; Models &gt; Orchestrator Settings</strong>。官方说明是：更大、更强的规划模型配上更快、更省的执行模型，可以用更少 token 换来高质量结果。这是机制描述，不是某一次任务的实测消耗。
              </li>
            </ol>
            <p>Mohan 当天展示的组合是：</p>
            <ul>
              <li>Orchestrator Model（规划、做设计决策、验收结果）：<strong>Gemini 4 Neon High</strong></li>
              <li>Executor Model（搜索、改文件、构建和测试）：<strong>Gemini 4 Hydrogen High</strong></li>
            </ul>
            <p>
              官方文档写：Neon 是规划默认，Hydrogen 是执行默认；规划还可选 Carbon、Argon、Claude Opus 5.5，执行还可选 Claude Sonnet 5.5，都要档位支持。v2.35.0 Changelog 写：默认 Orchestrator / Executor 现在在可用时从 High 开始，而不再默认最高档。你也可以把鼠标悬停在模型选择器的 Orchestrator 上，只为当前对话改规划模型和思考等级。截图里的说明是：也可以从模型菜单的 Orchestrator 一行，按对话单独选。
            </p>
            <p>
              CLI 则是运行 <code>/model</code>，在 Orchestrator 一行用左右方向键选择 Planner（Neon / Carbon / Argon），执行侧固定为 Hydrogen。CLI 里 Orchestrator 的推理预算是固定的，<code>/effort</code> 对它不适用。Enterprise 的 Orchestrator 只允许 Carbon High 加 Hydrogen High。
            </p>
            <p>
              2026-11-12 的官方博客 <Out href={blogUrl}>Gemini 4 Hydrogen and Orchestrator</Out> 给出过一组实验室数据：在 Terminal-Bench 4.1 上，Orchestrator 的任务成功率接近单独使用 Carbon，平均少用 24% 配额、快 19%。这是当天的官方基准，不是这次升级的新数字，也不是某个独立开发者项目的实测。
            </p>
            <Shot
              src={`${img}/mohan-orchestrator-settings-1448x562.jpg`}
              alt="Varun Mohan 2026-11-24 原帖截图：Orchestrator Settings 卡片，说明文字是更大的规划模型配更快的执行模型可以用更少 token 换高质量结果。Orchestrator Model 选中 Gemini 4 Neon High，Executor Model 选中 Gemini 4 Hydrogen High。这是负责人自己的设置截图，不是本站复测。"
              width={1448}
              height={562}
              caption="Varun Mohan 在 2026-11-24 展示的 Orchestrator Settings：规划为 Gemini 4 Neon High，执行为 Gemini 4 Hydrogen High。官方原帖截图，非本站复测。"
              href={orchestratorPost}
              link="Mohan 原帖"
            />
          </section>

          <section className={styles.section} id="checklist">
            <h2>用 Progress checklist 看长任务跑到哪一步</h2>
            <p>
              官方对外名称是 <strong>Progress checklist</strong>（进度清单）。负责人也称它为 checklists。团队演示片片尾用过 Step Checklists，那是宣传片用语，不是另一个产品名。Changelog 里的 “turn step checklist” 只是 v2.34.0 的一则 bug fix，不要当成对外功能名。这次检索没有在官方文档或官方原帖里看到「Task tab」这个界面名称，正文不把它当成按钮名。
            </p>
            <p>
              它要解决的问题很具体：以前跑很久的任务时，你要么干等，要么再开一条 side chat（旁路对话）去问进度，既打断主线程，也浪费上下文。Mohan 说，这在你不想开旁路对话的最难任务上很有用，是体验上最大的问题之一，也是呼声最高的功能。他随后还发了一句 “Forgot to say more to come”，没有展开后续内容。
            </p>
            <p>
              官方账号的原话是：不必再猜测 agent 中途在干什么；现在可以实时跟踪每一步，需要复核时再展开完整拆解（expand the full breakdown）。
            </p>
            <p>根据官方演示视频和负责人配图，使用时大致是这样。这些是界面里已经出现的元素，不是本站编的操作流程，也不是本站跑通的案例：</p>
            <ol className={styles.steps}>
              <li>
                <strong>1. 更新后下达一个多步任务。</strong>
                把 Antigravity 更新到 v2.34.0 或更新版本。官方演示用的例子是：“Search p99 latency doubled this week. Find out why, fix it, and prove it with a load test.”
              </li>
              <li>
                <strong>2. 对话中出现清单。</strong>
                未开始是空心圆，进行中会高亮并配有当前动作说明，完成则打勾。约 4 秒的官方截帧里，进行中的是 “Batch the ranking RPCs”，下方写着 “Batching ranking RPCs into one call”，计时 2m 38s。
              </li>
              <li>
                <strong>3. 看已运行时长和步数。</strong>
                例如进行中的 <code>2m 38s</code>，结束后的 <code>Worked for 4m 18s</code> 和 <code>5/5 steps</code>。负责人配图则是 <code>Worked for 2m</code>、<code>12/12 steps</code>。
              </li>
              <li>
                <strong>4. 需要核对细节时再展开完整拆解。</strong>
                官方没有单独公布这个展开按钮的名字，这里不编造。清单是否可以手动勾选、编辑或重排，官方也没有说明。是否需要某个设置项才能打开，官方说的是能力已上线，没有给出开关名称。
              </li>
              <li>
                <strong>5. 运行中可以停。</strong>
                任务还在跑时，输入框旁是红色停止按钮；跑完后恢复为发送箭头。
              </li>
            </ol>
            <div className={styles.pair}>
              <Shot
                src={`${img}/official-checklist-progress-4s-1920x1080.jpg`}
                alt="官方账号 @antigravity 演示视频约 4 秒截图：标题 Progress checklist，任务是排查 search p99 延迟，当前步骤 Batch the ranking RPCs 高亮，计时 2m 38s，模型 Gemini 4 Neon High，红色停止按钮。官方演示，非本站复测。"
                width={1920}
                height={1080}
                caption="官方演示约 4 秒：进度清单运行中，当前步骤 Batch the ranking RPCs，2m 38s。官方示例，非本站复测。"
                href={officialPost}
                link="@antigravity 原帖"
              />
              <Shot
                src={`${img}/official-checklist-done-8s-1920x1080.jpg`}
                alt="官方账号 @antigravity 演示视频约 8 秒截图：同一条 Progress checklist 已完成，显示 Worked for 4m 18s 和 5/5 steps，输入框旁恢复为发送按钮，模型仍是 Gemini 4 Neon High。官方示例，非本站复测。"
                width={1920}
                height={1080}
                caption="官方演示约 8 秒：同一条任务结束，Worked for 4m 18s，5/5 steps。官方示例，非本站复测。"
                href={officialPost}
                link="@antigravity 原帖"
              />
            </div>
            <Shot
              src={`${img}/mohan-checklist-done-1100x554.jpg`}
              alt="Varun Mohan 2026-11-24 原帖配图：暗色进度清单完成态，顶部 Worked for 2m、12/12 steps，12 条全部打勾，从 Audit workspace, config, and git history 到 Finalize API credit usage report。这是官方示例任务，不是本站复测。"
              width={1100}
              height={554}
              caption="Varun Mohan 公布该功能时的完成态：Worked for 2m，12/12 steps，内容是审计工作区、检查 OAuth、核算 X API 费用并出报告。官方示例，非本站复测。"
              href={checklistPost}
              link="Mohan 清单原帖"
            />
            <p>
              负责人这张 12 步图是官方示例任务，不是本站实测结果，也不要把它算成某位转述者自己跑出来的耗时。团队演示视频里还有 “Live Progress · Parallel Steps · Live Focus · Zero Noise”，并出现过 “Auditing client &amp; tracing failing tests in parallel…”。并行是官方演示里展示过的能力，文档没有给出需要你手动打开的开关，因此不要把它写成必须配置的步骤。
            </p>
            <p>对独立开发者，更实用的用法是：把「先规划、再实现、最后自检」直接写进提示词，让清单上的步骤本身就能被验收。例如（这是建议提示，不是已跑通的案例）：</p>
            <blockquote className={styles.quote}>
              请为这个 Next.js 站点加上移动端也能用的订阅表单。先只读查看现有路由、组件和表单校验，列出实现计划；再改代码并补测试；最后在本地跑相关测试，把失败项修到通过。每一步在清单里写清楚，不要跳过验证。
            </blockquote>
            <p>
              盯清单时，重点看它是否真的在跑测试、是否卡在等待你批准的命令，而不是只看「我已经做完了」这句总结。如果某一步长时间停住，再用停止按钮或追加指令纠正，而不是另开一个容易把主任务带偏的旁路对话。这正是 Mohan 说这个功能要解决的问题。
            </p>
            <p>
              官方文档里另外还有 <Out href={toolsUrl}>task groups（任务组）</Out> 和 <Out href={planUrl}><code>/plan</code></Out>。任务组出现在规划模式，用来把大任务拆成子任务并展示进度；<code>/plan</code> 会先生成可审阅的 Implementation Plan，你确认后再点 Proceed。它们和这次新宣布的进度清单（Progress checklist）都和「把长任务拆开」有关，但官方没有在这次公告里把三者写成同一个开关，也不要把 task groups 写成这次新功能的名字。做复杂改动时，可以先 <code>/plan</code> 再执行，执行过程中再看进度清单。
            </p>
            <p>
              CLI，或经 ACP 接入的第三方 IDE，是否显示与 App 相同的可视化清单，官方没有在这次原帖里说明。这里不把社区里的自动回复当成依据。
            </p>
          </section>

          <section className={styles.section} id="web">
            <h2>一个重要差别：Antigravity 里的 Carbon，不等于 Gemini 网页里的 Carbon</h2>
            <p>
              宝玉在 2026-11-24 06:48（北京时间）<Out href={doteyPost}>写道</Out>：Antigravity 又重置了额度，Gemini Pro 订阅可以在 Antigravity 里使用 Carbon，但 Gemini 网页似乎还不行。他同时贴了两张截图。
            </p>
            <p>
              第一张是 Antigravity App，欢迎页写着 “Welcome back, Junmin. Where should we pick up?”。模型列表里已经能看到 <code>Gemini 4 Carbon Medium</code>（带 New 标记），当时选中的是 <code>Gemini 4 Neon High</code>；Argon 和 Gemini 3.8 Flash 标着 Leaving Soon。点开 View Usage 后，Gemini 与 Claude/GPT 的 Weekly limit 和 5h limit 都是 <code>100% left</code>。
            </p>
            <p>
              第二张是 Gemini 网页，浅色界面，标题是 “Where should we start?”。模型菜单里 “Code &amp; complex work / 4 Carbon” 带锁，当前选中的是 “Deeper analysis / 4 Neon”。
            </p>
            <div className={styles.pair}>
              <Shot
                src={`${img}/dotey-antigravity-carbon-1672x1530.jpg`}
                alt="宝玉 @dotey 2026-11-24 公开截图：Antigravity 欢迎页写着 Welcome back, Junmin. Where should we pick up?，模型列表已有 Gemini 4 Carbon Medium 并标 New，当前选中 Gemini 4 Neon High，Gemini 4 Argon 与 Gemini 3.8 Flash 标 Leaving Soon，View Usage 中 Gemini 与 Claude/GPT 的 Weekly limit 和 5h limit 都是 100% left。非本站复测。"
                width={1672}
                height={1530}
                caption="@dotey 公开截图：Antigravity 已列出 Carbon，View Usage 为 100% left。2026-11-24，非本站复测。"
                href={doteyPost}
                link="@dotey 原帖"
              />
              <Shot
                src={`${img}/dotey-gemini-web-carbon-locked-2000x1690.jpg`}
                alt="宝玉 @dotey 2026-11-24 同一帖的 Gemini 网页公开截图：浅色界面，标题 Where should we start?，模型菜单中 Code and complex work 的 4 Carbon 带锁，当前选中 Deeper analysis 的 4 Neon。这是社区截图，不是本站复测，也不是网页端的官方解锁声明。"
                width={2000}
                height={1690}
                caption="@dotey 公开截图：同一时间 Gemini 网页里 4 Carbon 仍带锁，当前是 4 Neon。社区观察，非本站复测。"
                href={doteyPost}
                link="@dotey 原帖"
              />
            </div>
            <p>
              这是他当天的公开截图，不是本站复测，也不是 Google 官方对网页端的单独声明。但它足以提醒一句：这次解锁写在 Antigravity 的公告和文档里。Gemini 网页和 Antigravity 不是同一个入口，不要默认打开 gemini.google.com 就能用 Carbon。网页端之后会不会放开，截至本文核对时官方没有另发说明。
            </p>
          </section>

          <section className={styles.section} id="notes">
            <h2>使用时要注意的几件事</h2>
            <ul>
              <li>
                <strong>先确认自己是付费 Pro，还是试用 Pro。</strong> 文档把这两类写得很清楚。如果模型列表里没有 Carbon 或 Orchestrator，先看订阅状态，再考虑是不是还在分批推送。
              </li>
              <li>
                <strong>Carbon 目前应按 Antigravity 来用。</strong> 不要把网页端截图里的锁当成 Antigravity 也没开放，也不要反过来假设所有 Gemini 入口都已解锁。
              </li>
              <li>
                <strong>Argon 将于 2026-11-30 下线。</strong> 并入总池不等于建议继续把主工作流放在 Argon 上。Gemini 3.8 Flash 同一天下线。
              </li>
              <li>
                <strong>配额仍然是共享的。</strong> 付费 Pro 把 Argon 池并进来之后，Neon、Carbon、Argon、Hydrogen 都走同一套 Gemini 配额。更重的推理会更快把 5 小时或每周限额用完。官方没有给出具体数字。
              </li>
              <li>
                <strong>进度清单解决的是可见性，不是验收。</strong> 它能告诉你 agent 认为自己在做哪一步，但不能替代你查看 diff、测试结果和准备合并的改动。
              </li>
            </ul>
            <p>
              另一篇实测教程是 <Link href="/ui-ux-pro-max-skill-tutorial">UI UX Pro Max</Link>，讲的是同一份 brief 的两张营销页。滚动叙事落地页在 <Link href="/scroll-world-landing-page-tutorial">Scroll-World 拆解</Link>。它们和这次的模型档位、进度清单不是同一件事。
            </p>
          </section>

          <section className={styles.section} id="skipped">
            <h2>这次没有做的</h2>
            <ul>
              <li>没有登录本站或作者的 Antigravity 账号复测模型列表、额度百分比和清单耗时。</li>
              <li>没有比较 Carbon、Neon、Hydrogen、Orchestrator 在同一个建站任务上的质量和耗额。</li>
              <li>没有验证 Gemini 网页在本文发布后是否已经解锁 Carbon。</li>
              <li>没有测试 CLI、IDE 扩展或第三方通过 ACP 接入时，是否显示与 App 相同的可视化 Progress checklist。</li>
              <li>没有测量官方博客中 24% 配额、19% 速度这组 Terminal-Bench 4.1 数据。那组数字属于 2026-11-12 的官方实验室结果。</li>
              <li>没有把第三方报道里未经官方原帖核对的比例，写进这篇教程。</li>
            </ul>
          </section>

          <section className={styles.section} id="sources">
            <h2>来源</h2>
            <p>时间均为北京时间。外链在新标签打开。</p>
            <ul>
              <li><Out href={quotaPost}>Varun Mohan：额度重置与模型升级</Out>（2026-11-24 04:16）</li>
              <li><Out href={rollingPost}>Varun Mohan：确认是 rolling out</Out></li>
              <li><Out href={argonPost}>Varun Mohan：取消付费 Pro 的独立 Argon 配额池</Out>（2026-11-24 04:59）</li>
              <li><Out href={orchestratorPost}>Varun Mohan：Orchestrator 可显式设置模型对</Out>（2026-11-24 01:27）</li>
              <li><Out href={checklistPost}>Varun Mohan：checklists 公告与完成态截图</Out>（2026-11-24 07:03）</li>
              <li><Out href={morePost}>Varun Mohan：Forgot to say more to come</Out></li>
              <li><Out href={rohanPost}>Rohan Phadte：v2.34.0 与演示</Out>（2026-11-24 05:27）</li>
              <li><Out href={officialPost}>@antigravity：Progress checklists 现已上线</Out>（2026-11-24 09:04）</li>
              <li><Out href={doteyPost}>宝玉（@dotey）：Antigravity 可用 Carbon、网页似乎还不行</Out>（2026-11-24 06:48）</li>
              <li><Out href={doteyArgonPost}>宝玉（@dotey）：Argon 独立额度并入总池</Out></li>
              <li><Out href={productUrl}>下载与产品页</Out></li>
              <li><Out href={modelsUrl}>官方模型与 Orchestrator 文档</Out></li>
              <li><Out href={plansUrl}>官方计划与配额</Out></li>
              <li><Out href={pricingUrl}>官方定价</Out>（档位说明，本文不引用未经核对的具体价格）</li>
              <li><Out href={changelogUrl}>官方 Changelog</Out>（v2.34.0 = 2026-11-20；v2.35.0 = 2026-11-23 Latest）</li>
              <li><Out href={usageUrl}>官方 CLI /usage</Out></li>
              <li><Out href={planUrl}>官方 /plan</Out></li>
              <li><Out href={toolsUrl}>官方 task groups（任务组）文档</Out></li>
              <li><Out href={blogUrl}>Gemini 4 Hydrogen 与 Orchestrator 博客</Out>（2026-11-12，含 Terminal-Bench 4.1 的 24% / 19%）</li>
            </ul>
          </section>
        </article>
      </div>
    </div>
  );
}
