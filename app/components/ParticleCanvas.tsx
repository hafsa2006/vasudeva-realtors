"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  alpha: number;
  maxAlpha: number;
  swaySpeed: number;
  swayRange: number;
  angle: number;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Create particles
    const particles: Particle[] = [];
    const particleCount = 16;

    for (let i = 0; i < particleCount; i++) {
      const maxAlpha = Math.random() * 0.18 + 0.04;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.0 + 0.3,
        speedY: -(Math.random() * 0.25 + 0.05), // Float upwards slower
        speedX: Math.random() * 0.1 - 0.05,
        alpha: Math.random() * maxAlpha,
        maxAlpha: maxAlpha,
        swaySpeed: Math.random() * 0.006 + 0.001,
        swayRange: Math.random() * 15 + 5,
        angle: Math.random() * Math.PI * 2,
      });
    }

    // Light ray parameters
    let rayAngle = 0;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Volumetric Light Rays (Sunbeams)
      rayAngle += 0.001;
      
      const rayGradient = ctx.createRadialGradient(
        width * 0.8, -100, 50,       // Inner circle
        width * 0.6, height * 0.8, width * 0.8 // Outer circle
      );
      
      // Calculate sweeping opacity
      const opacity = 0.06 + Math.sin(rayAngle * 3) * 0.02;
      const opacity2 = 0.03 + Math.cos(rayAngle * 2) * 0.01;

      rayGradient.addColorStop(0, `rgba(245, 238, 223, ${opacity})`);
      rayGradient.addColorStop(0.3, `rgba(197, 168, 128, ${opacity2})`);
      rayGradient.addColorStop(0.8, "rgba(10, 10, 10, 0)");
      rayGradient.addColorStop(1, "rgba(10, 10, 10, 0)");

      ctx.fillStyle = rayGradient;
      ctx.fillRect(0, 0, width, height);

      // Draw another subtle ray from top-left
      const leftRayGradient = ctx.createRadialGradient(
        0, 0, 10,
        width * 0.3, height * 0.5, width * 0.5
      );
      const leftOpacity = 0.03 + Math.sin(rayAngle * 2) * 0.01;
      leftRayGradient.addColorStop(0, `rgba(197, 168, 128, ${leftOpacity})`);
      leftRayGradient.addColorStop(1, "rgba(10, 10, 10, 0)");
      ctx.fillStyle = leftRayGradient;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw drifting gold particles
      particles.forEach((p) => {
        // Move particle
        p.y += p.speedY;
        p.angle += p.swaySpeed;
        p.x += p.speedX + Math.sin(p.angle) * 0.08;

        // Fade in/out
        if (p.alpha < p.maxAlpha) {
          p.alpha += 0.005;
        }

        // Reset if goes off screen
        if (p.y < -10 || p.x < -10 || p.x > width + 10) {
          p.y = height + 10;
          p.x = Math.random() * width;
          p.alpha = 0;
        }

        // Draw particle with gold glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(197, 168, 128, ${p.alpha})`;
        ctx.shadowColor = "rgba(197, 168, 128, 0.4)";
        ctx.shadowBlur = p.size * 2;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow for performance
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full pointer-events-none block z-10"
    />
  );
}
