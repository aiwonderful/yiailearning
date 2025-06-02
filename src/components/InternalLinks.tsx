import Link from 'next/link';

interface InternalLinkProps {
  href: string;
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export function InternalLink({ href, children, title, className = '' }: InternalLinkProps) {
  return (
    <Link 
      href={href} 
      title={title}
      className={`text-primary hover:text-primary/80 underline decoration-1 underline-offset-2 transition-colors ${className}`}
    >
      {children}
    </Link>
  );
}

interface RelatedArticlesProps {
  articles: Array<{
    title: string;
    href: string;
    description: string;
  }>;
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  return (
    <div className="my-8 p-6 bg-muted/50 rounded-lg border border-subtle">
      <h3 className="text-lg font-semibold mb-4 text-primary">相关推荐文章</h3>
      <div className="space-y-3">
        {articles.map((article, index) => (
          <div key={index} className="flex flex-col">
            <Link 
              href={article.href}
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              {article.title}
            </Link>
            <p className="text-secondary text-sm mt-1">{article.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

interface KeywordHighlightProps {
  children: React.ReactNode;
  className?: string;
}

export function KeywordHighlight({ children, className = '' }: KeywordHighlightProps) {
  return (
    <span className={`bg-primary/10 px-1 py-0.5 rounded text-primary font-medium ${className}`}>
      {children}
    </span>
  );
}

interface TableOfContentsProps {
  headings: Array<{
    id: string;
    text: string;
    level: number;
  }>;
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  return (
    <div className="my-6 p-4 bg-muted/30 rounded-lg border border-subtle">
      <h3 className="text-lg font-semibold mb-3 text-primary">本文目录</h3>
      <nav>
        <ul className="space-y-2">
          {headings.map((heading) => (
            <li 
              key={heading.id} 
              className={`${heading.level === 3 ? 'ml-4' : ''} ${heading.level === 4 ? 'ml-8' : ''}`}
            >
              <a 
                href={`#${heading.id}`} 
                className="text-secondary hover:text-primary transition-colors text-sm"
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
} 