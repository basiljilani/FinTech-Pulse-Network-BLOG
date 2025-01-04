import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Users, 
  BookOpen, 
  Rocket, 
  Brain,
  MessageCircle,
  TrendingUp,
  Calendar,
  Presentation,
  Video
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CommunityScene from '../components/three/CommunityScene';
import SmoothScroll from '../components/SmoothScroll';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

interface Event {
  title: string;
  description: string;
  date: string;
  icon: any;
}

const NewCommunity: React.FC = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Hero section animations - gentle fade out
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.9]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

  // Why Join section - slower slide from right with longer window
  const whyJoinX = useTransform(scrollYProgress, [0.1, 0.25], [1000, 0]);
  const whyJoinOpacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);

  // Pulse AI section - slower slide from left with longer window
  const pulseAiX = useTransform(scrollYProgress, [0.3, 0.45], [-1000, 0]);
  const pulseAiOpacity = useTransform(scrollYProgress, [0.3, 0.45], [0, 1]);

  // Testimonials section - extended timing window
  const testimonialX = useTransform(scrollYProgress, [0.5, 0.7], [1000, 0]);
  const testimonialOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);

  // Events section - extended timing window
  const eventsX = useTransform(scrollYProgress, [0.75, 0.95], [-1000, 0]);
  const eventsOpacity = useTransform(scrollYProgress, [0.75, 0.95], [0, 1]);

  // Custom spring configuration for smoother motion
  const transitionConfig = {
    type: "spring",
    stiffness: 50,
    damping: 20
  };

  const testimonials: Testimonial[] = [
    {
      quote: "The insights and connections I've gained here have been invaluable for my FinTech startup.",
      author: "Sarah Chen",
      role: "Founder & CEO"
    },
    {
      quote: "A fantastic community that keeps me ahead of the curve in financial technology.",
      author: "Michael Rodriguez",
      role: "Senior Developer"
    },
    {
      quote: "The collaborative environment here has helped me grow both professionally and personally.",
      author: "Emily Watson",
      role: "Product Manager"
    }
  ];

  const upcomingEvents: Event[] = [
    {
      title: "FinTech Innovation Summit",
      description: "Join industry leaders for insights into the latest financial technology trends.",
      date: "March 15, 2024",
      icon: Calendar
    },
    {
      title: "Blockchain Workshop Series",
      description: "Hands-on sessions exploring blockchain development and implementation.",
      date: "April 2, 2024",
      icon: Presentation
    },
    {
      title: "AI in Finance Webinar",
      description: "Expert discussion on AI applications in modern financial services.",
      date: "April 20, 2024",
      icon: Video
    }
  ];

  return (
    <SmoothScroll>
      <div id="community-container" className="relative overflow-hidden" ref={containerRef}>
        {/* Background Scene */}
        <div className="fixed inset-0 z-0">
          <CommunityScene />
        </div>

        {/* Content Sections */}
        <div className="relative z-10">
          {/* Hero Section */}
          <section className="min-h-screen flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-20">
              <motion.div 
                className="max-w-4xl mx-auto text-center"
                style={{
                  scale: heroScale,
                  opacity: heroOpacity,
                  y: heroY
                }}
                transition={transitionConfig}
              >
                <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight text-white">
                  Where Innovation
                  <span className="bg-gradient-to-r from-blue-500 to-indigo-600 text-transparent bg-clip-text"> Meets Community</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 mb-8">
                  Join a thriving ecosystem of FinTech professionals, innovators, and thought leaders.
                </p>
                <button
                  onClick={() => navigate('/join')}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
                >
                  Join Our Community
                </button>
              </motion.div>
            </div>
          </section>

          {/* Why Join Section - Slides from Right */}
          <section className="min-h-screen flex items-center bg-black/40 backdrop-blur-sm border-t border-white/5">
            <motion.div 
              className="container mx-auto px-4 py-20 w-full"
              style={{
                x: whyJoinX,
                opacity: whyJoinOpacity
              }}
              transition={transitionConfig}
            >
              <motion.div 
                className="text-center max-w-3xl mx-auto mb-20"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                  Empowering FinTech Minds to Thrive
                </h2>
                <p className="text-xl text-gray-300">
                  Discover why professionals choose our community for growth and innovation.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div
                  className="p-8 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-indigo-500/50 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <BookOpen className="w-12 h-12 text-indigo-400 mb-6" />
                  <h3 className="text-xl font-semibold mb-4 text-white">Exclusive Knowledge</h3>
                  <p className="text-gray-300">
                    Access curated content and insights from industry experts.
                  </p>
                </motion.div>

                <motion.div
                  className="p-8 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-indigo-500/50 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <Users className="w-12 h-12 text-indigo-400 mb-6" />
                  <h3 className="text-xl font-semibold mb-4 text-white">Collaborative Opportunities</h3>
                  <p className="text-gray-300">
                    Connect with peers and industry leaders for meaningful partnerships.
                  </p>
                </motion.div>

                <motion.div
                  className="p-8 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-indigo-500/50 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <Rocket className="w-12 h-12 text-indigo-400 mb-6" />
                  <h3 className="text-xl font-semibold mb-4 text-white">Career Advancement</h3>
                  <p className="text-gray-300">
                    Accelerate your professional growth through networking and opportunities.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </section>

          {/* Pulse AI Section - Slides from Left */}
          <section className="min-h-screen flex items-center bg-black/50 backdrop-blur-sm border-t border-white/5">
            <motion.div 
              className="container mx-auto px-4 py-20 w-full"
              style={{
                x: pulseAiX,
                opacity: pulseAiOpacity
              }}
              transition={transitionConfig}
            >
              <motion.div 
                className="text-center max-w-3xl mx-auto mb-20"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                  Transforming Conversations with Pulse AI
                </h2>
                <p className="text-xl text-gray-300">
                  Experience the future of community engagement powered by artificial intelligence.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div
                  className="p-8 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-indigo-500/50 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Brain className="w-12 h-12 text-indigo-400 mb-6" />
                  <h3 className="text-xl font-semibold mb-4 text-white">Personalized Learning</h3>
                  <p className="text-gray-300">
                    AI-driven content recommendations tailored to your interests and goals.
                  </p>
                </motion.div>

                <motion.div
                  className="p-8 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-indigo-500/50 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <MessageCircle className="w-12 h-12 text-indigo-400 mb-6" />
                  <h3 className="text-xl font-semibold mb-4 text-white">AI-Moderated Discussions</h3>
                  <p className="text-gray-300">
                    Intelligent conversation facilitation for meaningful exchanges.
                  </p>
                </motion.div>

                <motion.div
                  className="p-8 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-indigo-500/50 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <TrendingUp className="w-12 h-12 text-indigo-400 mb-6" />
                  <h3 className="text-xl font-semibold mb-4 text-white">Trend Analysis</h3>
                  <p className="text-gray-300">
                    Stay ahead with AI-powered insights into industry trends and opportunities.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </section>

          {/* Testimonials Section - Slides from Right */}
          <section className="min-h-screen flex items-center bg-black/40 backdrop-blur-sm border-t border-white/5">
            <motion.div 
              className="container mx-auto px-4 py-20 w-full"
              style={{
                x: testimonialX,
                opacity: testimonialOpacity
              }}
              transition={transitionConfig}
            >
              <motion.div 
                className="text-center max-w-3xl mx-auto mb-20"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">What Members Are Saying</h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.author}
                    className="p-8 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-indigo-500/50 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <p className="text-gray-300 mb-6 italic">"{testimonial.quote}"</p>
                    <div>
                      <p className="text-white font-semibold">{testimonial.author}</p>
                      <p className="text-indigo-400">{testimonial.role}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Upcoming Events Section - Slides from Left */}
          <section className="min-h-screen flex items-center bg-black/50 backdrop-blur-sm border-t border-white/5">
            <motion.div 
              className="container mx-auto px-4 py-20 w-full"
              style={{
                x: eventsX,
                opacity: eventsOpacity
              }}
              transition={transitionConfig}
            >
              <motion.div 
                className="text-center max-w-3xl mx-auto mb-20"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Stay Ahead with Exclusive Events</h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {upcomingEvents.map((event, index) => (
                  <motion.div
                    key={event.title}
                    className="p-8 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-indigo-500/50 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    {React.createElement(event.icon, { 
                      className: "w-12 h-12 text-indigo-400 mb-6"
                    })}
                    <h3 className="text-xl font-semibold mb-4 text-white">{event.title}</h3>
                    <p className="text-gray-300 mb-4">{event.description}</p>
                    <p className="text-indigo-400 font-semibold">{event.date}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>
        </div>
      </div>
    </SmoothScroll>
  );
};

export default NewCommunity;
