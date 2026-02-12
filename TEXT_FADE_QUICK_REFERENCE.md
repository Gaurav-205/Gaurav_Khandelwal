# Text Fade - Quick Reference

## What It Does
Images fade out and blur before passing through the "Gaurav Khandelwal" text in the center.

## Visual Effect

```
Before:
[Image] → [Image] → [IMAGE OVER TEXT] ❌ (Text hard to read)

After:
[Image] → [Fading...] → [        ] ✅ (Text always readable)
                         ↑
                    Text visible
```

## How It Works

### The Fade Zone
```
Position:  0.0 -------- 0.35 ---- 0.5 ---- 0.65 -------- 1.0
Effect:    [Clear] → [Fading] → [Gone] → [Fading] → [Clear]
                        ↓         ↓         ↓
                      Start    Center     End
```

### Opacity Curve
```
Opacity
  100% |████████╲                    ╱████████
       |         ╲                  ╱
   50% |          ╲                ╱
       |           ╲              ╱
    0% |____________╲____________╱____________
       0.0        0.35   0.5   0.65        1.0
                        Position
```

## Key Numbers

| Parameter | Value | Effect |
|-----------|-------|--------|
| Fade Range | 15% | How far from center fade starts |
| Blur Max | 4 units | Maximum blur at center |
| Center Position | 0.5 | Middle of depth range |

## Customization

Want to adjust? Edit these in `3d-gallery-photography.tsx`:

```typescript
// Wider fade zone (more gradual)
const textCenterFadeRange = 0.20;

// Narrower fade zone (more abrupt)  
const textCenterFadeRange = 0.10;

// More blur
const centerBlurAmount = ... * 6; // instead of 4

// Less blur
const centerBlurAmount = ... * 2; // instead of 4
```

## Result

✅ Text always readable
✅ Smooth, professional effect
✅ Reinforces 3D depth
✅ No performance impact

## File Changed
- `src/components/ui/3d-gallery-photography.tsx`

## Testing
1. Run `npm run dev`
2. Watch images scroll
3. Notice fade near center text
4. Text stays readable!
