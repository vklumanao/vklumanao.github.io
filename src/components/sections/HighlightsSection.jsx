import { useState } from "react";
import { FaAward } from "react-icons/fa";
import SectionContainer from "../layout/SectionContainer";

function HighlightsSection({ highlights }) {
  const [showAllHighlights, setShowAllHighlights] = useState(false);
  const visibleHighlights = showAllHighlights ? highlights : highlights.slice(0, 4);

  return (
    <SectionContainer id="highlights" title="Academic Highlights">
      <div className="grid gap-4 md:grid-cols-2">
        {visibleHighlights.map((item) => (
          <article
            key={`${item.title}-${item.period}`}
            className="glass rounded-2xl p-5 sm:p-6"
          >
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-xs text-zinc-500 dark:text-zinc-300">
              <FaAward /> {item.period}
            </div>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {item.organization}
            </p>
          </article>
        ))}
      </div>

      {highlights.length > 4 && (
        <div className="mt-4 sm:hidden">
          <button
            type="button"
            onClick={() => setShowAllHighlights((prev) => !prev)}
            className="w-full rounded-xl border border-zinc-300/70 bg-zinc-200/40 px-4 py-2.5 text-sm font-medium dark:border-white/15 dark:bg-white/5"
          >
            {showAllHighlights ? "Show Less Highlights" : "Show More Highlights"}
          </button>
        </div>
      )}
    </SectionContainer>
  );
}

export default HighlightsSection;
