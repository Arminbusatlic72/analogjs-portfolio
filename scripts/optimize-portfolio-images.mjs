import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const contentDirectory = path.resolve('src/content/projects');
const publicDirectory = path.resolve('public');
const widthsByField = {
  featuredImage: [150, 300, 400],
  projectImage: [400, 800, 1200],
  projectImageSec: [400, 800],
};
const markdownGalleryImages = [
  '/projects/dna-sandbox/scenariodna3.png',
  '/projects/dna-sandbox/scenariodna4.png',
  '/projects/kriz/kriz3.png',
];
const images = new Map();

for (const filename of await readdir(contentDirectory)) {
  if (!filename.endsWith('.md')) continue;

  const content = await readFile(path.join(contentDirectory, filename), 'utf8');
  for (const [field, widths] of Object.entries(widthsByField)) {
    const match = content.match(new RegExp(`^${field}:\\s*["']?([^"'\\n]+)`, 'm'));
    const publicPath = match?.[1].trim();
    if (!publicPath || publicPath.endsWith('.svg')) continue;

    const sourcePath = path.join(publicDirectory, publicPath.replace(/^\//, ''));
    const imageWidths = images.get(sourcePath) ?? new Set();
    widths.forEach((width) => imageWidths.add(width));
    images.set(sourcePath, imageWidths);
  }
}

for (const publicPath of markdownGalleryImages) {
  images.set(
    path.join(publicDirectory, publicPath.replace(/^\//, '')),
    new Set([400, 800]),
  );
}

let sourceBytes = 0;
let generatedBytes = 0;
let generatedCount = 0;

for (const [sourcePath, widths] of images) {
  const source = sharp(sourcePath, { failOn: 'warning' }).rotate();
  sourceBytes += (await stat(sourcePath)).size;

  for (const width of [...widths].sort((a, b) => a - b)) {
    const extension = path.extname(sourcePath);
    const outputPath = `${sourcePath.slice(0, -extension.length)}-${width}w.webp`;
    const result = await source
      .clone()
      .resize({ width, withoutEnlargement: false })
      .webp({ quality: 80, effort: 6 })
      .toFile(outputPath);

    generatedBytes += result.size;
    generatedCount += 1;
    console.log(`${path.relative(process.cwd(), outputPath)} ${result.width}x${result.height} ${result.size} bytes`);
  }
}

console.log(`Processed ${images.size} source images (${(sourceBytes / 1048576).toFixed(2)} MiB).`);
console.log(`Generated ${generatedCount} responsive WebP files (${(generatedBytes / 1048576).toFixed(2)} MiB total).`);
