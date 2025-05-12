declare module 'rehype-prism-plus' {
  import { Plugin } from 'unified';
  interface Options {
    showLineNumbers?: boolean;
    ignoreMissing?: boolean; // 常用选项，忽略找不到的语言
    // 在这里添加 rehype-prism-plus 支持的其他选项
  }
  const rehypePrismPlus: Plugin<[Options?], any, any>;
  export default rehypePrismPlus;
} 