// 3D Gallery constants - Faster animations
export const GALLERY_CONFIG = {
  SPEED: 1.8,
  Z_SPACING: 3,
  VISIBLE_COUNT: 12,
  FALLOFF: { near: 0.8, far: 14 },
  FADE_SETTINGS: {
    fadeIn: { start: 0.05, end: 0.25 },
    fadeOut: { start: 0.75, end: 0.95 },
  },
  BLUR_SETTINGS: {
    blurIn: { start: 0.0, end: 0.1 },
    blurOut: { start: 0.9, end: 1.0 },
    maxBlur: 8.0,
  },
} as const;

// Cursor spring configuration - Faster and more responsive
export const CURSOR_SPRING_CONFIG = {
  damping: 35,
  stiffness: 500,
  mass: 0.8,
  restDelta: 0.001,
};
