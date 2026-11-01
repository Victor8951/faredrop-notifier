# Routes

Routes are declared in one place — `src/router.tsx` — with React Router
(`createBrowserRouter`). Each page component lives in this directory:

| File | URL |
| --- | --- |
| `index.tsx` | `/` |
| `signin.tsx` | `/signin` (also `/sign-in`) |
| `signup.tsx` | `/signup` (also `/sign-up`) |
| `_authenticated/app.tsx` | `/app` |
| `root.tsx` | app shell (wraps every page; preserve `<Outlet />`), 404 and error pages |

Every signed-in page goes under the `_authenticated` layout route in
`src/router.tsx`: its loader (`requireUser` in `_authenticated/route.tsx`)
redirects to `/signin` when there is no session. Read the user in a page with
`useAuthenticatedUser()`.

To add a page: create the component here, then add it to `createRoutes` in
`src/router.tsx`. Set its title/meta with `usePageMeta` from `@/lib/page-meta`.
