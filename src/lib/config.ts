// Site configuration
export const siteConfig = {
  // Basic site info
  title: 'AI学习之路',
  description: '一个探索人工智能学习路径、工具和资源的博客',
  language: 'zh',
  url: 'https://yourdomain.com', // 替换为你的域名
  
  // Social media links
  social: {
    github: 'https://github.com/yourusername',
    twitter: 'https://twitter.com/yourusername',
    youtube: 'https://youtube.com/@yourchannel',
    // Add more social links as needed
  },

  // Navigation links
  navigation: [
    { name: '首页', href: '/' },
    { name: '学习路线', href: '/roadmap' },
    { name: '资源', href: '/resources' },
    { name: '博客', href: '/posts' },
  ],

  // Logo configuration
  logo: {
    type: 'image' as 'text' | 'image', // Can be 'text' or 'image'
    text: 'AI学习', // Used if type is 'text'
    url: '/logo.png', // Used if type is 'image', path relative to /public
    alt: 'AI学习之路 Logo', // Alt text for image logo
  },

  // Copyright text
  copyright: `© ${new Date().getFullYear()} Yi Learning Blog. All rights reserved.`,
}; 