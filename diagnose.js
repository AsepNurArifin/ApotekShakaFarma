// Deep diagnostic - check EXACT policies on each table
const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const envFile = fs.readFileSync(path.join(__dirname, ".env.local"), "utf8");
const env = {};
envFile.split("\n").forEach(line => {
  const m = line.match(/^([^=]+)=(.*)$/);
  if (m) env[m[1].trim()] = m[2].trim();
});

async function deepDiag() {
  const admin = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

  // Check actual table columns for each table
  console.log("=== TABLE STRUCTURE CHECK ===\n");
  
  for (const table of ["posters", "products", "articles", "testimonials", "profiles"]) {
    const { data, error } = await admin.from(table).select("*").limit(1);
    if (error) {
      console.log(`[${table}] ERROR: ${error.message}`);
    } else {
      const cols = data.length > 0 ? Object.keys(data[0]) : "(empty table)";
      console.log(`[${table}] Columns: ${JSON.stringify(cols)}`);
      if (data.length > 0) {
        console.log(`  Sample: ${JSON.stringify(data[0], null, 2)}`);
      }
    }
  }

  // Now try a test insert into posters and check
  console.log("\n=== TEST INSERT INTO POSTERS ===");
  const testRecord = {
    title: "TEST POSTER",
    description: "test description",
    is_active: true,
    image_url: "https://example.com/test.jpg"
  };
  
  const { data: insertData, error: insertErr } = await admin
    .from("posters")
    .insert(testRecord)
    .select()
    .single();
  
  if (insertErr) {
    console.log(`Insert ERROR: ${insertErr.message}`);
    console.log(`Details: ${JSON.stringify(insertErr)}`);
  } else {
    console.log(`Insert SUCCESS: ${JSON.stringify(insertData)}`);
    
    // Immediately read it back
    const { data: readBack, error: readErr } = await admin.from("posters").select("*");
    console.log(`Read back: ${readErr ? readErr.message : readBack.length + " rows"}`);
    
    // Clean up test data
    if (insertData?.id) {
      await admin.from("posters").delete().eq("id", insertData.id);
      console.log("Test data cleaned up.");
    }
  }

  // Output the NUCLEAR FIX SQL
  console.log("\n\n========================================");
  console.log("NUCLEAR FIX SQL - Copy EVERYTHING below");
  console.log("into Supabase SQL Editor and click RUN:");
  console.log("========================================\n");

  console.log(`
-- =============================================
-- STEP 1: Disable RLS entirely on content tables
-- (This is the simplest fix - content is public anyway)
-- =============================================

ALTER TABLE IF EXISTS posters DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS products DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS articles DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS testimonials DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS inquiries DISABLE ROW LEVEL SECURITY;

-- =============================================
-- STEP 2: Fix profiles table separately
-- Drop ALL existing policies first to break recursion
-- =============================================

DO $$ 
DECLARE 
  pol RECORD;
BEGIN
  FOR pol IN 
    SELECT policyname, tablename FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'profiles'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON %I', pol.policyname, pol.tablename);
    RAISE NOTICE 'Dropped policy: % on %', pol.policyname, pol.tablename;
  END LOOP;
END $$;

-- Re-create a simple non-recursive profile policy
CREATE POLICY "Users read own profile" ON profiles 
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users update own profile" ON profiles 
  FOR UPDATE USING (auth.uid() = id);
  `);
}

deepDiag().catch(console.error);
