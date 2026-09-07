import { Link, useParams } from "react-router-dom";
import { brands, cars, dealers, carDealerLinks } from "../data/mock";
import CarCard from "../components/CarCard";

export default function RegionPage() {
  const { id } = useParams();

  const city = id
    ? id.replace(/-/g, " ")
    : "";

  const cityDealers = dealers.filter(
    (dealer) =>
      dealer.city.toLowerCase() === city.toLowerCase()
  );

  const dealerIds = new Set(cityDealers.map((dealer) => dealer.id));

  const availableCars = cars.filter((car) =>
    carDealerLinks.some(
      (link) =>
        link.carId === car.id &&
        dealerIds.has(link.dealerId)
    )
  );

  const availableBrands = brands.filter((brand) =>
    availableCars.some((car) => car.brandId === brand.id)
  );

  if (cityDealers.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 pb-24 pt-40 text-center">
        <h1 className="font-display text-3xl font-semibold text-[var(--color-cloud)]">
          Регион не найден
        </h1>

        <Link
          to="/regions"
          className="mt-8 inline-block rounded-full bg-[var(--color-bronze)] px-6 py-3 font-body text-sm font-semibold text-[var(--color-obsidian)]"
        >
          К списку регионов
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-32 sm:px-8 lg:px-12">
      <Link
        to="/regions"
        className="font-body text-sm text-[var(--color-cloud-faint)] hover:text-[var(--color-cloud)]"
      >
        ← Все регионы
      </Link>

      <p className="mt-6 font-data text-xs uppercase tracking-[0.3em] text-[var(--color-bronze-glow)]">
        Дилеры
      </p>

      <h1 className="mt-2 font-display text-4xl font-semibold text-[var(--color-cloud)] sm:text-5xl">
        {cityDealers[0].city}
      </h1>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-[var(--color-cloud)]/10 bg-[var(--color-obsidian-2)] p-6">
          <p className="font-body text-xs font-semibold uppercase tracking-wide text-[var(--color-cloud-faint)]">
            Дилерские центры ({cityDealers.length})
          </p>

          <ul className="mt-3 space-y-1.5">
            {cityDealers.map((dealer) => (
              <li
                key={dealer.id}
                className="font-body text-sm text-[var(--color-cloud-dim)]"
              >
                {dealer.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-[var(--color-cloud)]/10 bg-[var(--color-obsidian-2)] p-6">
          <p className="font-body text-xs font-semibold uppercase tracking-wide text-[var(--color-cloud-faint)]">
            Представленные бренды
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {availableBrands.map((brand) => (
              <Link
                key={brand.id}
                to={`/brands/${brand.id}`}
                className="rounded-full border border-[var(--color-bronze)]/30 px-3 py-1 font-data text-xs text-[var(--color-bronze-glow)] hover:border-[var(--color-bronze)]/60"
              >
                {brand.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <h2 className="mt-14 font-display text-2xl font-semibold text-[var(--color-cloud)]">
        Доступные модели в {cityDealers[0].city}
      </h2>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {availableCars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      {availableCars.length === 0 && (
        <p className="mt-8 font-body text-[var(--color-cloud-faint)]">
          В этом регионе пока нет моделей в наличии — уточните у дилера.
        </p>
      )}
    </div>
  );
}
