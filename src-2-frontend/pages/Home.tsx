import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring, useAnimation } from 'framer-motion';
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
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const lastScrollY = useRef(0);

  useEffect(() => {
    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;
      setScrollDirection(currentScrollY > lastScrollY.current ? 'down' : 'up');
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', updateScrollDirection);
    return () => window.removeEventListener('scroll', updateScrollDirection);
  }, []);

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y = useSpring(useTransform(scrollY, [0, 300], [100, 0]), springConfig);

  const CardWrapper: React.FC<{
    children: React.ReactNode;
    direction: 'left' | 'right';
    delay?: number;
  }> = ({ children, direction, delay = 0 }) => {
    const ref = useRef(null);

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20, x: direction === 'left' ? -50 : 50 }}
        whileInView={{ opacity: 1, y: 0, x: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ 
          duration: 0.6,
          delay,
          ease: "easeOut"
        }}
        className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-8 border border-gray-800 backdrop-blur-xl hover:border-indigo-500/50 transition-all duration-300"
      >
        {children}
      </motion.div>
    );
  };

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
            <section className="py-12 relative overflow-hidden">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="max-w-3xl mx-auto text-center mb-12"
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
                  <div className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-8 border border-gray-800 backdrop-blur-xl hover:border-indigo-500/50 transition-all duration-300">
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
                  </div>

                  {/* Pulse AI V2 */}
                  <div className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-8 border border-gray-800 backdrop-blur-xl hover:border-purple-500/50 transition-all duration-300">
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
                  </div>

                  {/* The Knowledge Hub */}
                  <div className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-8 border border-gray-800 backdrop-blur-xl hover:border-sky-500/50 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-sky-600/10 to-indigo-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-sky-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10">
                      <h3 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">3. The Knowledge Hub</h3>
                      <p className="text-sky-300 font-medium mb-4">Your gateway to comprehensive fintech education:</p>
                      <div className="space-y-4">
                        <p className="text-gray-300"><span className="text-white font-medium">Features:</span> Curated learning paths, expert-led courses, and real-world case studies.</p>
                        <p className="text-gray-300"><span className="text-white font-medium">Value:</span> Transform complex fintech concepts into practical knowledge and skills.</p>
                      </div>
                    </div>
                  </div>

                  {/* The Community */}
                  <div className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-8 border border-gray-800 backdrop-blur-xl hover:border-pink-500/50 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-600/10 to-purple-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10">
                      <h3 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">4. The Community</h3>
                      <p className="text-pink-300 font-medium mb-4">Connect, collaborate, and grow together:</p>
                      <div className="space-y-4">
                        <p className="text-gray-300"><span className="text-white font-medium">Features:</span> Discussion forums, networking events, and collaborative projects.</p>
                        <p className="text-gray-300"><span className="text-white font-medium">Value:</span> Build meaningful connections and stay at the forefront of fintech innovation.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;