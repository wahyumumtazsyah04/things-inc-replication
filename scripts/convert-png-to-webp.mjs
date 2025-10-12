#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(process.cwd(), 'public', 'thingsinc');
const targets = [
  '670f1d4f13326544cf71a234_train test 1.png',
  '670f189c9bf07daf7a3e0e0e_Retro_TV_Off2.png',
  '670f18f95e251b5a9c8be968_Retro_TV_On2.png',
  '6705b9208ebb9e666ec8413b_Home-logo_night.png',
  '6724406f04b26f75915dd8c2_Home-logo_day.png',
  '670f164bb78deb5be6f4476f_Kid.png',
  '670f164bf0d787f2a4cae332_slingshot.png'
];

(async () => {
  let converted = 0;
  for (const file of targets) {
    const src = path.join(root, file);
    const dst = src.replace(/\.png$/i, '.webp');
    if (!fs.existsSync(src)) {
      console.warn(`Skip (missing): ${file}`);
      continue;
    }
    try {
      await sharp(src)
        .webp({ quality: 86, effort: 5 })
        .toFile(dst);
      const sSrc = fs.statSync(src).size;
      const sDst = fs.statSync(dst).size;
      const saved = sSrc - sDst;
      console.log(`${file} -> ${path.basename(dst)}  saved ${(saved/1024).toFixed(1)} KB`);
      converted++;
    } catch (e) {
      console.error(`Failed: ${file}`, e.message);
    }
  }
  console.log(`Done. Converted ${converted}/${targets.length} images.`);
})();
