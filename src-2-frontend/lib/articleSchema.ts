export function generateArticleSchema(article: {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt,
    "author": {
      "@type": "Person",
      "name": article.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "FinTech Pulse Network",
      "logo": {
        "@type": "ImageObject",
        "url": "https://fintechpulsenetwork.com/pulse-logo.svg"
      }
    },
    "datePublished": article.date,
    "dateModified": article.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://fintechpulsenetwork.com/articles/${article.slug}`
    },
    "articleSection": article.category,
    "keywords": [
      "FinTech",
      "Financial Technology",
      article.category,
      ...article.title.toLowerCase().split(" ")
    ]
  };
}
