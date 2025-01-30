export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          updated_at: string | null;
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
          subscription_start: string | null;
          subscription_end: string | null;
        };
        Insert: {
          id: string;
          updated_at?: string | null;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          website?: string | null;
          company?: string | null;
          job_title?: string | null;
          bio?: string | null;
          email?: string | null;
          subscription_tier?: string;
          subscription_status?: string;
          subscription_start?: string | null;
          subscription_end?: string | null;
        };
        Update: {
          id?: string;
          updated_at?: string | null;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          website?: string | null;
          company?: string | null;
          job_title?: string | null;
          bio?: string | null;
          email?: string | null;
          subscription_tier?: string;
          subscription_status?: string;
          subscription_start?: string | null;
          subscription_end?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
  subscriptions: {
    Tables: {
      tiers: {
        Row: {
          id: number;
          name: string;
          price: number;
          features: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          price: number;
          features: any;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          price?: number;
          features?: any;
          created_at?: string;
          updated_at?: string;
        };
      };
      transactions: {
        Row: {
          id: string;
          user_id: string;
          tier_id: number;
          amount: number;
          status: string;
          payment_method: string | null;
          payment_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          tier_id: number;
          amount: number;
          status: string;
          payment_method?: string | null;
          payment_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          tier_id?: number;
          amount?: number;
          status?: string;
          payment_method?: string | null;
          payment_id?: string | null;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
