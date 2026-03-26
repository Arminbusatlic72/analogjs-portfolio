const EXTENSION_PATTERN = /\.(md|agx)$/i;

export function normalizeSlug(slug?: string | null): string {
  if (!slug) {
    return '';
  }

  const normalized = slug.replace(/\\/g, '/');
  const segments = normalized.split('/').filter(Boolean);
  const candidate = segments[segments.length - 1] ?? '';

  return candidate.replace(EXTENSION_PATTERN, '');
}
