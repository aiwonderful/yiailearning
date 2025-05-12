const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
// No longer need lunr and its dependencies
// const lunr = require('lunr');
// const lunrStemmerSupport = require('lunr-languages/lunr.stemmer.support.js');
// const TinySegmenter = require('lunr-languages/tinyseg.js');

const postsDirectory = path.join(process.cwd(), 'src/data/posts');
const searchDataOutputDirectory = path.join(process.cwd(), 'public/search'); // Changed output directory name for clarity
const searchDataOutputFile = path.join(searchDataOutputDirectory, 'search-data.json'); // Output file name

async function main() {
  const { remark } = await import('remark');
  const stripMarkdownPlugin = (await import('strip-markdown')).default;

  try {
    console.log('开始构建搜索数据...');

    if (!fs.existsSync(searchDataOutputDirectory)) {
      fs.mkdirSync(searchDataOutputDirectory, { recursive: true });
    }

    const filenames = fs.readdirSync(postsDirectory).filter(file => file.endsWith('.md'));
    const allPostsData = []; // Array to hold all post data for Fuse.js

    for (const filename of filenames) {
      const slug = filename.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content: markdownContent } = matter(fileContents);

      if (!data.title || !data.date) {
        console.warn(`警告: 文件 ${filename} 缺少 'title' 或 'date' frontmatter，将跳过。`);
        continue;
      }
      
      const vfile = await remark().use(stripMarkdownPlugin).process(markdownContent);
      const plainTextContent = String(vfile).replace(/\s+/g, ' ').trim();

      // Add post data to the array
      allPostsData.push({
        slug: slug,
        title: data.title,
        tags: data.tags || [], // Ensure tags is an array
        content: plainTextContent,
        summary: data.summary || data.excerpt || plainTextContent.substring(0, 150) + (plainTextContent.length > 150 ? '...' : ''),
        date: data.date,
      });
    }

    // No longer creating a Lunr index
    // const segmenter = new TinySegmenter();
    // ... (removed all lunr specific code) ...

    fs.writeFileSync(
      searchDataOutputFile, // Write to the new output file
      JSON.stringify(allPostsData, null, 2) // Pretty print JSON for readability
    );

    console.log(`搜索数据已成功构建并保存到: ${searchDataOutputFile}`);

  } catch (error) {
    console.error('构建搜索数据时出错:', error);
    process.exit(1);
  }
}

main().catch(error => {
  console.error('运行构建脚本时发生未捕获的错误:', error);
  process.exit(1);
}); 