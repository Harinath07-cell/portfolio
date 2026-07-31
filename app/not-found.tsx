"use client";

import Link from "next/link";
import FuzzyText from "@/components/ui/FuzzyText";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-canvas px-6 py-20 text-ink">
      <div className="absolute inset-0 bg-aurora opacity-90" />
      <div className="absolute inset-0 bg-grid-fade" />
      <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo/20 blur-[140px]" />

      <div className="glass-panel relative z-10 w-full max-w-2xl rounded-[2rem] border border-hairline p-10 text-center shadow-glow sm:p-14">
        <div className="flex justify-center">
          <FuzzyText
            fontSize="clamp(3.5rem, 12vw, 8rem)"
            fontWeight={900}
            gradient={["#8b7cff", "#33e6c9"]}
            baseIntensity={0.2}
            hoverIntensity={0.5}
            enableHover={true}
            fuzzRange={30}
            direction="both"
          >
            404
          </FuzzyText>
        </div>

        <h1 className="mt-6 font-display text-3xl font-bold text-ink sm:text-4xl">
          Page Not Found
        </h1>

        <p className="mt-4 text-lg text-ink-muted">
          The page you are looking for has drifted off the map.
        </p>
        <p className="mt-2 text-sm text-ink-faint">
          Let&apos;s get you back to the portfolio home.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-full border border-hairline bg-white/5 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-indigo-soft hover:text-ink"
        >
          Go back home
        </Link>
      </div>
    </main>
  );
}
