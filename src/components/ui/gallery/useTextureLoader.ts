
export interface NormalizedImage {
  src: string;
  alt: string;
  slug: string;
}

/** Gradient fallback colours used when an image fails to load. */
const FALLBACK_COLORS: [string, string][] = [
  ['#667eea', '#764ba2'],
  ['#f093fb', '#f5576c'],
  ['#4facfe', '#00f2fe'],
  ['#43e97b', '#38f9d7'],
];

function createFallbackTexture(index: number): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    const [from, to] = FALLBACK_COLORS[index % FALLBACK_COLORS.length] ?? ['#667eea', '#764ba2'];
    const gradient = ctx.createLinearGradient(0, 0, 1024, 1024);
    gradient.addColorStop(0, from);
    gradient.addColorStop(1, to);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1024, 1024);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

interface UseTextureLoaderResult {
  textures: THREE.Texture[];
  isLoaded: boolean;
  hasError: boolean;
}

/**
 * Loads all gallery images as Three.js textures.
 * Falls back to a gradient canvas texture on individual load failures.
 * Calls `onLoaded` once all textures are ready.
 */
export function useTextureLoader(
  images: NormalizedImage[],
  onLoaded?: () => void,
): UseTextureLoaderResult {
  const [textures, setTextures] = useState<THREE.Texture[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loader = new THREE.TextureLoader();

    const promises = images.map((img, index) =>
      new Promise<THREE.Texture>((resolve) => {
        loader.load(
          img.src,
          (texture) => {
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.needsUpdate = true;
            resolve(texture);
          },
          undefined,
          () => resolve(createFallbackTexture(index)),
        );
      }),
    );

    Promise.all(promises)
      .then((loaded) => {
        if (!isMounted) return;
        setTextures(loaded);
        setIsLoaded(true);
        onLoaded?.();
      })
      .catch(() => {
        if (isMounted) setHasError(true);
      });

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.map((i) => i.src).join(',')]);

  return { textures, isLoaded, hasError };
}
