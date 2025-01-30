import { create } from 'zustand';
import { signInWithEmail, signUpWithEmail, signOut as supabaseSignOut, getCurrentUser } from './supabase';

interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (username: string, password: string, email: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  loading: true,

  signIn: async (email: string, password: string) => {
    try {
      const { data, error } = await signInWithEmail(email, password);
      if (error) throw error;
      if (data) {
        set({ isAuthenticated: true, user: data.user });
        return { isSignedIn: true };
      }
      return { isSignedIn: false };
    } catch (error: any) {
      console.error('Error signing in:', error);
      throw new Error(error.message || 'Failed to sign in');
    }
  },

  signUp: async (username: string, password: string, email: string, fullName: string) => {
    try {
      const { error } = await signUpWithEmail(email, password, {
        username,
        full_name: fullName
      });
      if (error) throw error;
    } catch (error: any) {
      console.error('Error signing up:', error);
      throw new Error(error.message || 'Failed to sign up');
    }
  },

  signOut: async () => {
    try {
      const { error } = await supabaseSignOut();
      if (error) throw error;
      set({ isAuthenticated: false, user: null });
    } catch (error: any) {
      console.error('Error signing out:', error);
      throw new Error(error.message || 'Failed to sign out');
    }
  },

  checkAuth: async () => {
    try {
      const { user, error } = await getCurrentUser();
      if (error) throw error;
      set({ isAuthenticated: !!user, user, loading: false });
    } catch (error) {
      set({ isAuthenticated: false, user: null, loading: false });
    }
  },
}));
