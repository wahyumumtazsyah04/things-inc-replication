/* Compare our Next.js routes to things.inc sitemap */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const projectRoot = path.resolve(path.join(fileURLToPath(import.meta.url), '..', '..'));
const outDir = path.join(projectRoot, 'scripts');
const appDir = path.join(projectRoot, 'src', 'app');

const toPosix = p => p.split(path.sep).join('/');
const rel = p => toPosix(path.relative(projectRoot, p));
const exists = p => { try { fs.accessSync(p); return true; } catch { return false; } };

function isGroupSeg(seg) { return seg.startsWith('(') && seg.endsWith(')'); }
function normPath(p) {
  if (!p) return '/';
  let s = p.trim();
  try { s = new URL(s, 'https://things.inc').pathname; } catch {}
  if (s.length > 1 && s.endsWith('/')) s = s.slice(0, -1);
  return s === '' ? '/' : s;
}

function collectLocalRoutes() {
  const routeEntryFiles = new Set(['page.tsx', 'route.ts', 'page.ts', 'route.tsx']);
  const routes = new Set();
  if (!exists(appDir)) return [];
  const stack = [appDir];
  while (stack.length) {
    const d = stack.pop();
    for (const dirent of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, dirent.name);
      if (dirent.isDirectory()) {
        stack.push(p);
      } else if (dirent.isFile() && routeEntryFiles.has(dirent.name)) {
        const relDir = rel(path.dirname(p)).replace(/^src\/app\/?/, '');
        const segs = toPosix(relDir).split('/').filter(Boolean).filter(s => !isGroupSeg(s));
        const routePath = normPath('/' + segs.join('/'));
        routes.add(routePath);
      }
    }
  }
  return Array.from(routes).sort();
}

async function fetchSitemapURLs() {
  const res = await fetch('https://things.inc/sitemap.xml', { redirect: 'follow' });
  if (!res.ok) throw new Error(`Failed to fetch sitemap: ${res.status}`);
  const xml = await res.text();
  const locs = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map(m => m[1]);
  const paths = locs.map(normPath)
    .filter(p => !p.includes('.xml')) // ignore nested sitemaps
    .filter(p => p !== '/feed' && p !== '/wp-json'); // defensive filters
  const uniq = Array.from(new Set(paths)).sort();
  return uniq;
}

async function main() {
  if (!exists(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const localRoutes = collectLocalRoutes();
  let remotePaths = [];
  try {
    remotePaths = await fetchSitemapURLs();
  } catch (e) {
    console.error(String(e));
    process.exitCode = 1;
    return;
  }

  const localSet = new Set(localRoutes);
  const remoteSet = new Set(remotePaths);

  const missing = remotePaths.filter(p => !localSet.has(p)); // in remote, not local
  const extra = localRoutes.filter(p => !remoteSet.has(p));  // in local, not remote
  const common = localRoutes.filter(p => remoteSet.has(p));

  const out = {
    generatedAt: new Date().toISOString(),
    remoteCount: remotePaths.length,
    localCount: localRoutes.length,
    missing,
    extra,
    commonSample: common.slice(0, 20)
  };

  fs.writeFileSync(path.join(outDir, 'site-compare.json'), JSON.stringify(out, null, 2));
  fs.writeFileSync(path.join(outDir, 'missing-routes.txt'), missing.join('\n') + (missing.length ? '\n' : ''));

  console.log(`Compared routes:
 - Remote (things.inc): ${remotePaths.length}
 - Local: ${localRoutes.length}
 - Missing locally: ${missing.length}
 - Extra locally: ${extra.length}
Outputs:
 - scripts/site-compare.json
 - scripts/missing-routes.txt`);
}

main();