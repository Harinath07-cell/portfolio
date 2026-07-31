import { ProtosemWeek } from "@/types";

/**
 * PROTOSEM INTERNSHIP LOG
 * -----------------------
 * The dashboard in components/sections/Protosem.tsx reads this array only —
 * the layout, timeline, search and pagination never need to change.
 *
 * To log a new week, copy the object shape below and push it into the array.
 * `week` just needs to be a unique number; the dashboard sorts and paginates
 * automatically, so weeks can be added in any order and at any pace across
 * the full 24-week internship.
 */
export const protosemInfo = {
  organisation: "Protosem",
  role: "Innovation Engineer Intern",
  duration: "6 Months",
  totalWeeks: 24,
};

export const protosemWeeks: ProtosemWeek[] = [
  {
    week: 0,
    title: "Beginning the Innovation Journey",
    image: "/images/protosem/week-00-simple.svg",
    description:
      "The first week at ProtoSem focused on collaboration, self-discovery, and workplace fundamentals through interactive challenges and hands-on learning, laying the foundation for the journey ahead.",
    technologies: ["5S Methodology", "16 Personalities Assessment", "Team Building"],
    skillsLearned: ["Teamwork", "Communication", "Critical Thinking", "Problem Solving", "Creativity", "Time Management"],
    challenges:
      "Designing a stable Marshmallow Tower within strict time constraints while coordinating ideas with a newly formed team.",
    gallery: ["/images/protosem/week-01-a.jpg", "/images/protosem/week-01-b.jpg"],
    githubUrl: "https://github.com/Harinath07-cell",
  },
  {
    week: 1,
    title: "Onboarding & Innovation Sprint Kickoff",
    image: "/images/protosem/week-01.jpg",
    description:
      "Joined the Protosem innovation floor, got introduced to the product pods, and mapped out the rapid-prototyping workflow used across active projects.",
    technologies: ["Figma", "Notion", "Design Thinking Canvas"],
    skillsLearned: ["Design thinking fundamentals", "Cross-functional collaboration"],
    challenges:
      "Adjusting to an ambiguity-first workflow where problems are explored before solutions are proposed.",
    gallery: ["/images/protosem/week-01-a.jpg", "/images/protosem/week-01-b.jpg"],
    githubUrl: "https://github.com/Harinath07-cell",
  },
  {
    week: 2,
    title: "First Rapid Prototype",
    image: "/images/protosem/week-02.jpg",
    description:
      "Built a clickable prototype for an internal tooling idea in under three days, then ran a stakeholder walkthrough to gather early feedback.",
    technologies: ["React", "Tailwind CSS", "Figma"],
    skillsLearned: ["Rapid prototyping", "Stakeholder communication"],
    challenges:
      "Balancing prototype fidelity with speed — learning when 'good enough' actually is.",
    gallery: ["/images/protosem/week-02-a.jpg"],
    githubUrl: "https://github.com/Harinath07-cell",
  },
  {
    week: 3,
    title: "User Research Deep-Dive",
    image: "/images/protosem/week-03.jpg",
    description:
      "Conducted structured interviews with end users, synthesised findings into an affinity map, and translated insights into three actionable feature bets.",
    technologies: ["Miro", "Google Forms", "Notion"],
    skillsLearned: ["User interviewing", "Insight synthesis"],
    challenges:
      "Separating what users say they want from the underlying problem they're actually describing.",
    gallery: ["/images/protosem/week-03-a.jpg", "/images/protosem/week-03-b.jpg"],
  },
  // Weeks 4–24: add new entries here as the internship progresses.
];
