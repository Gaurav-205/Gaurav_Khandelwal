# Gaurav Khandelwal — Portfolio

Live at **[gauravkhandelwal.com](https://gauravkhandelwal.com)**

A Next.js 16 portfolio with an interactive 3-D project gallery, server-rendered content pages, and a build-time content validation pipeline.

---

## Quick start

```bash
npm install
npm run dev          # development server
npm run test         # Vitest unit + property tests
npm run validate:content  # check images, slugs, URLs before deploying
npm run build        # validate:content → next build
```

---

## Architecture decisions

### Server / client split

Every route page follows the pattern:

```
page.tsx          — Server Component: resolves data, exports metadata
  └── *Client.tsx — Client shell: framer-motion entry animations, minimal state
        ├── *Interactions.tsx — Client island: scroll-spy, keyboard, analytics (renders null)
        └── *Content.tsx      — Server Component: all static markup
```

Static HTML is server-rendered for SEO and zero-JS initial load. The client boundary is pushed as far down as possible — only the parts that genuinely need the browser (animations, scroll position, localStorage) are client components.

**Why not CSS animations instead of framer-motion?**
The entry animations use `AnimatePresence` for route transitions, which requires knowing when a component is unmounting. CSS alone cannot do this without JavaScript.

### 3-D gallery module split

`src/features/gallery/` contains 10 focused files:

| File | Responsibility |
|---|---|
| `GalleryCanvas.tsx` | WebGL detection, R3F `<Canvas>`, fallback routing |
| `GalleryScene.tsx` | Infinite tunnel scene graph, per-frame `useFrame` loop |
| `GalleryFallback.tsx` | Plain CSS grid — used for no-WebGL and reduced-motion |
| `ImagePlane.tsx` | Single image quad, hover uniform, click handler |
| `shaderMaterials.ts` | Cloth `ShaderMaterial` with ripple + flag-wave vertex shader |
| `useGalleryControls.ts` | Wheel, keyboard, touch, auto-play with idle resume |
| `useGalleryCamera.ts` | Camera config extracted from canvas component |
| `useReducedMotion.ts` | `prefers-reduced-motion` hook — no framer-motion dependency |
| `useTextureLoader.ts` | `THREE.TextureLoader` with per-image gradient fallbacks |
| `shaderMaterials.ts` | Shared `PlaneGeometry` instance (one allocation for all planes) |

`src/components/ui/3d-gallery-photography.tsx` is a pure re-export shim kept for backward compatibility. It ships zero runtime code.

**Why a custom shader instead of a standard material?**
The cloth ripple and flag-wave effects require per-vertex displacement driven by scroll velocity and hover state. Standard `MeshStandardMaterial` does not expose vertex position in a way that supports this without a custom shader.

**Why shared geometry?**
All image planes use the same `PlaneGeometry(1,1,32,32)` instance. Creating one geometry per plane would allocate N identical GPU buffers. The shared instance is safe because each plane has its own `ShaderMaterial` with independent uniforms.

### Content layer

```
src/content/projects.ts          — human-readable copy (titles, descriptions, sections)
src/lib/constants/projectCaseStudy.ts — rich case-study data (architecture, screenshots)
src/lib/constants/projects.ts    — Zod schema, merge, validation, navigation helpers
```

Separating content from infrastructure means adding or reordering a project requires editing only `src/content/projects.ts`. The `id` field is derived from array position at build time — it is never authored manually, so reordering never breaks prev/next navigation.

**Why Zod at module load time instead of only at build time?**
The build-time script (`scripts/validate-content.ts`) checks file existence and URL format. Zod validates the data shape and business rules (slug format, year format, id invariant, duplicate slugs). Both layers catch different classes of errors. Zod throws fast at module load so a bad data shape is caught in development before any page renders.

### Prev/next navigation

`getAdjacentProjects(slug)` in `src/lib/constants/projects.ts` uses array index, not the numeric `id` field. This means reordering `PROJECT_CONTENT` automatically fixes navigation with no other changes.

### Fallback strategy

Three degradation paths, all handled by `GalleryFallback`:

1. **Reduced motion** (`prefers-reduced-motion: reduce`) — detected in `Hero.tsx` via `useReducedMotion` from the gallery feature (no framer-motion dependency). Renders the static grid immediately.
2. **No WebGL** — detected in `GalleryCanvas` after mount via `checkWebGLSupport()`. Swaps in `GalleryFallback` with `reason="no-webgl"`.
3. **Texture load failure** — `useTextureLoader` falls back to a gradient `CanvasTexture` per image. The gallery continues running with placeholder colours.

### Analytics

`src/lib/analytics.ts` forwards events to Vercel Web Analytics via `window.va` (injected by Vercel when Analytics is enabled in the project dashboard). No localStorage, no cookies, no third-party scripts. All calls are no-ops locally and log to the console in development. To swap providers, replace the `sendEvent` function — the rest of the module is provider-agnostic.

---

## Project structure

```
src/
├── app/                    Next.js App Router — routes, API, metadata
│   ├── about/              /about route
│   ├── project/[slug]/     /project/:slug dynamic route
│   └── projects/           /projects route
├── content/
│   └── projects.ts         Human-readable project copy (edit here to add projects)
├── features/               Route-scoped feature modules
│   ├── about/              AboutClient, AboutContent, AboutInteractions
│   ├── gallery/            10 gallery modules (see table above)
│   ├── project/            ProjectClient, ProjectContent, ProjectInteractions
│   └── projects/           ProjectsClient, ProjectsContent, ProjectsInteractions
├── components/             Shared components
│   ├── Hero.tsx            Home page hero — routes between WebGL and fallback gallery
│   ├── Navigation.tsx      Fixed nav — client (usePathname + framer-motion)
│   ├── HeroOverlay.tsx     Static title overlay — server component
│   └── ui/                 FadeTransition, SmoothCursor, Tooltip, KeyboardHint, HelpButton
├── lib/
│   ├── analytics.ts        Vercel Analytics wrapper
│   ├── constants/          about, animations, gallery, projects, projectCaseStudy, zIndex
│   ├── env.ts              Environment variable validation
│   └── utils.ts            cn, checkWebGLSupport, getGmailComposeUrl, throttle, debounce
└── __tests__/              Vitest property tests (6 files, 33 assertions)

scripts/
└── validate-content.ts     Build-time content validation (images, URLs, slugs, alt text)

public/projects/            Cover images and per-project architecture + screenshot SVGs
```

---

## Adding a project

1. Add an entry to `src/content/projects.ts` (copy an existing one).
2. Add the matching case-study entry to `src/lib/constants/projectCaseStudy.ts`.
3. Drop the cover image in `public/projects/`.
4. Drop architecture and screenshot SVGs in `public/projects/<slug>/`.
5. Run `npm run validate:content` — it will tell you exactly what is missing.
6. Run `npm run build` to confirm the full pipeline passes.

---

## Tests

```bash
npm run test              # all 33 property tests
npm run validate:content  # build-time content checks
npm run type-check        # tsc --noEmit
```

Property tests cover:
- Active section drives sidebar CSS class (4 assertions)
- All projects appear in the projects grid (5 assertions)
- ProjectContent renders all fields for every project (12 assertions)
- `generateStaticParams` is a bijection of `PROJECT_DATA` slugs (4 assertions)
- Zero `3d-gallery-photography` shim imports in application source (3 assertions)
- No duplicate project slugs (1 assertion)

---

## Environment variables

| Variable | Required | Default | Purpose |
|---|---|---|---|
| `NEXT_PUBLIC_BASE_URL` | No | `https://gauravkhandelwal.com` | Canonical URL for OG tags and sitemap |

---

## Deployment

Deployed on Vercel. `npm run build` runs `validate:content` first — a missing image or bad URL blocks the deploy before Next.js even starts compiling.

To enable analytics: Vercel project dashboard → Analytics → Enable. No code changes needed.

---

## Contact

gauravkhandelwal205@gmail.com · [LinkedIn](https://linkedin.com/in/gaurav-khandelwal-17a127358) · [GitHub](https://github.com/Gaurav-205)
