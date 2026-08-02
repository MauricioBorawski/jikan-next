import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { createClient } from "@/utils/supabase/server";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/agenda");
  }

  return <div className="flex min-h-screen flex-col items-center justify-content p-4">{children}</div>;
}
