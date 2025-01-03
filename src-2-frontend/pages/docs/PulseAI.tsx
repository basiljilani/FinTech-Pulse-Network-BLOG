import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Bot, Target, TrendingUp, Lightbulb, CheckCircle, BarChart3, UserCircle, Calendar, Brain } from 'lucide-react';

const PulseAI = () => {
  const [showOverview, setShowOverview] = useState(false);

  const features = [
    {
      title: 'Fix Poor Habits',
      icon: <Target className="w-6 h-6 text-blue-400" />,
      items: [
        { title: 'Progress Tracking', description: 'Continuously monitors user progress against financial goals.' },
        { title: 'Tailored Advice', description: 'Offers actionable tips to improve spending, saving, and budgeting habits.' },
        { title: 'Motivation System', description: 'Sends encouraging notifications and rewards users for achieving milestones.' }
      ]
    },
    {
      title: 'Build Confidence',
      icon: <TrendingUp className="w-6 h-6 text-green-400" />,
      items: [
        { title: 'Mistake Management', description: 'Reframes financial errors as opportunities to learn.' },
        { title: 'Win Celebrations', description: 'Highlights small achievements, fostering a sense of accomplishment.' },
        { title: 'Judgment-Free Zone', description: 'Ensures users feel supported, not criticized.' }
      ]
    },
    {
      title: 'Make It Simple',
      icon: <Lightbulb className="w-6 h-6 text-yellow-400" />,
      items: [
        { title: 'Simplified Insights', description: 'Breaks down financial concepts into everyday language.' },
        { title: 'Visual Aids', description: 'Uses charts, graphs, and infographics to illustrate key points.' },
        { title: 'Guided Walkthroughs', description: 'Provides step-by-step instructions for managing finances.' }
      ]
    }
  ];

  const workflow = [
    {
      title: 'User Profile Setup',
      icon: <UserCircle className="w-6 h-6 text-purple-400" />,
      items: [
        'Users input basic financial information and goals.',
        'Pulse AI customizes its approach based on user preferences.'
      ]
    },
    {
      title: 'Daily Check-Ins',
      icon: <Calendar className="w-6 h-6 text-indigo-400" />,
      items: [
        'Tracks spending, income, and progress toward financial goals.',
        'Provides reminders and motivational updates.'
      ]
    },
    {
      title: 'Habit Recommendations',
      icon: <Brain className="w-6 h-6 text-pink-400" />,
      items: [
        'Analyzes spending patterns and suggests changes to improve financial health.'
      ]
    },
    {
      title: 'Interactive Insights',
      icon: <BarChart3 className="w-6 h-6 text-cyan-400" />,
      items: [
        'Users can ask questions to receive clear, jargon-free answers.'
      ]
    }
  ];

  const benefits = [
    'Encourages better financial habits without guilt or pressure.',
    'Provides a safe space for individuals to grow their financial knowledge.',
    'Empowers small businesses to manage basic finances efficiently.'
  ];

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white">
      <Helmet>
        <title>Pulse AI Documentation | FinTech Pulse Network</title>
        <meta name="description" content="Documentation for Pulse AI: The Non-Judgmental Financial Assistant" />
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
            Pulse AI Documentation
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl text-gray-400 text-center mb-12"
          >
            The Non-Judgmental Financial Assistant
          </motion.p>
        </div>

        {/* Logo Section with Interactive Overview */}
        <motion.button
          onClick={() => setShowOverview(!showOverview)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center justify-center p-6 rounded-2xl bg-gradient-to-b from-blue-500/5 to-blue-500/10 hover:from-blue-500/10 hover:to-blue-500/20 shadow-lg hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer backdrop-blur-sm"
        >
          <Bot className="w-12 h-12 text-blue-400 transition-colors duration-300" />
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
              <div className="relative bg-[#1A1F35]/90 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-blue-500/10">
                <motion.button
                  onClick={() => setShowOverview(false)}
                  className="absolute -right-2 -top-2 p-2 rounded-full bg-[#1A1F35] text-blue-400 hover:text-blue-300 transition-colors duration-200 shadow-lg"
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
                    className="text-2xl font-semibold mb-4 text-blue-400"
                  >
                    Overview
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-300 text-lg leading-relaxed"
                  >
                    Pulse AI is a supportive financial guide tailored for individuals and small businesses. 
                    Its focus is on promoting positive financial habits, building user confidence, and 
                    simplifying financial management without judgment or complexity.
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

export default PulseAI;