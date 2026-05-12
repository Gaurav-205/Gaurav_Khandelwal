
interface UseGalleryInputOptions {
  speed: number;
}

interface UseGalleryInputResult {
  scrollVelocity: number;
  setScrollVelocity: React.Dispatch<React.SetStateAction<number>>;
  autoPlay: boolean;
  setAutoPlay: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Wires up wheel, keyboard, and touch/pinch input for the gallery.
 * Returns the current scroll velocity and autoPlay state so the render
 * loop can consume them without knowing about DOM events.
 */
export function useGalleryInput({ speed }: UseGalleryInputOptions, canvasRef?: React.RefObject<HTMLCanvasElement | null>): UseGalleryInputResult {
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const lastInteraction = useRef(Date.now());

  const touchState = useRef({
    initialDistance: 0,
    lastDistance: 0,
    touches: [] as Touch[],
    isMultiTouch: false,
  });

  const getTouchDistance = useCallback((t1: Touch, t2: Touch) => {
    const dx = t1.clientX - t2.clientX;
    const dy = t1.clientY - t2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }, []);

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      setScrollVelocity((prev) => prev + e.deltaY * 0.01 * speed);
      setAutoPlay(false);
      lastInteraction.current = Date.now();
    },
    [speed],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        setScrollVelocity((prev) => prev - 2 * speed);
        setAutoPlay(false);
        lastInteraction.current = Date.now();
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        setScrollVelocity((prev) => prev + 2 * speed);
        setAutoPlay(false);
        lastInteraction.current = Date.now();
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setAutoPlay((prev) => !prev);
        lastInteraction.current = Date.now();
      }
    },
    [speed],
  );

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      const touches = Array.from(e.touches);
      touchState.current.touches = touches;
      if (touches.length === 2 && touches[0] && touches[1]) {
        touchState.current.isMultiTouch = true;
        touchState.current.initialDistance = getTouchDistance(touches[0], touches[1]);
        touchState.current.lastDistance = touchState.current.initialDistance;
        setAutoPlay(false);
        lastInteraction.current = Date.now();
      } else {
        touchState.current.isMultiTouch = false;
      }
    },
    [getTouchDistance],
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      e.preventDefault();
      const touches = Array.from(e.touches);
      if (touches.length === 2 && touches[0] && touches[1] && touchState.current.isMultiTouch) {
        const dist = getTouchDistance(touches[0], touches[1]);
        const delta = dist - touchState.current.lastDistance;
        setScrollVelocity((prev) => prev + delta * 0.02 * speed);
        touchState.current.lastDistance = dist;
        lastInteraction.current = Date.now();
      } else if (touches.length === 1 && touches[0] && !touchState.current.isMultiTouch) {
        const touch = touches[0];
        const last = touchState.current.touches[0];
        if (last) {
          const deltaY = touch.clientY - last.clientY;
          setScrollVelocity((prev) => prev + deltaY * 0.01 * speed);
          lastInteraction.current = Date.now();
        }
        touchState.current.touches = touches;
      }
    },
    [getTouchDistance, speed],
  );

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    const touches = Array.from(e.touches);
    if (touches.length < 2) {
      touchState.current.isMultiTouch = false;
      touchState.current.initialDistance = 0;
      touchState.current.lastDistance = 0;
    }
    touchState.current.touches = touches;
  }, []);

  // Attach canvas-level listeners
  useEffect(() => {
    const canvas = canvasRef?.current ?? (document.querySelector('canvas') as HTMLCanvasElement | null);
    if (!canvas) return;

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
  }, [canvasRef, handleWheel, handleKeyDown, handleTouchStart, handleTouchMove, handleTouchEnd]);

  // Auto-play resume after idle
  useEffect(() => {
    const id = setInterval(() => {
      if (Date.now() - lastInteraction.current > ANIMATION_DELAYS.AUTO_PLAY_RESUME) {
        setAutoPlay(true);
      }
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return { scrollVelocity, setScrollVelocity, autoPlay, setAutoPlay };
}
