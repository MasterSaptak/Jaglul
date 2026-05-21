-- Create videos table for YouTube Gallery

CREATE TABLE IF NOT EXISTS public.videos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    youtube_id TEXT NOT NULL,
    thumbnail TEXT NOT NULL,
    is_featured BOOLEAN DEFAULT false,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public profiles are viewable by everyone." 
ON public.videos FOR SELECT USING (true);

-- Allow authenticated users (admins) to insert, update, and delete
CREATE POLICY "Admins can insert videos" 
ON public.videos FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admins can update videos" 
ON public.videos FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can delete videos" 
ON public.videos FOR DELETE USING (auth.role() = 'authenticated');
