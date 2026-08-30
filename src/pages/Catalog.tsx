import { useMemo, useState } from "react";
import CarCard from "../components/CarCard";
import { brands, cars } from "../data/mock";

export default function Catalog() {
  const [brandFilter, setBrandFilter] = useState<string | "all">("all");
  const [sort, setSort] = useState<"price-asc" | "price-desc">("price-asc");

  const filtered = useMemo(() => {
    const list = brandFilter === "all" ? cars : cars.filter((c) => c.brandId === brandFilter);
    return [...list].sort((a, b) =>
      sort === "price-asc" ? a.priceFrom - b.priceFrom : b.priceFrom - a.priceFrom
    );
  }, [brandFilter, sort]);

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-32 sm:px-8 lg:px-12">
      <p className="font-data text-xs uppercase tracking-[0.3em] text-[var(--color-bronze-glow)]">Каталог</p>
      <h1 className="mt-3 font-display text-4xl font-semibold text-[var(--color-cloud)] sm:text-5xl">
        Все модели
      </h1>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setBrandFilter("all")}
            className={`rounded-full border px-4 py-2 font-body text-xs font-semibold uppercase tracking-wide transition-colors duration-200 ${
              brandFilter === "all"
                ? "border-[var(--color-bronze)] bg-[var(--color-bronze)] text-[var(--color-obsidian)]"
                : "border-[var(--color-cloud)]/15 text-[var(--color-cloud-dim)] hover:text-[var(--color-cloud)]"
            }`}
          >
            Все бренды
          </button>
          {brands.map((b) => (
            <button
              key={b.id}
              onClick={() => setBrandFilter(b.id)}
              className={`rounded-full border px-4 py-2 font-body text-xs font-semibold uppercase tracking-wide transition-colors duration-200 ${
                brandFilter === b.id
                  ? "border-[var(--color-bronze)] bg-[var(--color-bronze)] text-[var(--color-obsidian)]"
                  : "border-[var(--color-cloud)]/15 text-[var(--color-cloud-dim)] hover:text-[var(--color-cloud)]"
              }`}
            >
              {b.name}
            </button>
          ))}
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as "price-asc" | "price-desc")}
          className="rounded-full border border-[var(--color-cloud)]/15 bg-[var(--color-obsidian-2)] px-4 py-2 font-body text-xs font-semibold uppercase tracking-wide text-[var(--color-cloud-dim)] focus:text-[var(--color-cloud)]"
        >
          <option value="price-asc">Сначала дешевле</option>
          <option value="price-desc">Сначала дороже</option>
        </select>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center font-body text-[var(--color-cloud-faint)]">
          По этому бренду пока нет моделей в каталоге.
        </p>
      )}
    </div>
  );
}
