import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";

function SectionContainer({ id, title, children }) {
  return (
    <section
      id={id}
      className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <SectionTitle>{title}</SectionTitle>
        {children}
      </motion.div>
    </section>
  );
}

export default SectionContainer;
