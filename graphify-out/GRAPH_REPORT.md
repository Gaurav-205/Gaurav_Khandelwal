# Graph Report - .  (2026-05-13)

## Corpus Check
- 67 files · ~125,602 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 253 nodes · 312 edges · 28 communities (23 shown, 5 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 13 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 27|Community 27]]

## God Nodes (most connected - your core abstractions)
1. `Analytics` - 11 edges
2. `Gaurav Khandelwal Portfolio Documentation` - 10 edges
3. `Onam Festival Event` - 9 edges
4. `PROJECT_DATA` - 8 edges
5. `Z_INDEX` - 7 edges
6. `getGmailComposeUrl()` - 6 edges
7. `ErrorBoundary` - 5 edges
8. `KampusKart Platform` - 5 edges
9. `Prank Wizard` - 5 edges
10. `trackPageView()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Open Graph Image Specification` --conceptually_related_to--> `Gaurav Khandelwal Portfolio Documentation`  [INFERRED]
  public/og-image-placeholder.txt → README.md
- `ProjectPage()` --calls--> `NotFound()`  [INFERRED]
  src/app/project/[slug]/page.tsx → src/app/not-found.tsx
- `AboutContent()` --calls--> `getGmailComposeUrl()`  [EXTRACTED]
  src/app/about/AboutContent.tsx → src/lib/utils.ts
- `ProjectsContent()` --calls--> `getGmailComposeUrl()`  [EXTRACTED]
  src/app/projects/ProjectsContent.tsx → src/lib/utils.ts

## Hyperedges (group relationships)
- **3D Rendering Technology Stack** — threejs, reactthreefiber, webgl [INFERRED 0.85]
- **Coming Soon Teaser UI Composition** — coming-soon_image, eye_icon_element, stay_tune_button [EXTRACTED 0.98]
- **Landing Page Layout Pattern** — kampuskart_header, kampuskart_hero, kampuskart_signup_cta, kampuskart_how_it_works [EXTRACTED 0.95]
- **Onam Event Navigation Structure** — navigation_home, navigation_shopping, navigation_sadya, navigation_events, navigation_coming_soon [EXTRACTED 1.00]
- **Onam Festival Landing Page** — onam_festival_event, branding_logo, hero_imagery, countdown_timer, accessibility_message, event_location_mit_adt [EXTRACTED 0.98]
- **Prank Wizard Core Features** — feature_personalized_plans, feature_secure_private, feature_free_to_use [EXTRACTED 0.93]
- **Landing Page Call-to-Action Elements** — ui_get_started_button, ui_sign_in_button, ui_hero_section [EXTRACTED 0.94]

## Communities (28 total, 5 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.08
Nodes (21): Hero, SHORTCUTS, LoadingScreen, LoadingScreenProps, Navigation, slideFromLeft, slideFromRight, slideFromTop (+13 more)

### Community 1 - "Community 1"
Cohesion: 0.08
Nodes (8): NAV_ITEMS, SECTION_LABELS, metadata, AnalyticsEvent, trackPageView(), metadata, ProjectInteractionsProps, FadeTransitionProps

### Community 2 - "Community 2"
Cohesion: 0.1
Nodes (20): FallbackGallery, GalleryCanvas, GalleryCanvasProps, BlurSettings, FadeSettings, GalleryScene, GallerySceneProps, PlaneData (+12 more)

### Community 3 - "Community 3"
Cohesion: 0.12
Nodes (13): NotFound(), PROJECT_DATA, ProjectData, ProjectPage(), ProjectPageProps, ProjectClientProps, ProjectContentProps, { getByText } (+5 more)

### Community 4 - "Community 4"
Cohesion: 0.11
Nodes (12): AboutContent(), AboutContentProps, NAV_ITEMS, SECTION_LABELS, getGmailComposeUrl(), ProjectsContent(), activeLinks, { container } (+4 more)

### Community 5 - "Community 5"
Cohesion: 0.19
Nodes (13): ESLint Linting Tool, Framer Motion Animation Library, eslintConfig, Interactive 3D Gallery Feature, Next.js 16 Framework, Open Graph Image Specification, React 19 UI Library, React Three Fiber Renderer (+5 more)

### Community 6 - "Community 6"
Cohesion: 0.19
Nodes (4): metadata, viewport, ENV, SmoothCursor

### Community 7 - "Community 7"
Cohesion: 0.17
Nodes (10): allFiles, APP_DIR, appFiles, componentFiles, COMPONENTS_DIR, content, lines, ROOT (+2 more)

### Community 9 - "Community 9"
Cohesion: 0.18
Nodes (11): Open for All - Everyone Welcome, Onam Brand Logo & Header, Event Countdown Timer (194 days, 13 hours, 13 minutes, 53 seconds), MIT ADT University, Hero Image - Cultural Celebration Visuals, Kerala's Tradition & Culture, Navigation - Events, Navigation - Home (+3 more)

### Community 10 - "Community 10"
Cohesion: 0.28
Nodes (9): Navigation Header, Hero Section, How It Works Section, Campus Menu Item, Features Menu Item, KampusKart Platform, Sign Up Call-to-Action Button, Process Steps (1, 2, 3) (+1 more)

### Community 11 - "Community 11"
Cohesion: 0.25
Nodes (9): Free to Use, Personalized Plans, Secure & Private, Prank Wizard, Prank Wizard Landing Page, Get Started Button, Hero Section - Plan the Perfect Prank Experience, Sign In Button (+1 more)

### Community 12 - "Community 12"
Cohesion: 0.25
Nodes (3): ErrorBoundary, Props, State

### Community 13 - "Community 13"
Cohesion: 0.5
Nodes (5): Coming Soon Placeholder, Coming Soon Design Pattern, Crossed-Out Eye Icon, Project Portfolio Teaser Content, Stay Tune Call-to-Action Button

## Knowledge Gaps
- **97 isolated node(s):** `eslintConfig`, `nextConfig`, `config`, `metadata`, `viewport` (+92 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Analytics` connect `Community 8` to `Community 1`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._
- **Why does `getGmailComposeUrl()` connect `Community 4` to `Community 0`, `Community 3`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `Onam Festival Event` (e.g. with `Navigation - Home` and `Navigation - Shopping`) actually correct?**
  _`Onam Festival Event` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `eslintConfig`, `nextConfig`, `config` to the rest of the system?**
  _97 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._