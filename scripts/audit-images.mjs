#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const extsPng = new Set(['.png']);
const extsWebp = new Set(['.webp', '.avif']);
const root = path.resolve(process.cwd(), 'public');

function* walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      yield* walk(p);
    } else {
      yield p;
    }
  }
}

const files = [];
for (const f of walk(root)) {
  const ext = path.extname(f).toLowerCase();
  if (extsPng.has(ext)) {
    files.push(f);
  }
}

function human(n) {
  const units = ['B','KB','MB','GB'];
  let i = 0, v = n;
  while (v > 1024 && i < units.length - 1) { v /= 1024; i++; }
  return `${v.toFixed(1)} ${units[i]}`;
}

const report = [];
for (const f of files) {
  const stat = fs.statSync(f);
  const size = stat.size;
  // very rough heuristic: webp often 35-70% smaller than png for photos/graphics
  const estSave = Math.round(size * 0.45);
  report.push({ file: path.relative(root, f), size, estSave });
}

report.sort((a,b) => b.size - a.size);

const total = report.reduce((s, r) => s + r.size, 0);
const totalSave = report.reduce((s, r) => s + r.estSave, 0);

console.log(`PNG candidates under public/ (largest first)\n`);
for (const r of report) {
  console.log(`${r.file.padEnd(80)} ${human(r.size).padStart(10)}  ~save ${human(r.estSave)}`);
}
console.log(`\nTotal PNG size: ${human(total)}  | Estimated savings if converted: ${human(totalSave)}`);

if (report.length === 0) {
  console.log('No PNG files found under public/.');
}
