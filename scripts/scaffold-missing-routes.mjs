/* Create minimal page stubs for routes listed in scripts/missing-routes.txt */
import fs from 'fs';
import path from 'path';

const projectRoot = path.resolve(path.join(process.cwd(), '.'));
const appDir = path.join(projectRoot, 'src', 'app');
const missingFile = path.join(projectRoot, 'scripts', 'missing-routes.txt');

function toSegs(p) {
  return p.split('/').filter(Boolean);
}

function isFileLike(p) {
  return /\.[a-z0-9]+$/i.test(p);
}

function makePageTSX(route) {
  return `import React from 'react';

export const dynamic = 'force-static';

export default function Page() {
  return (
    <main style={{minHeight: '60vh', display: 'grid', placeItems: 'center', textAlign: 'center'}}>
      <div>
        <h1>${route}</h1>
        <p>This is a temporary placeholder. Replace with real content to match things.inc exactly.</p>
      </div>
    </main>
  );
}
`;
}

function main() {
  if (!fs.existsSync(missingFile)) {
    console.error('Missing file: scripts/missing-routes.txt. Run align-with-thingsinc first.');
    process.exit(1);
  }
  const routes = fs.readFileSync(missingFile, 'utf8').split(/\r?\n/).map(s => s.trim()).filter(Boolean);
  if (!routes.length) {
    console.log('No missing routes detected.');
    return;
  }

  let created = 0;
  for (const r of routes) {
    if (r === '/' || isFileLike(r)) continue;
    const segs = toSegs(r);
    const dir = path.join(appDir, ...segs);
    const pageFile = path.join(dir, 'page.tsx');
    if (fs.existsSync(pageFile)) continue;
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(pageFile, makePageTSX(r));
    created++;
    console.log('Created', path.relative(projectRoot, pageFile));
  }
  console.log(`Done. Created ${created} page stub(s).`);
}

main();