import { QueryClient } from "@tanstack/react-query";
import {
  Navigate,
  createBrowserRouter,
  createMemoryRouter,
  type RouteObject,
} from "react-router";

import { Root, RootErrorBoundary, NotFound } from "./routes/root";
import { Index } from "./routes/index";
import { SignIn } from "./routes/signin";
import { SignUp } from "./routes/signup";
import { AUTHENTICATED_ROUTE_ID, AuthenticatedLayout, requireUser } from "./routes/_authenticated/route";
import { AppPage } from "./routes/_authenticated/app";

export function createRoutes(queryClient: QueryClient): RouteObject[] {
  return [
    {
      element: <Root queryClient={queryClient} />,
      errorElement: <RootErrorBoundary />,
      children: [
        { index: true, element: <Index /> },
        { path: "signin", element: <SignIn /> },
        { path: "signup", element: <SignUp /> },
        // Hyphenated aliases so /sign-in and /sign-up also work.
        { path: "sign-in", element: <Navigate to="/signin" replace /> },
        { path: "sign-up", element: <Navigate to="/signup" replace /> },
        {
          // Every signed-in page goes under this client-side gate.
          id: AUTHENTICATED_ROUTE_ID,
          loader: requireUser,
          element: <AuthenticatedLayout />,
          // Shown on a fresh load of a signed-in page while the session check runs.
          hydrateFallbackElement: <div className="min-h-screen bg-hero" />,
          children: [{ path: "app", element: <AppPage /> }],
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ];
}

export function createAppRouter() {
  return createBrowserRouter(createRoutes(new QueryClient()));
}

export function createTestRouter(initialPath: string) {
  return createMemoryRouter(createRoutes(new QueryClient()), { initialEntries: [initialPath] });
}
