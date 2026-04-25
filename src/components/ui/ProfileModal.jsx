import Modal from "./Modal";

function ProfileModal({ open, onClose, image, name }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      zIndex="z-[65]"
      className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/20 bg-black"
    >
      <img
        src={image}
        alt={`${name} profile zoomed`}
        className="max-h-[80vh] w-full object-contain"
      />
      <button
        type="button"
        onClick={onClose}
        className="absolute right-3 top-3 rounded-full border border-white/30 bg-black/70 px-3 py-1 text-sm text-white transition hover:bg-black/90"
      >
        Close
      </button>
    </Modal>
  );
}

export default ProfileModal;
