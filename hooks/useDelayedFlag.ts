// hooks/useDelayedFlag.ts

import { useState, useEffect } from 'react';

export function useDelayedFlag(condition: boolean, delay: number = 3000): boolean {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // اگه condition false شد، فلگ رو ریست کن؛ در غیر این صورت بعد از delay روشن کن
    if (!condition) {
      const resetTimer = setTimeout(() => setShow(false), 0);
      return () => clearTimeout(resetTimer);
    }

    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [condition, delay]);

  return show;
}