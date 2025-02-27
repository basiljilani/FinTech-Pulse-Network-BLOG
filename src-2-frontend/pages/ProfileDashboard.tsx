import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '@supabase/supabase-js';
import { getCurrentUser, getProfile, updateProfile } from '@/lib/supabase';
import { Settings, User as UserIcon, Building, Briefcase, Globe, Mail, LogOut, X, Save } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

interface Profile {
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  website: string | null;
  company: string | null;
  job_title: string | null;
  bio: string | null;
  email: string | null;
  subscription_tier: string;
  subscription_status: string;
}

const ProfileDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const { user: currentUser, error: userError } = await getCurrentUser();
      if (userError) throw userError;
      
      if (!currentUser) {
        navigate('/auth');
        return;
      }

      setUser(currentUser);
      
      const { data: profileData, error: profileError } = await getProfile(currentUser.id);
      if (profileError) throw profileError;

      setProfile(profileData);
      setFormData(profileData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !formData) return;

    try {
      setLoading(true);
      console.log('Updating profile with data:', formData);
      
      const { error: updateError } = await updateProfile(user.id, {
        full_name: formData.full_name,
        username: formData.username,
        email: formData.email,
        company: formData.company,
        job_title: formData.job_title,
        website: formData.website,
        bio: formData.bio,
        updated_at: new Date().toISOString()
      });

      if (updateError) {
        console.error('Profile update error:', updateError);
        throw updateError;
      }

      // Reload profile data to confirm update
      const { data: updatedProfile, error: profileError } = await getProfile(user.id);
      if (profileError) {
        console.error('Error fetching updated profile:', profileError);
        throw profileError;
      }

      setProfile(updatedProfile);
      setIsEditing(false);
      
      // Show success message
      const successMessage = 'Profile updated successfully!';
      setError(successMessage);
      console.log(successMessage);
      
      // Reload user data to ensure everything is up to date
      loadUserData();
      
    } catch (err: any) {
      console.error('Profile update failed:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col">
        {/* Grid Background */}
        <div 
          className="fixed inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(179, 157, 219, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(179, 157, 219, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }}
        />

        {/* Main Container */}
        <div className="flex-1 flex flex-col relative z-10 pt-28 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Grid Background */}
      <div 
        className="fixed inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(179, 157, 219, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(179, 157, 219, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col relative z-10 pt-28 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Profile Header */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-xl border border-gray-800 hover:border-indigo-500/30 transition-all duration-300">
            <div className="px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-indigo-500/20 group-hover:border-indigo-500/40 transition-all duration-300">
                    <img
                      src={profile?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${profile?.full_name || 'User'}`}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-3xl font-bold text-white mb-1">{profile?.full_name || 'Welcome!'}</h2>
                  <p className="text-indigo-400 text-lg">@{profile?.username || 'username'}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    if (isEditing) {
                      setFormData(profile);
                    }
                    setIsEditing(!isEditing);
                  }}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 text-sm
                    ${isEditing 
                      ? 'bg-gray-800 text-gray-200 hover:bg-gray-700 border border-gray-700' 
                      : 'bg-indigo-600/90 text-white hover:bg-indigo-600'
                    }`}
                >
                  {isEditing ? (
                    <>
                      <X className="h-4 w-4 mr-2 stroke-2" />
                      Cancel
                    </>
                  ) : (
                    <>
                      <Settings className="h-4 w-4 mr-2 stroke-2" />
                      Edit Profile
                    </>
                  )}
                </button>
                {isEditing && (
                  <button
                    onClick={(e) => handleSubmit(e)}
                    className="flex items-center px-4 py-2 bg-indigo-600/90 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-200 text-sm"
                  >
                    <Save className="h-4 w-4 mr-2 stroke-2" />
                    Save Changes
                  </button>
                )}
                <button
                  onClick={signOut}
                  className="flex items-center px-4 py-2 bg-red-600/90 text-white rounded-lg hover:bg-red-500 transition-colors duration-200 text-sm"
                >
                  <LogOut className="h-4 w-4 mr-2 stroke-2" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className={`${
              error === 'Profile updated successfully!' 
                ? 'bg-green-500/10 border-green-500 text-green-400' 
                : 'bg-red-500/10 border-red-500 text-red-400'
            } px-6 py-4 rounded-xl border backdrop-blur-sm animate-fade-in`}>
              {error}
            </div>
          )}

          {/* Main Content */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-xl border border-gray-800 hover:border-indigo-500/30 transition-all duration-300">
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                      <div className="relative rounded-lg shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <UserIcon className="h-5 w-5 text-gray-400 group-hover:text-indigo-400 transition-colors duration-300" />
                        </div>
                        <input
                          type="text"
                          name="full_name"
                          value={formData?.full_name || ''}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="bg-gray-700/50 block w-full pl-12 pr-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div className="group">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                      <div className="relative rounded-lg shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <span className="text-gray-400 group-hover:text-indigo-400 transition-colors duration-300">@</span>
                        </div>
                        <input
                          type="text"
                          name="username"
                          value={formData?.username || ''}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="bg-gray-700/50 block w-full pl-12 pr-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div className="group">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                      <div className="relative rounded-lg shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400 group-hover:text-indigo-400 transition-colors duration-300" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={formData?.email || ''}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="bg-gray-700/50 block w-full pl-12 pr-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
                      <div className="relative rounded-lg shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Building className="h-5 w-5 text-gray-400 group-hover:text-indigo-400 transition-colors duration-300" />
                        </div>
                        <input
                          type="text"
                          name="company"
                          value={formData?.company || ''}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="bg-gray-700/50 block w-full pl-12 pr-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div className="group">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Job Title</label>
                      <div className="relative rounded-lg shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Briefcase className="h-5 w-5 text-gray-400 group-hover:text-indigo-400 transition-colors duration-300" />
                        </div>
                        <input
                          type="text"
                          name="job_title"
                          value={formData?.job_title || ''}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="bg-gray-700/50 block w-full pl-12 pr-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div className="group">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Website</label>
                      <div className="relative rounded-lg shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Globe className="h-5 w-5 text-gray-400 group-hover:text-indigo-400 transition-colors duration-300" />
                        </div>
                        <input
                          type="url"
                          name="website"
                          value={formData?.website || ''}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="bg-gray-700/50 block w-full pl-12 pr-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bio Section */}
                <div className="group">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                  <div className="mt-1">
                    <textarea
                      name="bio"
                      rows={4}
                      value={formData?.bio || ''}
                      onChange={(e) => {
                        const newBio = e.target.value;
                        // Only update if within limits
                        if (newBio.length <= 500 && newBio.split(/\s+/).filter(Boolean).length <= 100) {
                          handleInputChange(e);
                        }
                      }}
                      disabled={!isEditing}
                      className="bg-gray-700/50 block w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white transition-all duration-300"
                      placeholder="Tell us about yourself..."
                      maxLength={500}
                    />
                    {isEditing && (
                      <div className="mt-2 flex justify-between text-sm text-gray-400">
                        <span>
                          {formData?.bio ? formData.bio.length : 0}/500 characters
                        </span>
                        <span>
                          {formData?.bio ? formData.bio.split(/\s+/).filter(Boolean).length : 0}/100 words
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Subscription Info */}
                <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-800/50 p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 px-1">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">Subscription Details</h3>
                      <p className="text-gray-400 text-sm">Manage your FPN subscription</p>
                    </div>
                    <Link
                      to="/pricing"
                      className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center transition-all duration-300 hover:translate-x-1"
                    >
                      View Plans
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-1">
                    <div className="bg-black/40 backdrop-blur-sm rounded-xl p-5 border border-gray-800/50 relative">
                      <div className="absolute top-4 right-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          profile?.subscription_status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {profile?.subscription_status === 'active' ? '● Active' : '○ Inactive'}
                        </span>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <span className="w-8 h-8 bg-indigo-500/10 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </span>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm text-gray-400 mb-1">Current Plan</p>
                          <p className="text-lg text-white font-medium mb-3">{profile?.subscription_tier || 'Free'}</p>
                          <div className="flex flex-col space-y-2">
                            {(!profile?.subscription_tier || profile?.subscription_tier === 'Free' || profile?.subscription_tier.toLowerCase() === 'free') && (
                              <Link
                                to="/checkout"
                                state={{ 
                                  plan: {
                                    name: 'Pro',
                                    price: '99',
                                    description: 'Best for growing businesses'
                                  }
                                }}
                                className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center transition-all duration-300 w-fit"
                              >
                                Upgrade
                                <svg className="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-black/40 backdrop-blur-sm rounded-xl p-5 border border-gray-800/50">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <span className="w-8 h-8 bg-indigo-500/10 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </span>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm text-gray-400 mb-1">Plan Features</p>
                          <ul className="space-y-2">
                            {profile?.subscription_tier === 'Free' || !profile?.subscription_tier ? (
                              <>
                                <li className="text-white text-sm flex items-center">
                                  <span className="w-4 h-4 mr-2 text-indigo-400">✓</span>
                                  Basic AI Companion Access
                                </li>
                                <li className="text-white text-sm flex items-center">
                                  <span className="w-4 h-4 mr-2 text-indigo-400">✓</span>
                                  Community Access
                                </li>
                                <li className="text-gray-500 text-sm flex items-center">
                                  <span className="w-4 h-4 mr-2">✗</span>
                                  Advanced AI Features
                                </li>
                              </>
                            ) : (
                              <>
                                <li className="text-white text-sm flex items-center">
                                  <span className="w-4 h-4 mr-2 text-indigo-400">✓</span>
                                  Full AI Companion Access
                                </li>
                                <li className="text-white text-sm flex items-center">
                                  <span className="w-4 h-4 mr-2 text-indigo-400">✓</span>
                                  Priority Community Support
                                </li>
                                <li className="text-white text-sm flex items-center">
                                  <span className="w-4 h-4 mr-2 text-indigo-400">✓</span>
                                  Advanced AI Features
                                </li>
                              </>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-8 py-3 bg-indigo-600/90 text-white text-lg font-medium rounded-lg hover:bg-indigo-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-indigo-500/25"
                    >
                      {loading ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </span>
                      ) : (
                        'Save Changes'
                      )}
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
