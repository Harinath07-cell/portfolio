import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { PROJECTS, getProjectBySlug, type ProjectDetail } from "../projects-data";
import TaskDetailClient, { type MediaFile } from "./TaskDetailClient";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({
    taskId: p.slug,
  }));
}

interface PageProps {
  params: {
    taskId: string;
  };
}

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp", ".avif", ".svg"]);
const VIDEO_EXT = new Set([".mp4", ".webm", ".mov", ".m4v"]);

function captionFromName(name: string): string {
  return name
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Lists the evidence files dropped into public/week-7/<slug>/<slot>/ (sorted by name). */
function scanSlot(slug: string, slot: string, kind: "image" | "video"): MediaFile[] {
  const dir = path.join(process.cwd(), "public", "week-7", slug, slot);
  if (!fs.existsSync(dir)) return [];
  const allowed = kind === "video" ? VIDEO_EXT : IMAGE_EXT;
  return fs
    .readdirSync(dir)
    .filter((name) => allowed.has(path.extname(name).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((name) => ({
      url: `/week-7/${slug}/${slot}/${encodeURIComponent(name)}`,
      caption: captionFromName(name),
    }));
}

function loadCode(project: ProjectDetail): Record<string, string> {
  const files: Record<string, string> = {};
  for (const section of project.sections) {
    for (const block of section.blocks) {
      if (block.type === "code" && !(block.file in files)) {
        const file = path.join(process.cwd(), "content", "week-7", "code", block.file);
        files[block.file] = fs.existsSync(file)
          ? fs.readFileSync(file, "utf-8")
          : `// ${block.file} not found in content/week-7/code`;
      }
    }
  }
  return files;
}

export default function TaskDetailPage({ params }: PageProps) {
  const project = getProjectBySlug(params.taskId);

  if (!project) {
    notFound();
  }

  const mediaFiles: Record<string, MediaFile[]> = {};
  for (const [slot, def] of Object.entries(project.media)) {
    mediaFiles[slot] = scanSlot(project.slug, slot, def.kind);
  }

  return (
    <TaskDetailClient
      project={project}
      codeFiles={loadCode(project)}
      mediaFiles={mediaFiles}
    />
  );
}
