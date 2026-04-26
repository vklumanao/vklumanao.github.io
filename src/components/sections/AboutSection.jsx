import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FaArrowRight,
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaMapMarkerAlt,
  FaPalette,
  FaUserGraduate,
} from "react-icons/fa";
import GlassCard from "../ui/GlassCard";
import SectionContainer from "../layout/SectionContainer";
import {
  hoverLift,
  hoverTransition,
  itemVariants,
  sectionVariants,
  tapPress,
} from "../../lib/motion";

const RESET_TILT = { rotateX: 0, rotateY: 0 };

function AboutSection({ personalInfo, onOpenProfile }) {
  const [tilt, setTilt] = useState(RESET_TILT);
  const prefersReducedMotion = useReducedMotion();

  const onTiltMove = (event) => {
    if (prefersReducedMotion) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const centerX = bounds.width / 2;
    const centerY = bounds.height / 2;

    setTilt({
      rotateX: ((y - centerY) / centerY) * -4,
      rotateY: ((x - centerX) / centerX) * 4,
    });
  };

  const summaryParts = personalInfo.summary
    .split(". ")
    .map((item) => item.trim())
    .filter(Boolean);

  const primarySummary = summaryParts[0]?.endsWith(".")
    ? summaryParts[0]
    : `${summaryParts[0] || personalInfo.summary}.`;
  const secondarySummary = summaryParts[1]
    ? summaryParts[1].endsWith(".")
      ? summaryParts[1]
      : `${summaryParts[1]}.`
    : "Focused on practical software delivery, strong collaboration, and continuous improvement.";

  const infoCards = [
    {
      title: "What I Build",
      value: personalInfo.focus,
      detail: "UI-first and problem-driven solutions",
      icon: FaPalette,
    },
    {
      title: "How I Work",
      value: "Hands-on and iterative",
      detail: "Build, test, refine, then ship",
      icon: FaUserGraduate,
    },
    {
      title: "Current Base",
      value: personalInfo.location,
      detail: "Open to remote collaboration",
      icon: FaMapMarkerAlt,
    },
  ];

  const socialLinks = [
    { href: personalInfo.socials.github, label: "GitHub", icon: FaGithub },
    {
      href: personalInfo.socials.facebook,
      label: "Facebook",
      icon: FaFacebookF,
    },
    {
      href: personalInfo.socials.instagram,
      label: "Instagram",
      icon: FaInstagram,
    },
  ];

  return (
    <SectionContainer id="about" title="About Me">
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView={prefersReducedMotion ? undefined : "show"}
          viewport={{ once: true, amount: 0.25 }}
          variants={prefersReducedMotion ? undefined : sectionVariants}
        >
          <GlassCard className="rounded-2xl p-5 text-zinc-700 dark:text-zinc-300 sm:p-6">
            <motion.div
              variants={prefersReducedMotion ? undefined : itemVariants}
              className="space-y-4"
            >
              <p className="inline-flex rounded-full border border-zinc-300/70 bg-zinc-200/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-zinc-600 dark:border-white/15 dark:bg-white/5 dark:text-zinc-300">
                Quick Intro
              </p>
              <h3 className="text-2xl font-semibold leading-tight sm:text-3xl">
                Building practical products with purpose and polish.
              </h3>
              <p className="pt-1 text-base leading-relaxed text-zinc-700 dark:text-zinc-200 sm:text-lg">
                {primarySummary}
              </p>
              <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300 sm:text-lg">
                {secondarySummary}
              </p>
            </motion.div>

            <motion.div
              variants={prefersReducedMotion ? undefined : itemVariants}
              className="mt-6 grid gap-4 sm:grid-cols-3"
            >
              {infoCards.map((card) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.title}
                    className="rounded-2xl border border-zinc-300/70 bg-zinc-200/50 p-4 dark:border-white/10 dark:bg-white/5"
                    whileHover={prefersReducedMotion ? undefined : hoverLift}
                    transition={hoverTransition}
                  >
                    <p className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-500">
                      <Icon className="text-[11px]" /> {card.title}
                    </p>
                    <p className="mt-2 text-sm font-medium sm:text-base">
                      {card.value}
                    </p>
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                      {card.detail}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div
              variants={prefersReducedMotion ? undefined : itemVariants}
              className="mt-6 rounded-2xl border border-zinc-300/70 bg-zinc-200/50 p-4 dark:border-white/10 dark:bg-white/5 lg:hidden"
            >
              <button
                type="button"
                onClick={onOpenProfile}
                className="relative mx-auto block aspect-[4/5] w-full max-w-[220px] overflow-hidden rounded-2xl border border-zinc-300/70 shadow-xl transition hover:scale-[1.01] dark:border-white/20"
                aria-label="Open profile image"
              >
                <img
                  src={personalInfo.profileImage}
                  alt={`${personalInfo.name} profile`}
                  className="h-full w-full cursor-zoom-in object-cover object-top brightness-110 contrast-110 saturate-110"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 to-transparent" />
              </button>
              <p className="mt-4 text-center text-sm text-zinc-600 dark:text-zinc-300">
                {personalInfo.tagline ||
                  `${personalInfo.role} building practical digital solutions.`}
              </p>
              <div className="mt-3 flex justify-center gap-3 text-xl text-zinc-600 dark:text-zinc-300">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      className="rounded-lg p-2 transition hover:-translate-y-0.5 hover:bg-zinc-200/70 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 dark:hover:bg-white/10 dark:hover:text-white"
                    >
                      <Icon />
                    </a>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              variants={prefersReducedMotion ? undefined : itemVariants}
              className="mt-6 flex flex-wrap gap-3"
            >
              <motion.a
                href="#experience"
                className="group min-h-11 rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-black dark:bg-white dark:text-black"
                whileHover={prefersReducedMotion ? undefined : hoverLift}
                whileTap={prefersReducedMotion ? undefined : tapPress}
                transition={hoverTransition}
              >
                View Experience
                <FaArrowRight className="ml-2 inline transition group-hover:translate-x-1" />
              </motion.a>
            </motion.div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          onMouseMove={onTiltMove}
          onMouseLeave={() => setTilt(RESET_TILT)}
          animate={
            prefersReducedMotion
              ? RESET_TILT
              : { rotateX: tilt.rotateX, rotateY: tilt.rotateY }
          }
          transition={{
            type: "spring",
            stiffness: 170,
            damping: 16,
            delay: 0.1,
          }}
          className="glass hidden rounded-2xl p-5 sm:p-6 lg:block"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="relative rounded-2xl border border-zinc-300/70 bg-zinc-100/70 p-4 dark:border-white/10 dark:bg-black/40 sm:p-5"
            style={{ transform: "translateZ(24px)" }}
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-cyan-400/15 blur-2xl" />

            <button
              type="button"
              onClick={onOpenProfile}
              className="relative mx-auto block aspect-[4/5] w-full max-w-xs overflow-hidden rounded-2xl border border-zinc-300/70 shadow-2xl transition hover:scale-[1.01] dark:border-white/20"
              aria-label="Open profile image"
            >
              <img
                src={personalInfo.profileImage}
                alt={`${personalInfo.name} profile`}
                className="h-full w-full cursor-zoom-in object-cover object-top brightness-110 contrast-110 saturate-110"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 to-transparent" />
            </button>

            <h3 className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
              {personalInfo.name}
            </h3>
            <p className="mt-2.5 text-zinc-600 dark:text-zinc-300">
              {personalInfo.tagline ||
                `${personalInfo.role} building practical digital solutions.`}
            </p>

            <p className="mt-5 text-xs uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
              Let's Connect
            </p>
            <div className="mt-2 flex gap-3 text-xl text-zinc-600 dark:text-zinc-300">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="rounded-lg p-2 transition hover:-translate-y-0.5 hover:bg-zinc-200/70 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 dark:hover:bg-white/10 dark:hover:text-white"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  );
}

export default AboutSection;
