import { AnimatePresence, motion } from "framer-motion";

function Toast({ open, message }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-6 z-[70] rounded-xl bg-zinc-900 px-4 py-3 text-sm text-white shadow-glow dark:bg-white dark:text-zinc-900"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Toast;
