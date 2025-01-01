import React from 'react';
import { motion } from 'framer-motion';
import EarthBackground from '../components/EarthBackground';
import { 
  Check, 
  Globe, 
  Award,
  ArrowRight,
  BookOpen,
  Layers
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const marketOpportunity = {
    icon: Globe,
    title: "Market Opportunity",
    description: "Bridging fintech and education markets worth over $1 trillion by 2030.",
    details: [
      "Fintech market: $698 billion by 2030",
      "EdTech market: $400 billion by 2028",
      "Unique positioning at market intersection"
    ]
  };

  const scalabilityRoadmap = {
    icon: Layers,
    title: "Scalability Roadmap",
    description: "Strategic expansion across fintech verticals and global markets.",
    details: [
      "Phase 1: User Growth and Community Building",
      "Phase 2: AI Capability Expansion",
      "Phase 3: Market Domination and Vertical Expansion"
    ]
  };

  const revenueModel = {
    icon: BookOpen,
    title: "Revenue Model",
    description: "Flexible monetization through subscriptions, tokens, and enterprise solutions.",
    details: [
      "Basic Tier: $10/month",
      "Pro Tier: $25/month",
      "Enterprise: Custom Pricing",
      "Additional Token Purchases Available"
    ]
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="h-screen flex flex-col">
        <EarthBackground />
        <div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-3xl mx-auto space-y-4"
              >
                <h2 className="text-lg sm:text-xl font-medium text-indigo-200 tracking-wide uppercase mb-4">
                  Advanced Financial Analytics
                </h2>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-[1.15] mb-8">
                  Transform Your
                  <span className="block mt-1 bg-gradient-to-r from-indigo-200 via-sky-200 to-indigo-300 bg-clip-text text-transparent">
                    Financial Future
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
                  Experience the next generation of financial intelligence. 
                  Make smarter, data-driven decisions with powerful analytics.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-12 flex flex-col sm:flex-row items-center gap-6 justify-center"
              >
                <button
                  onClick={() => navigate('/fintech-hub')}
                  className="px-8 py-3 bg-indigo-600 text-white rounded-lg text-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  Get Started
                </button>
                <button 
                  onClick={() => navigate('/about')}
                  className="px-8 py-3 bg-gray-900 text-white border border-gray-700 rounded-lg text-lg font-medium hover:bg-gray-800 hover:border-indigo-500/30 transition-all"
                >
                  Learn More
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-16 flex flex-wrap items-center justify-center gap-8 text-gray-400"
              >
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-indigo-400" />
                  <span>Real-time Insights</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-indigo-400" />
                  <span>Advanced Analytics</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-indigo-400" />
                  <span>Secure Platform</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-transparent to-transparent opacity-50" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-sky-200 to-indigo-300 mb-6"
            >
              Why FinTech Pulse Network?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-gray-400 leading-relaxed"
            >
              We're not just another fintech platform - we're a revolution in financial education and technology. 
              Our AI-powered ecosystem combines cutting-edge technology with human expertise to deliver 
              unparalleled insights and learning experiences.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 hover:border-indigo-500/30 group"
            >
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-indigo-300 transition-colors duration-300">
                AI-First Approach
              </h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                Our proprietary AI algorithms analyze millions of data points in real-time, providing you with 
                insights that are weeks ahead of traditional analysis methods.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-400">
                  <Check className="h-5 w-5 text-indigo-400 mr-2" />
                  <span>Predictive market analysis</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <Check className="h-5 w-5 text-indigo-400 mr-2" />
                  <span>Personalized learning paths</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <Check className="h-5 w-5 text-indigo-400 mr-2" />
                  <span>Automated trend detection</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 hover:border-indigo-500/30 group"
            >
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-indigo-300 transition-colors duration-300">
                Expert Community
              </h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                Learn from the best in the industry. Our community includes fintech founders, 
                blockchain developers, and AI researchers from top institutions.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-400">
                  <Check className="h-5 w-5 text-indigo-400 mr-2" />
                  <span>1-on-1 mentorship sessions</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <Check className="h-5 w-5 text-indigo-400 mr-2" />
                  <span>Weekly expert workshops</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <Check className="h-5 w-5 text-indigo-400 mr-2" />
                  <span>Networking opportunities</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 hover:border-indigo-500/30 group"
            >
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-indigo-300 transition-colors duration-300">
                Proven Results
              </h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                Our platform has helped thousands of professionals accelerate their careers 
                and make data-driven financial decisions.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-400">
                  <Check className="h-5 w-5 text-indigo-400 mr-2" />
                  <span>95% career advancement rate</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <Check className="h-5 w-5 text-indigo-400 mr-2" />
                  <span>3x faster skill acquisition</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <Check className="h-5 w-5 text-indigo-400 mr-2" />
                  <span>89% prediction accuracy</span>
                </li>
              </ul>
            </motion.div>
          </div>

          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="inline-block"
            >
              <button 
                onMouseEnter={() => navigate('/community')}
                className="px-8 py-3 bg-indigo-600 text-white rounded-lg text-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                Join Our Community
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;