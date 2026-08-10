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
      "An introductory week focused on ProtoSem, FORGE, teamwork, and personal development.",
    overview:
      "The orientation introduced the ProtoSem and FORGE learning approach, with a focus on innovation, collaboration, and experiential learning.\n\nAn Open Talk, the Marshmallow Challenge, and the 16 Personalities assessment strengthened my communication, teamwork, problem-solving, and self-awareness.",
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
    title: "Week 1 Report – 5S Implementation & Professional Development",
    image: "/images/protosem/week-01-a.jpg",
    description:
      "Implemented 5S practices, recovered and tested electronic components, and developed a professional portfolio website.",
    overview:
      "I applied 5S workplace practices with the Battery Team by inspecting and organising battery adapters. The work reinforced systematic organisation, responsibility, teamwork, and attention to detail.\n\nAt the desoldering workstation, I safely recovered components from used circuit boards and tested smoke sensors. I also built my portfolio website to present my skills, projects, certifications, and achievements professionally.",
    objectives: [
      "Apply the 5S workplace methodology.",
      "Build teamwork and workplace organisation skills.",
      "Gain hands-on experience recovering and testing electronic components.",
      "Develop a professional portfolio to showcase skills and projects.",
    ],
    activitiesConducted: [
      "Inspected and organised battery adapters using 5S practices.",
      "Desoldered components from used circuit boards.",
      "Tested recovered smoke sensors.",
      "Designed and developed a personal portfolio website.",
    ],
    technologies: ["5S Methodology", "Battery Management", "Desoldering", "Smoke Sensor Testing", "HTML & CSS"],
    skillsLearned: [
      "Teamwork",
      "Communication",
      "Workplace Organisation",
      "Attention to Detail",
      "Basic Desoldering",
      "Component Testing",
      "Web Development",
      "Portfolio Design",
    ],
    challenges:
      "Accurately organising battery adapters, desoldering components without damage, testing smoke sensors safely, and presenting portfolio content clearly.",
    gallery: ["/images/protosem/week-01-a.jpg", "/images/protosem/week-01-b.jpg"],
    githubUrl: "https://github.com/Harinath07-cell/portfolio",
    reportImages: ["/images/protosem/week-01-a.jpg", "/images/protosem/week-01-b.jpg"],
    assignmentPoints: [
      "Implement 5S practices by inspecting and organising battery adapters.",
      "Recover electronic components through safe desoldering and test smoke sensors.",
      "Create a professional portfolio website showcasing skills, projects, certifications, and achievements.",
    ],
  },
  {
    week: 2,
    title: "Week 2 Report – Innovation, Programming & Mobile Application Development",
    image: "/images/protosem/week-02-expert-session.jpg",
    fileLogImage: "/images/protosem/week-02-hostel-tracker.png",
    fileLogImages: [
      "/images/protosem/week-02-hostel-tracker.png",
      "/images/protosem/week-02-scratch-dino.png"
    ],
    description:
      "Explored innovation & Lean Spark with Mukesh, mastered 'Think Like a Coder' problem analysis, built a Scratch Dinosaur game, developed the Hostel Complaint Tracker on MIT App Inventor with Firebase, and studied Applied Design Thinking.",
    overview:
      "Week 2 focused on innovation, logical problem-solving, programming, game development, and mobile application development. The week was highly practical, and I applied concepts through different interactive activities and real-world projects.\n\nThe week began with an expert session by Mukesh, author of Lean Spark, providing insights into innovation, entrepreneurship, and converting ideas into practical solutions. We then learned algorithms, flowcharts, and Python basics, using the 'Think Like a Coder' approach to analyze 5 problem statements, design algorithms, and draw flowcharts before writing code.\n\nIn Scratch, I developed a Dinosaur Shooting Game with scoring mechanics, a 5-life system, and game-over logic. Following this, I developed the Hostel Complaint Tracker app in MIT App Inventor with Firebase integration to replace paper complaints with a transparent digital workflow.\n\nComplaint Workflow:\nStudent → Warden → Hostel Head → Maintenance Staff → Warden → Student.\n\nKey Roles & Features: Role-based dashboards for Students, Wardens, Hostel Heads, and Maintenance Staff with photo proof registration, staff assignment, progress tracking, and reopen options. The week concluded with an Applied Design Thinking session by the VP of FORGE, connecting user needs with practical solution development.",
    objectives: [
      "Understand innovation, entrepreneurship, and product development from Lean Spark insights.",
      "Apply 'Think Like a Coder' approach to analyze 5 problem statements, design algorithms, and draw flowcharts.",
      "Develop a Dinosaur Shooting Game in Scratch with scoring, 5-life system, and game-over mechanics.",
      "Build a Hostel Complaint Tracker mobile app in MIT App Inventor with Firebase integration.",
      "Implement a 6-stage role-based complaint workflow (Student → Warden → Hostel Head → Maintenance Staff → Warden → Student).",
      "Learn Applied Design Thinking principles from FORGE VP session to map user pain points to solutions.",
    ],
    activitiesConducted: [
      "Attended expert session on Innovation & Lean Spark by Mukesh.",
      "Analyzed 5 problem statements, designing step-by-step algorithms and flowcharts using 'Think Like a Coder'.",
      "Developed Dinosaur Shooting Game in Scratch with life counters and scoring logic.",
      "Designed and developed Hostel Complaint Tracker mobile app in MIT App Inventor.",
      "Configured Firebase database for real-time complaint data storage and status updates.",
      "Attended Applied Design Thinking workshop conducted by Vice President of FORGE.",
    ],
    technologies: [
      "Python",
      "Algorithm & Flowchart",
      "Scratch",
      "MIT App Inventor",
      "Firebase",
      "Design Thinking",
      "Computational Thinking"
    ],
    skillsLearned: [
      "Problem Analysis",
      "Algorithm Design",
      "Flowchart Creation",
      "Computational Thinking",
      "Python Fundamentals",
      "Visual Programming",
      "Game Development",
      "MIT App Inventor",
      "Mobile Application Development",
      "Firebase Database Integration",
      "UI/UX Design",
      "Design Thinking",
      "Product Development",
    ],
    challenges:
      "Converting problem statements into step-by-step algorithms before coding, developing game logic (lives, score, game-over) in Scratch, designing a structured 6-step multi-role workflow in MIT App Inventor, and managing real-time data storage in Firebase.",
    reportImages: [
      "/images/protosem/week-02-expert-session.jpg",
      "/images/protosem/week-02-workshop.jpg",
      "/images/protosem/week-02-scratch-dino.png",
      "/images/protosem/week-02-hostel-tracker.png",
      "/images/protosem/week-02-app-design.jpeg"
    ],
    gallery: [
      "/images/protosem/week-02-expert-session.jpg",
      "/images/protosem/week-02-workshop.jpg",
      "/images/protosem/week-02-scratch-dino.png",
      "/images/protosem/week-02-hostel-tracker.png",
      "/images/protosem/week-02-app-design.jpeg"
    ],
    githubUrl: "https://github.com/Harinath07-cell",
    assignmentPoints: [
      "Problem Analysis & Algorithms: Analyzed 5 problem statements using the 'Think Like a Coder' approach, creating algorithms and flowcharts before coding.",
      "Scratch Game Development: Built a Dinosaur Shooting Game in Scratch featuring scoring mechanics, a 5-life limit system, and game-over logic.",
      "Mobile Application Development: Developed the Hostel Complaint Tracker app using MIT App Inventor with real-time Firebase database integration.",
      "Multi-Role Workflow Design: Structured a transparent 6-stage workflow (Student → Warden → Hostel Head → Maintenance Staff → Warden → Student) with image proof and status tracking.",
      "Applied Design Thinking: Evaluated real-world user pain points and structured product requirements based on FORGE VP design thinking session.",
    ],
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
