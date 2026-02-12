# Uniform Page Transitions

## Overview
All page transitions are now standardized across the entire website for a consistent, professional user experience.

## Transition System

### Base Transition (FadeTransition Component)
All pages use the same `FadeTransition` wrapper:

```typescript
duration: 0.6s
ease: [0.4, 0, 0.2, 1] (cubic-bezier)
```

**Effects:**
- Circle reveal from center: 0.6s
- Opacity fade: 0.5s with 0.1s delay
- Content fade in: 0.5s with 0.15s delay

### Standardized Animation Delays

All pages now follow the same timing pattern:

| Element | Delay | Duration |
|---------|-------|----------|
| Back/Nav buttons | 0.3s | 0.6s |
| First content block | 0.5s | 0.6s |
| Second element | 0.6s | 0.6s |
| Third element | 0.7s | 0.6s |
| Fourth element | 0.8s | 0.6s |
| Fifth element | 0.9s | 0.6s |
| Sixth element | 1.0s | 0.6s |
| Image/Media | 1.1s | 0.6s |

### Consistent Across All Pages

#### Home Page (/)
- FadeTransition wrapper
- Navigation appears at 0.3s
- Hero content fades in smoothly

#### About Page (/about)
- FadeTransition wrapper
- Back button: 0.3s
- Sidebar menu: 0.3s
- Main heading: 0.5s → 0.6s → 0.7s → 0.8s
- Bottom info: 0.9s

#### Projects Page (/projects)
- FadeTransition wrapper
- Back button: 0.3s
- Header: 0.3s
- Title section: 0.5s → 0.6s → 0.7s → 0.8s
- Project grid: Staggered 0.1s per item

#### Individual Project (/project/[slug])
- FadeTransition wrapper
- Back button: 0.3s
- Project nav: 0.3s
- Title: 0.5s → 0.6s → 0.7s → 0.8s → 0.9s → 1.0s
- Project image: 1.1s

## Benefits

### User Experience
- ✅ Consistent feel across all pages
- ✅ Predictable animation timing
- ✅ Professional polish
- ✅ No jarring transitions
- ✅ Smooth page-to-page navigation

### Performance
- ✅ Optimized timing (0.6s base)
- ✅ No excessive delays
- ✅ Fast perceived load time
- ✅ Smooth 60fps animations

### Maintainability
- ✅ Single source of truth (FadeTransition)
- ✅ Easy to adjust globally
- ✅ Consistent codebase
- ✅ Clear timing pattern

## Animation Pattern

```
Page Load
    ↓
FadeTransition (0-0.6s)
    ↓
Navigation Elements (0.3s)
    ↓
Main Content (0.5s-1.0s)
    ↓
Media/Images (1.1s)
    ↓
Fully Loaded
```

## Timing Breakdown

### Phase 1: Page Reveal (0-0.6s)
- Circle reveal animation
- Black overlay fades out
- Page becomes visible

### Phase 2: UI Elements (0.3s)
- Back button slides in
- Navigation appears
- Fixed elements animate

### Phase 3: Content Cascade (0.5s-1.0s)
- Heading fades in
- Description appears
- Details reveal
- CTAs animate

### Phase 4: Media (1.1s)
- Images load and fade in
- Gallery appears
- Final polish

## Code Example

```typescript
// All pages follow this pattern:
<FadeTransition>
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay: 0.3 }}
  >
    Back Button
  </motion.div>

  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.5 }}
  >
    Main Content
  </motion.div>
</FadeTransition>
```

## Customization

To adjust timing globally, edit:
- `src/components/ui/FadeTransition.tsx` - Base transition
- `src/lib/constants/animations.ts` - Timing constants

## Testing

Verified on:
- ✅ Home page
- ✅ About page
- ✅ Projects page
- ✅ Individual project pages
- ✅ All navigation flows
- ✅ Back button transitions

## Result

A polished, professional website with uniform transitions that feel smooth and intentional across every page.
