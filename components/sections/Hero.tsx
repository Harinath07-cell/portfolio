"use client";

import { Button } from "@/components/ui/Button";
import MagnetLines from "@/components/ui/MagnetLines";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { siteConfig } from "@/lib/config";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, MoveUpRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const socialLinks = [
  { icon: Github, href: siteConfig.socials.github, label: "GitHub" },
  { icon: Linkedin, href: siteConfig.socials.linkedin, label: "LinkedIn" },
  { icon: Mail, href: siteConfig.socials.email, label: "Email" },
];

function TypingRole() {
  const roles = siteConfig.role;
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    const speed = deleting ? 35 : 65;

    const timeout = setTimeout(() => {
      if (!deleting) {
        if (text.length < current.length) {
          setText(current.slice(0, text.length + 1));
        } else {
          setTimeout(() => setDeleting(true), 1200);
        }
      } else {
        if (text.length > 0) {
          setText(text.slice(0, -1));
        } else {
          setDeleting(false);
          setRoleIndex((roleIndex + 1) % roles.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, deleting, roleIndex]);

  return (
    <span className="font-mono text-sm sm:text-base text-cyan-soft">
      {text}
      <span className="animate-pulse">|</span>
    </span>
  );
}

export function Hero() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 480);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-32 pb-20"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-aurora opacity-90" />
      <div className="absolute inset-0 bg-grid-fade" />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo/20 blur-[140px]"
      />
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
        <MagnetLines
          rows={16}
          columns={16}
          containerSize="100%"
          lineColor="rgba(110, 91, 255, 0.24)"
          lineWidth="0.42vmin"
          lineHeight="6.2vmin"
          baseAngle={-12}
          className="opacity-80"
          style={{ filter: "blur(0.2px)" }}
        />
      </div>

      <div className="section-shell relative z-10 grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          variants={staggerContainer(0.12, 0.3)}
          initial="hidden"
          animate="show"
        >
          <motion.p variants={fadeUp} className="eyebrow">
            Hi, I&apos;m
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-display mt-4 text-5xl leading-[1.05] text-ink sm:text-6xl lg:text-7xl"
          >
            <span className="text-gradient">{siteConfig.name}</span>
          </motion.h1>

          <motion.div variants={fadeUp} className="mt-5 h-6">
            <TypingRole />
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted"
          >
            {siteConfig.headline}
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-xl text-sm leading-relaxed text-ink-faint"
          >
            {siteConfig.shortDescription}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <MagneticButton>
              <Button href="#contact" variant="primary">
                Let&apos;s talk
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button href="#projects" variant="secondary">
                View Projects
              </Button>
            </MagneticButton>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <MagneticButton key={label} strength={12}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-white/5 text-ink-muted transition-colors hover:border-indigo-soft hover:text-ink"
                >
                  <Icon size={18} />
                </a>
              </MagneticButton>
            ))}
          </motion.div>
        </motion.div>

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="relative mx-auto aspect-[4/5] w-full max-w-sm"
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-indigo/30 via-transparent to-cyan/20 blur-2xl" />
          <div className="glass-panel relative h-full w-full overflow-hidden rounded-[2rem] shadow-glow">
            <Image
              src="/images/home-portrait.png"
              alt={`Portrait of ${siteConfig.name}`}
              fill
              priority
              sizes="(max-width: 1024px) 320px, 420px"
              className="object-contain p-2"
            />
          </div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="glass-panel absolute -bottom-6 -left-6 rounded-2xl px-4 py-3"
          >
            <p className="font-mono text-[11px] uppercase tracking-widest text-ink-faint">
              Status
            </p>
            <p className="mt-1 flex items-center gap-2 text-sm text-ink">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
              </span>
              Open to opportunities
            </p>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-ink-faint hover:text-ink"
      >
        <ArrowDown size={20} />
      </motion.a>

      <motion.a
        href="#home"
        aria-label="Scroll back to top"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: showScrollTop ? 1 : 0, scale: showScrollTop ? 1 : 0.9 }}
        transition={{ duration: 0.2 }}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-canvas/70 text-ink shadow-[0_0_35px_rgba(90,124,255,0.18)] backdrop-blur-xl"
      >
        <MoveUpRight size={18} />
      </motion.a>
    </section>
  );
}
