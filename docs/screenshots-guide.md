# Screenshot Replacement Guide

The project detail pages currently show illustrative SVG placeholders.
Replace them with real product screenshots to improve portfolio credibility.

## File format

- **Format:** PNG or WebP (WebP preferred — smaller file size)
- **Aspect ratio:** 16:10 (e.g. 1600×1000 px or 1280×800 px)
- **Max file size:** 300 KB per screenshot (use [Squoosh](https://squoosh.app) or `cwebp`)
- **Location:** `public/projects/<slug>/shot-01.png` through `shot-04.png`

Once you drop the real files in, the SVG placeholders are automatically
superseded. `npm run validate:content` will show a warning while the SVG
fallback is active and pass silently once the real files are present.

---

## KampusKart — `public/projects/kampus-kart/`

| File | What to capture |
|---|---|
| `shot-01.png` | Campus map screen — show the map with POI markers and the search bar visible |
| `shot-02.png` | Real-time chat — show a conversation thread with reactions or attachments |
| `shot-03.png` | Admin dashboard — complaints list or lost & found management table |
| `shot-04.png` | Events or clubs directory — show the listing with filters |

**Tips:**
- Use the live site at https://kampuskart.netlify.app
- Log in with a test account to show authenticated views
- Capture at 1280×800 in Chrome DevTools (desktop viewport)

---

## Sahara Pet Care — `public/projects/sahara-pet-care/`

| File | What to capture |
|---|---|
| `shot-01.png` | Caregiver discovery — list of caregivers with profile cards and map |
| `shot-02.png` | Booking flow — show one of the 5 booking stages (e.g. "Active" or "Completed") |
| `shot-03.png` | Shopping screen — product catalog or cart view |
| `shot-04.png` | Chat or notifications — in-app message thread or notification list |

**Tips:**
- Use Flutter's screenshot tool or an Android emulator (Pixel 6 frame)
- Capture at 390×844 (iPhone 14 equivalent) for mobile-first feel
- Use `flutter screenshot` or Android Studio's screenshot button

---

## Onam Festival Website — `public/projects/onam-festival-website/`

| File | What to capture |
|---|---|
| `shot-01.png` | Landing page — hero section with festival imagery and event highlights |
| `shot-02.png` | Merchandise catalog — product grid with at least 4 items visible |
| `shot-03.png` | Order flow — checkout form or order confirmation screen |
| `shot-04.png` | Admin/backend — order management table or health diagnostics endpoint response |

**Tips:**
- Use the live site at https://onammitadt.netlify.app
- For the admin view, show the order list from the Express API (Postman or browser)
- Capture at 1280×800

---

## Prank Wizard — `public/projects/prank-wizard/`

| File | What to capture |
|---|---|
| `shot-01.png` | Wizard step — show one of the 4 steps with form fields filled in |
| `shot-02.png` | Auth screen — login or registration form with Google OAuth button |
| `shot-03.png` | User dashboard — prank history list or profile page |
| `shot-04.png` | Admin panel — user management table or submission moderation view |

**Tips:**
- Use the live site at https://prankwizard.netlify.app
- Log in with a test account to show the dashboard and admin views
- Capture at 1280×800

---

## After capturing

1. Export as WebP using [Squoosh](https://squoosh.app):
   - Method: WebP, quality 80
   - Resize to 1600×1000 if larger
2. Name files `shot-01.png` through `shot-04.png` (or `.webp`)
3. Drop into the correct `public/projects/<slug>/` folder
4. Run `npm run validate:content` — warnings should disappear
5. Run `npm run build` to confirm the full pipeline passes

If you use `.webp`, update the `src` paths in
`src/lib/constants/projectCaseStudy.ts` from `.png` to `.webp`.
