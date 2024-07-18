'use client';

// Cleanup the previous timeout on re-render
import { useEffect, useRef } from 'react';

export default function useDebounce<
  Fn extends (...args: Parameters<Fn>) => ReturnType<Fn>,
>(callback: Fn, delay = 300) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const debouncedCallback = (...args: Parameters<Fn>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  return debouncedCallback;
}
