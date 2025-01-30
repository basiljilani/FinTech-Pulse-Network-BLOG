-- Add new columns to the profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS company TEXT,
ADD COLUMN IF NOT EXISTS job_title TEXT,
ADD COLUMN IF NOT EXISTS website TEXT,
ADD COLUMN IF NOT EXISTS bio TEXT;

-- Update the handle_new_user function to include new fields
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (
        id, 
        full_name, 
        username, 
        avatar_url,
        company,
        job_title,
        website,
        bio,
        updated_at
    )
    VALUES (
        NEW.id,
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'username',
        NEW.raw_user_meta_data->>'avatar_url',
        NEW.raw_user_meta_data->>'company',
        NEW.raw_user_meta_data->>'job_title',
        NEW.raw_user_meta_data->>'website',
        NEW.raw_user_meta_data->>'bio',
        NOW()
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
