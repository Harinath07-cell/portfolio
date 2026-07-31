import { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    id: "soft-skills",
    title: "Soft Skills",
    icon: "sparkles",
    skills: [
      { name: "Problem Solving", level: 92 },
      { name: "Leadership", level: 88 },
      { name: "Collaboration", level: 90 },
      { name: "Adaptability", level: 91 },
      { name: "Communication", level: 89 },
    ],
  },
  {
    id: "languages",
    title: "Programming Languages",
    icon: "code",
    skills: [
      { name: "Python", level: 88 },
      { name: "C", level: 78 },
      { name: "JavaScript", level: 85 },
      { name: "SQL", level: 80 },
    ],
  },
  {
    id: "markup",
    title: "Markup & Styling",
    icon: "layout",
    skills: [
      { name: "HTML5", level: 92 },
      { name: "CSS3", level: 88 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Bootstrap", level: 75 },
    ],
  },
  {
    id: "frameworks",
    title: "Frameworks",
    icon: "layers",
    skills: [{ name: "React", level: 85 }],
  },
  {
    id: "databases",
    title: "Databases",
    icon: "database",
    skills: [
      { name: "MySQL", level: 80 },
      { name: "SQLite", level: 78 },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    icon: "wrench",
    skills: [
      { name: "Git", level: 85 },
      { name: "GitHub", level: 88 },
      { name: "Docker", level: 65 },
      { name: "Figma", level: 72 },
    ],
  },
];
