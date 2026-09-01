import { useEffect, useMemo, useState } from "react";
import { fetchAllDealers } from "../data/source";
import type { Dealer } from "../types";
import { CITY_QUICK_FILTERS } from "../data/mock";

export default function Regions() {
  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [loading, setLoading] = useState(true);
  const [cityFilter, setCityFilter] = useState<string | null>(null);

  useEffect(() => {
    fetchAllDealers().then((d) => {
      setDealers(d);
      setLoading(false);
    });
  }, []);

  const grouped = useMemo(() => {
    const map = new Map<string, Dealer[]>();
    for (const d of dealers) {
      if (!map.has(d.city)) map.set(d.city, []);
      map.get(d.city)!.push(d);
    }
    return [...map.entries()].sort((a, b) => b[1].length - a[1].length);
  }, [dealers]);

  const visibleGroups = cityFilter
    ? grouped.filter(([city]) => city.toLowerCase().includes(cityFilter))
    : grouped;

  const availableQuickFilters = CITY_QUICK_FILTERS.filter((q) =>
    dealers.some((d) => d.city.toLowerCase().includes(q.match))
  );

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-32 sm:px-8 lg:px-12">
      <p className="font-data text-xs uppercase tracking-[0.3em] text-[var(--color-bronze-glow)]">Дилеры</p>
      <h1 className="mt-3 font-display text-4xl font-semibold text-[var(--color-cloud)] sm:text-5xl">Регионы присутствия</h1>
      <p className="mt-4 max-w-xl font-body text-[var(--color-cloud-dim)]">
        {dealers.length} дилерских центров в {grouped.length} {grouped.length === 1 ? "городе" : "городах"}.
      </p>

      {availableQuickFilters.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            onClick={() => setCityFilter(null)}
            className={`rounded-full border px-4 py-2 font-body text-xs font-semibold uppercase tracking-wide transition-colors ${
              cityFilter === null
                ? "border-[var(--color-bronze)] bg-[var(--color-bronze)] text-[var(--color-obsidian)]"
                : "border-[var(--color-cloud)]/15 text-[var(--color-cloud-dim)] hover:text-[var(--color-cloud)]"
            }`}
          >
            Все города
          </button>
          {availableQuickFilters.map((q) => (
            <button
              key={q.label}
              onClick={() => setCityFilter(q.match)}
              className={`rounded-full border px-4 py-2 font-body text-xs font-semibold uppercase tracking-wide transition-colors ${
                cityFilter === q.match
                  ? "border-[var(--color-bronze)] bg-[var(--color-bronze)] text-[var(--color-obsidian)]"
                  : "border-[var(--color-cloud)]/15 text-[var(--color-cloud-dim)] hover:text-[var(--color-cloud)]"
              }`}
            >
              {q.label}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <p className="mt-16 text-center font-body text-[var(--color-cloud-faint)]">Загрузка дилерской сети…</p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleGroups.map(([city, cityDealers]) => (
            <div key={city} className="rounded-2xl border border-[var(--color-cloud)]/10 bg-[var(--color-obsidian-2)] p-6 transition-colors duration-300 hover:border-[var(--color-bronze)]/40">
              <div className="flex items-start justify-between">
                <h3 className="font-display text-lg font-semibold text-[var(--color-cloud)]">{city}</h3>
                <span className="rounded-full border border-[var(--color-bronze)]/40 px-3 py-1 font-data text-xs text-[var(--color-bronze-glow)]">
                  {cityDealers.length}
                </span>
              </div>
              <ul className="mt-4 space-y-1.5 border-t border-[var(--color-cloud)]/10 pt-4">
                {cityDealers.map((d) => (
                  <li key={d.id} className="font-body text-sm text-[var(--color-cloud-dim)]">{d.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
