-- =============================================
-- Apotek Shaka Farma — Supabase Database Schema
-- =============================================

-- 1. Profiles (extends auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  role TEXT DEFAULT 'ADMIN' CHECK (role IN ('ADMIN', 'SUPERADMIN')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Products
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('OB','OBT','SUPLEMEN','HERBAL','ALKES','IBU_ANAK')),
  description TEXT,
  indication TEXT,
  dosage TEXT,
  price INTEGER NOT NULL,
  stock_status TEXT DEFAULT 'TERSEDIA' CHECK (stock_status IN ('TERSEDIA','TERBATAS','HABIS')),
  image_url TEXT,
  symptoms TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT FALSE,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Posters (poster promosi, menggantikan promo/flash sale)
CREATE TABLE posters (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  linked_product_ids UUID[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Testimonials
CREATE TABLE testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Articles
CREATE TABLE articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  image_url TEXT,
  related_product_ids UUID[] DEFAULT '{}',
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Inquiries
CREATE TABLE inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT,
  product_id UUID REFERENCES products(id),
  status TEXT DEFAULT 'NEW' CHECK (status IN ('NEW','FOLLOWED_UP','CLOSED')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- Row Level Security (RLS)
-- =============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE posters ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Public read policies (for website visitors)
CREATE POLICY "Public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Public read active posters" ON posters FOR SELECT USING (is_active = true);
CREATE POLICY "Public read published testimonials" ON testimonials FOR SELECT USING (is_published = true);
CREATE POLICY "Public read published articles" ON articles FOR SELECT USING (is_published = true);

-- Admin write policies (authenticated users only)
CREATE POLICY "Admin full access products" ON products FOR ALL
  USING (auth.uid() IN (SELECT id FROM profiles))
  WITH CHECK (auth.uid() IN (SELECT id FROM profiles));

CREATE POLICY "Admin full access posters" ON posters FOR ALL
  USING (auth.uid() IN (SELECT id FROM profiles))
  WITH CHECK (auth.uid() IN (SELECT id FROM profiles));

CREATE POLICY "Admin full access testimonials" ON testimonials FOR ALL
  USING (auth.uid() IN (SELECT id FROM profiles))
  WITH CHECK (auth.uid() IN (SELECT id FROM profiles));

CREATE POLICY "Admin full access articles" ON articles FOR ALL
  USING (auth.uid() IN (SELECT id FROM profiles))
  WITH CHECK (auth.uid() IN (SELECT id FROM profiles));

CREATE POLICY "Admin full access inquiries" ON inquiries FOR ALL
  USING (auth.uid() IN (SELECT id FROM profiles))
  WITH CHECK (auth.uid() IN (SELECT id FROM profiles));

CREATE POLICY "Admin read own profile" ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Superadmin manage profiles" ON profiles FOR ALL
  USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'SUPERADMIN'))
  WITH CHECK (auth.uid() IN (SELECT id FROM profiles WHERE role = 'SUPERADMIN'));

-- Public insert for inquiries (website visitors can submit)
CREATE POLICY "Public insert inquiries" ON inquiries FOR INSERT WITH CHECK (true);

-- =============================================
-- Trigger: auto-create profile on signup
-- =============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', 'ADMIN');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================
-- Storage bucket for images
-- =============================================
-- Run in Supabase Dashboard > Storage:
-- Create bucket: "images" (public)
-- Policies: allow authenticated users to upload, public to read
