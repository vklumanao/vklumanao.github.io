import { motion } from "framer-motion";

function Preloader() {
  return (
    <motion.div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-zinc-100/95 backdrop-blur-md dark:bg-[#050505]/95"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(8px)" }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Loading website"
      role="status"
    >
      <div className="w-[min(90vw,360px)] rounded-3xl border border-zinc-300/70 bg-zinc-200/60 px-7 py-8 text-center shadow-xl dark:border-white/10 dark:bg-white/5">
        <motion.div
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-300/70 bg-zinc-100/80 text-lg font-bold tracking-[0.12em] text-zinc-800 dark:border-white/20 dark:bg-black/40 dark:text-zinc-100"
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
          VKL
        </motion.div>

        <p className="mt-4 text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
          Loading Portfolio
        </p>

        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-zinc-300/70 dark:bg-white/10">
          <motion.div
            className="h-full rounded-full bg-zinc-800 dark:bg-zinc-200"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        <div className="mt-4 flex justify-center gap-2">
          {[0, 1, 2].map((dot) => (
            <motion.span
              key={dot}
              className="h-2 w-2 rounded-full bg-zinc-500 dark:bg-zinc-300"
              animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: dot * 0.12,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default Preloader;
