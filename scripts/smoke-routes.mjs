#!/usr/bin/env node
import http from 'http';
import https from 'https';

const BASE = process.env.BASE_URL || 'http://localhost:3000';
const ROUTES = ['/', '/rooms', '/about-us', '/contact', '/log-book'];

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.request(url, { method: 'GET' }, (res) => {
      const { statusCode } = res;
      res.resume();
      resolve({ url, statusCode });
    });
    req.on('error', reject);
    req.end();
  });
}

(async () => {
  const results = [];
  for (const route of ROUTES) {
    const url = `${BASE}${route}`;
    try {
      const r = await fetchUrl(url);
      results.push(r);
    } catch (err) {
      results.push({ url, statusCode: 0, error: String(err) });
    }
  }
  let ok = true;
  for (const r of results) {
    const good = r.statusCode >= 200 && r.statusCode < 400;
    if (!good) ok = false;
    console.log(`${good ? 'OK' : 'FAIL'} ${r.statusCode} ${r.url}${r.error ? ' ' + r.error : ''}`);
  }
  if (!ok) {
    console.error('Smoke tests failed');
    process.exit(1);
  }
})();
