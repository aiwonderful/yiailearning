#!/usr/bin/env node

/**
 * 飞书文档同步脚本
 * 功能：自动将飞书文档同步到博客文章
 *
 * 使用方法：
 * 1. 配置环境变量 (复制 .env.feishu.example 到 .env.local)
 * 2. 运行脚本: npm run sync:feishu
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

class FeishuSync {
  constructor() {
    this.appId = process.env.FEISHU_APP_ID;
    this.appSecret = process.env.FEISHU_APP_SECRET;
    this.docIds = (process.env.FEISHU_DOC_IDS || '').split(',').map(id => id.trim()).filter(Boolean);
    this.token = null;
    this.tokenExpiry = null;
    this.postsDir = path.join(__dirname, '../src/data/posts');
  }

  async getAccessToken() {
    if (this.token && Date.now() < this.tokenExpiry) {
      return this.token;
    }

    try {
      const response = await axios.post('https://open.feishu.cn/open-apis/auth/v3/app_access_token/internal', {
        app_id: this.appId,
        app_secret: this.appSecret,
      });

      this.token = response.data.app_access_token;
      this.tokenExpiry = Date.now() + (response.data.expire - 300) * 1000;
      console.log('✅ 获取飞书访问令牌成功');
      return this.token;
    } catch (error) {
      console.error('❌ 获取访问令牌失败:', error.response?.data || error.message);
      throw error;
    }
  }

  async getDocumentContent(docId) {
    const token = await this.getAccessToken();
    try {
      const response = await axios.get(
        `https://open.feishu.cn/open-apis/doc/v2/doc/content?doc_id=${docId}&lang=zh-CN`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return this.parseDocument(response.data.content);
    } catch (error) {
      console.error(`❌ 获取文档 ${docId} 失败:`, error.response?.data || error.message);
      throw error;
    }
  }

  parseDocument(content) {
    const elements = content.elements || [];
    let markdown = '';
    let metadata = {
      title: '',
      date: new Date(),
      tags: [],
    };

    elements.forEach((element, index) => {
      if (element.text_run) {
        const text = element.text_run.text || '';

        // 提取标题（通常是第一个heading）
        if (!metadata.title && index < 5 && text.length > 0 && text.length < 100) {
          metadata.title = text;
          markdown += `# ${text}\n\n`;
        } else if (element.type === 'heading1') {
          markdown += `# ${text}\n\n`;
        } else if (element.type === 'heading2') {
          markdown += `## ${text}\n\n`;
        } else if (element.type === 'heading3') {
          markdown += `### ${text}\n\n`;
        } else if (element.type === 'code') {
          const language = element.code?.language || '';
          markdown += `\`\`\`${language}\n${text}\n\`\`\`\n\n`;
        } else if (element.type === 'quote') {
          markdown += `> ${text}\n\n`;
        } else if (element.type === 'bullet' || element.type === 'number') {
          const mark = element.type === 'bullet' ? '-' : '1.';
          markdown += `${mark} ${text}\n`;
        } else {
          // 处理@提及和链接
          if (text.includes('@')) {
            markdown += text + ' ';
          } else if (text.includes('http')) {
            markdown += `[${text}](${text}) `;
          } else {
            markdown += text + '\n\n';
          }
        }
      } else if (element.image) {
        // 保留图片引用
        markdown += `![图片](${element.image?.image_key})\n\n`;
      }
    });

    return {
      content: markdown,
      metadata,
    };
  }

  generateFrontmatter(docData, slug) {
    const { content, metadata } = docData;
    const title = metadata.title || '未命名文档';
    const date = metadata.date.toISOString().split('T')[0];

    return `---
title: '${title.replace(/'/g, "\\'")}'
date: '${date}'
summary: '${content.substring(0, 150).replace(/\n/g, ' ')}'
tags: ['飞书同步', ...${JSON.stringify(metadata.tags)}]
---

${content}
`;
  }

  async syncToPosts(docId, slug, title) {
    try {
      const docData = await this.getDocumentContent(docId);
      const frontmatter = this.generateFrontmatter(docData, slug);

      const postPath = path.join(this.postsDir, `${slug}.md`);

      // 检查文件是否已存在
      if (fs.existsSync(postPath)) {
        // 读取现有文件比较内容
        const existingContent = fs.readFileSync(postPath, 'utf8');
        if (existingContent.includes(frontmatter.substring(0, 50))) {
          console.log(`⏭️ 跳过未变更的文档: ${title}`);
          return false;
        }
      }

      fs.writeFileSync(postPath, frontmatter, 'utf8');
      console.log(`✅ 已同步文档: ${title} → ${slug}.md`);
      return true;
    } catch (error) {
      console.error(`❌ 同步文档失败: ${title}`, error.message);
      return false;
    }
  }

  async getFolderDocuments(folderId) {
    const token = await this.getAccessToken();
    try {
      const response = await axios.get(
        `https://open.feishu.cn/open-apis/drive/v1/folders/${folderId}/children`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const items = response.data.items || [];
      // 只获取文档类型
      const docIds = items
        .filter(item => item.type === 'doc')
        .map(item => item.token);

      console.log(`📁 文件夹中找到 ${docIds.length} 个文档`);
      return docIds;
    } catch (error) {
      console.error('❌ 获取文件夹内容失败:', error.response?.data || error.message);
      return [];
    }
  }

  async syncAll() {
    // 如果配置了文件夹ID，批量获取文档
    let docIds = [...this.docIds];
    const folderId = process.env.FEISHU_FOLDER_ID;

    if (folderId) {
      console.log(`📁 从文件夹获取文档列表: ${folderId}`);
      const folderDocs = await this.getFolderDocuments(folderId);
      docIds = [...docIds, ...folderDocs];
      docIds = [...new Set(docIds)]; // 去重
    }

    if (docIds.length === 0) {
      console.log('⚠️ 未配置 FEISHU_DOC_IDS，跳过同步');
      return;
    }

    console.log(`🚀 开始同步 ${docIds.length} 个飞书文档...\n`);

    let successCount = 0;
    let skipCount = 0;
    let failCount = 0;

    // 文档映射表
    const docMap = docIds.map(id => {
      const slug = id.toLowerCase().replace(/[^a-z0-9]/g, '-');
      return {
        id,
        slug,
        title: `飞书文档 ${id.substring(0, 8)}`,
      };
    });

    for (const doc of docMap) {
      try {
        const result = await this.syncToPosts(doc.id, doc.slug, doc.title);
        if (result === true) {
          successCount++;
        } else if (result === false) {
          skipCount++;
        }
      } catch (error) {
        failCount++;
      }
    }

    console.log(`\n📊 同步完成:`);
    console.log(`  ✅ 成功: ${successCount}`);
    console.log(`  ⏭️ 跳过: ${skipCount}`);
    console.log(`  ❌ 失败: ${failCount}`);

    if (successCount > 0) {
      console.log(`\n💡 提示: 运行 'npm run build' 重新生成静态页面`);
    }
  }
}

// 主函数
async function main() {
  console.log('='.repeat(50));
  console.log('📝 飞书文档同步工具');
  console.log('='.repeat(50));
  console.log('');

  const sync = new FeishuSync();

  try {
    await sync.syncAll();
    console.log('\n🎉 同步任务完成！');
    process.exit(0);
  } catch (error) {
    console.error('\n💥 同步失败:', error.message);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main();
}

module.exports = FeishuSync;
