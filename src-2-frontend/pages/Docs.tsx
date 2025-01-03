import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Search, Users, MessagesSquare, HelpCircle, Bot, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DocSection {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  iconColor: string;
}

const documentationSections: DocSection[] = [
  {
    id: 'pulse-ai',
    title: 'Pulse AI',
    description: 'Documentation for our AI-powered financial analysis and insights engine.',
    icon: <Bot className="w-8 h-8 stroke-[2.5]" />,
    path: '/docs/pulse-ai',
    iconColor: 'text-blue-500'
  },
  {
    id: 'pulse-ai-v2',
    title: 'Pulse AI V2',
    description: 'Explore the next generation of our AI technology with enhanced capabilities.',
    icon: <Bot className="w-8 h-8 stroke-[2.5]" />,
    path: '/docs/pulse-ai-v2',
    iconColor: 'text-red-500'
  },
  {
    id: 'community',
    title: 'Community Members',
    description: 'Resources and guides for our vibrant community of FinTech enthusiasts.',
    icon: <MessagesSquare className="w-8 h-8 stroke-[2.5]" />,
    path: '/docs/community',
    iconColor: 'text-purple-500'
  },
  {
    id: 'authors',
    title: 'Authors',
    description: 'Guidelines and documentation for content creators and authors on the platform.',
    icon: <Users className="w-8 h-8 stroke-[2.5]" />,
    path: '/docs/authors',
    iconColor: 'text-purple-500'
  },
  {
    id: 'faqs',
    title: 'FAQs',
    description: 'Frequently asked questions about the platform, features, and services.',
    icon: <HelpCircle className="w-8 h-8 stroke-[2.5]" />,
    path: '/docs/faqs',
    iconColor: 'text-purple-500'
  }
];

const Docs: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSections = documentationSections.filter(section =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.description.toLowerCase().includes(searchQuery.toLowerCase())
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
            className="text-xl text-gray-300 mb-8"
          >
            Everything you need to know about the FinTech Pulse Network platform
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-[#1F2937] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Documentation Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={section.path} className="block">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl" />
                  <div className="relative bg-[#1F2937] p-8 rounded-2xl border border-gray-800 hover:border-gray-700 transition-all duration-300 h-full">
                    <div className="inline-block p-3 bg-[#2A3447] rounded-lg mb-4">
                      <div className={section.iconColor}>
                        {section.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-gray-100">
                      {section.title}
                    </h3>
                    <p className="text-gray-400 mb-4 group-hover:text-gray-300">
                      {section.description}
                    </p>
                    <div className="flex items-center text-gray-300 group-hover:text-white">
                      <span className="text-sm font-medium">Learn more</span>
                      <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Docs;
