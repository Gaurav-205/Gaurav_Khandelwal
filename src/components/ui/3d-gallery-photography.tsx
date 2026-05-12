/**
 * Re-export shim — the gallery has been split into focused modules under
 * ./gallery/. Import directly from there for new code.
 *
 * Kept here so existing imports of '3d-gallery-photography' continue to work
 * without changes.
 */
export { default } from './gallery/GalleryCanvas';
export { default as GalleryCanvas } from './gallery/GalleryCanvas';
export { default as GalleryScene } from './gallery/GalleryScene';
export { default as ImagePlane } from './gallery/ImagePlane';
export { useGalleryInput } from './gallery/useGalleryInput';
export { useTextureLoader } from './gallery/useTextureLoader';
export { createClothMaterial, sharedPlaneGeometry } from './gallery/shaderMaterials';
