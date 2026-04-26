import { FaBriefcase } from "react-icons/fa";
import SectionContainer from "../layout/SectionContainer";

function ExperienceSection({ workExperience }) {
  return (
    <SectionContainer id="experience" title="Work Experience">
      <div className="relative ml-3 border-l border-zinc-300 pl-6 dark:border-white/15">
        {workExperience.map((item) => (
          <article
            key={`${item.title}-${item.period}`}
            className="relative mb-6 last:mb-0"
          >
            <div className="absolute -left-10 top-2 rounded-full border border-white/20 bg-zinc-900 p-2 text-white dark:bg-white dark:text-zinc-900">
              <FaBriefcase />
            </div>
            <div className="glass rounded-2xl p-5 sm:p-6">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {item.period}
              </p>
              <h3 className="mt-1 text-xl font-semibold">{item.title}</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {item.organization}
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-zinc-700 dark:text-zinc-300">
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </SectionContainer>
  );
}

export default ExperienceSection;
