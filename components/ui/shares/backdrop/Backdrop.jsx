"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import FOG from "vanta/dist/vanta.fog.min";

export default function Backdrop() {
  const vantaRef = useRef(null);

  useEffect(() => {
    // راه اندازی Vanta در سمت کلاینت
    const vantaEffect = FOG({
      el: vantaRef.current,
      THREE: THREE, // انتقال نسخه Three.js به وانتا
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      highlightColor: 0xffffff,
      midtoneColor: 0xffffff,
      lowlightColor: 0xE4F2,
      baseColor: 0xf2edf7,
      blurFactor: 0.6,
      zoom: 1.0,
      speed: 3,
    });

    // پاکسازی (Cleanup) هنگام Unmount شدن کامپوننت برای جلوگیری از افت فریم و Memory Leak
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
      }}
    />
  );
}