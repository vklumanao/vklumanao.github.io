import { FaSearch } from "react-icons/fa";
import Modal from "../ui/Modal";

function CommandPalette({ open, onClose, query, setQuery, results, onSelect }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      zIndex="z-[80]"
      className="glass w-full max-w-2xl overflow-hidden rounded-2xl"
    >
      <div className="border-b border-white/10 p-4">
        <div className="flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2">
          <FaSearch className="text-zinc-500" />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search sections, projects, or actions..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-500"
          />
        </div>
      </div>
      <div className="max-h-80 overflow-y-auto p-2">
        {results.length === 0 && (
          <p className="p-3 text-sm text-zinc-500">No matching actions.</p>
        )}
        {results.map((action) => (
          <button
            key={action.id}
            type="button"
            onClick={() => onSelect(action)}
            className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition hover:bg-white/10"
          >
            <span className="text-sm">{action.label}</span>
            <span className="text-xs text-zinc-500">{action.hint}</span>
          </button>
        ))}
      </div>
    </Modal>
  );
}

export default CommandPalette;
