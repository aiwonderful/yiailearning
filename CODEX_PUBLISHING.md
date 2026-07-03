# Codex 文章发布流程

这个流程用于把 Codex 里完成的文章快速同步到网站。

## 日常用法

把文章保存成一个 Markdown 草稿文件后执行：

```bash
npm run publish:post -- --file drafts/my-post.md --title "文章标题" --tags "AI工具,效率" --publish
```

脚本会生成网站文章文件：

```text
src/data/posts/<slug>.md
```

然后执行构建检查：

```bash
npm run build
```

确认通过后提交并推送：

```bash
git add src/data/posts public/search/search-data.json package.json scripts/publish-post.js CODEX_PUBLISHING.md
git commit -m "Publish new post"
git push origin master
```

如果网站已接入 Vercel 或其他 GitHub 自动部署，推送后会自动上线。

## 草稿和发布

默认会生成草稿：

```bash
npm run publish:post -- --file drafts/my-post.md
```

直接发布：

```bash
npm run publish:post -- --file drafts/my-post.md --publish
```

覆盖同 slug 文章：

```bash
npm run publish:post -- --file drafts/my-post.md --force --publish
```

## 文章格式

草稿可以直接写正文，也可以带 frontmatter：

```markdown
---
title: 文章标题
summary: 一句话摘要
tags:
  - AI工具
  - 效率
---

# 文章标题

正文内容。
```

发布脚本会自动补齐 `date`、`summary`、`excerpt`、`tags`、`draft` / `published` 等网站需要的字段。
