import { Project } from "@/types";

/**
 * Add / edit projects here. Each card renders automatically from this array —
 * drop a screenshot into /public/images/projects and point `image` at it.
 */
export const projects: Project[] = [
  {
    id: "career-recommendation",
    title: "Career Recommendation System",
    description:
      "An intelligent career guidance platform that helps students discover personalized career paths based on their interests, strengths, and aspirations.",
    image: "/images/projects/project-placeholder.svg",
    stack: ["Python", "React", "SQL", "AI Recommendation"],
    type: "AI Platform",
    githubUrl: "https://github.com/Harinath07-cell/career-recommendation",
    caseStudyUrl: "https://harinath.dev/case-study/career-recommendation",
    featured: true,
    caseStudy: {
      title: "Career Recommendation System",
      overview:
        "The Career Recommendation System is an intelligent web application that guides students toward career paths matching their strengths, interests, and ambitious goals.",
      problem:
        "Students are often overwhelmed by too many choices and receive generic advice that does not reflect their personality or skill profile.",
      solution:
        "I built a personalized web experience where user inputs are processed into meaningful career suggestions, recommended skills, and an actionable roadmap for learning.",
      features: [
        "Personalized career recommendations",
        "Skill-based matching",
        "Career roadmap generation",
        "Responsive web experience",
      ],
      stack: ["HTML", "CSS", "JavaScript", "Bootstrap", "Python", "MySQL"],
      learnings: [
        "Recommendation systems",
        "Full-stack development",
        "Database design",
        "User-centered design",
      ],
    },
  },
  {
    id: "sals",
    title: "Smart Adaptive Lighting System (SALS)",
    description:
      "An AI and IoT-based adaptive lighting system designed to assist students with Autism Spectrum Disorder by dynamically adjusting environmental lighting according to sensory requirements.",
    image: "/images/projects/project-placeholder.svg",
    stack: ["IoT", "Python", "Sensors", "AI"],
    type: "IoT",
    githubUrl: "https://github.com/Harinath07-cell/sals",
    liveUrl: "https://harinath.dev/sals",
    caseStudyUrl: "https://harinath.dev/case-study/sals",
    featured: true,
    caseStudy: {
      title: "Smart Adaptive Lighting System (SALS)",
      overview:
        "SALS is an inclusive IoT project that makes classrooms more sensory-friendly by adapting lighting in real time to the comfort needs of students.",
      problem:
        "Static classroom lighting often creates sensory overload for students with ASD, especially when brightness changes abruptly or remains too intense.",
      solution:
        "The system uses environmental sensing and automation to adjust brightness dynamically while keeping the experience personalized and energy-efficient.",
      features: [
        "Adaptive brightness control",
        "Ambient light monitoring",
        "Personalized lighting profiles",
        "Real-time environmental sensing",
      ],
      stack: ["ESP32", "Arduino", "Python", "Light Sensors", "Automation"],
      learnings: [
        "IoT systems",
        "AI automation",
        "Embedded systems",
        "Human-centered design",
      ],
    },
  },
  {
    id: "capacitor-quality-analyser",
    title: "Capacitor Quality Analyser",
    description:
      "An intelligent inspection system capable of identifying physical damage in electrolytic capacitors using image processing and AI-assisted defect detection techniques.",
    image: "/images/projects/project-placeholder.svg",
    stack: ["Python", "OpenCV", "Image Processing", "AI"],
    type: "Computer Vision",
    githubUrl: "https://github.com/Harinath07-cell/capacitor-quality-analyser",
    liveUrl: "https://harinath.dev/capacitor-quality-analyser",
    caseStudyUrl: "https://harinath.dev/case-study/capacitor-quality-analyser",
    caseStudy: {
      title: "Capacitor Quality Analyser",
      overview:
        "The Capacitor Quality Analyser automates visual inspection of electrolytic capacitors, reducing manual effort and improving consistency in quality control workflows.",
      problem:
        "Traditional inspection is slow, inconsistent, and highly dependent on the human eye, especially when defects like bulging and leakage are subtle.",
      solution:
        "I developed a computer vision pipeline that identifies visible physical defects through image processing and supports faster decision-making in inspection routines.",
      features: [
        "Automated visual inspection",
        "Physical defect detection",
        "Image processing workflow",
        "Quality classification",
      ],
      stack: ["Python", "OpenCV", "NumPy", "Computer Vision", "Image Processing"],
      learnings: [
        "Computer vision",
        "Image processing",
        "Industrial AI",
        "Quality assurance",
      ],
    },
  },
];
