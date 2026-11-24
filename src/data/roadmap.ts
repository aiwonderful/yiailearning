export const roadmapTitle = 'AI 学习路线图：六个阶段，从零基础到独立交付';
export const roadmapH1 = 'AI 学习路线图：六个阶段，从零基础到能独立交付';
export const roadmapDescription =
  '零基础学 AI 的完整路线图：六个阶段从认识工具地图、建立工作流、用 AI 写代码做页面，到部署上线、读案例复现、变现输出。每阶段写明学什么、动手做什么、怎么算学会、要多久。';

export type RoadmapInline =
  | { kind: 'text'; text: string }
  | { kind: 'strong'; text: string }
  | { kind: 'link'; href: string; text: string };

export type RoadmapBlock = {
  heading: string;
  bullets: RoadmapInline[][];
};

export type RoadmapStage = {
  id: string;
  heading: string;
  summary: string;
  goal?: string;
  blocks: RoadmapBlock[];
  learned?: string;
  stuck?: RoadmapInline[];
};

export type RoadmapFaq = {
  question: string;
  answer: string;
};

const text = (value: string): RoadmapInline => ({ kind: 'text', text: value });
const strong = (value: string): RoadmapInline => ({ kind: 'strong', text: value });
const link = (href: string, value: string): RoadmapInline => ({ kind: 'link', href, text: value });

export const roadmapIntro: RoadmapInline[][] = [
  [text('这份路线图写给两类人：一类刚开始接触 AI，被一堆工具和「一周入门」的标题搞得更焦虑；另一类已经用过一些工具，但每次都是零散用一下，做不出完整的东西。')],
  [
    text('它不列工具清单，因为工具每三个月换一批。它给的是'),
    strong('顺序'),
    text('：先做什么、做到什么程度算过关、下一个阶段才能开始。六阶段按下面的顺序走，每个阶段都写明学什么、动手做什么、怎么算学会，以及一个过来人容易卡住的地方。'),
  ],
  [
    strong('建议不要把阶段跳着走。'),
    text(' 阶段一没做完就跳到阶段三，最常见的后果是做出了一个自己改不动的页面，改一个按钮要来回折腾一整天。'),
  ],
];

export const roadmapStages: RoadmapStage[] = [
  {
    id: 'stage-1',
    heading: '阶段一：认识 AI 工具地图（1~2 周）',
    summary: '认识 AI 工具地图 · 1~2 周',
    goal: '知道哪类问题该找哪类工具，而不是遇到什么都在同一个对话框里问。',
    blocks: [
      {
        heading: '学什么',
        bullets: [
          [text('五类工具各自能干什么、不能干什么：对话模型、图像生成、视频生成、代码助手、Agent（能自己调用工具、连续干几步活的 AI）。')],
          [text('同一个任务在不同工具上的差别在哪里：哪些任务需要「一次给清楚」，哪些适合「一小步一小步来」。')],
          [text('提示词的基本结构：交代背景、给出输入、说清要什么格式、给出判断标准。这四件事比任何「神级提示词模板」都有用。')],
        ],
      },
      {
        heading: '动手做什么',
        bullets: [
          [
            text('照着'),
            link('/posts/ai-tools-for-beginners', 'AI 新手工具清单'),
            text('把五类工具各挑一个，用同一件小任务（比如把一段文字做成一张配图）分别试一次。'),
          ],
          [text('在'), link('/resources', '资料库'), text('里选出你真会用到的 3 个，其余先不管。')],
        ],
      },
    ],
    learned: '能对着一件具体任务说出「这件事我该用哪类工具、为什么不用另一类」，并且能说出这个工具大概率会在哪一步出错。',
    stuck: [text('收藏了太多工具，一个都没用熟。收藏不等于学会，一个工具用满十次，胜过十个工具各点一次。')],
  },
  {
    id: 'stage-2',
    heading: '阶段二：把工具装进自己的工作流（2~3 周）',
    summary: '把工具装进自己的工作流 · 2~3 周',
    goal: '从「问一句得一答」，变成「让 AI 按一个流程把一件完整的事跑完」。',
    blocks: [
      {
        heading: '学什么',
        bullets: [
          [text('长任务怎么拆成几步，每一步的输入和验收标准是什么。')],
          [text('循环推进的思路：做一轮、看结果、改指令、再做一轮，而不是一次就要求完美。')],
          [text('人工检查点：哪些环节必须自己看一眼才能往下走（数据、事实、金额、对外发布的文字）。')],
        ],
      },
      {
        heading: '动手做什么',
        bullets: [
          [
            text('照'),
            link('/loop-engineer', 'Loop Engineering 学习与实践指南'),
            text('完整跑一遍，把一个真实需求拆成循环，跑三轮以上，把每一轮的指令和结果记下来。'),
          ],
          [text('把流程记成一个可复用的清单，下次同类任务直接用。')],
          [
            text('如果用 Antigravity 跑会持续好几分钟的任务，先读'),
            link('/antigravity-model-upgrade-checklist', 'Antigravity 模型升级与进度清单'),
            text('：Hydrogen 向所有档位开放，付费 Pro 才能在 Antigravity 里用 Carbon，长任务看进度清单（Progress checklist）。材料核对于 2026-11-24，文中写明这次没有第一手复测。'),
          ],
        ],
      },
    ],
    learned: '能拿出一个自己写的流程，别人照着也能跑出接近的结果；并且知道在哪一步停下来人工核对。',
    stuck: [
      text('把「AI 一次做对」当目标。真正的效率来自'),
      strong('你改指令的速度'),
      text('，不是它一次写对的能力。'),
    ],
  },
  {
    id: 'stage-3',
    heading: '阶段三：用 AI 写代码，把想法做成页面（3~4 周）',
    summary: '用 AI 写代码，把想法做成页面 · 3~4 周',
    goal: '能把一个想法变成可以点击、可以填表、能在手机上正常看的页面。',
    blocks: [
      {
        heading: '学什么',
        bullets: [
          [text('用 AI 写代码时的表达方式：先要结构再要样式，一次只改一件事，出错了把报错原文贴回去。')],
          [text('组件复用：页头、页脚、按钮、卡片各写一次就够，改的时候改一处。')],
          [text('页面最基本的三个要求：标题说清这页讲什么、正文有真内容、手机上不出现排版错乱。')],
        ],
      },
      {
        heading: '动手做什么',
        bullets: [
          [text('照'), link('/scroll-world-landing-page-tutorial', '《从 0 做一个滚动叙事落地页》'), text('做出第一个页面。')],
          [text('再照'), link('/ui-ux-pro-max-skill-tutorial', 'UI UX Pro Max Skill 教程'), text('把它的样式和排版整理一遍。')],
          [text('想看看这套办法能做出什么，可以先看'), link('/vibe-coding', '我的作品页'), text('：Seedance 2.0 的视频生成站、两个已经上架的微信小程序、两个还在跑的独立站，都是这么一轮轮改出来的。')],
        ],
      },
    ],
    learned: '做出一个能交互的落地页，别人给你提一个修改意见（换个主色、加个表单），你能在半小时内改完并且不出新问题。',
    stuck: [text('一次让 AI 改十个地方，然后不知道是哪一处把页面改坏了。一次只改一处，改完能回退。')],
  },
  {
    id: 'stage-4',
    heading: '阶段四：把作品部署上线（1~2 周）',
    summary: '把作品部署上线 · 1~2 周',
    goal: '有一个自己域名下、别人点开就能用的网址，而不是只在本地能跑。',
    blocks: [
      {
        heading: '学什么',
        bullets: [
          [text('域名、部署、上线检查这三件事的基本顺序。')],
          [text('上线后必须自己验的几项：手机能不能打开、图片有没有加载出来、标题在搜索结果里显示成什么样。')],
          [text('怎么让谷歌知道你有了这个页面：提交站点地图、看收录状态、看哪些词带来了曝光。')],
        ],
      },
      {
        heading: '动手做什么',
        bullets: [
          [text('照'), link('/posts/website-deployment-guide', '网站部署上线的完整流程'), text('部署第一个站，绑定自己的域名。')],
          [text('上线后建一个表格，每周记一次：收录了几个页面、有几个词有曝光。先看这两项，别一开始就盯排名。')],
        ],
      },
    ],
    learned: '有一个能访问、能被搜索到、能自己更新的网址。之后每次改版，你能自己判断「这次改动是变好还是变坏」。',
    stuck: [text('上线就结束了，不看数据。上线只是开始，前两个月你几乎所有的判断都要靠收录和曝光这两条线。')],
  },
  {
    id: 'stage-5',
    heading: '阶段五：读案例练复现（持续，每周一个）',
    summary: '读案例练复现 · 持续，每周一个',
    goal: '从「看别人做出来很厉害」，变成「能看出他是怎么做的、我能复现到哪一步」。',
    blocks: [
      {
        heading: '学什么',
        bullets: [
          [text('读一个案例要看的四件事：输入是什么（提示词、素材、参数）、方法是什么、成果有多完整、作者自己承认的局限在哪。')],
          [text('复现的心态：目标不是 100% 一样，而是知道差在哪里、为什么差。')],
          [text('输出自己的判断：这个做法值不值得挪到自己的项目里。')],
        ],
      },
      {
        heading: '动手做什么',
        bullets: [
          [
            text('挑一个合集从头读：'),
            link('/gpt-6-cases', 'GPT-6 案例集'),
            text('、'),
            link('/fable-5-2-cases', 'Fable 5.2 案例合集'),
            text('、'),
            link('/gpt-image-2-6-cases', 'GPT Image 2.6 案例合集'),
            text('、'),
            link('/seedream-5-5-cases', 'Seedream 5.5 案例合集'),
            text('、'),
            link('/gemini-4-carbon-cases', 'Gemini 4 Carbon 案例合集'),
            text('。'),
          ],
          [text('每周选一个案例复现，写三行记录：我按什么参数做的、结果差在哪、下次要改哪一点。')],
        ],
      },
    ],
    learned: '能拿着一个没见过的案例，十分钟内说出它大概用了什么方法、缺了哪些信息、值不值得自己试。',
    stuck: [text('只看成果图，不看输入和局限。案例真正有用的部分，恰恰是作者写「这个没达到预期」的那一段。')],
  },
  {
    id: 'stage-6',
    heading: '阶段六：变现与持续输出（持续）',
    summary: '变现与持续输出 · 持续',
    goal: '把做出来的东西换成第一笔真实收入，并且把过程变成可以持续输出的内容。',
    blocks: [
      {
        heading: '学什么',
        bullets: [
          [text('三条最常见也最容易验证的路：内容变现（广告、联盟）、工具站变现（订阅、一次性付费）、服务接单（帮别人做站、做自动化）。')],
          [text('每一路要先算清楚的两件事：钱从哪里来、第一批用户从哪里来。')],
          [text('复盘怎么写：投入多少、收入多少、卡在哪、下一轮改什么。写复盘本身就是内容的素材。')],
        ],
      },
      {
        heading: '动手做什么',
        bullets: [
          [
            text('把'),
            link('/ai-money', 'AI 变现榜单'),
            text('里的案例，自己按「内容类 / 工具类 / 服务类」各挑一个，判断哪一个最接近你现在的能力和资源。'),
          ],
          [text('选一条路，给自己一个 30 天内可验收的目标，比如「上线一个能收款的小工具」或「投递 10 个接单需求」。')],
          [text('到第 30 天写一份公开复盘，就放在这个站上。')],
        ],
      },
    ],
    learned: '有第一笔真实收入，或者有一份能公开的真实复盘；并且知道下一轮该加什么、该砍什么。',
    stuck: [text('一直停留在「准备阶段」。变现这件事，第一次一定要小到一周能做完——小到你没有借口不做。')],
  },
];

export const roadmapFaqs: RoadmapFaq[] = [
  {
    question: '零基础能学吗？',
    answer:
      '能，但建议不要从阶段三开始。阶段一和阶段二加起来三到五周，练的是判断力：知道该用什么工具、知道 AI 在哪会出错。没有这个基础就直接让 AI 写代码，通常会做出一个自己看不懂、也改不动的页面。',
  },
  {
    question: '整个路线走完要多久？',
    answer:
      '按每天一小时算，阶段一到阶段四大约七到十一周，能做出第一个上线的东西。阶段五、六没有终点，取决于你想做到什么程度。',
  },
  {
    question: '先学工具还是先学写代码？',
    answer: '先学工具。工具会让你知道自己想做什么，然后再学写代码把想法做出来。反过来，从语法开始学，很容易学到一半就失去目标。',
  },
  {
    question: '不会英语能学吗？',
    answer:
      '可以开始，但英语会限制你后面的路。几乎所有工具的更新说明、官方文档、社区讨论都是英文。建议从阶段一开始，每天读一小段官方文档，用 AI 帮你翻译但要自己读原文对照——这是这条路上回报最高的一个习惯。',
  },
  {
    question: '每天只有一小时够不够？',
    answer: '够，前提是那一小时真的在动手。一小时里读十篇文章的收获，不如一件事往前推一步。路线图里的每一个阶段都是按「每天一小时」的节奏标的时间。',
  },
  {
    question: '要花钱吗？',
    answer:
      '阶段一到四可以接近于零成本开始：免费额度的模型、免费的部署平台、一个域名一年几十块。真正的花费出现在你开始跑长任务和做视频的阶段，那时候按需付费更划算，不用一上来就买年费套餐。',
  },
  {
    question: '学 AI 一定要会写代码吗？',
    answer:
      '阶段一和阶段二完全不用：用对话和现成工具就能做出东西。真正需要写代码是从阶段三开始，那时你要让页面的样子和逻辑完全按自己的想法来。好消息是顺序可以反过来：不用先花三个月学语法，而是每天从改真实代码开始，哪一行看不懂就让 AI 逐行解释。这个顺序比「先上完编程课再碰项目」有效得多，因为你每一步都在解决自己真的遇到的问题。',
  },
  {
    question: 'AI 学到什么程度可以接单？',
    answer:
      '不用等到「学完」。有一个能访问、能自己改的上线作品，就可以接最小的单。判断能不能开始看三条：别人给你一个需求，你能说出能不能做、大概要多久；能独立交付一个可交互的页面或一个能跑通的自动化流程；出问题知道从哪查起。现实中第一批单子多是做落地页、整理数据、搭简单的自动化流程，单价不高但反馈真实，比再多教程都值钱。',
  },
  {
    question: 'AI 绘画、AI 视频、AI 写代码，先学哪个？',
    answer:
      '看你要什么结果。想尽快看到成果、先练手，从 AI 绘画或视频开始，一周内就能拿出东西；想做能长期带来流量和收入的东西（工具站、落地页、小程序），从 AI 写代码开始，慢一些但积累性强。两者不冲突：路线图阶段一把三类都过一遍，阶段三再定深挖方向。',
  },
];

export const roadmapClosing: RoadmapInline[] = [
  text('这份路线图会随着站内内容更新。如果你已经走到某个阶段、卡在某一步，可以看'),
  link('/about', '关于这个站'),
  text('的联系方式告诉我，我会把对应阶段补细。'),
];

export function roadmapFaqSchema(faqs: readonly RoadmapFaq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function roadmapInlineText(nodes: readonly RoadmapInline[]) {
  return nodes.map((node) => node.text).join('');
}
