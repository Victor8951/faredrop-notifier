import { AuthForm } from "@/components/auth-form";
import { usePageMeta } from "@/lib/page-meta";

export function SignIn() {
  usePageMeta({
    title: "Sign in — Flight Price Notifier",
    meta: [
      { name: "description", content: "登入 Flight Price Notifier，管理你的機票降價通知。" },
      { property: "og:title", content: "Sign in — Flight Price Notifier" },
      { property: "og:description", content: "Sign in to manage your fare alerts." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  });
  return <AuthForm mode="signin" />;
}
