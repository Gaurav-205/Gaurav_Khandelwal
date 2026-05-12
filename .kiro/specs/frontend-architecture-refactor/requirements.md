# Requirements Document

## Introduction

This feature refactors the Next.js portfolio's route pages to maximise server-side rendering. Static markup that currently lives inside `'use client'` components is extracted into React Server Components (RSC). Only the parts that genuinely require the browser — framer-motion entry animations, scroll-spy, keyboard shortcuts, and analytics side-effects — remain client-side. The 3D gallery split is already complete and is out of scope. The work targets three route pages (`/about`, `/projects`, `/project/[slug]`) plus a static-generation improvement and a minor import hygiene pass.

## Glossary

- **Server Component**: A React component that runs only on the server and ships zero JavaScript to the browser. Must not carry a `'use client'` directive.
- **Client Island**: A React component marked `'use client'` that hydrates in the browser. Should be as small as possible.
- **Interactions Island**: A `'use client'` component that renders `null` and owns only browser side-effects (analytics, keyboard shortcuts, scrollbar management).
- **Content Component**: A new Server Component that holds all static markup for a route, receiving resolved data as props.
- **Shell Component**: The thin `'use client'` wrapper that remains after extraction; it owns only framer-motion entry animations and any state required to drive them.
- **AboutClient**: The existing client component at `src/app/about/AboutClient.tsx`.
- **AboutContent**: The new Server Component to be created at `src/app/about/AboutContent.tsx`.
- **ProjectsClient**: The existing client component at `src/app/projects/ProjectsClient.tsx`.
- **ProjectsContent**: The new Server Component to be created at `src/app/projects/ProjectsContent.tsx`.
- **ProjectClient**: The existing client component at `src/app/project/[slug]/ProjectClient.tsx`.
- **ProjectContent**: The new Server Component to be created at `src/app/project/[slug]/ProjectContent.tsx`.
- **PROJECT_DATA**: The static TypeScript array exported from `src/lib/constants/projects.ts`.
- **FadeTransition**: The existing `'use client'` wrapper component at `src/components/ui/FadeTransition.tsx`.
- **Navigation**: The existing `'use client'` component at `src/components/Navigation.tsx`.
- **HeroOverlay**: The existing Server Component at `src/components/HeroOverlay.tsx`.

---

## Requirements

### Requirement 1 — About Page Server/Client Split

**User Story:** As a developer, I want the About page's static bio, skills, socials, and contact markup to be server-rendered, so that the page HTML is available without JavaScript and the client bundle is smaller.

#### Acceptance Criteria

1. THE AboutContent Component SHALL be a React Server Component with no `'use client'` directive at the top of the file, and SHALL NOT import any React hooks (`useState`, `useEffect`, `useRef`, etc.).
2. THE AboutContent Component SHALL render all static markup currently in AboutClient, including the informations section, fields-of-practice section, socials section, contact section, and the bottom-left timezone block, such that the rendered HTML is identical to the current output.
3. THE AboutContent Component SHALL accept an `activeSection` prop typed as `'informations' | 'fields' | 'socials' | 'contact' | string` and SHALL apply a visually distinct CSS class (e.g. `text-white` vs `text-white/40`) to the matching sidebar navigation item, so that the active item is distinguishable without client state in the content tree.
4. THE AboutClient Shell SHALL retain only: the `activeSection` state initialised to `'informations'`, the `handleSectionChange` callback, framer-motion entry animation wrappers for the back button and sidebar nav, and the `FadeTransition` wrapper. It SHALL NOT contain any static markup sections (bio text, skills list, socials links, contact block).
5. THE AboutClient Shell SHALL render `<AboutContent activeSection={activeSection} />` as a direct child, passing the resolved state down as a prop.
6. THE AboutInteractions Component SHALL continue to call `onSectionChange` to update the state held in AboutClient Shell, with no changes to its existing prop interface or internal logic.
7. THE `src/app/about/page.tsx` Server Component SHALL import and render `<AboutClient />` with no changes to its existing `metadata` export or file structure.

### Requirement 2 — Projects Page Server/Client Split

**User Story:** As a developer, I want the Projects page's project grid and surrounding static copy to be server-rendered, so that search engines index the full content and the initial page load requires no JavaScript.

#### Acceptance Criteria

1. THE ProjectsContent Component SHALL be a React Server Component with no `'use client'` directive at the top of the file, and SHALL NOT import any React hooks.
2. THE ProjectsContent Component SHALL render all static markup currently in ProjectsClient, including the back button, header, hero title section, project grid, dividers, and the CTA section, such that the rendered HTML is identical to the current output.
3. THE ProjectsContent Component SHALL import PROJECT_DATA directly from `@/lib/constants/projects` and render the project grid without receiving data as a prop, so that the component is self-contained and requires no prop drilling from the shell.
4. THE ProjectsClient Shell SHALL retain only: the `FadeTransition` wrapper, the `<ProjectsInteractions />` render, and framer-motion entry animation wrappers for the back button and header. It SHALL NOT contain any project card markup or static copy.
5. THE ProjectsClient Shell SHALL render `<ProjectsContent />` as a direct child so that static content is nested inside the client animation boundary, with `<ProjectsInteractions />` rendered as a sibling (not a wrapper) of `<ProjectsContent />`.
6. THE `src/app/projects/page.tsx` Server Component SHALL import and render `<ProjectsClient />` with no changes to its existing `metadata` export or file structure.

### Requirement 3 — Project Detail Page Server/Client Split

**User Story:** As a developer, I want the project detail page's content (title, description, meta grid, tech stack, image, sections, and prev/next navigation) to be server-rendered, so that the page is indexable and loads without JavaScript.

#### Acceptance Criteria

1. THE ProjectContent Component SHALL be a React Server Component with no `'use client'` directive at the top of the file, and SHALL NOT import any React hooks.
2. THE ProjectContent Component SHALL accept a `project` prop typed as `ProjectData` (imported from `@/lib/constants/projects`) and render all static markup currently in ProjectClient, including the project nav label, hero section, meta grid, tech stack, project image, content sections, divider, and prev/next navigation.
3. THE `src/app/project/[slug]/page.tsx` Server Component SHALL `await` the `params` Promise, look up the project by `slug` in PROJECT_DATA using `Array.find`, and pass the resolved `ProjectData` object as a prop to both `<ProjectContent />` and `<ProjectClient />`. The existing `generateMetadata` export SHALL remain unchanged.
4. IF `Array.find` returns `undefined` (slug not in PROJECT_DATA), THEN THE `src/app/project/[slug]/page.tsx` Server Component SHALL call `notFound()` from `next/navigation` synchronously before rendering any JSX.
5. THE ProjectClient Shell SHALL retain only: the `FadeTransition` wrapper, the `<ProjectInteractions slug={project.slug} />` render, and framer-motion entry animation wrappers for the back button and project nav label. It SHALL NOT contain any project content markup.
6. THE ProjectClient Shell SHALL accept a `project` prop typed as `ProjectData` and render `<ProjectContent project={project} />` as a direct child.
7. THE `src/app/project/[slug]/page.tsx` Server Component SHALL pass the resolved `project` to `<ProjectClient project={project} />` as a prop.
8. THE `use(params)` call, the `useEffect` redirect, and any `useRouter` import SHALL be removed from ProjectClient, reducing its React hook usage to zero.

### Requirement 4 — Static Generation for Project Routes

**User Story:** As a developer, I want all project detail pages to be statically generated at build time, so that each project page is served as a pre-rendered HTML file with no per-request server work.

#### Acceptance Criteria

1. THE `src/app/project/[slug]/page.tsx` Server Component SHALL export a `generateStaticParams` function at module scope.
2. THE `generateStaticParams` function SHALL return `Array<{ slug: string }>` with exactly `PROJECT_DATA.length` entries, where each entry's `slug` value equals the corresponding `project.slug` string in PROJECT_DATA.
3. THE `generateStaticParams` function SHALL import PROJECT_DATA from `@/lib/constants/projects` and derive slugs via `PROJECT_DATA.map(p => ({ slug: p.slug }))`, so that adding a new project to PROJECT_DATA automatically includes it in the static build without any other changes.

### Requirement 5 — Navigation Component Documentation

**User Story:** As a developer, I want the Navigation component's client boundary to be explicitly documented, so that future contributors understand why it cannot be a Server Component.

#### Acceptance Criteria

1. THE Navigation Component SHALL remain a `'use client'` component with no structural changes to its markup, behaviour, or prop interface.
2. THE Navigation Component SHALL include a JSDoc block comment immediately before the component function declaration that explicitly states: (a) `usePathname()` is a client-only hook that requires the browser routing context, and (b) framer-motion `AnimatePresence` / `motion.*` entry animations require DOM hydration — both of which prevent this component from being a Server Component.

### Requirement 6 — Hero Client Boundary Audit

**User Story:** As a developer, I want the Hero component's client boundary to be confirmed as minimal and documented, so that the architecture is clear and no unnecessary server-renderable markup is trapped client-side.

#### Acceptance Criteria

1. THE Hero Component SHALL remain a `'use client'` component because it directly calls `useRouter`, `useState`, `useEffect`, and reads `localStorage` — all of which are browser-only APIs unavailable in Server Components.
2. THE Hero Component SHALL include a JSDoc block comment immediately before the component function declaration that explicitly states: (a) `HeroOverlay` is a React Server Component rendered as a child inside this client tree, (b) `GalleryCanvas` is a WebGL client component, and (c) the `'use client'` boundary is intentional and minimal — no further static markup can be extracted without breaking the hook dependencies.
3. THE HeroOverlay Component SHALL remain a Server Component with no `'use client'` directive, and SHALL NOT import any React hooks in the refactored codebase.

### Requirement 7 — Gallery Import Hygiene

**User Story:** As a developer, I want all imports of the 3D gallery to reference the focused modules under `src/components/ui/gallery/` directly, so that the re-export shim `3d-gallery-photography.tsx` is no longer used in application code.

#### Acceptance Criteria

1. IF any source file under `src/app/` or `src/components/` contains an import statement whose module specifier resolves to `src/components/ui/3d-gallery-photography.tsx`, THEN that import SHALL be replaced with a direct import from the appropriate `src/components/ui/gallery/` sub-module (`GalleryCanvas`, `GalleryScene`, `ImagePlane`, `shaderMaterials`, `useGalleryInput`, or `useTextureLoader`).
2. AFTER the refactor, a static search of all `.ts` and `.tsx` files under `src/app/` and `src/components/` SHALL find zero occurrences of the strings `3d-gallery-photography` or `3d-gallery-photography.tsx`.
3. THE `src/components/ui/3d-gallery-photography.tsx` shim file SHALL be retained as-is (no edits, no deletion) so that any external tooling or documentation references continue to resolve without error.
