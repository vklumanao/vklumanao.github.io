import { motion } from "framer-motion";
import { FaCode, FaCodeBranch } from "react-icons/fa6";
import {
  SiExpress,
  SiFigma,
  SiFirebase,
  SiFramer,
  SiGit,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostman,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from "react-icons/si";
import SectionContainer from "../layout/SectionContainer";

const skillIconMap = {
  React: SiReact,
  TypeScript: SiTypescript,
  "Tailwind CSS": SiTailwindcss,
  "Framer Motion": SiFramer,
  "Next.js": SiNextdotjs,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  Firebase: SiFirebase,
  MongoDB: SiMongodb,
  "REST API": FaCodeBranch,
  Git: SiGit,
  Figma: SiFigma,
  Postman: SiPostman,
  Vite: SiVite,
  "VS Code": FaCode,
};

function SkillsSection({ skillGroups, onGlowMove }) {
  const marqueeItems = [
    ...skillGroups.flatMap((group) => group.items),
    ...skillGroups.flatMap((group) => group.items),
  ];

  return (
    <SectionContainer id="skills" title="Skills">
      <div className="mb-8 hidden overflow-hidden rounded-2xl border border-zinc-300/60 bg-zinc-200/40 py-3 dark:border-white/10 dark:bg-white/5 sm:block">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="flex min-w-max gap-4 px-4 text-sm text-zinc-600 dark:text-zinc-300"
        >
          {marqueeItems.map((item, index) => {
            const Icon = skillIconMap[item];
            return (
              <span
                key={`${item}-${index}`}
                className="inline-flex items-center gap-2 rounded-full border border-zinc-400/30 px-3 py-1.5 dark:border-white/20"
              >
                {Icon && <Icon className="text-base" aria-hidden="true" />}
                {item}
              </span>
            );
          })}
        </motion.div>
      </div>

      <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
        {skillGroups.map((group) => (
          <div
            key={group.title}
            onMouseMove={onGlowMove}
            className="hover-glow glass rounded-2xl p-5 transition duration-300 hover:-translate-y-1 sm:p-6"
          >
            <h3 className="mb-4 text-xl font-semibold">{group.title}</h3>
            <ul className="grid grid-cols-2 gap-2 text-zinc-600 dark:text-zinc-300">
              {group.items.map((item) => {
                const Icon = skillIconMap[item];
                return (
                  <li
                    key={item}
                    className="rounded-xl border border-zinc-300/60 bg-zinc-200/30 px-3 py-3 dark:border-white/10 dark:bg-white/5"
                  >
                    <div className="flex flex-col items-center gap-2 text-center">
                      {Icon && <Icon className="text-2xl" aria-hidden="true" />}
                      <span className="text-xs">{item}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}

export default SkillsSection;
