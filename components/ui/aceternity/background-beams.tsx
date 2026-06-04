"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface BackgroundBeamsProps {
  className?: string;
}

export function BackgroundBeams({ className }: BackgroundBeamsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      const beams = [
        { x: width * 0.2, angle: 75, hue: 0 },
        { x: width * 0.5, angle: 90, hue: 10 },
        { x: width * 0.8, angle: 105, hue: 5 },
      ];

      beams.forEach((beam, i) => {
        const opacity = 0.03 + 0.015 * Math.sin(time * 0.4 + i * 1.5);
        const gradient = ctx.createLinearGradient(
          beam.x,
          0,
          beam.x + Math.cos((beam.angle * Math.PI) / 180) * height,
          height
        );
        gradient.addColorStop(0, `hsla(${beam.hue}, 80%, 45%, ${opacity})`);
        gradient.addColorStop(1, `hsla(${beam.hue}, 80%, 45%, 0)`);

        ctx.save();
        ctx.translate(beam.x, 0);
        ctx.rotate(((beam.angle - 90) * Math.PI) / 180);
        ctx.fillStyle = gradient;
        ctx.fillRect(-100, 0, 200, Math.sqrt(width * width + height * height));
        ctx.restore();
      });

      time += 0.02;
      animationId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 w-full h-full", className)}
      aria-hidden="true"
    />
  );
}
