# Pizza Shop

A pizza restaurant management app built with React, TypeScript, and Vite,
featuring a dashboard, orders, profile, sign-in, and sign-up pages.
Uses React Query, Axios, Tailwind, and MSW.

## Run locally

With nvm installed:

```bash
nvm use
npm ci
npm run dev
```

If needed, run `nvm install` to install Node 22 as specified in `.nvmrc`.
Open the address shown in the terminal (usually http://localhost:5173).
If the port is already in use, Vite will choose another one.

`npm run dev` uses Vite's `test` mode and loads `.env.test`, enabling the mock
API in the browser. No backend or additional `.env` file is required.
`npm run dev:test` runs the same mode on port 1985 for E2E tests.

- Dashboard: `/`.
- Orders: `/orders`, with 240 fictional records across 24 pages.
- Mock sign-in: `/sign-in`, using `johndoe@example.com`. No real email is sent.

Orders span the past 60 days and include fictional customers, different products,
and varied totals. The list and detail views share the same records.
Approving, canceling, dispatching, and delivering orders update in-memory data;
reloading the page resets the demo. Dashboard metrics still use their own
fixtures; integrating them with the order data is part of the backlog.

## Run with a real backend

The backend is not included in this repository:

```bash
cp .env.example .env.local
```

Set `VITE_API_URL` in `.env.local` to your actual API URL. Port 3333 in the
example is only a placeholder; no server runs on that port by default.

```bash
npm run dev:api
```

This command disables mocks. Restart Vite after changing environment variables.
The default build also requires a real API to be configured.
Do not store secrets in `VITE_*` variables: they are exposed in the browser.

## Checks

```bash
npm test -- --run
npm run build
npx playwright install chromium
npx playwright test
```

Vitest runs only the unit tests in `src`. Playwright starts `npm run dev:test`
on port 1985, or reuses that server when running locally.

## Next steps

See [BACKLOG.md](BACKLOG.md) for the plan covering real authentication, demo mode,
and deployment. The current version does not implement real authentication.
The deployment below publishes only the demo; switching between a real account
and demo mode remains on the backlog.

## Deploy the demo to Vercel

The `deploy-vercel` branch includes `vercel.json` with the build and SPA routing
configuration.

1. Push that branch to GitHub and import the repository into Vercel.
2. Use the repository root as the Root Directory and select the **Vite** preset.
3. Select **Node.js 22.x**. The configuration file sets `npm ci`,
   `npm run build:demo`, and `dist` as the output directory.
4. Deploy the `deploy-vercel` branch as a Preview. To use it on the production
   domain, set it as the Production Branch or merge the changes into `main`.
5. Do not point `VITE_API_URL` to localhost in Vercel. Remove overrides for
   `VITE_API_URL`/`VITE_ENABLE_API_DELAY` to use `.env.demo`.

This deployment is public and uses fictional data, without a backend or real
authentication. MSW runs in the browser over HTTPS; data is isolated per page
and resets on reload. Sign-in and sign-up are simulations only. Do not enter
real personal information in the forms. A notice identifies the demo.

To validate the same build locally:

```bash
npm run build:demo
npm run preview
```

Open `/`, `/orders`, `/sign-in`, and `/sign-up`; also test reloading `/orders`.
The rewrite follows [Vercel's guidance for Vite SPAs](https://vercel.com/docs/frameworks/frontend/vite).
The service worker must be served as JavaScript, not as `index.html`.

Once a real API is available, change the Vercel build command to `npm run build`,
set `VITE_API_URL` to the API's HTTPS URL, and set `VITE_ENABLE_API_DELAY=false`.
That build uses `production` mode, which does not enable mocks. Implement real
authentication and backend authorization before treating this version as an
authenticated application.
