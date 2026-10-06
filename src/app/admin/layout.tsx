import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-espresso text-cream font-sans">
      {/* Simple Admin Nav */}
      <nav className="w-full bg-[#1A110C] border-b border-cream/5 px-8 py-4 flex justify-between items-center z-50 relative">
        <div className="flex items-center gap-4">
          <span className="font-serif text-2xl text-latte">Node.</span>
          <span className="text-xs tracking-widest uppercase text-cream/40 bg-cream/5 px-2 py-1 rounded">Admin</span>
        </div>
        <form action={async () => {
          "use server";
          const cookieStore = await cookies();
          cookieStore.delete("admin_session");
          redirect("/admin/login");
        }}>
          <button type="submit" className="text-xs uppercase tracking-widest text-terracotta hover:text-cream transition-colors font-bold">
            Logout
          </button>
        </form>
      </nav>
      {children}
    </div>
  );
}
