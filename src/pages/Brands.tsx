import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchBrands, fetchCars } from "../data/source";
import type { Brand, Car } from "../types";

export default function Brands() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchBrands(), fetchCars()]).then(([b, c]) => {
      setBrands(b);
      setCars(c);
      setLoading(false);
    });
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-32 sm:px-8 lg:px-12">
      <p className="font-data text-xs uppercase tracking-[0.3em] text-[var(--color-bronze-glow)]">Бренды</p>
      <h1 className="mt-3 font-display text-4xl font-semibold text-[var(--color-cloud)] sm:text-5xl">
        {brands.length} {brands.length === 1 ? "марка" : "марок"}, один стандарт
      </h1>

      {loading ? (
        <p className="mt-16 text-center font-body text-[var(--color-cloud-faint)]">Загрузка…</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {brands.map((b) => {
            const modelCount = cars.filter((c) => c.brandId === b.id).length;
            return (
              <Link
                key={b.id}
                to={`/brands/${b.id}`}
                className="group relative overflow-hidden rounded-2xl border border-[var(--color-cloud)]/10 bg-[var(--color-obsidian-2)] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-bronze)]/40"
              >
                <div
                  className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "radial-gradient(circle, rgba(240,201,137,0.18), transparent 70%)" }}
                />
                <h2 className="font-display text-2xl font-semibold text-[var(--color-cloud)]">{b.name}</h2>
                <p className="mt-6 font-body text-xs font-semibold uppercase tracking-wide text-[var(--color-cloud-dim)]">
                  {modelCount} {modelCount === 1 ? "модель" : "модели"} в каталоге →
                </p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
