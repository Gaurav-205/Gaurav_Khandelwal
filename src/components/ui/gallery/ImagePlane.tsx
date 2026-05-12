'use client';

import { memo, useRef, useEffect, useCallback, useState } from 'react';
import * as THREE from 'three';
import { sharedPlaneGeometry } from './shaderMaterials';

interface ImagePlaneProps {
  texture: THREE.Texture;
  position: [number, number, number];
  scale: [number, number, number];
  material: THREE.ShaderMaterial;
  onClick?: () => void;
}

/**
 * A single image quad in the 3-D gallery tunnel.
 * Receives a pre-built ShaderMaterial so the parent scene can batch-update
 * uniforms without going through React state.
 */
const ImagePlane = memo(({ texture, position, scale, material, onClick }: ImagePlaneProps) => {
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
  const handleClick = useCallback(
    (e: { stopPropagation: () => void }) => {
      e.stopPropagation();
      onClick?.();
    },
    [onClick],
  );

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={scale}
      material={material}
      geometry={sharedPlaneGeometry}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
    />
  );
});

ImagePlane.displayName = 'ImagePlane';

export default ImagePlane;
