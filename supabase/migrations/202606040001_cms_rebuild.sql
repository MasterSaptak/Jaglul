-- Supabase Migration: Studio CMS Rebuild
-- Description: Adds new tables (visions, content_visibility, post_visions, documents) and updates existing tables.

-- 1. Create `visions` table
CREATE TABLE IF NOT EXISTS public.visions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    short_description TEXT,
    full_description TEXT,
    cover_image TEXT,
    banner_image TEXT,
    featured_video_url TEXT,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS for visions
ALTER TABLE public.visions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "visions public read published" ON public.visions
    FOR SELECT USING (status = 'published');

CREATE POLICY "visions admin manage" ON public.visions
    FOR ALL USING (public.is_admin());

-- 2. Modify `posts` table
ALTER TABLE public.posts 
ADD COLUMN IF NOT EXISTS scheduled_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS content_format TEXT DEFAULT 'markdown',
ADD COLUMN IF NOT EXISTS meta_title TEXT,
ADD COLUMN IF NOT EXISTS meta_description TEXT,
ADD COLUMN IF NOT EXISTS og_image TEXT,
ADD COLUMN IF NOT EXISTS canonical_url TEXT,
ADD COLUMN IF NOT EXISTS featured_image_id UUID, -- We'll add the FK constraint later if needed, or leave it as a soft link
ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;

-- 3. Modify `media` table
ALTER TABLE public.media
ADD COLUMN IF NOT EXISTS caption TEXT,
ADD COLUMN IF NOT EXISTS credits TEXT,
ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS file_size BIGINT,
ADD COLUMN IF NOT EXISTS width INTEGER,
ADD COLUMN IF NOT EXISTS height INTEGER,
ADD COLUMN IF NOT EXISTS mime_type TEXT;

-- 4. Modify `videos` table
ALTER TABLE public.videos
ADD COLUMN IF NOT EXISTS description TEXT,
ADD COLUMN IF NOT EXISTS category TEXT,
ADD COLUMN IF NOT EXISTS vision_id UUID REFERENCES public.visions(id) ON DELETE SET NULL;

-- 5. Create `content_visibility` table
CREATE TABLE IF NOT EXISTS public.content_visibility (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content_type TEXT NOT NULL CHECK (content_type IN ('post', 'vision')),
    content_id UUID NOT NULL,
    location TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(content_type, content_id, location)
);

-- RLS for content_visibility
ALTER TABLE public.content_visibility ENABLE ROW LEVEL SECURITY;

CREATE POLICY "content_visibility public read" ON public.content_visibility
    FOR SELECT USING (true); -- Usually safe to expose visibility mappings

CREATE POLICY "content_visibility admin manage" ON public.content_visibility
    FOR ALL USING (public.is_admin());

-- 6. Create `post_visions` table (Many-to-many)
CREATE TABLE IF NOT EXISTS public.post_visions (
    post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
    vision_id UUID REFERENCES public.visions(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (post_id, vision_id)
);

-- RLS for post_visions
ALTER TABLE public.post_visions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "post_visions public read" ON public.post_visions
    FOR SELECT USING (true);

CREATE POLICY "post_visions admin manage" ON public.post_visions
    FOR ALL USING (public.is_admin());

-- 7. Create `documents` table
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID REFERENCES public.posts(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    storage_path TEXT,
    file_type TEXT,
    file_size BIGINT,
    uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS for documents
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- If a document is attached to a post, public can only read if post is published.
-- Otherwise, if no post, maybe it's standalone, but let's restrict to safe side or handle via joins.
-- For simplicity, if it's for public download, we can make it readable.
CREATE POLICY "documents public read" ON public.documents
    FOR SELECT USING (true);

CREATE POLICY "documents admin manage" ON public.documents
    FOR ALL USING (public.is_admin());

-- Add trigger to update updated_at on visions
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_visions_updated_at ON public.visions;
CREATE TRIGGER update_visions_updated_at
    BEFORE UPDATE ON public.visions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
