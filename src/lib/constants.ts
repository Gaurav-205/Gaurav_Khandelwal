// Animation constants
export const ANIMATION_DELAYS = {
  LOADING_COMPLETE: 500,
  NAVIGATION_APPEAR: 1500,
  AUTO_PLAY_RESUME: 3000,
} as const;

export const ANIMATION_DURATIONS = {
  LOADING_COUNT: 3,
  LOADING_FADE: 0.5,
  NAVIGATION_SLIDE: 1,
  CURSOR_SCALE: 150,
} as const;

// 3D Gallery constants
export const GALLERY_CONFIG = {
  SPEED: 1.2,
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

// Project images for the gallery - using placeholder images until your project images are added
export const SAMPLE_IMAGES: Array<{ src: string; alt: string }> = [
  { src: 'https://images.unsplash.com/photo-1741332966416-414d8a5b8887?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8', alt: 'UI/UX Design Project - Mobile App Interface' },
  { src: 'https://images.unsplash.com/photo-1754769440490-2eb64d715775?q=80&w=1113&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Web Design Project - E-commerce Platform' },
  { src: 'https://images.unsplash.com/photo-1758640920659-0bb864175983?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzNHx8fGVufDB8fHx8fA%3D%3D', alt: 'Brand Identity Design - Logo and Visual System' },
  { src: 'https://plus.unsplash.com/premium_photo-1758367454070-731d3cc11774?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0MXx8fGVufDB8fHx8fA%3D%3D', alt: 'Dashboard Design - Analytics Interface' },
  { src: 'https://images.unsplash.com/photo-1746023841657-e5cd7cc90d2c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0Nnx8fGVufDB8fHx8fA%3D%3D', alt: 'Mobile App Design - Social Media Platform' },
  { src: 'https://images.unsplash.com/photo-1741715661559-6149723ea89a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1MHx8fGVufDB8fHx8fA%3D%3D', alt: 'Website Redesign - Corporate Landing Page' },
  { src: 'https://images.unsplash.com/photo-1725878746053-407492aa4034?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1OHx8fGVufDB8fHx8fA%3D%3D', alt: 'User Experience Design - Booking System' },
  { src: 'https://images.unsplash.com/photo-1752588975168-d2d7965a6d64?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2M3x8fGVufDB8fHx8fA%3D%3D', alt: 'Design System - Component Library' },
];

// When you're ready to add your project images, replace the URLs above with:
// { src: '/projects/project1.jpg', alt: 'Your project description' },
// { src: '/projects/project2.jpg', alt: 'Your project description' },
// etc.

// Z-index layers
export const Z_INDEX = {
  CURSOR: 100,
  NAVIGATION: 60,
  LOADING: 50,
  GALLERY_OVERLAY: 10,
} as const;

// Cursor spring configuration
export const CURSOR_SPRING_CONFIG = {
  damping: 45,
  stiffness: 400,
  mass: 1,
  restDelta: 0.001,
};