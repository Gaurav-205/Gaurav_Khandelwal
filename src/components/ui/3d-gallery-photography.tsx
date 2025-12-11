'use client';

import type React from 'react';
import { useRef, useMemo, useCallback, useState, useEffect, memo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { checkWebGLSupport } from '@/lib/utils';
import { ANIMATION_DELAYS } from '@/lib/constants';

type ImageItem = string | { src: string; alt?: string; slug?: string };

interface FadeSettings {
  fadeIn: {
    start: number;
    end: number;
  };
  fadeOut: {
    start: number;
    end: number;
  };
}

interface BlurSettings {
  blurIn: {
    start: number;
    end: number;
  };
  blurOut: {
    start: number;
    end: number;
  };
  maxBlur: number;
}

interface InfiniteGalleryProps {
  images: ImageItem[];
  speed?: number;
  zSpacing?: number;
  visibleCount?: number;
  falloff?: { near: number; far: number };
  fadeSettings?: FadeSettings;
  blurSettings?: BlurSettings;
  className?: string;
  style?: React.CSSProperties;
  onImageClick?: (slug: string) => void;
}

interface PlaneData {
  index: number;
  z: number;
  imageIndex: number;
  x: number;
  y: number;
}

const DEFAULT_DEPTH_RANGE = 50;
const MAX_HORIZONTAL_OFFSET = 8;
const MAX_VERTICAL_OFFSET = 8;

// Optimized shader material creation
const createClothMaterial = () => {
  return new THREE.ShaderMaterial({
    transparent: true,
    uniforms: {
      map: { value: null },
      opacity: { value: 1.0 },
      blurAmount: { value: 0.0 },
      scrollForce: { value: 0.0 },
      time: { value: 0.0 },
      isHovered: { value: 0.0 },
    },
    vertexShader: `
      uniform float scrollForce;
      uniform float time;
      uniform float isHovered;
      varying vec2 vUv;
      varying vec3 vNormal;

      void main() {
        vUv = uv;
        vNormal = normal;
        vec3 pos = position;

        float curveIntensity = scrollForce * 0.3;
        float distanceFromCenter = length(pos.xy);
        float curve = distanceFromCenter * distanceFromCenter * curveIntensity;
        
        float ripple1 = sin(pos.x * 2.0 + scrollForce * 3.0) * 0.02;
        float ripple2 = sin(pos.y * 2.5 + scrollForce * 2.0) * 0.015;
        float clothEffect = (ripple1 + ripple2) * abs(curveIntensity) * 2.0;
        
        float flagWave = 0.0;
        if (isHovered > 0.5) {
          float wavePhase = pos.x * 3.0 + time * 8.0;
          float waveAmplitude = sin(wavePhase) * 0.1;
          float dampening = smoothstep(-0.5, 0.5, pos.x);
          flagWave = waveAmplitude * dampening;
          
          float secondaryWave = sin(pos.x * 5.0 + time * 12.0) * 0.03 * dampening;
          flagWave += secondaryWave;
        }
        
        pos.z -= (curve + clothEffect + flagWave);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D map;
      uniform float opacity;
      uniform float blurAmount;
      uniform float scrollForce;
      varying vec2 vUv;
      varying vec3 vNormal;

      void main() {
        vec4 color = texture2D(map, vUv);
        
        if (blurAmount > 0.0) {
          vec2 texelSize = 1.0 / vec2(textureSize(map, 0));
          vec4 blurred = vec4(0.0);
          float total = 0.0;
          
          for (float x = -2.0; x <= 2.0; x += 1.0) {
            for (float y = -2.0; y <= 2.0; y += 1.0) {
              vec2 offset = vec2(x, y) * texelSize * blurAmount;
              float weight = 1.0 / (1.0 + length(vec2(x, y)));
              blurred += texture2D(map, vUv + offset) * weight;
              total += weight;
            }
          }
          color = blurred / total;
        }
        
        float curveHighlight = abs(scrollForce) * 0.05;
        color.rgb += vec3(curveHighlight * 0.1);
        
        gl_FragColor = vec4(color.rgb, color.a * opacity);
      }
    `,
  });
};

// Memoized geometry for performance
const planeGeometry = new THREE.PlaneGeometry(1, 1, 32, 32);

const ImagePlane = memo(({
  texture,
  position,
  scale,
  material,
  onClick,
}: {
  texture: THREE.Texture;
  position: [number, number, number];
  scale: [number, number, number];
  material: THREE.ShaderMaterial;
  onClick?: () => void;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (material?.uniforms && texture) {
      material.uniforms.map.value = texture;
    }
  }, [material, texture]);

  useEffect(() => {
    if (material?.uniforms) {
      material.uniforms.isHovered.value = isHovered ? 1.0 : 0.0;
    }
  }, [material, isHovered]);

  const handlePointerEnter = useCallback(() => setIsHovered(true), []);
  const handlePointerLeave = useCallback(() => setIsHovered(false), []);
  const handleClick = useCallback((event: any) => {
    event.stopPropagation();
    onClick?.();
  }, [onClick]);

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={scale}
      material={material}
      geometry={planeGeometry}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
    />
  );
});

ImagePlane.displayName = 'ImagePlane';

const GalleryScene = memo(({
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
}: Omit<InfiniteGalleryProps, 'className' | 'style'>) => {
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const lastInteraction = useRef(Date.now());
  
  // Touch/pinch gesture state
  const touchState = useRef({
    initialDistance: 0,
    lastDistance: 0,
    touches: [] as Touch[],
    isMultiTouch: false,
  });

  const normalizedImages = useMemo(
    () =>
      images.map((img) =>
        typeof img === 'string' ? { src: img, alt: '', slug: '' } : img
      ),
    [images]
  );

  const textures = useTexture(normalizedImages.map((img) => img.src));

  // Create materials pool
  const materials = useMemo(
    () => Array.from({ length: visibleCount }, () => createClothMaterial()),
    [visibleCount]
  );

  const spatialPositions = useMemo(() => {
    const positions: { x: number; y: number }[] = [];

    for (let i = 0; i < visibleCount; i++) {
      const horizontalAngle = (i * 2.618) % (Math.PI * 2);
      const verticalAngle = (i * 1.618 + Math.PI / 3) % (Math.PI * 2);

      const horizontalRadius = (i % 3) * 1.2;
      const verticalRadius = ((i + 1) % 4) * 0.8;

      const x = (Math.sin(horizontalAngle) * horizontalRadius * MAX_HORIZONTAL_OFFSET) / 3;
      const y = (Math.cos(verticalAngle) * verticalRadius * MAX_VERTICAL_OFFSET) / 4;

      positions.push({ x, y });
    }
    return positions;
  }, [visibleCount]);

  const totalImages = normalizedImages.length;
  const depthRange = DEFAULT_DEPTH_RANGE;

  // Initialize plane data
  const planesData = useRef<PlaneData[]>(
    Array.from({ length: visibleCount }, (_, i) => ({
      index: i,
      z: visibleCount > 0 ? ((depthRange / visibleCount) * i) % depthRange : 0,
      imageIndex: totalImages > 0 ? i % totalImages : 0,
      x: spatialPositions[i]?.x ?? 0,
      y: spatialPositions[i]?.y ?? 0,
    }))
  );

  useEffect(() => {
    planesData.current = Array.from({ length: visibleCount }, (_, i) => ({
      index: i,
      z: visibleCount > 0 ? ((depthRange / Math.max(visibleCount, 1)) * i) % depthRange : 0,
      imageIndex: totalImages > 0 ? i % totalImages : 0,
      x: spatialPositions[i]?.x ?? 0,
      y: spatialPositions[i]?.y ?? 0,
    }));
  }, [depthRange, spatialPositions, totalImages, visibleCount]);

  // Handle scroll input
  const handleWheel = useCallback(
    (event: WheelEvent) => {
      event.preventDefault();
      setScrollVelocity((prev) => prev + event.deltaY * 0.01 * speed);
      setAutoPlay(false);
      lastInteraction.current = Date.now();
    },
    [speed]
  );

  // Handle keyboard input
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        event.preventDefault();
        setScrollVelocity((prev) => prev - 2 * speed);
        setAutoPlay(false);
        lastInteraction.current = Date.now();
      } else if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        event.preventDefault();
        setScrollVelocity((prev) => prev + 2 * speed);
        setAutoPlay(false);
        lastInteraction.current = Date.now();
      } else if (event.key === 'Enter' || event.key === ' ') {
        // Find the most centered/visible image and trigger click
        const centerPlane = planesData.current.find(plane => {
          const normalizedPosition = plane.z / depthRange;
          return normalizedPosition >= 0.4 && normalizedPosition <= 0.6;
        });
        if (centerPlane && onImageClick) {
          const currentImage = normalizedImages[centerPlane.imageIndex];
          if (currentImage?.slug) {
            event.preventDefault();
            onImageClick(currentImage.slug);
          }
        }
      }
    },
    [speed, onImageClick, normalizedImages, depthRange]
  );

  // Calculate distance between two touches
  const getTouchDistance = useCallback((touch1: Touch, touch2: Touch) => {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }, []);

  // Handle touch start
  const handleTouchStart = useCallback((event: TouchEvent) => {
    const touches = Array.from(event.touches);
    touchState.current.touches = touches;
    
    if (touches.length === 2) {
      touchState.current.isMultiTouch = true;
      touchState.current.initialDistance = getTouchDistance(touches[0], touches[1]);
      touchState.current.lastDistance = touchState.current.initialDistance;
      setAutoPlay(false);
      lastInteraction.current = Date.now();
    } else if (touches.length === 1) {
      touchState.current.isMultiTouch = false;
    }
  }, [getTouchDistance]);

  // Handle touch move
  const handleTouchMove = useCallback((event: TouchEvent) => {
    event.preventDefault();
    const touches = Array.from(event.touches);
    
    if (touches.length === 2 && touchState.current.isMultiTouch) {
      const currentDistance = getTouchDistance(touches[0], touches[1]);
      const distanceDelta = currentDistance - touchState.current.lastDistance;
      
      // Convert pinch gesture to scroll velocity
      // Pinch out (zoom in) = move forward, Pinch in (zoom out) = move backward
      const velocityChange = distanceDelta * 0.02 * speed;
      setScrollVelocity((prev) => prev + velocityChange);
      
      touchState.current.lastDistance = currentDistance;
      lastInteraction.current = Date.now();
    } else if (touches.length === 1 && !touchState.current.isMultiTouch) {
      // Single touch swipe for mobile
      const touch = touches[0];
      const lastTouch = touchState.current.touches[0];
      
      if (lastTouch) {
        const deltaY = touch.clientY - lastTouch.clientY;
        const velocityChange = deltaY * 0.01 * speed;
        setScrollVelocity((prev) => prev + velocityChange);
        lastInteraction.current = Date.now();
      }
      
      touchState.current.touches = touches;
    }
  }, [getTouchDistance, speed]);

  // Handle touch end
  const handleTouchEnd = useCallback((event: TouchEvent) => {
    const touches = Array.from(event.touches);
    
    if (touches.length < 2) {
      touchState.current.isMultiTouch = false;
      touchState.current.initialDistance = 0;
      touchState.current.lastDistance = 0;
    }
    
    touchState.current.touches = touches;
  }, []);

  useEffect(() => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.addEventListener('wheel', handleWheel, { passive: false });
      canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
      canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
      canvas.addEventListener('touchend', handleTouchEnd, { passive: false });
      document.addEventListener('keydown', handleKeyDown);

      return () => {
        canvas.removeEventListener('wheel', handleWheel);
        canvas.removeEventListener('touchstart', handleTouchStart);
        canvas.removeEventListener('touchmove', handleTouchMove);
        canvas.removeEventListener('touchend', handleTouchEnd);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [handleWheel, handleKeyDown, handleTouchStart, handleTouchMove, handleTouchEnd]);

  // Auto-play logic
  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - lastInteraction.current > ANIMATION_DELAYS.AUTO_PLAY_RESUME) {
        setAutoPlay(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useFrame((state, delta) => {
    // Apply auto-play
    if (autoPlay) {
      setScrollVelocity((prev) => prev + 0.3 * delta);
    }

    // Damping
    setScrollVelocity((prev) => prev * 0.95);

    // Update time uniform for all materials
    const time = state.clock.getElapsedTime();
    materials.forEach((material) => {
      if (material?.uniforms) {
        material.uniforms.time.value = time;
        material.uniforms.scrollForce.value = scrollVelocity;
      }
    });

    // Update plane positions
    const imageAdvance = totalImages > 0 ? visibleCount % totalImages || totalImages : 0;
    const totalRange = depthRange;

    planesData.current.forEach((plane, i) => {
      let newZ = plane.z + scrollVelocity * delta * 10;
      let wrapsForward = 0;
      let wrapsBackward = 0;

      if (newZ >= totalRange) {
        wrapsForward = Math.floor(newZ / totalRange);
        newZ -= totalRange * wrapsForward;
      } else if (newZ < 0) {
        wrapsBackward = Math.ceil(-newZ / totalRange);
        newZ += totalRange * wrapsBackward;
      }

      if (wrapsForward > 0 && imageAdvance > 0 && totalImages > 0) {
        plane.imageIndex = (plane.imageIndex + wrapsForward * imageAdvance) % totalImages;
      }

      if (wrapsBackward > 0 && imageAdvance > 0 && totalImages > 0) {
        const step = plane.imageIndex - wrapsBackward * imageAdvance;
        plane.imageIndex = ((step % totalImages) + totalImages) % totalImages;
      }

      plane.z = ((newZ % totalRange) + totalRange) % totalRange;
      plane.x = spatialPositions[i]?.x ?? 0;
      plane.y = spatialPositions[i]?.y ?? 0;

      // Calculate opacity based on fade settings
      const normalizedPosition = plane.z / totalRange;
      let opacity = 1;

      if (normalizedPosition >= fadeSettings.fadeIn.start && normalizedPosition <= fadeSettings.fadeIn.end) {
        const fadeInProgress = (normalizedPosition - fadeSettings.fadeIn.start) / (fadeSettings.fadeIn.end - fadeSettings.fadeIn.start);
        opacity = fadeInProgress;
      } else if (normalizedPosition < fadeSettings.fadeIn.start) {
        opacity = 0;
      } else if (normalizedPosition >= fadeSettings.fadeOut.start && normalizedPosition <= fadeSettings.fadeOut.end) {
        const fadeOutProgress = (normalizedPosition - fadeSettings.fadeOut.start) / (fadeSettings.fadeOut.end - fadeSettings.fadeOut.start);
        opacity = 1 - fadeOutProgress;
      } else if (normalizedPosition > fadeSettings.fadeOut.end) {
        opacity = 0;
      }

      opacity = Math.max(0, Math.min(1, opacity));

      // Calculate blur based on blur settings
      let blur = 0;

      if (normalizedPosition >= blurSettings.blurIn.start && normalizedPosition <= blurSettings.blurIn.end) {
        const blurInProgress = (normalizedPosition - blurSettings.blurIn.start) / (blurSettings.blurIn.end - blurSettings.blurIn.start);
        blur = blurSettings.maxBlur * (1 - blurInProgress);
      } else if (normalizedPosition < blurSettings.blurIn.start) {
        blur = blurSettings.maxBlur;
      } else if (normalizedPosition >= blurSettings.blurOut.start && normalizedPosition <= blurSettings.blurOut.end) {
        const blurOutProgress = (normalizedPosition - blurSettings.blurOut.start) / (blurSettings.blurOut.end - blurSettings.blurOut.start);
        blur = blurSettings.maxBlur * blurOutProgress;
      } else if (normalizedPosition > blurSettings.blurOut.end) {
        blur = blurSettings.maxBlur;
      }

      blur = Math.max(0, Math.min(blurSettings.maxBlur, blur));

      // Update material uniforms
      const material = materials[i];
      if (material?.uniforms) {
        material.uniforms.opacity.value = opacity;
        material.uniforms.blurAmount.value = blur;
      }
    });
  });

  if (normalizedImages.length === 0) return null;

  return (
    <>
      {planesData.current.map((plane, i) => {
        const texture = textures[plane.imageIndex];
        const material = materials[i];

        if (!texture || !material) return null;

        const worldZ = plane.z - depthRange / 2;

        // Calculate scale to maintain aspect ratio
        const aspect = texture.image && 
          typeof texture.image === 'object' && 
          texture.image !== null && 
          'width' in texture.image && 
          'height' in texture.image
          ? (texture.image as HTMLImageElement).width / (texture.image as HTMLImageElement).height
          : 1;
        const scale: [number, number, number] = aspect > 1 ? [2 * aspect, 2, 1] : [2, 2 / aspect, 1];

        const currentImage = normalizedImages[plane.imageIndex];
        const handleImageClick = () => {
          if (currentImage?.slug && onImageClick) {
            onImageClick(currentImage.slug);
          }
        };

        return (
          <ImagePlane
            key={plane.index}
            texture={texture}
            position={[plane.x, plane.y, worldZ]}
            scale={scale}
            material={material}
            onClick={handleImageClick}
          />
        );
      })}
    </>
  );
});

GalleryScene.displayName = 'GalleryScene';

// Fallback component for when WebGL is not available
const FallbackGallery = memo(({ images }: { images: ImageItem[] }) => {
  const normalizedImages = useMemo(
    () =>
      images.map((img) =>
        typeof img === 'string' ? { src: img, alt: '' } : img
      ),
    [images]
  );

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-900 p-4">
      <p className="text-gray-300 mb-4">WebGL not supported. Showing image list:</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
        {normalizedImages.map((img, i) => (
          <img
            key={i}
            src={img.src || '/placeholder.svg'}
            alt={img.alt}
            className="w-full h-32 object-cover rounded"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
});

FallbackGallery.displayName = 'FallbackGallery';

const InfiniteGallery = memo(({
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
  ...props
}: InfiniteGalleryProps) => {
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    setWebglSupported(checkWebGLSupport());
  }, []);

  if (!webglSupported) {
    return (
      <div className={className} style={style}>
        <FallbackGallery images={images} />
      </div>
    );
  }

  return (
    <div className={className} style={style}>
      <Canvas
        camera={{ position: [0, 0, 0], fov: 55 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true
        }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <GalleryScene
          images={images}
          fadeSettings={fadeSettings}
          blurSettings={blurSettings}
          onImageClick={onImageClick}
          {...props}
        />
      </Canvas>
    </div>
  );
});

InfiniteGallery.displayName = 'InfiniteGallery';

export default InfiniteGallery;