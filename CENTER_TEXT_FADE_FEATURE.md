# Center Text Fade Feature

## Overview
Images in the 3D gallery now smoothly fade out and blur when they pass behind the "Gaurav Khandelwal" text in the center of the screen, creating a professional depth effect.

## How It Works

### Visual Effect
When an image approaches the center of the screen (where the text is), it:
1. **Fades out** - Gradually becomes transparent
2. **Blurs** - Gets progressively blurrier
3. **Disappears** - Completely invisible at the exact center
4. **Reappears** - Fades back in as it moves away from center

### Technical Implementation

The effect is applied in the 3D gallery's animation loop:

```typescript
// Center position is at 0.5 (middle of depth range)
const textCenterPosition = 0.5;
const textCenterFadeRange = 0.15; // 15% fade zone on each side

// Calculate distance from center
const textDistanceFromCenter = Math.abs(normalizedPosition - textCenterPosition);

if (textDistanceFromCenter < textCenterFadeRange) {
  // Fade from 1 (fully visible) to 0 (invisible) as it approaches center
  const centerFade = textDistanceFromCenter / textCenterFadeRange;
  opacity *= centerFade;
}
```

### Fade Zone

```
|-------|=======|CENTER|=======|-------|
  Full    Fade    Text   Fade    Full
 Visible  Zone   (0.5)   Zone  Visible
         (0.35)         (0.65)

← Images moving this direction →
```

- **Full Visibility**: normalizedPosition < 0.35 or > 0.65
- **Fade Zone**: 0.35 - 0.65 (30% of total depth)
- **Center (Text)**: 0.5 (completely invisible)

## Parameters

### Opacity Fade
- **Range**: 15% on each side of center (30% total)
- **Effect**: Linear fade from 100% to 0%
- **Location**: `textCenterFadeRange = 0.15`

### Blur Effect
- **Range**: 15% on each side of center (30% total)
- **Max Blur**: 4 units
- **Effect**: Increases as image approaches center
- **Location**: `blurCenterRange = 0.15`

## Customization

To adjust the fade effect, edit these values in `src/components/ui/3d-gallery-photography.tsx`:

```typescript
// Make fade zone larger (more gradual)
const textCenterFadeRange = 0.20; // 20% instead of 15%

// Make fade zone smaller (more abrupt)
const textCenterFadeRange = 0.10; // 10% instead of 15%

// Adjust blur intensity
const centerBlurAmount = (1 - blurDistanceFromCenter / blurCenterRange) * 6; // 6 instead of 4
```

## Benefits

1. **Professional Look**: Text remains readable without images overlapping
2. **Depth Perception**: Reinforces 3D effect with proper occlusion
3. **Smooth Transition**: Gradual fade prevents jarring appearance/disappearance
4. **Performance**: Efficient calculation in existing animation loop

## Visual Diagram

```
Image Journey Through Gallery:

Far Back (0.0)
    ↓
  [Blurry]
    ↓
  [Clear] ← Fully visible
    ↓
[Fading...] ← Approaching center
    ↓
[Blurring...]
    ↓
  [Gone] ← Behind text (0.5)
    ↓
[Appearing...]
    ↓
  [Clear] ← Fully visible again
    ↓
  [Blurry]
    ↓
Far Front (1.0)
```

## Code Location

**File**: `src/components/ui/3d-gallery-photography.tsx`

**Lines**: ~545-565 (opacity fade) and ~580-590 (blur effect)

**Function**: `GalleryScene` component's `useFrame` animation loop

## Testing

To test the effect:
1. Run the development server: `npm run dev`
2. Watch images as they scroll through the gallery
3. Notice how they fade out before reaching the center text
4. Observe the smooth blur effect accompanying the fade

## Performance Impact

- **Minimal**: Calculations done once per frame per image
- **Efficient**: Simple distance calculations
- **Optimized**: Uses existing animation loop
- **No Extra Renders**: Applied to existing material uniforms

## Browser Compatibility

Works on all browsers that support WebGL:
- ✅ Chrome/Edge
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers with WebGL support
