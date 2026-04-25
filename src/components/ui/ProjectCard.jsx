import { motion } from "framer-motion";

function ProjectCard({ project, onOpen, onMouseMove }) {
  const impactLine = project.impact ?? project.description;
  const collaborationType =
    project.collaboration ??
    (project.role?.toLowerCase().includes("team") ? "Team" : "Solo");

  return (
    <motion.article
      layout
      onMouseMove={onMouseMove}
      className="group hover-glow glass relative cursor-pointer overflow-hidden rounded-2xl"
      whileHover={{ y: -4 }}
      onClick={() => onOpen(project.title)}
    >
      <img
        src={project.image}
        alt={project.title}
        className="h-44 w-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
      />
      <div className="space-y-3 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xl font-semibold">{project.title}</h3>
          <span className="inline-flex items-center whitespace-nowrap rounded-full border border-white/20 px-3 py-1 text-xs leading-none text-zinc-500 dark:text-zinc-300">
            {project.category}
          </span>
        </div>
        <p className="line-clamp-2 text-sm text-zinc-700 dark:text-zinc-300">
          {impactLine}
        </p>
        <p className="text-xs uppercase tracking-wide text-zinc-500">
          {project.role} • {project.year} • {collaborationType}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center whitespace-nowrap rounded-full border border-zinc-300/70 bg-zinc-200/40 px-2.5 py-1 text-xs leading-none text-zinc-600 dark:border-white/15 dark:bg-white/5 dark:text-zinc-300"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onOpen(project.title);
            }}
            className="min-h-10 rounded-xl border border-white/20 px-3 py-2 text-center text-xs sm:text-sm"
          >
            View Project
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default ProjectCard;
