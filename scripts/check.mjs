import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
const root = path.resolve('dist');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(x => x[1]);
assert.equal(ids.length, new Set(ids).size, 'Duplicate HTML IDs');
for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
 const ref = match[1];
 if (/^(https?:|mailto:|tel:)/.test(ref)) continue;
 if (ref.startsWith('#')) { assert(ids.includes(ref.slice(1)), `Missing anchor ${ref}`); continue; }
 assert(fs.existsSync(path.join(root, ref)), `Missing asset ${ref}`);
}
execFileSync(process.execPath, ['--check', 'dist/assets/app.js']);
for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) JSON.parse(match[1]);
assert(html.includes('https://etslipn.com/'));
console.log('PASS: assets, anchors, IDs, JavaScript syntax, structured data and domain.');
