-- =========================================================================
-- BUHUGU LIVING HOPE MINISTRIES - DATABASE SCHEMA
-- Location: Sironko–Bulambuli, Uganda
-- Motto: HOPE FOR ALL HUMAN KIND
-- =========================================================================

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROGRAMMES TABLE
CREATE TABLE IF NOT EXISTS programmes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    objectives TEXT[] DEFAULT '{}',
    icon_name TEXT DEFAULT 'Heart',
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. ACTIVITIES TABLE
CREATE TABLE IF NOT EXISTS activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    activity_date DATE NOT NULL DEFAULT CURRENT_DATE,
    location TEXT NOT NULL DEFAULT 'Sironko–Bulambuli, Uganda',
    programme_id UUID REFERENCES programmes(id) ON DELETE SET NULL,
    programme_name TEXT,
    beneficiaries_total INTEGER DEFAULT 0,
    women_reached INTEGER DEFAULT 0,
    children_reached INTEGER DEFAULT 0,
    other_beneficiaries INTEGER DEFAULT 0,
    outcomes TEXT,
    challenges TEXT,
    next_steps TEXT,
    main_image_url TEXT,
    status TEXT NOT NULL DEFAULT 'published', -- 'draft', 'published', 'archived'
    created_by TEXT DEFAULT 'Administrator',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. ACTIVITY IMAGES TABLE
CREATE TABLE IF NOT EXISTS activity_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    activity_id UUID REFERENCES activities(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    storage_path TEXT,
    caption TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. WEBSITE CONTENT TABLE
CREATE TABLE IF NOT EXISTS website_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section TEXT NOT NULL UNIQUE,
    title TEXT,
    content JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by TEXT DEFAULT 'Administrator'
);

-- 5. GALLERY PHOTOS TABLE
CREATE TABLE IF NOT EXISTS gallery_photos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT DEFAULT 'Community',
    image_url TEXT NOT NULL,
    caption TEXT,
    activity_id UUID REFERENCES activities(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================

ALTER TABLE programmes ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_photos ENABLE ROW LEVEL SECURITY;

-- Public Read Policies
CREATE POLICY "Public read programmes" ON programmes FOR SELECT USING (true);
CREATE POLICY "Public read published activities" ON activities FOR SELECT USING (status = 'published' OR auth.role() = 'authenticated');
CREATE POLICY "Public read activity images" ON activity_images FOR SELECT USING (true);
CREATE POLICY "Public read website content" ON website_content FOR SELECT USING (true);
CREATE POLICY "Public read gallery" ON gallery_photos FOR SELECT USING (true);

-- Authenticated Admin Write Policies
CREATE POLICY "Admin write programmes" ON programmes FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write activities" ON activities FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write activity images" ON activity_images FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write website content" ON website_content FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write gallery" ON gallery_photos FOR ALL USING (auth.role() = 'authenticated');

-- =========================================================================
-- INITIAL SEED DATA FOR BUHUGU LIVING HOPE MINISTRIES
-- =========================================================================

INSERT INTO programmes (slug, name, description, objectives) VALUES
('women-empowerment', 'Women Empowerment', 'Supporting women with opportunities, practical skills, vocational training, and economic self-reliance initiatives in Sironko–Bulambuli.', ARRAY['Provide tailoring and craft skills training', 'Establish women self-help savings groups', 'Promote maternal health awareness']),
('children-empowerment', 'Children Empowerment', 'Supporting children wellbeing, educational protection, nutrition, and holistic community development.', ARRAY['Distribute school books and uniforms', 'Provide child nutrition supplements', 'Ensure child safeguarding and rights education']),
('education', 'Education Support', 'Supporting educational opportunities and learning initiatives for disadvantaged children and youth.', ARRAY['Sponsor vulnerable learners', 'Supply learning materials to rural schools', 'Improve classroom study environments']),
('community-development', 'Community Development', 'Partnering with local communities to identify social challenges and implement sustainable infrastructure & clean water solutions.', ARRAY['Community water source rehabilitation', 'Sanitation and hygiene sensitization', 'Community leadership forums']),
('livelihood-empowerment', 'Livelihood Empowerment', 'Creating sustainable livelihood programs, agricultural support, and income-generating projects for families.', ARRAY['Provide high-yield seed varieties', 'Train families in climate-smart farming', 'Support small enterprise development']),
('community-outreach', 'Community Outreach', 'Direct humanitarian assistance, healthcare support, and emergency relief to vulnerable elderly and impoverished households.', ARRAY['Distribute food & hygiene packages', 'Organize free medical checkup camps', 'Visit isolated elderly community members'])
ON CONFLICT (slug) DO NOTHING;
