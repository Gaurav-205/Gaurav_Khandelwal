/**
 * Re-export shim — the gallery has been refactored into focused modules under
 * src/features/gallery/. Import directly from there for all new code.
 *
 * This file is retained so any external tooling or documentation references
 * that point to '3d-gallery-photography' continue to resolve without error.
 * It ships zero runtime code of its own.
 *
 * Module map:
 *   GalleryCanvas     — WebGL detection, R3F <Canvas>, fallback routing
 *   GalleryScene      — Infinite tunnel scene graph and per-frame loop
 *   GalleryFallback   — Plain CSS/image grid (no-WebGL + reduced-motion)
 *   ImagePlane        — Single image quad with hover and click
 *   shaderMaterials   — Cloth ShaderMaterial and shared PlaneGeometry
 *   useGalleryControls — Wheel, keyboard, touch, and auto-play input
 *   useGalleryCamera  — Camera configuration for the R3F Canvas
 *   useReducedMotion  — prefers-reduced-motion hook (no framer-motion dep)
 *   useTextureLoader  — Three.js texture loading with gradient fallbacks
 */
export { default } from '@/features/gallery/GalleryCanvas';
export { default as GalleryCanvas } from '@/features/gallery/GalleryCanvas';
export { default as GalleryScene } from '@/features/gallery/GalleryScene';
export { default as GalleryFallback } from '@/features/gallery/GalleryFallback';
export { default as ImagePlane } from '@/features/gallery/ImagePlane';
export { useGalleryControls } from '@/features/gallery/useGalleryControls';
export { useGalleryInput } from '@/features/gallery/useGalleryInput';
export { useGalleryCamera } from '@/features/gallery/useGalleryCamera';
export { useReducedMotion } from '@/features/gallery/useReducedMotion';
export { useTextureLoader } from '@/features/gallery/useTextureLoader';
export { createClothMaterial, sharedPlaneGeometry } from '@/features/gallery/shaderMaterials';
