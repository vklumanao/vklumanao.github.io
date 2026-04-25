import { FaMoon, FaSun } from 'react-icons/fa'

function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="glass rounded-full p-2 text-zinc-700 transition hover:scale-105 dark:text-zinc-100"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <FaSun /> : <FaMoon />}
    </button>
  )
}

export default ThemeToggle


