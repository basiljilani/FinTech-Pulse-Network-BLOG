const fs = require('fs');
const path = require('path');
const glob = require('glob');

const DOMAIN = 'https://fintechpulsenetwork.com'; // Replace with your actual domain

function generateSitemap() {
  // Get all pages and blog posts
  const pages = glob.sync('src-2-frontend/pages/**/*.tsx')
    .filter(file => !file.includes('[') && !file.includes('_')) // Exclude dynamic and special pages
    .map(file => file.replace('src-2-frontend/pages/', '').replace('.tsx', ''));

  const blogPosts = glob.sync('public/content/**/*.md')
    .map(file => file.replace('public/content/', '').replace('.md', ''));

  // Create sitemap entries
  const sitemapEntries = [
    // Static pages
    ...pages.map(page => ({
      url: `${DOMAIN}/${page === 'index' ? '' : page}`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: page === 'index' ? '1.0' : '0.8'
    })),

    // Blog posts
    ...blogPosts.map(post => ({
      url: `${DOMAIN}/blog/${post}`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: '0.6'
    }))
  ];

  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.map(entry => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  // Write sitemap to public directory
  fs.writeFileSync('public/sitemap.xml', sitemap);
  console.log('Sitemap generated successfully!');
}

generateSitemap();
