import { Link } from "react-router";
import { Radar, BellRing, CircleX, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { useReveal } from "@/hooks/use-reveal";
import { usePageMeta, type PageMeta } from "@/lib/page-meta";

const pageMeta: PageMeta = {
  title: "Flight Price Notifier — 機票降價通知",
  meta: [
    { name: "description", content: "設定航線與目標價，機票降價就通知你。Set a route and a target price — we email you when the fare drops." },
    { property: "og:title", content: "Flight Price Notifier — 機票降價通知" },
    { property: "og:description", content: "Set a route and a target price — we email you when the fare drops." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ],
};

const features = [
  { icon: Radar, title: "盯緊熱門航線 (Always-on route watching)", body: "持續監控台北出發的熱門航線（東京、首爾），自動抓最低票價。" },
  { icon: BellRing, title: "達標自動通知 (Target-price email alerts)", body: "低於你設定的目標價，就寄 email 提醒你，附上立即訂購連結。" },
  { icon: CircleX, title: "隨時取消 (Cancel anytime)", body: "月訂閱制，不想用隨時停，沒有綁約。" },
];

export function Index() {
  usePageMeta(pageMeta);
  useReveal();
  return (
    <div className="min-h-screen">
      <SiteHeader
        right={
          <Button asChild variant="hero" size="sm">
            <Link to="/signin">Sign in / 登入</Link>
          </Button>
        }
      />
      <main>
        <section className="relative overflow-hidden bg-hero">
          <div className="mx-auto max-w-4xl px-5 py-24 text-center sm:py-32 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <p className="mb-5 inline-block rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground">
              TPE → NRT · HND · ICN
            </p>
            <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
              <span className="text-gradient">Flight Price</span> Notifier
            </h1>
            <p className="mt-6 text-xl font-medium sm:text-2xl">設定航線與目標價，機票降價就通知你</p>
            <p className="mt-3 text-muted-foreground">Set a route and a target price — we email you when the fare drops.</p>
            <div className="mt-10 flex justify-center gap-3">
              <Button asChild variant="hero" size="lg">
                <Link to="/signup">免費開始 Get started <ArrowRight /></Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-20">
          <div className="grid gap-5 md:grid-cols-3">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="reveal rounded-2xl border border-border bg-card p-7 hover:border-primary/50 transition-colors"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <span className="mb-5 grid size-11 place-items-center rounded-xl bg-accent">
                  <f.icon className="size-5 text-primary-glow" />
                </span>
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © 2026 Flight Price Notifier
      </footer>
    </div>
  );
}
