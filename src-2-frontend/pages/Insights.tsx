import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, Calendar, Search, Landmark, Brain, FileText } from 'lucide-react';
import { categories } from '../data/articles';
import type { ArticleContent } from '../lib/content';

const Insights: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState<ArticleContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadArticles() {
      try {
        const response = await fetch('/content/index.json');
        if (!response.ok) {
          throw new Error('Failed to load article index');
        }
        const data = await response.json();
        setArticles(data.articles || []);
        setError(null);
      } catch (error) {
        console.error('Error loading articles:', error);
        setError('Failed to load articles');
        setArticles([]);
      } finally {
        setLoading(false);
      }
    }
    loadArticles();
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
    <div className="min-h-screen bg-[#0A0F1E] text-gray-100 pb-20">      
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#8B5CF6] via-[#6366F1] to-[#3B82F6] px-2 py-4 leading-normal">
            Insights & Analysis
          </h1>
          <div className="space-y-6">
            <p className="text-xl md:text-2xl px-4 leading-relaxed">
              <span className="bg-gradient-to-r from-gray-100 to-gray-300 text-transparent bg-clip-text inline-block py-1">
                Unlock the power of informed decision-making with our comprehensive insights. Dive into expert analyses, uncover emerging trends, and access strategic recommendations tailored to elevate your strategy.
              </span>
            </p>
            <p className="text-xl md:text-2xl px-4 leading-relaxed">
              <span className="bg-gradient-to-r from-gray-200 to-gray-400 text-transparent bg-clip-text inline-block py-1">
                Stay ahead of the curve and make confident choices for a successful future.
              </span>
            </p>
          </div>
        </motion.div>
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
            {filteredArticles.map((article) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="group bg-[#1E293B] rounded-2xl overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300"
              >
                <Link to={`/insights/${article.id}`} className="block p-6">
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
                      <div className="text-xs text-gray-400">
                        {article.author.role}
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(article.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Insights;
