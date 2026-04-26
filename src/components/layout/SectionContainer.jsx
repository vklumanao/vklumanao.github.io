import { motion, useReducedMotion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";
import {
  itemVariants,
  sectionVariants,
  sectionViewport,
} from "../../lib/motion";

function SectionContainer({ id, title, children }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id={id}
      className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
    >
      <motion.div
        initial={prefersReducedMotion ? false : "hidden"}
        whileInView={prefersReducedMotion ? undefined : "show"}
        viewport={sectionViewport}
        variants={prefersReducedMotion ? undefined : sectionVariants}
      >
        <motion.div variants={prefersReducedMotion ? undefined : itemVariants}>
          <SectionTitle>{title}</SectionTitle>
        </motion.div>
        <motion.div variants={prefersReducedMotion ? undefined : itemVariants}>
          {children}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default SectionContainer;
