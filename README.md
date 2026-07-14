# wllpppr

A hand-curated wallpaper library with community uploads, upvotes, favorites, comments, and broken-link reports — powered by Cloudinary and Supabase.

Built with plain HTML, CSS, and JavaScript. No frameworks, no build step.

## Features

- **Browse** wallpapers by category, popularity, and mobile-friendly sizes
- **Search** with keyword lookup
- **Dark mode** toggle with system preference detection and localStorage persistence
- **Live images** served from [Cloudinary](https://cloudinary.com/) — thumbnails, previews, and downloads with automatic format/quality optimisation
- **Community uploads** via the Cloudinary Upload Widget — users can submit their own wallpapers (CC BY-NC 4.0)
- **Upvotes & downvotes** — click ▲/▼ on any wallpaper, persisted in Supabase
- **Favorites** — star wallpapers, saved to Supabase, viewable on `/favorites`
- **Comments** — leave feedback on any wallpaper, stored in Supabase
- **Download tracking** — every download counted via Supabase
- **Reports** — users can report broken links, viewable at `/reports` with timestamps
- **Status page** with real-time component health checks (including Supabase), cached every 6 hours
- **Responsive layout** with sidebar cards for stats, tags, and designer info
- **No cookies, trackers, or analytics** — session-based anonymous user tracking via localStorage**

## Pages

| Path | Description |
|------|-------------|
| `index.html` | Popular / home page |
| `category.html` | Category listing |
| `wallpaper.html` | Wallpaper detail (curated `?slug=` or community `?public_id=`) |
| `designer.html` | Designer profile |
| `favorites.html` | Saved wallpapers |
| `search.html` | Search results |
| `mobile.html` | Mobile-sized wallpapers |
| `upload.html` | Community upload page |
| `community.html` | Community wallpaper gallery |
| `faq.html` | Frequently asked questions |
| `status.html` | Component status (Website, Cloudinary CDN, Uploads, Supabase) |
| `reports.html` | Submitted broken-link reports with timestamps |
| `license.html` | License & usage (dual: personal non-commercial + CC BY-NC 4.0) |
| `developer.html` | Developer / about page |
| `404.html` | Not found page |

## Setup

No build step. Open any `.html` file in a browser, or serve with any static file server.

```bash
npx serve .
```

## Deployment

Deployed to Vercel at **https://wllpppr.vercel.app**.

```bash
npx vercel --prod
```

## Assets

| Path | Description |
|------|-------------|
| `assets/style.css` | Stylesheet (light + dark mode) |
| `assets/cloudinary.js` | Cloudinary config and URL helpers |
| `assets/supabase.js` | Supabase client — votes, favorites, downloads, comments, reports |
| `assets/data.js` | 17 curated wallpapers + 8 designer profiles |
| `assets/wallpaper-loader.js` | Thumbnail/preview loading from Cloudinary |
| `assets/upload.js` | Cloudinary Upload Widget integration |
| `assets/share.js` | Web Share API / clipboard copy |
| `assets/favicon.png` | Site favicon (angry capybara) |
| `setup.sql` | SQL to create Supabase tables (upvotes, downloads, favorites, comments, reports) |

## License

The site code is open. Curated wallpapers are licensed for **personal non-commercial use only**. Community uploads are **CC BY-NC 4.0**. See [license.html](license.html).

---

built by [Vihanga](https://github.com/vihanga-nimsara)
