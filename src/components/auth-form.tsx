import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiteHeader } from "@/components/site-header";

export function AuthForm({ mode }: { mode: "signin" | "signup" }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const isSignup = mode === "signup";

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { data, error } = isSignup
      ? await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin + "/app" } })
      : await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return setError(error.message);
    if (data.session) navigate({ to: "/app" });
    else setError("請到信箱確認後再登入 / Check your email to confirm.");
  }

  return (
    <div className="min-h-screen bg-hero">
      <SiteHeader right={null} />
      <div className="mx-auto max-w-sm px-5 py-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h1 className="text-3xl font-bold tracking-tight">{isSignup ? "建立帳號 Sign up" : "登入 Sign in"}</h1>
        <form onSubmit={onSubmit} className="mt-8 space-y-4 rounded-2xl border border-border bg-card p-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" variant="hero" className="w-full" disabled={loading}>
            {loading ? "…" : isSignup ? "Sign up / 註冊" : "Sign in / 登入"}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          {isSignup ? (
            <>已經有帳號？<Link to="/signin" className="text-primary-glow hover:underline">Sign in</Link></>
          ) : (
            <>還沒有帳號？<Link to="/signup" className="text-primary-glow hover:underline">Sign up</Link></>
          )}
        </p>
      </div>
    </div>
  );
}
