import path from 'node:path';
import sharp from 'sharp';

const widths = [400, 700, 900];
const images = [
  'public/blog/analog-angular-update.webp',
  'public/blog/analog-zoneless-bundle-optimization.webp',
  'public/blog/PaaS-For-Your-SaaS.png',
];

let generatedBytes = 0;

for (const sourcePath of images) {
  const extension = path.extname(sourcePath);
  const outputBase = sourcePath.slice(0, -extension.length);
  const image = sharp(sourcePath, { failOn: 'warning' }).rotate();

  for (const width of widths) {
    const outputPath = `${outputBase}-${width}w.webp`;
    const result = await image
      .clone()
      .resize({ width, withoutEnlargement: false })
      .webp({ quality: 80, effort: 6 })
      .toFile(outputPath);

    generatedBytes += result.size;
    console.log(`${outputPath} ${result.width}x${result.height} ${result.size} bytes`);
  }
}

console.log(`Generated ${images.length * widths.length} blog card variants (${(generatedBytes / 1024).toFixed(1)} KiB total).`);
