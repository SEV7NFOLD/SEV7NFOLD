# SEV7N FOLD Website

## Vercel setup

Import this repository into Vercel. Set the Root Directory to the site folder if the repository keeps the site under `outputs`; otherwise leave it at the repository root. The included `vercel.json` runs `npm run build` and serves the generated `dist` directory.

Add these Production, Preview, and Development environment variables in Vercel, then redeploy:

- `SUPABASE_URL` — `https://selplvtsiogazxymmgex.supabase.co`
- `SUPABASE_PUBLISHABLE_KEY` — the project's `sb_publishable_…` key (never use a secret/service-role key)
- `SITE_ADMIN_EMAIL` — `sevenfold.ng@gmail.com`

The build writes these public values into `runtime-config.js`. Only the publishable key belongs in the browser.

## Supabase setup already applied

The `supabase/migrations` files define the shared portfolio, cinematic film, site content, and project conversation tables. RLS is enabled. The public site can read published projects and films and submit new project conversations; only the authorized admin email can manage content or read conversations. The five current portfolio entries have been seeded.

In Supabase Auth, allow the deployed site origin and its Vercel preview origin as redirect URLs. The admin uses a one-time email sign-in link at `/admin.html`; the authorized address is `sevenfold.ng@gmail.com`.

## Pages

- `index.html` — company site and featured film
- `cinematic-playground.html` — cascading original film sequence
- `admin.html` — authenticated content and conversation desk
- Product pages: `fold-motion.html`, `ava.html`, `uioutbox.html`, `foldbook.html`, `sev7n-signs.html`

Film videos are embedded from TikTok post URLs or linked as direct MP4 files. The site does not host uploaded video files.
