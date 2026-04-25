import { FaGraduationCap } from "react-icons/fa";
import SectionContainer from "../layout/SectionContainer";

function EducationSection({ education }) {
  return (
    <SectionContainer id="education" title="Education">
      <div className="grid gap-4 md:grid-cols-2">
        {education.map((item) => (
          <article key={item.level} className="glass rounded-2xl p-5 sm:p-6">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-xs text-zinc-500 dark:text-zinc-300">
              <FaGraduationCap /> {item.period}
            </div>
            <h3 className="text-xl font-semibold">{item.level}</h3>
            <p className="mt-2 font-medium text-zinc-700 dark:text-zinc-200">
              {item.school}
            </p>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {item.location}
            </p>
          </article>
        ))}
      </div>
    </SectionContainer>
  );
}

export default EducationSection;
