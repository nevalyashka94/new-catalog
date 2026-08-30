import { regions } from "../data/mock";

export default function Regions() {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-32 sm:px-8 lg:px-12">
      <p className="font-data text-xs uppercase tracking-[0.3em] text-[var(--color-bronze-glow)]">Дилеры</p>
      <h1 className="mt-3 font-display text-4xl font-semibold text-[var(--color-cloud)] sm:text-5xl">
        Регионы присутствия
      </h1>
      <p className="mt-4 max-w-xl font-body text-[var(--color-cloud-dim)]">
        {regions.reduce((sum, r) => sum + r.dealers, 0)} дилерских центров в {regions.length} городах России.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {regions.map((r) => (
          <div
            key={r.id}
            className="rounded-2xl border border-[var(--color-cloud)]/10 bg-[var(--color-obsidian-2)] p-6 transition-colors duration-300 hover:border-[var(--color-bronze)]/40"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-display text-lg font-semibold text-[var(--color-cloud)]">{r.city}</h3>
                <p className="mt-1 font-data text-[11px] uppercase tracking-wide text-[var(--color-cloud-faint)]">
                  {r.federalDistrict}
                </p>
              </div>
              <span className="rounded-full border border-[var(--color-bronze)]/40 px-3 py-1 font-data text-xs text-[var(--color-bronze-glow)]">
                {r.dealers}
              </span>
            </div>
            <ul className="mt-4 space-y-1.5 border-t border-[var(--color-cloud)]/10 pt-4">
              {r.showrooms.map((s) => (
                <li key={s} className="font-body text-sm text-[var(--color-cloud-dim)]">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
