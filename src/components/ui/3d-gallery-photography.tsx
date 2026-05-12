/**
 * Re-export shim — the gallery has been split into focused modules under
 * ./gallery/. Import directly from there for new code.
 *
 * Kept here so existing imports of '3d-gallery-photography' continue to work
 * without changes.
 */
export { default } from '@/features/gallery/GalleryCanvas';
export { default as GalleryCanvas } from '@/features/gallery/GalleryCanvas';
export { default as GalleryScene } from '@/features/gallery/GalleryScene';
export { default as ImagePlane } from '@/features/gallery/ImagePlane';
export { useGalleryInput } from '@/features/gallery/useGalleryInput';
export { useTextureLoader } from '@/features/gallery/useTextureLoader';
export { createClothMaterial, sharedPlaneGeometry } from '@/features/gallery/shaderMaterials';
