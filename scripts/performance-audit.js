const fs = require('fs');
const path = require('path');

// 性能审计函数
function performanceAudit() {
  console.log('🔍 开始性能审计...\n');
  
  const issues = [];
  const suggestions = [];
  
  // 检查构建产物
  const buildDir = path.join(__dirname, '..', '.next');
  if (!fs.existsSync(buildDir)) {
    console.log('❌ 未找到构建目录，请先运行 npm run build');
    return false;
  }
  
  // 分析静态资源
  analyzeStaticAssets(buildDir, issues, suggestions);
  
  // 分析页面大小
  analyzePageSizes(buildDir, issues, suggestions);
  
  // 检查配置优化
  checkConfiguration(issues, suggestions);
  
  // 输出结果
  printResults(issues, suggestions);
  
  return issues.length === 0;
}

// 分析静态资源
function analyzeStaticAssets(buildDir, issues, suggestions) {
  console.log('📦 分析静态资源...');
  
  const staticDir = path.join(buildDir, 'static');
  if (!fs.existsSync(staticDir)) {
    return;
  }
  
  // 检查chunks目录
  const chunksDir = path.join(staticDir, 'chunks');
  if (fs.existsSync(chunksDir)) {
    const chunkFiles = fs.readdirSync(chunksDir, { recursive: true });
    let totalSize = 0;
    let jsSize = 0;
    let cssSize = 0;
    
    chunkFiles.forEach(file => {
      if (typeof file === 'string') {
        const filePath = path.join(chunksDir, file);
        try {
          const stat = fs.statSync(filePath);
          const sizeKB = Math.round(stat.size / 1024);
          totalSize += sizeKB;
          
          if (file.endsWith('.js')) {
            jsSize += sizeKB;
            if (sizeKB > 250) {
              issues.push(`⚠️  大型JavaScript文件: ${file} (${sizeKB}KB)`);
            }
          } else if (file.endsWith('.css')) {
            cssSize += sizeKB;
            if (sizeKB > 50) {
              issues.push(`⚠️  大型CSS文件: ${file} (${sizeKB}KB)`);
            }
          }
        } catch (error) {
          // 忽略文件访问错误
        }
      }
    });
    
    console.log(`  ✓ 总大小: ${totalSize}KB`);
    console.log(`  ✓ JavaScript: ${jsSize}KB`);
    console.log(`  ✓ CSS: ${cssSize}KB`);
    
    if (totalSize > 1000) {
      suggestions.push('考虑代码分割以减少总bundle大小');
    }
    
    if (jsSize > 500) {
      suggestions.push('考虑延迟加载非关键JavaScript');
    }
  }
}

// 分析页面大小
function analyzePageSizes(buildDir, issues, suggestions) {
  console.log('\n📄 分析页面大小...');
  
  const serverDir = path.join(buildDir, 'server');
  const pagesDir = path.join(serverDir, 'pages');
  
  if (fs.existsSync(pagesDir)) {
    const pageFiles = fs.readdirSync(pagesDir, { recursive: true });
    
    pageFiles.forEach(file => {
      if (typeof file === 'string' && file.endsWith('.html')) {
        const filePath = path.join(pagesDir, file);
        try {
          const stat = fs.statSync(filePath);
          const sizeKB = Math.round(stat.size / 1024);
          
          console.log(`  ✓ ${file}: ${sizeKB}KB`);
          
          if (sizeKB > 100) {
            issues.push(`⚠️  页面HTML过大: ${file} (${sizeKB}KB)`);
          }
        } catch (error) {
          // 忽略文件访问错误
        }
      }
    });
  }
}

// 检查配置优化
function checkConfiguration(issues, suggestions) {
  console.log('\n⚙️  检查配置优化...');
  
  // 检查Next.js配置
  const nextConfigPath = path.join(__dirname, '..', 'next.config.js');
  if (fs.existsSync(nextConfigPath)) {
    const configContent = fs.readFileSync(nextConfigPath, 'utf-8');
    
    console.log('  ✓ Next.js配置文件存在');
    
    // 检查关键优化设置
    const optimizations = [
      { key: 'compress', name: 'Gzip压缩' },
      { key: 'swcMinify', name: 'SWC压缩' },
      { key: 'images', name: '图片优化' },
      { key: 'generateEtags', name: 'ETag生成' }
    ];
    
    optimizations.forEach(opt => {
      if (configContent.includes(opt.key)) {
        console.log(`  ✓ ${opt.name}已启用`);
      } else {
        suggestions.push(`启用${opt.name}优化`);
      }
    });
  } else {
    issues.push('❌ 缺少next.config.js配置文件');
  }
  
  // 检查Tailwind配置
  const tailwindConfigPath = path.join(__dirname, '..', 'tailwind.config.js');
  if (fs.existsSync(tailwindConfigPath)) {
    console.log('  ✓ Tailwind配置文件存在');
  }
  
  // 检查TypeScript配置
  const tsConfigPath = path.join(__dirname, '..', 'tsconfig.json');
  if (fs.existsSync(tsConfigPath)) {
    console.log('  ✓ TypeScript配置文件存在');
  }
}

// 输出结果
function printResults(issues, suggestions) {
  console.log('\n📊 性能审计结果:');
  console.log('=' * 50);
  
  if (issues.length === 0) {
    console.log('✅ 未发现性能问题！');
  } else {
    console.log(`❌ 发现 ${issues.length} 个性能问题:\n`);
    issues.forEach((issue, index) => {
      console.log(`${index + 1}. ${issue}`);
    });
  }
  
  if (suggestions.length > 0) {
    console.log(`\n💡 优化建议 (${suggestions.length} 项):\n`);
    suggestions.forEach((suggestion, index) => {
      console.log(`${index + 1}. ${suggestion}`);
    });
  }
  
  console.log('\n🎯 性能目标:');
  console.log('• JavaScript包大小 < 250KB');
  console.log('• CSS文件大小 < 50KB');
  console.log('• HTML页面大小 < 100KB');
  console.log('• 总bundle大小 < 1MB');
  console.log('• First Contentful Paint < 2s');
  console.log('• Largest Contentful Paint < 3s');
}

// 主函数
if (require.main === module) {
  const success = performanceAudit();
  process.exit(success ? 0 : 1);
}

module.exports = { performanceAudit }; 