import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Auth helper functions
export const signUpWithEmail = async (email: string, password: string, metadata: { full_name: string; username: string }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata,
    },
  });
  return { data, error };
};

export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};

// Profile helper functions
export const getProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return { data, error };
};

export const updateProfile = async (userId: string, updates: any) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId);
  return { data, error };
};

// Subscription helper functions
export const getSubscriptionTiers = async () => {
  const { data, error } = await supabase
    .from('subscriptions.tiers')
    .select('*');
  return { data, error };
};

export const createSubscription = async (userId: string, tierId: number, amount: number, paymentMethod: string, paymentId: string) => {
  const { data, error } = await supabase
    .from('subscriptions.transactions')
    .insert([
      {
        user_id: userId,
        tier_id: tierId,
        amount,
        status: 'completed',
        payment_method: paymentMethod,
        payment_id: paymentId,
      },
    ]);
  return { data, error };
};
