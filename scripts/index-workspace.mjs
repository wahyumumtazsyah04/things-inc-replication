/* Index workspace and detect unused assets under public/.
   Outputs:
   - scripts/workspace-index.json
   - scripts/unused-assets.json
   - scripts/unused-assets.txt
*/
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const repoRoot = path.resolve(path.join(fileURLToPath(import.meta.url), '..', '..'));
const projectRoot = repoRoot; // this script is already in things-inc-replication/scripts
const srcDir = path.join(projectRoot, 'src');
const appDir = path.join(srcDir, 'app');
const publicDir = path.join(projectRoot, 'public');
const outDir = path.join(projectRoot, 'scripts');

const textExts = new Set(['.ts', '.tsx', '.js', '.jsx', '.css', '.scss', '.sass', '.md', '.mdx', '.html']);
const routeEntryFiles = new Set(['page.tsx', 'route.ts', 'page.ts', 'route.tsx']);

const toPosix = p => p.split(path.sep).join('/');
const rel = p => toPosix(path.relative(projectRoot, p));
const exists = p => { try { fs.accessSync(p); return true; } catch { return false; } };

function walk(dir, opts = {}) {
  const res = [];
  const { includeDirs = false, filter = () => true } = opts;
  const stack = [dir];
  while (stack.length) {
    const d = stack.pop();
    if (!exists(d)) continue;
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, entry.name);
      if (entry.isDirectory()) {
        if (filter(p, true)) {
          if (includeDirs) res.push(p);
          stack.push(p);
        }
      } else if (entry.isFile()) {
        if (filter(p, false)) res.push(p);
      }
    }
  }
  return res;
}

function isGroupSeg(seg) { return seg.startsWith('(') && seg.endsWith(')'); }
function normRoutePathFromRelDir(relDir) {
  if (!relDir || relDir === '.' || relDir === '') return '/';
  const segs = toPosix(relDir).split('/').filter(Boolean).filter(s => !isGroupSeg(s));
  const p = '/' + segs.join('/');
  return p === '' ? '/' : p;
}

function collectRoutes() {
  const routes = new Set();
  if (!exists(appDir)) return [];
  const files = walk(appDir, {
    filter: (p, isDir) => {
      if (isDir) return true;
      const base = path.basename(p);
      return routeEntryFiles.has(base);
    }
  });
  for (const f of files) {
    const relDir = rel(path.dirname(f)).replace(/^src\/app\/?/, '');
    const routePath = normRoutePathFromRelDir(relDir);
    routes.add(routePath);
  }
  return Array.from(routes).sort();
}

function collectSourceFiles() {
  if (!exists(srcDir)) return [];
  return walk(srcDir, {
    filter: (p, isDir) => isDir || textExts.has(path.extname(p).toLowerCase())
  });
}

function collectPublicAssets() {
  if (!exists(publicDir)) return [];
  return walk(publicDir, { filter: () => true })
    .filter(p => fs.statSync(p).isFile())
    .map(p => ({
      abs: p,
      rel: rel(p),
      base: path.basename(p),
      size: fs.statSync(p).size
    }));
}

function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

function indexUsage(sourceFiles, assets) {
  const usage = new Map(); // relAsset -> { count, usedIn: Set<relSource> }
  for (const a of assets) usage.set(a.rel, { count: 0, usedIn: new Set() });

  for (const s of sourceFiles) {
    const content = fs.readFileSync(s, 'utf8');
    for (const a of assets) {
      // Heuristics: match either exact basename or a public path reference
      const re = new RegExp(`(?:/public/|/)?${escapeRe(a.base)}`, 'g');
      if (re.test(content)) {
        const u = usage.get(a.rel);
        u.count += 1;
        u.usedIn.add(rel(s));
      }
    }
  }

  const enriched = assets.map(a => {
    const u = usage.get(a.rel);
    return {
      path: a.rel,
      basename: a.base,
      size: a.size,
      usedByCount: u.count,
      usedIn: Array.from(u.usedIn).sort()
    };
  });

  const unused = enriched.filter(x => x.usedByCount === 0);

  return { enriched, unused };
}

function main() {
  if (!exists(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const routes = collectRoutes();
  const sourceFiles = collectSourceFiles();
  const assets = collectPublicAssets();
  const { enriched: assetsIndexed, unused: unusedAssets } = indexUsage(sourceFiles, assets);

  const index = {
    generatedAt: new Date().toISOString(),
    projectRoot: rel(projectRoot) || '.',
    routes,
    counts: {
      sourceFiles: sourceFiles.length,
      publicAssets: assets.length,
      unusedAssets: unusedAssets.length
    },
    assets: assetsIndexed
  };

  fs.writeFileSync(path.join(outDir, 'workspace-index.json'), JSON.stringify(index, null, 2));
  fs.writeFileSync(path.join(outDir, 'unused-assets.json'), JSON.stringify({ generatedAt: index.generatedAt, files: unusedAssets.map(u => u.path), details: unusedAssets }, null, 2));
  fs.writeFileSync(path.join(outDir, 'unused-assets.txt'), unusedAssets.map(u => u.path).join('\n') + (unusedAssets.length ? '\n' : ''));

  console.log(`Indexed ${sourceFiles.length} source files, ${assets.length} assets.`);
  console.log(`Routes detected: ${routes.length}`);
  console.log(`Unused public assets: ${unusedAssets.length}`);
  console.log(`Outputs:
 - scripts/workspace-index.json
 - scripts/unused-assets.json
 - scripts/unused-assets.txt`);
}

main();