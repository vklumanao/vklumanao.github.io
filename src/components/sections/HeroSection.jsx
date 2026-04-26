import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FaArrowRight,
  FaCode,
  FaLayerGroup,
  FaMedal,
  FaRegClock,
  FaUserCheck,
} from "react-icons/fa";
import GlassCard from "../ui/GlassCard";
import {
  hoverLift,
  hoverTransition,
  itemVariants,
  sectionVariants,
  tapPress,
} from "../../lib/motion";

function HeroSection({
  typedRole,
  onViewProjects,
  onContact,
  resumeUrl,
  name,
  tagline,
  snapshot,
}) {
  const [showMoreStats, setShowMoreStats] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const [firstName, ...rest] = name.split(" ");
  const lastName = rest.join(" ");

  return (
    <section
      id="home"
      className="relative flex min-h-[86svh] items-center overflow-hidden px-4 pt-24 sm:min-h-screen sm:px-6 sm:pt-28 lg:px-8"
    >
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="mx-auto grid w-full max-w-6xl gap-4 sm:gap-6 lg:grid-cols-2">
        <motion.div
          initial={prefersReducedMotion ? false : "hidden"}
          animate={prefersReducedMotion ? undefined : "show"}
          variants={prefersReducedMotion ? undefined : sectionVariants}
          className="space-y-6 sm:space-y-8"
        >
          <motion.p
            variants={prefersReducedMotion ? undefined : itemVariants}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-700 dark:text-emerald-300"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            {snapshot.availability}
          </motion.p>
          <motion.div
            variants={prefersReducedMotion ? undefined : itemVariants}
          >
            <h1 className="text-4xl font-bold leading-tight text-zinc-900 dark:text-white sm:text-6xl">
              {firstName} <br /> {lastName}
            </h1>
            <p className="mt-4 min-h-8 text-xl text-zinc-800 dark:text-zinc-200">
              {typedRole}
              {!prefersReducedMotion && (
                <span className="ml-1 inline-block h-6 w-[2px] animate-pulse bg-current align-middle" />
              )}
            </p>
          </motion.div>
          <motion.p
            variants={prefersReducedMotion ? undefined : itemVariants}
            className="max-w-xl text-zinc-700 dark:text-zinc-300"
          >
            I design and build polished web experiences with clean architecture,
            smooth interactions, and measurable impact.
          </motion.p>
          <motion.p
            variants={prefersReducedMotion ? undefined : itemVariants}
            className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400"
          >
            <FaCode className="text-[12px]" /> {tagline}
          </motion.p>
          <motion.div
            variants={prefersReducedMotion ? undefined : itemVariants}
            className="flex flex-wrap gap-3"
          >
            <motion.button
              onClick={onViewProjects}
              aria-label="View portfolio projects"
              className="group min-h-11 rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-black dark:bg-white dark:text-black"
              whileHover={prefersReducedMotion ? undefined : hoverLift}
              whileTap={prefersReducedMotion ? undefined : tapPress}
              transition={hoverTransition}
            >
              View Projects{" "}
              <FaArrowRight className="ml-2 inline transition group-hover:translate-x-1" />
            </motion.button>
            <motion.button
              onClick={onContact}
              aria-label="Book a call or start a conversation"
              className="glass min-h-11 rounded-2xl px-5 py-3 text-sm font-medium transition hover:-translate-y-0.5"
              whileHover={prefersReducedMotion ? undefined : hoverLift}
              whileTap={prefersReducedMotion ? undefined : tapPress}
              transition={hoverTransition}
            >
              Book a Call
            </motion.button>
            <motion.a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Open CV in new tab"
              className="glass inline-flex min-h-11 items-center rounded-2xl px-5 py-3 text-sm font-medium transition hover:-translate-y-0.5"
              whileHover={prefersReducedMotion ? undefined : hoverLift}
              whileTap={prefersReducedMotion ? undefined : tapPress}
              transition={hoverTransition}
            >
              View CV
            </motion.a>
          </motion.div>
          <motion.p
            variants={prefersReducedMotion ? undefined : itemVariants}
            className="inline-flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400"
          >
            <FaRegClock className="text-[12px]" />
            Typically replies within 24 hours.
          </motion.p>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative"
          whileHover={prefersReducedMotion ? undefined : { y: -3 }}
          whileTap={prefersReducedMotion ? undefined : tapPress}
          transition={hoverTransition}
        >
          <GlassCard className="relative overflow-hidden rounded-[2rem] p-5 sm:p-6">
            <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/15 blur-2xl" />
            <div className="absolute -bottom-14 -left-10 h-28 w-28 rounded-full bg-cyan-400/20 blur-2xl" />
            <div className="space-y-5">
              <div>
                <p className="inline-flex rounded-full border border-zinc-300/70 bg-zinc-200/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-zinc-600 dark:border-white/15 dark:bg-white/5 dark:text-zinc-300">
                  Proof Panel
                </p>
                <h3 className="mt-3 text-2xl font-semibold sm:text-3xl">
                  {snapshot.focus}
                </h3>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-zinc-300/70 bg-zinc-200/50 px-4 py-3 dark:border-white/10 dark:bg-white/5">
                  <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-zinc-500">
                    <FaUserCheck className="text-[11px]" /> Current Track
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    {snapshot.currentTrack}
                  </p>
                </div>
                <div className="rounded-xl border border-zinc-300/70 bg-zinc-200/50 px-4 py-3 dark:border-white/10 dark:bg-white/5">
                  <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-zinc-500">
                    <FaLayerGroup className="text-[11px]" /> Portfolio Scope
                  </p>
                  <p className="mt-1 text-sm font-medium">{snapshot.scope}</p>
                </div>
              </div>

              <div className="rounded-xl border border-zinc-300/70 bg-zinc-200/50 px-4 py-3 dark:border-white/10 dark:bg-white/5">
                <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-zinc-500">
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
                  {(showMoreStats
                    ? snapshot.stats
                    : snapshot.stats.slice(0, 2)
                  ).map((stat) => (
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

              <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                {snapshot.availability}
              </p>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
