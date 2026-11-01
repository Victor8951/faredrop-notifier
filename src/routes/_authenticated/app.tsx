import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { LayoutDashboard } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { usePageMeta } from "@/lib/page-meta";
import { useAuthenticatedUser } from "./route";

export function AppPage() {
  usePageMeta({
    title: "Dashboard — Flight Price Notifier",
    meta: [
      { name: "description", content: "你的航線追蹤儀表板。" },
      { property: "og:title", content: "Dashboard — Flight Price Notifier" },
      { property: "og:description", content: "Your fare-tracking dashboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  });
  const user = useAuthenticatedUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate("/signin", { replace: true });
  }

  return (
    <div className="min-h-screen bg-hero">
      <SiteHeader right={<Button variant="outline" size="sm" onClick={signOut}>Sign out / 登出</Button>} />
      <main className="mx-auto max-w-3xl px-5 py-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h1 className="text-3xl font-bold tracking-tight break-all sm:text-4xl">Hi {user.email}</h1>
        <div className="mt-8 rounded-2xl border border-border bg-card p-8">
          <span className="mb-4 grid size-11 place-items-center rounded-xl bg-accent">
            <LayoutDashboard className="size-5 text-primary-glow" />
          </span>
          <p className="text-lg">你的航線追蹤儀表板即將上線 — 下一個里程碑會加上訂閱航線的功能。</p>
          <p className="mt-2 text-sm text-muted-foreground">Your dashboard is coming soon. Route-subscription will be added in the next milestone.</p>
        </div>
      </main>
    </div>
  );
}
