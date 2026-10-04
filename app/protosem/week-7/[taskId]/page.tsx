import { notFound } from "next/navigation";
import { PROJECTS, getProjectBySlug } from "../projects-data";
import TaskDetailClient from "./TaskDetailClient";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({
    taskId: p.slug
  }));
}

interface PageProps {
  params: {
    taskId: string;
  };
}

export default function TaskDetailPage({ params }: PageProps) {
  const project = getProjectBySlug(params.taskId);

  if (!project) {
    notFound();
  }

  return <TaskDetailClient project={project} />;
}
