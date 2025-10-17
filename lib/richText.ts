const TAG_REGEX = /<[^>]*>/g;
const NBSP_REGEX = /&nbsp;/gi;

export function extractPlainText(html?: string | null): string {
  if (!html) {
    return '';
  }

  return html
    .replace(TAG_REGEX, ' ')
    .replace(NBSP_REGEX, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function isRichTextEmpty(html?: string | null): boolean {
  return extractPlainText(html).length === 0;
}

export function normalizeRichText(html?: string | null): string {
  if (!html) {
    return '';
  }

  return isRichTextEmpty(html) ? '' : html;
}
