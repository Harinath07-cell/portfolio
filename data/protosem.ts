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
    title: "Week 0 Report – ProtoSem Orientation & Team Building",
    image: "/images/protosem/week-00-simple.svg",
    fileLogImage: "/images/protosem/week-00-log-1.jpg",
    fileLogImages: [
      "/images/protosem/week-00-log-1.jpg",
      "/images/protosem/week-00-log-2.jpg"
    ],
    description:
      "Week 0 marked the beginning of my ProtoSem journey. The orientation sessions introduced me to the overall structure of ProtoSem and FORGE, their objectives, learning approach, and the different cohorts available. I gained a clear understanding of how ProtoSem focuses on experiential learning, innovation, collaboration, and personal development throughout the semester.",
    overview:
      "Week 0 marked the beginning of my ProtoSem journey. The orientation sessions introduced me to the overall structure of ProtoSem and FORGE, their objectives, learning approach, and the different cohorts available. I gained a clear understanding of how ProtoSem focuses on experiential learning, innovation, collaboration, and personal development throughout the semester.\n\nOne of the first activities was an Open Talk session, where each participant selected a comic from the ZincBook application and shared their thoughts with the group. I chose a comic based on travel and adventure because it reflected my interest in exploring new places, taking on challenges, and learning through experiences. This activity helped me improve my confidence while expressing my thoughts in front of others.\n\nAnother engaging activity was the Marshmallow Challenge. We were divided into different beta teams, and each team was provided with spaghetti sticks, thread, tape, and a marshmallow. Our objective was to construct the tallest free-standing structure that could support the marshmallow at its highest point. This activity emphasized teamwork, planning, communication, creativity, and iterative problem-solving. Working together under a time limit taught me the importance of collaboration and adapting ideas quickly.\n\nDuring the week, I also completed the 16 Personalities Assessment, where my personality type was identified as Protagonist (ENFJ). The assessment helped me better understand my strengths in leadership, communication, and motivating others while also highlighting areas for personal growth.\n\nOverall, Week 0 provided a strong foundation for my ProtoSem journey. It helped me understand the program's vision, interact with new teammates, improve my communication skills, and build confidence through various collaborative activities.",
    objectives: [
      "Understand the vision and structure of FORGE and ProtoSem.",
      "Learn about the different ProtoSem cohorts and their objectives.",
      "Build confidence through interactive activities.",
      "Improve teamwork and collaboration.",
      "Develop communication and presentation skills.",
      "Understand my personality traits through the 16 Personalities Assessment.",
    ],
    activitiesConducted: [
      "Orientation on FORGE and ProtoSem.",
      "Introduction to ProtoSem cohorts and their learning pathways.",
      "Open Talk session using a ZincBook comic.",
      "Marshmallow Challenge.",
      "16 Personalities Assessment.",
    ],
    technologies: ["5S Methodology", "16 Personalities Assessment", "Team Building", "ZincBook"],
    skillsLearned: [
      "Teamwork",
      "Communication",
      "Leadership",
      "Creativity",
      "Critical Thinking",
      "Problem Solving",
      "Collaboration",
      "Public Speaking",
      "Self-awareness",
      "Time Management",
    ],
    challenges:
      "Designing a stable Marshmallow Tower within strict time constraints while coordinating ideas with a newly formed team.",
    gallery: ["/images/protosem/week-01-a.jpg", "/images/protosem/week-01-b.jpg"],
    githubUrl: "https://github.com/Harinath07-cell",
  },
  {
    week: 1,
    title: "Week 1 Report – ProtoSem Orientation & Team Building",
    image: "/images/protosem/week-01.jpg",
    fileLogImage: "/images/protosem/week-01.jpg",
    description:
      "Week 1 marked the continuation of my ProtoSem journey. The orientation sessions introduced me to the overall structure of ProtoSem and FORGE, their objectives, learning approach, and the different cohorts available. I gained a clear understanding of how ProtoSem focuses on experiential learning, innovation, collaboration, and personal development throughout the semester.",
    overview:
      "Week 0 marked the beginning of my ProtoSem journey. The orientation sessions introduced me to the overall structure of ProtoSem and FORGE, their objectives, learning approach, and the different cohorts available. I gained a clear understanding of how ProtoSem focuses on experiential learning, innovation, collaboration, and personal development throughout the semester.\n\nOne of the first activities was an Open Talk session, where each participant selected a comic from the ZincBook application and shared their thoughts with the group. I chose a comic based on travel and adventure because it reflected my interest in exploring new places, taking on challenges, and learning through experiences. This activity helped me improve my confidence while expressing my thoughts in front of others.\n\nAnother engaging activity was the Marshmallow Challenge. We were divided into different beta teams, and each team was provided with spaghetti sticks, thread, tape, and a marshmallow. Our objective was to construct the tallest free-standing structure that could support the marshmallow at its highest point. This activity emphasized teamwork, planning, communication, creativity, and iterative problem-solving. Working together under a time limit taught me the importance of collaboration and adapting ideas quickly.\n\nDuring the week, I also completed the 16 Personalities Assessment, where my personality type was identified as Protagonist (ENFJ). The assessment helped me better understand my strengths in leadership, communication, and motivating others while also highlighting areas for personal growth.\n\nOverall, Week 0 provided a strong foundation for my ProtoSem journey. It helped me understand the program's vision, interact with new teammates, improve my communication skills, and build confidence through various collaborative activities.",
    objectives: [
      "Understand the vision and structure of FORGE and ProtoSem.",
      "Learn about the different ProtoSem cohorts and their objectives.",
      "Build confidence through interactive activities.",
      "Improve teamwork and collaboration.",
      "Develop communication and presentation skills.",
      "Understand my personality traits through the 16 Personalities Assessment.",
    ],
    activitiesConducted: [
      "Orientation on FORGE and ProtoSem.",
      "Introduction to ProtoSem cohorts and their learning pathways.",
      "Open Talk session using a ZincBook comic.",
      "Marshmallow Challenge.",
      "16 Personalities Assessment.",
    ],
    technologies: ["5S Methodology", "16 Personalities Assessment", "Team Building", "ZincBook"],
    skillsLearned: [
      "Teamwork",
      "Communication",
      "Leadership",
      "Creativity",
      "Critical Thinking",
      "Problem Solving",
      "Collaboration",
      "Public Speaking",
      "Self-awareness",
      "Time Management",
    ],
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
