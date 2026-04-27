import { FaChevronLeft, FaChevronRight, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import GlassCard from "./GlassCard";
import Modal from "./Modal";

function ProjectModal({ project, open, onClose, onPrev, onNext }) {
  const impactLine = project?.impact ?? project?.description;
  const collaborationType = project?.collaboration ?? "Solo";

  return (
    <Modal
      open={open}
      onClose={onClose}
      className="relative w-full max-w-2xl overflow-hidden rounded-2xl"
    >
      <GlassCard className="relative overflow-hidden rounded-2xl">
        {project && (
          <>
            <img
              src={project.image}
              alt={project.title}
              className="h-56 w-full object-cover"
            />

            <div className="space-y-5 p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h3 className="text-2xl font-semibold leading-tight">{project.title}</h3>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center whitespace-nowrap rounded-full border border-white/20 px-3 py-1 text-xs leading-none text-zinc-500 dark:text-zinc-300">
                    {project.category}
                  </span>
                  <span className="inline-flex items-center whitespace-nowrap rounded-full border border-white/20 px-3 py-1 text-xs leading-none text-zinc-500 dark:text-zinc-300">
                    {project.status}
                  </span>
                </div>
              </div>

              <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
                {impactLine}
              </p>

              <div className="grid gap-2 sm:grid-cols-3">
                <div className="rounded-xl border border-zinc-300/70 bg-zinc-200/40 px-3 py-2 dark:border-white/15 dark:bg-white/5">
                  <p className="text-[11px] uppercase tracking-wide text-zinc-500">Role</p>
                  <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">{project.role}</p>
                </div>
                <div className="rounded-xl border border-zinc-300/70 bg-zinc-200/40 px-3 py-2 dark:border-white/15 dark:bg-white/5">
                  <p className="text-[11px] uppercase tracking-wide text-zinc-500">Year</p>
                  <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">{project.year}</p>
                </div>
                <div className="rounded-xl border border-zinc-300/70 bg-zinc-200/40 px-3 py-2 dark:border-white/15 dark:bg-white/5">
                  <p className="text-[11px] uppercase tracking-wide text-zinc-500">Type</p>
                  <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">{collaborationType}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center whitespace-nowrap rounded-full border border-zinc-300/70 bg-zinc-200/40 px-3 py-1 text-xs leading-none text-zinc-600 dark:border-white/15 dark:bg-white/5 dark:text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="min-h-10 rounded-xl bg-zinc-900 px-3 py-2 text-center text-xs text-white sm:text-sm dark:bg-zinc-100 dark:text-zinc-900"
                >
                  Live Demo <FaExternalLinkAlt className="ml-1 inline" />
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="min-h-10 rounded-xl border border-white/20 px-3 py-2 text-center text-xs sm:text-sm"
                >
                  GitHub <FaGithub className="ml-1 inline" />
                </a>
              </div>

              <p className="text-xs text-zinc-500">
                Tip: use left and right arrow keys to browse projects.
              </p>
            </div>

            <button
              type="button"
              onClick={onPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/60 p-2 text-white"
              aria-label="Previous project"
            >
              <FaChevronLeft />
            </button>
            <button
              type="button"
              onClick={onNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/60 p-2 text-white"
              aria-label="Next project"
            >
              <FaChevronRight />
            </button>
          </>
        )}
      </GlassCard>
    </Modal>
  );
}

export default ProjectModal;
