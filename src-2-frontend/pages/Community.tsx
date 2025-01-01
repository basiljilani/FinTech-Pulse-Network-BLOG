import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  BookOpen, 
  Rocket, 
  Brain,
  Calendar,
  MessageCircle,
  Award,
  TrendingUp,
  Globe,
  Code,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Testimonial {
  quote: string;
  author: string;
  role?: string;
}

interface Event {
  title: string;
  type: 'global' | 'networking' | 'learning';
  date: string;
  icon: React.ElementType;
}

const Community: React.FC = () => {
  const navigate = useNavigate();

  const testimonials: Testimonial[] = [
    {
      quote: "Being part of this community has completely changed how I approach fintech trends and challenges. The connections I've made are invaluable.",
      author: "Sarah Chen",
      role: "FinTech Innovator"
    },
    {
      quote: "The opportunities to collaborate and learn are endless here. It's a one-stop solution for all things fintech.",
      author: "Michael Rodriguez",
      role: "Blockchain Developer"
    },
    {
      quote: "This platform gave me the mentorship and tools I needed to advance my career.",
      author: "Aisha Patel",
      role: "RegTech Specialist"
    }
  ];

  const upcomingEvents: Event[] = [
    {
      title: "FinTech Innovation Summit",
      type: "global",
      date: "March 15, 2025",
      icon: Globe
    },
    {
      title: "Blockchain Workshop Series",
      type: "learning",
      date: "March 20, 2025",
      icon: Code
    },
    {
      title: "RegTech Roundtable",
      type: "networking",
      date: "March 25, 2025",
      icon: Users
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-black border-b border-gray-800">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              Where Innovation
              <span className="block mt-2 bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Meets Connection
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Join the global fintech community redefining collaboration, growth, and innovation. 
              Discover insights, connect with industry leaders, and access opportunities that fuel your professional journey.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 rounded-lg text-lg font-medium hover:bg-indigo-500 transition-colors"
              onClick={() => window.open('https://discord.gg/NHuzsq9fqe', '_blank')}
            >
              <span>Become a Member</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-32 bg-gray-950 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-20"
            {...fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Empowering FinTech Minds to Thrive
            </h2>
            <p className="text-xl text-gray-300">
              Our community is more than a network—it's a movement where knowledge, collaboration, and innovation come together.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-black/40 rounded-xl p-8 border border-gray-800 hover:border-indigo-500/50 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(79,70,229,0.1)] hover:translate-y-[-2px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <BookOpen className="w-12 h-12 text-indigo-400 mb-6" />
              <h3 className="text-xl font-semibold mb-4">Exclusive Knowledge</h3>
              <p className="text-gray-300">
                Access cutting-edge resources, industry reports, and actionable insights tailored to your goals.
              </p>
            </motion.div>

            <motion.div
              className="bg-black/40 rounded-xl p-8 border border-gray-800 hover:border-indigo-500/50 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(79,70,229,0.1)] hover:translate-y-[-2px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Users className="w-12 h-12 text-indigo-400 mb-6" />
              <h3 className="text-xl font-semibold mb-4">Collaborative Opportunities</h3>
              <p className="text-gray-300">
                Connect with fintech leaders, developers, and visionaries through mentorship programs and peer learning circles.
              </p>
            </motion.div>

            <motion.div
              className="bg-black/40 rounded-xl p-8 border border-gray-800 hover:border-indigo-500/50 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(79,70,229,0.1)] hover:translate-y-[-2px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Rocket className="w-12 h-12 text-indigo-400 mb-6" />
              <h3 className="text-xl font-semibold mb-4">Career Advancement</h3>
              <p className="text-gray-300">
                Unlock skill-building sessions, certification opportunities, and job boards to accelerate your growth.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pulse AI Section */}
      <section className="py-32 bg-gray-950 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-20"
            {...fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Transforming Conversations with Pulse AI
            </h2>
            <p className="text-xl text-gray-300">
              Get personalized recommendations, stay updated, and engage in meaningful discussions—all powered by Pulse AI.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-gray-900/40 rounded-3xl p-8 border border-gray-800 hover:border-indigo-500/50 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(79,70,229,0.1)] hover:translate-y-[-2px] relative z-10 before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gray-900/20 before:rounded-3xl before:z-[-1]"
              {...fadeInUp}
              transition={{ delay: 0.2 }}
            >
              <Brain className="w-12 h-12 text-indigo-400 mb-6" />
              <h3 className="text-xl font-semibold mb-4">Personalized Learning</h3>
              <p className="text-gray-300">
                Discover content tailored to your expertise level and interests.
              </p>
            </motion.div>

            <motion.div
              className="bg-gray-900/40 rounded-3xl p-8 border border-gray-800 hover:border-indigo-500/50 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(79,70,229,0.1)] hover:translate-y-[-2px] relative z-10 before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gray-900/20 before:rounded-3xl before:z-[-1]"
              {...fadeInUp}
              transition={{ delay: 0.3 }}
            >
              <MessageCircle className="w-12 h-12 text-indigo-400 mb-6" />
              <h3 className="text-xl font-semibold mb-4">AI-Moderated Discussions</h3>
              <p className="text-gray-300">
                Engage in meaningful conversations enhanced by AI-driven insights.
              </p>
            </motion.div>

            <motion.div
              className="bg-gray-900/40 rounded-3xl p-8 border border-gray-800 hover:border-indigo-500/50 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(79,70,229,0.1)] hover:translate-y-[-2px] relative z-10 before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gray-900/20 before:rounded-3xl before:z-[-1]"
              {...fadeInUp}
              transition={{ delay: 0.4 }}
            >
              <TrendingUp className="w-12 h-12 text-indigo-400 mb-6" />
              <h3 className="text-xl font-semibold mb-4">Trend Analysis</h3>
              <p className="text-gray-300">
                Stay ahead with AI-powered industry trend analysis and predictions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 bg-gray-950 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-20"
            {...fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">What Members Are Saying</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                className="bg-black/40 rounded-xl p-8 border border-gray-800 hover:border-indigo-500/50 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(79,70,229,0.1)] hover:translate-y-[-2px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <p className="text-gray-300 mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-white">{testimonial.author}</p>
                  {testimonial.role && (
                    <p className="text-indigo-400 text-sm">{testimonial.role}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-32 bg-black border-b border-gray-800">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-20"
            {...fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Stay Ahead with Exclusive Events</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.title}
                className="bg-gray-900/40 rounded-xl p-8 border border-gray-800 hover:border-indigo-500/50 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(79,70,229,0.1)] hover:translate-y-[-2px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {React.createElement(event.icon, { 
                  className: "w-12 h-12 text-indigo-400 mb-6"
                })}
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-indigo-400 text-sm mb-4">{event.date}</p>
                <span className="inline-block px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm">
                  {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Community;
