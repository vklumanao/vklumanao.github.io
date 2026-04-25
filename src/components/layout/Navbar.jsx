import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaBars, FaChevronDown, FaSearch, FaTimes } from "react-icons/fa";
import logoCombo from "../../assets/branding/logo-combo.svg";
import ThemeToggle from "../ui/ThemeToggle";

const coreNavIds = new Set(["home", "about", "projects", "contact"]);

function Navbar({
  navLinks,
  activeSection,
  navigateTo,
  theme,
  onToggleTheme,
  mobileOpen,
  setMobileOpen,
  onOpenCommand,
}) {
  const [moreOpen, setMoreOpen] = useState(false);
  const moreMenuRef = useRef(null);

  const coreLinks = useMemo(
    () => navLinks.filter((link) => coreNavIds.has(link.id)),
    [navLinks],
  );
  const moreLinks = useMemo(
    () => navLinks.filter((link) => !coreNavIds.has(link.id)),
    [navLinks],
  );
  const isMoreActive = moreLinks.some((link) => link.id === activeSection);

  useEffect(() => {
    const onDocumentClick = (event) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
        setMoreOpen(false);
      }
    };

    const onEscape = (event) => {
      if (event.key === "Escape") {
        setMoreOpen(false);
      }
    };

    document.addEventListener("mousedown", onDocumentClick);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onDocumentClick);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  const handleNavigate = (id) => {
    navigateTo(id);
    setMoreOpen(false);
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b border-zinc-300/50 bg-zinc-100/70 backdrop-blur-xl transition-colors dark:border-white/10 dark:bg-black/45">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <button
          onClick={() => handleNavigate("home")}
          className="flex items-center gap-2 text-lg font-semibold"
          aria-label="Go to home"
        >
          <img
            src={logoCombo}
            alt="Vicryl Kez Lumanao logo"
            className="h-8 w-auto dark:invert"
          />
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {coreLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavigate(link.id)}
              className={`rounded-full px-3 py-2 text-sm transition ${
                activeSection === link.id
                  ? "bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                  : "text-zinc-600 hover:bg-zinc-300/40 dark:text-zinc-300 dark:hover:bg-white/10"
              }`}
            >
              {link.label}
            </button>
          ))}

          {moreLinks.length > 0 && (
            <div className="relative" ref={moreMenuRef}>
              <button
                type="button"
                onClick={() => setMoreOpen((prev) => !prev)}
                className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm transition ${
                  isMoreActive || moreOpen
                    ? "bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                    : "text-zinc-600 hover:bg-zinc-300/40 dark:text-zinc-300 dark:hover:bg-white/10"
                }`}
              >
                More
                <FaChevronDown
                  className={`text-xs transition ${moreOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="glass absolute right-0 mt-2 w-48 overflow-hidden rounded-2xl p-1"
                  >
                    {moreLinks.map((link) => (
                      <button
                        key={link.id}
                        onClick={() => handleNavigate(link.id)}
                        className={`block w-full rounded-xl px-3 py-2 text-left text-sm transition ${
                          activeSection === link.id
                            ? "bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                            : "hover:bg-zinc-300/30 dark:hover:bg-white/10"
                        }`}
                      >
                        {link.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCommand}
            className="glass hidden items-center gap-2 rounded-full px-3 py-2 text-xs text-zinc-600 transition hover:scale-[1.02] dark:text-zinc-200 md:inline-flex"
            aria-label="Open command palette"
          >
            <FaSearch /> Ctrl + K
          </button>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            className="glass rounded-full p-2 md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass mx-4 mb-4 overflow-hidden rounded-2xl p-3 md:hidden"
          >
            <p className="px-3 pb-1 pt-2 text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">
              Core
            </p>
            {coreLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavigate(link.id)}
                className="block min-h-11 w-full rounded-xl px-3 py-2 text-left text-sm hover:bg-white/10"
              >
                {link.label}
              </button>
            ))}
            {moreLinks.length > 0 && (
              <>
                <p className="px-3 pb-1 pt-3 text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">
                  More
                </p>
                {moreLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNavigate(link.id)}
                    className="block min-h-11 w-full rounded-xl px-3 py-2 text-left text-sm hover:bg-white/10"
                  >
                    {link.label}
                  </button>
                ))}
              </>
            )}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
