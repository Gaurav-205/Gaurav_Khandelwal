export { default as LoadingScreen } from './LoadingScreen';
export { default as Navigation } from './Navigation';
export { default as Hero } from './Hero';
export { default as HeroOverlay } from './HeroOverlay';
export { SmoothCursor } from './ui/SmoothCursor';
export { default as FadeTransition } from './ui/FadeTransition';
export { default as ErrorBoundary } from './ErrorBoundary';
export { default as Tooltip } from './ui/Tooltip';
export { default as KeyboardHint } from './ui/KeyboardHint';
export { default as HelpButton } from './ui/HelpButton';

// Gallery — exported via feature barrel for gradual migration
export { GalleryCanvas, GalleryScene, ImagePlane, useGalleryInput, useTextureLoader, createClothMaterial, sharedPlaneGeometry } from '@/features/gallery';
