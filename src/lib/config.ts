const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');
const socialLinks = {
  github: 'https://github.com/yestar2023-alt',
  twitter: 'https://x.com/Yestar2023Liu',
  youtube: 'https://www.youtube.com/@AI-Innovate-Hub',
};

const wechatAccount = process.env.NEXT_PUBLIC_WECHAT_OFFICIAL_ACCOUNT || 'AI学习之路';
const wechatQrImage = process.env.NEXT_PUBLIC_WECHAT_QR_IMAGE || '';
const wechatDescription =
  process.env.NEXT_PUBLIC_WECHAT_DESCRIPTION ||
  '分享 AI 工具实践、学习心得与开发经验，与你一起探索 AI 学习之路。';

// Site configuration
export const siteConfig = {
  // Basic site info
  title: '小亦的 AI 学习实验室',
  description: '记录 AI 工具、Vibe Coding、Loop Engineering 学习和个人知识库搭建实践。',
  language: 'zh-CN',
  url: siteUrl,

  author: {
    name: '小亦',
    title: 'AI 学习者 / Loop Engineering 实践者',
    description: '把感兴趣的课题整理成资料、项目和个人心得，用 AI 帮自己持续学习、持续发布。',
    image: '/logo.png',
    sameAs: [socialLinks.github, socialLinks.twitter, socialLinks.youtube],
  },

  // Social media links
  social: {
    ...socialLinks,
    twitterHandle: '@Yestar2023Liu',
    wechat: wechatAccount,
  },

  wechat: {
    enabled: true,
    title: '微信公众号',
    accountName: wechatAccount,
    description: wechatDescription,
    qrImage: wechatQrImage || undefined,
  },

  // Navigation links
  navigation: [
    { name: '首页', href: '/' },
    { name: 'Loop Engineering', href: '/loop-engineer' },
    { name: 'Vibe Coding', href: '/vibe-coding' },
    { name: '资料库', href: '/resources' },
    { name: '关于', href: '/about' },
    // { name: '学习路线', href: '/roadmap' }, // 暂时隐藏，待完善后恢复
    { name: '博客', href: '/posts' },
  ],

  // Logo configuration
  logo: {
    type: 'image' as 'text' | 'image', // Can be 'text' or 'image'
    text: 'AI学习', // Used if type is 'text'
    url: '/logo.png', // Used if type is 'image', path relative to /public
    alt: 'AI学习之路 Logo', // Alt text for image logo
  },

  seo: {
    googleVerification: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || undefined,
  },

  features: {
    debugPanels: process.env.NEXT_PUBLIC_ENABLE_DEBUG_UI === 'true',
  },

  // Copyright text
  copyright: `© ${new Date().getFullYear()} Yi Learning Blog. All rights reserved.`,
};
