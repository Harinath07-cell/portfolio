"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Copy,
  Download,
  ExternalLink,
  Github,
  Info,
  ShieldAlert,
  Terminal,
} from "lucide-react";
import type { Block, ProjectDetail } from "../projects-data";

export interface MediaFile {
  url: string;
  caption: string;
  /** raw text, only for CSV slots */
  text?: string;
}

interface TaskDetailClientProps {
  project: ProjectDetail;
  codeFiles: Record<string, string>;
  mediaFiles: Record<string, MediaFile[]>;
}

function CodeBlock({
  title,
  lang,
  caption,
  code,
}: {
  title: string;
  lang: string;
  caption?: string;
  code: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    try {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="space-y-2">
      <div className="overflow-hidden rounded-2xl border border-hairline bg-[#0D1117] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 bg-[#161B22] px-4 py-3">
          <div className="flex min-w-0 items-center gap-2">
            <span className="inline-block h-3 w-3 flex-none rounded-full bg-red-500/80" />
            <span className="inline-block h-3 w-3 flex-none rounded-full bg-yellow-500/80" />
            <span className="inline-block h-3 w-3 flex-none rounded-full bg-green-500/80" />
            <span className="ml-2 flex min-w-0 items-center gap-1.5 truncate font-mono text-xs text-slate-400">
              <Terminal size={12} className="flex-none text-cyan" /> {title}
              <span className="ml-2 rounded bg-white/5 px-1.5 py-0.5 text-[10px] uppercase text-slate-500">{lang}</span>
            </span>
          </div>
          <button
            onClick={copy}
            className="inline-flex flex-none items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            {copied ? (
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
        <div className="max-h-[560px] overflow-auto p-4 font-mono text-xs leading-relaxed text-emerald-400/90 sm:p-6 sm:text-sm">
          <pre>{code}</pre>
        </div>
      </div>
      {caption && <p className="font-mono text-xs text-ink-faint">{caption}</p>}
    </div>
  );
}

function parseCsv(text: string): string[][] {
  return text
    .split(/\r?\n/)
    .filter((line) => line.trim().length > 0)
    .map((line) => {
      const cells: string[] = [];
      let cell = "";
      let quoted = false;
      for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (ch === '"') {
          if (quoted && line[i + 1] === '"') {
            cell += '"';
            i++;
          } else {
            quoted = !quoted;
          }
        } else if (ch === "," && !quoted) {
          cells.push(cell);
          cell = "";
        } else {
          cell += ch;
        }
      }
      cells.push(cell);
      return cells;
    });
}

function CsvPreview({ file }: { file: MediaFile }) {
  const rows = parseCsv(file.text ?? "");
  const [header, ...body] = rows;
  const fileName = decodeURIComponent(file.url.split("/").pop() ?? "data.csv");

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-xs text-ink-faint">
          {fileName} — {body.length} recorded readings
        </p>
        <a
          href={file.url}
          download
          className="inline-flex items-center gap-2 rounded-full border border-cyan/40 bg-cyan/10 px-4 py-1.5 font-mono text-xs font-medium text-cyan transition-all hover:bg-cyan hover:text-canvas"
        >
          <Download size={13} /> Download the CSV file
        </a>
      </div>
      {header && (
        <div className="max-h-[480px] overflow-auto rounded-xl border border-hairline">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="sticky top-0 border-b border-hairline bg-surface-2 font-mono text-xs uppercase tracking-wider text-cyan">
              <tr>
                {header.map((h) => (
                  <th key={h} className="whitespace-nowrap px-4 py-3">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline text-ink-muted">
              {body.map((row, r) => (
                <tr key={r} className="transition-colors hover:bg-white/5">
                  {row.map((cell, c) => (
                    <td key={c} className={`whitespace-nowrap px-4 py-2.5 ${c === 0 ? "font-mono text-ink" : ""}`}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function MediaBlock({
  slot,
  project,
  mediaFiles,
}: {
  slot: string;
  project: ProjectDetail;
  mediaFiles: Record<string, MediaFile[]>;
}) {
  const def = project.media[slot];
  const files = mediaFiles[slot] ?? [];
  if (!def) return null;

  // Slots without uploaded files are hidden (see visibleSections below).
  if (files.length === 0) return null;

  if (def.kind === "csv") {
    return (
      <div className="space-y-6">
        {files.map((file) => (
          <CsvPreview key={file.url} file={file} />
        ))}
      </div>
    );
  }

  if (def.kind === "video") {
    return (
      <div className="grid gap-5 sm:grid-cols-2">
        {files.map((file) => (
          <div key={file.url} className="space-y-2">
            <div className="overflow-hidden rounded-xl border border-hairline bg-black/40">
              <video src={file.url} controls playsInline preload="metadata" className="aspect-video w-full object-contain" />
            </div>
            <p className="font-mono text-xs text-ink-faint">{file.caption}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {files.map((file) => (
        <figure key={file.url} className="space-y-2">
          <div className="group relative overflow-hidden rounded-xl border border-hairline bg-black/40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={file.url}
              alt={file.caption}
              loading="lazy"
              className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <a
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-2 right-2 flex items-center gap-1 rounded-md bg-black/75 px-2.5 py-1 font-mono text-[10px] text-cyan opacity-0 backdrop-blur-md transition-opacity hover:text-white group-hover:opacity-100"
            >
              <ExternalLink size={10} /> View full
            </a>
          </div>
          <figcaption className="font-mono text-xs leading-relaxed text-ink-faint">{file.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}

function RenderBlock({
  block,
  project,
  codeFiles,
  mediaFiles,
}: {
  block: Block;
  project: ProjectDetail;
  codeFiles: Record<string, string>;
  mediaFiles: Record<string, MediaFile[]>;
}) {
  switch (block.type) {
    case "p":
      return <p className="text-sm leading-relaxed text-ink-muted sm:text-base">{block.text}</p>;

    case "list":
      return (
        <ul className="space-y-2 text-sm text-ink-muted">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <CheckCircle2 size={15} className="mt-0.5 flex-none text-cyan" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      );

    case "steps":
      return (
        <ol className="space-y-2.5">
          {block.items.map((item, i) => (
            <li key={item} className="flex items-start gap-3 rounded-xl border border-hairline bg-canvas/60 p-3.5">
              <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-cyan/10 font-mono text-xs font-bold text-cyan">
                {i + 1}
              </span>
              <span className="pt-0.5 text-sm leading-relaxed text-ink-muted">{item}</span>
            </li>
          ))}
        </ol>
      );

    case "table":
      return (
        <div className="space-y-2">
          <div className="overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="border-b border-hairline bg-white/5 font-mono text-xs uppercase tracking-wider text-cyan">
                <tr>
                  {block.headers.map((h, i) => (
                    <th key={`${h}-${i}`} className="px-4 py-3">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline text-ink-muted">
                {block.rows.map((row, r) => (
                  <tr key={r} className="transition-colors hover:bg-white/5">
                    {row.map((cell, c) => (
                      <td
                        key={c}
                        className={`px-4 py-3 align-top leading-relaxed ${c === 0 ? "font-mono font-semibold text-ink" : ""}`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.caption && <p className="font-mono text-xs text-ink-faint">{block.caption}</p>}
        </div>
      );

    case "diagram":
      return (
        <div className="space-y-2">
          <div className="overflow-x-auto rounded-xl border border-hairline bg-[#0D1117] p-5 font-mono text-xs leading-relaxed text-cyan sm:text-sm">
            <pre>{block.text}</pre>
          </div>
          {block.caption && <p className="font-mono text-xs text-ink-faint">{block.caption}</p>}
        </div>
      );

    case "cards":
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          {block.items.map((card) => (
            <div key={card.title} className="space-y-2 rounded-xl border border-hairline bg-canvas/50 p-4 sm:p-5">
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-display text-sm font-semibold text-ink">{card.title}</h4>
                {card.subtitle && (
                  <span className="flex-none rounded-full border border-cyan/20 bg-cyan/10 px-2 py-0.5 font-mono text-[10px] text-cyan">
                    {card.subtitle}
                  </span>
                )}
              </div>
              <p className="text-xs leading-relaxed text-ink-muted sm:text-sm">{card.text}</p>
            </div>
          ))}
        </div>
      );

    case "image":
      return (
        <figure className="space-y-2">
          <div className="group relative overflow-hidden rounded-xl border border-hairline bg-black/40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={block.src} alt={block.caption} className="h-auto max-h-[520px] w-full object-contain" />
            <a
              href={block.src}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-2 right-2 flex items-center gap-1 rounded-md bg-black/75 px-2.5 py-1 font-mono text-[10px] text-cyan opacity-0 backdrop-blur-md transition-opacity hover:text-white group-hover:opacity-100"
            >
              <ExternalLink size={10} /> View full
            </a>
          </div>
          <figcaption className="font-mono text-xs text-ink-faint">{block.caption}</figcaption>
        </figure>
      );

    case "callout": {
      const warn = block.title.toLowerCase() === "safety";
      return (
        <div
          className={`flex items-start gap-3 rounded-xl border p-4 ${
            warn ? "border-amber/40 bg-amber/5" : "border-cyan/30 bg-cyan/5"
          }`}
        >
          {warn ? (
            <ShieldAlert size={18} className="mt-0.5 flex-none text-amber" />
          ) : (
            <Info size={18} className="mt-0.5 flex-none text-cyan" />
          )}
          <div className="space-y-1">
            <p className={`font-mono text-xs font-semibold ${warn ? "text-amber" : "text-cyan"}`}>{block.title}</p>
            <p className="text-sm leading-relaxed text-ink-muted">{block.text}</p>
          </div>
        </div>
      );
    }

    case "code":
      return (
        <CodeBlock
          title={block.title}
          lang={block.lang}
          caption={block.caption}
          code={codeFiles[block.file] ?? ""}
        />
      );

    case "media":
      return <MediaBlock slot={block.slot} project={project} mediaFiles={mediaFiles} />;
  }
}

export default function TaskDetailClient({ project, codeFiles, mediaFiles }: TaskDetailClientProps) {
  const [showChecklist, setShowChecklist] = useState(true);

  const hasFiles = (slot: string) => (mediaFiles[slot]?.length ?? 0) > 0;

  // Evidence sections with no uploaded files (and their checklist items) are not shown.
  const visibleSections = project.sections
    .map((section) => ({
      ...section,
      blocks: section.blocks.filter((block) => block.type !== "media" || hasFiles(block.slot)),
    }))
    .filter((section) => section.blocks.length > 0);
  const items = project.checklist.filter((item) => !item.slot || hasFiles(item.slot));

  return (
    <div className="min-h-screen bg-canvas text-ink selection:bg-indigo/30 selection:text-ink">
      <div aria-hidden className="noise-overlay" />

      <header className="sticky top-0 z-50 border-b border-hairline bg-canvas/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link
            href="/protosem/week-7"
            className="inline-flex items-center gap-2 rounded-full border border-hairline bg-white/5 px-3.5 py-1.5 text-xs font-medium text-ink-muted transition-colors hover:border-indigo-soft hover:text-ink"
          >
            <ArrowLeft size={14} /> <span className="hidden sm:inline">Back to Week 7 Dashboard</span>
            <span className="sm:hidden">Week 7</span>
          </Link>
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-cyan">
            ProtoSem · Week 07 · Task {project.num}
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="space-y-10">
          {/* Title */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-hairline bg-white/5 px-3 py-1 font-mono text-xs text-indigo-soft">
              {project.category}
            </div>
            <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl lg:text-5xl">{project.title}</h1>
            <p className="max-w-4xl text-base leading-relaxed text-ink-muted sm:text-lg">{project.shortIntro}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={project.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-hairline bg-white/5 px-4 py-2 font-mono text-xs font-medium text-ink-muted transition-colors hover:border-cyan hover:text-cyan"
              >
                <Github size={14} /> Repository <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {/* Cover page */}
          <div className="overflow-hidden rounded-2xl border border-hairline bg-black/40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={encodeURI(project.coverImage)}
              alt={`${project.title} cover`}
              className="h-auto max-h-[480px] w-full object-contain"
            />
          </div>

          {/* Checklist coverage */}
          <section className="glass-panel space-y-4 rounded-2xl p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-xl font-semibold text-ink">Assignment Checklist</h2>
                <p className="mt-1 text-xs text-ink-muted">
                  Each requirement links to the section that covers it.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-ink-muted">{items.length} requirements covered</span>
                <button
                  onClick={() => setShowChecklist((v) => !v)}
                  className="rounded-full border border-hairline px-3 py-1 font-mono text-xs text-ink-muted transition-colors hover:text-ink"
                >
                  {showChecklist ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            {showChecklist && (
              <ul className="grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
                {items.map((item, i) => (
                  <li key={`${item.label}-${i}`}>
                    <a
                      href={`#${item.section}`}
                      className="flex items-start gap-2 rounded-lg px-2 py-1.5 text-sm text-ink-muted transition-colors hover:bg-white/5 hover:text-ink"
                    >
                      <CheckCircle2 size={15} className="mt-0.5 flex-none text-cyan" />
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Sections */}
          {visibleSections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              className="glass-panel scroll-mt-24 space-y-5 rounded-2xl p-6 sm:p-8"
            >
              <div className="flex items-center justify-between gap-3 border-b border-hairline pb-3">
                <h2 className="font-display text-lg font-semibold text-ink sm:text-xl">{section.title}</h2>
                <span className="flex-none font-mono text-xs text-ink-faint">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              {section.blocks.map((block, i) => (
                <RenderBlock
                  key={i}
                  block={block}
                  project={project}
                  codeFiles={codeFiles}
                  mediaFiles={mediaFiles}
                />
              ))}
            </section>
          ))}

          {/* Repository */}
          <section
            id="repo"
            className="glass-panel flex scroll-mt-24 flex-col items-center justify-between gap-6 rounded-2xl border-indigo-soft/30 bg-indigo/5 p-6 sm:flex-row sm:p-8"
          >
            <div className="space-y-1 text-center sm:text-left">
              <h2 className="flex items-center justify-center gap-2 font-display text-xl font-semibold text-ink sm:justify-start">
                <Github size={20} className="text-cyan" /> Repository
              </h2>
              <p className="text-xs text-ink-muted">
                All required source code and project files for this task are available on its branch of the IoT-Connectivity repository.
              </p>
            </div>
            <a
              href={project.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-cyan bg-cyan/10 px-6 py-3 font-mono text-xs font-bold text-cyan transition-all hover:bg-cyan hover:text-canvas"
            >
              <Github size={16} /> Open GitHub Repository <ExternalLink size={14} />
            </a>
          </section>

          <div className="flex justify-center pt-4">
            <Link
              href="/protosem/week-7"
              className="inline-flex items-center gap-2 rounded-full border border-hairline bg-white/5 px-6 py-3 text-sm font-medium text-ink transition-all hover:border-indigo-soft hover:bg-white/10"
            >
              <ArrowLeft size={16} /> Back to Week 7 Dashboard
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
