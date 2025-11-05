#!/usr/bin/env node

/**
 * 批量同步脚本
 * 自动批量同步所有启用的飞书文档
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });
const DocManager = require('./manage-docs');

class BatchSync {
  constructor() {
    this.docManager = new DocManager();
    this.appId = process.env.FEISHU_APP_ID;
    this.appSecret = process.env.FEISHU_APP_SECRET;
    this.postsDir = path.join(__dirname, '../src/data/posts');
    this.token = null;
    this.tokenExpiry = null;
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

        // 提取标题
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
          if (text.includes('@')) {
            markdown += text + ' ';
          } else if (text.includes('http')) {
            markdown += `[${text}](${text}) `;
          } else {
            markdown += text + '\n\n';
          }
        }
      }
    });

    return {
      content: markdown,
      metadata,
    };
  }

  generateFrontmatter(docData, doc, slug) {
    const { content, metadata } = docData;
    const title = doc.title || metadata.title || '未命名文档';
    const date = doc.lastSync ? new Date(doc.lastSync).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];

    return `---
title: '${title.replace(/'/g, "\\'")}'
date: '${date}'
summary: '${content.substring(0, 150).replace(/\n/g, ' ')}'
tags: ['飞书同步', '${doc.folder}', ...${JSON.stringify(doc.tags)}]
---

${content}
`;
  }

  async syncDoc(doc, force = false) {
    try {
      const docData = await this.getDocumentContent(doc.id);
      const frontmatter = this.generateFrontmatter(docData, doc, doc.slug);

      const postPath = path.join(this.postsDir, `${doc.slug}.md`);

      // 检查文件是否已存在
      if (fs.existsSync(postPath) && !force) {
        // 读取现有文件比较内容
        const existingContent = fs.readFileSync(postPath, 'utf8');
        if (existingContent.includes(frontmatter.substring(0, 50))) {
          console.log(`⏭️ ${doc.title}: 内容未变更，跳过`);
          return { status: 'skipped', doc };
        }
      }

      fs.writeFileSync(postPath, frontmatter, 'utf8');

      // 更新同步时间
      this.docManager.updateSyncTime(doc.id);

      console.log(`✅ ${doc.title}: 同步成功`);
      return { status: 'success', doc };
    } catch (error) {
      console.error(`❌ ${doc.title}: 同步失败 - ${error.message}`);
      return { status: 'failed', doc, error: error.message };
    }
  }

  async syncAll(options = {}) {
    const {
      force = false,
      folder = null,
      parallel = false,
      limit = null,
    } = options;

    // 获取要同步的文档
    let docs = this.docManager.listDocs({
      enabled: true,
      folder: folder,
    });

    // 应用限制
    if (limit) {
      docs = docs.slice(0, limit);
    }

    if (docs.length === 0) {
      console.log('📄 没有找到要同步的文档');
      return;
    }

    console.log(`\n🚀 开始批量同步 ${docs.length} 篇文档...`);
    console.log(`📁 ${folder ? `文件夹: ${folder}` : '所有文件夹'}`);
    console.log(`⚡ ${parallel ? '并行模式' : '串行模式'}`);
    console.log('');

    const startTime = Date.now();
    const results = {
      success: 0,
      skipped: 0,
      failed: 0,
    };

    if (parallel) {
      // 并行同步
      const promises = docs.map(doc => this.syncDoc(doc, force));
      const responses = await Promise.allSettled(promises);

      responses.forEach(response => {
        if (response.status === 'fulfilled') {
          const result = response.value;
          results[result.status]++;
        } else {
          results.failed++;
        }
      });
    } else {
      // 串行同步
      for (const doc of docs) {
        const result = await this.syncDoc(doc, force);
        results[result.status]++;

        // 添加延迟避免API限流
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);

    // 显示结果
    console.log('\n' + '='.repeat(80));
    console.log('📊 同步完成统计');
    console.log('='.repeat(80));
    console.log(`✅ 成功: ${results.success}`);
    console.log(`⏭️ 跳过: ${results.skipped}`);
    console.log(`❌ 失败: ${results.failed}`);
    console.log(`📝 总计: ${docs.length}`);
    console.log(`⏱️ 耗时: ${duration}秒`);
    console.log('='.repeat(80));

    if (results.success > 0) {
      console.log('\n💡 提示: 运行 "npm run build" 重新生成静态页面');
    }

    // 导出环境变量
    this.docManager.exportEnv();

    return results;
  }

  /**
   * 自动发现新文档
   */
  async discoverNewDocs(folderId) {
    console.log('🔍 正在扫描文件夹中的新文档...');
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
      const newDocIds = items
        .filter(item => item.type === 'doc')
        .map(item => item.token)
        .filter(id => !this.docManager.config.docs.find(doc => doc.id === id));

      if (newDocIds.length > 0) {
        console.log(`\n🆕 发现 ${newDocIds.length} 篇新文档:`);
        newDocIds.forEach((id, index) => {
          console.log(`   ${index + 1}. ${id.substring(0, 16)}...`);
        });

        // 询问是否添加
        const readline = require('readline');
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
        });

        const answer = await new Promise(resolve => {
          rl.question('\n是否添加这些文档? (y/N): ', resolve);
        });

        rl.close();

        if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
          newDocIds.forEach((docId, index) => {
            this.docManager.addDoc(docId, `新文档 ${index + 1}`, ['飞书同步'], 'auto-discovered');
          });
          console.log('\n✅ 已添加所有新文档');
        } else {
          console.log('已取消');
        }
      } else {
        console.log('✅ 没有发现新文档');
      }

      return newDocIds;
    } catch (error) {
      console.error('❌ 扫描失败:', error.response?.data || error.message);
      return [];
    }
  }
}

/**
 * 主函数
 */
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  const sync = new BatchSync();

  switch (command) {
    case 'all':
      // 同步所有文档
      await sync.syncAll({
        force: args.includes('--force'),
        folder: args.find(arg => arg.startsWith('--folder='))?.split('=')[1],
        parallel: args.includes('--parallel'),
        limit: parseInt(args.find(arg => arg.startsWith('--limit='))?.split('=')[1] || '0'),
      });
      break;

    case 'discover':
      // 自动发现新文档
      const folderId = process.env.FEISHU_FOLDER_ID;
      if (!folderId) {
        console.log('❌ 请先在 .env.local 中设置 FEISHU_FOLDER_ID');
        process.exit(1);
      }
      await sync.discoverNewDocs(folderId);
      break;

    case 'force':
      // 强制同步所有文档
      await sync.syncAll({ force: true, parallel: args.includes('--parallel') });
      break;

    case 'help':
    default:
      console.log(`
🚀 批量同步工具

用法:
  node batch-sync.js all [--folder=name] [--parallel] [--limit=5]    同步所有文档
  node batch-sync.js discover                                         自动发现新文档
  node batch-sync.js force [--parallel]                              强制同步所有文档
  node batch-sync.js help                                            显示帮助

示例:
  # 同步所有启用的文档
  node batch-sync.js all

  # 同步指定文件夹
  node batch-sync.js all --folder=AI

  # 并行同步 (更快但可能触发API限流)
  node batch-sync.js all --parallel

  # 限制同步数量
  node batch-sync.js all --limit=5

  # 强制同步 (跳过变更检查)
  node batch-sync.js force

  # 自动发现新文档
  node batch-sync.js discover
      `);
  }
}

// 运行主函数
if (require.main === module) {
  main().catch(error => {
    console.error('\n💥 同步失败:', error.message);
    process.exit(1);
  });
}

module.exports = BatchSync;
