// Fix RLS policies - add public read access
const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const envFile = fs.readFileSync(path.join(__dirname, ".env.local"), "utf8");
const env = {};
envFile.split("\n").forEach(line => {
  const m = line.match(/^([^=]+)=(.*)$/);
  if (m) env[m[1].trim()] = m[2].trim();
});

async function fixRLS() {
  const admin = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

  // Tables that need public read access
  const publicTables = ["posters", "products", "articles", "testimonials"];
  
  for (const table of publicTables) {
    console.log(`Fixing ${table}...`);

    // First, drop any existing problematic policies 
    // Then create a simple public read policy
    const { error: dropError } = await admin.rpc("exec_sql", {
      sql: `
        DO $$ BEGIN
          -- Drop existing SELECT policies that might cause recursion
          DECLARE pol RECORD;
          BEGIN
            FOR pol IN SELECT policyname FROM pg_policies WHERE tablename = '${table}' AND cmd = 'SELECT'
            LOOP
              EXECUTE format('DROP POLICY IF EXISTS %I ON ${table}', pol.policyname);
            END LOOP;
          END;
        END $$;
      `
    });

    // Try direct SQL approach via admin client
    const { error: e1 } = await admin.from(table).select("id").limit(0);
    if (e1) {
      console.log(`  Table exists check: ${e1.message}`);
    }
  }

  // Since we can't run raw SQL via the JS client easily,
  // let's output the SQL the user needs to run
  console.log("\n======================================");
  console.log("MASALAH: RLS policies memiliki infinite recursion di tabel 'profiles'.");
  console.log("Ini menyebabkan SEMUA query publik gagal.");
  console.log("");
  console.log("SOLUSI: Jalankan SQL berikut di Supabase Dashboard > SQL Editor:");
  console.log("======================================\n");

  console.log(`
-- ================================================
-- FIX: Drop problematic policies and add simple public read
-- ================================================

-- 1. Fix profiles table (remove recursive policy)
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
CREATE POLICY "Allow read own profile" ON profiles FOR SELECT USING (auth.uid() = id);

-- 2. Posters - public read
DROP POLICY IF EXISTS "Allow public read" ON posters;
DROP POLICY IF EXISTS "Enable read access for all users" ON posters;
CREATE POLICY "Public can read posters" ON posters FOR SELECT USING (true);

-- 3. Products - public read
DROP POLICY IF EXISTS "Allow public read" ON products;
DROP POLICY IF EXISTS "Enable read access for all users" ON products;
CREATE POLICY "Public can read products" ON products FOR SELECT USING (true);

-- 4. Articles - public read  
DROP POLICY IF EXISTS "Allow public read" ON articles;
DROP POLICY IF EXISTS "Enable read access for all users" ON articles;
CREATE POLICY "Public can read articles" ON articles FOR SELECT USING (true);

-- 5. Testimonials - public read
DROP POLICY IF EXISTS "Allow public read" ON testimonials;
DROP POLICY IF EXISTS "Enable read access for all users" ON testimonials;
CREATE POLICY "Public can read testimonials" ON testimonials FOR SELECT USING (true);
  `);
}

fixRLS().catch(console.error);
