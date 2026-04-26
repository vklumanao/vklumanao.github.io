export const sectionViewport = { once: true, amount: 0.2 };

export const sectionVariants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.52,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.07,
      delayChildren: 0.03,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
  },
};

export const ambientFloat = {
  duration: 24,
  repeat: Infinity,
  repeatType: "mirror",
  ease: [0.4, 0, 0.2, 1],
};

export const hoverLift = { y: -3, scale: 1.01 };
export const hoverLiftSoft = { y: -2 };
export const tapPress = { scale: 0.985 };
export const hoverTransition = { duration: 0.18, ease: [0.22, 1, 0.36, 1] };
