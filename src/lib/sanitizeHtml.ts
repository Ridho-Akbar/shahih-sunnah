import DOMPurify from 'dompurify';

const ALLOWED_TAGS = [
  'section',
  'div',
  'span',
  'p',
  'br',
  'hr',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'ul',
  'ol',
  'li',
  'blockquote',
  'strong',
  'b',
  'em',
  'i',
  'u',
  's',
  'mark',
  'small',
  'sub',
  'sup',
  'code',
  'pre',
  'a',
  'figure',
  'figcaption',
  'img',
  'table',
  'thead',
  'tbody',
  'tfoot',
  'tr',
  'th',
  'td',
  'dl',
  'dt',
  'dd',
];

const ALLOWED_ATTR = [
  'class',
  'dir',
  'lang',
  'href',
  'target',
  'rel',
  'src',
  'alt',
  'title',
  'width',
  'height',
  'colspan',
  'rowspan',
];

const FORBID_TAGS = [
  'script',
  'style',
  'iframe',
  'object',
  'embed',
  'form',
  'input',
  'textarea',
  'button',
  'select',
  'option',
  'svg',
  'math',
  'link',
  'meta',
  'base',
];

const FORBID_ATTR = [
  'style',
  'srcdoc',
  'formaction',
  'onerror',
  'onload',
  'onclick',
  'onmouseover',
  'onfocus',
  'onblur',
];

let hookRegistered = false;

function ensureDomPurifyHook() {
  if (hookRegistered || typeof window === 'undefined') return;
  hookRegistered = true;
  DOMPurify.addHook('afterSanitizeAttributes', (node) => {
    if (node.tagName === 'A') {
      const href = node.getAttribute('href') || '';
      if (/^https?:\/\//i.test(href)) {
        node.setAttribute('target', '_blank');
        node.setAttribute('rel', 'noopener noreferrer');
      } else {
        node.removeAttribute('target');
      }
    }
    if (node.tagName === 'IMG') {
      node.setAttribute('loading', 'lazy');
    }
  });
}

export function sanitizeBlogSectionHtml(html: string): string {
  ensureDomPurifyHook();
  const trimmed = html.trim();
  const wrapped = /^<section\b/i.test(trimmed)
    ? trimmed
    : `<section>${trimmed}</section>`;

  return DOMPurify.sanitize(wrapped, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    FORBID_TAGS,
    FORBID_ATTR,
    ALLOW_DATA_ATTR: false,
    ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto):|\/(?!\/)|#)/i,
  });
}

export interface BlogContentSegment {
  type: 'html' | 'text';
  value: string;
}

const HTML_TAG_DETECT_REGEX = /<\/?[a-z][a-z0-9]*(?:\s[^>]*)?>/i;
const SECTION_TOKEN_REGEX = /<\s*(\/?)\s*section\b[^>]*>/gi;

export function containsSectionMarkup(raw: string): boolean {
  return /<\s*section\b/i.test(raw);
}

export function containsHtmlMarkup(raw: string): boolean {
  return HTML_TAG_DETECT_REGEX.test(raw);
}

/**
 * Splits blog descriptions/articles into plain-text segments (for ClickableText)
 * and <section>...</section> HTML segments (sanitized via DOMPurify).
 * If HTML tags exist outside <section>, they are wrapped in <section> and sanitized.
 */
export function parseBlogSegments(raw: string): BlogContentSegment[] {
  const input = (raw || '').trim();
  if (!input) return [];

  if (!containsSectionMarkup(input)) {
    if (containsHtmlMarkup(input)) {
      return [{ type: 'html', value: input }];
    }
    return [{ type: 'text', value: input }];
  }

  const segments: BlogContentSegment[] = [];
  SECTION_TOKEN_REGEX.lastIndex = 0;

  let cursor = 0;
  let depth = 0;
  let blockStart = -1;
  let match: RegExpExecArray | null;

  while ((match = SECTION_TOKEN_REGEX.exec(input)) !== null) {
    const isClosing = match[1] === '/';
    if (!isClosing) {
      if (depth === 0) {
        const leading = input.slice(cursor, match.index).trim();
        if (leading) {
          segments.push({
            type: containsHtmlMarkup(leading) ? 'html' : 'text',
            value: leading,
          });
        }
        blockStart = match.index;
      }
      depth += 1;
    } else if (depth > 0) {
      depth -= 1;
      if (depth === 0 && blockStart !== -1) {
        const blockEnd = match.index + match[0].length;
        const htmlBlock = input.slice(blockStart, blockEnd).trim();
        if (htmlBlock) {
          segments.push({ type: 'html', value: htmlBlock });
        }
        cursor = blockEnd;
        blockStart = -1;
      }
    }
  }

  // Handle unclosed <section> tag gracefully by treating remainder as HTML section
  if (depth > 0 && blockStart !== -1) {
    const remainder = input.slice(blockStart).trim();
    if (remainder) {
      segments.push({ type: 'html', value: `${remainder}</section>` });
    }
    return segments;
  }

  const trailing = input.slice(cursor).trim();
  if (trailing) {
    segments.push({
      type: containsHtmlMarkup(trailing) ? 'html' : 'text',
      value: trailing,
    });
  }

  return segments;
}

export function stripHtmlToText(raw: string): string {
  if (!raw) return '';
  return raw
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
