# Summit Heating & Cooling

A sales demo website for a fictional residential HVAC company in the Columbus area. Leonardo can show it to contractors as a starting point for their own site. Business claims that are not verified — licensing, reviews, hours, and the service area — are labeled as demo content.

The estimate form validates in the browser and does not send a request. Connect a real inbox or CRM later by replacing `submitEstimate` in `src/lib/estimate.ts`. Sample copy lives in `src/content/site.ts`.

## Run locally

```bash
npm install
npm run dev
```

The dev server binds to `0.0.0.0:43123`. Open [http://127.0.0.1:43123](http://127.0.0.1:43123).

Production build:

```bash
npm run build
```

Preview the build (port 43124, so it does not collide with the dev server):

```bash
npm run preview
```

## Publish

This is a static Vite site. The build output is the `dist` folder.

- **Netlify:** New site from the repo. Build command `npm run build`. Publish directory `dist`. `public/_redirects` sends unknown paths to `index.html` so `/privacy` works on refresh.
- **Vercel:** Import the repo and use the Vite preset (build `npm run build`, output `dist`). `vercel.json` rewrites routes to `index.html`.
- **GitHub Pages:** Run `npm run build` and publish `dist`. The build copies `index.html` to `404.html` so project-page refreshes on `/privacy` still load the app. If the site is not served from the domain root, set Vite `base` to the repository path before building.

Replace the remote stock photos (Pexels and Unsplash), the placeholder reviews, the sample hours, and the illustrative service-area list before using the site for a real company. Remove `<meta name="robots" content="noindex">` from `index.html` only if the live site should be indexed.

There is no backend, database, or secret in this project.
