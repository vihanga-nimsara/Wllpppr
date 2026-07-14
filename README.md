# wllpppr

A hand-curated wallpaper library. No uploads, no clutter — just wallpapers worth staring at for eight hours a day.

Built with plain HTML, CSS, and a bit of JavaScript. No frameworks, no build step.

## Features

- **Browse** wallpapers by category, popularity, and mobile-friendly sizes
- **Search** with keyword lookup
- **Dark mode** toggle with system preference detection and localStorage persistence
- **Live images** via the [Pixabay API](https://pixabay.com/api/docs/) — thumbnails match each wallpaper's title/description
- **Responsive layout** with sidebar cards for stats, tags, and designer info
- **No cookies, trackers, or analytics**

## Setup

1. Get a free Pixabay API key at https://pixabay.com/api/docs/
2. Copy `assets/api-key.example.js` to `assets/api-key.js` and paste your key:

```js
var PIXABAY_KEY = 'your_key_here';
```

3. Open any `.html` file in your browser.

## Structure

| Path | Description |
|------|-------------|
| `index.html` | Popular / home page |
| `category.html` | Category listing |
| `wallpaper.html` | Wallpaper detail page |
| `designer.html` | Designer profile |
| `favorites.html` | Saved wallpapers |
| `search.html` | Search results |
| `mobile.html` | Mobile-sized wallpapers |
| `license.html` | License & usage |
| `404.html` | Not found page |
| `assets/style.css` | Stylesheet (light + dark mode) |
| `assets/unsplash.js` | Pixabay API integration |
| `assets/api-key.js` | **Git-ignored** — your API key |
| `assets/favicon.png` | Site favicon |

## License

The site code is open. Wallpapers displayed via the Pixabay API are subject to their respective licenses. See [license.html](license.html).

---

built by [Vihanga](https://github.com/vihanga-nimsara)
