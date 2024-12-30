import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  MessageCircle, 
  Lightbulb, 
  Cpu,
  Check
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AiCompanion: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  const companionFeatures = [
    {
      icon: Brain,
      title: 'Adaptive Learning',
      description: 'Our AI dynamically learns from your interactions, continuously refining its understanding of your financial context.',
      benefits: [
        'Personalized Insights',
        'Contextual Understanding',
        'Evolving Intelligence'
      ]
    },
    {
      icon: Lightbulb,
      title: 'Strategic Insights',
      description: 'Generate comprehensive, actionable strategies by analyzing complex financial data and market trends.',
      benefits: [
        'Data-Driven Recommendations',
        'Risk Assessment',
        'Predictive Analysis'
      ]
    },
    {
      icon: MessageCircle,
      title: 'Interactive Dialogue',
      description: 'Engage in natural, meaningful conversations about financial opportunities, trends, and strategic planning.',
      benefits: [
        'Conversational Interface',
        'Instant Responses',
        'Comprehensive Explanations'
      ]
    }
  ];

  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <div className="grid md:grid-cols-3 gap-8">
            {companionFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="bg-[#1A1F2E] rounded-xl p-8 hover:bg-[#242938] transition-all"
              >
                <div className="bg-[#8B5CF6]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="h-8 w-8 text-[#8B5CF6]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-center mb-6">{feature.description}</p>
                <div className="space-y-3">
                  {feature.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center text-gray-300">
                      <Check className="h-5 w-5 text-[#8B5CF6] mr-2" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        );
      case 'capabilities':
        return (
          <div className="bg-[#1A1F2E] rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-6">AI Companion Capabilities</h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-[#8B5CF6] mr-2" />
                Real-time market trend analysis
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-[#8B5CF6] mr-2" />
                Personalized investment strategy recommendations
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-[#8B5CF6] mr-2" />
                Contextual financial news summaries
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-[#8B5CF6] mr-2" />
                Interactive learning and Q&A sessions
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-[#8B5CF6] mr-2" />
                Predictive financial modeling
              </li>
            </ul>
          </div>
        );
      case 'pricing':
        return (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#1A1F2E] rounded-xl p-8 text-center hover:bg-[#242938] transition-all flex flex-col">
              <h3 className="text-xl font-semibold text-white mb-4">Basic</h3>
              <p className="text-4xl font-bold text-[#8B5CF6] mb-4">$10/mo</p>
              <ul className="space-y-3 text-gray-300 mb-8 flex-grow">
                <li>10 AI Interaction Tokens</li>
                <li>Basic Insights</li>
                <li>Limited Market Analysis</li>
              </ul>
              <button className="bg-[#8B5CF6] text-white px-6 py-2 rounded-lg hover:bg-[#6D28D9] transition-all duration-300 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 w-full flex items-center justify-center">
                Coming Soon! <Check className="ml-2 h-5 w-5" />
              </button>
            </div>
            <div className="bg-[#1A1F2E] rounded-xl p-8 text-center hover:bg-[#242938] transition-all flex flex-col">
              <h3 className="text-xl font-semibold text-white mb-4">Pro</h3>
              <p className="text-4xl font-bold text-[#8B5CF6] mb-4">$25/mo</p>
              <ul className="space-y-3 text-gray-300 mb-8 flex-grow">
                <li>500 AI Interaction Tokens</li>
                <li>Advanced Insights</li>
                <li>Comprehensive Market Analysis</li>
                <li>Priority Support</li>
              </ul>
              <button className="bg-[#8B5CF6] text-white px-6 py-2 rounded-lg hover:bg-[#6D28D9] transition-all duration-300 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 w-full flex items-center justify-center">
                Coming Soon! <Check className="ml-2 h-5 w-5" />
              </button>
            </div>
            <div className="bg-[#1A1F2E] rounded-xl p-8 text-center hover:bg-[#242938] transition-all flex flex-col">
              <h3 className="text-xl font-semibold text-white mb-4">Enterprise</h3>
              <p className="text-4xl font-bold text-[#8B5CF6] mb-4">Custom</p>
              <ul className="space-y-3 text-gray-300 mb-8 flex-grow">
                <li>Unlimited AI Tokens</li>
                <li>Dedicated AI Companion</li>
                <li>Custom Integration</li>
                <li>White-Glove Support</li>
              </ul>
              <button className="bg-[#8B5CF6] text-white px-6 py-2 rounded-lg hover:bg-[#6D28D9] transition-all duration-300 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 w-full flex items-center justify-center">
                Coming Soon! <Check className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1321] flex flex-col relative">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A1F2E] via-[#2D1B4D] to-[#0D1321] opacity-70 h-full" 
        style={{
          backgroundSize: '100px 100px',
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)'
        }}
      />

      <div className="flex-1 flex flex-col relative z-10">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-6 pt-36 pb-12 relative z-10"
        >
          <div className="flex items-center justify-center mb-8">
            <Cpu className="h-12 w-12 text-[#8B5CF6] mr-4" />
            <h1 className="text-5xl font-extrabold text-white mb-4">
              Pulse AI: <span className="bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-transparent bg-clip-text">Your Ultimate Learning Companion</span>
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto text-center">
            Your intelligent guide through the complex world of financial technology, delivering personalized insights and strategic knowledge.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="container mx-auto px-6 mb-8 relative z-10">
          <div className="flex justify-center space-x-4">
            {['overview', 'capabilities', 'pricing'].map((tab) => (
              <motion.button
                key={tab}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-lg capitalize font-semibold transition-all ${
                  activeTab === tab 
                    ? 'bg-[#8B5CF6] text-white' 
                    : 'bg-[#1A1F2E] text-gray-300 hover:bg-[#242938] border border-gray-300'
                }`}
              >
                {tab}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 relative z-10 flex-1">
          {renderTabContent()}
        </div>

        {/* Try it out Button */}
        <div className="container mx-auto px-6 relative z-10 py-16 text-center">
          <button 
            onClick={() => navigate('/chatbot')}
            className="inline-flex items-center justify-center px-12 py-4 text-lg font-semibold text-white bg-[#6D28D9] rounded-xl transform hover:scale-102 transition-all duration-300 shadow-lg hover:shadow-[#6D28D9]/30 hover:bg-[#7C3AED] border border-[#8B5CF6]/20 hover:border-[#8B5CF6]/40"
          >
            <span className="mr-2">Try it out!</span>
            <Cpu className="h-5 w-5 group-hover:rotate-180 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiCompanion;
