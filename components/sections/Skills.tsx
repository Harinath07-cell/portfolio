"use client";

import { GlowCard } from "@/components/ui/GlowCard";
import { iconMap } from "@/components/ui/IconMap";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillCategories } from "@/data/skills";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { motion } from "framer-motion";

export function Skills() {
  return (
    <section id="skills" className="relative py-28 sm:py-36">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Skills"
          title="Technology Stack"
        />

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {skillCategories.map((category) => {
            const Icon = iconMap[category.icon];
            return (
              <motion.div key={category.id} variants={fadeUp}>
                <GlowCard className="h-full p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-hairline bg-white/5 text-indigo-soft">
                      {Icon && <Icon size={18} />}
                    </span>
                    <h3 className="text-base font-semibold text-ink">
                      {category.title}
                    </h3>
                  </div>

                  <ul className="mt-6 space-y-3">
                    {category.skills.map((skill) => (
                      <li
                        key={skill.name}
                        className="rounded-full border border-hairline bg-white/5 px-4 py-2 text-sm text-ink-muted"
                      >
                        {skill.name}
                      </li>
                    ))}
                  </ul>
                </GlowCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
