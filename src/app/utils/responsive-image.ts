const RASTER_EXTENSION = /\.(?:png|jpe?g|webp)$/i;

export function responsiveImageUrl(source: string, width: number): string {
  return RASTER_EXTENSION.test(source)
    ? source.replace(RASTER_EXTENSION, `-${width}w.webp`)
    : source;
}

export function responsiveImageSrcset(source: string, widths: readonly number[]): string | null {
  if (!RASTER_EXTENSION.test(source)) return null;

  return widths
    .map((width) => `${responsiveImageUrl(source, width)} ${width}w`)
    .join(', ');
}
