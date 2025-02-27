import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Clock, Calendar, Search, Landmark, Brain, FileText } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { categories } from '../data/articles';
import type { ArticleContent } from '../lib/content';
import MagicalLibraryBackground from '../components/MagicalLibraryBackground';

const Insights: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState<ArticleContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  const pageTitle = "FinTech Insights & Analysis | FinTech Pulse Network";
  const pageDescription = "Explore the latest insights on FinTech innovation, AI in finance, digital payments, and emerging market trends. Expert analysis by industry professionals.";
  const canonicalUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}${location.pathname}`
    : `https://fintechpulsenetwork.com${location.pathname}`;

  const prefetchArticleIndex = async () => {
    try {
      const response = await fetch('/content/index.json');
      if (!response.ok) {
        throw new Error('Failed to load article index');
      }
      const data = await response.json();
      return data.articles || [];
    } catch (error) {
      console.error('Error prefetching articles:', error);
      throw error;
    }
  };

  const prefetchArticleContent = (id: string) => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = `/content/${id}.md`;
    document.head.appendChild(link);
  };

  useEffect(() => {
    async function loadArticles() {
      try {
        const articles = await prefetchArticleIndex();
        setArticles(articles);
        setError(null);
      } catch (error) {
        console.error('Error loading articles:', error);
        setError('Failed to load articles');
        setArticles([]);
      } finally {
        setLoading(false);
      }
    }
    
    // Try to load immediately
    prefetchArticleIndex()
      .then(articles => {
        setArticles(articles);
        setLoading(false);
      })
      .catch(() => {
        // If prefetch failed, try loading again
        loadArticles();
      });
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  const filteredArticles = articles.filter(article => {
    const matchesFilter = activeFilter === 'all' || article.category === activeFilter;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0F1E] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8B5CF6] mx-auto mb-4"></div>
          <p className="text-gray-400">Loading articles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0A0F1E] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="text-[#8B5CF6] hover:text-white transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case 'fintech':
        return <Landmark className="w-5 h-5" />;
      case 'ai-ml':
        return <Brain className="w-5 h-5" />;
      case 'research':
        return <FileText className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph tags */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="FinTech Pulse Network" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        
        {/* Additional SEO meta tags */}
        <meta name="keywords" content="fintech, financial technology, digital payments, AI in finance, banking innovation, financial inclusion" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Basil Jilani" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "FinTech Pulse Network Insights",
            "description": pageDescription,
            "url": canonicalUrl,
            "author": {
              "@type": "Person",
              "name": "Basil Jilani",
              "jobTitle": "FinTech Expert"
            },
            "publisher": {
              "@type": "Organization",
              "name": "FinTech Pulse Network"
            }
          })}
        </script>
      </Helmet>
      <div className="min-h-screen bg-[#0A0F1E] text-gray-100 pb-20">      
        {/* Hero Section */}
        <div className="relative min-h-[60vh] flex items-center justify-center mb-8">
          <MagicalLibraryBackground />
          <div className="relative z-10 text-center px-4 py-16 max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              FinTech Insights & Analysis
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed"
            >
              Explore the latest trends, innovations, and expert analysis in the world of Financial Technology
            </motion.p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="container mx-auto px-4 mb-12">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search insights..."
              className="w-full pl-12 pr-4 py-3 bg-[#1E293B] rounded-xl border border-gray-700 focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] transition-colors text-white placeholder-gray-400"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="container mx-auto px-4 mb-12">
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => handleFilterChange('all')}
              className={`px-6 py-3 rounded-2xl transition-all duration-300 ${
                activeFilter === 'all'
                  ? 'bg-[#8B5CF6] text-white'
                  : 'bg-[#1E293B] text-gray-400 hover:bg-[#1E293B]/70'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleFilterChange(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl transition-all duration-300 ${
                  activeFilter === category.id
                    ? 'bg-[#8B5CF6] text-white'
                    : 'bg-[#1E293B] text-gray-400 hover:bg-[#1E293B]/70'
                }`}
              >
                {getCategoryIcon(category.id)}
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="container mx-auto px-4">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">No articles found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                  onMouseEnter={() => prefetchArticleContent(article.id)}
                  className="bg-[#1E293B] rounded-2xl overflow-hidden"
                >
                  <Link to={`/articles/${article.id}`} className="block p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-3 py-1 text-sm rounded-full bg-[#8B5CF6]/20 text-[#8B5CF6]">
                        {categories.find(c => c.id === article.category)?.name}
                      </span>
                      <span className="flex items-center text-sm text-gray-400">
                        <Clock className="w-4 h-4 mr-1" />
                        {article.readTime}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2 group-hover:text-[#8B5CF6] transition-colors">
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-400 mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                      <div>
                        <div className="text-sm font-medium text-white">
                          {article.author.name}
                        </div>
                        <div className="text-sm text-gray-400">
                          {article.author.role}
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(article.date).toLocaleDateString()}
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Insights;
