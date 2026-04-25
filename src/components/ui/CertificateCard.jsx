import { motion } from "framer-motion";

function CertificateCard({ certificate, onOpen, index }) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(index)}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      whileHover={{ y: -4 }}
      className="glass overflow-hidden rounded-2xl text-left"
    >
      <img
        src={certificate.image}
        alt={certificate.title}
        className="h-40 w-full object-cover"
        loading="lazy"
      />
      <div className="p-3">
        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
          {certificate.title}
        </p>
      </div>
    </motion.button>
  );
}

export default CertificateCard;


