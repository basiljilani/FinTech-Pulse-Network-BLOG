import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  MessageCircle, 
  Rocket, 
  Award, 
  TrendingUp, 
  Globe,
  Zap,
  UserPlus,
  Share2,
  Lightbulb,
  Network,
  Brain,
  Quote,
  Star
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Community = () => {
  const navigate = useNavigate();

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Fintech Innovation Lead",
      company: "Digital Banking Solutions",
      quote: "Being part of this community has transformed my understanding of fintech. The insights and connections I've made here are invaluable.",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "Blockchain Developer",
      company: "Crypto Innovations Inc",
      quote: "The level of expertise and willingness to share knowledge in this community is unprecedented. It's become my go-to resource for staying ahead in fintech.",
      rating: 5
    },
    {
      name: "Aisha Patel",
      role: "RegTech Specialist",
      company: "Global Compliance Solutions",
      quote: "From mentorship opportunities to collaborative projects, this platform has accelerated my professional growth in ways I never expected.",
      rating: 5
    }
  ];

  const communityStats = [
    {
      icon: Users,
      title: "Global Network",
      description: "Join a thriving community of fintech professionals, developers, and industry experts from around the world.",
      stats: "Growing Community"
    },
    {
      icon: MessageCircle,
      title: "Active Discussions",
      description: "Engage in meaningful conversations about the latest trends, challenges, and innovations in financial technology.",
      stats: "Daily Discussions"
    },
    {
      icon: Award,
      title: "Expert Contributors",
      description: "Learn from and connect with verified industry experts who share their knowledge and experiences regularly.",
      stats: "Industry Experts"
    }
  ];

  const communityFeatures = [
    {
      icon: Network,
      title: "Professional Networking",
      description: "Build meaningful connections in the fintech space",
      details: [
        "Industry-specific Groups",
        "Mentor Matching",
        "Peer Learning Circles",
        "Expert Directory",
        "Virtual Networking Events"
      ]
    },
    {
      icon: Brain,
      title: "Knowledge Sharing",
      description: "Collaborate and learn from the community",
      details: [
        "Discussion Forums",
        "Resource Library",
        "Code Repositories",
        "Case Study Sharing",
        "Best Practice Guides"
      ]
    },
    {
      icon: Rocket,
      title: "Growth Opportunities",
      description: "Accelerate your professional development",
      details: [
        "Job Board Access",
        "Skill Development",
        "Certification Programs",
        "Project Collaboration",
        "Leadership Opportunities"
      ]
    }
  ];

  const upcomingEvents = [
    {
      icon: Globe,
      title: "Global Events",
      items: [
        "FinTech Innovation Summit",
        "Blockchain Workshop Series",
        "AI in Finance Meetup",
        "RegTech Roundtable",
        "Startup Pitch Day"
      ]
    },
    {
      icon: UserPlus,
      title: "Networking Activities",
      items: [
        "Speed Networking Sessions",
        "Industry Expert AMAs",
        "Regional Meetups",
        "Career Fair",
        "Mentorship Program"
      ]
    },
    {
      icon: Share2,
      title: "Learning Sessions",
      items: [
        "Technical Workshops",
        "Industry Trends Webinars",
        "Code Review Sessions",
        "Product Demo Days",
        "Hackathons"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0F1E]">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Join Our Global
            <span className="block mt-2 text-[#8B5CF6]">
              FinTech Community
            </span>
          </h1>

          {/* Inspiring Quote */}
          <div className="my-8 relative">
            <Quote className="w-8 h-8 text-[#8B5CF6] absolute -left-4 -top-4 opacity-50" />
            <p className="text-2xl text-gray-300 italic">
              "Innovation in financial technology is not just about building solutions; it's about building connections that drive the future of finance."
            </p>
          </div>

          <p className="text-xl text-gray-300 mb-12">
            Connect, collaborate, and grow with fellow fintech enthusiasts and professionals
          </p>
        </motion.div>
      </div>

      {/* Community Stats */}
      <div className="bg-[#0D1321] py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 text-white">Community Impact</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Join a thriving ecosystem of fintech professionals making an impact in the industry
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {communityStats.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#1A1F2E] rounded-2xl p-8 hover:bg-[#1E2435] transition-all duration-300"
              >
                <div className="w-14 h-14 bg-[#8B5CF6]/20 rounded-xl flex items-center justify-center mb-6">
                  {React.createElement(item.icon, { className: 'w-7 h-7 text-[#8B5CF6]' })}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">{item.title}</h3>
                <p className="text-gray-300 mb-4">{item.description}</p>
                <div className="text-[#8B5CF6] font-semibold">{item.stats}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Community Features */}
      <div className="py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 text-white">Community Features</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Everything you need to connect, learn, and grow in the fintech industry
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {communityFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#1A1F2E] rounded-2xl p-8 hover:bg-[#1E2435] transition-all duration-300"
              >
                <div className="w-14 h-14 bg-[#8B5CF6]/20 rounded-xl flex items-center justify-center mb-6">
                  {React.createElement(feature.icon, { className: 'w-7 h-7 text-[#8B5CF6]' })}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">{feature.title}</h3>
                <p className="text-gray-300 mb-6">{feature.description}</p>
                <ul className="space-y-3">
                  {feature.details.map((detail, i) => (
                    <li key={i} className="flex items-center text-gray-300">
                      <Zap className="w-4 h-4 text-[#8B5CF6] mr-2" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-[#0D1321] py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 text-white">Upcoming Events</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Join our upcoming events and activities to connect with the community
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#1A1F2E] rounded-2xl p-8 hover:bg-[#1E2435] transition-all duration-300"
              >
                <div className="w-14 h-14 bg-[#8B5CF6]/20 rounded-xl flex items-center justify-center mb-6">
                  {React.createElement(event.icon, { className: 'w-7 h-7 text-[#8B5CF6]' })}
                </div>
                <h3 className="text-xl font-semibold mb-6 text-white">{event.title}</h3>
                <ul className="space-y-3">
                  {event.items.map((item, i) => (
                    <li key={i} className="flex items-center text-gray-300">
                      <Lightbulb className="w-4 h-4 text-[#8B5CF6] mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6 text-white">Ready to Join?</h2>
            <p className="text-gray-300 mb-10 text-lg">
              Become part of our growing community and help shape the future of financial technology.
            </p>
            <a 
              href="https://discord.gg/NHuzsq9fqe"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-4 bg-[#8B5CF6] rounded-xl hover:bg-[#7C3AED] transition-colors text-lg font-semibold text-white cursor-pointer"
            >
              Join the Community
            </a>
          </motion.div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-24 bg-[#0D1321]">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 text-white">Community Voices</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Hear from our members about their experiences in our community
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#1A1F2E] rounded-2xl p-8 hover:bg-[#1E2435] transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#8B5CF6] fill-current" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-[#8B5CF6] mb-4 opacity-50" />
                <p className="text-gray-300 mb-6 italic">{testimonial.quote}</p>
                <div className="border-t border-gray-700 pt-4">
                  <p className="text-white font-semibold">{testimonial.name}</p>
                  <p className="text-gray-400">{testimonial.role}</p>
                  <p className="text-[#8B5CF6]">{testimonial.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
