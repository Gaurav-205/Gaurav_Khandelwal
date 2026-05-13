'use client';

import { memo, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { createClothMaterial } from './shaderMaterials';
import { useTextureLoader, type NormalizedImage } from './useTextureLoader';
import { useGalleryControls } from './useGalleryControls';
import ImagePlane from './ImagePlane';

interface FadeSettings {
  fadeIn: { start: number; end: number };
  fadeOut: { start: number; end: number };
}

interface BlurSettings {
  blurIn: { start: number; end: number };
  blurOut: { start: number; end: number };
  maxBlur: number;
}

interface PlaneData {
  index: number;
  z: number;
  imageIndex: number;
  x: number;
  y: number;
}

export interface GallerySceneProps {
  images: NormalizedImage[];
  speed?: number;
  zSpacing?: number;
  visibleCount?: number;
  falloff?: { near: number; far: number };
  fadeSettings?: FadeSettings;
  blurSettings?: BlurSettings;
  onImageClick?: (slug: string) => void;
  onImagesLoaded?: () => void;
  canvasRef?: React.RefObject<HTMLCanvasElement | null>;
}

const DEPTH_RANGE = 50;
const MAX_H = 8;
const MAX_V = 8;

/**
 * Three.js scene graph for the infinite gallery tunnel.
 * Must be rendered inside a <Canvas> element (GalleryCanvas handles that).
 */
const GalleryScene = memo(
  ({
    images,
    speed = 1,
    visibleCount = 8,
    fadeSettings = {
      fadeIn: { start: 0.05, end: 0.15 },
      fadeOut: { start: 0.85, end: 0.95 },
    },
    blurSettings = {
      blurIn: { start: 0.0, end: 0.1 },
      blurOut: { start: 0.9, end: 1.0 },
      maxBlur: 3.0,
    },
    onImageClick,
    onImagesLoaded,
    canvasRef,
  }: GallerySceneProps) => {
    const { textures, isLoaded } = useTextureLoader(images, onImagesLoaded);
    const { scrollVelocity, setScrollVelocity, autoPlay } = useGalleryControls({ speed }, canvasRef);

    const totalImages = images.length;

    const spatialPositions = useMemo(() => {
      return Array.from({ length: visibleCount }, (_, i) => {
        const hAngle = (i * 2.618) % (Math.PI * 2);
        const vAngle = (i * 1.618 + Math.PI / 3) % (Math.PI * 2);
        const hRadius = (i % 3) * 1.2;
        const vRadius = ((i + 1) % 4) * 0.8;
        return {
          x: (Math.sin(hAngle) * hRadius * MAX_H) / 3,
          y: (Math.cos(vAngle) * vRadius * MAX_V) / 4,
        };
      });
    }, [visibleCount]);

    const materials = useMemo(
      () => Array.from({ length: visibleCount }, () => createClothMaterial()),
      [visibleCount],
    );

    useEffect(() => {
      return () => materials.forEach((material) => material.dispose());
    }, [materials]);

    const initialPlanes = useMemo<PlaneData[]>(
      () =>
        Array.from({ length: visibleCount }, (_, i) => ({
          index: i,
          z: ((DEPTH_RANGE / Math.max(visibleCount, 1)) * i) % DEPTH_RANGE,
          imageIndex: totalImages > 0 ? i % totalImages : 0,
          x: spatialPositions[i]?.x ?? 0,
          y: spatialPositions[i]?.y ?? 0,
        })),
      [visibleCount, totalImages, spatialPositions],
    );

    const [planesData, setPlanesData] = useState<PlaneData[]>(initialPlanes);

    useEffect(() => {
      setPlanesData(initialPlanes);
    }, [initialPlanes]);

    useFrame((state, delta) => {
      if (autoPlay) {
        setScrollVelocity((prev) => prev + 0.3 * delta);
      }
      setScrollVelocity((prev) => prev * 0.95);

      const time = state.clock.getElapsedTime();
      const imageAdvance = totalImages > 0 ? visibleCount % totalImages || totalImages : 0;

      materials.forEach((material) => {
        if (material?.uniforms) {
          material.uniforms.time.value = time;
          material.uniforms.scrollForce.value = scrollVelocity;
        }
      });

      setPlanesData((current) =>
        current.map((plane, i) => {
          let newZ = plane.z + scrollVelocity * delta * 10;
          let wrapsForward = 0;
          let wrapsBackward = 0;

          if (newZ >= DEPTH_RANGE) {
            wrapsForward = Math.floor(newZ / DEPTH_RANGE);
            newZ -= DEPTH_RANGE * wrapsForward;
          } else if (newZ < 0) {
            wrapsBackward = Math.ceil(-newZ / DEPTH_RANGE);
            newZ += DEPTH_RANGE * wrapsBackward;
          }

          let imageIndex = plane.imageIndex;
          if (wrapsForward > 0 && imageAdvance > 0 && totalImages > 0) {
            imageIndex = (imageIndex + wrapsForward * imageAdvance) % totalImages;
          }
          if (wrapsBackward > 0 && imageAdvance > 0 && totalImages > 0) {
            const step = imageIndex - wrapsBackward * imageAdvance;
            imageIndex = ((step % totalImages) + totalImages) % totalImages;
          }

          const nextPlane: PlaneData = {
            ...plane,
            z: ((newZ % DEPTH_RANGE) + DEPTH_RANGE) % DEPTH_RANGE,
            imageIndex,
            x: spatialPositions[i]?.x ?? 0,
            y: spatialPositions[i]?.y ?? 0,
          };

          const norm = nextPlane.z / DEPTH_RANGE;

          let opacity = 1;
          if (norm < fadeSettings.fadeIn.start) {
            opacity = 0;
          } else if (norm <= fadeSettings.fadeIn.end) {
            opacity = (norm - fadeSettings.fadeIn.start) / (fadeSettings.fadeIn.end - fadeSettings.fadeIn.start);
          } else if (norm >= fadeSettings.fadeOut.end) {
            opacity = 0;
          } else if (norm >= fadeSettings.fadeOut.start) {
            opacity = 1 - (norm - fadeSettings.fadeOut.start) / (fadeSettings.fadeOut.end - fadeSettings.fadeOut.start);
          }

          const distFromCenter = Math.abs(norm - 0.5);
          if (distFromCenter < 0.15) opacity *= distFromCenter / 0.15;
          opacity = Math.max(0, Math.min(1, opacity));

          let blur = 0;
          if (norm < blurSettings.blurIn.start) {
            blur = blurSettings.maxBlur;
          } else if (norm <= blurSettings.blurIn.end) {
            blur = blurSettings.maxBlur * (1 - (norm - blurSettings.blurIn.start) / (blurSettings.blurIn.end - blurSettings.blurIn.start));
          } else if (norm >= blurSettings.blurOut.end) {
            blur = blurSettings.maxBlur;
          } else if (norm >= blurSettings.blurOut.start) {
            blur = blurSettings.maxBlur * ((norm - blurSettings.blurOut.start) / (blurSettings.blurOut.end - blurSettings.blurOut.start));
          }

          if (distFromCenter < 0.15) {
            blur = Math.max(blur, (1 - distFromCenter / 0.15) * 4);
          }
          blur = Math.max(0, Math.min(blurSettings.maxBlur, blur));

          const material = materials[i];
          if (material?.uniforms) {
            material.uniforms.opacity.value = opacity;
            material.uniforms.blurAmount.value = blur;
          }

          return nextPlane;
        }),
      );
    });

    if (!isLoaded || textures.length === 0) return null;

    return (
      <>
        {planesData.map((plane, i) => {
          const texture = textures[plane.imageIndex];
          const material = materials[i];
          if (!texture || !material) return null;

          const img = texture.image as HTMLImageElement | null;
          const aspect = img?.width && img?.height ? img.width / img.height : 1;
          const scale: [number, number, number] = aspect > 1 ? [2 * aspect, 2, 1] : [2, 2 / aspect, 1];
          const worldZ = plane.z - DEPTH_RANGE / 2;

          const currentImage = images[plane.imageIndex];
          const handleClick = () => {
            if (currentImage?.slug) onImageClick?.(currentImage.slug);
          };

          return (
            <ImagePlane
              key={plane.index}
              texture={texture}
              position={[plane.x, plane.y, worldZ]}
              scale={scale}
              material={material}
              onClick={handleClick}
            />
          );
        })}
      </>
    );
  },
);

GalleryScene.displayName = 'GalleryScene';

export default GalleryScene;
