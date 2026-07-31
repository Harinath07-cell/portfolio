"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-canvas"
        >
          <div className="flex flex-col items-center gap-4">
            <motion.span
              initial={{ letterSpacing: "0.05em", opacity: 0 }}
              animate={{ letterSpacing: "0.02em", opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-2xl text-ink"
            >
              S. HARINATH
            </motion.span>
            <div className="h-[2px] w-40 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="h-full w-full bg-gradient-to-r from-indigo to-cyan"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
