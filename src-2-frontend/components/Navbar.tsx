import React, { useState, useEffect } from 'react';
import { Menu, X, Activity, Users, Lightbulb, Cpu } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#0D1321]/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-bold text-white flex items-center">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Activity className="h-8 w-8 mr-2 text-indigo-400" />
                </motion.div>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
                  FinTech Pulse Network
                </span>
              </Link>
            </div>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link to="/ai-companion" className="text-white hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-bold flex items-center transition-all duration-300 hover:scale-105 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
              <Cpu className="h-4 w-4 mr-1" />
              Pulse AI
            </Link>
            <Link to="/directory" className="text-white hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-bold transition-all duration-300 hover:scale-105 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
              Directory
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/insights"
                className="text-gray-100 hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-bold transition-all duration-300 hover:scale-105 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]"
              >
                Insights
              </Link>
              <Link
                to="/docs"
                className="text-gray-100 hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-bold transition-all duration-300 hover:scale-105 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]"
              >
                Docs
              </Link>
            </div>
            <Link to="/community" className="text-white hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-bold flex items-center transition-all duration-300 hover:scale-105 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
              <Users className="h-4 w-4 mr-1" />
              Community
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-sm">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/ai-companion"
              className="text-gray-100 hover:text-indigo-400 block px-3 py-2 rounded-md text-base font-bold transition-all duration-300 hover:translate-x-1 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]"
            >
              Pulse AI
            </Link>
            <Link
              to="/directory"
              className="text-gray-100 hover:text-indigo-400 block px-3 py-2 rounded-md text-base font-bold transition-all duration-300 hover:translate-x-1 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]"
            >
              Directory
            </Link>
            <Link
              to="/insights"
              className="text-gray-100 hover:text-indigo-400 block px-3 py-2 rounded-md text-base font-bold transition-all duration-300 hover:translate-x-1 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]"
            >
              Insights
            </Link>
            <Link
              to="/docs"
              className="text-gray-100 hover:text-indigo-400 block px-3 py-2 rounded-md text-base font-bold transition-all duration-300 hover:translate-x-1 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]"
            >
              Docs
            </Link>
            <Link
              to="/community"
              className="text-gray-100 hover:text-indigo-400 block px-3 py-2 rounded-md text-base font-bold transition-all duration-300 hover:translate-x-1 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]"
            >
              Community
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;