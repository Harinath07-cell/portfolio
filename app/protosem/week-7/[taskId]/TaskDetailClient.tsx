"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Box,
  Github,
  ExternalLink,
  CheckCircle2,
  Wrench,
  Layers,
  Cpu,
  Table,
  Code2,
  Terminal,
  Check,
  Copy,
  Monitor,
  BookOpen,
  Play,
  AlertTriangle,
  ShieldCheck,
  Zap
} from "lucide-react";
import { ProjectDetail } from "../projects-data";

interface TaskDetailClientProps {
  project: ProjectDetail;
}

export default function TaskDetailClient({ project }: TaskDetailClientProps) {
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="min-h-screen bg-canvas text-ink selection:bg-indigo/30 selection:text-ink">
      <div aria-hidden className="noise-overlay" />

      {/* Top Navbar */}
      <header className="sticky top-0 z-50 border-b border-hairline bg-canvas/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link
            href="/protosem/week-7"
            className="inline-flex items-center gap-2 rounded-full border border-hairline bg-white/5 px-3.5 py-1.5 text-xs font-medium text-ink-muted transition-colors hover:border-indigo-soft hover:text-ink"
          >
            <ArrowLeft size={14} /> <span className="hidden sm:inline">Back to Week 7 Dashboard</span><span className="sm:hidden">Week 7</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-wider text-cyan font-semibold">
              ProtoSem · Week 07
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="space-y-10 animate-fadeIn">
          {/* Top Bar with Back & Repository Link */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-hairline pb-4">
            <Link
              href="/protosem/week-7"
              className="inline-flex items-center gap-2 rounded-full border border-indigo-soft/30 bg-indigo/10 px-4 py-2 text-xs font-mono font-medium text-cyan transition-colors hover:bg-indigo/20"
            >
              <ArrowLeft size={14} /> Back to Projects List
            </Link>

            <a
              href={project.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-hairline bg-white/5 px-4 py-2 text-xs font-mono font-medium text-ink-muted transition-colors hover:border-cyan hover:text-cyan"
            >
              <Github size={14} /> Repository Link <ExternalLink size={12} />
            </a>
          </div>

          {/* Project Header */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-hairline bg-white/5 px-3 py-1 text-xs font-mono text-indigo-soft">
              <Box size={14} /> {project.category}
            </div>
            <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl lg:text-5xl">
              {project.title}
            </h1>
            <p className="text-base text-ink-muted sm:text-lg max-w-4xl leading-relaxed">
              {project.shortIntro}
            </p>

            {project.coverImage && (
              <div className="group relative overflow-hidden rounded-2xl border border-hairline bg-black/40">
                <img
                  src={encodeURI(project.coverImage)}
                  alt={`${project.title} Cover`}
                  className="w-full h-auto max-h-[440px] object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                />
                <a
                  href={encodeURI(project.coverImage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg bg-black/75 px-3 py-1.5 font-mono text-xs text-cyan opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100 hover:text-white"
                >
                  <ExternalLink size={12} /> View Full Cover
                </a>
              </div>
            )}
          </div>

          {/* 1. OVERVIEW */}
          <section className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-hairline pb-3">
              <h2 className="flex items-center gap-2 font-display text-xl text-ink font-semibold">
                <CheckCircle2 size={20} className="text-cyan" /> 1. Project Overview & Objectives
              </h2>
              <span className="font-mono text-xs text-ink-faint">Section 01</span>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-indigo-soft">
                  Project Objective
                </h3>
                <p className="text-sm leading-relaxed text-ink-muted">
                  {project.overview.objective}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-indigo-soft">
                  Problem Being Addressed
                </h3>
                <p className="text-sm leading-relaxed text-ink-muted">
                  {project.overview.problemSolved}
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-hairline bg-white/5 p-4 space-y-2">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-cyan">
                One-Paragraph Executive Summary
              </h3>
              <p className="text-sm leading-relaxed text-ink-muted">
                {project.overview.summary}
              </p>
            </div>
          </section>

          {/* 2. CONCEPTS */}
          <section className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-hairline pb-3">
              <h2 className="flex items-center gap-2 font-display text-xl text-ink font-semibold">
                <Wrench size={20} className="text-indigo-soft" /> 2. Core Technical Concepts
              </h2>
              <span className="font-mono text-xs text-ink-faint">Section 02</span>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-hairline bg-canvas/60 p-5 space-y-2">
                <h3 className="font-mono text-sm font-semibold text-cyan">
                  Architecture & Protocol Fundamentals
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-ink-muted">
                  {project.concepts.webServerConcept}
                </p>
              </div>

              <div className="rounded-xl border border-hairline bg-canvas/60 p-5 space-y-2">
                <h3 className="font-mono text-sm font-semibold text-cyan">
                  Communication Pipeline & State Management
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-ink-muted">
                  {project.concepts.communicationFlow}
                </p>
              </div>
            </div>
          </section>

          {/* 3. SYSTEM DESIGN */}
          <section className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-hairline pb-3">
              <h2 className="flex items-center gap-2 font-display text-xl text-ink font-semibold">
                <Layers size={20} className="text-cyan" /> 3. System Design & Data Flow
              </h2>
              <span className="font-mono text-xs text-ink-faint">Section 03</span>
            </div>

            {project.systemDesign.image && (
              <div className="space-y-2">
                <div className="group relative overflow-hidden rounded-xl border border-hairline bg-black/40">
                  <img
                    src={encodeURI(project.systemDesign.image)}
                    alt={project.systemDesign.imageCaption || "System Design Architecture"}
                    className="w-full h-auto max-h-[460px] object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                  />
                  <a
                    href={encodeURI(project.systemDesign.image)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-2 right-2 flex items-center gap-1 rounded-md bg-black/75 px-2.5 py-1 font-mono text-[10px] text-cyan opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100 hover:text-white"
                  >
                    <ExternalLink size={10} /> View Full
                  </a>
                </div>
                {project.systemDesign.imageCaption && (
                  <p className="text-xs font-mono text-ink-faint">{project.systemDesign.imageCaption}</p>
                )}
              </div>
            )}

            {project.systemDesign.diagram && (
              <div className="overflow-x-auto rounded-xl border border-hairline bg-[#0D1117] p-5 font-mono text-xs sm:text-sm text-cyan leading-relaxed">
                <pre>{project.systemDesign.diagram}</pre>
              </div>
            )}

            <p className="text-xs sm:text-sm leading-relaxed text-ink-muted">
              {project.systemDesign.explanation}
            </p>
          </section>

          {/* 4. HARDWARE & SOFTWARE */}
          <section className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-hairline pb-3">
              <h2 className="flex items-center gap-2 font-display text-xl text-ink font-semibold">
                <Cpu size={20} className="text-indigo-soft" /> 4. Hardware & Software Stack
              </h2>
              <span className="font-mono text-xs text-ink-faint">Section 04</span>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-3">
                <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-cyan">
                  Hardware Components Required
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-ink-muted">
                  {project.hardwareSoftware.components.map((c, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-cyan flex-none" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-indigo-soft">
                  Software, Libraries & Platforms
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-ink-muted">
                  {project.hardwareSoftware.tools.map((t, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-indigo-soft flex-none" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* 5. WIRING / SETUP */}
          <section className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-hairline pb-3">
              <h2 className="flex items-center gap-2 font-display text-xl text-ink font-semibold">
                <Table size={20} className="text-cyan" /> 5. Circuit Wiring & Pin Connections
              </h2>
              <span className="font-mono text-xs text-ink-faint">Section 05</span>
            </div>

            {project.wiringSetup.image && (
              <div className="space-y-2">
                <div className="group relative overflow-hidden rounded-xl border border-hairline bg-black/40">
                  <img
                    src={encodeURI(project.wiringSetup.image)}
                    alt={project.wiringSetup.imageCaption || "Circuit Schematic"}
                    className="w-full h-auto max-h-[460px] object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                  />
                  <a
                    href={encodeURI(project.wiringSetup.image)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-2 right-2 flex items-center gap-1 rounded-md bg-black/75 px-2.5 py-1 font-mono text-[10px] text-cyan opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100 hover:text-white"
                  >
                    <ExternalLink size={10} /> View Full
                  </a>
                </div>
                {project.wiringSetup.imageCaption && (
                  <p className="text-xs font-mono text-ink-faint">{project.wiringSetup.imageCaption}</p>
                )}
              </div>
            )}

            <p className="text-xs sm:text-sm leading-relaxed text-ink-muted">
              {project.wiringSetup.circuitDesc}
            </p>

            <div className="overflow-x-auto rounded-xl border border-hairline">
              <table className="w-full text-left font-mono text-xs sm:text-sm">
                <thead className="border-b border-hairline bg-white/5 text-ink">
                  <tr>
                    <th className="p-3">Pin / Interface</th>
                    <th className="p-3">Component Target</th>
                    <th className="p-3">Signal & Wiring Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline text-ink-muted">
                  {project.wiringSetup.pinTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-white/5">
                      <td className="p-3 font-bold text-cyan">{row.pin}</td>
                      <td className="p-3 text-ink">{row.component}</td>
                      <td className="p-3">{row.connection}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 6. IMPLEMENTATION & CODE */}
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-hairline pb-3">
              <h2 className="flex items-center gap-2 font-display text-xl text-ink font-semibold">
                <Code2 size={20} className="text-indigo-soft" /> 6. Full Implementation Source Code & Architecture
              </h2>
              <span className="font-mono text-xs text-ink-faint">Section 06</span>
            </div>

            <div className="overflow-hidden rounded-2xl border border-hairline bg-[#0D1117] shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 bg-[#161B22] px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="h-3 w-3 rounded-full bg-green-500/80 inline-block" />
                  <span className="ml-2 font-mono text-xs text-slate-400 flex items-center gap-1.5">
                    <Terminal size={12} className="text-cyan" /> {project.implementation.codeTitle}
                  </span>
                </div>

                <button
                  onClick={() => handleCopyCode(project.implementation.codeSnippet)}
                  className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {copiedCode ? (
                    <>
                      <Check size={12} className="text-green-400" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={12} /> Copy Code
                    </>
                  )}
                </button>
              </div>

              <div className="overflow-x-auto p-4 sm:p-6 font-mono text-xs sm:text-sm text-emerald-400/90 leading-relaxed">
                <pre>{project.implementation.codeSnippet}</pre>
              </div>
            </div>

            <div className="glass-panel rounded-2xl p-6 space-y-4">
              <h3 className="font-display text-base text-ink font-semibold flex items-center gap-2">
                <Monitor size={18} className="text-cyan" /> Interface Logic & State Transmission
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-ink-muted">
                {project.implementation.htmlExplanation}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {project.implementation.keyCodeSections.map((sec, i) => (
                <div key={i} className="glass-panel rounded-xl p-4 space-y-1.5">
                  <p className="font-mono text-xs font-bold text-cyan">{sec.section}</p>
                  <p className="text-xs text-ink-muted leading-relaxed">{sec.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 7. CONFIGURATION */}
          <section className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-hairline pb-3">
              <h2 className="flex items-center gap-2 font-display text-xl text-ink font-semibold">
                <BookOpen size={20} className="text-cyan" /> 7. Setup & Cloud Platform Configuration
              </h2>
              <span className="font-mono text-xs text-ink-faint">Section 07</span>
            </div>

            <div className="space-y-3">
              {project.configuration.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 rounded-xl border border-hairline bg-canvas/60 p-4">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan/10 font-mono text-xs font-bold text-cyan flex-none">
                    {idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed pt-0.5">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 8. EVIDENCE */}
          <section className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-hairline pb-3">
              <h2 className="flex items-center gap-2 font-display text-xl text-ink font-semibold">
                <Play size={20} className="text-indigo-soft" /> 8. Evidence: Photos, Interface & Video Demo
              </h2>
              <span className="font-mono text-xs text-ink-faint">Section 08</span>
            </div>

            {project.evidence.gallery && project.evidence.gallery.length > 0 ? (
              <div className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-3">
                  {project.evidence.gallery.map((item, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="group relative overflow-hidden rounded-xl border border-hairline bg-black/40 aspect-video">
                        <img
                          src={encodeURI(item.url)}
                          alt={item.caption || `Evidence Photo ${idx + 1}`}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <a
                          href={encodeURI(item.url)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute bottom-2 right-2 flex items-center gap-1 rounded-md bg-black/75 px-2.5 py-1 font-mono text-[10px] text-cyan opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100 hover:text-white"
                        >
                          <ExternalLink size={10} /> View Full
                        </a>
                      </div>
                      {item.caption && (
                        <p className="text-xs font-mono text-ink-faint leading-relaxed">{item.caption}</p>
                      )}
                    </div>
                  ))}
                </div>

                {project.evidence.videoUrl && (
                  <div className="space-y-2 border-t border-hairline pt-6">
                    <div className="overflow-hidden rounded-xl border border-hairline bg-black/40 max-w-2xl mx-auto">
                      <video
                        src={encodeURI(project.evidence.videoUrl)}
                        controls
                        muted
                        autoPlay
                        loop
                        playsInline
                        className="aspect-video w-full object-cover"
                      />
                    </div>
                    {project.evidence.videoCaption && (
                      <p className="text-xs font-mono text-ink-faint text-center">
                        {project.evidence.videoCaption}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <div className="overflow-hidden rounded-xl border border-hairline bg-black/40">
                    <img
                      src={encodeURI(project.evidence.image)}
                      alt={project.title}
                      className="aspect-video w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <p className="text-xs font-mono text-ink-faint">{project.evidence.imageCaption}</p>
                </div>

                {project.evidence.videoUrl ? (
                  <div className="space-y-2">
                    <div className="overflow-hidden rounded-xl border border-hairline bg-black/40">
                      <video
                        src={encodeURI(project.evidence.videoUrl)}
                        controls
                        muted
                        autoPlay
                        loop
                        playsInline
                        className="aspect-video w-full object-cover"
                      />
                    </div>
                    <p className="text-xs font-mono text-ink-faint">{project.evidence.videoCaption}</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-hairline bg-white/5 p-6 text-center">
                    <Zap size={32} className="text-indigo-soft mb-2" />
                    <p className="font-mono text-xs text-ink-muted">Demonstration Recorded</p>
                    <p className="text-xs text-ink-faint mt-1">Hardware & Signal verified on Serial Terminal</p>
                  </div>
                )}
              </div>
            )}
          </section>

          {/* 9. CHALLENGES & FIXES */}
          <section className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-hairline pb-3">
              <h2 className="flex items-center gap-2 font-display text-xl text-ink font-semibold">
                <AlertTriangle size={20} className="text-amber-400" /> 9. Challenges Encountered & Solutions
              </h2>
              <span className="font-mono text-xs text-ink-faint">Section 09</span>
            </div>

            <div className="space-y-4">
              {project.challengesFixes.map((item, idx) => (
                <div key={idx} className="rounded-xl border border-hairline bg-canvas/60 p-4 space-y-2">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-amber-400">
                    <AlertTriangle size={14} className="flex-none" />
                    <span>Issue {idx + 1}: {item.problem}</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs sm:text-sm text-ink-muted pl-5">
                    <span className="font-mono text-emerald-400 font-bold flex-none">Fix:</span>
                    <span>{item.fix}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 10. REFLECTION */}
          <section className="glass-panel rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-hairline pb-3">
              <h2 className="flex items-center gap-2 font-display text-xl text-ink font-semibold">
                <ShieldCheck size={20} className="text-cyan" /> 10. Key Learnings & Reflection
              </h2>
              <span className="font-mono text-xs text-ink-faint">Section 10</span>
            </div>
            <p className="text-sm leading-relaxed text-ink-muted italic">
              &ldquo;{project.reflection}&rdquo;
            </p>
          </section>

          {/* 11. REPOSITORY LINK */}
          <section className="glass-panel rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-indigo-soft/30 bg-indigo/5">
            <div className="space-y-1 text-center sm:text-left">
              <h2 className="flex items-center justify-center sm:justify-start gap-2 font-display text-xl text-ink font-semibold">
                <Github size={20} className="text-cyan" /> 11. Complete Source Code Repository
              </h2>
              <p className="text-xs text-ink-muted">
                Access all Arduino C++ sketches, HTML interfaces, circuit schematics, and project documentation on GitHub.
              </p>
            </div>

            <a
              href={project.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-cyan bg-cyan/10 px-6 py-3 text-xs font-mono font-bold text-cyan transition-all hover:bg-cyan hover:text-canvas"
            >
              <Github size={16} /> Open GitHub Repository <ExternalLink size={14} />
            </a>
          </section>

          {/* Bottom Back Button */}
          <div className="pt-4 flex justify-center">
            <Link
              href="/protosem/week-7"
              className="inline-flex items-center gap-2 rounded-full border border-hairline bg-white/5 px-6 py-3 text-sm font-medium text-ink transition-all hover:border-indigo-soft hover:bg-white/10"
            >
              <ArrowLeft size={16} /> Back to Projects Dashboard
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
