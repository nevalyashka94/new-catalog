import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const tabs = [
  { to: "/", label: "Главная", end: true },
  { to: "/catalog", label: "Каталог" },
  { to: "/regions", label: "Регионы" },
  { to: "/brands", label: "Бренды" },
];

export default function Nav() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--color-obsidian)] via-[var(--color-obsidian)]/85 to-transparent" />
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-8 lg:px-12">
        <NavLink to="/" className="group flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-bronze)]/50 bg-gradient-to-br from-[var(--color-obsidian-3)] to-[var(--color-obsidian)] font-display text-sm font-bold text-[var(--color-bronze-glow)] transition-shadow duration-300 group-hover:shadow-[0_0_18px_rgba(240,201,137,0.35)]">
            A
          </span>
          <span className="font-display text-lg font-semibold tracking-wide text-[var(--color-cloud)]">
            AURELIA
          </span>
        </NavLink>

        <nav className="flex items-center gap-1 rounded-full border border-[var(--color-cloud)]/10 bg-[var(--color-obsidian-2)]/70 p-1 backdrop-blur-xl">
          {tabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.end}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 font-body text-xs font-semibold uppercase tracking-widest transition-all duration-300 ${
                  isActive
                    ? "bg-[var(--color-bronze)] text-[var(--color-obsidian)]"
                    : "text-[var(--color-cloud-dim)] hover:text-[var(--color-cloud)]"
                }`
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Включить светлую тему" : "Включить тёмную тему"}
          className="ml-4 flex items-center gap-2 rounded-full border border-[var(--color-cloud)]/15 bg-[var(--color-obsidian-2)]/70 px-4 py-2.5 font-body text-xs font-semibold text-[var(--color-cloud-dim)] backdrop-blur-xl transition-all duration-300 hover:border-[var(--color-bronze)]/40 hover:text-[var(--color-cloud)]"
        >
          <span className="transition-transform duration-300">{theme === "dark" ? "☀️" : "🌙"}</span>
          <span className="hidden tracking-wide sm:inline">{theme === "dark" ? "Светлая" : "Тёмная"}</span>
        </button>
      </div>
    </header>
  );
}
