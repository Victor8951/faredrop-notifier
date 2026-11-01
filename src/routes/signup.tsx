import { AuthForm } from "@/components/auth-form";
import { usePageMeta } from "@/lib/page-meta";

export function SignUp() {
  usePageMeta({
    title: "Sign up — Flight Price Notifier",
    meta: [
      { name: "description", content: "建立 Flight Price Notifier 帳號，開始追蹤機票降價。" },
      { property: "og:title", content: "Sign up — Flight Price Notifier" },
      { property: "og:description", content: "Create an account and start watching fares from Taipei." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  });
  return <AuthForm mode="signup" />;
}
