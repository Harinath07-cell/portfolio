"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { type MouseEvent, type ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
}

/**
 * A glassmorphic card that tracks the cursor with a soft radial glow and,
 * optionally, a subtle 3D tilt — used for project and skill cards.
 */
export function GlowCard({ children, className, tilt = true }: GlowCardProps) {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const background = useMotionTemplate`radial-gradient(360px circle at ${mouseX}px ${mouseY}px, rgba(139,124,255,0.16), transparent 70%)`;

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);

    if (tilt) {
      const px = x / rect.width - 0.5;
      const py = y / rect.height - 0.5;
      rotateY.set(px * 6);
      rotateX.set(py * -6);
    }
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-hairline bg-surface/60 shadow-card",
        className
      )}
    >
      <motion.div
        aria-hidden
        style={{ background }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
