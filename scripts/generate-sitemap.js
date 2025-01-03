const fs = require('fs');
const path = require('path');

const baseUrl = 'https://fintechpulsenetwork.com';

// Define main routes with high priority for sitelinks
const routes = [
  {
    url: '/',
    priority: 1.0,
    changefreq: 'daily'
  },
  {
    url: '/about',
    priority: 0.9,
    changefreq: 'weekly'
  },
  {
    url: '/insights',
    priority: 0.9,
    changefreq: 'daily'
  },
  {
    url: '/fintech-hub',
    priority: 0.9,
    changefreq: 'daily'
  },
  {
    url: '/pulse-ai',
    priority: 0.9,
    changefreq: 'weekly'
  }
];

// Generate sitemap XML
const generateSitemap = (routes) => {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  routes.forEach(route => {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}${route.url}</loc>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>';
  return xml;
};

// Write sitemap to public directory
const sitemap = generateSitemap(routes);
fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap);
console.log('Sitemap generated successfully!');
