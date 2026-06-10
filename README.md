# Personal Website

A fast, static personal/academic website. No build step, no framework — just open
`index.html`. All content lives in one easy-to-edit file: **`content.js`**.

## Quick start

1. **Edit your content** → open `content.js`, change the text, save, refresh.
2. **Add your files** → drop `portrait.jpg`, `cv.pdf` (and optional project images / `og.jpg`) into `assets/`.
3. **Pick a look** → in the preview, open the **Tweaks** panel ("Design studio"), choose a direction, click *Copy theme settings*, and paste it over the `theme` block in `content.js`.
4. **Publish** → see the full walkthrough in **`GUIDE.html`** (open it in a browser).

## Files

| File | Purpose |
|------|---------|
| `index.html` | Home page (hero + About + Research + Contact) — edit the title & URLs once |
| `publications.html`, `teaching.html`, `writing.html`, `post.html` | The other pages (all read `content.js`) |
| `content.js` | **All your content** — the one file you edit |
| `site.css` | Design system (colors, type, spacing) |
| `render.js`, `design-mode.js` | Build the pages + design studio (don't edit) |
| `GUIDE.html` | Step-by-step setup, hosting & discoverability guide |
| `sitemap.xml`, `robots.txt` | Help search engines find you (update the URL) |

The CV link opens `assets/cv.pdf` in the browser — replace that file with your own.

## Hosting (free, on GitHub Pages)

Create a public repo named `USERNAME.github.io`, upload these files, then
**Settings → Pages → Deploy from branch → main / root**. Live in ~1 minute at
`https://USERNAME.github.io`. Full details — including custom domains and getting
discovered on Google — are in `GUIDE.html`.
