const rawBase = import.meta.env.BASE_URL || '/';
const base = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;

export function assetPath(src: string): string {
  if (/^(?:https?:)?\/\//.test(src) || src.startsWith('data:') || src.startsWith('#')) return src;
  if (src.startsWith('/')) return src;
  return `${base}${src}`;
}

export function cssUrl(src: string): string {
  return `url('${assetPath(src)}')`;
}
