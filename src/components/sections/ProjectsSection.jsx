import SectionContainer from "../layout/SectionContainer";
import ProjectCard from "../ui/ProjectCard";

function ProjectsSection({
  categories,
  filter,
  setFilter,
  filteredProjects,
  allProjects,
  onOpenProject,
  onGlowMove,
}) {
  const featuredProject =
    filteredProjects.find((project) => project.featured) || filteredProjects[0];
  const featuredImpact =
    featuredProject?.impact ?? featuredProject?.description;
  const featuredCollaboration =
    featuredProject?.collaboration ??
    (featuredProject?.role?.toLowerCase().includes("team") ? "Team" : "Solo");
  const gridProjects = featuredProject
    ? filteredProjects.filter(
        (project) => project.title !== featuredProject.title,
      )
    : [];

  const categoryCounts = categories.reduce((acc, category) => {
    acc[category] =
      category === "All"
        ? allProjects.length
        : allProjects.filter((project) => project.category === category).length;
    return acc;
  }, {});

  return (
    <SectionContainer id="projects" title="Projects">
      <div className="glass mb-6 inline-flex flex-wrap items-center gap-2 rounded-2xl p-2 sm:mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`inline-flex items-center whitespace-nowrap rounded-full px-4 py-2 text-sm leading-none transition ${
              filter === category
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "hover:bg-zinc-300/40 dark:hover:bg-white/10"
            }`}
          >
            {category} ({categoryCounts[category] ?? 0})
          </button>
        ))}
      </div>

      {!featuredProject && (
        <div className="glass rounded-2xl p-6 text-center">
          <p className="text-zinc-600 dark:text-zinc-300">
            No projects found for this category.
          </p>
          <button
            type="button"
            onClick={() => setFilter("All")}
            className="mt-4 rounded-xl bg-zinc-900 px-4 py-2 text-sm text-white dark:bg-zinc-100 dark:text-zinc-900"
          >
            Reset Filters
          </button>
        </div>
      )}

      {featuredProject && (
        <article
          onMouseMove={onGlowMove}
          className="group hover-glow glass mb-6 overflow-hidden rounded-2xl sm:mb-8"
        >
          <div className="grid md:grid-cols-[1.25fr_1fr]">
            <div className="overflow-hidden">
              <img
                src={featuredProject.image}
                alt={featuredProject.title}
                className="h-full min-h-60 w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="space-y-4 p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h3 className="text-2xl font-semibold leading-tight">
                  {featuredProject.title}
                </h3>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center whitespace-nowrap rounded-full border border-white/20 px-3 py-1 text-xs leading-none text-zinc-500 dark:text-zinc-300">
                    Featured
                  </span>
                  <span className="inline-flex items-center whitespace-nowrap rounded-full border border-white/20 px-3 py-1 text-xs leading-none text-zinc-500 dark:text-zinc-300">
                    {featuredProject.category}
                  </span>
                  <span className="inline-flex items-center whitespace-nowrap rounded-full border border-white/20 px-3 py-1 text-xs leading-none text-zinc-500 dark:text-zinc-300">
                    {featuredProject.status}
                  </span>
                </div>
              </div>
              <p className="line-clamp-3 text-sm font-medium text-zinc-700 dark:text-zinc-200">
                {featuredImpact}
              </p>
              <p className="text-xs uppercase tracking-wide text-zinc-500">
                {featuredProject.role} • {featuredProject.year} •{" "}
                {featuredCollaboration}
              </p>
              <div className="flex flex-wrap gap-2">
                {featuredProject.stack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center whitespace-nowrap rounded-full border border-zinc-300/70 bg-zinc-200/40 px-3 py-1 text-xs leading-none text-zinc-600 dark:border-white/15 dark:bg-white/5 dark:text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex">
                <button
                  type="button"
                  onClick={() => onOpenProject(featuredProject.title)}
                  className="min-h-10 rounded-xl border border-white/20 px-3 py-2 text-xs sm:text-sm"
                >
                  View Project
                </button>
              </div>
            </div>
          </div>
        </article>
      )}

      {gridProjects.length > 0 && (
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          {gridProjects.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              onOpen={onOpenProject}
              onMouseMove={onGlowMove}
            />
          ))}
        </div>
      )}
    </SectionContainer>
  );
}

export default ProjectsSection;
