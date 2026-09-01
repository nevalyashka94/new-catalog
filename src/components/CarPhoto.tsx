import type { Car } from "../types";

// Пока к машине не прикреплено реальное фото (imageUrl из Supabase Storage),
// показываем стилизованную карточку-заглушку в духе общего дизайна — вместо чужих стоковых фото.
export default function CarPhoto({ car, className = "" }: { car: Car; className?: string }) {
  if (car.imageUrl) {
    return (
      <div className={`overflow-hidden rounded-xl bg-[var(--color-obsidian-3)] ${className}`}>
        <img src={car.imageUrl} alt={`${car.brandName} ${car.model}`} className="h-full w-full object-cover" loading="lazy" />
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-xl bg-[var(--color-obsidian-3)] ${className}`}
    >
      <div
        className="absolute inset-0 opacity-60"
        style={{ background: "radial-gradient(120% 100% at 30% 0%, rgba(240,201,137,0.14), transparent 60%)" }}
      />
      <svg viewBox="0 0 200 100" className="relative h-2/3 w-2/3 opacity-70" fill="none">
        <path
          d="M20 65 C25 55, 35 48, 55 46 C65 38, 85 30, 105 29 C120 28, 135 30, 145 36 C160 34, 175 38, 182 48 L182 60 C182 64, 178 66, 174 66 L155 66 C155 58, 148 52, 140 52 C132 52, 125 58, 125 66 L70 66 C70 58, 63 52, 55 52 C47 52, 40 58, 40 66 L26 66 C22 66, 20 68, 20 65 Z"
          stroke="var(--color-cloud-faint)"
          strokeWidth="2"
        />
        <circle cx="55" cy="66" r="9" stroke="var(--color-cloud-faint)" strokeWidth="2" />
        <circle cx="140" cy="66" r="9" stroke="var(--color-cloud-faint)" strokeWidth="2" />
      </svg>
      <span className="absolute bottom-2 right-3 font-data text-[10px] uppercase tracking-widest text-[var(--color-cloud-faint)]">
        фото скоро
      </span>
    </div>
  );
}
