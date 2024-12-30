import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react';
import { categories } from '../data/articles';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArticleContent, getArticleContent } from '../lib/content';

const MarkdownContent = ({ content = '' }: { content: string }) => (
  <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    components={{
      h1: ({ children }) => (
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white">
          {children}
        </h1>
      ),
      h2: ({ children }) => (
        <h2 className="text-3xl font-bold mb-6 text-white">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-2xl font-bold mb-4 text-white">
          {children}
        </h3>
      ),
      p: ({ children }) => (
        <p className="text-gray-300 leading-relaxed mb-6 text-lg">
          {children}
        </p>
      ),
      ul: ({ children }) => (
        <ul className="list-disc list-inside mb-6 text-gray-300">
          {children}
        </ul>
      ),
      ol: ({ children }) => (
        <ol className="list-decimal list-inside mb-6 text-gray-300">
          {children}
        </ol>
      ),
      li: ({ children }) => (
        <li className="mb-2 text-lg leading-relaxed">
          {children}
        </li>
      ),
    }}
  >
    {content}
  </ReactMarkdown>
);

const Article = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<ArticleContent | null>(null);
  const [similarArticles, setSimilarArticles] = useState<ArticleContent[]>([]);
  const [loading, setLoading] = useState(true);

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
            const similar = data.articles
              .filter((a: ArticleContent) => 
                a.id !== id && a.category === content?.category
              )
              .slice(0, 2);
            setSimilarArticles(similar);
          }
        }
        
        setLoading(false);
      }
    }
    loadArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0F1E] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8B5CF6] mx-auto mb-4"></div>
          <p className="text-gray-400">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-[#0A0F1E] text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Article not found</h2>
          <button
            onClick={() => navigate('/insights')}
            className="text-[#8B5CF6] hover:text-white transition-colors"
          >
            Return to Insights
          </button>
        </div>
      </div>
    );
  }

  const category = categories.find(c => c.id === article.category);

  const handleShare = async () => {
    try {
      await navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => navigate('/insights')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Insights
          </button>
          <button 
            onClick={handleShare}
            className="ml-auto flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <Share2 className="w-5 h-5" />
            Share
          </button>
        </div>

        {/* Article Meta */}
        <div className="flex items-center gap-4 mb-6">
          <span className="px-3 py-1 text-sm rounded-full bg-[#8B5CF6]/20 text-[#8B5CF6]">
            {category?.name}
          </span>
          <span className="flex items-center text-sm text-gray-400">
            <Clock className="w-4 h-4 mr-1" />
            {article.readTime}
          </span>
          <span className="flex items-center text-sm text-gray-400">
            <Calendar className="w-4 h-4 mr-1" />
            {new Date(article.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
        </div>

        {/* Article Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
          {article.title}
        </h1>

        {/* Author Info */}
        <div className="flex items-center gap-4 mb-12 pb-12 border-b border-gray-800">
          <div>
            <div className="font-medium text-lg">{article.author.name}</div>
            <div className="text-gray-400">{article.author.role}</div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <MarkdownContent content={article.content || ''} />
      </div>

      {/* Similar Articles */}
      {similarArticles.length > 0 && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="border-t border-gray-800 pt-16">
            <h2 className="text-2xl font-semibold text-white mb-8">Similar Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {similarArticles.map((article) => (
                <article
                  key={article.id}
                  className="bg-[#1A1F2E] rounded-lg p-6 hover:bg-[#252B3B] transition-colors"
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
                    
                    <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2 hover:text-[#8B5CF6] transition-colors">
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
