import './globals.css';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { siteConfig } from '../lib/config';
import { fontClasses } from '../lib/fonts';
import ThemeToggle from '../components/ThemeToggle';
import CustomCursorManager from '../components/CustomCursorManager';
import Analytics from '../components/Analytics';
import Performance from '../components/Performance';
import { PerformanceMonitor } from '../components/PerformanceMonitor';
import { Loading } from '../components/Loading';
import { ServiceWorkerStatus, OfflineBanner } from '../components/ServiceWorkerStatus';
import { WebAnalytics } from '../components/WebAnalytics';
import { MonitoringDashboard } from '../components/MonitoringDashboard';

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`
  },
  description: siteConfig.description,
  keywords: ['AI学习', '人工智能', '机器学习', '深度学习', '编程教程', '数据科学', 'Python', 'TensorFlow', 'PyTorch'],
  authors: [{ name: 'Yi Learning' }],
  creator: 'Yi Learning',
  publisher: 'Yi Learning Blog',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: siteConfig.title,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: ['/og-image.jpg'],
    creator: '@yourusername',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={siteConfig.language} suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
      </head>
      <body className={`${fontClasses} bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark transition-colors duration-300 min-h-screen flex flex-col`}>
        {/* 性能监控 */}
        <PerformanceMonitor />
        <Analytics />
        <Suspense fallback={<Loading />}>
          <Performance />
        </Suspense>
        <CustomCursorManager />

        <nav className="bg-card-light/90 dark:bg-card-dark/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex-shrink-0 flex items-center gap-2">
                <Link href="/" className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md">
                    YI
                  </div>
                  <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">AI学习之路</span>
                </Link>
              </div>
              <div className="hidden md:flex space-x-8 items-center">
                {siteConfig.navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-500 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="flex items-center space-x-4">
                <button className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors">
                  <span className="material-icons">language</span>
                </button>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10 space-y-16">
          {children}
        </main>

        <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h4 className="text-lg font-bold text-primary mb-4">AI学习之路</h4>
                <p className="text-sm text-text-sub-light dark:text-text-sub-dark leading-relaxed max-w-xs">
                  {siteConfig.description}
                </p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-primary mb-4">快速链接</h4>
                <ul className="space-y-2 text-sm text-text-sub-light dark:text-text-sub-dark">
                  {siteConfig.navigation.map((item) => (
                    <li key={`footer-${item.name}`}>
                      <Link href={item.href} className="hover:text-primary transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-bold text-primary mb-4">保持联系</h4>
                <div className="flex space-x-4">
                  {siteConfig.social.github && (
                    <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                      <i className="fab fa-github text-xl"></i>
                    </a>
                  )}
                  {siteConfig.social.twitter && (
                    <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                      <i className="fab fa-twitter text-xl"></i>
                    </a>
                  )}
                  {siteConfig.social.youtube && (
                    <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors">
                      <i className="fab fa-youtube text-xl"></i>
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-8 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {siteConfig.copyright}
              </p>
            </div>
          </div>
        </footer>

        {/* Service Worker 状态和离线支持 */}
        <OfflineBanner />
        <ServiceWorkerStatus />

        {/* Web分析 */}
        <WebAnalytics />

        {/* 监控仪表板 */}
        <MonitoringDashboard />
      </body>
    </html>
  );
}