"use client";

import { GlowCard } from "@/components/ui/GlowCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import type { Project } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { FileText, Github, X } from "lucide-react";
import { useState } from "react";

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-28 sm:py-36">
      <div className="section-shell">
        <SectionHeading eyebrow="Projects" title="Selected work" />

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid grid-cols-1 gap-6 xl:grid-cols-3"
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={fadeUp}>
              <GlowCard className="group flex h-full flex-col overflow-hidden" tilt>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold text-ink">{project.title}</h3>
                    <div className="rounded-full bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-ink-faint">
                      {project.type ?? "Project"}
                    </div>
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-muted">{project.description}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-hairline bg-white/5 px-3 py-1 font-mono text-[11px] text-ink-faint"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2 border-t border-hairline pt-5">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 rounded-full border border-hairline bg-white/5 px-3.5 py-2 text-xs text-ink-muted transition-colors hover:border-indigo-soft hover:text-ink"
                      >
                        <Github size={14} /> Code
                      </a>
                    )}
                    {project.caseStudy && (
                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        className="flex items-center gap-1.5 rounded-full border border-hairline bg-white/5 px-3.5 py-2 text-xs text-ink-muted transition-colors hover:border-indigo-soft hover:text-ink"
                      >
                        <FileText size={14} /> Case Study
                      </button>
                    )}
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-canvas/85 px-4 py-6 backdrop-blur-xl"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ y: 24, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 16, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] border border-hairline bg-surface-2 shadow-glow"
            >
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-canvas/70 text-ink-muted transition-colors hover:text-ink"
                aria-label="Close case study"
              >
                <X size={18} />
              </button>

              <div className="grid lg:grid-cols-1">
                <div className="max-h-[80vh] overflow-y-auto p-6 sm:p-8">
                  <p className="eyebrow">Case Study</p>
                  <h3 className="mt-3 text-2xl font-semibold text-ink">{selectedProject.caseStudy?.title ?? selectedProject.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-ink-muted">{selectedProject.caseStudy?.overview}</p>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-hairline bg-white/[0.04] p-4">
                      <p className="text-sm font-semibold text-ink">The Problem</p>
                      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{selectedProject.caseStudy?.problem}</p>
                    </div>
                    <div className="rounded-2xl border border-hairline bg-white/[0.04] p-4">
                      <p className="text-sm font-semibold text-ink">My Solution</p>
                      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{selectedProject.caseStudy?.solution}</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="text-sm font-semibold text-ink">Key Features</p>
                    <ul className="mt-3 space-y-2 text-sm text-ink-muted">
                      {selectedProject.caseStudy?.features.map((feature) => (
                        <li key={feature} className="flex gap-2">
                          <span className="mt-1 h-2 w-2 rounded-full bg-cyan" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 grid gap-6 lg:grid-cols-2">
                    <div>
                      <p className="text-sm font-semibold text-ink">Tech Stack</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {selectedProject.caseStudy?.stack.map((tech) => (
                          <span key={tech} className="rounded-full border border-hairline bg-white/5 px-3 py-1 font-mono text-[11px] text-ink-faint">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink">Key Learnings</p>
                      <ul className="mt-3 space-y-2 text-sm text-ink-muted">
                        {selectedProject.caseStudy?.learnings.map((learning) => (
                          <li key={learning}>• {learning}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
