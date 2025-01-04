import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  article?: boolean;
  pathname?: string;
}

export const SEO = ({
  title = 'FinTech Pulse Network - AI-Powered Financial Content Automation',
  description = 'Transform your financial content creation with our advanced AI automation platform. Get real-time market insights and automated financial analysis.',
  image = '/social-preview.png',
  article = false,
  pathname = '',
}: SEOProps) => {
  const siteUrl = 'https://fintechpulsenetwork.com';
  const canonical = pathname ? `${siteUrl}${pathname}` : siteUrl;

  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:site_name" content="FinTech Pulse Network" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${image}`} />
      <meta property="og:type" content={article ? 'article' : 'website'} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@fintechpulse" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${image}`} />

      {/* Schema.org structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'http://schema.org',
          '@type': article ? 'Article' : 'WebSite',
          name: title,
          headline: title,
          description: description,
          image: `${siteUrl}${image}`,
          url: canonical,
          sameAs: [
            'https://twitter.com/fintechpulse',
            'https://linkedin.com/company/fintech-pulse-network'
          ],
          ...(article && {
            datePublished: new Date().toISOString(),
            dateModified: new Date().toISOString(),
            publisher: {
              '@type': 'Organization',
              name: 'FinTech Pulse Network',
              logo: {
                '@type': 'ImageObject',
                url: `${siteUrl}/pulse-logo.png`
              }
            }
          })
        })}
      </script>
    </Helmet>
  );
};
