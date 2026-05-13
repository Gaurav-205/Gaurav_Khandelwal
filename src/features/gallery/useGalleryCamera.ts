'use client';

/**
 * useGalleryCamera — camera configuration for the 3-D gallery tunnel.
 *
 * Returns the static camera props passed to R3F's <Canvas camera={...}>.
 * Extracted here so GalleryCanvas stays focused on WebGL detection and
 * canvas lifecycle, and so camera parameters can be tuned or made reactive
 * (e.g. FOV on resize) without touching the canvas component.
 */
export interface GalleryCameraConfig {
  position: [number, number, number];
  fov: number;
}

export function useGalleryCamera(): GalleryCameraConfig {
  return {
    position: [0, 0, 0],
    fov: 55,
  };
}
