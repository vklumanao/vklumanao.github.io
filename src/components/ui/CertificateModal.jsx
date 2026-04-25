import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import GlassCard from './GlassCard'
import Modal from './Modal'

function CertificateModal({ certificate, open, onClose, onPrev, onNext }) {
  return (
    <Modal open={open} onClose={onClose} zIndex="z-[62]" className="relative w-full max-w-4xl overflow-hidden rounded-2xl">
      <GlassCard className="relative overflow-hidden rounded-2xl">
        {certificate && (
          <>
            <img src={certificate.image} alt={certificate.title} className="max-h-[75vh] w-full object-contain bg-black" />
            <div className="flex items-center justify-between p-4">
              <p className="text-sm font-medium">{certificate.title}</p>
              <p className="text-xs text-zinc-500">Use ? / ? keys to browse certificates</p>
            </div>
            <button
              type="button"
              onClick={onPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/60 p-2 text-white"
            >
              <FaChevronLeft />
            </button>
            <button
              type="button"
              onClick={onNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/60 p-2 text-white"
            >
              <FaChevronRight />
            </button>
          </>
        )}
      </GlassCard>
    </Modal>
  )
}

export default CertificateModal


