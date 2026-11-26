const STRIP_WITH_BODY_REGEX =
  /<\s*(script|style|iframe|object|embed|svg|math|form|noscript|template)\b[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi;

const STRIP_SELF_CLOSING_REGEX =
  /<\s*\/?\s*(script|style|iframe|object|embed|svg|math|form|input|textarea|button|select|option|meta|link|base|noscript|template)\b[^>]*\/?>/gi;

const EVENT_ATTR_REGEX =
  /\s+on[a-z0-9_-]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi;

const STYLE_OR_SRCDOC_ATTR_REGEX =
  /\s+(?:style|srcdoc|formaction)\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi;

const DANGEROUS_URI_ATTR_REGEX =
  /\s+(href|src|xlink:href)\s*=\s*(?:"\s*(?:javascript|vbscript|data)\s*:[^"]*"|'\s*(?:javascript|vbscript|data)\s*:[^']*'|(?:javascript|vbscript|data)\s*:[^\s>]+)/gi;

/**
 * Defense-in-depth server-side HTML sanitizer for blog descriptions and articles.
 * Removes executable tags, inline event handlers, inline styles, and unsafe URI schemes
 * while preserving safe semantic HTML such as <section>, <h2>-<h6>, <p>, <ul>, <li>, <a>, etc.
 */
export function sanitizeHtmlServer(raw: string): string {
  if (!raw || (!raw.includes('<') && !raw.includes('>'))) {
    return raw;
  }

  let cleaned = raw;
  for (let i = 0; i < 3; i++) {
    cleaned = cleaned.replace(STRIP_WITH_BODY_REGEX, '');
    cleaned = cleaned.replace(STRIP_SELF_CLOSING_REGEX, '');
  }

  cleaned = cleaned.replace(EVENT_ATTR_REGEX, '');
  cleaned = cleaned.replace(STYLE_OR_SRCDOC_ATTR_REGEX, '');
  cleaned = cleaned.replace(DANGEROUS_URI_ATTR_REGEX, ' $1="#"');

  return cleaned.trim();
}
