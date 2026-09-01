import { useEffect, useMemo, useState } from "react";
import CarCard from "../components/CarCard";
import { fetchBrands, fetchCars } from "../data/source";
import type { Brand, Car } from "../types";

const BODY_TYPES = ["Седан", "Купе", "Кроссовер", "Универсал", "Лифтбек", "Родстер", "Внедорожник"];

const PRICE_BUCKETS = [
  { label: "до 2 млн", min: 0, max: 2_000_000 },
  { label: "3–4 млн", min: 3_000_000, max: 4_000_000 },
  { label: "5–6 млн", min: 5_000_000, max: 6_000_000 },
  { label: "7 млн+", min: 7_000_000, max: Infinity },
];

export default function Catalog() {
  const [cars, setCars] = useState<Car[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  const [brandFilter, setBrandFilter] = useState<string>("all");
  const [bodyFilter, setBodyFilter] = useState<string>("all");
  const [modelQuery, setModelQuery] = useState("");
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [bucket, setBucket] = useState<number | null>(null);
  const [sort, setSort] = useState<"price-asc" | "price-desc">("price-asc");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    Promise.all([fetchCars(), fetchBrands()]).then(([c, b]) => {
      if (alive) {
        setCars(c);
        setBrands(b);
        setLoading(false);
      }
    });
    return () => {
      alive = false;
    };
  }, [reloadKey]);

  const bodyTypesInCatalog = useMemo(() => {
    const set = new Set(cars.map((c) => c.body));
    return BODY_TYPES.filter((b) => set.has(b));
  }, [cars]);

  const filtered = useMemo(() => {
    let list = cars;

    if (brandFilter !== "all") list = list.filter((c) => String(c.brandId) === brandFilter);
    if (bodyFilter !== "all") list = list.filter((c) => c.body === bodyFilter);
    if (modelQuery.trim()) {
      const q = modelQuery.trim().toLowerCase();
      list = list.filter((c) => c.model.toLowerCase().includes(q) || c.brandName.toLowerCase().includes(q));
    }

    const from = priceFrom ? Number(priceFrom) : null;
    const to = priceTo ? Number(priceTo) : null;
    if (from !== null) list = list.filter((c) => c.priceTo >= from);
    if (to !== null) list = list.filter((c) => c.priceFrom <= to);

    if (bucket !== null) {
      const b = PRICE_BUCKETS[bucket];
      list = list.filter((c) => c.priceFrom <= b.max && c.priceTo >= b.min);
    }

    return [...list].sort((a, b) => (sort === "price-asc" ? a.priceFrom - b.priceFrom : b.priceFrom - a.priceFrom));
  }, [cars, brandFilter, bodyFilter, modelQuery, priceFrom, priceTo, bucket, sort]);

  const resetFilters = () => {
    setBrandFilter("all");
    setBodyFilter("all");
    setModelQuery("");
    setPriceFrom("");
    setPriceTo("");
    setBucket(null);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-32 sm:px-8 lg:px-12">
      <p className="font-data text-xs uppercase tracking-[0.3em] text-[var(--color-bronze-glow)]">Каталог</p>
      <h1 className="mt-3 font-display text-4xl font-semibold text-[var(--color-cloud)] sm:text-5xl">Все модели</h1>

      {/* Быстрые фильтры по цене */}
      <div className="mt-8 flex flex-wrap gap-2">
        {PRICE_BUCKETS.map((b, i) => (
          <button
            key={b.label}
            onClick={() => setBucket(bucket === i ? null : i)}
            className={`rounded-full border px-4 py-2 font-body text-xs font-semibold uppercase tracking-wide transition-colors ${
              bucket === i
                ? "border-[var(--color-bronze)] bg-[var(--color-bronze)] text-[var(--color-obsidian)]"
                : "border-[var(--color-cloud)]/15 text-[var(--color-cloud-dim)] hover:text-[var(--color-cloud)]"
            }`}
          >
            {b.label}
          </button>
        ))}
      </div>

      {/* Развёрнутый фильтр */}
      <div className="mt-5 grid gap-4 rounded-2xl border border-[var(--color-cloud)]/10 bg-[var(--color-obsidian-2)] p-5 sm:grid-cols-2 lg:grid-cols-5">
        <label className="block">
          <span className="font-body text-[11px] font-semibold uppercase tracking-wide text-[var(--color-cloud-faint)]">Цена от, ₽</span>
          <input
            type="number"
            value={priceFrom}
            onChange={(e) => setPriceFrom(e.target.value)}
            placeholder="0"
            className="mt-1.5 w-full rounded-xl border border-[var(--color-cloud)]/15 bg-[var(--color-obsidian)] px-3.5 py-2.5 font-data text-sm text-[var(--color-cloud)] outline-none focus:border-[var(--color-bronze)]"
          />
        </label>
        <label className="block">
          <span className="font-body text-[11px] font-semibold uppercase tracking-wide text-[var(--color-cloud-faint)]">Цена до, ₽</span>
          <input
            type="number"
            value={priceTo}
            onChange={(e) => setPriceTo(e.target.value)}
            placeholder="30 000 000"
            className="mt-1.5 w-full rounded-xl border border-[var(--color-cloud)]/15 bg-[var(--color-obsidian)] px-3.5 py-2.5 font-data text-sm text-[var(--color-cloud)] outline-none focus:border-[var(--color-bronze)]"
          />
        </label>
        <label className="block">
          <span className="font-body text-[11px] font-semibold uppercase tracking-wide text-[var(--color-cloud-faint)]">Кузов</span>
          <select
            value={bodyFilter}
            onChange={(e) => setBodyFilter(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-[var(--color-cloud)]/15 bg-[var(--color-obsidian)] px-3.5 py-2.5 font-body text-sm text-[var(--color-cloud)] outline-none focus:border-[var(--color-bronze)]"
          >
            <option value="all">Любой</option>
            {bodyTypesInCatalog.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="font-body text-[11px] font-semibold uppercase tracking-wide text-[var(--color-cloud-faint)]">Бренд</span>
          <select
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-[var(--color-cloud)]/15 bg-[var(--color-obsidian)] px-3.5 py-2.5 font-body text-sm text-[var(--color-cloud)] outline-none focus:border-[var(--color-bronze)]"
          >
            <option value="all">Любой</option>
            {brands.map((b) => (
              <option key={b.id} value={String(b.id)}>{b.name}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="font-body text-[11px] font-semibold uppercase tracking-wide text-[var(--color-cloud-faint)]">Модель / марка</span>
          <input
            value={modelQuery}
            onChange={(e) => setModelQuery(e.target.value)}
            placeholder="Например, GT4"
            className="mt-1.5 w-full rounded-xl border border-[var(--color-cloud)]/15 bg-[var(--color-obsidian)] px-3.5 py-2.5 font-body text-sm text-[var(--color-cloud)] outline-none focus:border-[var(--color-bronze)]"
          />
        </label>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <button onClick={resetFilters} className="font-body text-xs font-semibold text-[var(--color-cloud-faint)] hover:text-[var(--color-cloud)]">
          Сбросить фильтры
        </button>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as "price-asc" | "price-desc")}
          className="rounded-full border border-[var(--color-cloud)]/15 bg-[var(--color-obsidian-2)] px-4 py-2 font-body text-xs font-semibold uppercase tracking-wide text-[var(--color-cloud-dim)]"
        >
          <option value="price-asc">Сначала дешевле</option>
          <option value="price-desc">Сначала дороже</option>
        </select>
      </div>

      {loading ? (
        <p className="mt-16 text-center font-body text-[var(--color-cloud-faint)]">Загрузка каталога…</p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((car) => (
            <CarCard key={car.id} car={car} onCarUpdated={() => setReloadKey((k) => k + 1)} />
          ))}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <p className="mt-16 text-center font-body text-[var(--color-cloud-faint)]">
          Ничего не найдено — попробуйте изменить фильтры.
        </p>
      )}
    </div>
  );
}
