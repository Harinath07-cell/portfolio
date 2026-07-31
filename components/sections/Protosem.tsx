"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { protosemInfo, protosemWeeks } from "@/data/protosem";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Building2, ChevronLeft, ChevronRight, Github, Search } from "lucide-react";
import { useMemo, useState } from "react";

export function Protosem() {
  const sortedWeeks = useMemo(
    () => [...protosemWeeks].sort((a, b) => a.week - b.week),
    []
  );
  const [query, setQuery] = useState("");
  const [activeWeek, setActiveWeek] = useState<number>(sortedWeeks[0]?.week ?? 0);

  const filteredWeeks = useMemo(() => {
    if (!query.trim()) return sortedWeeks;
    const q = query.toLowerCase();
    return sortedWeeks.filter(
      (w) =>
        w.title.toLowerCase().includes(q) || `week ${w.week}`.includes(q)
    );
  }, [sortedWeeks, query]);

  const current = sortedWeeks.find((w) => w.week === activeWeek) ?? sortedWeeks[0];
  const currentIndex = sortedWeeks.findIndex((w) => w.week === activeWeek);
  const progressPercent = Math.round(
    (sortedWeeks.length / protosemInfo.totalWeeks) * 100
  );

  function goTo(offset: number) {
    const next = sortedWeeks[currentIndex + offset];
    if (next) setActiveWeek(next.week);
  }

  if (!current) return null;

  return (
    <section id="protosem" className="relative py-28 sm:py-36">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Internship"
          title="Protosem — Innovation Engineer Internship"
        />

        {/* Dashboard header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="glass-panel mt-12 flex flex-col gap-6 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-hairline bg-white/5 text-indigo-soft">
              <Building2 size={20} />
            </span>
            <div>
              <p className="font-semibold text-ink">{protosemInfo.role}</p>
              <p className="text-sm text-ink-muted">
                {protosemInfo.organisation} · {protosemInfo.duration}
              </p>
            </div>
          </div>

          <div className="sm:w-56">
            <div className="flex items-center justify-between text-xs text-ink-faint">
              <span>Logged</span>
              <span className="font-mono">
                {sortedWeeks.length} / {protosemInfo.totalWeeks} weeks
              </span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${progressPercent}%` }}
                viewport={viewportOnce}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-full bg-gradient-to-r from-indigo to-cyan"
              />
            </div>
          </div>
        </motion.div>

        {/* Search */}
        <div className="relative mt-10 max-w-sm">
          <Search
            size={16}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a week (e.g. 'Week 2' or a topic)"
            className="w-full rounded-full border border-hairline bg-white/5 py-2.5 pl-11 pr-4 text-sm text-ink placeholder:text-ink-faint focus:border-indigo-soft focus:outline-none"
          />
        </div>

        {/* Week timeline */}
        <div className="mt-6 flex gap-2 overflow-x-auto pb-3">
          {filteredWeeks.map((w) => (
            <button
              key={w.week}
              onClick={() => setActiveWeek(w.week)}
              className={cn(
                "flex-none rounded-full border px-4 py-2 font-mono text-xs transition-colors",
                activeWeek === w.week
                  ? "border-indigo-soft bg-indigo/20 text-ink"
                  : "border-hairline bg-white/[0.02] text-ink-muted hover:text-ink"
              )}
            >
              Week {String(w.week).padStart(2, "0")}
            </button>
          ))}
          {filteredWeeks.length === 0 && (
            <p className="py-2 text-sm text-ink-faint">No weeks match your search.</p>
          )}
        </div>

        {/* Active week detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.week}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel mt-8 overflow-hidden rounded-2xl"
          >
            <div className="grid grid-cols-1">
              <div className="p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-ink">{current.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {current.description}
                </p>

                <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <p className="eyebrow">Technologies</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {current.technologies.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-hairline bg-white/5 px-3 py-1 font-mono text-[11px] text-ink-faint"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="eyebrow">Skills learned</p>
                    <ul className="mt-2 space-y-1 text-sm text-ink-muted">
                      {current.skillsLearned.map((s) => (
                        <li key={s}>• {s}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-5">
                  <p className="eyebrow">Challenges faced</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {current.challenges}
                  </p>
                </div>

                <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-hairline pt-5">
                  <div className="flex gap-2">
                    <button
                      onClick={() => goTo(-1)}
                      disabled={currentIndex <= 0}
                      className="flex items-center gap-1 rounded-full border border-hairline px-3.5 py-2 text-xs text-ink-muted transition-colors hover:text-ink disabled:opacity-30"
                    >
                      <ChevronLeft size={14} /> Previous
                    </button>
                    <button
                      onClick={() => goTo(1)}
                      disabled={currentIndex >= sortedWeeks.length - 1}
                      className="flex items-center gap-1 rounded-full border border-hairline px-3.5 py-2 text-xs text-ink-muted transition-colors hover:text-ink disabled:opacity-30"
                    >
                      Next <ChevronRight size={14} />
                    </button>
                  </div>

                  {current.githubUrl && (
                    <a
                      href={current.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-full border border-hairline px-4 py-2 text-xs text-ink-muted transition-colors hover:border-indigo-soft hover:text-ink"
                    >
                      <Github size={14} /> Repository
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
