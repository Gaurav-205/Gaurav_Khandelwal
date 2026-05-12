# Design Document — Frontend Architecture Refactor

## Overview

This refactor pushes static markup out of `'use client'` components and into React Server Components (RSC) for three route pages: `/about`, `/projects`, and `/project/[slug]`. The result is smaller client bundles, fully server-rendered HTML for SEO, and a cleaner separation between content and interactivity. No new dependencies are introduced; framer-motion stays exclusively on client islands.

The home page (`/`) and its 3D gallery split are already complete and are out of scope.

---

## Architecture

### Current State

Each route page follows this pattern:

```
page.tsx (Server)
  └── *Client.tsx ('use client' — owns ALL markup + framer-motion + hooks)
        └── *Interactions.tsx ('use client' — side-effects only, renders null)
```

The `*Client` components carry both static content (bio text, project cards, section headings) and the browser-only concerns (framer-motion entry animations, `useState`, analytics). This means the entire page HTML is generated client-side, blocking SEO and inflating the JS bundle.

### Target State

```
page.tsx (Server — resolves data, calls notFound())
  └── *Client.tsx ('use client' — Shell: FadeTransition + motion wrappers only)
        ├── *Interactions.tsx ('use client' — side-effects only, renders null)
        └── *Content.tsx (Server Component — all static markup, receives props)
```

The Server Component (`*Content`) renders the full page HTML on the server. The Client Shell (`*Client`) wraps it in `FadeTransition` and owns the framer-motion entry animations for the fixed chrome (back button, sidebar nav label). The Interactions island owns all browser side-effects and renders nothing.

### Component Boundary Rules

| Concern | Where it lives |
|---|---|
| Static markup (text, images, links) | Server Component (`*Content`) |
| framer-motion entry animations | Client Shell (`*Client`) |
| `useState` / `useCallback` | Client Shell (`*Client`) |
| `useEffect`, `useRouter`, analytics | Interactions island (`*Interactions`) |
| `usePathname`, `localStorage` | Navigation / Hero (unchanged) |
| WebGL / Three.js | `GalleryCanvas` (unchanged) |

---

## Components

### 1. `AboutContent` — new Server Component

**File:** `src/app/about/AboutContent.tsx`

Renders all static markup for the About page. Receives `activeSection` as a prop so the sidebar nav can reflect the current scroll position without any client state in the content tree.

```tsx
// No 'use client' directive
interface AboutContentProps {
  activeSection: 'informations' | 'fields' | 'socials' | 'contact' | string;
}

export default function AboutContent({ activeSection }: AboutContentProps) {
  // Renders: sidebar nav items (with active/inactive classes driven by activeSection),
  // section 01 Information, section 02 Fields of Practice,
  // section 03 Socials, section 04 Contact,
  // bottom-left timezone block.
  // No hooks. No framer-motion. No 'use client'.
}
```

**Active section styling:** The sidebar nav items use a conditional class:

```tsx
className={activeSection === id ? 'text-white' : 'text-white/40 hover:text-white/80'}
```

**What moves here from `AboutClient`:** All `<section>` blocks (informations, fields, socials, contact), the timezone `<motion.div>` (converted to a plain `<div>`), and the sidebar nav item list. The `trackExternalLink` / `trackCTAClick` calls in the socials and contact sections must be removed from the server component — those links become plain `<a>` tags. Analytics for those clicks can be added back as a separate client island if needed, but are out of scope for this refactor.

### 2. `AboutClient` — thinned Client Shell

**File:** `src/app/about/AboutClient.tsx` (existing, modified)

Retains only:
- `useState('informations')` for `activeSection`
- `useCallback` for `handleSectionChange`
- `<FadeTransition>` wrapper
- framer-motion `<motion.div>` for the back button (fixed top-right)
- framer-motion `<motion.div>` for the sidebar nav container (fixed top-left)
- `<AboutInteractions onSectionChange={handleSectionChange} />`
- `<AboutContent activeSection={activeSection} />`

```tsx
'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import FadeTransition from '@/components/ui/FadeTransition';
import Link from 'next/link';
import AboutInteractions from './AboutInteractions';
import AboutContent from './AboutContent';

export default function AboutClient() {
  const [activeSection, setActiveSection] = useState('informations');
  const handleSectionChange = useCallback((id: string) => setActiveSection(id), []);

  return (
    <FadeTransition>
      <AboutInteractions onSectionChange={handleSectionChange} />
      {/* Back button — framer-motion entry animation */}
      <motion.div className="fixed top-4 right-4 md:right-6 z-50" ...>
        <Link href="/">Back</Link>
      </motion.div>
      {/* Sidebar nav container — framer-motion entry animation */}
      <motion.div className="fixed top-4 left-4 md:left-6 z-50 hidden md:block" ...>
        {/* Section label and nav buttons rendered by AboutContent via activeSection prop */}
      </motion.div>
      <AboutContent activeSection={activeSection} />
    </FadeTransition>
  );
}
```

> **Note on sidebar nav:** The section label (`SECTION_LABELS[activeSection]`) and the nav button list are driven by `activeSection` state. These must stay in `AboutClient` (or be passed as props to `AboutContent`). The cleanest approach is to keep the fixed sidebar `<motion.div>` in `AboutClient` and pass `activeSection` down to `AboutContent` for the nav item active-class logic within the scrollable content area. The fixed sidebar chrome (label + buttons) stays in the shell.

### 3. `ProjectsContent` — new Server Component

**File:** `src/app/projects/ProjectsContent.tsx`

Self-contained: imports `PROJECT_DATA` directly, renders the full projects page markup.

```tsx
// No 'use client' directive
import { PROJECT_DATA } from '@/lib/constants/projects';
import Link from 'next/link';
import Image from 'next/image';

export default function ProjectsContent() {
  return (
    <div className="min-h-screen bg-black text-white md:cursor-none hide-scrollbar">
      {/* Back button (static, no motion) */}
      {/* Header (static) */}
      {/* Hero title section */}
      {/* Divider */}
      {/* Project grid — PROJECT_DATA.map(...) */}
      {/* Divider */}
      {/* CTA section */}
    </div>
  );
}
```

All `<motion.*>` wrappers on the project cards and sections are converted to plain `<div>` / `<section>` elements. The `trackProjectClick` / `trackCTAClick` calls are removed (analytics for card clicks can be added as a client island later if needed).

### 4. `ProjectsClient` — thinned Client Shell

**File:** `src/app/projects/ProjectsClient.tsx` (existing, modified)

Retains only:
- `<FadeTransition>` wrapper
- `<ProjectsInteractions />`
- framer-motion `<motion.div>` for the back button (fixed top-right)
- framer-motion `<motion.div>` for the header (fixed top-left)
- `<ProjectsContent />`

```tsx
'use client';

import { motion } from 'framer-motion';
import FadeTransition from '@/components/ui/FadeTransition';
import Link from 'next/link';
import ProjectsInteractions from './ProjectsInteractions';
import ProjectsContent from './ProjectsContent';

export default function ProjectsClient() {
  return (
    <FadeTransition>
      <ProjectsInteractions />
      {/* Back button — framer-motion entry animation */}
      <motion.div className="fixed top-4 right-4 md:right-6 z-50" ...>
        <Link href="/">Back</Link>
      </motion.div>
      {/* Header — framer-motion entry animation */}
      <motion.div className="fixed top-4 left-4 md:left-6 z-50" ...>
        <h2>Projects</h2>
        <p>All Projects</p>
      </motion.div>
      <ProjectsContent />
    </FadeTransition>
  );
}
```

### 5. `ProjectContent` — new Server Component

**File:** `src/app/project/[slug]/ProjectContent.tsx`

Accepts a resolved `ProjectData` object as a prop. Renders all project detail markup.

```tsx
// No 'use client' directive
import { ProjectData, PROJECT_DATA } from '@/lib/constants/projects';
import Link from 'next/link';
import Image from 'next/image';

interface ProjectContentProps {
  project: ProjectData;
}

export default function ProjectContent({ project }: ProjectContentProps) {
  return (
    <div className="min-h-screen bg-black text-white md:cursor-none hide-scrollbar">
      {/* Main content */}
      <div className="pt-20 pb-16 px-4 md:px-6">
        {/* Hero section: title, description, meta grid, tech stack, CTAs */}
        {/* Project image */}
        {/* Content sections */}
        {/* Divider */}
        {/* Prev/Next navigation */}
      </div>
    </div>
  );
}
```

All `<motion.*>` wrappers are converted to plain elements. The `trackExternalLink` calls on live/GitHub links are removed from the server component.

### 6. `ProjectClient` — thinned Client Shell

**File:** `src/app/project/[slug]/ProjectClient.tsx` (existing, modified)

Accepts `project: ProjectData` as a prop (no longer resolves params itself).

```tsx
'use client';

import { motion } from 'framer-motion';
import FadeTransition from '@/components/ui/FadeTransition';
import Link from 'next/link';
import { ProjectData, PROJECT_DATA } from '@/lib/constants/projects';
import ProjectInteractions from './ProjectInteractions';
import ProjectContent from './ProjectContent';

interface ProjectClientProps {
  project: ProjectData;
}

export default function ProjectClient({ project }: ProjectClientProps) {
  return (
    <FadeTransition>
      <ProjectInteractions slug={project.slug} />
      {/* Back button — framer-motion entry animation */}
      <motion.div className="fixed top-4 right-4 md:right-6 z-50" ...>
        <Link href="/">Back</Link>
      </motion.div>
      {/* Project nav label — framer-motion entry animation */}
      <motion.div className="fixed top-4 left-4 md:left-6 z-50" ...>
        <p>Project {project.id} of {PROJECT_DATA.length}</p>
        <h2>{project.title}</h2>
      </motion.div>
      <ProjectContent project={project} />
    </FadeTransition>
  );
}
```

Removed from `ProjectClient`: `use(params)`, `useRouter`, `useEffect` redirect, `PROJECT_DATA.find`, the "not found" fallback JSX, and all content markup.

### 7. `src/app/project/[slug]/page.tsx` — updated Server Component

```tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PROJECT_DATA } from '@/lib/constants/projects';
import ProjectClient from './ProjectClient';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROJECT_DATA.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECT_DATA.find((p) => p.slug === slug);
  if (!project) {
    return { title: 'Project Not Found - Gaurav Khandelwal' };
  }
  return {
    title: `${project.title} - Gaurav Khandelwal`,
    description: project.description,
    keywords: [project.category, 'Full-Stack Development', 'Portfolio', project.title, 'Gaurav Khandelwal'],
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = PROJECT_DATA.find((p) => p.slug === slug);
  if (!project) notFound();
  return <ProjectClient project={project} />;
}
```

### 8. Navigation — JSDoc addition

**File:** `src/components/Navigation.tsx` (existing, JSDoc only)

```tsx
/**
 * Navigation — client component.
 *
 * Must remain 'use client' for two reasons:
 *   1. `usePathname()` is a client-only hook that reads the browser's routing
 *      context; it has no server equivalent and cannot be called in an RSC.
 *   2. framer-motion `motion.*` entry animations require DOM hydration to
 *      interpolate values — they cannot run during server rendering.
 *
 * No further static markup can be extracted without breaking these dependencies.
 */
const Navigation = memo(() => { ... });
```

### 9. Hero — JSDoc addition

**File:** `src/components/Hero.tsx` (existing, JSDoc only)

```tsx
/**
 * Hero — client component.
 *
 * Must remain 'use client' for three reasons:
 *   1. `HeroOverlay` is a React Server Component rendered as a child inside
 *      this client tree — the boundary is intentional.
 *   2. `GalleryCanvas` is a WebGL client component (Three.js / R3F) that
 *      requires a browser canvas context.
 *   3. This component calls `useRouter`, `useState`, `useEffect`, and reads
 *      `localStorage` — all browser-only APIs unavailable in Server Components.
 *
 * The 'use client' boundary is intentional and minimal. No further static
 * markup can be extracted without breaking the hook dependencies.
 */
const Hero = memo(({ onImagesLoaded }: { onImagesLoaded?: () => void }) => { ... });
```

### 10. Gallery Import Hygiene

**Affected files:** Any `.ts` / `.tsx` under `src/app/` or `src/components/` that imports from `3d-gallery-photography`.

Current state: `Hero.tsx` already imports directly from `./ui/gallery/GalleryCanvas` — no shim usage found in application code. A final grep pass confirms zero occurrences before closing this requirement.

The shim file `src/components/ui/3d-gallery-photography.tsx` is retained unchanged.

---

## Data Models

No new data models are introduced. The existing `ProjectData` interface in `src/lib/constants/projects.ts` is used as-is:

```ts
export interface ProjectData {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  role: string;
  year: string;
  category: string;
  techStack?: string[];
  liveUrl?: string;
  githubUrl?: string;
  sections?: Array<{ title: string; content: string }>;
}
```

`PROJECT_DATA` remains the single source of truth. `generateStaticParams` derives slugs from it at build time.

---

## Interfaces

### Props Summary

| Component | Props | Direction |
|---|---|---|
| `AboutContent` | `activeSection: string` | Shell → Content |
| `ProjectsContent` | _(none)_ | — |
| `ProjectContent` | `project: ProjectData` | page.tsx → Shell → Content |
| `ProjectClient` | `project: ProjectData` | page.tsx → Shell |
| `AboutClient` | _(none)_ | — |
| `ProjectsClient` | _(none)_ | — |

### Data Flow — Project Detail Page

```
page.tsx (Server)
  await params → slug
  PROJECT_DATA.find(slug) → project | notFound()
  ↓ project prop
ProjectClient (Client Shell)
  ↓ project.slug
  ProjectInteractions (side-effects)
  ↓ project prop
  ProjectContent (Server Component — static HTML)
```

### Data Flow — About Page

```
page.tsx (Server)
  ↓ (no props)
AboutClient (Client Shell)
  useState → activeSection
  ↓ onSectionChange callback
  AboutInteractions (scroll-spy → calls onSectionChange)
  ↓ activeSection prop
  AboutContent (Server Component — static HTML with active class)
```

---

## Error Handling

### Unknown Project Slug

`page.tsx` calls `notFound()` from `next/navigation` synchronously when `PROJECT_DATA.find` returns `undefined`. This triggers Next.js's built-in 404 page (`src/app/not-found.tsx`). The `useEffect` redirect that previously lived in `ProjectClient` is removed entirely — the server handles the 404 before any JSX is rendered.

### Missing `generateStaticParams` Coverage

If a slug is requested that is not in `PROJECT_DATA` (e.g. a manually typed URL), Next.js will attempt dynamic rendering and hit the `notFound()` branch above. No special handling is needed beyond the existing `not-found.tsx`.

### TypeScript Non-Null Assertion

The prev/next navigation in `ProjectContent` uses `PROJECT_DATA[project.id - 2]!` and `PROJECT_DATA[project.id]!`. These are safe because `project.id` is 1-indexed and bounded by `PROJECT_DATA.length`, but the non-null assertions should be preserved from the existing code to avoid TypeScript errors.

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Active section drives sidebar class

*For any* valid `activeSection` value in `['informations', 'fields', 'socials', 'contact']`, rendering `AboutContent` with that value SHALL produce exactly one nav item with the active CSS class (`text-white`) and all other nav items with the inactive CSS class (`text-white/40`).

**Validates: Requirements 1.3**

### Property 2: All projects appear in ProjectsContent

*For any* project in `PROJECT_DATA`, rendering `ProjectsContent` SHALL produce output that contains that project's title, so that no project is silently omitted from the grid.

**Validates: Requirements 2.3**

### Property 3: ProjectContent renders all sections for any project

*For any* valid `ProjectData` object, rendering `ProjectContent` with that object as the `project` prop SHALL produce output containing the project's title, description, category, year, role, and — when present — each tech stack tag and each content section title.

**Validates: Requirements 3.2**

### Property 4: generateStaticParams is a bijection of PROJECT_DATA slugs

*For any* state of `PROJECT_DATA`, calling `generateStaticParams` SHALL return an array whose length equals `PROJECT_DATA.length` and whose entries are exactly `PROJECT_DATA.map(p => ({ slug: p.slug }))` — ensuring every project slug is covered and no extra entries are produced.

**Validates: Requirements 4.2, 4.3**

### Property 5: No shim imports in application source

*For all* `.ts` and `.tsx` files under `src/app/` and `src/components/`, no import statement SHALL contain the string `3d-gallery-photography`, ensuring the re-export shim is not referenced by application code.

**Validates: Requirements 7.1, 7.2**
