import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminShell from "../AdminShell";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  // Fetch profile (may not exist if Supabase tables aren't set up yet)
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const adminUser = {
    email: user.email || "",
    fullName: profile?.full_name || user.email || "Admin",
    role: (profile?.role as "ADMIN" | "SUPERADMIN") || "ADMIN",
  };

  return <AdminShell user={adminUser}>{children}</AdminShell>;
}
