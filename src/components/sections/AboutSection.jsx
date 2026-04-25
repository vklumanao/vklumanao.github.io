import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaMapMarkerAlt,
  FaPalette,
  FaUserGraduate,
} from "react-icons/fa";
import GlassCard from "../ui/GlassCard";
import SectionContainer from "../layout/SectionContainer";

function AboutSection({ personalInfo, onOpenProfile }) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const onTiltMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const centerX = bounds.width / 2;
    const centerY = bounds.height / 2;

    setTilt({
      rotateX: ((y - centerY) / centerY) * -7,
      rotateY: ((x - centerX) / centerX) * 7,
    });
  };

  return (
    <SectionContainer id="about" title="About Me">
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <GlassCard className="rounded-2xl p-5 text-zinc-700 dark:text-zinc-300 sm:p-6">
          <div className="space-y-3">
            <p className="inline-flex rounded-full border border-zinc-300/70 bg-zinc-200/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-zinc-600 dark:border-white/15 dark:bg-white/5 dark:text-zinc-300">
              Personal Information
            </p>
            <h3 className="text-2xl font-semibold leading-tight sm:text-3xl">
              {personalInfo.name}
            </h3>
            <p className="text-sm uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
              About Me
            </p>
            <p className="pt-1 text-base leading-relaxed text-zinc-600 dark:text-zinc-300 sm:text-lg">
              {personalInfo.summary}
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-zinc-300/70 bg-zinc-200/50 p-4 dark:border-white/10 dark:bg-white/5">
              <p className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-500">
                <FaMapMarkerAlt className="text-[11px]" /> Address
              </p>
              <p className="mt-2 text-sm font-medium sm:text-base">
                {personalInfo.location}
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-300/70 bg-zinc-200/50 p-4 dark:border-white/10 dark:bg-white/5">
              <p className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-500">
                <FaUserGraduate className="text-[11px]" /> Role
              </p>
              <p className="mt-2 text-sm font-medium sm:text-base">
                {personalInfo.role}
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-300/70 bg-zinc-200/50 p-4 dark:border-white/10 dark:bg-white/5">
              <p className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-500">
                <FaPalette className="text-[11px]" /> Focus
              </p>
              <p className="mt-2 text-sm font-medium sm:text-base">
                {personalInfo.focus}
              </p>
            </div>
          </div>
        </GlassCard>

        <motion.div
          onMouseMove={onTiltMove}
          onMouseLeave={() => setTilt({ rotateX: 0, rotateY: 0 })}
          animate={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY }}
          transition={{ type: "spring", stiffness: 170, damping: 12 }}
          className="glass rounded-2xl p-5 sm:p-6"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="rounded-2xl border border-zinc-300/70 bg-zinc-100/70 p-4 dark:border-white/10 dark:bg-black/40 sm:p-5"
            style={{ transform: "translateZ(30px)" }}
          >
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
            <p className="mt-4 text-sm uppercase tracking-[0.2em] text-zinc-400">
              Profile Card
            </p>
            <h3 className="mt-2 text-2xl font-semibold">{personalInfo.name}</h3>
            <p className="mt-2.5 text-zinc-400">
              Building practical software and web solutions through continuous
              learning and hands-on project work.
            </p>
            <div className="mt-5 flex gap-3 text-xl text-zinc-400">
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="transition hover:-translate-y-0.5 hover:text-white"
              >
                <FaGithub />
              </a>
              <a
                href={personalInfo.socials.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="transition hover:-translate-y-0.5 hover:text-white"
              >
                <FaFacebookF />
              </a>
              <a
                href={personalInfo.socials.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="transition hover:-translate-y-0.5 hover:text-white"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  );
}

export default AboutSection;
