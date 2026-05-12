'use client';

import { memo, useState, useEffect, useMemo, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { checkWebGLSupport } from '@/lib/utils';
import GalleryScene, { type GallerySceneProps } from './GalleryScene';
import type { NormalizedImage } from './useTextureLoader';
import Image from 'next/image';

interface GalleryCanvasProps extends GallerySceneProps {
  className?: string;
  style?: React.CSSProperties;
}

/** Fallback grid shown when WebGL is unavailable. */
const FallbackGallery = memo(({ images }: { images: NormalizedImage[] }) => (
  <div className="flex flex-col items-center justify-center h-full bg-gray-900 p-4">
    <p className="text-gray-300 mb-4">WebGL not supported. Showing image list:</p>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
      {images.map((img, i) => (
        <Image
          key={i}
          src={img.src || '/placeholder.svg'}
          alt={img.alt || `Gallery image ${i + 1}`}
          width={200}
          height={128}
          className="w-full h-32 object-cover rounded"
          loading="lazy"
        />
      ))}
    </div>
  </div>
));

FallbackGallery.displayName = 'FallbackGallery';

/**
 * Outermost gallery component.
 * Handles WebGL detection and owns the R3F <Canvas>.
 * All scene logic lives in GalleryScene.
 */
const GalleryCanvas = memo(
  ({
    images,
    className = 'h-96 w-full',
    style,
    fadeSettings = {
      fadeIn: { start: 0.05, end: 0.25 },
      fadeOut: { start: 0.4, end: 0.43 },
    },
    blurSettings = {
      blurIn: { start: 0.0, end: 0.1 },
      blurOut: { start: 0.4, end: 0.43 },
      maxBlur: 8.0,
    },
    onImageClick,
    onImagesLoaded,
    ...sceneProps
  }: GalleryCanvasProps) => {
    const [webglSupported, setWebglSupported] = useState(true);

    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
      setWebglSupported(checkWebGLSupport());
    }, []);

    // Normalise image items once at this boundary
    const normalizedImages: NormalizedImage[] = useMemo(
      () =>
        images.map((img) =>
          typeof img === 'string' ? { src: img, alt: '', slug: '' } : img,
        ),
      [images],
    );

    if (!webglSupported) {
      return (
        <div className={className} style={style}>
          <FallbackGallery images={normalizedImages} />
        </div>
      );
    }

    return (
      <div className={className} style={style}>
        <Canvas
          ref={canvasRef}
          camera={{ position: [0, 0, 0], fov: 55 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            stencil: false,
            depth: true,
          }}
          dpr={[1, 2]}
          performance={{ min: 0.5 }}
          role="img"
          aria-label="Interactive 3D project gallery. Use arrow keys to navigate, Enter or Space to pause/resume auto-play."
          tabIndex={0}
        >
          <GalleryScene
            images={normalizedImages}
            fadeSettings={fadeSettings}
            blurSettings={blurSettings}
            onImageClick={onImageClick}
            onImagesLoaded={onImagesLoaded}
            canvasRef={canvasRef}
            {...sceneProps}
          />
        </Canvas>
      </div>
    );
  },
);

GalleryCanvas.displayName = 'GalleryCanvas';

export default GalleryCanvas;
