/**
 * Central site configuration.
 * Change your name, links, and the LeetCode username here — nothing else
 * in the codebase needs to be touched.
 */
export const siteConfig = {
  name: "S. Harinath",
  shortName: "Harinath",
  role: ["Turning Ideas into Intelligent Digital Experiences"],
  headline:
    "Passionate about building AI-powered web applications, solving real-world problems, and transforming innovative ideas into impactful digital products.",
  shortDescription:
    "Turning Ideas into Intelligent Digital Experiences.",
  email: "hari.s2692005@gmail.com",
  resumeUrl: "/resume.pdf",
  socials: {
    github: "https://github.com/Harinath07-cell",
    linkedin: "https://www.linkedin.com/in/harinath1010/",
    leetcode: "https://leetcode.com/u/Mr_Rock/",
    email: "mailto:hari.s2692005@gmail.com",
  },
  leetcodeUsername: "Mr_Rock",
  location: "Coimbatore, Tamil Nadu, India",
  about: {
    paragraphs: [
      "Building Ideas That Matters",
      "I enjoy building intelligent web applications, exploring Artificial Intelligence, and creating digital experiences that solve meaningful problems.",
      "From leading projects as a Project Manager at IQube to serving as the Head of Learning & Development at LEED, I have developed strong leadership, collaboration, and problem-solving skills alongside my technical expertise.",
      "Currently, I am pursuing an Innovation Engineer Internship while continuously learning modern web technologies, AI development, and product thinking.",
      "I embrace modern AI-assisted development workflows while maintaining strong engineering fundamentals, enabling me to rapidly transform ideas into production-ready applications.",
    ],
    portrait: "/images/about-portrait-new.jpg",
  },
  nav: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Protosem", href: "#protosem" },
    { label: "Contact", href: "#contact" },
  ],
} as const;
