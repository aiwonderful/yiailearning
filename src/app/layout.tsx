import './globals.css';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '../lib/config';
import { fontClasses } from '../lib/fonts';
import ThemeToggle from '../components/ThemeToggle';
import CustomCursorManager from '../components/CustomCursorManager';

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
);

const YouTubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={siteConfig.language} suppressHydrationWarning>
      <body className={fontClasses}>
        <CustomCursorManager />
        <header className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-subtle z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              {siteConfig.logo.type === 'image' && siteConfig.logo.url ? (
                <Image
                  src={siteConfig.logo.url}
                  alt={siteConfig.logo.alt || siteConfig.title}
                  width={40}
                  height={40}
                  className="rounded-md group-hover:opacity-90 transition-opacity"
                />
              ) : (
                <span className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-background text-xl font-bold group-hover:bg-primary/90 transition-colors">
                  {siteConfig.logo.text.charAt(0).toUpperCase()}
                </span>
              )}
              <span className="font-bold text-xl text-primary group-hover:text-primary/90 transition-colors">
                {siteConfig.title}
              </span>
            </Link>
            <nav className="flex items-center">
              <div className="hidden sm:flex space-x-6">
                {siteConfig.navigation.map((item) => (
                  <Link key={item.name} href={item.href} className="text-secondary hover:text-primary transition-colors">
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>
            
            <div className="flex items-center space-x-4">
              <div className="sm:hidden">
                <button 
                  className="text-secondary p-2 hover:text-primary transition-colors"
                  aria-label="导航菜单"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                </button>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </header>
        
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 min-h-[calc(100vh-280px)]">
          {children}
        </main>
        
        <footer className="bg-muted mt-16 py-12 border-t border-subtle">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">{siteConfig.title}</h3>
                <p className="text-secondary text-sm">
                  {siteConfig.description}
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">快速链接</h3>
                <ul className="space-y-2">
                  {siteConfig.navigation.map((item) => (
                    <li key={`footer-${item.name}`}>
                      <Link href={item.href} className="text-secondary hover:text-primary transition-colors text-sm">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">保持联系</h3>
                <div className="flex space-x-4">
                  {siteConfig.social.github && (
                    <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-secondary hover:text-primary transition-colors">
                      <GithubIcon className="w-6 h-6" />
                    </a>
                  )}
                  {siteConfig.social.twitter && (
                    <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-secondary hover:text-primary transition-colors">
                      <TwitterIcon className="w-6 h-6" />
                    </a>
                  )}
                  {siteConfig.social.youtube && (
                    <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-secondary hover:text-primary transition-colors">
                      <YouTubeIcon className="w-6 h-6" />
                    </a>
                  )}
                </div>
              </div>
            </div>
            
            <div className="pt-8 border-t border-subtle text-center text-secondary text-sm">
              <p>{siteConfig.copyright}</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
} 