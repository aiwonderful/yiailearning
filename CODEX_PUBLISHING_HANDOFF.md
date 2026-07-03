# Codex 网站内容发布交接文档

这份文档给后续接手 `aiwonderful/yiailearning` 网站内容发布的人使用。目标是：用户在 Codex 中完成一篇文章后，接手者可以快速把文章同步到网站，并完成构建、提交、推送。

## 1. 基本信息

- GitHub 仓库：`https://github.com/aiwonderful/yiailearning`
- 本地正式仓库路径：`/Users/yestar/Downloads/yiailearning-repo`
- 默认分支：`master`
- 技术栈：Next.js 14 + Markdown 文章文件
- 文章目录：`src/data/posts`
- 搜索索引：`public/search/search-data.json`
- 发布脚本：`scripts/publish-post.js`
- 发布说明：`CODEX_PUBLISHING.md`

当前机器上的 GitHub 登录账号是 `yestar2023-alt`。该账号需要拥有 `aiwonderful/yiailearning` 仓库的 Write 权限，才能推送内容。

## 2. 日常发文流程

用户通常会说：

```text
把这篇文章同步到网站并发布
```

接手者应按下面流程处理。

### 第一步：进入正式仓库

```bash
cd /Users/yestar/Downloads/yiailearning-repo
git status --short --branch
```

如果不是干净状态，先确认这些改动是不是用户或上一位接手者留下的，不要随意还原。

### 第二步：更新远端代码

```bash
git pull --ff-only origin master
```

如果 pull 失败，先解决分支或权限问题，不要强制覆盖。

### 第三步：准备文章草稿

可以把文章保存为一个临时 Markdown 文件，例如：

```text
/private/tmp/new-post.md
```

推荐草稿格式：

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

如果用户没有提供 frontmatter，接手者需要帮用户补齐标题、摘要和标签。

### 第四步：生成网站文章

直接发布：

```bash
npm run publish:post -- --file /private/tmp/new-post.md --publish
```

带标题和标签覆盖：

```bash
npm run publish:post -- --file /private/tmp/new-post.md --title "文章标题" --tags "AI工具,效率" --publish
```

生成草稿，不公开展示：

```bash
npm run publish:post -- --file /private/tmp/new-post.md
```

如果同 slug 文章已经存在，需要确认是更新旧文还是避免覆盖。确认后才使用：

```bash
npm run publish:post -- --file /private/tmp/new-post.md --force --publish
```

### 第五步：构建检查

```bash
npm run build
```

构建会先更新搜索索引，再执行 Next.js 构建。构建通过后，通常会看到静态页面生成结果。

已知可接受警告：

- Sentry / OpenTelemetry 的 dynamic require warning
- Browserslist 或 baseline-browser-mapping 数据过期提醒

这些警告目前不阻塞发布。

### 第六步：检查变更

```bash
git status --short
git diff --stat
```

一次正常文章发布通常会包含：

- `src/data/posts/<slug>.md`
- `public/search/search-data.json`

如果只修改了文章，不应该包含无关依赖、配置或构建产物。

### 第七步：提交并推送

```bash
git add src/data/posts public/search/search-data.json
git commit -m "Publish <文章标题>"
git push origin master
```

如果网站接入了 Vercel 或其他 GitHub 自动部署，推送后会自动上线。

## 3. 权限和账号

如果推送时报错：

```text
Permission to aiwonderful/yiailearning.git denied
```

说明当前 GitHub 登录账号没有仓库写权限。需要仓库管理员在 GitHub 页面添加权限：

1. 打开 `https://github.com/aiwonderful/yiailearning`
2. 进入 `Settings`
3. 打开 `Collaborators & teams`
4. 点击 `Add people`
5. 添加 `yestar2023-alt`
6. 权限选择 `Write`
7. 接受邀请后重新推送

检查当前 GitHub CLI 登录状态：

```bash
gh auth status
```

## 4. 常见问题

### 文章没有出现在网站列表

检查文章 frontmatter：

```yaml
draft: true
published: false
```

如果是草稿，网站不会公开展示。发布文章应使用：

```yaml
published: true
```

并且不要保留 `draft: true`。

### 搜索结果没有更新

重新执行：

```bash
npm run build
```

确认 `public/search/search-data.json` 有变化，并随文章一起提交。

### slug 不理想

发布时指定 slug：

```bash
npm run publish:post -- --file /private/tmp/new-post.md --slug my-custom-slug --publish
```

### 本地依赖缺失

如果提示找不到依赖，执行：

```bash
npm install
```

不要随意执行 `npm audit fix --force`，因为它可能引入大范围依赖升级。

### 当前目录不对

正式仓库路径是：

```text
/Users/yestar/Downloads/yiailearning-repo
```

不要在 `/Users/yestar/Downloads/yiailearning-master` 下载包目录里做正式发布。

## 5. 接手原则

- 发布前先看 `git status`。
- 不要还原自己没有确认来源的改动。
- 文章发布只改文章文件和搜索索引。
- 每次推送前必须跑 `npm run build`。
- 推送失败先查权限，不要强推。
- 用户只需要提供文章内容、标题、标签和是否发布；技术细节由接手者处理。
