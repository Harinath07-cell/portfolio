# S. Harinath — Portfolio

A production-ready personal portfolio built with Next.js (App Router), TypeScript,
Tailwind CSS, and Framer Motion. Verified with a clean `tsc --noEmit` and a
successful `next build`.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

To build for production:

```bash
npm run build
npm run start
```

## Everything you'll actually want to change

**`lib/config.ts`** — the one file to edit for identity: name, role/tagline,
email, resume link, social URLs, and your **LeetCode username** (the dashboard
reads it from here — nothing else needs to change).

**`data/projects.ts`** — add/edit project cards. Each entry needs an image,
title, description, tech stack, and optional GitHub / live demo / case study
links.

**`data/experience.ts`** — the vertical timeline entries.

**`data/skills.ts`** — categorized skills with a 0–100 proficiency level that
drives the animated progress bars.

**`data/protosem.ts`** — the internship log. The dashboard (search, timeline,
prev/next, expand) is fully data-driven, so logging week 4 onward is just
pushing a new object into the `protosemWeeks` array — no component code to
touch. See the comment at the top of the file for the exact shape.

## Images

Placeholder gradient images are included so nothing 404s out of the box:

- `public/images/portrait.jpg` — hero photo
- `public/images/about-portrait.jpg` — About section photo
- `public/images/projects/*.jpg` — one per project
- `public/images/protosem/week-XX.jpg` (+ `-a` / `-b` gallery variants)

Swap these for real photos/screenshots at the same paths (or update the paths
in the corresponding data file). Recommended: 1200×750 for project covers,
4:5 portraits, and keep total image weight reasonable — everything renders
through `next/image`, so resizing/optimization is automatic.

Add your resume PDF at `public/resume.pdf` (referenced by `resumeUrl` in
`lib/config.ts`).

## LeetCode dashboard

`components/sections/LeetCode.tsx` fetches live stats client-side from a
public community stats API keyed off `siteConfig.leetcodeUsername`. Community
APIs like this occasionally go down — the section degrades gracefully with a
warning banner and a "Visit Profile" link rather than breaking. If you'd
rather have guaranteed uptime, point `apiUrl` at your own small serverless
function that calls LeetCode's GraphQL endpoint server-side and caches the
result.

## Contact form

The form in `components/sections/Contact.tsx` currently simulates a send
(so you can see the animated states: sending → sent). Wire the `handleSubmit`
function up to a real backend — Formspree, Resend, a Next.js API route, or
similar — before going live.

## Design system

- **Type**: your uploaded `Valorant.ttf` is used as the display face (name,
  hero, logo), self-hosted Inter for body/UI text, and Space Mono for
  data/eyebrow labels — all self-hosted via `@fontsource`, so the build never
  depends on reaching Google Fonts.
- **Color tokens** live in `tailwind.config.ts` (`canvas`, `surface`, `ink`,
  `indigo`, `cyan`, etc.) — change them there and every section updates.
- **Motion** patterns (fade up, slide in, stagger, scale) are centralized in
  `lib/motion.ts`.

## Notes on the brief

- The Figma file linked in the brief couldn't be opened directly in this
  environment (it needs authenticated Figma access), so the visual system
  here was built from the written spec and the Apple/Linear/Stripe/Vercel
  direction described, not a pixel-for-pixel copy.
- Lighthouse wasn't run in this sandbox (no browser available here), but the
  build follows the practices that typically score well: `next/image` with
  lazy loading, self-hosted fonts with `font-display: swap`, semantic HTML,
  visible focus states, and `prefers-reduced-motion` support throughout.
