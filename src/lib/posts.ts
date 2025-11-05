'use server';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import toc from 'remark-toc';
import { rehype } from 'rehype';
import rehypeSlug from 'rehype-slug';
import rehypePrism from 'rehype-prism-plus';
import { PostMeta, PostSummary, PostError } from '@/types';

const postsDirectory = path.join(process.cwd(), 'src/data/posts');

// 获取所有文章的 slug（文件名）
export async function getPostSlugs() {
  return fs.readdirSync(postsDirectory).filter((file) => file.endsWith('.md'));
}

// 根据 slug 获取文章数据
export async function getPostBySlug(slug: string) {
  console.log(`[调试 getPostBySlug] 接收到的 slug: "${slug}"`); // 日志 1
  const realSlug = slug.replace(/\\.md$/, '');
  // 注意：从 generateStaticParams 传入的 slug 应该已经不包含 .md
  console.log(`[调试 getPostBySlug] 处理后的 realSlug: "${realSlug}"`); // 日志 2
  
  // 确保 postsDirectory 的路径是正确的
  console.log(`[调试 getPostBySlug] postsDirectory 路径: "${postsDirectory}"`); // 日志 2.1

  const fullPath = path.join(postsDirectory, `${realSlug}.md`);
  console.log(`[调试 getPostBySlug] 尝试读取文件路径: "${fullPath}"`); // 日志 3

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    console.log(`[调试 getPostBySlug] 成功读取文件: "${fullPath}"`); // 日志 4

    const { data, content } = matter(fileContents);
    console.log(`[调试 getPostBySlug] 成功解析 Frontmatter: "${fullPath}"`); // 日志 5
    
    const processedContentRemark = await remark()
      .use(html)
      .use(toc, { heading: '目录', maxDepth: 2 })
      .process(content);
      
    const finalContent = await rehype()
      .use(rehypeSlug)
      .use(rehypePrism, { showLineNumbers: true })
      .process(processedContentRemark.toString());

    console.log(`[调试 getPostBySlug] 成功处理内容: "${fullPath}"`); // 日志 6
    return {
      slug: realSlug,
      meta: data as PostMeta,
      content: finalContent.toString(),
    };
  } catch (error) {
    console.error(`[调试 getPostBySlug] 处理 slug "${slug}" 时出错:`, error instanceof Error ? error.message : 'Unknown error'); // 日志 7
    console.error(`[调试 getPostBySlug] 完整错误对象:`, error); // 日志 7.1

    // 转换为PostError并重新抛出
    const postError = new PostError(
      `Failed to process post ${slug}: ${error instanceof Error ? error.message : 'Unknown error'}`,
      error instanceof Error && 'code' in error && (error as any).code === 'ENOENT' ? 'not_found' : 'processing_error',
      {
        slug,
        originalError: error instanceof Error ? error : undefined,
      }
    );

    throw postError;
  }
}

// 提取文章摘要，如果不存在则从内容中提取
function extractExcerpt(content: string, maxLength: number = 150): string {
  // Remove markdown headings, links, images, etc.
  const plainText = content
    .replace(/#+\s+(.*)/g, '$1') // Remove headings
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links but keep text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '') // Remove images
    .replace(/(\*\*|__)(.*?)\1/g, '$2') // Remove bold
    .replace(/(\*|_)(.*?)\1/g, '$2') // Remove italic
    .replace(/`([^`]+)`/g, '$1') // Remove inline code
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim();

  // Truncate and add ellipsis if needed
  if (plainText.length <= maxLength) {
    return plainText;
  }
  
  // Try to truncate at a sentence or word boundary
  const truncated = plainText.substring(0, maxLength);
  const lastPeriod = truncated.lastIndexOf('。');
  const lastSpace = truncated.lastIndexOf(' ');
  
  // Prefer sentence boundary, then word boundary
  const breakPoint = lastPeriod > maxLength * 0.7 ? lastPeriod : 
                    lastSpace > maxLength * 0.7 ? lastSpace : 
                    maxLength;
  
  return plainText.substring(0, breakPoint) + '...';
}

// 获取所有文章的简略信息
export async function getAllPosts(): Promise<PostSummary[]> { // 明确返回类型
  const slugs = await getPostSlugs();
  const posts = slugs.map((slug) => {
    const fullPath = path.join(postsDirectory, slug);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const postMeta = data as PostMeta; // 将 data 断言为 PostMeta
    
    // 如果没有摘要，从内容生成
    if (!postMeta.excerpt && !postMeta.summary) {
      postMeta.excerpt = extractExcerpt(content);
    } else if (postMeta.summary && !postMeta.excerpt) {
      // 兼容使用 summary 字段的情况
      postMeta.excerpt = postMeta.summary;
    }
    
    return {
      slug: slug.replace(/\.md$/, ''),
      meta: postMeta, // 使用类型断言后的 postMeta
    };
  });

  // 按发布日期倒序排列
  return posts.sort((a, b) => (new Date(a.meta.date) > new Date(b.meta.date) ? -1 : 1));
} 