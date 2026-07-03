#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { buildSlug, extractSummary } = require('./feishu-sync-utils');

const postsDir = path.join(process.cwd(), 'src/data/posts');

function parseArgs(argv) {
  const args = {
    tags: [],
    publish: false,
    draft: false,
    force: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];

    if (arg === '--file' || arg === '-f') {
      args.file = next;
      index += 1;
    } else if (arg === '--title' || arg === '-t') {
      args.title = next;
      index += 1;
    } else if (arg === '--slug') {
      args.slug = next;
      index += 1;
    } else if (arg === '--summary') {
      args.summary = next;
      index += 1;
    } else if (arg === '--excerpt') {
      args.excerpt = next;
      index += 1;
    } else if (arg === '--tags') {
      args.tags = splitTags(next);
      index += 1;
    } else if (arg === '--category') {
      args.category = next;
      index += 1;
    } else if (arg === '--date') {
      args.date = next;
      index += 1;
    } else if (arg === '--publish') {
      args.publish = true;
    } else if (arg === '--draft') {
      args.draft = true;
    } else if (arg === '--force') {
      args.force = true;
    } else if (arg === '--help' || arg === '-h') {
      args.help = true;
    }
  }

  return args;
}

function splitTags(value) {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  return String(value)
    .split(/[,，、|]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function printHelp() {
  console.log(`
Usage:
  npm run publish:post -- --file drafts/my-post.md --publish
  npm run publish:post -- --file drafts/my-post.md --title "文章标题" --tags "AI工具,效率" --publish

Options:
  --file, -f      Source markdown file. Required.
  --title, -t     Override title.
  --slug          Override output slug.
  --summary       Override summary.
  --excerpt       Override list excerpt.
  --tags          Comma-separated tags.
  --category      Post category.
  --date          Date in YYYY-MM-DD format.
  --publish       Publish immediately.
  --draft         Keep as draft. This is the default when --publish is omitted.
  --force         Overwrite an existing post file.
`);
}

function normalizeDate(value) {
  if (value) {
    return value;
  }

  return new Date().toISOString().split('T')[0];
}

function inferTitle(parsed, sourcePath) {
  if (parsed.data.title) {
    return String(parsed.data.title).trim();
  }

  const heading = parsed.content.match(/^#\s+(.+)$/m);
  if (heading) {
    return heading[1].trim();
  }

  return path.basename(sourcePath, path.extname(sourcePath));
}

function stripLeadingTitle(content, title) {
  const escaped = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`^#\\s+${escaped}\\s*(?:\\r?\\n)+`, 'i');
  return content.trim().replace(pattern, '').trim();
}

function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    printHelp();
    return;
  }

  if (!args.file) {
    console.error('Missing required option: --file');
    printHelp();
    process.exit(1);
  }

  const sourcePath = path.resolve(process.cwd(), args.file);
  if (!fs.existsSync(sourcePath)) {
    console.error(`Source file does not exist: ${sourcePath}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(sourcePath, 'utf8');
  const parsed = matter(raw);
  const title = args.title || inferTitle(parsed, sourcePath);
  const content = stripLeadingTitle(parsed.content, title);
  const slug = buildSlug(args.slug || parsed.data.slug || title);
  const outputPath = path.join(postsDir, `${slug}.md`);

  if (fs.existsSync(outputPath) && !args.force) {
    console.error(`Post already exists: ${outputPath}`);
    console.error('Use --force to overwrite it.');
    process.exit(1);
  }

  const summary = args.summary || parsed.data.summary || parsed.data.description || extractSummary(content);
  const excerpt = args.excerpt || parsed.data.excerpt || summary;
  const tags = args.tags.length > 0 ? args.tags : splitTags(parsed.data.tags);
  const draft = args.publish ? false : true;

  const frontmatter = {
    ...parsed.data,
    title,
    date: normalizeDate(args.date || parsed.data.date),
    summary,
    excerpt,
    tags,
    draft: args.draft ? true : draft,
    published: args.publish && !args.draft,
  };

  if (args.category || parsed.data.category) {
    frontmatter.category = args.category || parsed.data.category;
  }

  if (args.slug || parsed.data.slug) {
    frontmatter.slug = slug;
  }

  if (frontmatter.published) {
    delete frontmatter.draft;
  } else {
    delete frontmatter.published;
  }

  fs.mkdirSync(postsDir, { recursive: true });
  fs.writeFileSync(outputPath, matter.stringify(`${content}\n`, frontmatter), 'utf8');

  console.log(`Post written: ${path.relative(process.cwd(), outputPath)}`);
  console.log(`Status: ${frontmatter.published ? 'published' : 'draft'}`);
  console.log('Next: npm run build');
}

main();
