"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { protosemInfo, protosemWeeks } from "@/data/protosem";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Building2, ClipboardList, ChevronLeft, ChevronRight, Github, Search, X } from "lucide-react";
import { useMemo, useState } from "react";

export function Protosem() {
  const sortedWeeks = useMemo(
    () => [...protosemWeeks].sort((a, b) => a.week - b.week),
    []
  );
  const [query, setQuery] = useState("");
  const [activeWeek, setActiveWeek] = useState<number>(sortedWeeks[0]?.week ?? 0);
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);

  const current = sortedWeeks.find((w) => w.week === activeWeek) ?? sortedWeeks[0];
  const currentIndex = sortedWeeks.findIndex((w) => w.week === activeWeek);
  const progressPercent = Math.round(
    (sortedWeeks.length / protosemInfo.totalWeeks) * 100
  );

  const reportImage = current?.fileLogImages?.[0] ?? current?.fileLogImage;

  const filteredWeeks = useMemo(() => {
    if (!query.trim()) return sortedWeeks;
    const q = query.toLowerCase();
    return sortedWeeks.filter(
      (w) =>
        w.title.toLowerCase().includes(q) || `week ${w.week}`.includes(q)
    );
  }, [sortedWeeks, query]);

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
                
                {current.overview ? (
                  <div className="mt-4">
                    <p className="eyebrow">Report Overview</p>
                    <div className="mt-3 grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(220px,0.7fr)]">
                      <div className="space-y-3">
                        {current.overview.split("\n\n").map((para, idx) => (
                          <p key={idx} className="text-sm leading-relaxed text-ink-muted">
                            {para}
                          </p>
                        ))}
                      </div>
                      {reportImage && (
                        <img
                          src={reportImage}
                          alt={`Week ${current.week} report`}
                          className="w-full rounded-xl border border-hairline bg-canvas/40 object-cover"
                        />
                      )}
                    </div>
                    {current.reportImages && current.reportImages.length > 0 && (
                      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {current.reportImages.map((image, index) => (
                          <img
                            key={image}
                            src={image}
                            alt={`Week ${current.week} activity ${index + 1}`}
                            className="aspect-[4/3] w-full rounded-xl border border-hairline bg-canvas/40 object-cover"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    {current.description}
                  </p>
                )}

                {current.objectives && current.objectives.length > 0 && (
                  <div className="mt-5">
                    <p className="eyebrow">Objectives</p>
                    <ul className="mt-2 space-y-1.5 text-sm text-ink-muted">
                      {current.objectives.map((obj) => (
                        <li key={obj} className="flex gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-cyan" />
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {current.activitiesConducted && current.activitiesConducted.length > 0 && (
                  <div className="mt-5">
                    <p className="eyebrow">Activities Conducted</p>
                    <ul className="mt-2 space-y-1.5 text-sm text-ink-muted">
                      {current.activitiesConducted.map((act) => (
                        <li key={act} className="flex gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-indigo-soft" />
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

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
                    <ul className="mt-2 grid grid-cols-1 gap-1 text-sm text-ink-muted sm:grid-cols-2">
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

                  <div className="flex flex-wrap items-center gap-2">
                    {current.assignmentPoints && current.assignmentPoints.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setIsAssignmentModalOpen(true)}
                        className="flex items-center gap-1.5 rounded-full border border-hairline px-4 py-2 text-xs text-ink-muted transition-colors hover:border-indigo-soft hover:text-ink"
                      >
                        <ClipboardList size={14} /> Assignment
                      </button>
                    )}
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
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isAssignmentModalOpen && current.assignmentPoints && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-canvas/85 px-4 py-6 backdrop-blur-xl"
            onClick={() => setIsAssignmentModalOpen(false)}
          >
            <motion.div
              initial={{ y: 24, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 16, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-xl rounded-[2rem] border border-hairline bg-surface-2 p-6 shadow-glow sm:p-8"
            >
              <button
                type="button"
                onClick={() => setIsAssignmentModalOpen(false)}
                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-hairline bg-canvas/70 text-ink-muted transition-colors hover:text-ink"
                aria-label="Close assignment"
              >
                <X size={18} />
              </button>
              <p className="eyebrow">Week {String(current.week).padStart(2, "0")} Assignment</p>
              <h4 className="mt-3 pr-10 text-xl font-semibold text-ink">Assignment focus</h4>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-ink-muted">
                {current.assignmentPoints.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-cyan" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
