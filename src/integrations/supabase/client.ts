import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

// The single Supabase client for the app, pointed at our own Supabase project.
// Configure it with VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY
// (.env locally; Project Settings → Environment Variables on Vercel).
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
  const missing = [
    ...(!SUPABASE_URL ? ["VITE_SUPABASE_URL"] : []),
    ...(!SUPABASE_PUBLISHABLE_KEY ? ["VITE_SUPABASE_PUBLISHABLE_KEY"] : []),
  ];
  throw new Error(`Missing Supabase environment variable(s): ${missing.join(", ")}.`);
}

// Publishable keys (sb_publishable_*) are opaque strings, not JWTs: send them as the
// `apikey` header only, never as a Bearer token.
function supabaseFetch(supabaseKey: string): typeof fetch {
  return (input, init) => {
    const headers = new Headers(input instanceof Request ? input.headers : undefined);
    if (init?.headers) new Headers(init.headers).forEach((value, key) => headers.set(key, value));
    if (headers.get("Authorization") === `Bearer ${supabaseKey}`) headers.delete("Authorization");
    headers.set("apikey", supabaseKey);
    return fetch(input, { ...init, headers });
  };
}

// Import it like this: import { supabase } from "@/integrations/supabase/client";
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  global: { fetch: supabaseFetch(SUPABASE_PUBLISHABLE_KEY) },
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
