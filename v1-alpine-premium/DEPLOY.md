# FriendlyTour - Deployment guide (v1 "Alpine Premium")

This folder is a complete, self-contained static website. No build step, no
server code. Just upload the files and you are live.

## What's inside

```
index.html        Single multilingual homepage (BG/EN/DE/FR/ES/ZH)
assets/css/        Stylesheet (built-in light + dark theme)
assets/js/main.js          i18n + theme toggle, header, nav, weather
assets/js/translations.js  All 6 language texts
assets/img/        Logo, vehicle photos, landmark photos, favicon
contact.vcf        "Save our number" contact card
sitemap.xml        For search engines
robots.txt         For search engines
.htaccess          HTTPS redirect, gzip, caching, security headers
```

## Deploy to Hostinger (5 minutes)

1. Log in to Hostinger -> hPanel -> your domain -> File Manager.
2. Open the `public_html` folder (empty it first if it has placeholder files).
3. Upload the **contents of this folder** (not the folder itself) into `public_html`.
   - Tip: zip this folder, upload the zip, then "Extract" inside `public_html`.
4. Make sure `index.html`, `assets/`, `.htaccess`, `sitemap.xml`,
   `robots.txt` and `contact.vcf` sit directly inside `public_html`.
5. Visit your domain. Done.

## Languages & theme

- The site auto-detects the visitor's browser language and shows one of six
  languages: Bulgarian, English, German, French, Spanish, Chinese. Visitors can
  switch manually with the language selector in the header (choice is saved).
- The light/dark theme button in the header is remembered per visitor.
- Everything is client-side (no build step); translations live in
  `assets/js/translations.js`.

## Before going live: replace the placeholder domain

The SEO tags use `https://friendlytour.bg` as a placeholder. Replace it with your
real domain across these files (Find & Replace in File Manager or your editor):

- `index.html`  (canonical, hreflang, Open Graph URLs)
- `sitemap.xml`
- `robots.txt`

Search for `friendlytour.bg` and replace all occurrences with your domain.

## After going live (SEO checklist)

- Submit your domain + `sitemap.xml` in Google Search Console.
- Verify the phone/WhatsApp/email buttons on a real phone.
- Optional: add real customer reviews and any social profile links
  (the `sameAs` array in the JSON-LD script inside the HTML).

## Notes

- The live weather widget uses the free, keyless Open-Meteo API.
- All phone numbers are one-tap `tel:` links; emails open a pre-filled message;
  WhatsApp opens a pre-filled chat; the vCard adds the business to contacts.
