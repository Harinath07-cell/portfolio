"use client";

import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";
import Link from "next/link";
import { forwardRef, type ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: Variant;
  href?: string;
  external?: boolean;
  children?: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-ink text-canvas hover:shadow-glow border border-transparent",
  secondary:
    "bg-white/5 text-ink border border-hairline hover:bg-white/10",
  ghost: "bg-transparent text-ink-muted hover:text-ink border border-transparent",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", href, external, children, ...props }, ref) => {
    const classes = cn(
      "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-tight transition-all duration-300 will-change-transform",
      variantClasses[variant],
      className
    );

    if (href) {
      return (
        <motion.span
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="inline-block"
        >
          <Link
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className={classes}
          >
            {children}
          </Link>
        </motion.span>
      );
    }

    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        className={classes}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
