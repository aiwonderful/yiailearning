import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';
import ScrubDemo from './ScrubDemo';
import {
  claudeCodeRequestPrompt,
  ffmpegDesktop,
  ffmpegMobile,
  fourSteps,
  heroFilmPrompt,
  landingPagePrompt,
} from './prompts';
import styles from './tutorial.module.css';

const title = '用 AI 视频做"滚动穿越"落地页：Scroll-World 做法拆解';
const description = '拆解 Meng To 用 HeyGen Video 1 做的滚动倒放落地页：一条 30 秒 2K 镜头，从平面图走到天空。含四步、已公开提示词，以及 ffmpeg 每 4 帧一个关键帧。价格只转述官方页面原文。';
const pagePath = '/scroll-world-landing-page-tutorial';
const pageUrl = `${siteConfig.url}${pagePath}`;
const postUrl = 'https://x.com/MengTo/status/2120896116711727557';
const templateUrl = 'https://fil.design/d/ea323fd7-6b27-4d6c-b6ee-bcee10ff2753/halden-template.zip';
const heygenUrl = 'https://www.heygen.com/models/heygen-video-1';
const heygenDocsUrl = 'https://developers.heygen.com/docs/models/heygen-video';
const heygenHelpUrl = 'https://help.heygen.com/en/articles/17272995-introducing-heygen-video-generate-cinematic-clips-from-a-prompt';

const guideSeekExcerpt = `// scroll progress 0 → 1 plays the film from its end back to its start
const p = clamp(-hero.getBoundingClientRect().top / (hero.offsetHeight - innerHeight));
const target = film.duration * (1 - p);
shown += (target - shown) * 0.14;            // ease toward it every frame
if (!seeking) { seeking = true; film.currentTime = shown; }
film.onseeked = () => seeking = false;       // one seek at a time`;

export const metadata: Metadata = {
  title,
  description,
  keywords: ['Scroll-World', '滚动穿越', '落地页', 'HeyGen Video 1', 'Meng To', 'ffmpeg'],
  alternates: { canonical: pageUrl },
  openGraph: {
    title,
    description,
    url: pageUrl,
    type: 'article',
    images: [{
      url: '/images/scroll-world/photo-landing-six-scroll-points.jpg',
      width: 1200,
      height: 1083,
      alt: 'Meng To 的落地页在六个滚动位置的静帧',
    }],
  },
  twitter: { card: 'summary_large_image', title, description },
};

const beats = [
  ['still-template-hero-01s-plan.jpg', '约第 1 秒，平面图', '桌面上的平面图'],
  ['still-template-hero-07s-model.jpg', '约第 7 秒，白模', '从平面图升起的白色模型'],
  ['still-template-hero-12s-house.jpg', '约第 12 秒，房子', '白模变成真房子'],
  ['still-template-hero-17s-inside.jpg', '约第 17 秒，室内', '镜头进入室内'],
  ['still-template-hero-23s-terrace.jpg', '约第 23 秒，露台', '镜头来到泳池边的露台'],
  ['still-template-hero-29s-sky.jpg', '约第 29 秒，天空', '升到房子上方的航拍'],
] as const;

function Out({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
}

export default function ScrollWorldTutorialPage() {
  return (
    <div className={styles.page}>
      <div className={styles.breadcrumb}>
        <Link href="/resources">资料库</Link>
        <span aria-hidden="true">/</span>
        <span>实测教程</span>
      </div>
      <p className={styles.copyrightBanner}>
        画面版权归 Meng To。本页只放静帧，不转载他的完整视频。Halden Arkitekter 是提示词里的虚构事务所。
      </p>
      <header className={styles.hero}>
        <div className={styles.edition}>
          <span>小亦的 AI 学习实验室</span>
          <span>实测教程 · 2026-11-13</span>
        </div>
        <div className={styles.heroGrid}>
          <div>
            <p className={styles.eyebrow}>SCROLL-WORLD · 落地页</p>
            <h1>{title}</h1>
            <p className={styles.intro}>
              首屏是一条连续镜头。页面向下滚，影片不往前播，而是被拖回开头：从天空回到露台、室内、房子、白模，最后停在平面图上。
            </p>
            <nav className={styles.heroLinks} aria-label="本页目录">
              <a href="#steps">四步做法</a>
              <a href="#prompts">提示词</a>
              <a href="#encode">重编码</a>
              <a href={postUrl} target="_blank" rel="noopener noreferrer">原帖 ↗</a>
            </nav>
          </div>
          <figure className={styles.heroPhoto}>
            <Image
              src="/images/scroll-world/photo-landing-six-scroll-points.jpg"
              alt="落地页在六个滚动位置的画面：从航拍回到露台、客厅、房子、白模和平面图"
              width={1200}
              height={1083}
              priority
            />
            <figcaption>
              <span>六个滚动位置。作者 Meng To。</span>
              <Out href="https://x.com/MengTo/status/2120896226380186006">原帖</Out>
            </figcaption>
          </figure>
        </div>
        <div className={styles.heroFoot}>
          <span>整理：小亦 · 材料核对于 2026-11-13</span>
          <Out href={templateUrl}>免费模板</Out>
        </div>
      </header>

      <div className={styles.layout}>
        <nav className={styles.toc} aria-label="教程目录">
          <a href="#effect">1 这个效果</a>
          <a href="#credit">2 作者</a>
          <a href="#steps">3 四步</a>
          <a href="#prompts">4 提示词</a>
          <a href="#encode">5 重编码</a>
          <a href="#scroll">6 滚动对时间</a>
          <a href="#mobile">7 手机 / iOS</a>
          <a href="#cost">8 费用</a>
          <a href="#related">9 相关资料</a>
        </nav>

        <article className={styles.article}>
          <section className={styles.section} id="effect">
            <h2>这个效果是什么</h2>
            <p>
              2026-11-12 23:06（北京时间），Meng To 发了一条落地页演示。主帖原文是：
            </p>
            <blockquote className={styles.quote}>{`I made this scroll-world landing page with HeyGen Video 1.

The whole hero is one 30-second take at 2K: floor plan, model, house, inside, sky. Scroll and it plays in reverse.

Full workflow, prompts and the free template below.`}</blockquote>
            <p>
              首屏整段就是这一条镜头，没有剪辑、没有拼接。页面不调用 <code>play()</code> 往前放，而是用滚动位置去改影片时间，并且把方向反过来。你一进页面在天空，越往下滚，越靠近片子的开头。
            </p>
            <p>
              短帖里的顺序是平面图、模型、房子、室内、天空。完整提示词把后半段写成室内、露台，再升到天空。模板按这个节拍做了章节：平面图、白模、房子、室内、露台、天空。
            </p>
            <p>同一件事在公开材料里有三份长度不同的片子，不要混用：</p>
            <ul>
              <li>模板里用来滚动的 <code>hero.mp4</code>：30.67 秒，1600×914，每秒 24 帧，没有音轨。提示词里写作 30.7 秒。</li>
              <li>回复里称为 full take 的那条 X 视频：下载到的文件约 51.16 秒，1280×720，每秒 30 帧。它和「30 秒」、也和模板里的 30.67 秒对不上。作者没有解释是加了头尾、X 转码，还是另一次导出。原帖未说明。</li>
              <li>主帖那条约 67 秒的视频是落地页滚动演示，不是 30 秒原片。接口记的是 1920×1080、约 67.1 秒；下载到的转码档是 1280×720、每秒 30 帧。</li>
            </ul>
            <div className={styles.frames}>
              {beats.map(([file, caption, alt]) => (
                <figure className={styles.figure} key={file}>
                  <Image src={`/images/scroll-world/${file}`} alt={alt} width={1600} height={914} />
                  <figcaption>
                    <span>{caption}</span>
                    <Out href={postUrl}>Meng To 的原帖</Out>
                  </figcaption>
                </figure>
              ))}
            </div>
            <p>上面六张是模板 <code>hero.mp4</code> 的静帧，用来对照节拍。页面上的六个滚动位置见文首那张图。</p>
          </section>

          <section className={styles.section} id="credit">
            <h2>案例作者</h2>
            <p>
              作者是 <Out href="https://x.com/MengTo">Meng To（@MengTo）</Out>。简介原文：Founder at @designcodeio and aura.build. I teach designers code and developers design. three.js 模板站是 <Out href="https://threeui.com/">threeui.com</Out>，主页是 <Out href="https://designcode.io/">designcode.io</Out>，另一条简介链接是 <Out href="https://www.aura.build/">aura.build</Out>。
            </p>
            <p>这条案例要看的原帖和下载：</p>
            <ul>
              <li><Out href={postUrl}>主帖：落地页演示</Out></li>
              <li><Out href="https://x.com/MengTo/status/2120896172131013076">一条 take 的成片</Out></li>
              <li><Out href="https://x.com/MengTo/status/2120896181362655326">完整影片提示词</Out></li>
              <li><Out href="https://x.com/MengTo/status/2120896216817078703">四步流程</Out></li>
              <li><Out href="https://x.com/MengTo/status/2120896226380186006">落地页提示词</Out></li>
              <li><Out href="https://x.com/MengTo/status/2120896234152202474">免费下载那一帖</Out>，文件入口是 <Out href={templateUrl}>halden-template.zip</Out></li>
              <li>HeyGen Video 1 产品页：<Out href={heygenUrl}>heygen.com/models/heygen-video-1</Out></li>
            </ul>
            <figure className={styles.figure}>
              <Image
                src="/images/scroll-world/photo-guide-cover.jpg"
                alt="免费指南封面，旁边列着模板、影片、提示词和一份 12 页 PDF"
                width={1200}
                height={750}
              />
              <figcaption>
                <span>作者写的下载清单：HTML 模板、HeyGen Video 1 影片、全部提示词，以及 12 页 PDF。</span>
                <Out href="https://x.com/MengTo/status/2120896234152202474">原帖</Out>
              </figcaption>
            </figure>
            <p>
              模板 README 写明：Halden Arkitekter is a fictional studio. The template, films and prompts are free to use. 页脚同样写 Films made with HeyGen Video 1。zip 里有 <code>index.html</code>、README、12 页 PDF、五份提示词，以及 hero、手机版 hero、process 和三条作品影片。
            </p>
          </section>

          <section className={styles.section} id="steps">
            <h2>作者的四步</h2>
            <p>他在线程里先给了一版短的，原文是：</p>
            <pre className={styles.code}>{fourSteps}</pre>
            <p>PDF 指南和 README 把这四步写得更具体。下面按那些公开材料转述，不另加步骤。</p>
            <ol className={styles.steps}>
              <li>
                <p><strong>1. 先把镜头写成带时间的节拍。</strong> 30 秒一条，顺序是平面图、模型、真房子、室内、露台、天空。先把房子写完整，再写每一段里相机怎么动、怎么转弯。写明机身、镜头和光圈。禁止项也写上：平面图上不要可读文字，不要人，不要 logo，布局不能变。</p>
              </li>
              <li>
                <p><strong>2. 只提交一次 API。</strong> 在放了 HeyGen API key 的项目目录里，用 Claude Code 发一次 HeyGen Video 1 请求：<code>text_to_video</code>，30 秒，<code>2k</code>，<code>16:9</code>。作者要求 Submit once，并且 Never retry or regenerate without asking me first。端点是 <code>POST https://api.heygen.com/v3/models/videos</code>，再用 <code>GET https://api.heygen.com/v3/models/videos/&#123;video_id&#125;</code> 查询。PDF 写完成后的文件是 2688×1536、每秒 24 帧、带声音。</p>
              </li>
              <li>
                <p><strong>3. 留下这条 take。</strong> 不剪、不拼。PDF 另外建议：先用 768p 把提示词磨顺，再跑一次 2K；逐帧看穿帮；好结果的 seed 留下来。同一条提示词加同一个 seed，会得到同一条片子。</p>
              </li>
              <li>
                <p><strong>4. 用一条提示词做落地页。</strong> Claude Code 写一个 <code>index.html</code>，只有 HTML、CSS 和 JavaScript，没有框架。滚动进度从 0 到 1，影片时间从片尾走到片头，所以向下滚是倒放。在这之前，先按下一节的 ffmpeg 命令重编码，拖动才会顺。</p>
              </li>
            </ol>
            <p>
              PDF 的 What you need 写了三样：HeyGen 账号和 API（key 在 platform.heygen.com）、Claude Code，以及处理视频用的 ffmpeg。原话还有一句：Check HeyGen&apos;s docs for current limits and prices before you run anything.
            </p>
          </section>

          <section className={styles.section} id="prompts">
            <h2>提示词</h2>
            <p>只放作者已经公开的原文。process 和三个项目片的原始提示词，作者说没有保存，这里写 未公开提示词。</p>
            <h3>影片设置</h3>
            <p>这些字段写在模板和 PDF 里。X 那条长帖写了 30 秒，没有写 seed。HeyGen 文档写得更窄：同一提示词加 seed 会得到同一份文件，但只保证在一次部署里可复现，不是永久编号。</p>
            <div className={styles.tableWrap}>
              <table>
                <tbody>
                  <tr><th>模型</th><td>heygen-video-1</td></tr>
                  <tr><th>模式</th><td>text_to_video</td></tr>
                  <tr><th>时长</th><td>30 秒</td></tr>
                  <tr><th>分辨率</th><td>2k，2688×1536</td></tr>
                  <tr><th>画幅</th><td>16:9</td></tr>
                  <tr><th>Seed</th><td>490668751。模板写 the same prompt and seed give the same take。这条 seed 没有出现在那条 X 长帖里。</td></tr>
                </tbody>
              </table>
            </div>
            <details className={styles.prompt}>
              <summary>Hero 影片提示词，X 和模板一致<span className={styles.plus} aria-hidden="true">+</span></summary>
              <p className={styles.promptNote}>
                公开在 <Out href="https://x.com/MengTo/status/2120896181362655326">这条帖</Out> 和模板 <code>prompts/01-hero-film-prompt.md</code>。下面是去掉 “The full prompt ↓” 之后的正文，3419 个字符。
              </p>
              <pre className={styles.promptText}>{heroFilmPrompt}</pre>
            </details>
            <details className={styles.prompt}>
              <summary>发给 Claude Code 的 API 请求，只在模板和 PDF<span className={styles.plus} aria-hidden="true">+</span></summary>
              <p className={styles.promptNote}>把上一份提示词贴到 with this exact prompt 的位置。key 放在项目目录的 <code>.env</code>，来自 platform.heygen.com。这条没有出现在 X 线程正文里。</p>
              <pre className={styles.promptText}>{claudeCodeRequestPrompt}</pre>
            </details>
            <p>
              同一份说明里还有两条约定：never retry without asking，以及 submit once。作者写 A 30-second 2K take is a real spend, so you decide when to run another. 也写了 Check HeyGen&apos;s API docs for the current fields and prices before you run it. 这次调用实际花了多少，没有公布。
            </p>
            <details className={styles.prompt}>
              <summary>落地页提示词，X 和模板一致<span className={styles.plus} aria-hidden="true">+</span></summary>
              <p className={styles.promptNote}>
                公开在 <Out href="https://x.com/MengTo/status/2120896226380186006">这条帖</Out>。模板 <code>prompts/03-landing-page-prompt.md</code> 多了 Markdown 标记，去掉标记后正文相同。下面按 X 原文，5958 个字符。
              </p>
              <pre className={styles.promptText}>{landingPagePrompt}</pre>
            </details>
            <h3>另外四条片子</h3>
            <p className={styles.unpublished}>未公开提示词</p>
            <p>
              PDF 和模板写的是：Four more HeyGen Video 1 takes fill the rest of the page. Their exact prompts weren&apos;t saved, so the prompts in the download are written from the finished films to make the same shots.
            </p>
            <p>
              所以原始生成提示词没有公开。模板里的 <code>prompts/04</code> 和 <code>prompts/05</code> 是后来按成片重写的，可以当重建稿用，不能当成当时提交的原文。X 主线程没有发这两组提示词。
            </p>
            <p>重建说明里能核对到的只有做法，不是原始提示词：</p>
            <ul>
              <li>Process 约 25 秒，两段接在一起：10 秒 <code>image_to_video</code>、1080p，再 15 秒从第一段最后一帧接着走。作者说剪在一起看起来像一次运镜。zip 里没有单独给出那段起始静帧。原帖未说明。</li>
              <li>三个项目各是一条 30 秒、<code>text_to_video</code>、2K、16:9，再剪成约 8 秒循环。模板写的区间是 Villa Lysning 8.5–16.5 秒，Hus Bjørkely 9–17 秒，Cederhuset 8.5–16.5 秒。</li>
            </ul>
          </section>

          <section className={styles.section} id="encode">
            <h2>为了能拖动，先重编码</h2>
            <p>作者公布的命令在 README 和 PDF 里是同一条。桌面和手机各一条，用的是 <code>-g 4</code>，不是每帧一个关键帧：</p>
            <pre className={styles.code}>{`${ffmpegDesktop}\n\n${ffmpegMobile}`}</pre>
            <p>
              指南里的解释是：Browsers seek to the nearest keyframe, and a normal MP4 has one every few seconds, so scrubbing backwards stutters. Re-encode the take with a keyframe every 4 frames.
            </p>
            <p>
              普通 H.264 大部分帧是差帧。要显示某一帧，解码器得从上一个关键帧开始，按顺序解到它。往前播放可以接着解。滚动条往回拖，或者跳到任意时间，如果上一个关键帧隔了好几秒，浏览器就要回头解一大段，画面就顿。
            </p>
            <p>
              <code>-g</code> 在 ffmpeg 手册里是 GOP 大小，默认 12。<code>-g 4</code> 大约每 4 帧一个关键帧。<code>-g 1</code> 才是每帧都可以当关键帧。作者用的是每 4 帧。回复里也有人建议拆成图片序列，作者没有采用那个做法。不要把 <code>-g 1</code>、每帧关键帧和图片序列写成他的步骤。
            </p>
            <p>
              命令里还有 <code>-keyint_min 4</code> 和 <code>-sc_threshold 0</code>。作者没有单独解释这两个旗标。原帖未说明。按 ffmpeg 的用法，它们是在配合 <code>-g 4</code>，不让编码器因为镜头切换自己改关键帧间隔。桌面版 <code>-crf 28</code>，手机版 <code>-crf 27</code>。为什么差 1，作者没有写。原帖未说明。
            </p>
            <p>
              <code>-an</code> 去掉音轨。API 下载下来的片子按 PDF 是带声音的，重编码之后的 hero 没有音轨。<code>+faststart</code> 会再走一遍，把索引放到文件开头，网页可以更早开始拖动。手册原文是把 moov atom 放到文件前面。
            </p>
            <p>PDF 说这样能把约 81 MB 的 2K 成片压到约 17 MB 的 hero 和约 8 MB 的手机版。2026-11-13 按模板文件量到的是：</p>
            <div className={styles.tableWrap}>
              <table>
                <thead>
                  <tr><th>文件</th><th>画面</th><th>关键帧</th><th>体积</th></tr>
                </thead>
                <tbody>
                  <tr><td>hero.mp4</td><td>30.67 秒，1600×914，每秒 24 帧，无音轨</td><td>184 / 736，每 4 帧一个</td><td>17,721,997 字节</td></tr>
                  <tr><td>hero-mobile.mp4</td><td>30.67 秒，960×548，每秒 24 帧</td><td>184 / 736</td><td>8,260,387 字节</td></tr>
                </tbody>
              </table>
            </div>
            <p>
              指南还写：页面上其他影片是普通关键帧的短循环。只有 hero 被倒着拖，所以只有 hero 用了这条密关键帧命令。
            </p>
            <p>
              缩小其他影片时，作者给的命令是 <code>npx skills add pixel-point/skills --skill compress-video</code>。他在回复里说，用这类技能可以把体积做到原来的 10%。hero 本身有没有再跑过这个技能，公开材料没有写。原帖未说明。这个技能仓库当天没有打开，这里不补充仓库里的细节。
            </p>
          </section>

          <section className={styles.section} id="scroll">
            <h2>滚动怎么对上影片时间</h2>
            <p>Hero 区块高 <code>520vh</code>。视频 <code>position: sticky</code>，铺满视口。人在滚，片子钉在屏幕上。</p>
            <p>指南第 05 节摘了这几行。它是摘录，不是 <code>index.html</code> 全文：</p>
            <pre className={styles.code}>{guideSeekExcerpt}</pre>
            <p>用做网页的话，可以把它读成四件事：</p>
            <ol>
              <li>滚动进度 <code>p</code> 从 0 到 1。人还在 hero 顶部时是 0，滚完这块高区域时是 1。</li>
              <li>目标时间是 <code>影片时长 × (1 - p)</code>。进度 0 在片尾，进度 1 在片头。向下滚就是倒放。</li>
              <li>每一帧不直接跳到目标时间，而是 <code>shown += (target - shown) * 0.14</code>，慢慢靠过去。</li>
              <li>上一次 seek 还没完成，就不要再设置 <code>currentTime</code>。作者写 Never call play()。滚动只是在拖时间，不是在播放。</li>
            </ol>
            <p>
              模板源码里还有一条：时间差大于 0.015 秒才设置 <code>currentTime</code>。上面这段 PDF 摘录没有写出 0.015。<code>innerHeight</code>、<code>shown</code>、<code>seeking</code> 的赋值也不在这段摘录里。
            </p>
            <p>
              MDN 对 <Out href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/currentTime"><code>currentTime</code></Out> 的说明是：改它就会 seek；这个值只是播放位置的近似；浏览器还可以把它调到媒体实际支持的位置。所以你写进去的秒数，和画面停住的帧，可能差一点点。
            </p>
            <p>章节用的是影片正向时间。页面倒着滚，所以从 Sky 开始：</p>
            <ul>
              <li>Sky 30–23 秒</li>
              <li>Terrace 23–18.5</li>
              <li>Inside 18.5–16</li>
              <li>House 16–10</li>
              <li>Model 10–3</li>
              <li>Plan 3–0</li>
            </ul>
            <p>正好落在 23、18.5 这些边界上时归哪一章，摘录没有写比较符号。原帖未说明。</p>
            <p>另外两件和拖动有关的事，作者写进了模板：</p>
            <ul>
              <li>视频是 <code>muted</code>、<code>playsinline</code>。hero 用 <code>preload=&quot;auto&quot;</code>。</li>
              <li>页面如果是用 http 或 https 打开的，先把 hero <code>fetch</code> 成 blob，再赋给 <code>video.src</code>，seek 会更快。从本地文件打开，就直接用路径。</li>
              <li><code>prefers-reduced-motion</code> 打开时不拖动。hero 改成一屏高，只显示天空静帧和标题。</li>
            </ul>
            <h3>用一张画布试这个映射</h3>
            <p>
              下面这个框是本页自己画的示意，用来试「进度 0 在片尾、进度 1 在片头」和每帧 0.14 的缓动。它不是 Meng To 的视频，也没有使用他的成片。在框里滚动，时间从 00:30 往 00:00 走。系统如果开了减少动态效果，它会停在天空那一帧。
            </p>
            <ScrubDemo />
            <p>章节秒数用的是作者公布的区间。边界点归哪一章，上面已经说过，原帖未说明。这里天空包含 23 秒，只是这个示意的取法。</p>
          </section>

          <section className={styles.section} id="mobile">
            <h2>手机和 iOS 要注意什么</h2>
            <h3>作者模板里已经写上的</h3>
            <ul>
              <li>宽度到 760px 以下，改用 <code>hero-mobile.mp4</code>，也就是上面那条宽 960 的重编码。</li>
              <li>手机上 <code>object-fit: cover</code>。右侧整条章节轨换成当前这一章的一个标签。</li>
              <li>所有视频 <code>muted</code>、<code>playsinline</code>，每条片子都有海报。</li>
              <li>减少动态效果时不 scrub，循环片停在海报上。</li>
            </ul>
            <h3>浏览器这边的通用限制</h3>
            <p>下面这些不是 Meng To 写进步骤的。他没有在公开材料里写 iOS 手势解锁、低电量模式，或者必须先 <code>play()</code> 一次才能 seek。那些如果要做，是你自己的兼容，不要写成他的做法。原帖未说明。</p>
            <p>
              WebKit 在 2016 年的 iOS 10 说明里写过：没有音轨，或者 <code>muted</code> 的视频，可以不经手势就 <code>play()</code>。后来如果出现音轨，或者在没有手势时取消静音，就会暂停。iPhone 上没有 <code>playsinline</code> 的视频仍会进全屏。<code>playsinline</code> 已经不带 <code>webkit-</code> 前缀。他的模板加了 <code>muted</code> 和 <code>playsinline</code>，和这条政策对得上。出处：<Out href="https://webkit.org/blog/6784/new-video-policies-for-ios/">New Policies for iOS</Out>。
            </p>
            <p>
              更早的 Apple 归档里还有「蜂窝网络下完全禁用 preload」这类旧说法。那些规则在 iOS 10 之后换过，不要拿来当现在的步骤。
            </p>
            <p>
              个人技术博客里还常见三句经验，同样不是他的步骤：关键帧很稀时，Chrome 和 Firefox 比 Safari 更容易顿；即便关键帧已经很密，Android 在原生滚动下仍可能卡；有人会先 <code>play()</code> 再立刻 <code>pause()</code>，用来应付 iOS 在第一次手势前锁住视频。最后这句没有出现在他的模板说明里。
            </p>
          </section>

          <section className={styles.section} id="cost">
            <h2>费用和免费额度</h2>
            <p>
              价格会变。这一节只转述 2026-11-13 在 HeyGen 官方页面上能核对到的原话，不推算这条 30 秒 2K 要花多少钱，也不采用第三方比价站的数字。
            </p>
            <h3>产品页</h3>
            <p>
              <Out href={heygenUrl}>HeyGen Video 1 产品页</Out> 当时能看到的原文包括：
            </p>
            <ul>
              <li>HeyGen Video generates the picture, dialogue and sound effects of a scene in one pass.</li>
              <li>Free: 2 clips a day. Longer clips, your own images and 2K are in HeyGen.</li>
              <li>API 区块写了 $0.02 per second，以及 Text, image or reference to video from 480p to 2K, with seeds and webhooks.</li>
            </ul>
            <p>
              页面没有写明这 $0.02 每秒对应哪一档分辨率，也没有写 2K 是不是同一个单价。不要把它当成 30 秒 2K 的价格。
            </p>
            <h3>API 文档</h3>
            <p><Out href={heygenDocsUrl}>官方 API 文档</Out> 和这条案例直接相关的原文是：</p>
            <ul>
              <li>模型 ID 是 <code>heygen-video-1</code>。创建用 <code>POST /v3/models/videos</code>，查询用 <code>GET /v3/models/videos/&#123;video_id&#125;</code>，鉴权头是 <code>x-api-key</code>。</li>
              <li>三种 mode：<code>text_to_video</code>、<code>image_to_video</code>、<code>reference_to_video</code>。</li>
              <li>prompt 最长 32,000 字符。resolution 默认 <code>768p</code>。1080p 和 2k 按 768p 费率的 3 倍计费。</li>
              <li><code>text_to_video</code> 和 <code>image_to_video</code> 在 turbo 或 quality 下，显式时长是 5 到 30 秒。</li>
              <li>输出是 MP4、H.264、每秒 24 帧。音频是 AAC，32 kHz 立体声。<code>16:9</code> 加 <code>2k</code> 的像素是 2688×1536。</li>
              <li>自己设置 seed 时，同一条提示词会返回同一份文件。文档同时写：把 seed 看成某一次部署里可复现，不要看成永远指向同一条渲染的编号。</li>
              <li>This route runs on paid API keys. 额度不够会返回 400。</li>
            </ul>
            <p>文档没有写出 768p 或 2K 的绝对美元单价，只给出 2K / 1080p = 3 × 768p。</p>
            <h3>帮助中心</h3>
            <p><Out href={heygenHelpUrl}>官方帮助文</Out> 当时能看到的原文是：</p>
            <ul>
              <li>HeyGen Video is billed per second of output video.</li>
              <li>We&apos;re running a 50% launch promotion through November 30, 2026 — prices below include the discounted rate:</li>
              <li>页面标注 Last Updated: November 9, 2026。</li>
            </ul>
            <p>
              帮助页上的价格表，当天没有变成可复制的数字。所以这里不写各分辨率的美元价格。要看现价，打开那一页，或登录后的官方定价页。
            </p>
            <h3>能不能免费做出这条 2K</h3>
            <p>
              按上面三处官方文字，不能断言这条 30 秒 2K 可以在免费层做完。产品页的免费层是每天 2 条，并写明更长的片子、自己的图片和 2K 在 HeyGen 产品里。API 文档写这条路由使用付费 API key，2K 按 768p 的 3 倍计费。
            </p>
            <p>
              作者自己把 30 秒 2K 称为 a real spend，并让 Claude 不要在回复里提费用。这条片子实际扣了多少、中间废了几条，他没有写。原帖未说明。跑之前以官方页面当时的额度和价格为准。
            </p>
          </section>

          <section className={styles.section} id="related">
            <h2>相关资料</h2>
            <h3>同一作者的公寓 three.js 教程</h3>
            <p>
              同一天更早，Meng To 发过另一条帖：<Out href="https://x.com/MengTo/status/2120746846402564163">Full tutorial of how I recreated my apartment in three.js with opus 5.5 and fable 5.2</Out>。时间是 2026-11-12 13:13（北京时间）。视频时长约 10 分 38 秒。它不在这条 Scroll-World 线程里。本页不根据标题编步骤。
            </p>
            <p>
              更早的作品帖是 <Out href="https://x.com/MengTo/status/2119746949121495303">I turned my apartment into a three.js scene with Opus 5.5</Out>。他在另一条回复里写过 opus was for the threejs and fable for blender part。那是在说公寓项目，不是在说这个 HeyGen 落地页。Opus 5.5、Fable 5.2、three.js、Blender 都没有作为这条落地页的制作工具出现。
            </p>
            <h3>oso95/scroll-world 是另一套管线</h3>
            <p>
              作者在线程里两次推荐 <Out href="https://github.com/oso95/scroll-world">oso95/scroll-world</Out>，原话是 the scroll world skill is also very helpful。他没有说 Halden 这一页是用这个 skill 生成的。
            </p>
            <p>
              那个仓库的 README 说的是另一件事：给 Claude Code、Codex 这类代理用的 skill，用 AI 生成多个场景，再把多段相机飞行按滚动接起来。默认视频后端是 Monid 上的 Seedance 2.0，静帧或回退走 Higgsfield 或 Codex image_gen。2026-11-13 查看时，仓库描述是把品牌做成可滚动的 3D 世界落地页，许可证是 MIT。
            </p>
            <p>
              Halden 模板是一条 HeyGen Video 1 镜头，加上 Claude Code 写成的一个 HTML 文件。滚动驱动的是这一条影片，不是多段 3D 世界拼接。两套做法不要写成同一次制作。
            </p>
            <h3>公开材料里没有写清的</h3>
            <ul>
              <li>这条 30 秒 2K 的实际花费，以及中间作废了几条。原帖未说明。</li>
              <li>约 51 秒的 X 成片，和 30.67 秒的模板 hero，差在哪里。原帖未说明。</li>
              <li>process 和三个项目片的原始提示词。未公开提示词。模板里是事后重建稿。</li>
              <li>process 那段 <code>image_to_video</code> 的起始静帧。原帖未说明。</li>
              <li>hero 有没有再用 compress-video。原帖未说明。</li>
              <li>作者有没有为 iOS 做手势解锁或其他特殊处理。原帖未说明。</li>
              <li>线程里一条关于倒放会卡的回复，在 280 字处被截断，后半句没有拿到。原帖未说明。作者只回了 that&apos;s a good tip。他自己的做法仍是每 4 帧一个关键帧。</li>
            </ul>
            <p>
              <Link href="/resources">返回资料库</Link>
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
