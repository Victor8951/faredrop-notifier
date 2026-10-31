import { createFileRoute } from "@tanstack/react-router";
import { AuthForm } from "@/components/auth-form";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Sign up — Flight Price Notifier" },
      { name: "description", content: "建立 Flight Price Notifier 帳號，開始追蹤機票降價。" },
      { property: "og:title", content: "Sign up — Flight Price Notifier" },
      { property: "og:description", content: "Create an account and start watching fares from Taipei." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <AuthForm mode="signup" />,
});
