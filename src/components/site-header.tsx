import { Link } from "react-router";
import { Plane } from "lucide-react";
import type { ReactNode } from "react";

export function SiteHeader({ right }: { right: ReactNode }) {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/70 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid size-8 place-items-center rounded-lg bg-gradient-primary">
            <Plane className="size-4 text-primary-foreground" />
          </span>
          <span className="hidden sm:inline">Flight Price Notifier</span>
        </Link>
        {right}
      </div>
    </header>
  );
}
