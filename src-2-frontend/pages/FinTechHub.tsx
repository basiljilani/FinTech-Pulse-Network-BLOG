import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FinTechHub: React.FC = () => {
  const featuredArticle = {
    category: 'Environmental Sustainability',
    title: 'The Future of Green Finance: How ESG is Reshaping Markets',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
    link: '/insights/green-finance'
  };

  const sideArticles = [
    {
      category: 'Innovation',
      title: 'AI-Powered Risk Assessment in Modern Banking',
      excerpt: 'How machine learning is transforming risk management strategies.',
      author: 'Michael Chen',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2070&auto=format&fit=crop',
      link: '/insights/ai-risk-assessment'
    },
    {
      category: 'Business and Society',
      title: 'The Impact of DeFi on Traditional Banking',
      excerpt: 'Understanding the shift in financial paradigms and its implications.',
      author: 'Sarah Williams',
      image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2032&auto=format&fit=crop',
      link: '/insights/defi-impact'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Coming Soon Overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 top-[64px] z-40 bg-gray-900/90 backdrop-blur-sm flex items-center justify-center"
      >
        <div className="text-center px-4 -mt-[32px]">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Coming Soon</h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl">
              We're working on something exciting! The FinTech Hub will be launching soon with cutting-edge insights and analysis.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Fixed Navigation Bar */}
      <div className="fixed top-[64px] left-0 right-0 bg-gray-950 shadow-lg shadow-black/20 backdrop-blur-lg z-30 border-b border-gray-800">
        <div className="max-w-5xl mx-auto px-4">
          <nav className="flex justify-center space-x-6 py-3 overflow-x-auto">
            {['Latest', 'Magazine', 'Topics', 'Podcasts', 'Store', 'The Big Idea', 'Data & Visuals', 'Case Selections'].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors whitespace-nowrap"
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-16">
        {/* Featured Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          {/* Main Featured Article */}
          <motion.div 
            className="lg:col-span-8 relative group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to={featuredArticle.link} className="block">
              <div className="relative h-[500px] rounded-2xl overflow-hidden">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                <div className="absolute bottom-0 p-8">
                  <h1 className="text-4xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors">
                    {featuredArticle.title}
                  </h1>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Side Articles */}
          <div className="lg:col-span-4 grid grid-cols-1 gap-6">
            {sideArticles.map((article, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Link to={article.link} className="block">
                  <div className="relative h-[240px] rounded-2xl overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                    <div className="absolute bottom-0 p-6">
                      <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {article.title}
                      </h2>
                      <p className="text-gray-300 text-sm mt-2">{article.excerpt}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Case Studies Section */}
        <div className="mt-20 mb-16">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">Featured Case Studies</h2>
              <p className="text-gray-400">In-depth analysis of successful FinTech implementations</p>
            </div>
            <Link to="/case-studies" className="text-emerald-400 hover:text-emerald-300 transition-colors">
              View All Case Studies →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Digital Banking Transformation at Scale',
                company: 'Global Finance Corp',
                category: 'Digital Banking',
                image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop',
                metrics: ['250% increase in mobile users', '45% reduction in operational costs']
              },
              {
                title: 'Blockchain Integration for Cross-Border Payments',
                company: 'PayTech Solutions',
                category: 'Blockchain',
                image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2070&auto=format&fit=crop',
                metrics: ['90% faster settlements', '60% lower transaction fees']
              },
              {
                title: 'AI-Driven Risk Assessment Platform',
                company: 'RiskGuard Financial',
                category: 'AI & ML',
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
                metrics: ['85% accuracy in risk prediction', '40% reduction in defaults']
              }
            ].map((study, index) => (
              <motion.div
                key={index}
                className="group relative bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="relative h-48">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm text-gray-400 mb-2">{study.company}</div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors">
                    {study.title}
                  </h3>
                  <div className="space-y-2">
                    {study.metrics.map((metric, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-300">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
                        {metric}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-16 pt-12 border-t border-gray-800">
          {/* Popular Section */}
          <div className="md:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-white mb-8">Popular</h2>
              <div className="space-y-6">
                {["Leaders Shouldn't Try to Do It All", "4 Listening Skills Leaders Need to Master", "The 10 Most Popular FinTech Articles of 2024"].map((title, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Link to="#" className="block group">
                      <h3 className="text-xl text-gray-300 group-hover:text-emerald-400 transition-colors">
                        {title}
                      </h3>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Newsletters Section */}
          <div className="md:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">Newsletters</h2>
                <Link to="/newsletters" className="text-gray-400 hover:text-white transition-colors">
                  More →
                </Link>
              </div>
              <div className="space-y-8">
                {[
                  {
                    title: 'Weekly Hotlist',
                    description: 'A roundup of FinTech Pulse Network\'s most popular ideas and advice.',
                    color: 'bg-emerald-500/20'
                  },
                  {
                    title: 'FinTech Insights',
                    description: 'Resources, practical advice, and market analysis to keep you informed.',
                    color: 'bg-blue-500/20'
                  }
                ].map((newsletter, index) => (
                  <motion.div
                    key={index}
                    className="group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  >
                    <div className={`p-6 rounded-xl ${newsletter.color} backdrop-blur-sm`}>
                      <h3 className="text-lg font-bold text-white mb-2">{newsletter.title}</h3>
                      <p className="text-gray-300 text-sm mb-4">{newsletter.description}</p>
                      <button className="text-white group-hover:text-emerald-400 transition-colors font-medium">
                        Sign Up →
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Subscriber Exclusives */}
          <div className="md:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-white mb-2">FPN Subscriber Exclusives</h2>
              <p className="text-gray-400 mb-8">Access for subscribers only.</p>
              <div className="space-y-8">
                {[
                  {
                    category: 'Case Studies',
                    title: 'DeFi Revolution: The Future of Banking',
                    image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=2070&auto=format&fit=crop'
                  },
                  {
                    category: 'Data & Visuals',
                    title: 'Cryptocurrency Market Trends Analysis',
                    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop'
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="group"
                  >
                    <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {item.title}
                    </h3>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Podcasts Section */}
          <div className="md:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">Podcasts</h2>
                <Link to="/podcasts" className="text-gray-400 hover:text-white transition-colors">
                  More →
                </Link>
              </div>
              <div className="space-y-8">
                {[
                  {
                    category: 'Strategy',
                    title: 'How Fintech Startups Are Disrupting Traditional Banking',
                    gradient: 'from-purple-500 to-pink-500'
                  },
                  {
                    category: 'Leadership',
                    title: 'Building the Future of Digital Finance',
                    gradient: 'from-blue-500 to-cyan-500'
                  }
                ].map((podcast, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-4 group"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                  >
                    <div className="flex-shrink-0">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${podcast.gradient}`}></div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                        {podcast.title}
                      </h3>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinTechHub;
