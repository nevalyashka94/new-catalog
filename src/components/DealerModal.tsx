import { useEffect, useMemo, useState } from "react";
import type { Car, Dealer } from "../types";
import { fetchDealersForCar, usingLiveData } from "../data/source";
import { CITY_QUICK_FILTERS } from "../data/mock";

export default function DealerModal({ car, onClose }: { car: Car; onClose: () => void }) {
  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [loading, setLoading] = useState(true);
  const [cityFilter, setCityFilter] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    fetchDealersForCar(car.id).then((d) => {
      if (alive) {
        setDealers(d);
        setLoading(false);
      }
    });
    return () => {
      alive = false;
    };
  }, [car.id]);

  const cities = useMemo(() => {
    const set = new Set(dealers.map((d) => d.city));
    return CITY_QUICK_FILTERS.filter((q) => [...set].some((c) => c.toLowerCase().includes(q.match)));
  }, [dealers]);

  const filtered = cityFilter
    ? dealers.filter((d) => d.city.toLowerCase().includes(cityFilter))
    : dealers;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-[var(--color-cloud)]/10 bg-[var(--color-obsidian-2)] p-6 sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-data text-[11px] uppercase tracking-widest text-[var(--color-bronze-glow)]">
              {car.brandName}
            </p>
            <h3 className="mt-1 font-display text-xl font-semibold text-[var(--color-cloud)]">
              Дилерские центры — {car.model}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 rounded-full border border-[var(--color-cloud)]/15 p-2 text-[var(--color-cloud-dim)] hover:text-[var(--color-cloud)]"
            aria-label="Закрыть"
          >
            ✕
          </button>
        </div>

        {!usingLiveData && (
          <p className="mt-3 rounded-lg border border-[var(--color-bronze)]/30 bg-[var(--color-bronze)]/10 px-3 py-2 font-body text-xs text-[var(--color-bronze-glow)]">
            Демо-режим: показаны примерные дилеры. Подключите Supabase, чтобы видеть реальные ДЦ.
          </p>
        )}

        {cities.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            <button
              onClick={() => setCityFilter(null)}
              className={`rounded-full border px-3.5 py-1.5 font-body text-xs font-semibold uppercase tracking-wide transition-colors ${
                cityFilter === null
                  ? "border-[var(--color-bronze)] bg-[var(--color-bronze)] text-[var(--color-obsidian)]"
                  : "border-[var(--color-cloud)]/15 text-[var(--color-cloud-dim)] hover:text-[var(--color-cloud)]"
              }`}
            >
              Все города
            </button>
            {cities.map((c) => (
              <button
                key={c.label}
                onClick={() => setCityFilter(c.match)}
                className={`rounded-full border px-3.5 py-1.5 font-body text-xs font-semibold uppercase tracking-wide transition-colors ${
                  cityFilter === c.match
                    ? "border-[var(--color-bronze)] bg-[var(--color-bronze)] text-[var(--color-obsidian)]"
                    : "border-[var(--color-cloud)]/15 text-[var(--color-cloud-dim)] hover:text-[var(--color-cloud)]"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        )}

        <div className="mt-5 space-y-3">
          {loading ? (
            <p className="py-8 text-center font-body text-sm text-[var(--color-cloud-faint)]">Загрузка дилеров…</p>
          ) : filtered.length === 0 ? (
            <p className="py-8 text-center font-body text-sm text-[var(--color-cloud-faint)]">
              {dealers.length === 0
                ? "Для этой модели пока не назначены дилерские центры."
                : "В выбранном городе дилеров этой марки нет."}
            </p>
          ) : (
            filtered.map((d) => (
              <div key={d.id} className="rounded-xl border border-[var(--color-cloud)]/10 bg-[var(--color-obsidian)] p-4">
                <p className="font-body text-sm font-semibold text-[var(--color-cloud)]">{d.name}</p>
                <p className="mt-1 font-data text-xs text-[var(--color-cloud-faint)]">
                  {d.city}
                  {d.dealerCode ? ` · ${d.dealerCode}` : ""}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
