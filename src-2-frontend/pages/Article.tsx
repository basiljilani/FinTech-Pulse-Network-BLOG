import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Share2, Twitter, Facebook, Linkedin, Link2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { categories } from '../data/articles';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArticleContent, getArticleContent } from '../lib/content';

const MarkdownContent = ({ content = '' }: { content: string }) => (
  <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    components={{
      h1: ({ children }) => (
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-article-heading">
          {children}
        </h1>
      ),
      h2: ({ children }) => (
        <h2 className="text-3xl font-bold mb-6 text-article-heading">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-2xl font-bold mb-4 text-article-heading">
          {children}
        </h3>
      ),
      p: ({ children }) => (
        <p className="text-article-text leading-relaxed mb-6 text-lg">
          {children}
        </p>
      ),
      ul: ({ children }) => (
        <ul className="list-disc list-inside mb-6 text-article-text">
          {children}
        </ul>
      ),
      ol: ({ children }) => (
        <ol className="list-decimal list-inside mb-6 text-article-text">
          {children}
        </ol>
      ),
      li: ({ children }) => (
        <li className="mb-2 text-article-text">
          {children}
        </li>
      ),
      a: ({ children, href }) => (
        <a href={href} className="text-article-link hover:underline">
          {children}
        </a>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-article-link pl-4 my-4 text-article-text italic">
          {children}
        </blockquote>
      ),
      code: ({ children }) => (
        <code className="bg-article-highlight px-2 py-1 rounded text-article-text">
          {children}
        </code>
      ),
      pre: ({ children }) => (
        <pre className="bg-article-highlight p-4 rounded-lg overflow-x-auto mb-6 text-article-text">
          {children}
        </pre>
      ),
    }}
  >
    {content}
  </ReactMarkdown>
);

interface ScoredArticle extends ArticleContent {
  score: number;
}

const Article = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<ArticleContent | null>(null);
  const [similarArticles, setSimilarArticles] = useState<ArticleContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.share-menu') && !target.closest('.share-button')) {
        setIsShareMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsShareMenuOpen(!isShareMenuOpen);
  };

  useEffect(() => {
    async function loadArticle() {
      if (id) {
        const content = await getArticleContent(id);
        if (content) {
          setArticle(content);
          
          // Load similar articles
          const response = await fetch('/content/index.json');
          if (response.ok) {
            const data = await response.json();
            // Filter out the current article
            const otherArticles = data.articles.filter((a: ArticleContent) => a.id !== id);
            
            // Score each article based on category and content similarity
            const scoredArticles = otherArticles.map((a: ArticleContent) => {
              let score = 0;
              // Category match gives highest score
              if (a.category === content?.category) score += 3;
              // Check title and excerpt for relevant keywords
              const keywords = content?.title.toLowerCase().split(' ');
              keywords?.forEach(word => {
                if (word.length > 3 && a.title.toLowerCase().includes(word)) score += 1;
                if (word.length > 3 && a.excerpt.toLowerCase().includes(word)) score += 0.5;
              });
              return { ...a, score } as ScoredArticle;
            });
            
            // Sort by score and take top 2
            const similar = scoredArticles
              .sort((a: ScoredArticle, b: ScoredArticle) => b.score - a.score)
              .slice(0, 2)
              .map(({ score, ...article }: ScoredArticle) => article);
            
            setSimilarArticles(similar);
          }
        }
        
        setLoading(false);
      }
    }
    loadArticle();
  }, [id]);

  const handleNativeShare = async () => {
    try {
      await navigator.share({
        title: article?.title,
        text: article?.excerpt,
        url: window.location.href,
      });
      setIsShareMenuOpen(false);
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
      setIsShareMenuOpen(false);
    } catch (error) {
      console.log('Error copying link:', error);
    }
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(`${article?.title}\n\nvia @FintechPulse`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    setIsShareMenuOpen(false);
  };

  const shareOnLinkedIn = () => {
    const text = encodeURIComponent(
      `Check out this article on FinTech Pulse Network:\n\n${article?.title}\n\n${article?.excerpt}\n\n`
    );
    const url = encodeURIComponent(window.location.href);
    
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}&text=${text}`,
      '_blank',
      'width=600,height=600'
    );
    setIsShareMenuOpen(false);
  };

  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    setIsShareMenuOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-article-bg text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-article-link mx-auto mb-4"></div>
          <p className="text-gray-400">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-article-bg text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Article not found</h2>
          <button
            onClick={() => navigate('/insights')}
            className="text-article-link hover:text-article-text transition-colors"
          >
            Return to Insights
          </button>
        </div>
      </div>
    );
  }

  const category = categories.find(c => c.id === article.category);
  const baseUrl = import.meta.env.VITE_BASE_URL || 'https://fintechpulsenetwork.com';
  const articleUrl = `${baseUrl}/articles/${id}`;
  const imageUrl = `${baseUrl}/images/articles/${id}.jpg`; // Assuming you have article images

  return (
    <div className="min-h-screen bg-article-bg">
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{article.title} | FinTech Pulse Network</title>
        <meta name="description" content={article.excerpt} />
        <link rel="canonical" href={articleUrl} />

        {/* Open Graph Meta Tags for Facebook and LinkedIn */}
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:url" content={articleUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:site_name" content="FinTech Pulse Network" />

        {/* Article Specific Meta Tags */}
        <meta property="article:published_time" content={article.date} />
        <meta property="article:author" content={article.author.name} />
        <meta property="article:section" content={category?.name} />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.excerpt} />
        <meta name="twitter:image" content={imageUrl} />
        <meta name="twitter:site" content="@FintechPulse" />
      </Helmet>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => navigate('/insights')}
            className="flex items-center gap-2 text-article-text hover:text-article-highlight transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Insights
          </button>
          
          <div className="relative ml-auto">
            <button 
              onClick={handleShare}
              className="share-button flex items-center gap-2 text-article-text hover:text-article-highlight transition-colors px-4 py-2 rounded-lg"
            >
              <Share2 className="w-5 h-5" />
              Share
            </button>
            
            <AnimatePresence>
              {isShareMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="share-menu absolute right-full top-0 flex items-center gap-1 pr-2 mr-2 bg-article-accent rounded-xl shadow-lg z-50"
                >
                  {'share' in navigator && (
                    <motion.button
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0 }}
                      onClick={handleNativeShare}
                      className="p-2.5 text-gray-300 hover:text-article-text rounded-lg hover:bg-article-highlight transition-colors"
                      title="Share via..."
                    >
                      <Share2 className="w-5 h-5" />
                    </motion.button>
                  )}
                  <motion.button
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.05 }}
                    onClick={shareOnTwitter}
                    className="p-2.5 text-gray-300 hover:text-article-text rounded-lg hover:bg-article-highlight transition-colors"
                    title="Share on Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    onClick={shareOnLinkedIn}
                    className="p-2.5 text-gray-300 hover:text-article-text rounded-lg hover:bg-article-highlight transition-colors"
                    title="Share on LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    onClick={shareOnFacebook}
                    className="p-2.5 text-gray-300 hover:text-article-text rounded-lg hover:bg-article-highlight transition-colors"
                    title="Share on Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    onClick={handleCopyLink}
                    className="p-2.5 text-gray-300 hover:text-article-text rounded-lg hover:bg-article-highlight transition-colors"
                    title="Copy link"
                  >
                    {copySuccess ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <Link2 className="w-5 h-5" />
                    )}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Article Meta */}
        <div className="flex items-center gap-4 mb-6">
          <span className="px-3 py-1 text-sm rounded-full bg-article-highlight text-article-text">
            {category?.name}
          </span>
          <span className="flex items-center text-sm text-article-text">
            <Clock className="w-4 h-4 mr-1" />
            {article.readTime}
          </span>
          <span className="flex items-center text-sm text-article-text">
            <Calendar className="w-4 h-4 mr-1" />
            {new Date(article.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
        </div>

        {/* Article Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-article-heading">
          {article.title}
        </h1>

        {/* Author Info */}
        <div className="flex items-center gap-4 mb-12 pb-12 border-b border-article-border">
          <div>
            <div className="font-medium text-lg text-article-text">{article.author.name}</div>
            <div className="text-article-text opacity-80">{article.author.role}</div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-invert max-w-none">
          <MarkdownContent content={article?.content || ''} />
        </div>
      </div>

      {/* Similar Articles */}
      {similarArticles.length > 0 && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="border-t border-article-border pt-16">
            <h2 className="text-2xl font-semibold text-article-heading mb-8">Similar Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {similarArticles.map((article) => (
                <article
                  key={article.id}
                  className="bg-article-card rounded-lg shadow-lg transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <Link to={`/articles/${article.id}`} className="block p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-3 py-1 text-sm rounded-full bg-article-highlight text-article-text">
                        {categories.find(c => c.id === article.category)?.name}
                      </span>
                      <span className="flex items-center text-sm text-article-text">
                        <Clock className="w-4 h-4 mr-1" />
                        {article.readTime} min read
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-article-text mb-3 line-clamp-2 group-hover:text-article-heading transition-colors">
                      {article.title}
                    </h3>
                    
                    <p className="text-article-text opacity-80 mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-article-border">
                      <div>
                        <div className="text-sm font-medium text-article-text">
                          {article.author.name}
                        </div>
                        <div className="text-xs text-article-text opacity-70">
                          {article.author.role}
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-article-text opacity-80">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(article.date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Article;
