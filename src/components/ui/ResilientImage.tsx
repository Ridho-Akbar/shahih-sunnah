'use client';

import { useState } from 'react';
import { BookOpen } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}

export function ResilientImage({ src, alt, className = '', fallbackLabel }: ResilientImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-primary-100 via-surface-raised to-accent-100 dark:from-primary-900/40 dark:via-surface-raised dark:to-accent-900/40 text-text-secondary p-6 text-center ${className}`}
      >
        <BookOpen className="w-8 h-8 text-primary-600 dark:text-primary-400" aria-hidden="true" />
        <span className="text-sm font-medium text-text-primary">{fallbackLabel || alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
