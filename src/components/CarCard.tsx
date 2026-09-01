import { useState } from "react";
import type { Car } from "../types";
import { formatPrice } from "../data/mock";
import { useAdmin } from "../context/AdminContext";
import CarPhoto from "./CarPhoto";
import DealerModal from "./DealerModal";
import AdminCarModal from "./AdminCarModal";

export default function CarCard({ car, onCarUpdated }: { car: Car; onCarUpdated?: () => void }) {
  const { isAdmin } = useAdmin();
  const [dealersOpen, setDealersOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--color-cloud)]/10 bg-[var(--color-obsidian-2)] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-bronze)]/40">
      {isAdmin && (
        <button
          onClick={() => setEditOpen(true)}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-obsidian)]/90 text-[var(--color-bronze-glow)] shadow-lg backdrop-blur"
          title="Редактировать карточку"
          aria-label="Редактировать карточку"
        >
          ✎
        </button>
      )}

      <CarPhoto car={car} className="aspect-[4/3] w-full" />

      <span className="mt-4 font-data text-[11px] uppercase tracking-widest text-[var(--color-bronze-glow)]">
        {car.brandName} · {car.body}
      </span>
      <h3 className="mt-2 font-display text-xl font-semibold text-[var(--color-cloud)]">{car.model}</h3>
      <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-[var(--color-cloud-dim)]">{car.description}</p>

      <div className="mt-6 flex items-center justify-between border-t border-[var(--color-cloud)]/10 pt-4">
        <div className="font-display text-sm font-semibold text-[var(--color-cloud)]">от {formatPrice(car.priceFrom)}</div>
        <button
          onClick={() => setDealersOpen(true)}
          className="rounded-full border border-[var(--color-cloud)]/15 px-4 py-2 font-body text-xs font-semibold uppercase tracking-wide text-[var(--color-cloud-dim)] transition-colors hover:border-[var(--color-bronze)] hover:text-[var(--color-cloud)]"
        >
          Подробнее
        </button>
      </div>

      {dealersOpen && <DealerModal car={car} onClose={() => setDealersOpen(false)} />}
      {editOpen && (
        <AdminCarModal
          car={car}
          onClose={() => setEditOpen(false)}
          onSaved={() => onCarUpdated?.()}
        />
      )}
    </div>
  );
}
