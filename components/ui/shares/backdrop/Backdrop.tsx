"use client";

import { useEffect, useRef, useState } from "react";

// ===== کلاس Particle باید بیرون از useEffect باشه =====
class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseX: number;
  baseY: number;
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.2;
    this.vy = (Math.random() - 0.5) * 0.2;
    this.size = 1 + Math.random() * 1.5;
    this.baseX = this.x;
    this.baseY = this.y;
  }

  update(mouseX: number, mouseY: number, isMouseMoving: boolean) {
    this.x += this.vx;
    this.y += this.vy;
    this.x += (this.baseX - this.x) * 0.001;
    this.y += (this.baseY - this.y) * 0.001;

    if (isMouseMoving) {
      const dx = this.x - mouseX;
      const dy = this.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 300) {
        const force = (300 - dist) / 300 * 0.3;
        this.x += (dx / dist) * force;
        this.y += (dy / dist) * force;
      }
    }

    if (this.x < 0 || this.x > this.width) this.vx *= -1;
    if (this.y < 0 || this.y > this.height) this.vy *= -1;
  }

  draw(ctx: CanvasRenderingContext2D, color: string) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  }
}

export default function Backdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDark, setIsDark] = useState(false);

  // تشخیص تم سیستم
  useEffect(() => {
    const checkTheme = () => {
      const isDarkMode = document.documentElement.classList.contains("dark");
      setIsDark(isDarkMode);
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const ctx = context as CanvasRenderingContext2D;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles: Particle[] = [];
    let animationId = 0;
    let isActive = true;
    let mouseX = width / 2;
    let mouseY = height / 2;
    let isMouseMoving = false;

    // ===== رنگ‌ها بر اساس تم =====
    const getColors = () => {
      if (isDark) {
        return {
          bgStart: "#1a0c2e",
          bgMid: "#0d0614",
          bgEnd: "#050208",
          particle: "rgba(124, 58, 237, 0.6)",
          line: "rgba(124, 58, 237, 0.3)",
          glow: "rgba(124, 58, 237, 0.08)",
        };
      } else {
        return {
          bgStart: "#f5f0fa",
          bgMid: "#fdfbfd",
          bgEnd: "#f0ebf5",
          particle: "rgba(73, 5, 150, 0.3)",
          line: "rgba(73, 5, 150, 0.15)",
          glow: "rgba(73, 5, 150, 0.05)",
        };
      }
    };

    const getParticleCount = (w: number, h: number) => {
      return Math.min(60, Math.floor((w * h) / 15000));
    };

    const initParticles = (w: number, h: number) => {
      const count = getParticleCount(w, h);
      const newParticles: Particle[] = [];
      for (let i = 0; i < count; i++) {
        newParticles.push(new Particle(w, h));
      }
      return newParticles;
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      // ریسایز ذرات
      const newCount = getParticleCount(width, height);
      if (newCount !== particles.length) {
        particles = initParticles(width, height);
      }
    };

    window.addEventListener("resize", handleResize);

    // مقداردهی اولیه
    canvas.width = width;
    canvas.height = height;
    particles = initParticles(width, height);

    function drawConnections() {
      const connectionDistance = 150;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const opacity = 1 - dist / connectionDistance;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(124, 58, 237, ${opacity * 0.3})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      if (!isActive) return;

      const colors = getColors();
      ctx.clearRect(0, 0, width, height);

      // پس‌زمینه
      const gradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, width / 2
      );
      gradient.addColorStop(0, colors.bgStart);
      gradient.addColorStop(0.5, colors.bgMid);
      gradient.addColorStop(1, colors.bgEnd);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // بروزرسانی و رسم ذرات
      for (const particle of particles) {
        particle.update(mouseX, mouseY, isMouseMoving);
        particle.draw(ctx, colors.particle);
      }

      // رسم خطوط
      drawConnections();

      // نقطه نورانی ماوس
      if (isMouseMoving) {
        const gradient2 = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 100);
        gradient2.addColorStop(0, colors.glow);
        gradient2.addColorStop(1, "transparent");
        ctx.fillStyle = gradient2;
        ctx.fillRect(mouseX - 100, mouseY - 100, 200, 200);
      }

      animationId = requestAnimationFrame(animate);
    }

    animate();

    // رویدادهای ماوس
    let mouseTimeout: ReturnType<typeof setTimeout> | undefined;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseMoving = true;
      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        isMouseMoving = false;
      }, 100);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // ===== Cleanup =====
    return () => {
      isActive = false;
      if (animationId) cancelAnimationFrame(animationId);
      clearTimeout(mouseTimeout);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        display: "block",
        transition: "background 0.3s ease",
      }}
    />
  );
}