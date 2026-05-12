# Implementation Plan: Frontend Architecture Refactor

## Overview

Extract static markup from three `'use client'` route components into React Server Components, thin out the client shells to framer-motion entry animations only, add `generateStaticParams` to the project detail page, document the Navigation and Hero client boundaries with JSDoc, and verify gallery import hygiene. The implementation follows the target architecture: `page.tsx (Server) → *Client.tsx (Shell) → *Content.tsx (Server Component)`.

---

## Tasks

- [x] 1. Create `AboutContent` server component
  - [x] 1.1 Create `src/app/about/AboutContent.tsx` as a React Server Component (no `'use client'` directive, no React hooks)
    - Accept `activeSection: 'informations' | 'fields' | 'socials' | 'contact' | string` as a prop
    - Move all `<section>` blocks from `AboutClient` into this file: informations (01), fields of practice (02), socials (03), contact (04)
    - Move the bottom-left timezone `<motion.div>` block, converting it to a plain `<div>` (no framer-motion)
    - Convert all `<motion.*>` wrappers inside sections to plain `<div>` / `<section>` elements
    - Apply active-section class logic on sidebar nav items: `activeSection === id ? 'text-white' : 'text-white/40 hover:text-white/80'`
    - Remove `trackExternalLink` / `trackCTAClick` calls — socials and contact links become plain `<a>` tags
    - Import `Link` from `next/link` and `getGmailComposeUrl` from `@/lib/utils` as needed for static links
    - _Requirements: 1.1, 1.2, 1.3_

  - [x]* 1.2 Write property test for active-section sidebar class logic
    - **Property 1: Active section drives sidebar class**
    - For each value in `['informations', 'fields', 'socials', 'contact']`, rendering `AboutContent` with that `activeSection` SHALL produce exactly one nav item with `text-white` and all others with `text-white/40`
    - **Validates: Requirements 1.3**

- [x] 2. Thin out `AboutClient` shell
  - [x] 2.1 Modify `src/app/about/AboutClient.tsx` to be a thin client shell
    - Remove all `<section>` blocks (informations, fields, socials, contact) and the timezone block
    - Remove imports no longer needed: `trackExternalLink`, `trackCTAClick`, `getGmailComposeUrl`
    - Add import for `AboutContent` from `./AboutContent`
    - Retain: `useState('informations')`, `useCallback` for `handleSectionChange`, `<FadeTransition>`, framer-motion `<motion.div>` for back button (fixed top-right), framer-motion `<motion.div>` for sidebar nav container (fixed top-left, including `SECTION_LABELS[activeSection]` label and nav button list), `<AboutInteractions onSectionChange={handleSectionChange} />`
    - Render `<AboutContent activeSection={activeSection} />` as a direct child inside the layout `<div>`
    - _Requirements: 1.4, 1.5, 1.6_

- [x] 3. Checkpoint — About page
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Create `ProjectsContent` server component
  - [x] 4.1 Create `src/app/projects/ProjectsContent.tsx` as a React Server Component (no `'use client'` directive, no React hooks)
    - Import `PROJECT_DATA` directly from `@/lib/constants/projects` (no prop drilling)
    - Import `Link` from `next/link` and `Image` from `next/image`
    - Render the full projects page markup: outer `<div className="min-h-screen bg-black text-white md:cursor-none hide-scrollbar">`, hero title section, first divider, project grid (`PROJECT_DATA.map(...)`), second divider, CTA section
    - Convert all `<motion.*>` wrappers to plain `<div>` / `<section>` elements
    - Remove `trackProjectClick` / `trackCTAClick` calls — project card links and CTA links become plain `<Link>` / `<a>` tags
    - Remove `getGmailComposeUrl` import if it was only used for analytics-wrapped links; keep it for the static email href
    - _Requirements: 2.1, 2.2, 2.3_

  - [x]* 4.2 Write property test for project grid completeness
    - **Property 2: All projects appear in ProjectsContent**
    - For each project in `PROJECT_DATA`, rendering `ProjectsContent` SHALL produce output containing that project's title
    - **Validates: Requirements 2.3**

- [x] 5. Thin out `ProjectsClient` shell
  - [x] 5.1 Modify `src/app/projects/ProjectsClient.tsx` to be a thin client shell
    - Remove all project card markup, hero title section, dividers, and CTA section
    - Remove imports no longer needed: `PROJECT_DATA`, `Image`, `trackProjectClick`, `trackCTAClick`, `getGmailComposeUrl`
    - Add import for `ProjectsContent` from `./ProjectsContent`
    - Retain: `<FadeTransition>` wrapper, `<ProjectsInteractions />`, framer-motion `<motion.div>` for back button (fixed top-right), framer-motion `<motion.div>` for header (fixed top-left, with "Projects" label and "All Projects" sub-label)
    - Render `<ProjectsContent />` as a direct child (sibling of `<ProjectsInteractions />`, not wrapped by it)
    - _Requirements: 2.4, 2.5_

- [x] 6. Checkpoint — Projects page
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Create `ProjectContent` server component
  - [x] 7.1 Create `src/app/project/[slug]/ProjectContent.tsx` as a React Server Component (no `'use client'` directive, no React hooks)
    - Accept `project: ProjectData` as a prop (import `ProjectData` and `PROJECT_DATA` from `@/lib/constants/projects`)
    - Import `Link` from `next/link` and `Image` from `next/image`
    - Render the full project detail markup inside `<div className="min-h-screen bg-black text-white md:cursor-none hide-scrollbar">`: hero section (title, description, meta grid, tech stack, CTAs), project image, content sections loop, divider, prev/next navigation
    - Convert all `<motion.*>` wrappers to plain `<div>` / `<section>` elements
    - Remove `trackExternalLink` calls — live/GitHub links become plain `<a>` tags
    - Preserve non-null assertions `PROJECT_DATA[project.id - 2]!` and `PROJECT_DATA[project.id]!` in prev/next navigation
    - _Requirements: 3.1, 3.2_

  - [x]* 7.2 Write property test for project content completeness
    - **Property 3: ProjectContent renders all sections for any project**
    - For each valid `ProjectData` object in `PROJECT_DATA`, rendering `ProjectContent` with that object SHALL produce output containing the project's title, description, category, year, role, each tech stack tag (when present), and each content section title (when present)
    - **Validates: Requirements 3.2**

- [x] 8. Thin out `ProjectClient` shell and update `page.tsx`
  - [x] 8.1 Modify `src/app/project/[slug]/ProjectClient.tsx` to accept `project: ProjectData` as a prop
    - Remove `use(params)`, `useRouter`, `useEffect` redirect, `PROJECT_DATA.find`, and the "not found" fallback JSX
    - Remove imports no longer needed: `use`, `useRouter`, `useEffect`, `Image`, `trackExternalLink`
    - Add import for `ProjectContent` from `./ProjectContent`
    - Update `ProjectClientProps` interface: replace `params: Promise<{ slug: string }>` with `project: ProjectData`
    - Retain: `<FadeTransition>` wrapper, `<ProjectInteractions slug={project.slug} />`, framer-motion `<motion.div>` for back button (fixed top-right), framer-motion `<motion.div>` for project nav label (fixed top-left, with "Project X of N" and `project.title`)
    - Render `<ProjectContent project={project} />` as a direct child
    - _Requirements: 3.5, 3.6, 3.8_

  - [x] 8.2 Update `src/app/project/[slug]/page.tsx` to resolve params server-side
    - Make `ProjectPage` an `async` function
    - `await params` to get `slug`
    - Call `PROJECT_DATA.find(p => p.slug === slug)` to resolve the project
    - Call `notFound()` from `next/navigation` if `find` returns `undefined`
    - Pass the resolved `project` to `<ProjectClient project={project} />`
    - Add `generateStaticParams` export: `return PROJECT_DATA.map(p => ({ slug: p.slug }))`
    - Keep the existing `generateMetadata` export unchanged
    - _Requirements: 3.3, 3.4, 3.7, 4.1, 4.2, 4.3_

  - [x]* 8.3 Write property test for `generateStaticParams` bijection
    - **Property 4: generateStaticParams is a bijection of PROJECT_DATA slugs**
    - Calling `generateStaticParams` SHALL return an array of length `PROJECT_DATA.length` whose entries equal `PROJECT_DATA.map(p => ({ slug: p.slug }))`
    - **Validates: Requirements 4.2, 4.3**

- [x] 9. Checkpoint — Project detail page
  - Ensure all tests pass, ask the user if questions arise.

- [x] 10. Add JSDoc to `Navigation` component
  - [x] 10.1 Add JSDoc block comment to `src/components/Navigation.tsx` immediately before the `Navigation` component function declaration
    - State that `usePathname()` is a client-only hook requiring browser routing context
    - State that framer-motion `AnimatePresence` / `motion.*` entry animations require DOM hydration
    - State that both prevent this component from being a Server Component
    - No structural changes to markup, behaviour, or prop interface
    - _Requirements: 5.1, 5.2_

- [x] 11. Add JSDoc to `Hero` component
  - [x] 11.1 Add JSDoc block comment to `src/components/Hero.tsx` immediately before the `Hero` component function declaration
    - State that `HeroOverlay` is a React Server Component rendered as a child inside this client tree
    - State that `GalleryCanvas` is a WebGL client component
    - State that the component calls `useRouter`, `useState`, `useEffect`, and reads `localStorage` — all browser-only APIs
    - State that the `'use client'` boundary is intentional and minimal — no further static markup can be extracted without breaking the hook dependencies
    - No structural changes to markup, behaviour, or prop interface
    - _Requirements: 6.1, 6.2_

- [x] 12. Gallery import hygiene audit
  - [x] 12.1 Search all `.ts` and `.tsx` files under `src/app/` and `src/components/` for any import containing `3d-gallery-photography`
    - Run: `grep -r "3d-gallery-photography" src/app/ src/components/ --include="*.ts" --include="*.tsx"`
    - If zero matches: requirement is already satisfied — document the result and move on
    - If any matches found: replace each shim import with a direct import from the appropriate `src/components/ui/gallery/` sub-module (`GalleryCanvas`, `GalleryScene`, `ImagePlane`, `shaderMaterials`, `useGalleryInput`, or `useTextureLoader`)
    - Do NOT edit or delete `src/components/ui/3d-gallery-photography.tsx` itself
    - _Requirements: 7.1, 7.2, 7.3_

  - [x]* 12.2 Write property test for zero shim imports
    - **Property 5: No shim imports in application source**
    - For all `.ts` and `.tsx` files under `src/app/` and `src/components/`, no import statement SHALL contain the string `3d-gallery-photography`
    - **Validates: Requirements 7.1, 7.2**

- [x] 13. TypeScript build verification
  - [x] 13.1 Run `npx tsc --noEmit` (or `npm run build`) to confirm zero TypeScript errors across the refactored codebase
    - Fix any type errors surfaced by the compiler (e.g. missing props, incorrect interface shapes, non-null assertion issues)
    - Ensure `ProjectData` is correctly imported in all new server components
    - _Requirements: 1.1, 2.1, 3.1, 3.3, 4.1_

- [x] 14. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

---

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation after each route is refactored
- Property tests validate universal correctness properties defined in the design document
- The `3d-gallery-photography.tsx` shim file must NOT be deleted or modified — only application-code imports of it are in scope
- `trackExternalLink` / `trackCTAClick` / `trackProjectClick` calls are intentionally removed from server components; analytics for those interactions can be added back as separate client islands in a future task
- Non-null assertions in prev/next navigation (`PROJECT_DATA[project.id - 2]!`) are safe and must be preserved

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "4.1", "7.1"] },
    { "id": 1, "tasks": ["1.2", "2.1", "4.2", "5.1", "7.2", "8.1"] },
    { "id": 2, "tasks": ["8.2", "8.3", "10.1", "11.1"] },
    { "id": 3, "tasks": ["12.1"] },
    { "id": 4, "tasks": ["12.2", "13.1"] }
  ]
}
```
