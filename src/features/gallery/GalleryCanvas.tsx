'use client';

import { memo, useState, useEffect, useMemo, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { checkWebGLSupport } from '@/lib/utils';
import { useGalleryCamera } from './useGalleryCamera';
import GalleryScene, { type GallerySceneProps } from './GalleryScene';
import GalleryFallback from './GalleryFallback';
import type { NormalizedImage } from './useTextureLoader';

interface GalleryCanvasProps extends GallerySceneProps {
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Outermost gallery component.
 *
 * Responsibilities:
 *   - Detect WebGL support after mount (server always renders the Canvas path;
 *     the fallback swaps in on the client if WebGL is unavailable).
 *   - Own the R3F <Canvas> and pass a canvasRef down for input listeners.
 *   - Delegate all scene logic to GalleryScene.
 *   - Render GalleryFallback when WebGL is unavailable, preserving full
 *     click and loaded-callback behaviour.
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
    const camera = useGalleryCamera();

    useEffect(() => {
      setWebglSupported(checkWebGLSupport());
    }, []);

    // Normalise image items once at this boundary.
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
          <GalleryFallback
            images={normalizedImages}
            onImageClick={onImageClick}
            onImagesLoaded={onImagesLoaded}
            reason="no-webgl"
          />
        </div>
      );
    }

    return (
      <div className={className} style={style}>
        <Canvas
          ref={canvasRef}
          camera={camera}
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
