import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminShell from "../AdminShell";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  // Fetch profile — wrapped in try-catch so if the table doesn't exist
  // or RLS blocks access, we still render the admin with a fallback.
  let profile: { full_name?: string; role?: string } | null = null;
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    if (!error) profile = data;
  } catch {
    // Table may not exist yet — continue with defaults
  }

  const adminUser = {
    email: user.email || "",
    fullName: profile?.full_name || user.email || "Admin",
    role: (profile?.role as "ADMIN" | "SUPERADMIN") || "ADMIN",
  };

  return <AdminShell user={adminUser}>{children}</AdminShell>;
}
