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

// Gallery — prefer importing from the sub-modules directly
export { default as GalleryCanvas } from './ui/gallery/GalleryCanvas';
export { default as GalleryScene } from './ui/gallery/GalleryScene';
export { default as ImagePlane } from './ui/gallery/ImagePlane';
export { useGalleryInput } from './ui/gallery/useGalleryInput';
export { useTextureLoader } from './ui/gallery/useTextureLoader';
export { createClothMaterial, sharedPlaneGeometry } from './ui/gallery/shaderMaterials';
