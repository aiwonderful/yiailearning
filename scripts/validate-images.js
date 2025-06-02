const fs = require('fs');
const path = require('path');

// 验证图片的函数
function validateImages() {
  console.log('🖼️  开始验证图片...\n');
  
  const issues = [];
  
  // 检查公共图片目录
  const publicImagesPath = path.join(__dirname, '..', 'public', 'images');
  
  if (!fs.existsSync(publicImagesPath)) {
    issues.push('❌ public/images 目录不存在');
    return;
  }
  
  // 递归检查图片文件
  function checkDirectory(dirPath, relativePath = '') {
    const files = fs.readdirSync(dirPath);
    
    files.forEach(file => {
      const filePath = path.join(dirPath, file);
      const relativeFilePath = path.join(relativePath, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        checkDirectory(filePath, relativeFilePath);
      } else if (isImageFile(file)) {
        validateImageFile(filePath, relativeFilePath, issues);
      }
    });
  }
  
  checkDirectory(publicImagesPath);
  
  // 检查文章中的图片引用
  checkMarkdownImages(issues);
  
  // 输出结果
  if (issues.length === 0) {
    console.log('✅ 所有图片验证通过！');
  } else {
    console.log(`❌ 发现 ${issues.length} 个图片问题:\n`);
    issues.forEach((issue, index) => {
      console.log(`${index + 1}. ${issue}`);
    });
    console.log('\n建议修复这些问题以优化SEO和用户体验。');
  }
  
  return issues.length === 0;
}

// 检查是否为图片文件
function isImageFile(filename) {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.svg'];
  return imageExtensions.some(ext => filename.toLowerCase().endsWith(ext));
}

// 验证单个图片文件
function validateImageFile(filePath, relativeFilePath, issues) {
  const stat = fs.statSync(filePath);
  const fileSizeKB = Math.round(stat.size / 1024);
  
  // 检查文件大小（超过500KB的图片可能需要优化）
  if (fileSizeKB > 500) {
    issues.push(`⚠️  图片过大: ${relativeFilePath} (${fileSizeKB}KB)`);
  }
  
  // 检查文件名（应该具有描述性）
  const filename = path.basename(relativeFilePath, path.extname(relativeFilePath));
  if (/^img|image|photo|pic|screenshot/i.test(filename) || filename.length < 3) {
    issues.push(`⚠️  文件名不够描述性: ${relativeFilePath}`);
  }
  
  console.log(`✓ ${relativeFilePath} (${fileSizeKB}KB)`);
}

// 检查Markdown文件中的图片
function checkMarkdownImages(issues) {
  const postsDir = path.join(__dirname, '..', 'src', 'data', 'posts');
  
  if (!fs.existsSync(postsDir)) {
    return;
  }
  
  const markdownFiles = fs.readdirSync(postsDir).filter(file => file.endsWith('.md'));
  
  markdownFiles.forEach(file => {
    const filePath = path.join(postsDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // 查找图片标签
    const imgRegex = /<img[^>]+>/g;
    const markdownImgRegex = /!\[[^\]]*\]\([^)]+\)/g;
    
    let match;
    
    // 检查HTML img标签
    while ((match = imgRegex.exec(content)) !== null) {
      const imgTag = match[0];
      
      // 检查alt属性
      if (!imgTag.includes('alt=')) {
        issues.push(`❌ 缺少alt属性: ${file} - ${imgTag.substring(0, 50)}...`);
      } else {
        const altMatch = imgTag.match(/alt=["']([^"']*)["']/);
        if (altMatch && (!altMatch[1] || altMatch[1].trim().length < 3)) {
          issues.push(`⚠️  alt属性太短: ${file} - "${altMatch[1]}"`);
        }
      }
    }
    
    // 检查Markdown图片语法
    while ((match = markdownImgRegex.exec(content)) !== null) {
      const mdImg = match[0];
      const altMatch = mdImg.match(/!\[([^\]]*)\]/);
      
      if (altMatch && (!altMatch[1] || altMatch[1].trim().length < 3)) {
        issues.push(`⚠️  Markdown图片alt太短: ${file} - "${altMatch[1]}"`);
      }
    }
  });
}

// 主函数
if (require.main === module) {
  const success = validateImages();
  process.exit(success ? 0 : 1);
}

module.exports = { validateImages }; 