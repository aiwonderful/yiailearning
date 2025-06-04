/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   optimizeCss: true,
  // },
  // CDN配置 (暂时禁用以避免重定向问题)
  // assetPrefix: process.env.NODE_ENV === 'production' && process.env.CDN_URL 
  //   ? process.env.CDN_URL 
  //   : '',
  
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: ['source.unsplash.com'],
    // CDN域名配置 (暂时禁用)
    // loader: process.env.CDN_URL ? 'custom' : 'default',
    // loaderFile: process.env.CDN_URL ? './src/lib/image-loader.js' : undefined,
  },
  
  // 性能优化
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  trailingSlash: false,
  
  // 构建优化
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig; 