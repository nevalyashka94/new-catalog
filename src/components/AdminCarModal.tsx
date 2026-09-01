import { useState } from "react";
import type { Car } from "../types";
import { updateCarAdmin } from "../data/adminActions";

const BODY_TYPES = ["Седан", "Купе", "Кроссовер", "Универсал", "Лифтбек", "Родстер", "Внедорожник"];

export default function AdminCarModal({ car, onClose, onSaved }: { car: Car; onClose: () => void; onSaved: () => void }) {
  const [brandName, setBrandName] = useState(car.brandName);
  const [body, setBody] = useState(car.body);
  const [priceFrom, setPriceFrom] = useState(String(car.priceFrom));
  const [priceTo, setPriceTo] = useState(String(car.priceTo));
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  async function handleSave() {
    setSaving(true);
    setNotice(null);
    try {
      const message = await updateCarAdmin(car.id, {
        brandName: brandName.trim(),
        body,
        priceFrom: Number(priceFrom) || 0,
        priceTo: Number(priceTo) || 0,
        imageFile,
      });
      if (message) {
        setNotice(message);
      } else {
        onSaved();
        onClose();
      }
    } catch (e: any) {
      setNotice(e?.message ?? "Не удалось сохранить изменения.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-6" onClick={onClose}>
      <div
        className="max-h-[85vh] w-full max-w-md overflow-y-auto rounded-t-3xl border border-[var(--color-cloud)]/10 bg-[var(--color-obsidian-2)] p-6 sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-data text-[11px] uppercase tracking-widest text-[var(--color-bronze-glow)]">Админка</p>
            <h3 className="mt-1 font-display text-xl font-semibold text-[var(--color-cloud)]">{car.model}</h3>
          </div>
          <button onClick={onClose} className="shrink-0 rounded-full border border-[var(--color-cloud)]/15 p-2 text-[var(--color-cloud-dim)] hover:text-[var(--color-cloud)]" aria-label="Закрыть">
            ✕
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <label className="block">
            <span className="font-body text-xs font-semibold uppercase tracking-wide text-[var(--color-cloud-dim)]">Бренд</span>
            <input
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-[var(--color-cloud)]/15 bg-[var(--color-obsidian)] px-4 py-2.5 font-body text-sm text-[var(--color-cloud)] outline-none focus:border-[var(--color-bronze)]"
            />
          </label>

          <label className="block">
            <span className="font-body text-xs font-semibold uppercase tracking-wide text-[var(--color-cloud-dim)]">Кузов</span>
            <select
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-[var(--color-cloud)]/15 bg-[var(--color-obsidian)] px-4 py-2.5 font-body text-sm text-[var(--color-cloud)] outline-none focus:border-[var(--color-bronze)]"
            >
              {BODY_TYPES.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="font-body text-xs font-semibold uppercase tracking-wide text-[var(--color-cloud-dim)]">Цена от, ₽</span>
              <input
                type="number"
                value={priceFrom}
                onChange={(e) => setPriceFrom(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-[var(--color-cloud)]/15 bg-[var(--color-obsidian)] px-4 py-2.5 font-data text-sm text-[var(--color-cloud)] outline-none focus:border-[var(--color-bronze)]"
              />
            </label>
            <label className="block">
              <span className="font-body text-xs font-semibold uppercase tracking-wide text-[var(--color-cloud-dim)]">Цена до, ₽</span>
              <input
                type="number"
                value={priceTo}
                onChange={(e) => setPriceTo(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-[var(--color-cloud)]/15 bg-[var(--color-obsidian)] px-4 py-2.5 font-data text-sm text-[var(--color-cloud)] outline-none focus:border-[var(--color-bronze)]"
              />
            </label>
          </div>

          <label className="block">
            <span className="font-body text-xs font-semibold uppercase tracking-wide text-[var(--color-cloud-dim)]">Фото (заменить)</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
              className="mt-1.5 w-full font-body text-xs text-[var(--color-cloud-dim)] file:mr-3 file:rounded-full file:border-0 file:bg-[var(--color-bronze)] file:px-4 file:py-2 file:font-body file:text-xs file:font-semibold file:text-[var(--color-obsidian)]"
            />
          </label>

          {notice && (
            <p className="rounded-lg border border-[var(--color-bronze)]/30 bg-[var(--color-bronze)]/10 px-3 py-2 font-body text-xs text-[var(--color-bronze-glow)]">
              {notice}
            </p>
          )}

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full rounded-full bg-[var(--color-bronze)] py-3 font-body text-sm font-semibold text-[var(--color-obsidian)] transition-colors hover:bg-[var(--color-bronze-glow)] disabled:opacity-50"
          >
            {saving ? "Сохраняю…" : "Сохранить изменения"}
          </button>
        </div>
      </div>
    </div>
  );
}
