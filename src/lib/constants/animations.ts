// Animation constants - Optimized for faster animations
export const ANIMATION_DELAYS = {
  LOADING_COMPLETE: 150, // Reduced from 300ms
  NAVIGATION_APPEAR: 400, // Reduced from 800ms
  AUTO_PLAY_RESUME: 2000,
} as const;

export const ANIMATION_DURATIONS = {
  LOADING_COUNT: 1.5, // Reduced from 2s
  LOADING_FADE: 0.2, // Reduced from 0.3s
  NAVIGATION_SLIDE: 0.4, // Reduced from 0.6s
  CURSOR_SCALE: 100,
} as const;
