// hooks/useDelayedFlag.ts

import { useState, useEffect, useRef } from 'react';

export function useDelayedFlag(condition: boolean, delay: number = 3000): boolean {
  const [show, setShow] = useState(false);
  const prevCondition = useRef(condition);

  // اگه condition از true به false برگشت، فوراً (حین رندر) ریست کن
  if (prevCondition.current !== condition) {
    prevCondition.current = condition;
    if (!condition && show) {
      setShow(false);
    }
  }
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