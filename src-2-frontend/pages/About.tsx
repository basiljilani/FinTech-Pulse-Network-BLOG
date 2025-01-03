import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain,
  Rocket,
  LineChart,
  Users,
  Zap,
  Target,
  Globe,
  BookOpen,
  MessageCircle,
  BarChart,
  Bot,
  Network,
  Lightbulb,
  Award,
  TrendingUp,
  GraduationCap,
  LucideIcon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const About: React.FC = () => {
  const navigate = useNavigate();
  const [percentage, setPercentage] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setPercentage(prev => {
          if (prev >= 75) {
            clearInterval(interval);
            return 75;
          }
          return prev + 1;
        });
      }, 20);

      return () => clearInterval(interval);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const fadeInUpVariant = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const pulseAIFeatures: Feature[] = [
    {
      icon: Brain,
      title: "Adaptive Learning",
      description: "Personalized conversations that adapt to your expertise level and learning style"
    },
    {
      icon: BookOpen,
      title: "Smart Summarization",
      description: "Instant article summaries and deep dives tailored to your needs"
    },
    {
      icon: MessageCircle,
      title: "Interactive Discussions",
      description: "Transform static content into dynamic, engaging conversations"
    }
  ];

  const pulseAIV2Features: Feature[] = [
    {
      icon: LineChart,
      title: "Market Sentiment Analysis",
      description: "Real-time analysis of market trends and sentiment"
    },
    {
      icon: Target,
      title: "Predictive Insights",
      description: "Industry-specific forecasting and trend prediction"
    },
    {
      icon: Users,
      title: "Collaborative Intelligence",
      description: "Team-based learning and shared AI-driven insights"
    }
  ];

  const uniqueFeatures: Feature[] = [
    {
      icon: Zap,
      title: "Hyper-Personalization",
      description: "A platform that evolves with your learning journey and professional growth"
    },
    {
      icon: Award,
      title: "Premium Content",
      description: "Proprietary insights powered by real-time data and AI-driven analysis"
    },
    {
      icon: Globe,
      title: "Global Community",
      description: "Connect with fintech professionals, students, and enterprises worldwide"
    }
  ];

  const interactiveFeatures: Feature[] = [
    {
      icon: Bot,
      title: "AI Discussions",
      description: "Engage in real-time article discussions with Pulse AI"
    },
    {
      icon: BarChart,
      title: "Custom Reports",
      description: "Generate personalized insights and analysis reports"
    },
    {
      icon: Network,
      title: "Expert Network",
      description: "Connect with industry leaders and participate in expert-led discussions"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Helmet>
        <title>About | FinTech Pulse Network</title>
        <meta name="description" content="FinTech Pulse Network provides industry-leading AI-powered financial analysis, insights, and automation tools to financial institutions worldwide." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://fintechpulsenetwork.com/about" />
        
        {/* OpenGraph tags */}
        <meta property="og:title" content="About | FinTech Pulse Network" />
        <meta property="og:description" content="FinTech Pulse Network provides industry-leading AI-powered financial analysis, insights, and automation tools to financial institutions worldwide." />
        <meta property="og:url" content="https://fintechpulsenetwork.com/about" />
        
        {/* Schema.org markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About FinTech Pulse Network",
            "description": "FinTech Pulse Network provides industry-leading AI-powered financial analysis, insights, and automation tools to financial institutions worldwide.",
            "url": "https://fintechpulsenetwork.com/about",
            "mainEntity": {
              "@type": "Organization",
              "name": "FinTech Pulse Network",
              "description": "Leading AI-Powered Financial Technology Platform",
              "url": "https://fintechpulsenetwork.com"
            }
          })}
        </script>
      </Helmet>
      {/* Hero Section */}
      <section className="pt-40 pb-24 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Redefining FinTech Knowledge
              <span className="block mt-2 bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">
                for the Next Era
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              FinTech Pulse Network isn't just a platform—it's a revolution in how you explore, learn, and engage with fintech insights. Powered by advanced AI and tailored for every user, we're creating the future of financial intelligence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pulse AI Section */}
      <section className="py-24 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            {...fadeInUpVariant}
          >
            <h2 className="text-3xl font-bold mb-4">Meet Pulse AI: Your Personalized Knowledge Companion</h2>
            <p className="text-gray-400">
              Pulse AI is more than a chatbot; it's your fintech mentor. Designed to adapt to your unique learning style, it delivers tailored insights, challenges your thinking, and provides actionable intelligence in real time.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pulseAIFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-gray-900 rounded-lg p-8 relative overflow-hidden group"
                {...fadeInUpVariant}
                transition={{ delay: index * 0.1 }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-500" />
                <div className="relative">
                  <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-6">
                    {React.createElement(feature.icon, { className: "w-6 h-6 text-indigo-400" })}
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pulse AI V2 Section */}
      <section className="py-24 border-b border-gray-800 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            {...fadeInUpVariant}
          >
            <h2 className="text-3xl font-bold mb-4">Pulse AI V2: The Evolution of Intelligent Engagement</h2>
            <p className="text-gray-400">
              Pulse AI V2 takes innovation a step further with advanced analytics, predictive insights, and collaborative tools. Imagine an AI that doesn't just inform but empowers decision-making through foresight and strategy.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {pulseAIV2Features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-black rounded-lg p-8 relative overflow-hidden group"
                {...fadeInUpVariant}
                transition={{ delay: index * 0.1 }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-500" />
                <div className="relative">
                  <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-6">
                    {React.createElement(feature.icon, { className: "w-6 h-6 text-indigo-400" })}
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="max-w-md mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="mb-4">
              <span className="text-indigo-400 font-medium text-xl">Coming Soon!</span>
            </div>
            <div className="relative h-1 w-full bg-gray-800/50 rounded-full overflow-hidden mb-2">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 relative"
                style={{
                  width: `${percentage}%`,
                  animation: 'loading 2s linear infinite'
                } as React.CSSProperties}
              />
            </div>
            <div className="text-sm text-indigo-400/80 font-medium mb-1">
              Development: {percentage}% Complete
            </div>
            <div className="text-xs text-gray-500">
              March 2025
            </div>
            <style global jsx>{`
              @keyframes loading {
                0% {
                  transform: translateX(-100%);
                }
                100% {
                  transform: translateX(100%);
                }
              }
            `}</style>
          </motion.div>
        </div>
      </section>

      {/* Our Unique Approach */}
      <section className="py-24 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            {...fadeInUpVariant}
          >
            <h2 className="text-3xl font-bold mb-4">What Makes Us Different</h2>
            <p className="text-gray-400">
              We don't just curate content. We create an ecosystem where learning, collaboration, and innovation converge.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {uniqueFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-gray-900 rounded-lg p-8 relative overflow-hidden group"
                {...fadeInUpVariant}
                transition={{ delay: index * 0.1 }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-500" />
                <div className="relative">
                  <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-6">
                    {React.createElement(feature.icon, { className: "w-6 h-6 text-indigo-400" })}
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 border-b border-gray-800 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            {...fadeInUpVariant}
          >
            <h2 className="text-3xl font-bold mb-4">Building the Future of Financial Knowledge</h2>
            <p className="text-gray-400">
              At FinTech Pulse, we envision a world where every professional has the tools to stay ahead, every student learns interactively, and every enterprise drives innovation effortlessly.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative pl-8 border-l-2 border-indigo-500">
              <motion.div 
                className="mb-12"
                {...fadeInUpVariant}
              >
                <div className="absolute -left-2 w-4 h-4 bg-indigo-500 rounded-full" />
                <h3 className="text-xl font-semibold mb-2">RegTech & InsurTech Expansion</h3>
                <p className="text-gray-400">Broadening our coverage to include regulatory technology and insurance innovation</p>
              </motion.div>

              <motion.div 
                className="mb-12"
                {...fadeInUpVariant}
                transition={{ delay: 0.1 }}
              >
                <div className="absolute -left-2 w-4 h-4 bg-indigo-500 rounded-full" />
                <h3 className="text-xl font-semibold mb-2">Global Knowledge Network</h3>
                <p className="text-gray-400">Multilingual support and region-specific insights for global audiences</p>
              </motion.div>

              <motion.div 
                {...fadeInUpVariant}
                transition={{ delay: 0.2 }}
              >
                <div className="absolute -left-2 w-4 h-4 bg-indigo-500 rounded-full" />
                <h3 className="text-xl font-semibold mb-2">AI-Driven Certification</h3>
                <p className="text-gray-400">Revolutionary certification programs powered by adaptive AI learning</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Features */}
      <section className="py-24 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            {...fadeInUpVariant}
          >
            <h2 className="text-3xl font-bold mb-4">Beyond Reading: Experience Knowledge</h2>
            <p className="text-gray-400">
              Turn passive consumption into active learning with features that redefine engagement.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {interactiveFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-gray-900 rounded-lg p-8 relative overflow-hidden group"
                {...fadeInUpVariant}
                transition={{ delay: index * 0.1 }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-500" />
                <div className="relative">
                  <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-6">
                    {React.createElement(feature.icon, { className: "w-6 h-6 text-indigo-400" })}
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            {...fadeInUpVariant}
          >
            <h2 className="text-3xl font-bold mb-4">Your Journey to FinTech Mastery Starts Here</h2>
            <p className="text-gray-400 mb-8">
              Join the FinTech Pulse Network to experience the evolution of financial knowledge. Whether you're a professional, a student, or a visionary enterprise, this is your gateway to innovation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => navigate('/chatbot')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-medium transition-colors duration-200"
              >
                Get Started
              </button>
              <button 
                onClick={() => navigate('/ai-companion')}
                className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-full font-medium transition-colors duration-200"
              >
                Learn More About Pulse AI
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
