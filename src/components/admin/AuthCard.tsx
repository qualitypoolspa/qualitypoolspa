import Image from "next/image";

/** The centred card used by the login page and the setup notice. */
export default function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="adm-card w-full max-w-md p-8">
        <Image src="/brand/logo.png" alt="Quality Pool & Spa" width={781} height={123} className="h-7 w-auto" priority />
        <p className="mt-2 text-sm text-navy/60">Admin panel</p>
        <div className="mt-6">{children}</div>
      </div>
    </main>
  );
}
