'use client';

import { useMemo } from 'react';
import { parseBlogSegments, sanitizeBlogSectionHtml } from '../../lib/sanitizeHtml';
import { ClickableText } from './ClickableText';

interface SafeBlogContentProps {
  content: string;
  variant?: 'excerpt' | 'article';
  className?: string;
}

export function SafeBlogContent({
  content,
  variant = 'article',
  className = '',
}: SafeBlogContentProps) {
  const segments = useMemo(() => parseBlogSegments(content), [content]);

  if (segments.length === 0) {
    return null;
  }

  const textParagraphClass =
    variant === 'excerpt'
      ? 'font-prose text-sm sm:text-base leading-relaxed text-[var(--color-text-secondary)]'
      : 'font-prose text-base sm:text-[1.0625rem] leading-[1.8] text-[var(--color-text-primary)]';

  return (
    <div className={`space-y-4 ${className}`.trim()}>
      {segments.map((segment, segIdx) => {
        if (segment.type === 'html') {
          const cleanHtml = sanitizeBlogSectionHtml(segment.value);
          return (
            <div
              key={`html-${segIdx}`}
              className={`blog-html-section ${
                variant === 'excerpt' ? 'blog-html-excerpt' : 'blog-html-article'
              }`}
              dangerouslySetInnerHTML={{ __html: cleanHtml }}
            />
          );
        }

        const paragraphs = segment.value
          .split(/\n{2,}/)
          .map((p) => p.trim())
          .filter(Boolean);

        return (
          <div key={`text-${segIdx}`} className="space-y-4">
            {paragraphs.map((paragraph, pIdx) => (
              <p key={pIdx} className={textParagraphClass}>
                <ClickableText text={paragraph} />
              </p>
            ))}
          </div>
        );
      })}
    </div>
  );
}
