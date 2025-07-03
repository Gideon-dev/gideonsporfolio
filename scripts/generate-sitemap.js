// scripts/generate-sitemap.js
import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateSitemap() {
  const sitemap = new SitemapStream({ hostname: 'https://gideons3dporfolio.vercel.app' });

  const writeStream = createWriteStream(path.resolve(__dirname, '../public/sitemap.xml'));
  sitemap.pipe(writeStream);

  const routes = [
    '/',
    '/about',
    '/projects',
    '/contact',
  ];

  routes.forEach(route => {
    sitemap.write({ url: route, changefreq: 'weekly', priority: 0.8 });
  });

  sitemap.end();

  await streamToPromise(sitemap);
  console.log('Sitemap generated at public/sitemap.xml');
}

generateSitemap().catch(console.error);
