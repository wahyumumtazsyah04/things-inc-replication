/* Copy Things, Inc. exported assets into Next.js public folder */
const fs = require('fs');
const path = require('path');

const src = path.resolve('a:/dev/zenweb/Things, Inc._files');
const dest = path.resolve(process.cwd(), 'public', 'thingsinc');

function copyRecursiveSync(srcDir, destDir) {
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      copyRecursiveSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

if (!fs.existsSync(src)) {
  console.error('Source folder not found:', src);
  process.exit(1);
}

copyRecursiveSync(src, dest);
console.log('Copied Things, Inc. assets to', dest);
