'use client';

import { useInView, useMotionValue, useSpring } from 'framer-motion';
import { memo, useCallback, useEffect, useRef, useMemo } from 'react';
import { formatNumber, getDecimalPlaces } from '@/lib/utils';

interface CountUpProps {
  to: number;
  from?: number;
  direction?: 'up' | 'down';
  delay?: number;
  duration?: number;
  className?: string;
  startWhen?: boolean;
  separator?: string;
  onStart?: () => void;
  onEnd?: () => void;
}

const CountUp = memo(({
  to,
  from = 0,
  direction = 'up',
  delay = 0,
  duration = 2,
  className = '',
  startWhen = true,
  separator = '',
  onStart,
  onEnd
}: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  
  const springConfig = useMemo(() => ({
    damping: 25 + 15 * (1 / duration), // Reduced damping for smoother motion
    stiffness: 60 * (1 / duration),    // Reduced stiffness for more fluid animation
    mass: 0.8                          // Lower mass for quicker response
  }), [duration]);

  const motionValue = useMotionValue(direction === 'down' ? to : from);
  const springValue = useSpring(motionValue, springConfig);
  const isInView = useInView(ref, { once: true, margin: '0px' });

  const maxDecimals = useMemo(() => 
    Math.max(getDecimalPlaces(from), getDecimalPlaces(to)), 
    [from, to]
  );

  const formatValue = useCallback((latest: number) => {
    return formatNumber(latest, separator, maxDecimals);
  }, [maxDecimals, separator]);

  // Initialize display value
  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = formatValue(direction === 'down' ? to : from);
    }
  }, [from, to, direction, formatValue]);

  // Handle animation start
  useEffect(() => {
    if (!isInView || !startWhen) return;

    onStart?.();
    
    const startTimeout = setTimeout(() => {
      motionValue.set(direction === 'down' ? from : to);
    }, delay * 1000);

    const endTimeout = setTimeout(() => {
      onEnd?.();
    }, (delay + duration) * 1000);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(endTimeout);
    };
  }, [isInView, startWhen, motionValue, direction, from, to, delay, duration, onStart, onEnd]);

  // Handle value changes
  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest: number) => {
      if (ref.current) {
        ref.current.textContent = formatValue(latest);
      }
    });
    return unsubscribe;
  }, [springValue, formatValue]);

  return <span className={className} ref={ref} />;
});

CountUp.displayName = 'CountUp';

export default CountUp;