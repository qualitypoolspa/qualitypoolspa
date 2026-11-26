import AdminTopbar from "@/components/admin/AdminTopbar";
import AuthCard from "@/components/admin/AuthCard";
import SetupNotice from "@/components/admin/SetupNotice";
import { isSupabaseConfigured } from "@/lib/supabase/config";

/** The signed-in panel: top bar above, the current page below. */
export default function PanelLayout({ children }: { children: React.ReactNode }) {
  if (!isSupabaseConfigured) {
    return (
      <AuthCard>
        <SetupNotice />
      </AuthCard>
    );
  }
  return (
    <>
      <AdminTopbar />
      <div className="mx-auto max-w-6xl px-4 py-8">{children}</div>
    </>
  );
}
