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

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "FinTech Startup Founder",
      company: "InnovateFin",
      content: "FPN has revolutionized how we create and manage financial content. The AI-driven insights are incredibly accurate and time-saving.",
      image: "/testimonials/sarah.jpg"
    },
    {
      name: "Michael Rodriguez",
      role: "Chief Content Officer",
      company: "Global Finance Weekly",
      content: "The quality and consistency of content generated through FPN has exceeded our expectations. It's become an indispensable tool for our team.",
      image: "/testimonials/michael.jpg"
    },
    {
      name: "Emily Watson",
      role: "Financial Advisor",
      company: "Wealth Dynamics",
      content: "FPN helps me provide more value to my clients through personalized content and insights. It's like having a team of experts at your fingertips.",
      image: "/testimonials/emily.jpg"
    },
    {
      name: "David Park",
      role: "Investment Analyst",
      company: "Capital Insights",
      content: "The platform's ability to analyze market trends and generate actionable insights is remarkable. It's transformed our research process.",
      image: "/testimonials/david.jpg"
    },
    {
      name: "Lisa Thompson",
      role: "Content Director",
      company: "FinanceHub",
      content: "We've seen a 300% increase in engagement since implementing FPN. The AI-generated content is both informative and engaging.",
      image: "/testimonials/lisa.jpg"
    },
    {
      name: "James Wilson",
      role: "Head of Digital",
      company: "Banking Today",
      content: "FPN's platform has streamlined our content creation process while maintaining the highest standards of accuracy and compliance.",
      image: "/testimonials/james.jpg"
    },
    {
      name: "Anna Martinez",
      role: "Marketing Manager",
      company: "TechFin Solutions",
      content: "The personalization capabilities of FPN have helped us connect with our audience on a deeper level. The results speak for themselves.",
      image: "/testimonials/anna.jpg"
    },
    {
      name: "Robert Chang",
      role: "CEO",
      company: "Digital Assets Corp",
      content: "In the fast-paced world of digital assets, FPN keeps us ahead of the curve with timely, accurate, and insightful content.",
      image: "/testimonials/robert.jpg"
    },
    {
      name: "Sophie Laurent",
      role: "Content Strategist",
      company: "European FinTech Review",
      content: "The multilingual capabilities and cultural awareness of FPN's content generation are impressive. It's truly a global solution.",
      image: "/testimonials/sophie.jpg"
    },
    {
      name: "Marcus Bennett",
      role: "Research Director",
      company: "Future Finance Institute",
      content: "FPN has become our go-to platform for generating complex financial analysis and reports. The accuracy and depth of insights are unmatched.",
      image: "/testimonials/marcus.jpg"
    },
    {
      name: "Rachel Kim",
      role: "Digital Content Lead",
      company: "AsiaFin Times",
      content: "The speed and quality of content generation through FPN have given us a competitive edge in the fast-moving Asian markets.",
      image: "/testimonials/rachel.jpg"
    },
    {
      name: "Thomas Anderson",
      role: "Product Manager",
      company: "WealthTech Solutions",
      content: "Implementing FPN has reduced our content production time by 70% while improving quality. It's a game-changer for our industry.",
      image: "/testimonials/thomas.jpg"
    }
  ];

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

      {/* Our Values Section */}
      <section className="py-24 relative overflow-hidden bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-50px" }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <motion.h2 
              className="text-5xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 mb-8"
              initial={{ backgroundPosition: "0%" }}
              animate={{ backgroundPosition: "100%" }}
              transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
            >
              Our Values
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Innovation Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-8 border border-gray-800 backdrop-blur-xl hover:border-indigo-500/50 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-purple-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <h3 className="text-3xl font-bold text-white mb-4 relative z-10">
                #Innovation
              </h3>
              <p className="text-gray-400 relative z-10">
                Pushing boundaries with cutting-edge solutions that redefine the future of financial technology.
              </p>
            </motion.div>

            {/* Trust Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-8 border border-gray-800 backdrop-blur-xl hover:border-purple-500/50 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <h3 className="text-3xl font-bold text-white mb-4 relative z-10">
                #Trust
              </h3>
              <p className="text-gray-400 relative z-10">
                Building lasting relationships through transparency, security, and unwavering commitment to our users.
              </p>
            </motion.div>

            {/* Collaboration Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-8 border border-gray-800 backdrop-blur-xl hover:border-pink-500/50 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-600/10 to-indigo-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <h3 className="text-3xl font-bold text-white mb-4 relative z-10">
                #Collaboration
              </h3>
              <p className="text-gray-400 relative z-10">
                Fostering a community where knowledge sharing and mutual growth create opportunities for everyone.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 relative overflow-hidden bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-50px" }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <motion.h2 
              className="text-5xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 mb-8"
              initial={{ backgroundPosition: "0%" }}
              animate={{ backgroundPosition: "100%" }}
              transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
            >
              Our Community
            </motion.h2>
          </motion.div>
        </div>

        <div className="relative w-full overflow-hidden px-8">
          <div className="absolute left-0 top-0 w-48 h-full bg-gradient-to-r from-black via-black to-transparent z-10" />
          <div className="absolute right-0 top-0 w-48 h-full bg-gradient-to-l from-black via-black to-transparent z-10" />
          
          <motion.div 
            className="flex gap-6 py-4"
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{
              x: {
                duration: 40,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear"
              }
            }}
          >
            {/* First set of testimonials */}
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[320px] bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-xl p-5 border border-gray-800 backdrop-blur-xl hover:border-indigo-500/50 transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <p className="text-gray-400 text-sm mb-3 line-clamp-4">{testimonial.content}</p>
                    <div>
                      <p className="text-white font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-indigo-400 text-xs">{testimonial.role}</p>
                      <p className="text-gray-500 text-xs">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Duplicate testimonials for seamless loop */}
            {testimonials.map((testimonial, index) => (
              <div
                key={`duplicate-${index}`}
                className="flex-shrink-0 w-[320px] bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-xl p-5 border border-gray-800 backdrop-blur-xl hover:border-indigo-500/50 transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <p className="text-gray-400 text-sm mb-3 line-clamp-4">{testimonial.content}</p>
                    <div>
                      <p className="text-white font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-indigo-400 text-xs">{testimonial.role}</p>
                      <p className="text-gray-500 text-xs">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Grid Background */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black via-indigo-950/40 to-black"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(129, 140, 248, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(129, 140, 248, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-b from-gray-900/50 via-indigo-900/20 to-gray-900/50 backdrop-blur-xl rounded-xl shadow-xl border border-indigo-500/20 hover:border-indigo-400/40 transition-all duration-500">
              <div className="p-3 sm:p-4 border-b border-indigo-500/20 bg-black/40">
                <div className="flex items-center space-x-2.5">
                  <svg
                    className="h-5 w-5 text-indigo-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 8h1a4 4 0 110 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zm4-7v3M12 1v3M8 1v3"
                    />
                  </svg>
                  <h2 className="text-lg font-bold">
                    <span className="text-white">FPN</span>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">newsletter</span>
                  </h2>
                </div>
              </div>

              <div className="p-8 sm:p-12">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="space-y-8 text-center"
                >
                  <div className="space-y-4">
                    <motion.h2 
                      className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-purple-300"
                    >Explore the Future of Finance</motion.h2>
                    <p className="text-xl md:text-2xl bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 bg-clip-text text-transparent font-medium">
                      Join an elite community of innovators revolutionizing the financial landscape
                    </p>
                  </div>
                  
                  <p className="text-lg text-indigo-200/80 max-w-2xl mx-auto">
                    Get exclusive insights, cutting-edge AI developments, and transformative FinTech strategies delivered straight to your inbox.
                  </p>
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-block"
                  >
                    <a
                      href="https://fpn1.substack.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative inline-flex items-center px-12 py-4 text-lg font-medium overflow-hidden rounded-xl transition-all duration-500"
                    >
                      {/* Primary gradient background */}
                      <div className="absolute inset-0 w-full h-full transition-all duration-300 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>
                      
                      {/* Animated gradient overlay */}
                      <div className="absolute inset-0 w-full h-full transition-all duration-500 opacity-0 group-hover:opacity-100 bg-[length:200%_200%] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 to-indigo-500 animate-gradient-xy"></div>
                      
                      {/* Shine effect */}
                      <div className="absolute inset-0 w-full h-full transition-all duration-500 group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                      {/* Glass reflection */}
                      <div className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.4),transparent_70%)]"></div>
                      
                      {/* Button content */}
                      <span className="relative flex items-center font-semibold text-white">
                        <span className="mr-2">Subscribe Now</span>
                        <svg
                          className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </a>
                  </motion.div>

                  {/* Add keyframes for gradient animation */}
                  <style jsx>{`
                    @keyframes gradient-xy {
                      0%, 100% { background-position: 0% 50%; }
                      50% { background-position: 100% 50%; }
                    }
                    .animate-gradient-xy {
                      animation: gradient-xy 15s ease infinite;
                    }
                  `}</style>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;