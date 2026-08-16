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
    title: "Week 3 Report – Electronics Fundamentals & 3D Product Design",
    image: "/images/protosem/week-03-fusion-mechanical.png",
    fileLogImage: "/images/protosem/week-03-fusion-mechanical.png",
    fileLogImages: [
      "/images/protosem/week-03-fusion-mechanical.png",
      "/images/protosem/week-03-fusion-rocket.png"
    ],
    description:
      "Mastered electronics fundamentals (Ohm's Law, components) and 3D product design in Autodesk Fusion 360, building 2D sketches, mechanical parts, and 3D models (Microphone, Paper Rocket, Water Bottle).",
    overview:
      "Week 3 focused on electronics fundamentals, product design, and 3D modelling using Autodesk Fusion 360. The week connected basic electrical concepts with physical product design.\n\nThe electronics sessions covered voltage, current, resistance, Ohm's Law (V = I × R), and key components like resistors, capacitors, and diodes. In Autodesk Fusion 360, I gained hands-on CAD experience following the workflow: Idea → 2D Sketch → Dimensions & Constraints → 3D Features → Final Model.\n\nI created a detailed mechanical component featuring a base plate, mounting holes, vertical sections, and cylindrical supports. I also modeled 3D real-world products including a Microphone, a Paper Rocket with fins, and a Water Bottle, focusing on symmetry, proportions, and design accuracy.",
    objectives: [
      "Understand basic electronics: voltage, current, resistance, circuits, and Ohm's Law (V = I × R).",
      "Study fundamental electronic components: resistors, capacitors, and diodes.",
      "Master Autodesk Fusion 360 product design workflow: Idea → 2D Sketch → Dimensions & Constraints → 3D Features → Final Model.",
      "Practice 2D parametric sketching with accurate dimensions and geometric constraints.",
      "Develop a detailed mechanical component with mounting holes, base plate, and structural supports.",
      "Model real-world 3D products: Microphone, Paper Rocket with fins, and Water Bottle.",
    ],
    activitiesConducted: [
      "Studied electronics fundamentals, circuit behavior, and Ohm's Law calculations.",
      "Analyzed passive & active components: resistors (current control), capacitors (energy storage), and diodes (one-way conduction).",
      "Practiced 2D parametric sketching, applying geometric constraints and exact dimensions in Fusion 360.",
      "Modeled complex mechanical component featuring mounting holes, vertical sections, and cylindrical supports.",
      "Designed 3D Microphone model combining cylindrical bodies, circular details, and top mesh structure.",
      "Designed 3D Paper Rocket model with main aerodynamic body and stabilizing fins.",
      "Designed 3D Water Bottle model exploring cylindrical surfaces, proportions, and product form.",
    ],
    technologies: [
      "Autodesk Fusion 360",
      "CAD & 3D Modelling",
      "2D Parametric Sketching",
      "Electronics Fundamentals",
      "Ohm's Law (V=IR)",
      "Mechanical Design",
      "Product Design"
    ],
    skillsLearned: [
      "Basic Electronics",
      "Circuit Fundamentals",
      "Problem Solving",
      "CAD Modelling",
      "2D Sketching",
      "3D Modelling",
      "Geometric Constraints",
      "Dimensioning",
      "Product Design",
      "Spatial Thinking",
      "Attention to Detail",
      "Design Iteration",
    ],
    challenges:
      "Applying accurate dimensions and geometric constraints during 2D sketching, converting reference concepts into precise 3D mechanical models, maintaining proper proportions for real-world products, and understanding the practical relationship between electrical components.",
    reportImages: [
      "/images/protosem/week-03-fusion-rocket.png",
      "/images/protosem/week-03-fusion-bottle.png"
    ],
    gallery: [
      "/images/protosem/week-03-fusion-mechanical.png",
      "/images/protosem/week-03-fusion-rocket.png",
      "/images/protosem/week-03-fusion-bottle.png"
    ],
    githubUrl: "https://github.com/Harinath07-cell/fushion-models",
    assignmentPoints: [
      "Electronics & Circuit Analysis: Evaluated voltage, current, resistance, and Ohm's Law (V = I × R) along with resistor, capacitor, and diode functions.",
      "2D Parametric Sketching: Designed fully constrained 2D sketches using precise dimensions and geometric constraints in Autodesk Fusion 360.",
      "Mechanical Component 3D Design: Built a structural mechanical part featuring a base plate, mounting holes, vertical sections, and cylindrical supports.",
      "3D Product Modelling (Microphone, Rocket & Bottle): Modeled 3D Microphone (cylindrical details), Paper Rocket (aerodynamic fins), and Water Bottle (proportional curved surfaces).",
    ],
  },
  // Weeks 4–24: add new entries here as the internship progresses.
];
