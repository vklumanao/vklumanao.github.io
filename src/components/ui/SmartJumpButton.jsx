import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

function SmartJumpButton({ activeSection, navLinks, onNavigate, hidden }) {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 240);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const action = useMemo(() => {
    const activeIndex = navLinks.findIndex((link) => link.id === activeSection);

    if (activeIndex === -1) {
      return {
        id: navLinks[1]?.id ?? navLinks[0]?.id,
        label: navLinks[1]?.label ?? navLinks[0]?.label ?? "Next",
        isTop: false,
      };
    }

    if (activeIndex >= navLinks.length - 1) {
      return {
        id: "home",
        label: "Back to Top",
        isTop: true,
      };
    }

    const next = navLinks[activeIndex + 1];
    return {
      id: next.id,
      label: `Next: ${next.label}`,
      isTop: false,
    };
  }, [activeSection, navLinks]);

  if (!visible || hidden || !action?.id) return null;

  return (
    <motion.button
      type="button"
      onClick={() => onNavigate(action.id)}
      aria-label={action.label}
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={prefersReducedMotion ? undefined : { opacity: 0, y: 12 }}
      className="glass fixed bottom-5 right-5 z-40 inline-flex min-h-11 items-center gap-2 rounded-full border border-zinc-300/60 bg-zinc-100/85 px-4 py-2 text-xs font-medium text-zinc-700 shadow-lg shadow-zinc-300/25 transition hover:-translate-y-0.5 dark:border-white/15 dark:bg-black/65 dark:text-zinc-100 dark:shadow-black/35"
    >
      {action.isTop ? <FaArrowUp aria-hidden="true" /> : <FaArrowDown aria-hidden="true" />}
      <span>{action.label}</span>
    </motion.button>
  );
}

export default SmartJumpButton;
