export interface Skill {
  name: string;
  level: number; // 0-100, used for the progress indicator
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string; // key resolved in components/ui/IconMap.tsx
  skills: Skill[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  stack: string[];
  type?: string;
  githubUrl?: string;
  liveUrl?: string;
  caseStudyUrl?: string;
  featured?: boolean;
  caseStudy?: {
    title: string;
    overview: string;
    problem: string;
    solution: string;
    features: string[];
    stack: string[];
    learnings: string[];
  };
}

export interface ExperienceItem {
  id: string;
  role: string;
  organisation: string;
  affiliation?: string;
  duration?: string;
  description: string;
}

export interface ProtosemWeek {
  week: number;
  title: string;
  image: string;
  description: string;
  overview?: string;
  objectives?: string[];
  activitiesConducted?: string[];
  technologies: string[];
  skillsLearned: string[];
  challenges: string;
  gallery: string[];
  githubUrl?: string;
  fileLogImage?: string;
  fileLogImages?: string[];
}
