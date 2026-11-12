// Builds a deployable copy of the site in dist/.
//   BASE=/drmanishpatel  serve the site from a sub-path (GitHub Pages project site); '' for a root domain.
//   NOINDEX=1            preview build: every page gets <meta name="robots" content="noindex">.
// Minifies CSS and JS, inlines the tiny font stylesheet, drops source-only folders.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { transform } from 'esbuild';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'dist');
const BASE = (process.env.BASE || '').replace(/\/$/, '');
const NOINDEX = process.env.NOINDEX === '1';

// Never shipped: sources, originals, tooling.
const SKIP = new Set(['_src', 'dist', 'node_modules', '.git', '.github', '.claude', 'assets/img/site', 'package.json', 'package-lock.json', 'brand-spec.md', 'README.md']);

fs.rmSync(OUT, { recursive: true, force: true });

const fontsCss = fs.readFileSync(path.join(ROOT, 'assets/css/fonts.css'), 'utf8').replace(/url\(\.\.\/fonts\//g, `url(${BASE}/assets/fonts/`);
const fontsInline = (await transform(fontsCss, { loader: 'css', minify: true })).code.trim();

function rewriteHtml(html) {
  const b = BASE;
  html = html
    // root-relative URLs in attributes (not protocol-relative //)
    .replace(/(\s(?:href|src|poster|action|data-[\w-]+)=")\/(?!\/)/g, `$1${b}/`)
    // every candidate in srcset
    .replace(/(\ssrcset=")([^"]*)"/g, (_, a, v) => a + v.replace(/(^|,\s*)\/(?!\/)/g, `$1${b}/`) + '"')
    // paths inside JSON held in data attributes
    .replace(/&quot;\/(?!\/)/g, `&quot;${b}/`)
    .replace('<html lang="en-IN" class="no-js">', `<html lang="en-IN" class="no-js" data-base="${b}">`)
    // one fewer render-blocking request: the font-face rules go inline
    .replace(/<link rel="stylesheet" href="[^"]*fonts\.css">/, `<style>${fontsInline}</style>`);
  if (NOINDEX) html = html.replace(/<meta name="robots" content="[^"]*">/, '<meta name="robots" content="noindex,nofollow">');
  return html;
}

async function copy(rel) {
  if (SKIP.has(rel.replace(/\\/g, '/'))) return;
  const src = path.join(ROOT, rel), dst = path.join(OUT, rel);
  const st = fs.statSync(src);
  if (st.isDirectory()) {
    if (rel && path.basename(rel).startsWith('.')) return;
    for (const f of fs.readdirSync(src)) await copy(path.join(rel, f));
    return;
  }
  if (!rel.includes(path.sep) && !/\.(html|txt|xml)$/.test(rel)) return; // root: only site files
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  const ext = path.extname(rel);
  if (ext === '.html') return fs.writeFileSync(dst, rewriteHtml(fs.readFileSync(src, 'utf8')));
  if (ext === '.css' || (ext === '.js' && !rel.includes('vendor'))) {
    const code = fs.readFileSync(src, 'utf8');
    const out = await transform(code, { loader: ext.slice(1), minify: true, target: ['es2017', 'chrome61', 'safari11', 'firefox60'] });
    return fs.writeFileSync(dst, out.code);
  }
  fs.copyFileSync(src, dst);
}

await copy('');
fs.writeFileSync(path.join(OUT, '.nojekyll'), '');

let bytes = 0, files = 0;
(function walk(d) { for (const f of fs.readdirSync(d)) { const p = path.join(d, f), s = fs.statSync(p); if (s.isDirectory()) walk(p); else { bytes += s.size; files++; } } })(OUT);
console.log(`dist: ${files} files, ${(bytes / 1048576).toFixed(1)} MB, base "${BASE || '/'}"${NOINDEX ? ', noindex' : ''}`);
