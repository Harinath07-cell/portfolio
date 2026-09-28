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
  {
    week: 4,
    title: "Week 4 Report – Prototyping, Fabrication & Team Problem Solving",
    image: "/images/protosem/week-04-laser-cutting.jpeg",
    fileLogImage: "/images/protosem/week-04-laser-cutting.jpeg",
    fileLogImages: [
      "/images/protosem/week-04-laser-cutting.jpeg",
      "/images/protosem/week-04-3d-printing.jpeg"
    ],
    description:
      "Transformed CAD models into physical prototypes using Autodesk Fusion 360 animation, 2D laser cutting, Bambu Lab 3D printing, ultrasonic sensor enclosure design thinking, and Alpha Team RFQ problem selection.",
    overview:
      "Week 4 of my ProtoSem journey focused on taking digital CAD concepts and applying them to real-world prototyping and fabrication. Working with Autodesk Fusion 360, laser cutting, and 3D printing bridged the gap between 3D modelling and physical manufacturing.\n\nIn Fusion 360, I created animated water bottle models with motion mechanics and built a cam-slot joint mechanism. In 2D fabrication, I designed a flower-inspired laser cutting pattern separating cutting and engraving passes. For 3D printing, we were introduced to Bambu Lab additive manufacturing for rapid prototyping.\n\nI also mapped physical enclosure requirements for an ultrasonic range finder module based on actual component dimensions. During the full-day Alpha Team process, I assumed the Designer role to evaluate real-world problem statements, selecting a Request for Quotation (RFQ) challenge to solve.",
    objectives: [
      "Prepare digital 3D & 2D CAD models for physical prototyping and fabrication.",
      "Explore animation, joints, and mechanical motion (cam-slot mechanism) in Fusion 360.",
      "Master 2D laser cutting operations, differentiating between cutting and engraving passes.",
      "Understand additive manufacturing and 3D printing using Bambu Lab printers.",
      "Analyze physical enclosure design requirements for an ultrasonic range finder module.",
      "Participate in the Alpha Team process to evaluate real-world problem statements, selecting the Designer role for RFQ.",
    ],
    activitiesConducted: [
      "Modeled animated water bottle with cap movement and built a cam-slot mechanical joint mechanism in Fusion 360.",
      "Designed and fabricated a flower-inspired laser cutting pattern with separate cutting and engraving paths.",
      "Operated Bambu Lab 3D printers to convert digital CAD models into layer-by-layer physical prototypes.",
      "Mapped internal dimensions and port access for an ultrasonic range finder enclosure design.",
      "Collaborated in the full-day Alpha Team process, selecting the Designer role to tackle Request for Quotation (RFQ) problems.",
    ],
    technologies: [
      "Autodesk Fusion 360",
      "Laser Cutting & 2D Fabrication",
      "Bambu Lab 3D Printing",
      "Additive Manufacturing",
      "Mechanical Motion & Animation",
      "Product Enclosure Design",
      "Alpha Team Problem Solving"
    ],
    skillsLearned: [
      "Advanced CAD Modelling",
      "Fusion 360 Motion & Animation",
      "Laser Cutting Operation",
      "2D & 3D Fabrication",
      "3D Printing (Bambu Lab)",
      "Product Enclosure Design",
      "Rapid Prototyping",
      "Problem Identification",
      "Team Collaboration",
      "Design Thinking",
      "Creative Problem Solving",
    ],
    challenges:
      "Creating realistic joints and animation in Fusion 360, separating cutting vs. engraving vector paths for laser cutting, considering real-world component tolerances for enclosure design, and aligning team perspectives during Alpha Team problem selection.",
    reportImages: [
      "/images/protosem/week-04-3d-printing.jpeg",
      "/images/protosem/week-04-alpha-team.jpeg"
    ],
    gallery: [
      "/images/protosem/week-04-laser-cutting.jpeg",
      "/images/protosem/week-04-3d-printing.jpeg",
      "/images/protosem/week-04-alpha-team.jpeg"
    ],
    githubUrl: "https://github.com/Harinath07-cell/laser-cutting",
    assignmentPoints: [
      "Fusion 360 Animation & Motion: Designed animated cap motion for a water bottle model and constructed a functional cam-slot joint mechanism.",
      "2D Laser Cutting Fabrication: Prepared vector artwork with distinct cutting and engraving layers for a flower-inspired laser-cut prototype.",
      "Additive Manufacturing (3D Printing): Converted CAD models into physical prototypes using a Bambu Lab 3D printer.",
      "Enclosure Design Specifications: Evaluated spatial requirements, mounting tolerances, and port access for an ultrasonic range finder module.",
      "Alpha Team Problem Selection (Designer Role): Participated in team problem identification, selecting the Designer role to address Request for Quotation (RFQ) challenges.",
    ],
  },
  {
    week: 5,
    title: "Week 5 Report – UI/UX Design & Problem Discovery",
    image: "/images/protosem/week-05-ott-ui.jpg",
    fileLogImage: "/images/protosem/week-05-ott-ui.jpg",
    fileLogImages: [
      "/images/protosem/week-05-ott-ui.jpg",
      "/images/protosem/week-05-alumni-connect.jpg"
    ],
    description:
      "Mastered UI/UX requirements drafting & interface design through an OTT platform activity, conducted Alumni Connect root-cause problem discovery with college Alumni Coordinators, and advanced Alpha Team problem analysis.",
    overview:
      "Week 5 of my ProtoSem journey focused on UI/UX design, requirement analysis, and user-perspective problem discovery. The week emphasized understanding user needs before building digital solutions.\n\nIn the OTT Platform UI/UX activity, we engaged in a 2-team requirement exchange: drafting specifications for an opposing team while analyzing incoming requirements to build a functional OTT interface. This highlighted how clarity in user requirements directly shapes UI design and user experience.\n\nFor Problem Discovery, I selected the Alumni Connect project, focusing on root-cause analysis from the user's perspective rather than rushing into app features. We interviewed our College Alumni Coordinator to validate initial assumptions against real communication challenges between students and alumni. Finally, we progressed our Alpha Team problem statement analysis, grounding design decisions in verified user needs.",
    objectives: [
      "Understand UI/UX principles, requirement specification, and user interaction mapping.",
      "Participate in 2-team requirement exchange for an OTT Platform interface design.",
      "Analyze incoming specifications to construct a user-centered OTT platform UI.",
      "Conduct user-perspective problem discovery for the Alumni Connect initiative.",
      "Interview College Alumni Coordinator to validate communication challenges and align assumptions with reality.",
      "Deepen Alpha Team problem statement analysis before proposing digital solutions.",
    ],
    activitiesConducted: [
      "Drafted and interpreted functional UI/UX requirements during the OTT Platform team activity.",
      "Designed and built OTT Platform user interface components based on cross-team specifications.",
      "Brainstormed root causes and user difficulties for the Alumni Connect problem statement.",
      "Conducted stakeholder interview with College Alumni Coordinator to gather primary qualitative insights.",
      "Collaborated in Alpha Team research sessions to evaluate findings and refine problem definitions.",
    ],
    technologies: [
      "UI/UX Design",
      "Requirement Analysis",
      "Wireframing & Interface Prototyping",
      "OTT Platform UI",
      "User Research & Stakeholder Interview",
      "Problem Discovery",
      "Alpha Team Analysis"
    ],
    skillsLearned: [
      "UI/UX Design Thinking",
      "Requirement Analysis & Specification",
      "User Interaction Mapping",
      "Root-Cause Problem Discovery",
      "Stakeholder Interviewing",
      "User Perspective Empathy",
      "Cross-Team Collaboration",
      "Brainstorming & Research Synthesis",
    ],
    challenges:
      "Interpreting incomplete or ambiguous requirement specifications during the OTT activity, separating user symptoms from actual root causes in Alumni Connect, and reconciling team assumptions with real stakeholder feedback.",
    reportImages: [
      "/images/protosem/week-05-alumni-connect.jpg",
      "/images/protosem/week-05-alpha-discovery.jpg"
    ],
    gallery: [
      "/images/protosem/week-05-ott-ui.jpg",
      "/images/protosem/week-05-alumni-connect.jpg",
      "/images/protosem/week-05-alpha-discovery.jpg"
    ],
    githubUrl: "https://github.com/Harinath07-cell/ott_platform_ui",
    assignmentPoints: [
      "OTT Platform UI/UX Requirement Exchange: Drafted and interpreted cross-team feature specifications to build an interactive OTT platform interface.",
      "User Interface Design & Layout Mapping: Converted requirement specifications into user flows, screen layouts, and interface components.",
      "Alumni Connect Root-Cause Analysis: Investigated communication gaps between students and alumni from a user-centered perspective.",
      "Stakeholder Field Interview: Interviewed the College Alumni Coordinator to validate assumptions and gather real-world operational challenges.",
      "Alpha Team Problem Refinement: Synthesized qualitative findings to refine the team's core problem definition before solution development.",
    ],
  },
  {
    week: 6,
    title: "Week 06 — ESP32 Game Development & Embedded Programming",
    image: "/images/protosem/week-06-dot-move-game.jpg",
    fileLogImage: "/images/protosem/week-06-dot-move-game.jpg",
    fileLogImages: [
      "/images/protosem/week-06-dot-move-game.jpg",
      "/images/protosem/week-06-esp32-display.jpg"
    ],
    description:
      "Explored embedded programming with ESP32 by developing Dot Move, an interactive real-time game where players dodge falling dots with progressive difficulty, object generation, collision detection, and score tracking.",
    overview:
      "Building an Interactive Game with ESP32 — DEVELOPMENT\n\nWeek 6 focused on applying embedded programming concepts through the development of an interactive game using the ESP32. Instead of working only with basic component circuits, I used the microcontroller to implement the logic and behaviour of Dot Move, a game where the player must dodge falling dots while controlling player movement.\n\nThe game was designed with a progressive difficulty mechanism. As the player's score increases, the falling dots become faster and the number of falling dots also increases, making the gameplay progressively more challenging. This required implementing game logic for player movement, object generation, collision detection, score tracking, and dynamic difficulty adjustment.\n\nWorking on the project helped me understand how an ESP32 can be used beyond basic hardware control to create interactive and real-world applications. I also gained practical experience in structuring program logic around continuous input, screen updates, object movement, and game-state changes.\n\nOverall, this activity strengthened my understanding of embedded programming, real-time interaction, logical problem solving, and microcontroller-based application development.",
    objectives: [
      "Developed the Dot Move game using ESP32.",
      "Implemented player movement to dodge falling dots.",
      "Added score tracking based on gameplay progress.",
      "Programmed falling-dot movement and generation.",
      "Implemented increasing difficulty as the score rises.",
      "Increased both falling speed and the number of dots at higher scores.",
      "Tested the game logic and adjusted the gameplay behaviour.",
    ],
    activitiesConducted: [
      "Programmed real-time player movement and object controls in Arduino IDE for ESP32.",
      "Constructed progressive difficulty scaling logic to adjust falling dot speeds and counts dynamically.",
      "Built score tracking, collision detection boundaries, and loop state updates.",
      "Tested and tuned gameplay responsiveness on the ESP32 hardware display.",
    ],
    technologies: [
      "ESP32",
      "Embedded Programming",
      "Arduino IDE",
      "Game Logic"
    ],
    skillsLearned: [
      "Embedded Programming",
      "ESP32 Development",
      "Game Logic",
      "Real-Time Programming",
      "Problem Solving",
      "Debugging",
      "Logical Thinking",
    ],
    challenges:
      "The main challenge was creating a smooth and progressively difficult gameplay experience. The game needed to continuously track player movement, update falling objects, detect interactions, and increase the difficulty without disrupting the overall game flow.",
    reportImages: [
      "/images/protosem/week-06-esp32-display.jpg",
      "/images/protosem/week-06-testing.jpg",
      "/images/protosem/week-06-figma.png",
      "/images/protosem/week-06-circuit.jpeg"
    ],
    reportVideo: "/images/protosem/week-06-circuit-video.mp4",
    gallery: [
      "/images/protosem/week-06-dot-game.jpg",
      "/images/protosem/week-06-esp32-display.jpg",
      "/images/protosem/week-06-testing.jpg",
      "/images/protosem/week-06-figma.png",
      "/images/protosem/week-06-circuit.jpeg",
      "/images/protosem/week-06-soldering-new.jpeg",
      "/images/protosem/week-06-circuit-video.mp4"
    ],
    githubUrl: "https://github.com/Harinath07-cell/ott_platform_ui",
    assignmentPoints: [
      "01. ESP32 Game Development: Developed the Dot Move interactive game on ESP32 microcontroller with real-time display logic.",
      "02. Dynamic Player Movement & Collision: Programmed player movement mechanics to dodge procedurally generated falling dots.",
      "03. Progressive Difficulty Mechanism: Implemented dynamic speed scaling and multi-object generation as player score rises.",
      "04. Game State & Score Tracking: Built real-time score counters, collision detection, and continuous loop state updates.",
    ],
  },
  {
    week: 7,
    title: "Week 07 — IoT & Connectivity: Connecting Hardware to the Web",
    image: "/images/protosem/week-07-esp32-webcontrol.jpeg",
    fileLogImage: "/images/protosem/week-07-esp32-webcontrol.jpeg",
    fileLogImages: [
      "/images/protosem/week-07-esp32-webcontrol.jpeg"
    ],
    description:
      "Explored IoT device communication with web applications using ESP32 & Arduino IDE, implementing HTTP web server controls, MQTT broker messaging for relay-based 230W bulb control, and IFTTT voice automation.",
    overview:
      "This week focused on understanding how IoT devices communicate with web applications and external services. Through hands-on sessions with the ESP32 and Arduino IDE, I explored different approaches for sending commands to physical hardware using HTTP, MQTT, and voice-triggered automation.\n\n01 — ESP32 Web Control: Programmed the ESP32 using the Arduino IDE and created a web-based control mechanism to operate the ESP32's built-in LED through HTTP commands.\n\n02 — MQTT-Based Device Control: Connected an ESP32 to a relay module and used MQTT communication to remotely control a 230W bulb. This helped me understand how lightweight messaging protocols can be used for communication between IoT devices and control interfaces.\n\n03 — Voice-Controlled IoT: Extended the same hardware setup to support voice-based control using IFTTT. This demonstrated how external automation services can connect user commands with physical IoT devices.",
    objectives: [
      "Program the ESP32 microcontroller using Arduino IDE to host an HTTP web control server.",
      "Interface a 1-channel relay module with the ESP32 to control a high-voltage 230W AC bulb safely.",
      "Implement lightweight MQTT pub/sub protocol messaging for real-time remote hardware control.",
      "Connect voice commands to physical IoT hardware via IFTTT webhooks and automation workflows.",
      "Analyze the complete hardware-software command pipeline from UI/Voice -> Protocol -> ESP32 -> Relay -> Appliance.",
    ],
    activitiesConducted: [
      "Configured ESP32 web server in Arduino IDE to toggle built-in LED via HTTP commands.",
      "Wired ESP32 to a relay module and established MQTT broker connectivity to switch a 230W bulb.",
      "Created IFTTT applets to link voice assistant commands to physical relay switching.",
      "Performed troubleshooting and latency testing across HTTP, MQTT, and IFTTT control methods.",
    ],
    technologies: [
      "ESP32",
      "Arduino IDE",
      "HTTP Protocol",
      "MQTT Broker",
      "Relay Module",
      "IFTTT Automation",
      "Hardware-Software Integration"
    ],
    skillsLearned: [
      "ESP32 Programming",
      "Arduino Development",
      "IoT Communication",
      "HTTP-Based Device Control",
      "MQTT Communication",
      "Relay Interfacing",
      "Hardware–Software Integration",
      "IoT Automation",
      "Troubleshooting",
    ],
    challenges:
      "Working with multiple communication methods required understanding how a command travels from the user interface or external service → communication protocol → ESP32 → relay → physical device.",
    reportImages: [],
    gallery: [
      "/images/protosem/week-07-esp32-webcontrol.jpeg"
    ],
    viewMoreUrl: "/protosem/week-7",
    assignmentPoints: [
      "01. ESP32 Web Control: Programmed ESP32 in Arduino IDE to operate built-in LED via HTTP commands from a web interface.",
      "02. MQTT-Based Device Control: Connected ESP32 to a relay module and configured MQTT messaging to remotely switch a 230W bulb.",
      "03. Voice-Controlled IoT Automation: Integrated IFTTT automation with MQTT/HTTP to trigger physical relay switching using voice commands.",
      "04. Hardware-to-Software Protocol Flow: Mapped the complete command pipeline from UI/Voice -> Protocol (HTTP/MQTT) -> ESP32 -> Relay -> Physical Appliance.",
    ],
  },
  // Weeks 8–24: add new entries here as the internship progresses.
];
