import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion';
import HeroSection from '../components/HeroSection';
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

const FeatureCard: React.FC<{
  icon: LucideIcon;
  title: string;
  description: string;
  details: string[];
  index: number;
}> = ({ icon: Icon, title, description, details, index }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 hover:border-indigo-500/30 group transform hover:scale-105 transition-all duration-300"
    >
      <Icon className="h-12 w-12 text-indigo-400 mb-6 group-hover:text-indigo-300 transition-colors" />
      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-indigo-300 transition-colors">
        {title}
      </h3>
      <p className="text-gray-400 leading-relaxed mb-6">
        {description}
      </p>
      <ul className="space-y-3">
        {details.map((detail, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: index * 0.2 + i * 0.1 }}
            className="flex items-center text-gray-400 group-hover:text-gray-300 transition-colors"
          >
            <Check className="h-5 w-5 text-indigo-400 mr-2 flex-shrink-0" />
            <span>{detail}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const mainContentRef = useRef(null);
  
  // Smooth spring animation for content reveal
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y = useSpring(useTransform(scrollY, [0, 500], [1000, 0]), springConfig);

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
    <div className="relative min-h-screen bg-black">
      <HeroSection />

      {/* Main Content Container */}
      <div className="relative">
        {/* Background fade for smooth transition */}
        <div className="absolute -top-64 left-0 right-0 h-64 bg-gradient-to-b from-transparent to-black" />
        
        <div className="relative bg-black">
          <motion.div
            ref={mainContentRef}
            className="relative z-20 bg-black"
            style={{
              y,
              position: 'relative',
              zIndex: 20,
              borderTopLeftRadius: '2rem',
              borderTopRightRadius: '2rem',
              boxShadow: '0 -10px 30px rgba(0, 0, 0, 0.5)',
            }}
          >
            {/* The FPN Ecosystem Section */}
            <section className="py-24 relative overflow-hidden">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="max-w-3xl mx-auto text-center mb-20"
                >
                  <div className="inline-block">
                    <motion.h2 
                      className="text-5xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 mb-6"
                      initial={{ backgroundPosition: "0%" }}
                      animate={{ backgroundPosition: "100%" }}
                      transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
                    >
                      The FPN Ecosystem
                    </motion.h2>
                  </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-24">
                  {/* Pulse AI */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ duration: 0.3 }}
                    viewport={{ once: true }}
                    className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-8 border border-gray-800 backdrop-blur-xl hover:border-indigo-500/50 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-purple-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-indigo-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10">
                      <h3 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">1. Pulse AI</h3>
                      <p className="text-indigo-300 font-medium mb-4">The entry-level tool for individuals and small businesses:</p>
                      <div className="space-y-4">
                        <p className="text-gray-300"><span className="text-white font-medium">Features:</span> Habit tracking, personalized advice, and financial progress monitoring.</p>
                        <p className="text-gray-300"><span className="text-white font-medium">Value:</span> A financial mentor in your pocket, helping you overcome obstacles and build better habits without judgment.</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Pulse AI V2 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ duration: 0.3 }}
                    viewport={{ once: true }}
                    className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-8 border border-gray-800 backdrop-blur-xl hover:border-purple-500/50 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10">
                      <h3 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">2. Pulse AI V2</h3>
                      <p className="text-purple-300 font-medium mb-4">An advanced solution for professionals and SMEs:</p>
                      <div className="space-y-4">
                        <p className="text-gray-300"><span className="text-white font-medium">Features:</span> Complex financial report analysis, regulatory compliance breakdowns, and tailored strategic insights.</p>
                        <p className="text-gray-300"><span className="text-white font-medium">Value:</span> A financial powerhouse that saves time, reduces costs, and delivers actionable expertise.</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* The Knowledge Hub */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ duration: 0.3 }}
                    viewport={{ once: true }}
                    className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-8 border border-gray-800 backdrop-blur-xl hover:border-sky-500/50 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-sky-600/10 to-indigo-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-sky-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10">
                      <h3 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">3. The Knowledge Hub</h3>
                      <p className="text-sky-300 font-medium mb-4">A premium content library offering:</p>
                      <ul className="space-y-3 text-gray-300">
                        <li className="flex items-start gap-2">
                          <span className="text-sky-400 mt-1">•</span>
                          <span><span className="text-white font-medium">Bite-sized Insights:</span> Simplified breakdowns of complex financial topics.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-sky-400 mt-1">•</span>
                          <span><span className="text-white font-medium">Templates and Playbooks:</span> Ready-to-use tools for businesses and individuals.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-sky-400 mt-1">•</span>
                          <span><span className="text-white font-medium">Case Studies:</span> Learn from real-world success stories.</span>
                        </li>
                      </ul>
                    </div>
                  </motion.div>

                  {/* The Community */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ duration: 0.3 }}
                    viewport={{ once: true }}
                    className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-8 border border-gray-800 backdrop-blur-xl hover:border-pink-500/50 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-600/10 to-purple-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10">
                      <h3 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">4. The Community</h3>
                      <p className="text-pink-300 font-medium mb-4">An active Discord hub for:</p>
                      <ul className="space-y-3 text-gray-300">
                        <li className="flex items-start gap-2">
                          <span className="text-pink-400 mt-1">•</span>
                          <span>Peer collaboration and shared learning.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-pink-400 mt-1">•</span>
                          <span>Expert-led workshops and challenges.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-pink-400 mt-1">•</span>
                          <span>Real-time support and networking opportunities.</span>
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                </div>

                {/* The Vision Section */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="relative max-w-4xl mx-auto"
                >
                  <div className="absolute inset-0 bg-black rounded-2xl blur-3xl" />
                  <div className="relative bg-black rounded-2xl p-12 border border-gray-800 backdrop-blur-xl">
                    <h2 className="text-4xl sm:text-5xl font-bold text-center bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent mb-8">
                      The Vision
                    </h2>
                    <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                      With Pulse AI and Pulse AI V2, FPN isn't just a platform—it's a lifelong partner for financial growth. By empowering individuals to fix bad habits and enabling businesses to thrive with advanced insights, we're creating a financial revolution that leaves no one behind.
                    </p>
                    <p className="text-lg font-medium text-center bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                      Transform your financial future—because confidence, clarity, and control over your finances aren't just aspirations; they're your right.
                    </p>
                  </div>
                </motion.div>
              </div>
            </section>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;