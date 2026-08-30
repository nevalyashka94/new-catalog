import { Link } from "react-router-dom";
import type { Car } from "../types";
import { brands, formatPrice } from "../data/mock";

export default function CarCard({ car }: { car: Car }) {
  const brand = brands.find((b) => b.id === car.brandId);
  return (
    <Link
      to={`/brands/${car.brandId}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--color-cloud)]/10 bg-[var(--color-obsidian-2)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-bronze)]/40"
    >
      <div
        className="absolute inset-x-0 top-0 h-24 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "radial-gradient(120% 100% at 50% 0%, rgba(240,201,137,0.12), transparent)" }}
      />
      <span className="font-data text-[11px] uppercase tracking-widest text-[var(--color-bronze-glow)]">
        {brand?.name} · {car.body}
      </span>
      <h3 className="mt-2 font-display text-xl font-semibold text-[var(--color-cloud)]">
        {car.model}
      </h3>
      <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-[var(--color-cloud-dim)]">
        {car.description}
      </p>
      <div className="mt-6 flex items-center justify-between border-t border-[var(--color-cloud)]/10 pt-4">
        <div className="font-data text-xs text-[var(--color-cloud-faint)]">
          {car.power} · {car.accel}
        </div>
        <div className="font-display text-sm font-semibold text-[var(--color-cloud)]">
          от {formatPrice(car.priceFrom)}
        </div>
      </div>
    </Link>
  );
}
