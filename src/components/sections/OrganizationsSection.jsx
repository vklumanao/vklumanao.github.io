import { useState } from "react";
import { FaUsers } from "react-icons/fa";
import SectionContainer from "../layout/SectionContainer";

function OrganizationsSection({ organizations }) {
  const [showAllOrganizations, setShowAllOrganizations] = useState(false);
  const visibleOrganizations = showAllOrganizations
    ? organizations
    : organizations.slice(0, 4);

  return (
    <SectionContainer id="organizations" title="Organizations">
      <div className="glass rounded-2xl p-5 sm:p-6">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-xs text-zinc-500 dark:text-zinc-300">
          <FaUsers /> Leadership & Community Involvement
        </div>
        <div className="flex flex-wrap gap-2">
          {visibleOrganizations.map((org) => (
            <span
              key={org}
              className="rounded-full border border-zinc-300/70 bg-zinc-200/50 px-4 py-2 text-sm dark:border-white/15 dark:bg-white/5"
            >
              {org}
            </span>
          ))}
        </div>

        {organizations.length > 4 && (
          <button
            type="button"
            onClick={() => setShowAllOrganizations((prev) => !prev)}
            className="mt-4 w-full rounded-xl border border-zinc-300/70 bg-zinc-200/40 px-4 py-2.5 text-sm font-medium dark:border-white/15 dark:bg-white/5 sm:hidden"
          >
            {showAllOrganizations
              ? "Show Less Organizations"
              : "Show More Organizations"}
          </button>
        )}
      </div>
    </SectionContainer>
  );
}

export default OrganizationsSection;
