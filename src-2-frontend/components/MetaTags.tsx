import { Helmet } from 'react-helmet-async';
import React from 'react';

interface MetaTagsProps {
  // Core meta properties
  title: string;
  description: string;
  path: string; // Current page path (e.g., '/insights' or '/blog/defi-lending')
  
  // Optional properties
  type?: 'website' | 'article';
  imageUrl?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  keywords?: string[];
  noindex?: boolean;
}

const MetaTags: React.FC<MetaTagsProps> = ({
  title,
  description,
  path,
  type = 'website',
  imageUrl = '/images/default-og.jpg',
  publishedTime,
  modifiedTime,
  author,
  keywords,
  noindex = false,
}) => {
  // Base configuration
  const BASE_URL = 'https://fintechpulsenetwork.com';
  const SITE_NAME = 'FinTech Pulse Network';
  const TWITTER_HANDLE = '@fintechpulse';
  
  // Construct full URLs
  const canonicalUrl = `${BASE_URL}${path}`;
  const fullImageUrl = imageUrl.startsWith('http') ? imageUrl : `${BASE_URL}${imageUrl}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{`${title} | ${SITE_NAME}`}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* OpenGraph Meta Tags */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:locale" content="en_US" />

      {/* Article Specific Meta Tags */}
      {type === 'article' && (
        <>
          {publishedTime && (
            <meta property="article:published_time" content={publishedTime} />
          )}
          {modifiedTime && (
            <meta property="article:modified_time" content={modifiedTime} />
          )}
          {author && <meta property="article:author" content={author} />}
        </>
      )}

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      
      {/* Additional Meta Tags for SEO */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      
      {/* JSON-LD Schema for Rich Snippets */}
      {type === 'article' ? (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": title,
            "description": description,
            "image": fullImageUrl,
            "author": {
              "@type": "Person",
              "name": author || "FinTech Pulse Network"
            },
            "publisher": {
              "@type": "Organization",
              "name": SITE_NAME,
              "logo": {
                "@type": "ImageObject",
                "url": `${BASE_URL}/logo.png`
              }
            },
            "datePublished": publishedTime,
            "dateModified": modifiedTime || publishedTime,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": canonicalUrl
            }
          })}
        </script>
      ) : (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": SITE_NAME,
            "url": BASE_URL,
            "description": description,
            "potentialAction": {
              "@type": "SearchAction",
              "target": `${BASE_URL}/search?q={search_term_string}`,
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      )}
    </Helmet>
  );
};

export default MetaTags;
