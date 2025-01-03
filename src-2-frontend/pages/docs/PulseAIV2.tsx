import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  Bot, 
  FileText, 
  Shield, 
  Lightbulb, 
  CheckCircle, 
  BarChart3, 
  Clock,
  Building,
  Target,
  BookOpen
} from 'lucide-react';

const PulseAIV2 = () => {
  const [showOverview, setShowOverview] = useState(false);

  const features = [
    {
      title: 'Financial Report Analysis',
      icon: <FileText className="w-6 h-6 text-red-400" />,
      items: [
        { title: 'Rapid Interpretation', description: 'Analyzes financial statements, income reports, and balance sheets within seconds.' },
        { title: 'Simplified Summaries', description: 'Highlights critical insights such as profitability, cash flow trends, and expense breakdowns.' },
        { title: 'Actionable Insights', description: 'Provides recommendations based on the analysis to enhance decision-making.' }
      ]
    },
    {
      title: 'Regulatory Compliance',
      icon: <Shield className="w-6 h-6 text-green-400" />,
      items: [
        { title: 'Document Decoding', description: 'Breaks down compliance regulations and legal jargon into clear, actionable steps.' },
        { title: 'Tailored Guidance', description: 'Aligns compliance advice with industry standards and regional regulations.' },
        { title: 'Risk Management', description: 'Identifies potential compliance risks and suggests corrective actions.' }
      ]
    },
    {
      title: 'Strategic Advice',
      icon: <Lightbulb className="w-6 h-6 text-yellow-400" />,
      items: [
        { title: 'Personalized Recommendations', description: 'Adapts insights to the user\'s business goals and financial position.' },
        { title: 'Industry-Specific Guidance', description: 'Offers strategic advice aligned with trends in the user\'s industry.' },
        { title: 'Goal-Driven Planning', description: 'Helps SMEs create actionable financial roadmaps.' }
      ]
    },
    {
      title: 'Real-Time Precision',
      icon: <Clock className="w-6 h-6 text-purple-400" />,
      items: [
        { title: 'Advanced Query Handling', description: 'Processes detailed financial queries with unparalleled accuracy.' },
        { title: 'Nuanced Analysis', description: 'Provides deeper insights compared to generic AI tools.' },
        { title: 'Continuous Updates', description: 'Keeps knowledge base updated with the latest financial and regulatory changes.' }
      ]
    }
  ];

  const workflow = [
    {
      title: 'Business Profile Setup',
      icon: <Building className="w-6 h-6 text-blue-400" />,
      items: [
        'Input business type and goals',
        'Provide financial data',
        'Customize advice based on needs'
      ]
    },
    {
      title: 'Report Upload & Analysis',
      icon: <BarChart3 className="w-6 h-6 text-green-400" />,
      items: [
        'Upload financial reports',
        'Process compliance documents',
        'Get simplified insights'
      ]
    },
    {
      title: 'Strategic Consultation',
      icon: <Target className="w-6 h-6 text-yellow-400" />,
      items: [
        'Ask targeted questions',
        'Receive tailored advice',
        'Plan strategic actions'
      ]
    },
    {
      title: 'Real-Time Assistance',
      icon: <BookOpen className="w-6 h-6 text-purple-400" />,
      items: [
        'Get immediate responses',
        'Handle complex queries',
        'Access updated insights'
      ]
    }
  ];

  const benefits = [
    'Saves time by simplifying complex financial data',
    'Enhances decision-making with strategic, actionable insights',
    'Reduces compliance risks with clear, manageable guidance',
    'Empowers SMEs to focus on growth with a reliable financial partner'
  ];

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white">
      <Helmet>
        <title>Pulse AI V2 Documentation | FinTech Pulse Network</title>
        <meta name="description" content="Documentation for Pulse AI V2: The Strategic Financial Partner" />
      </Helmet>

      {/* Hero Section */}
      <div className="h-screen flex flex-col items-center justify-center">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-6xl font-bold text-center mb-6"
          >
            Pulse AI V2 Documentation
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl text-gray-400 text-center mb-12"
          >
            The Strategic Financial Partner
          </motion.p>
        </div>

        {/* Logo Section with Interactive Overview */}
        <motion.button
          onClick={() => setShowOverview(!showOverview)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center justify-center p-6 rounded-2xl bg-gradient-to-b from-red-500/5 to-red-500/10 hover:from-red-500/10 hover:to-red-500/20 shadow-lg hover:shadow-red-500/10 transition-all duration-300 cursor-pointer backdrop-blur-sm"
        >
          <Bot className="w-12 h-12 text-red-400 transition-colors duration-300" />
        </motion.button>

        <AnimatePresence>
          {showOverview && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ 
                duration: 0.2,
                ease: "easeOut"
              }}
              className="mt-8 max-w-2xl mx-auto"
            >
              <div className="relative bg-[#1A1F35]/90 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-red-500/10">
                <motion.button
                  onClick={() => setShowOverview(false)}
                  className="absolute -right-2 -top-2 p-2 rounded-full bg-[#1A1F35] text-red-400 hover:text-red-300 transition-colors duration-200 shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.button>
                <div className="text-center">
                  <motion.h3
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-2xl font-semibold mb-4 text-red-400"
                  >
                    Overview
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-300 text-lg leading-relaxed"
                  >
                    Pulse AI V2 is an advanced financial assistant tailored for professionals and SMEs. 
                    It delivers strategic insights, simplifies compliance, and offers precise, real-time 
                    solutions to complex financial queries.
                  </motion.p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-3xl font-semibold mb-12 text-center"
        >
          Features
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="bg-[#1F2937] rounded-xl p-6"
            >
              <div className="flex items-center mb-6">
                {feature.icon}
                <h3 className="text-xl font-semibold ml-3">{feature.title}</h3>
              </div>
              <ul className="space-y-4">
                {feature.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-white">{item.title}</h4>
                      <p className="text-gray-400 mt-1">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Section Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-800"></div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-3xl font-semibold mb-12 text-center"
        >
          How It Works
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {workflow.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
              className="bg-[#1F2937] rounded-xl p-6"
            >
              <div className="flex items-center mb-6">
                {step.icon}
                <h3 className="text-lg font-semibold ml-3">{step.title}</h3>
              </div>
              <ul className="space-y-3">
                {step.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-gray-400">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Section Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-800"></div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="text-3xl font-semibold mb-8 text-center"
        >
          Benefits
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="bg-[#1F2937] rounded-xl p-8"
        >
          <ul className="space-y-4">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-400 mt-1 mr-3 flex-shrink-0" />
                <p className="text-gray-300 text-lg">{benefit}</p>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default PulseAIV2;
