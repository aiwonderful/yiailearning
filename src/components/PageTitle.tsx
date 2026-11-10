import React from 'react';

interface PageTitleProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageTitle({ children, className = '' }: PageTitleProps) {
  return (
    <h1 className={`relative mb-10 inline-block text-4xl font-bold ${className}`}>
      <span className="relative z-10">{children}</span>
      <span className="absolute left-0 bottom-0 w-full h-3 rounded-sm bg-primary/18 -z-0"></span>
    </h1>
  );
}
