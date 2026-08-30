import { brands } from "../data/mock";

export default function BrandMarquee() {
  const loop = [...brands, ...brands];
  return (
    <div className="relative overflow-hidden border-y border-[var(--color-cloud)]/10 py-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[var(--color-obsidian)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[var(--color-obsidian)] to-transparent" />
      <div className="animate-marquee flex w-max gap-16 whitespace-nowrap">
        {loop.map((b, i) => (
          <span
            key={`${b.id}-${i}`}
            className="font-display text-2xl font-semibold tracking-widest text-[var(--color-cloud)]/25"
          >
            {b.name.toUpperCase()}
          </span>
        ))}
      </div>
    </div>
  );
}
