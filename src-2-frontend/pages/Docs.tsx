import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Search, BookOpen, Code, Database, Network, Shield, ArrowRight } from 'lucide-react';

interface DocSection {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  sections: {
    title: string;
    articles: {
      title: string;
      path: string;
    }[];
  }[];
}

const documentationSections: DocSection[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Learn the basics of FPN and get started with our platform.',
    icon: <BookOpen className="w-6 h-6" />,
    sections: [
      {
        title: 'Introduction',
        articles: [
          { title: 'What is FPN?', path: '/docs/intro/what-is-fpn' },
          { title: 'Quick Start Guide', path: '/docs/intro/quick-start' },
          { title: 'Core Concepts', path: '/docs/intro/core-concepts' }
        ]
      }
    ]
  },
  {
    id: 'api-reference',
    title: 'API Reference',
    description: 'Detailed documentation for FPN APIs and integrations.',
    icon: <Code className="w-6 h-6" />,
    sections: [
      {
        title: 'REST API',
        articles: [
          { title: 'Authentication', path: '/docs/api/authentication' },
          { title: 'Endpoints', path: '/docs/api/endpoints' },
          { title: 'Rate Limits', path: '/docs/api/rate-limits' }
        ]
      }
    ]
  },
  {
    id: 'data-integration',
    title: 'Data Integration',
    description: 'Learn how to integrate and manage data with FPN.',
    icon: <Database className="w-6 h-6" />,
    sections: [
      {
        title: 'Data Sources',
        articles: [
          { title: 'Connecting Data Sources', path: '/docs/data/sources' },
          { title: 'Data Models', path: '/docs/data/models' },
          { title: 'Data Security', path: '/docs/data/security' }
        ]
      }
    ]
  }
];

const Docs: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSections = documentationSections.filter(section =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.sections.some(s =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.articles.some(a => a.title.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  );

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white">
      <Helmet>
        <title>Documentation | FinTech Pulse Network</title>
        <meta name="description" content="Technical documentation and guides for FinTech Pulse Network platform and APIs." />
      </Helmet>

      {/* Hero Section */}
      <div className="pt-40 pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#151B30] to-[#0A0F1E]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#8B5CF6] to-[#4F46E5] bg-clip-text text-transparent"
          >
            Documentation
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-400"
          >
            Technical documentation and guides for FinTech Pulse Network platform and APIs
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-12"
        >
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-[#151B30] border border-[#2A3655] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#8B5CF6] transition-colors"
              />
            </div>
          </div>

          {/* Documentation Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSections.map((section) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="p-6 rounded-lg bg-[#151B30] border border-[#2A3655] hover:border-[#8B5CF6] transition-all duration-300"
              >
                <div className="flex items-center mb-4 text-[#8B5CF6]">
                  {section.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{section.title}</h3>
                <p className="text-gray-400 mb-4">{section.description}</p>
                {section.sections.map((subsection, index) => (
                  <div key={index} className="mt-4">
                    <h4 className="text-sm font-semibold text-gray-300 mb-2">{subsection.title}</h4>
                    <ul className="space-y-2">
                      {subsection.articles.map((article, articleIndex) => (
                        <li key={articleIndex}>
                          <a
                            href={article.path}
                            className="flex items-center text-gray-400 hover:text-[#8B5CF6] transition-colors"
                          >
                            <ArrowRight className="w-4 h-4 mr-2" />
                            {article.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Docs;
