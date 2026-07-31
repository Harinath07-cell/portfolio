"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/config";
import { fadeUp, slideIn, staggerContainer, viewportOnce } from "@/lib/motion";
import { motion } from "framer-motion";
import Image from "next/image";

export function About() {
  return (
    <section id="about" className="relative py-28 sm:py-36">
      <div className="section-shell">
        <SectionHeading
          eyebrow="About"
          title="Who I Am"
        />

        <div className="mt-16 grid grid-cols-1 items-start gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            variants={slideIn("left")}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="relative mx-auto w-full max-w-sm lg:mx-0"
          >
            <div className="absolute -inset-3 rounded-[1.75rem] bg-gradient-to-tr from-cyan/20 via-transparent to-indigo/25 blur-2xl" />
            <div className="glass-panel relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/images/about-portrait-new.jpg"
                alt={`${siteConfig.name} working at a desk`}
                fill
                sizes="(max-width: 1024px) 320px, 380px"
                className="object-cover transition-all duration-700 hover:scale-105"
              />
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.14)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="space-y-5"
          >
            {siteConfig.about.paragraphs.map((paragraph, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                className={
                  i === 0
                    ? "text-xl font-medium leading-relaxed text-ink"
                    : "leading-relaxed text-ink-muted"
                }
              >
                {paragraph}
              </motion.p>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
