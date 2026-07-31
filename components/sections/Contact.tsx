"use client";

import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/config";
import { fadeUp, slideIn, staggerContainer, viewportOnce } from "@/lib/motion";
import { motion } from "framer-motion";
import { Github, Linkedin, Loader2, Mail, Send, CheckCircle2 } from "lucide-react";
import { useState, type FormEvent } from "react";

const contactLinks = [
  { icon: Mail, label: siteConfig.email, href: siteConfig.socials.email },
  { icon: Github, label: "Harinath07-cell", href: siteConfig.socials.github },
  { icon: Linkedin, label: "harinath1010", href: siteConfig.socials.linkedin },
];

type Status = "idle" | "sending" | "sent";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    // Wire this up to your form handler of choice (Formspree, Resend, an API route, etc).
    setTimeout(() => setStatus("sent"), 1400);
  }

  return (
    <section id="contact" className="relative py-28 sm:py-36">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something"
          description="Have a role, a project, or just want to talk shop? My inbox is open."
        />

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <motion.div
            variants={slideIn("left")}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="space-y-4"
          >
            {contactLinks.map(({ icon: Icon, label, href }) => (
              <MagneticButton key={label} strength={8} className="block w-full">
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="glass-panel flex items-center gap-4 rounded-2xl px-5 py-4 transition-colors hover:border-indigo-soft"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-hairline bg-white/5 text-indigo-soft">
                    <Icon size={18} />
                  </span>
                  <span className="text-sm text-ink-muted">{label}</span>
                </a>
              </MagneticButton>
            ))}
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="glass-panel rounded-2xl p-6 sm:p-8"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <motion.div variants={fadeUp}>
                <label htmlFor="name" className="eyebrow">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  className="mt-2 w-full rounded-xl border border-hairline bg-white/5 px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-indigo-soft focus:outline-none"
                  placeholder="Your name"
                />
              </motion.div>
              <motion.div variants={fadeUp}>
                <label htmlFor="email" className="eyebrow">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  className="mt-2 w-full rounded-xl border border-hairline bg-white/5 px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-indigo-soft focus:outline-none"
                  placeholder="you@email.com"
                />
              </motion.div>
            </div>

            <motion.div variants={fadeUp} className="mt-5">
              <label htmlFor="subject" className="eyebrow">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                required
                className="mt-2 w-full rounded-xl border border-hairline bg-white/5 px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-indigo-soft focus:outline-none"
                placeholder="What's this about?"
              />
            </motion.div>

            <motion.div variants={fadeUp} className="mt-5">
              <label htmlFor="message" className="eyebrow">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="mt-2 w-full resize-none rounded-xl border border-hairline bg-white/5 px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-indigo-soft focus:outline-none"
                placeholder="Tell me a bit about what you have in mind..."
              />
            </motion.div>

            <motion.button
              variants={fadeUp}
              type="submit"
              disabled={status !== "idle"}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-canvas transition-shadow hover:shadow-glow disabled:opacity-70 sm:w-auto"
            >
              {status === "idle" && (
                <>
                  <Send size={16} /> Send message
                </>
              )}
              {status === "sending" && (
                <>
                  <Loader2 size={16} className="animate-spin" /> Sending...
                </>
              )}
              {status === "sent" && (
                <>
                  <CheckCircle2 size={16} /> Message sent
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
