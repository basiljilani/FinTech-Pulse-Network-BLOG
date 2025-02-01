import React, { useState, useEffect } from 'react';
import { Menu, X, Activity, Users, Cpu, FolderSearch, FileText, LogOut, UserCircle } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Add event listener for route changes
  useEffect(() => {
    closeMenu();
  }, [navigate]);

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

          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link 
              to="/chatbot" 
              className="text-white hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-bold flex items-center transition-all duration-300 hover:scale-105"
            >
              <Cpu className="h-4 w-4 mr-2" />
              Pulse AI
            </Link>

            <Link 
              to="/directory" 
              className="text-white hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-bold flex items-center transition-all duration-300 hover:scale-105"
            >
              <FolderSearch className="h-4 w-4 mr-2" />
              Directory
            </Link>

            <Link
              to="/docs"
              className="text-white hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-bold flex items-center transition-all duration-300 hover:scale-105"
            >
              <FileText className="h-4 w-4 mr-2" />
              Docs
            </Link>

            <Link 
              to="/community" 
              className="text-white hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-bold flex items-center transition-all duration-300 hover:scale-105"
            >
              <Users className="h-4 w-4 mr-2" />
              Community
            </Link>

            {user ? (
              <Link
                to="/profile"
                className="text-white hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-bold flex items-center transition-all duration-300 hover:scale-105"
              >
                <UserCircle className="h-4 w-4 mr-2" />
                Profile
              </Link>
            ) : (
              <Link
                to="/auth"
                className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md text-sm font-bold flex items-center transition-all duration-300 hover:scale-105"
              >
                Sign In
              </Link>
            )}
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
      <motion.div
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: isMenuOpen ? 1 : 0, x: isMenuOpen ? 0 : "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`md:hidden fixed top-16 right-0 w-full h-screen bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-sm ${isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <motion.div 
          className="px-2 pt-2 pb-3 space-y-1"
          initial="closed"
          animate="open"
          variants={{
            open: {
              transition: {
                staggerChildren: 0.1
              }
            },
            closed: {
              transition: {
                staggerChildren: 0.05,
                staggerDirection: -1
              }
            }
          }}
        >
          <motion.div
            variants={{
              open: { x: 0, opacity: 1 },
              closed: { x: 50, opacity: 0 }
            }}
          >
            <Link
              to="/chatbot"
              onClick={closeMenu}
              className="text-gray-100 hover:text-indigo-400 flex items-center px-3 py-2 rounded-md text-base font-bold transition-all duration-300 hover:translate-x-1"
            >
              <Cpu className="h-4 w-4 mr-2" />
              Pulse AI
            </Link>
          </motion.div>

          <motion.div
            variants={{
              open: { x: 0, opacity: 1 },
              closed: { x: 50, opacity: 0 }
            }}
          >
            <Link
              to="/directory"
              onClick={closeMenu}
              className="text-gray-100 hover:text-indigo-400 flex items-center px-3 py-2 rounded-md text-base font-bold transition-all duration-300 hover:translate-x-1"
            >
              <FolderSearch className="h-4 w-4 mr-2" />
              Directory
            </Link>
          </motion.div>

          <motion.div
            variants={{
              open: { x: 0, opacity: 1 },
              closed: { x: 50, opacity: 0 }
            }}
          >
            <Link
              to="/docs"
              onClick={closeMenu}
              className="text-gray-100 hover:text-indigo-400 flex items-center px-3 py-2 rounded-md text-base font-bold transition-all duration-300 hover:translate-x-1"
            >
              <FileText className="h-4 w-4 mr-2" />
              Docs
            </Link>
          </motion.div>

          <motion.div
            variants={{
              open: { x: 0, opacity: 1 },
              closed: { x: 50, opacity: 0 }
            }}
          >
            <Link
              to="/community"
              onClick={closeMenu}
              className="text-gray-100 hover:text-indigo-400 flex items-center px-3 py-2 rounded-md text-base font-bold transition-all duration-300 hover:translate-x-1"
            >
              <Users className="h-4 w-4 mr-2" />
              Community
            </Link>
          </motion.div>

          <motion.div
            variants={{
              open: { x: 0, opacity: 1 },
              closed: { x: 50, opacity: 0 }
            }}
          >
            {user ? (
              <Link
                to="/profile"
                onClick={closeMenu}
                className="text-gray-100 hover:text-indigo-400 flex items-center px-3 py-2 rounded-md text-base font-bold transition-all duration-300 hover:translate-x-1"
              >
                <UserCircle className="h-4 w-4 mr-2" />
                Profile
              </Link>
            ) : (
              <Link
                to="/auth"
                onClick={closeMenu}
                className="text-gray-100 hover:text-indigo-400 flex items-center px-3 py-2 rounded-md text-base font-bold transition-all duration-300 hover:translate-x-1"
              >
                Sign In
              </Link>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </nav>
  );
};

export default Navbar;