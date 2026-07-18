# FriendlyTour - 3 ready-to-deploy website versions

Three complete, modern rebuilds of the FriendlyTour transfer website. Each is a
self-contained static site (HTML + CSS + vanilla JS) with strong SEO, bilingual
BG/EN, a new logo, realistic imagery, and one-tap call/WhatsApp/email hooks.
Pick the one you like and deploy just that folder.

## The three versions

| Folder | Style | Best if you want... |
|--------|-------|---------------------|
| `v1-alpine-premium/` | Dark, cinematic, forest-green + gold, elegant serif | A premium, luxury feel |
| `v2-clean-trust/`    | Bright, white + blue, "how it works" steps, trust badges | Maximum trust & conversions |
| `v3-bold-adventure/` | Vibrant cream + teal/coral, bold type, playful | An energetic, adventurous vibe |

All three have identical content, contacts and SEO quality - only the design differs.

## Preview locally

From this folder, run any static server, e.g. with Node:

```bash
npx --yes http-server . -p 8080
```

Then open `http://localhost:8080/v1-alpine-premium/` (or v2 / v3).

## Deploy

Open your chosen folder's `DEPLOY.md` for step-by-step Hostinger instructions.
Short version: upload the **contents** of that one folder into `public_html`, then
find-and-replace the placeholder domain `friendlytour.bg` with your real domain.

## What each version includes

- One multilingual `index.html` in **6 languages** (Bulgarian, English, German,
  French, Spanish, Chinese). The site auto-detects the visitor's browser language;
  a header selector lets them switch manually (choice is remembered).
- **Light/dark theme** toggle button in the header (choice is remembered).
- Fully mobile-friendly / responsive on phones, tablets and desktop.
- Sections: hero, routes, fleet, why-us, attractions, testimonials, FAQ, contact
- One-tap `tel:` calls, pre-filled `mailto:` emails, WhatsApp chat, floating
  WhatsApp button, sticky mobile "Call" bar, and a "Save our number" vCard
- SEO: unique titles/descriptions, Open Graph, hreflang for all 6 languages,
  JSON-LD (LocalBusiness/TaxiService + FAQ), `sitemap.xml`, `robots.txt`
- `.htaccess` for HTTPS redirect, gzip, caching and security headers
- Live weather widget (free, keyless Open-Meteo API)

## Before you go live

Replace `friendlytour.bg` with your real domain in `index.html`,
`sitemap.xml` and `robots.txt` of the folder you deploy. That's it.
