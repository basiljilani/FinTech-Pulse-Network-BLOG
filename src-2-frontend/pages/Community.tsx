import React, { useEffect } from 'react';
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

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll<HTMLElement>('[style*="--parallax-y"]');
        
        parallaxElements.forEach((element) => {
          const speed = 0.5;
          const yPos = -(scrolled * speed);
          element.style.setProperty('--parallax-y', `${yPos}px`);
        });
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-black border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
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
            <button
              className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 rounded-lg text-lg font-medium hover:bg-indigo-500"
              onClick={() => window.open('https://discord.gg/NHuzsq9fqe', '_blank')}
            >
              <span>Become a Member</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Founder's Vision Section with Parallax */}
      <section className="relative py-32 overflow-hidden">
        {/* Parallax Background */}
        <div 
          className="absolute inset-0 bg-[url('/images/network-bg.jpg')] bg-cover bg-center"
          style={{
            transform: 'translateY(var(--parallax-y, 0))',
            willChange: 'transform'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />

        {/* Content */}
        <div className="relative container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Section Title */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Our Vision for{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
                  Financial Innovation
                </span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Discover how we're revolutionizing financial technology and empowering our community
              </p>
            </div>

            {/* Founder Card */}
            <div className="relative max-w-4xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-violet-500/10 rounded-2xl blur-3xl" />
              <div className="relative backdrop-blur-xl rounded-2xl p-8 lg:p-10 border border-white/10 bg-black/30">
                <div className="grid lg:grid-cols-[auto,1fr] gap-8 lg:gap-12 items-start">
                  {/* Left Column - Author Info */}
                  <div className="space-y-4 text-center lg:text-left">
                    <div className="relative w-32 h-32 mx-auto lg:mx-0">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 animate-pulse blur-xl opacity-50" />
                      <img
                        src="/images/founder.jpg"
                        alt="Basil Jilani"
                        className="relative w-full h-full object-cover rounded-full border-2 border-white/10"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Basil Jilani</h3>
                      <p className="text-blue-400 font-medium">Founder, FinTech Pulse Network</p>
                    </div>
                  </div>

                  {/* Right Column - Vision */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-violet-500/50" />
                      <div className="bg-gradient-to-r from-blue-500 to-violet-500 p-2 rounded-full shadow-lg shadow-blue-500/20">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z"/>
                        </svg>
                      </div>
                      <div className="h-px flex-1 bg-gradient-to-r from-violet-500/50 to-blue-500/50" />
                    </div>
                    <div className="space-y-4">
                      <p className="text-gray-300 text-lg leading-relaxed">
                        At FinTech Pulse Network, we're more than a platform—we're your lifelong partner in financial empowerment. With Pulse AI and Pulse AI V2, we're breaking barriers, fixing habits, and driving growth for individuals and businesses alike.
                      </p>
                      <p className="text-gray-300 text-lg leading-relaxed">
                        This is more than innovation; it's a revolution. Confidence, clarity, and control over your finances aren't just goals—they're your right. Together, we're shaping a future where no one is left behind.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder's Message Section */}
      <section className="relative -mt-32 z-10 pb-24">
        <div className="container mx-auto px-4">
          <div className="relative max-w-4xl mx-auto backdrop-blur-xl rounded-2xl p-8 lg:p-10 border border-white/10 bg-gradient-to-br from-blue-950/40 to-violet-950/40 shadow-xl">
            {/* Quote Icon */}
            <div className="absolute -top-4 -right-4 z-10">
              <div className="bg-gradient-to-r from-blue-500 to-violet-500 p-2 rounded-full shadow-lg shadow-blue-500/20">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z"/>
                </svg>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid lg:grid-cols-[1fr,2px,1.5fr] gap-8">
              {/* Left Column - Author Info */}
              <div className="space-y-4">
                <div className="relative w-24 h-24 mx-auto lg:mx-0">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 animate-pulse blur-xl opacity-50" />
                  <img
                    src="/images/founder.jpg"
                    alt="Basil Jilani"
                    className="relative w-full h-full object-cover rounded-full border-2 border-white/10"
                  />
                </div>
                <div className="text-center lg:text-left">
                  <h3 className="text-xl font-bold text-white">Basil Jilani</h3>
                  <p className="text-blue-400">Founder, FinTech Pulse Network</p>
                </div>
              </div>

              {/* Divider */}
              <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

              {/* Right Column - Message */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
                  A Message from Our Founder
                </h3>
                <div className="space-y-4">
                  <p className="text-gray-300 leading-relaxed">
                    At FinTech Pulse Network, we're more than a platform—we're your lifelong partner in financial empowerment. With Pulse AI and Pulse AI V2, we're breaking barriers, fixing habits, and driving growth for individuals and businesses alike.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    This is more than innovation; it's a revolution. Confidence, clarity, and control over your finances aren't just goals—they're your right. Together, we're shaping a future where no one is left behind.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-32 bg-gray-950 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Empowering FinTech Minds to Thrive
            </h2>
            <p className="text-xl text-gray-300">
              Our community is more than a network—it's a movement where knowledge, collaboration, and innovation come together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black/40 rounded-xl p-8 border border-gray-800 hover:border-indigo-500/50 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
              <BookOpen className="w-12 h-12 text-indigo-400 mb-6" />
              <h3 className="text-xl font-semibold mb-4">Exclusive Knowledge</h3>
              <p className="text-gray-300">
                Access cutting-edge resources, industry reports, and actionable insights tailored to your goals.
              </p>
            </div>

            <div className="bg-black/40 rounded-xl p-8 border border-gray-800 hover:border-indigo-500/50 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
              <Users className="w-12 h-12 text-indigo-400 mb-6" />
              <h3 className="text-xl font-semibold mb-4">Collaborative Opportunities</h3>
              <p className="text-gray-300">
                Connect with fintech leaders, developers, and visionaries through mentorship programs and peer learning circles.
              </p>
            </div>

            <div className="bg-black/40 rounded-xl p-8 border border-gray-800 hover:border-indigo-500/50 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
              <Rocket className="w-12 h-12 text-indigo-400 mb-6" />
              <h3 className="text-xl font-semibold mb-4">Career Advancement</h3>
              <p className="text-gray-300">
                Unlock skill-building sessions, certification opportunities, and job boards to accelerate your growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pulse AI Section */}
      <section className="py-32 bg-gray-950 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Transforming Conversations with Pulse AI
            </h2>
            <p className="text-xl text-gray-300">
              Get personalized recommendations, stay updated, and engage in meaningful discussions—all powered by Pulse AI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900/40 rounded-3xl p-8 border border-gray-800 hover:border-indigo-500/50 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
              <Brain className="w-12 h-12 text-indigo-400 mb-6" />
              <h3 className="text-xl font-semibold mb-4">Personalized Learning</h3>
              <p className="text-gray-300">
                Discover content tailored to your expertise level and interests.
              </p>
            </div>

            <div className="bg-gray-900/40 rounded-3xl p-8 border border-gray-800 hover:border-indigo-500/50 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
              <MessageCircle className="w-12 h-12 text-indigo-400 mb-6" />
              <h3 className="text-xl font-semibold mb-4">AI-Moderated Discussions</h3>
              <p className="text-gray-300">
                Engage in meaningful conversations enhanced by AI-driven insights.
              </p>
            </div>

            <div className="bg-gray-900/40 rounded-3xl p-8 border border-gray-800 hover:border-indigo-500/50 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
              <TrendingUp className="w-12 h-12 text-indigo-400 mb-6" />
              <h3 className="text-xl font-semibold mb-4">Trend Analysis</h3>
              <p className="text-gray-300">
                Stay ahead with AI-powered industry trend analysis and predictions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 bg-gray-950 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">What Members Are Saying</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.author} className="bg-black/40 rounded-xl p-8 border border-gray-800 hover:border-indigo-500/50 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                <p className="text-gray-300 mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-white">{testimonial.author}</p>
                  {testimonial.role && (
                    <p className="text-indigo-400 text-sm">{testimonial.role}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-32 bg-black border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Stay Ahead with Exclusive Events</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <div key={event.title} className="bg-gray-900/40 rounded-xl p-8 border border-gray-800 hover:border-indigo-500/50 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                {React.createElement(event.icon, { 
                  className: "w-12 h-12 text-indigo-400 mb-6"
                })}
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-indigo-400 text-sm mb-4">{event.date}</p>
                <span className="inline-block px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm">
                  {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Community;
