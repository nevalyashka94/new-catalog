import { Link } from "react-router-dom";
import { brands, cars } from "../data/mock";

export default function Brands() {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-32 sm:px-8 lg:px-12">
      <p className="font-data text-xs uppercase tracking-[0.3em] text-[var(--color-bronze-glow)]">Бренды</p>
      <h1 className="mt-3 font-display text-4xl font-semibold text-[var(--color-cloud)] sm:text-5xl">
        Шесть марок, один стандарт
      </h1>

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
              <div className="flex items-baseline justify-between">
                <h2 className="font-display text-2xl font-semibold text-[var(--color-cloud)]">{b.name}</h2>
                <span className="font-data text-xs text-[var(--color-cloud-faint)]">{b.founded}</span>
              </div>
              <p className="mt-1 font-data text-[11px] uppercase tracking-widest text-[var(--color-bronze-glow)]">
                {b.country}
              </p>
              <p className="mt-4 font-body text-sm italic text-[var(--color-cloud-dim)]">«{b.tagline}»</p>
              <p className="mt-3 font-body text-sm leading-relaxed text-[var(--color-cloud-faint)]">
                {b.description}
              </p>
              <p className="mt-6 font-body text-xs font-semibold uppercase tracking-wide text-[var(--color-cloud-dim)]">
                {modelCount} {modelCount === 1 ? "модель" : "модели"} в каталоге →
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
