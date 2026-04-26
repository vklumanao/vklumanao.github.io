import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FaBars, FaChevronDown, FaSearch, FaTimes } from "react-icons/fa";
import logoCombo from "../../assets/branding/logo-combo.svg";
import ThemeToggle from "../ui/ThemeToggle";

const coreNavIds = new Set(["home", "about", "projects", "contact"]);
const philippinesCities = [
  { id: "manila", name: "Manila", latitude: 14.5995, longitude: 120.9842 },
  { id: "cebu", name: "Cebu", latitude: 10.3157, longitude: 123.8854 },
  { id: "davao", name: "Davao", latitude: 7.1907, longitude: 125.4553 },
  { id: "iloilo", name: "Iloilo", latitude: 10.7202, longitude: 122.5621 },
  { id: "baguio", name: "Baguio", latitude: 16.4023, longitude: 120.596 },
];

const weatherLabels = {
  0: "Clear",
  1: "Mostly Clear",
  2: "Partly Cloudy",
  3: "Cloudy",
  45: "Foggy",
  48: "Foggy",
  51: "Light Drizzle",
  53: "Drizzle",
  55: "Heavy Drizzle",
  56: "Freezing Drizzle",
  57: "Freezing Drizzle",
  61: "Light Rain",
  63: "Rain",
  65: "Heavy Rain",
  66: "Freezing Rain",
  67: "Freezing Rain",
  71: "Light Snow",
  73: "Snow",
  75: "Heavy Snow",
  77: "Snow Grains",
  80: "Rain Showers",
  81: "Rain Showers",
  82: "Heavy Showers",
  85: "Snow Showers",
  86: "Snow Showers",
  95: "Thunderstorm",
  96: "Thunderstorm",
  99: "Thunderstorm",
};

const formatPhilippineTime = (date) =>
  new Intl.DateTimeFormat("en-PH", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Manila",
  }).format(date);

const getWeatherLabel = (code) =>
  Object.hasOwn(weatherLabels, code) ? weatherLabels[code] : "Weather";

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
  const prefersReducedMotion = useReducedMotion();
  const [moreOpen, setMoreOpen] = useState(false);
  const [tickerIndex, setTickerIndex] = useState(0);
  const [weatherByCity, setWeatherByCity] = useState({});
  const [now, setNow] = useState(() => new Date());
  const [tickerPaused, setTickerPaused] = useState(false);
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

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (tickerPaused || philippinesCities.length <= 1) return undefined;

    const tickerMs = prefersReducedMotion ? 6500 : 4500;
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % philippinesCities.length);
    }, tickerMs);

    return () => clearInterval(timer);
  }, [tickerPaused, prefersReducedMotion]);

  useEffect(() => {
    let cancelled = false;

    const fetchWeather = async () => {
      const responses = await Promise.all(
        philippinesCities.map(async (city) => {
          try {
            const params = new URLSearchParams({
              latitude: String(city.latitude),
              longitude: String(city.longitude),
              current: "weather_code",
              timezone: "Asia/Manila",
            });
            const response = await fetch(
              `https://api.open-meteo.com/v1/forecast?${params.toString()}`,
            );
            if (!response.ok) {
              throw new Error(`Weather request failed for ${city.name}`);
            }
            const data = await response.json();
            return [city.id, getWeatherLabel(data?.current?.weather_code)];
          } catch {
            return [city.id, "Weather unavailable"];
          }
        }),
      );

      if (!cancelled) {
        setWeatherByCity(Object.fromEntries(responses));
      }
    };

    fetchWeather();
    const intervalId = setInterval(fetchWeather, 10 * 60 * 1000);

    return () => {
      cancelled = true;
      clearInterval(intervalId);
    };
  }, []);

  const handleNavigate = (id) => {
    navigateTo(id);
    setMoreOpen(false);
  };

  const activeCity = philippinesCities[tickerIndex] ?? philippinesCities[0];
  const activeWeather = weatherByCity[activeCity.id] || "Fetching weather";
  const currentTime = formatPhilippineTime(now);
  const tickerText = `${activeCity.name}, ${activeWeather} | ${currentTime}`;

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
          <div
            className="hidden max-w-[18rem] overflow-hidden rounded-full border border-zinc-300/50 bg-zinc-200/35 px-3 py-2 text-xs text-zinc-700 dark:border-white/15 dark:bg-white/5 dark:text-zinc-200 lg:block"
            onMouseEnter={() => setTickerPaused(true)}
            onMouseLeave={() => setTickerPaused(false)}
          >
            <AnimatePresence initial={false} mode="wait">
              <motion.p
                key={activeCity.id}
                initial={
                  prefersReducedMotion ? { opacity: 1 } : { y: 16, opacity: 0 }
                }
                animate={{ y: 0, opacity: 1 }}
                exit={
                  prefersReducedMotion ? { opacity: 1 } : { y: -16, opacity: 0 }
                }
                transition={{ duration: prefersReducedMotion ? 0 : 0.28 }}
                className="truncate"
                aria-live="polite"
              >
                {tickerText}
              </motion.p>
            </AnimatePresence>
          </div>

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
            <p className="rounded-xl border border-zinc-300/50 bg-zinc-200/35 px-3 py-2 text-xs text-zinc-700 dark:border-white/15 dark:bg-white/5 dark:text-zinc-200">
              {tickerText}
            </p>
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
