#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const manifestPath = path.resolve(process.cwd(), 'manifest.json');

function fail(msg) {
  console.error('manifest check failed:', msg);
  process.exit(1);
}

if (!fs.existsSync(manifestPath)) {
  fail('manifest.json not found at repo root');
}

let raw;
try {
  raw = fs.readFileSync(manifestPath, 'utf8');
} catch (e) {
  fail('unable to read manifest.json: ' + e.message);
}

let manifest;
try {
  manifest = JSON.parse(raw);
} catch (e) {
  fail('manifest.json is not valid JSON: ' + e.message);
}

const required = ['name', 'version', 'api_version'];
const missing = required.filter(k => !(k in manifest));
if (missing.length) {
  fail('manifest.json missing required fields: ' + missing.join(', '));
}

console.log('manifest.json looks valid:', manifest.name, manifest.version);
process.exit(0);
