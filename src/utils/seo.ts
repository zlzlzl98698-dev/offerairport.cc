import { SITE_CONFIG } from '../data/site';

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export function buildCanonicalUrl(pathname: string): string {
  const cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  if (cleanPath === '/' || cleanPath.endsWith('.html') || cleanPath.endsWith('.xml')) {
    return new URL(cleanPath, SITE_CONFIG.domain).toString();
  }
  const withTrailing = cleanPath.endsWith('/') ? cleanPath : `${cleanPath}/`;
  return new URL(withTrailing, SITE_CONFIG.domain).toString();
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: buildCanonicalUrl(item.href),
    })),
  };
}

export function estimateReadingMinutes(text: string): number {
  const cleaned = text.replace(/[#>*`\-\[\]()!|]/g, '').replace(/\s+/g, '');
  const charCount = cleaned.length;
  return Math.max(2, Math.ceil(charCount / 450));
}

export interface FAQItem {
  question: string;
  answer: string;
}

function escapeHtml(raw: string): string {
  return raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Render a plain FAQ string with safe inline code, bold, and internal links into HTML. */
export function renderInlineMarkdownHtml(raw: string): string {
  const tokenRegex = /(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\(\/[^)\s]+\))/g;
  let out = '';
  let lastIdx = 0;

  for (const match of raw.matchAll(tokenRegex)) {
    const idx = match.index ?? 0;
    if (idx > lastIdx) {
      out += escapeHtml(raw.slice(lastIdx, idx));
    }
    const token = match[0];
    if (token.startsWith('`') && token.endsWith('`')) {
      out += `<code class="px-1.5 py-0.5 rounded bg-slate-100 text-text-title font-mono text-[0.88em]">${escapeHtml(
        token.slice(1, -1)
      )}</code>`;
    } else if (token.startsWith('**') && token.endsWith('**')) {
      out += `<strong class="font-semibold text-text-title">${escapeHtml(
        token.slice(2, -2)
      )}</strong>`;
    } else {
      const linkMatch = /^\[([^\]]+)\]\((\/[^)\s]+)\)$/.exec(token);
      if (linkMatch) {
        out += `<a href="${escapeHtml(
          linkMatch[2]
        )}" class="text-brand-primary underline underline-offset-2 hover:text-brand-dark">${escapeHtml(
          linkMatch[1]
        )}</a>`;
      } else {
        out += escapeHtml(token);
      }
    }
    lastIdx = idx + token.length;
  }

  if (lastIdx < raw.length) {
    out += escapeHtml(raw.slice(lastIdx));
  }
  return out;
}

/** Strip lightweight inline markdown markers for clean plain-text JSON-LD FAQ schema. */
export function stripInlineMarkdown(raw: string): string {
  return raw
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1');
}

export function buildFaqSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: stripInlineMarkdown(f.question),
      acceptedAnswer: {
        '@type': 'Answer',
        text: stripInlineMarkdown(f.answer),
      },
    })),
  };
}

export function formatDateZh(date: Date | string | undefined): string {
  if (!date) return '待核实';
  const d = typeof date === 'string' ? new Date(date) : date;
  if (Number.isNaN(d.getTime())) return String(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate()
  ).padStart(2, '0')}`;
}
