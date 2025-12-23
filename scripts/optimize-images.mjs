// Image optimization script using sharp
// Run with: node scripts/optimize-images.mjs

import sharp from "sharp";
import fs from "fs";
import path from "path";

const ASSETS_DIR = "./src/FirstTimer/assets";
const BACKUP_DIR = "./src/FirstTimer/assets-backup";

// Images to optimize with target sizes
const imagesToOptimize = [
  { file: "AboutHero2.webp", quality: 50, width: 600 },
  { file: "AboutHero1.webp", quality: 60, width: 600 },
  { file: "AboutHero.webp", quality: 60, width: 600 },
  { file: "user1.webp", quality: 50, width: 200 },
  { file: "user2.webp", quality: 50, width: 200 },
  { file: "user3.webp", quality: 50, width: 200 },
  { file: "user4.webp", quality: 50, width: 200 },
  { file: "user5.webp", quality: 50, width: 200 },
  { file: "user6.webp", quality: 50, width: 200 },
  { file: "user7.webp", quality: 50, width: 200 },
  { file: "user9.webp", quality: 50, width: 200 },
  { file: "user10.webp", quality: 50, width: 200 },
  { file: "user11.webp", quality: 50, width: 200 },
  { file: "user14.webp", quality: 50, width: 200 },
  { file: "user15.webp", quality: 50, width: 200 },
  { file: "avocados.webp", quality: 60, width: 400 },
  { file: "farmer_role.webp", quality: 60, width: 400 },
  { file: "buyer_role.webp", quality: 60, width: 400 },
];

async function optimizeImages() {
  // Create backup directory
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
    console.log("Created backup directory");
  }

  for (const { file, quality, width } of imagesToOptimize) {
    const inputPath = path.join(ASSETS_DIR, file);
    const backupPath = path.join(BACKUP_DIR, file);

    if (!fs.existsSync(inputPath)) {
      console.log(`Skipping ${file} - not found`);
      continue;
    }

    const originalStats = fs.statSync(inputPath);
    const originalSize = (originalStats.size / 1024).toFixed(1);

    // Backup original
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(inputPath, backupPath);
    }

    try {
      const outputBuffer = await sharp(inputPath)
        .resize(width, null, {
          withoutEnlargement: true,
          fit: "inside",
        })
        .webp({ quality })
        .toBuffer();

      fs.writeFileSync(inputPath, outputBuffer);

      const newSize = (outputBuffer.length / 1024).toFixed(1);
      const savings = (
        100 -
        (outputBuffer.length / originalStats.size) * 100
      ).toFixed(1);

      console.log(
        `✓ ${file}: ${originalSize}KB → ${newSize}KB (${savings}% saved)`
      );
    } catch (err) {
      console.error(`✗ ${file}: ${err.message}`);
    }
  }

  console.log("\nOptimization complete! Originals backed up to:", BACKUP_DIR);
}

optimizeImages();
