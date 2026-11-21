import fs from 'node:fs';
import path from 'node:path';

const DIST = path.join(process.cwd(), 'dist');
if (!fs.existsSync(DIST)) {
  console.error('dist/ folder not found. Run npm run build first.');
  process.exit(1);
}

const htmlFiles = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.html')) htmlFiles.push(full);
  }
}
walk(DIST);

const missingLinks = new Set();
const affiliateMissingRel = [];
const tutorialHasRegisterBtn = [];
const missingCanonical = [];
const missingTitle = [];

for (const file of htmlFiles) {
  const relPath = '/' + path.relative(DIST, file).replace(/\\/g, '/');
  const html = fs.readFileSync(file, 'utf8');

  if (!relPath.endsWith('/404.html')) {
    if (!/<link rel="canonical" href="https:\/\/offerairport\.cc\//.test(html)) {
      missingCanonical.push(relPath);
    }
    if (!/<title>.+<\/title>/.test(html)) {
      missingTitle.push(relPath);
    }
  }

  // Check internal links
  const hrefMatches = [...html.matchAll(/href="(\/[^"#?]*)"/g)];
  for (const m of hrefMatches) {
    const target = m[1];
    if (target.startsWith('/_astro/') || target.startsWith('/pagefind/') || target.startsWith('/logos/') || target.startsWith('/images/') || target === '/favicon.svg' || target === '/robots.txt' || target === '/sitemap-index.xml') {
      continue;
    }
    const diskPath = target === '/'
      ? path.join(DIST, 'index.html')
      : target.endsWith('/')
        ? path.join(DIST, target.slice(1), 'index.html')
        : path.join(DIST, target.slice(1));
    if (!fs.existsSync(diskPath)) {
      missingLinks.add(`${relPath} -> ${target}`);
    }
  }

  // Check affiliate links compliance (any external aff URL must have nofollow sponsored noopener)
  const extLinks = [...html.matchAll(/<a\s+[^>]*href="https:\/\/[^"]*(aff\.com|aff\.cc|xingdaomeng|civetnet|ladderaff)[^"]*"[^>]*>/gi)];
  for (const m of extLinks) {
    const tag = m[0];
    if (!/rel="[^"]*nofollow[^"]*sponsored[^"]*noopener[^"]*"/.test(tag) || !/target="_blank"/.test(tag)) {
      affiliateMissingRel.push(`${relPath}: ${tag}`);
    }
    if (relPath.startsWith('/clash/') || relPath.startsWith('/guides/') || relPath.startsWith('/resources/')) {
      tutorialHasRegisterBtn.push(relPath);
    }
  }
}

const hasSitemap = fs.existsSync(path.join(DIST, 'sitemap-index.xml')) || fs.existsSync(path.join(DIST, 'sitemap-0.xml'));
const hasRobots = fs.existsSync(path.join(DIST, 'robots.txt'));
const has404 = fs.existsSync(path.join(DIST, '404.html'));
const hasPagefind = fs.existsSync(path.join(DIST, 'pagefind', 'pagefind.js'));

console.log('=== QA Audit Summary ===');
console.log(`Total HTML pages built: ${htmlFiles.length}`);
console.log(`Sitemap exists: ${hasSitemap}`);
console.log(`Robots.txt exists: ${hasRobots}`);
console.log(`404.html exists: ${has404}`);
console.log(`Pagefind index exists: ${hasPagefind}`);
console.log(`Missing internal link targets: ${missingLinks.size}`);
if (missingLinks.size > 0) console.log([...missingLinks].slice(0, 20));
console.log(`Affiliate links missing rel/target: ${affiliateMissingRel.length}`);
if (affiliateMissingRel.length > 0) console.log(affiliateMissingRel);
console.log(`Tutorial pages containing affiliate links: ${tutorialHasRegisterBtn.length}`);
console.log(`Pages missing canonical: ${missingCanonical.length}`);
console.log(`Pages missing title: ${missingTitle.length}`);

if (
  !hasSitemap ||
  !hasRobots ||
  !has404 ||
  !hasPagefind ||
  missingLinks.size > 0 ||
  affiliateMissingRel.length > 0 ||
  tutorialHasRegisterBtn.length > 0 ||
  missingCanonical.length > 0 ||
  missingTitle.length > 0
) {
  process.exit(1);
}
console.log('ALL QA CHECKS PASSED!');
