import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaCode,
  FaLayerGroup,
  FaMedal,
  FaUserCheck,
} from "react-icons/fa";
import GlassCard from "../ui/GlassCard";

function HeroSection({
  typedRole,
  onViewProjects,
  onContact,
  name,
  tagline,
  snapshot,
}) {
  const [showMoreStats, setShowMoreStats] = useState(false);
  const [firstName, ...rest] = name.split(" ");
  const lastName = rest.join(" ");

  return (
    <section
      id="home"
      className="relative flex min-h-[86svh] items-center px-4 pt-24 sm:min-h-screen sm:px-6 sm:pt-28 lg:px-8"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-4 sm:gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 sm:space-y-8"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-zinc-400/40 px-4 py-2 text-sm text-zinc-600 dark:border-white/20 dark:text-zinc-300">
            <FaCode /> {tagline}
          </p>
          <div>
            <h1 className="text-4xl font-bold leading-tight text-zinc-900 dark:text-white sm:text-6xl">
              {firstName} <br /> {lastName}
            </h1>
            <p className="mt-4 min-h-8 text-xl text-zinc-700 dark:text-zinc-300">
              {typedRole}
              <span className="ml-1 inline-block h-6 w-[2px] animate-pulse bg-current align-middle" />
            </p>
          </div>
          <p className="max-w-xl text-zinc-600 dark:text-zinc-400">
            I build immersive, performance-focused interfaces that blend clean
            architecture with thoughtful microinteractions.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={onViewProjects}
              className="group min-h-11 rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-black dark:bg-white dark:text-black"
            >
              View Projects{" "}
              <FaArrowRight className="ml-2 inline transition group-hover:translate-x-1" />
            </button>
            <button
              onClick={onContact}
              className="glass min-h-11 rounded-2xl px-5 py-3 text-sm font-medium transition hover:-translate-y-0.5"
            >
              Contact Me
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative"
        >
          <GlassCard className="relative overflow-hidden rounded-[2rem] p-5 sm:p-6">
            <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/15 blur-2xl" />
            <div className="space-y-5">
              <div>
                <p className="inline-flex rounded-full border border-zinc-300/70 bg-zinc-200/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-zinc-600 dark:border-white/15 dark:bg-white/5 dark:text-zinc-300">
                  Career Snapshot
                </p>
                <h3 className="mt-3 text-2xl font-semibold sm:text-3xl">
                  {snapshot.focus}
                </h3>
                <p className="mt-2 text-zinc-600 dark:text-zinc-300">
                  {snapshot.availability}
                </p>
              </div>

              <div className="grid gap-3">
                <div className="rounded-xl border border-zinc-300/70 bg-zinc-200/50 px-4 py-3 dark:border-white/10 dark:bg-white/5">
                  <p className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-500">
                    <FaUserCheck className="text-[11px]" /> Current Track
                  </p>
                  <p className="mt-1 text-sm font-medium">{snapshot.currentTrack}</p>
                </div>
                <div className="rounded-xl border border-zinc-300/70 bg-zinc-200/50 px-4 py-3 dark:border-white/10 dark:bg-white/5">
                  <p className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-500">
                    <FaLayerGroup className="text-[11px]" /> Portfolio Scope
                  </p>
                  <p className="mt-1 text-sm font-medium">{snapshot.scope}</p>
                </div>
                <div className="rounded-xl border border-zinc-300/70 bg-zinc-200/50 px-4 py-3 dark:border-white/10 dark:bg-white/5">
                  <p className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-500">
                    <FaMedal className="text-[11px]" /> Quick Stats
                  </p>
                  <ul className="mt-2 hidden space-y-1 text-sm sm:block">
                    {snapshot.stats.map((stat) => (
                      <li key={stat} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-zinc-500 dark:bg-zinc-300" />
                        <span>{stat}</span>
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-2 space-y-1 text-sm sm:hidden">
                    {(showMoreStats ? snapshot.stats : snapshot.stats.slice(0, 2)).map((stat) => (
                      <li key={stat} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-zinc-500 dark:bg-zinc-300" />
                        <span>{stat}</span>
                      </li>
                    ))}
                  </ul>
                  {snapshot.stats.length > 2 && (
                    <button
                      type="button"
                      onClick={() => setShowMoreStats((prev) => !prev)}
                      className="mt-2 text-xs font-medium text-zinc-600 underline underline-offset-2 dark:text-zinc-300 sm:hidden"
                    >
                      {showMoreStats ? "Show Less" : "Show More"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
