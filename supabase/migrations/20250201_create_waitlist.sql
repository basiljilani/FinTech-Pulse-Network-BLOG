-- Create an enumerated type for subscription status
CREATE TYPE subscription_status AS ENUM ('pending', 'confirmed', 'unsubscribed');

-- Create the waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    status subscription_status DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    confirmed_at TIMESTAMP WITH TIME ZONE,
    unsubscribed_at TIMESTAMP WITH TIME ZONE,
    source TEXT, -- Track where the signup came from
    ip_address TEXT, -- Store IP for fraud prevention
    metadata JSONB -- Flexible field for additional data
);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS waitlist_email_idx ON waitlist(email);

-- Create an index on status for filtering
CREATE INDEX IF NOT EXISTS waitlist_status_idx ON waitlist(status);

-- Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows inserting by anyone (for signups)
CREATE POLICY "Allow public to insert emails" ON waitlist
    FOR INSERT
    TO public
    WITH CHECK (true);

-- Create a policy that only allows admins to view all records
CREATE POLICY "Allow admins to view all records" ON waitlist
    FOR SELECT
    TO authenticated
    USING (auth.role() = 'admin');

-- Create a function to check for duplicate emails
CREATE OR REPLACE FUNCTION check_duplicate_email()
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM waitlist 
        WHERE email = NEW.email 
        AND status != 'unsubscribed'
    ) THEN
        RAISE EXCEPTION 'Email already exists in waitlist';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to check for duplicates before insert
CREATE TRIGGER check_duplicate_email_trigger
    BEFORE INSERT ON waitlist
    FOR EACH ROW
    EXECUTE FUNCTION check_duplicate_email();

-- Create a secure view for analytics
CREATE OR REPLACE VIEW waitlist_analytics AS
SELECT
    DATE_TRUNC('day', created_at) AS signup_date,
    COUNT(*) AS total_signups,
    COUNT(CASE WHEN status = 'confirmed' THEN 1 END) AS confirmed_signups,
    COUNT(CASE WHEN status = 'unsubscribed' THEN 1 END) AS unsubscribed
FROM waitlist
GROUP BY DATE_TRUNC('day', created_at)
ORDER BY signup_date DESC;

-- Grant necessary permissions
GRANT INSERT ON waitlist TO public;
GRANT ALL ON waitlist TO authenticated;
GRANT SELECT ON waitlist_analytics TO authenticated;
