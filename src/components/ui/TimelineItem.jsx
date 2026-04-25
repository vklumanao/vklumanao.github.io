import { AnimatePresence, motion } from "framer-motion";

function TimelineItem({ item, icon: Icon, expanded, onToggle }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="relative mb-8"
    >
      <div className="absolute -left-10 top-2 rounded-full border border-white/20 bg-zinc-900 p-2 text-white dark:bg-white dark:text-zinc-900">
        <Icon />
      </div>
      <button
        type="button"
        onClick={onToggle}
        className="glass w-full rounded-2xl p-5 text-left transition hover:-translate-y-0.5"
      >
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {item.period}
        </p>
        <h3 className="mt-1 text-xl font-semibold">{item.title}</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {item.subtitle}
        </p>
        <p className="mt-2 text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {expanded ? "Hide details" : "View details"}
        </p>
        <AnimatePresence>
          {expanded && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 overflow-hidden text-zinc-700 dark:text-zinc-300"
            >
              {item.description}
            </motion.p>
          )}
        </AnimatePresence>
      </button>
    </motion.article>
  );
}

export default TimelineItem;
