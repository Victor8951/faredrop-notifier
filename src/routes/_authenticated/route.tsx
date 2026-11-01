import { Outlet, redirect, useRouteLoaderData } from "react-router";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

// Client-only gate for every signed-in page: no session → /signin.
export const AUTHENTICATED_ROUTE_ID = "authenticated";

export async function requireUser(): Promise<{ user: User }> {
  const { data } = await supabase.auth.getUser();
  if (!data.user) throw redirect("/signin");
  return { user: data.user };
}

/** The signed-in user, for any page rendered under the authenticated layout. */
export function useAuthenticatedUser(): User {
  const data = useRouteLoaderData(AUTHENTICATED_ROUTE_ID) as Awaited<ReturnType<typeof requireUser>>;
  return data.user;
}

export function AuthenticatedLayout() {
  return <Outlet />;
}
