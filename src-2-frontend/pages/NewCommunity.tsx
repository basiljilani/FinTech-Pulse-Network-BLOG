import React from 'react';
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

  const testimonials: Testimonial[] = [
    {
      quote: "FPN has transformed how I approach fintech innovation. The community insights are invaluable.",
      author: "Sarah Chen",
      role: "Fintech Entrepreneur"
    },
    {
      quote: "The collaborative environment here is unmatched. It's where innovation meets execution.",
      author: "Michael Rodriguez",
      role: "Investment Analyst"
    },
    {
      quote: "Being part of FPN has accelerated my professional growth in ways I never imagined.",
      author: "David Park",
      role: "Product Manager"
    }
  ];

  const upcomingEvents: Event[] = [
    {
      title: "Future of DeFi Summit",
      description: "Join industry leaders for insights on decentralized finance trends and innovations.",
      date: "March 15, 2024",
      icon: Presentation
    },
    {
      title: "AI in FinTech Workshop",
      description: "Hands-on session exploring the latest AI applications in financial technology.",
      date: "March 22, 2024",
      icon: Brain
    },
    {
      title: "Global FinTech Meetup",
      description: "Network with professionals and discover new opportunities in the industry.",
      date: "April 5, 2024",
      icon: Video
    }
  ];

  return (
    <div id="community-container" className="relative overflow-hidden bg-black">
      {/* Background Scene */}
      <div className="fixed inset-0 z-0 opacity-40">
        <CommunityScene />
      </div>

      {/* Content Sections */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center bg-black/50">
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-4xl mx-auto text-center">
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
            </div>
          </div>
        </section>

        {/* Why Join Section */}
        <section className="min-h-screen flex items-center bg-black/60 border-t border-white/5">
          <div className="container mx-auto px-4 py-20 w-full">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Empowering FinTech Minds to Thrive
              </h2>
              <p className="text-xl text-gray-300">
                Discover why professionals choose our community for growth and innovation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-all duration-300">
                <BookOpen className="w-12 h-12 text-indigo-400 mb-6" />
                <h3 className="text-xl font-semibold mb-4 text-white">Exclusive Knowledge</h3>
                <p className="text-gray-300">
                  Access curated content and insights from industry experts.
                </p>
              </div>

              <div className="p-8 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-all duration-300">
                <Users className="w-12 h-12 text-indigo-400 mb-6" />
                <h3 className="text-xl font-semibold mb-4 text-white">Collaborative Opportunities</h3>
                <p className="text-gray-300">
                  Connect with peers and industry leaders for meaningful partnerships.
                </p>
              </div>

              <div className="p-8 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-all duration-300">
                <Rocket className="w-12 h-12 text-indigo-400 mb-6" />
                <h3 className="text-xl font-semibold mb-4 text-white">Career Advancement</h3>
                <p className="text-gray-300">
                  Accelerate your professional growth through networking and opportunities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pulse AI Section */}
        <section className="min-h-screen flex items-center bg-black/70 border-t border-white/5">
          <div className="container mx-auto px-4 py-20 w-full">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Transforming Conversations with Pulse AI
              </h2>
              <p className="text-xl text-gray-300">
                Experience the future of community engagement powered by artificial intelligence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-all duration-300">
                <Brain className="w-12 h-12 text-indigo-400 mb-6" />
                <h3 className="text-xl font-semibold mb-4 text-white">Personalized Learning</h3>
                <p className="text-gray-300">
                  AI-driven content recommendations tailored to your interests and goals.
                </p>
              </div>

              <div className="p-8 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-all duration-300">
                <MessageCircle className="w-12 h-12 text-indigo-400 mb-6" />
                <h3 className="text-xl font-semibold mb-4 text-white">AI-Moderated Discussions</h3>
                <p className="text-gray-300">
                  Intelligent conversation facilitation for meaningful exchanges.
                </p>
              </div>

              <div className="p-8 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-all duration-300">
                <TrendingUp className="w-12 h-12 text-indigo-400 mb-6" />
                <h3 className="text-xl font-semibold mb-4 text-white">Trend Analysis</h3>
                <p className="text-gray-300">
                  Stay ahead with AI-powered insights into industry trends and opportunities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="min-h-screen flex items-center bg-black/60 border-t border-white/5">
          <div className="container mx-auto px-4 py-20 w-full">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">What Members Are Saying</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.author} className="p-8 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-all duration-300">
                  <p className="text-gray-300 mb-6 italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="text-white font-semibold">{testimonial.author}</p>
                    <p className="text-indigo-400">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Events Section */}
        <section className="min-h-screen flex items-center bg-black/70 border-t border-white/5">
          <div className="container mx-auto px-4 py-20 w-full">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Stay Ahead with Exclusive Events</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {upcomingEvents.map((event, index) => (
                <div key={event.title} className="p-8 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-all duration-300">
                  {React.createElement(event.icon, { 
                    className: "w-12 h-12 text-indigo-400 mb-6"
                  })}
                  <h3 className="text-xl font-semibold mb-4 text-white">{event.title}</h3>
                  <p className="text-gray-300 mb-4">{event.description}</p>
                  <p className="text-indigo-400 font-semibold">{event.date}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NewCommunity;
