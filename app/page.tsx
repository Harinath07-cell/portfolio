import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { LeetCodeSection } from "@/components/sections/LeetCode";
import { Projects } from "@/components/sections/Projects";
import { Protosem } from "@/components/sections/Protosem";
import { Skills } from "@/components/sections/Skills";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <LeetCodeSection />
      <Experience />
      <Protosem />
      <Contact />
    </>
  );
}
