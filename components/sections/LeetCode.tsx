"use client";

import { GlowCard } from "@/components/ui/GlowCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/config";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ExternalLink,
  Flame,
  Loader2,
  ShieldCheck,
  Sparkles,
  Trophy,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface LeetCodeStats {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  ranking?: number;
  contestRating?: number;
  recentSubmissions?: { title: string; timestamp: string; statusDisplay: string }[];
  submissionCalendar?: Record<string, number>;
}

async function fetchLeetCodeData() {
  const res = await fetch(`/api/leetcode?username=${encodeURIComponent(siteConfig.leetcodeUsername)}`);
  if (!res.ok) {
    throw new Error("Failed to fetch LeetCode stats");
  }

  const json = await res.json();
  if (json && typeof json === "object") return json as LeetCodeStats;
  throw new Error("Failed to fetch LeetCode stats");
}

function normalizeCalendar(calendar?: Record<string, number>) {
  if (!calendar) return {};

  return Object.entries(calendar).reduce<Record<string, number>>((acc, [key, count]) => {
    const timestamp = Number(key);
    const date = Number.isFinite(timestamp)
      ? new Date(key.length === 10 ? timestamp * 1000 : timestamp)
      : new Date(key);

    if (!Number.isNaN(date.valueOf())) {
      acc[date.toISOString().slice(0, 10)] = count ?? 0;
    }

    return acc;
  }, {});
}

function useLeetCodeStats() {
  const [data, setData] = useState<LeetCodeStats | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;

    async function fetchStats() {
      try {
        const json = await fetchLeetCodeData();
        if (!cancelled) {
          setData(json);
          setStatus("ready");
        }
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    fetchStats();
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, status };
}

function Heatmap({ calendar }: { calendar?: Record<string, number> }) {
  const normalized = useMemo(() => normalizeCalendar(calendar), [calendar]);

  const cells = useMemo(() => {
    const today = new Date();
    const days: { date: string; count: number }[] = [];
    for (let i = 119; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      days.push({ date: key, count: normalized[key] ?? 0 });
    }
    return days;
  }, [normalized]);

  function intensity(count: number) {
    if (count === 0) return "bg-white/5";
    if (count < 2) return "bg-indigo-dim";
    if (count < 4) return "bg-indigo";
    return "bg-cyan";
  }

  return (
    <div className="grid grid-cols-[repeat(20,minmax(0,1fr))] gap-1 sm:grid-cols-[repeat(30,minmax(0,1fr))]">
      {cells.map((cell, i) => (
        <span
          key={i}
          title={`${cell.count} submissions`}
          className={`h-3 w-3 rounded-sm ${intensity(cell.count)}`}
        />
      ))}
    </div>
  );
}

export function LeetCodeSection() {
  const { data, status } = useLeetCodeStats();

  const stats = [
    { label: "Solved", value: data?.totalSolved ?? "—" },
    { label: "Easy", value: data?.easySolved ?? "—" },
    { label: "Medium", value: data?.mediumSolved ?? "—" },
    { label: "Hard", value: data?.hardSolved ?? "—" },
  ];

  const distribution = [
    { label: "Python", value: Math.max(10, Math.min(100, (data?.easySolved ?? 0) * 2.2)) },
    { label: "JavaScript", value: Math.max(10, Math.min(100, (data?.mediumSolved ?? 0) * 1.8)) },
    { label: "Algorithms", value: Math.max(10, Math.min(100, (data?.hardSolved ?? 0) * 2.4)) },
  ];

  return (
    <section id="leetcode" className="relative py-28 sm:py-36">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Problem Solving"
          title="LeetCode dashboard"
        />

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14"
        >
          <GlowCard tilt={false} className="p-6 sm:p-8">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <motion.div variants={fadeUp} className="space-y-6 rounded-3xl border border-hairline bg-white/[0.04] p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo to-cyan text-2xl font-semibold text-canvas">
                    {siteConfig.leetcodeUsername.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-ink">{siteConfig.leetcodeUsername}</p>
                    <p className="mt-1 text-sm text-ink-faint">LeetCode profile overview</p>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-3xl border border-hairline bg-surface-2 p-4">
                    <p className="text-[11px] uppercase tracking-[0.34em] text-ink-faint">Contest rating</p>
                    <p className="mt-4 text-3xl font-semibold text-ink">{status === "loading" ? "—" : data?.contestRating ?? "N/A"}</p>
                  </div>
                  <div className="rounded-3xl border border-hairline bg-surface-2 p-4">
                    <p className="text-[11px] uppercase tracking-[0.34em] text-ink-faint">Top badge</p>
                    <div className="mt-4 flex items-center gap-3 text-sm text-ink">
                      <ShieldCheck size={18} className="text-cyan" />
                      <span>{data ? "Problem Solver" : "Syncing"}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={siteConfig.socials.leetcode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-hairline bg-white/5 px-5 py-3 text-sm text-ink-muted transition-colors hover:border-indigo-soft hover:text-ink"
                  >
                    View profile <ExternalLink size={14} />
                  </a>
                </div>
              </motion.div>

              <div className="space-y-8">
                <motion.div variants={fadeUp} className="grid gap-3 sm:grid-cols-4">
                  {stats.map((stat) => (
                    <div key={stat.label} className="rounded-3xl border border-hairline bg-surface-2 p-4 text-center">
                      <p className="text-2xl font-semibold text-ink">{status === "loading" ? <Loader2 className="mx-auto animate-spin text-ink-faint" size={20} /> : stat.value}</p>
                      <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-ink-faint">{stat.label}</p>
                    </div>
                  ))}
                </motion.div>

                <motion.div variants={fadeUp} className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                  <div className="rounded-3xl border border-hairline bg-surface-2 p-5">
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-ink">Skill distribution</p>
                        <p className="mt-1 text-xs text-ink-faint">Based on solved problems by difficulty</p>
                      </div>
                      <Sparkles size={18} className="text-cyan" />
                    </div>
                    <div className="space-y-4">
                      {distribution.map((item) => {
                        const value = Number(item.value) || 0;
                        return (
                          <div key={item.label} className="space-y-2">
                            <div className="flex items-center justify-between text-xs text-ink-faint">
                              <span>{item.label}</span>
                              <span>{Math.round(value)}%</span>
                            </div>
                            <div className="h-2 rounded-full bg-white/5">
                              <div className="h-full rounded-full bg-gradient-to-r from-indigo to-cyan" style={{ width: `${value}%` }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="rounded-3xl border border-hairline bg-surface-2 p-5">
                    <p className="text-sm font-semibold text-ink">Heatmap</p>
                    <p className="mt-2 text-xs text-ink-faint">Recent daily activity</p>
                    <div className="mt-4 overflow-x-auto rounded-3xl border border-white/5 bg-canvas/40 p-4">
                      <div className="min-w-[420px]">
                        <Heatmap calendar={data?.submissionCalendar} />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {status === "error" && (
                  <div className="rounded-3xl border border-amber/30 bg-amber/10 p-4 text-sm text-amber">
                    <AlertTriangle size={16} className="inline-block" /> Live stats are temporarily unavailable. Please refresh or check the profile directly.
                  </div>
                )}

              </div>
            </div>
          </GlowCard>
        </motion.div>
      </div>
    </section>
  );
}
