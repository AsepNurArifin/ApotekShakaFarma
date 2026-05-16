// Quick diagnostic to test Supabase public access
import { createClient } from "@supabase/supabase-js";

async function diagnose() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  console.log("=== SUPABASE DIAGNOSTIC ===");
  console.log("URL:", url ? "✅ Set" : "❌ Missing");
  console.log("Anon Key:", anonKey ? "✅ Set" : "❌ Missing");
  console.log("Service Key:", serviceKey ? "✅ Set" : "❌ Missing");
  console.log("");

  // Test with SERVICE ROLE KEY (admin - bypasses RLS)
  const adminClient = createClient(url, serviceKey);
  
  console.log("--- TEST WITH SERVICE ROLE KEY (admin) ---");
  for (const table of ["posters", "products", "articles", "testimonials"]) {
    const { data, error } = await adminClient.from(table).select("id, title, name", { count: "exact" }).limit(3);
    if (error) {
      console.log(`  ${table}: ❌ ERROR - ${error.message}`);
    } else {
      console.log(`  ${table}: ✅ ${data?.length || 0} rows found`);
      if (data && data.length > 0) console.log(`    Sample:`, JSON.stringify(data[0]));
    }
  }

  console.log("");

  // Test with ANON KEY (public - subject to RLS)
  const publicClient = createClient(url, anonKey);
  
  console.log("--- TEST WITH ANON KEY (public/user) ---");
  for (const table of ["posters", "products", "articles", "testimonials"]) {
    const { data, error } = await publicClient.from(table).select("id, title, name", { count: "exact" }).limit(3);
    if (error) {
      console.log(`  ${table}: ❌ ERROR - ${error.message} (THIS IS THE PROBLEM!)`);
    } else {
      console.log(`  ${table}: ✅ ${data?.length || 0} rows found`);
      if (data && data.length > 0) console.log(`    Sample:`, JSON.stringify(data[0]));
      if (data && data.length === 0) console.log(`    ⚠️ 0 rows! RLS might be blocking reads for anon users.`);
    }
  }

  console.log("\n=== DIAGNOSIS ===");
  console.log("If admin shows data but public shows 0 rows,");
  console.log("you need to add RLS policies to allow public SELECT.");
  console.log("Run this SQL in Supabase SQL Editor:");
  console.log(`
-- Allow public read access on all content tables
ALTER TABLE posters ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON posters FOR SELECT USING (true);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON products FOR SELECT USING (true);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON articles FOR SELECT USING (true);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON testimonials FOR SELECT USING (true);
  `);
}

diagnose().catch(console.error);
