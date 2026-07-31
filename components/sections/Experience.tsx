"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { experience } from "@/data/experience";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

export function Experience() {
  return (
    <section id="experience" className="relative py-28 sm:py-36">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've grown"
          description="Leadership and hands-on roles that shaped how I build and collaborate."
        />

        <div className="relative mt-16">
          <div className="absolute left-[19px] top-0 h-full w-px bg-gradient-to-b from-indigo via-hairline to-transparent sm:left-[23px]" />

          <div className="space-y-12">
            {experience.map((item, index) => (
              <motion.div
                key={item.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                transition={{ delay: index * 0.05 }}
                className="relative flex gap-6 pl-2 sm:gap-8"
              >
                <div className="relative z-10 flex h-10 w-10 flex-none items-center justify-center rounded-full border border-hairline bg-surface text-indigo-soft sm:h-12 sm:w-12">
                  <Briefcase size={16} />
                </div>

                <div className="glass-panel flex-1 rounded-2xl p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-lg font-semibold text-ink">
                      {item.role}
                    </h3>
                    {item.duration && (
                      <span className="font-mono text-xs text-ink-faint">
                        {item.duration}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-indigo-soft">
                    {item.organisation}
                    {item.affiliation && (
                      <span className="text-ink-faint"> · {item.affiliation}</span>
                    )}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
