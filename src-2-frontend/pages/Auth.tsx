import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { signUpWithEmail, signInWithEmail } from '@/lib/supabase';

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: '',
    color: 'bg-gray-700'
  });

  const checkPasswordStrength = (password: string) => {
    let score = 0;
    let message = '';
    let color = 'bg-gray-700';

    if (password.length === 0) {
      setPasswordStrength({ score: 0, message: '', color: 'bg-gray-700' });
      return;
    }

    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;

    // Character variety checks
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    // Set message and color based on score
    switch (true) {
      case (score <= 2):
        message = 'Weak';
        color = 'bg-red-500';
        break;
      case (score <= 4):
        message = 'Moderate';
        color = 'bg-yellow-500';
        break;
      case (score <= 6):
        message = 'Strong';
        color = 'bg-green-500';
        break;
      default:
        message = '';
        color = 'bg-gray-700';
    }

    setPasswordStrength({ score, message, color });
  };

  // Update password strength whenever password changes
  useEffect(() => {
    checkPasswordStrength(password);
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isSignIn) {
        const { data, error: signInError } = await signInWithEmail(email, password);
        if (signInError) throw signInError;
        navigate('/profile');
      } else {
        if (!name || !username) {
          throw new Error('Please fill in all fields');
        }
        const { data, error: signUpError } = await signUpWithEmail(email, password, {
          full_name: name,
          username: username
        });
        if (signUpError) throw signUpError;
        navigate('/profile');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-800/50 p-8 rounded-xl backdrop-blur-sm">
        <div>
          <div className="flex justify-center">
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
              <Activity className="h-12 w-12 text-indigo-400" />
            </motion.div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            {isSignIn ? 'Sign in to your account' : 'Create your account'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            {isSignIn ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => {
                setIsSignIn(!isSignIn);
                setError(null);
              }}
              className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              {isSignIn ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            {!isSignIn && (
              <>
                <div>
                  <label htmlFor="name" className="sr-only">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required={!isSignIn}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white rounded-lg bg-gray-900/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label htmlFor="username" className="sr-only">
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required={!isSignIn}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white rounded-lg bg-gray-900/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm"
                    placeholder="Username"
                  />
                </div>
              </>
            )}
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white rounded-lg bg-gray-900/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white rounded-lg bg-gray-900/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm pr-10"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Eye className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </div>
              {!isSignIn && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-xs text-gray-400">Password Strength:</div>
                    <div className="text-xs" style={{ color: passwordStrength.color }}>
                      {passwordStrength.message}
                    </div>
                  </div>
                  <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${passwordStrength.color} transition-all duration-300`}
                      style={{ width: `${(passwordStrength.score / 6) * 100}%` }}
                    ></div>
                  </div>
                  <div className="mt-1 text-xs text-gray-400">
                    Password should contain at least:
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li className={password.length >= 8 ? "text-green-400" : ""}>8 characters</li>
                      <li className={/[A-Z]/.test(password) ? "text-green-400" : ""}>One uppercase letter</li>
                      <li className={/[a-z]/.test(password) ? "text-green-400" : ""}>One lowercase letter</li>
                      <li className={/[0-9]/.test(password) ? "text-green-400" : ""}>One number</li>
                      <li className={/[^A-Za-z0-9]/.test(password) ? "text-green-400" : ""}>One special character</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          {isSignIn && (
            <div className="flex items-center justify-end">
              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
                  Forgot your password?
                </a>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
              ) : (
                isSignIn ? 'Sign in' : 'Sign up'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
