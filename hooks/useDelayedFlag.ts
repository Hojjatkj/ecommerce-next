// hooks/useDelayedFlag.ts

import { useState, useEffect } from 'react';

export function useDelayedFlag(condition: boolean, delay: number = 3000): boolean {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!condition) {
      setShow(false);
      return;
    }

    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [condition, delay]);

  return show;
}