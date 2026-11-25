import type { Metadata } from "next";
import AuthCard from "@/components/admin/AuthCard";
import LoginForm from "@/components/admin/LoginForm";
import SetupNotice from "@/components/admin/SetupNotice";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const metadata: Metadata = { title: "Log in" };

export default function LoginPage() {
  return <AuthCard>{isSupabaseConfigured ? <LoginForm /> : <SetupNotice />}</AuthCard>;
}
