import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Search, Building2, Rocket, Bot } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface DirectoryItem {
  name: string;
  link: string;
  description: string;
  category: 'business' | 'startup' | 'agent';
}

const directoryData: DirectoryItem[] = [
  // Businesses
  { 
    name: 'Ant Group',
    link: 'https://www.antgroup.com',
    description: 'Digital banking and payment services, including Alipay',
    category: 'business'
  },
  { 
    name: 'Stripe',
    link: 'https://stripe.com',
    description: 'Payment processing platform for businesses',
    category: 'business'
  },
  { 
    name: 'PayPal',
    link: 'https://www.paypal.com',
    description: 'Online payment and money transfer services',
    category: 'business'
  },
  { 
    name: 'Binance',
    link: 'https://www.binance.com',
    description: 'Leading cryptocurrency exchange platform',
    category: 'business'
  },
  { 
    name: 'Coinbase',
    link: 'https://www.coinbase.com',
    description: 'Platform for buying, selling, and managing cryptocurrency',
    category: 'business'
  },
  { 
    name: 'Adyen',
    link: 'https://www.adyen.com',
    description: 'Global payment processing platform for businesses',
    category: 'business'
  },
  { 
    name: 'Square',
    link: 'https://square.com',
    description: 'Payment and point-of-sale solutions',
    category: 'business'
  },
  { 
    name: 'Klarna',
    link: 'https://www.klarna.com',
    description: 'Buy now, pay later services for online shopping',
    category: 'business'
  },
  { 
    name: 'SoFi',
    link: 'https://www.sofi.com',
    description: 'Personal finance, loans, and investment products',
    category: 'business'
  },
  { 
    name: 'Wise',
    link: 'https://wise.com',
    description: 'International money transfer service',
    category: 'business'
  },
  { 
    name: 'Affirm',
    link: 'https://www.affirm.com',
    description: 'Point-of-sale financing for online retailers',
    category: 'business'
  },
  { 
    name: 'Credit Karma',
    link: 'https://www.creditkarma.com',
    description: 'Free credit scores and financial product recommendations',
    category: 'business'
  },
  { 
    name: 'Razorpay',
    link: 'https://razorpay.com',
    description: 'Payment gateway for businesses in India',
    category: 'business'
  },
  { 
    name: 'Finastra',
    link: 'https://www.finastra.com',
    description: 'Banking software solutions for financial institutions',
    category: 'business'
  },
  { 
    name: 'Braintree',
    link: 'https://www.braintreepayments.com',
    description: 'Full-stack payment platform for businesses',
    category: 'business'
  },
  { 
    name: 'BitPay',
    link: 'https://bitpay.com',
    description: 'Bitcoin payment processing for businesses',
    category: 'business'
  },
  
  // Startups
  { 
    name: 'Fynhaus',
    link: 'https://fynhaus.com',
    description: 'RegTech solutions for anti-money laundering and compliance',
    category: 'startup'
  },
  { 
    name: 'Peratera',
    link: 'https://peratera.com',
    description: 'Digital banking and payment solutions for cross-border transactions',
    category: 'startup'
  },
  { 
    name: 'JustiFi',
    link: 'https://justifi.com',
    description: 'Embedded finance infrastructure for business banking services',
    category: 'startup'
  },
  { 
    name: 'Redefine',
    link: 'https://redefine.com',
    description: 'DeFi risk assessment and portfolio management platform',
    category: 'startup'
  },
  { 
    name: 'Monnai',
    link: 'https://monnai.com',
    description: 'Consumer insights platform for KYC and fraud detection',
    category: 'startup'
  },
  { 
    name: 'Incard',
    link: 'https://incard.co',
    description: 'Financial platform for e-commerce entrepreneurs with virtual cards',
    category: 'startup'
  },
  { 
    name: 'Finxone',
    link: 'https://finxone.com',
    description: 'No-code platform for building custom fintech applications',
    category: 'startup'
  },
  { 
    name: 'Coinlink',
    link: 'https://coinlink.com',
    description: 'Social investment platform focused on decentralized finance',
    category: 'startup'
  },
  { 
    name: 'Lopeer',
    link: 'https://lopeer.com',
    description: 'Hybrid neobanking model combining traditional and digital banking',
    category: 'startup'
  },
  { 
    name: 'Glass Data',
    link: 'https://glassdata.io',
    description: 'Customer-centric lending solutions using data analytics',
    category: 'startup'
  },
  { 
    name: 'Tallied',
    link: 'https://tallied.com',
    description: 'Investment and savings management tools for personal finance',
    category: 'startup'
  },
  { 
    name: 'GajiGesa',
    link: 'https://gajigesa.com',
    description: 'Financial wellness through earned wage access solutions',
    category: 'startup'
  },
  { 
    name: 'Fluid Finance',
    link: 'https://fluidfi.com',
    description: 'Microfinance data collection and analysis platform',
    category: 'startup'
  },
  { 
    name: 'Zabit',
    link: 'https://zabit.com',
    description: 'Tools for money laundering prevention and compliance',
    category: 'startup'
  },
  { 
    name: 'Djoin',
    link: 'https://djoin.com',
    description: 'Transaction analysis for enhanced financial insights',
    category: 'startup'
  },
  { 
    name: 'H2O.ai',
    link: 'https://h2o.ai',
    description: 'AI-driven solutions for financial data analysis',
    category: 'startup'
  },
  { 
    name: 'DataRobot',
    link: 'https://datarobot.com',
    description: 'Automated machine learning for financial risk modeling',
    category: 'startup'
  },
  { 
    name: 'TrueLayer',
    link: 'https://truelayer.com',
    description: 'APIs for secure bank data access across Europe',
    category: 'startup'
  },
  { 
    name: 'Airwallex',
    link: 'https://airwallex.com',
    description: 'Cross-border payment solutions for international business',
    category: 'startup'
  },
  { 
    name: 'Lendio',
    link: 'https://lendio.com',
    description: 'Marketplace connecting small businesses with lenders',
    category: 'startup'
  },
  { 
    name: 'Plaid',
    link: 'https://plaid.com',
    description: 'Financial data connectivity platform',
    category: 'startup'
  },
  { 
    name: 'Robinhood',
    link: 'https://robinhood.com',
    description: 'Commission-free investing platform',
    category: 'startup'
  },
  { 
    name: 'Revolut',
    link: 'https://revolut.com',
    description: 'Digital banking and payments',
    category: 'startup'
  },
  
  // AI Agents
  { 
    name: 'GPT-4',
    link: 'https://openai.com/gpt-4',
    description: 'Advanced autonomous AI model for decision-making and task execution',
    category: 'agent'
  },
  { 
    name: 'Project Astra',
    link: 'https://deepmind.google/technologies/gemini/',
    description: 'Universal AI agent by Google DeepMind using Gemini models',
    category: 'agent'
  },
  { 
    name: 'Auto-GPT',
    link: 'https://github.com/Significant-Gravitas/Auto-GPT',
    description: 'Open-source autonomous AI agent for complex task completion',
    category: 'agent'
  },
  { 
    name: 'Superagent',
    link: 'https://www.superagent.sh',
    description: 'Platform for building personal ChatGPT-like research assistants',
    category: 'agent'
  },
  { 
    name: 'AgentGPT',
    link: 'https://agentgpt.reworkd.ai',
    description: 'Platform for creating autonomous AI agents with templates',
    category: 'agent'
  },
  { 
    name: 'Devin AI',
    link: 'https://www.cognition-labs.com/devin',
    description: 'Autonomous software engineering agent for coding tasks',
    category: 'agent'
  },
  { 
    name: 'Aomni',
    link: 'https://www.aomni.com',
    description: 'B2B sales automation agent for research and workflows',
    category: 'agent'
  },
  { 
    name: 'MetaGPT',
    link: 'https://github.com/geekan/MetaGPT',
    description: 'Multi-agent framework for software engineering automation',
    category: 'agent'
  },
  { 
    name: 'Phind',
    link: 'https://www.phind.com',
    description: 'AI programming assistant for coding queries and research',
    category: 'agent'
  },
  { 
    name: 'Taskade',
    link: 'https://www.taskade.com',
    description: 'Platform for creating and running custom AI agents',
    category: 'agent'
  },
  { 
    name: 'Sweep',
    link: 'https://sweep.dev',
    description: 'GitHub assistant for automated code fixes and writing',
    category: 'agent'
  },
  { 
    name: 'Cal.ai',
    link: 'https://cal.com/ai',
    description: 'Open-source AI scheduling assistant built on Cal.com',
    category: 'agent'
  },
  { 
    name: 'ChatDev',
    link: 'https://github.com/OpenBMB/ChatDev',
    description: 'Communicative agents for software development assistance',
    category: 'agent'
  },
  { 
    name: 'PromethAI',
    link: 'https://prometh.ai',
    description: 'Personal AI agent for nutrition and health guidance',
    category: 'agent'
  },
  { 
    name: 'Airkit.ai',
    link: 'https://www.airkit.ai',
    description: 'Platform for building and deploying custom AI agents',
    category: 'agent'
  },
  { 
    name: 'Open Interpreter',
    link: 'https://openinterpreter.com',
    description: 'Code interpreter enabling LLMs to execute code seamlessly',
    category: 'agent'
  },
  { 
    name: 'Pezzo',
    link: 'https://pezzo.ai',
    description: 'Development toolkit for prompt management and AI interactions',
    category: 'agent'
  },
  { 
    name: 'OpenAI',
    link: 'https://openai.com',
    description: 'Advanced AI research and deployment',
    category: 'agent'
  },
  { 
    name: 'Anthropic',
    link: 'https://anthropic.com',
    description: 'Constitutional AI development',
    category: 'agent'
  },
  { 
    name: 'DeepMind',
    link: 'https://deepmind.com',
    description: 'AI research and applications',
    category: 'agent'
  }
];

const Directory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'business' | 'startup' | 'agent'>('all');

  const filteredData = directoryData.filter(item => {
    const matchesSearch = (
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const matchesFilter = activeFilter === 'all' || item.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case 'business':
        return <Building2 className="w-5 h-5" />;
      case 'startup':
        return <Rocket className="w-5 h-5" />;
      case 'agent':
        return <Bot className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>FinTech & AI Directory | FinTech Pulse Network</title>
        <meta name="description" content="Explore our curated directory of leading FinTech and AI companies, startups, and technology providers." />
      </Helmet>

      <div className="min-h-screen bg-[#0A0F1E] text-white">
        {/* Hero Section */}
        <div className="pt-40 pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#151B30] to-[#0A0F1E]">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#8B5CF6] to-[#4F46E5] bg-clip-text text-transparent"
            >
              FinTech & AI Directory
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-400"
            >
              Discover leading companies shaping the future of finance and artificial intelligence
            </motion.p>
          </div>
        </div>

        {/* Search and Filters Section */}
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Search Bar */}
            <div className="relative mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search directory..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-[#151B30] border border-[#2A3655] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#8B5CF6] transition-colors"
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-3 mb-8">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-6 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                  activeFilter === 'all'
                    ? 'bg-[#8B5CF6] text-white'
                    : 'bg-[#151B30] text-gray-400 hover:bg-[#1D2644]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveFilter('business')}
                className={`px-6 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                  activeFilter === 'business'
                    ? 'bg-[#8B5CF6] text-white'
                    : 'bg-[#151B30] text-gray-400 hover:bg-[#1D2644]'
                }`}
              >
                <Building2 className="w-5 h-5" />
                Businesses
              </button>
              <button
                onClick={() => setActiveFilter('startup')}
                className={`px-6 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                  activeFilter === 'startup'
                    ? 'bg-[#8B5CF6] text-white'
                    : 'bg-[#151B30] text-gray-400 hover:bg-[#1D2644]'
                }`}
              >
                <Rocket className="w-5 h-5" />
                Startups
              </button>
              <button
                onClick={() => setActiveFilter('agent')}
                className={`px-6 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                  activeFilter === 'agent'
                    ? 'bg-[#8B5CF6] text-white'
                    : 'bg-[#151B30] text-gray-400 hover:bg-[#1D2644]'
                }`}
              >
                <Bot className="w-5 h-5" />
                Agents
              </button>
            </div>

            {/* Directory Listings */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-8">
              {filteredData.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative flex flex-col min-h-[200px] p-6 rounded-lg bg-[#151B30] hover:bg-[#1D2644] transition-all duration-300 ease-in-out border border-[#2A3655] hover:border-[#8B5CF6]"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xl font-semibold group-hover:text-[#8B5CF6] transition-colors duration-300">
                      {item.name}
                    </h2>
                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-[#8B5CF6] transition-colors duration-300" />
                  </div>
                  <p className="text-gray-400 mb-12">
                    {item.description}
                  </p>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center text-sm text-gray-500">
                      {item.category === 'business' && <Building2 className="w-4 h-4 mr-2" />}
                      {item.category === 'startup' && <Rocket className="w-4 h-4 mr-2" />}
                      {item.category === 'agent' && <Bot className="w-4 h-4 mr-2" />}
                      {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                    </div>
                  </div>
                </motion.a>
              ))}
              {filteredData.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-400">No entries found matching your search criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Directory;
