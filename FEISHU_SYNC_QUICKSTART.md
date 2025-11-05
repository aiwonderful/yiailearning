# ⚡ 飞书同步快速上手

## 🎯 30秒快速配置（推荐方案）

### 第1步：复制环境变量模板
```bash
cp .env.feishu.example .env.local
```

### 第2步：编辑配置文件
打开 `.env.local`，填入你的信息：

```env
FEISHU_APP_ID=cli_你的应用ID
FEISHU_APP_SECRET=你的应用密钥
FEISHU_FOLDER_ID=fl文件夹ID  # 可选，建议设置
```

### 第3步：添加文档（如果不用文件夹）
```bash
npm run docs:add doccn文档ID "我的文章标题" 标签1 标签2
```

### 第4步：执行同步
```bash
# 方式1：自动发现新文档
npm run sync:discover

# 方式2：直接同步所有
npm run sync:all

# 方式3：并行同步（更快）
npm run sync:all --parallel
```

### 第5步：构建网站
```bash
npm run build
```

**完成！** 🎉

---

## 📝 详细步骤演示

### 场景：我有3篇飞书文档要同步

#### 方案A：使用文件夹（推荐）

**1. 获取文件夹ID**
```
打开飞书文件夹，复制URL中的ID：
https://你的公司.feishu.cn/drive/folder/flabc123def456

文件夹ID: flabc123def456
```

**2. 配置环境变量**
```bash
echo "FEISHU_APP_ID=cli_xxxxx" > .env.local
echo "FEISHU_APP_SECRET=xxxxx" >> .env.local
echo "FEISHU_FOLDER_ID=flabc123def456" >> .env.local
```

**3. 自动发现并同步**
```bash
# 第一次使用：自动发现新文档
$ npm run sync:discover

🔍 正在扫描文件夹中的新文档...
📁 文件夹中找到 3 个文档

🆕 发现 3 篇新文档:
   1. doccnAbCdEfGhIj...
   2. doccnXyZaBcDeFg...
   3. doccnMnOpQrStUv...

是否添加这些文档? (y/N): y

✅ 已添加所有新文档

# 执行同步
$ npm run sync:all --parallel

🚀 开始批量同步 3 篇文档...
✅ 文章1: 同步成功
✅ 文章2: 同步成功
✅ 文章3: 同步成功

📊 同步完成统计
✅ 成功: 3
⏭️ 跳过: 0
❌ 失败: 0
```

**4. 查看结果**
```bash
$ npm run docs:list

📚 文档列表 (3篇)
================================================================================
✅ 我的AI学习笔记
   ID: doccnAbCdEfGhIjKlMnOp
   文件: wo-de-ai-xue-xi-bi-ji.md
   标签: AI, 学习
   上次同步: 2024-11-03 14:30:00
--------------------------------------------------------------------------------
```

#### 方案B：手动管理

**1. 逐个添加文档**
```bash
$ npm run docs:add doccnAbCdEfGhIj "我的AI学习笔记" AI 学习
✅ 已添加文档: 我的AI学习笔记
   ID: doccnAbCdEfGhIj
   标签: AI, 学习

$ npm run docs:add doccnXyZaBcDeFg "Python入门教程" Python 编程
✅ 已添加文档: Python入门教程
   ID: doccnXyZaBcDeFg
   标签: Python, 编程

$ npm run docs:add doccnMnOpQrStUv "React开发指南" React 前端
✅ 已添加文档: React开发指南
   ID: doccnMnOpQrStUv
   标签: React, 前端
```

**2. 查看文档列表**
```bash
$ npm run docs:list

📚 文档列表 (3篇)
================================================================================
✅ 我的AI学习笔记
   ID: doccnAbCdEfGhIjKlMnOp
   文件: wo-de-ai-xue-xi-bi-ji.md
   标签: AI, 学习
--------------------------------------------------------------------------------
✅ Python入门教程
   ID: doccnXyZaBcDeFg
   文件: python-ru-men-jiao-cheng.md
   标签: Python, 编程
--------------------------------------------------------------------------------
✅ React开发指南
   ID: doccnMnOpQrStUv
   文件: react-kai-fa-zhi-nan.md
   标签: React, 前端
--------------------------------------------------------------------------------

总计: 3 篇文档 (启用: 3)
```

**3. 批量同步**
```bash
$ npm run sync:all --parallel

🚀 开始批量同步 3 篇文档...
📁 所有文件夹
⚡ 并行模式

✅ 我的AI学习笔记: 同步成功
⏭️ Python入门教程: 内容未变更，跳过
✅ React开发指南: 同步成功

========================================
📊 同步完成统计
========================================
✅ 成功: 2
⏭️ 跳过: 1
❌ 失败: 0
📝 总计: 3
⏱️ 耗时: 2.45秒
========================================
```

---

## 🔧 日常操作命令

### 查看所有文档
```bash
npm run docs:list
```

### 搜索特定文档
```bash
npm run docs:list --search=AI
```

### 只查看启用的文档
```bash
npm run docs:list --enabled
```

### 禁用一篇文档（暂停同步）
```bash
npm run docs:disable doccnAbCdEfGhIj
```

### 重新启用文档
```bash
npm run docs:enable doccnAbCdEfGhIj
```

### 删除文档
```bash
npm run docs:remove doccnAbCdEfGhIj
```

### 强制重新同步（跳过变更检查）
```bash
npm run sync:force
```

### 只同步5篇文档
```bash
npm run sync:all --limit=5
```

### 同步特定文件夹
```bash
npm run sync:all --folder=AI
```

---

## 📂 多文档管理场景

### 场景1：按分类管理
```bash
# AI相关文档
npm run docs:add docid1 "深度学习基础" AI 深度学习
npm run docs:add docid2 "机器学习实战" AI 机器学习

# Python相关文档
npm run docs:add docid3 "Python爬虫" Python 爬虫
npm run docs:add docid4 "Python数据分析" Python 数据

# 前端相关文档
npm run docs:add docid5 "React进阶" React 前端
npm run docs:add docid6 "Vue3指南" Vue 前端
```

### 场景2：筛选查看
```bash
# 只看AI分类
npm run docs:list --folder=AI

# 搜索Python
npm run docs:list --search=Python

# 查看所有启用的
npm run docs:list --enabled
```

### 场景3：批量操作
```bash
# 同步AI分类
npm run sync:all --folder=AI

# 禁用Python分类（暂停同步）
npm run docs:disable docid3
npm run docs:disable docid4

# 同步前端分类
npm run sync:all --folder=前端
```

---

## 🔄 自动化同步

### GitHub Actions（推荐）

创建 `.github/workflows/feishu-sync.yml`：

```yaml
name: 飞书同步

on:
  schedule:
    - cron: '0 2 * * *'  # 每天凌晨2点
  workflow_dispatch:

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run sync:discover
        env:
          FEISHU_APP_ID: ${{ secrets.FEISHU_APP_ID }}
          FEISHU_APP_SECRET: ${{ secrets.FEISHU_APP_SECRET }}
          FEISHU_FOLDER_ID: ${{ secrets.FEISHU_FOLDER_ID }}
      - run: npm run sync:all --parallel
        env:
          FEISHU_APP_ID: ${{ secrets.FEISHU_APP_ID }}
          FEISHU_APP_SECRET: ${{ secrets.FEISHU_APP_SECRET }}
          FEISHU_DOC_IDS: ${{ secrets.FEISHU_DOC_IDS }}
          FEISHU_FOLDER_ID: ${{ secrets.FEISHU_FOLDER_ID }}
      - run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add -A
          git commit -m "📝 自动同步飞书文档 $(date)" || exit 0
      - uses: ad-m/github-push-action@master
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
```

配置GitHub Secrets：
```
FEISHU_APP_ID=cli_xxx
FEISHU_APP_SECRET=xxx
FEISHU_FOLDER_ID=flxxx
```

### 本地定时同步

```bash
# 每6小时同步一次
npx cron "0 */6 * * *" "npm run sync:all"
```

---

## 🎯 快速问答

**Q: 我有20篇文章，都在一个文件夹里，怎么同步？**
```bash
A: 最简单的方式：
1. 设置 FEISHU_FOLDER_ID=你的文件夹ID
2. 运行 npm run sync:discover
3. 运行 npm run sync:all --parallel
完成！ ✅
```

**Q: 我想暂停其中一篇文章的同步？**
```bash
A: 禁用它：
npm run docs:disable <文档ID>
以后就不会自动同步了
```

**Q: 怎么批量禁用所有文档？**
```bash
A: 手动禁用每一篇：
npm run docs:disable <文档1ID>
npm run docs:disable <文档2ID>
...
```

**Q: 同步很慢怎么办？**
```bash
A: 使用并行同步：
npm run sync:all --parallel
或限制数量：
npm run sync:all --limit=5
```

**Q: 如何只同步最新的5篇？**
```bash
A: 使用限制：
npm run sync:all --limit=5
```

**Q: 如何查看同步历史？**
```bash
A: 查看文档列表，会显示"上次同步"时间：
npm run docs:list
```

---

## 🎉 总结

**最推荐的工作流**：
1. ✅ 配置文件夹ID：`FEISHU_FOLDER_ID`
2. ✅ 自动发现：`npm run sync:discover`
3. ✅ 批量同步：`npm run sync:all --parallel`
4. ✅ 自动化：配置GitHub Actions定时同步

**一句话命令**：
```bash
# 30秒完成初始设置
cp .env.feishu.example .env.local && npm run sync:discover && npm run sync:all --parallel
```

**有任何问题**：
- 查看详细文档：`cat FEISHU_SYNC_COMPLETE_GUIDE.md`
- 查看帮助：`npm run docs:help`
- 查看文档列表：`npm run docs:list`

祝你使用愉快！ 🚀
