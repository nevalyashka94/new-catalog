export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-cloud)]/10 bg-[var(--color-obsidian-2)]/60">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-base font-semibold text-[var(--color-cloud)]">AURELIA</p>
            <p className="mt-1 font-body text-sm text-[var(--color-cloud-faint)]">
              Каталог премиальных автомобилей и дилеров по регионам.
            </p>
          </div>
          <p className="font-data text-xs text-[var(--color-cloud-faint)]">© 2026 AURELIA CATALOG</p>
        </div>
      </div>
    </footer>
  );
}
