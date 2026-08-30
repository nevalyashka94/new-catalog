import { Link, useParams } from "react-router-dom";
import { brands, cars } from "../data/mock";
import CarCard from "../components/CarCard";

export default function BrandPage() {
  const { id } = useParams();
  const brand = brands.find((b) => b.id === id);
  const brandCars = cars.filter((c) => c.brandId === id);

  if (!brand) {
    return (
      <div className="mx-auto max-w-3xl px-6 pb-24 pt-40 text-center">
        <h1 className="font-display text-3xl font-semibold text-[var(--color-cloud)]">Бренд не найден</h1>
        <p className="mt-4 font-body text-[var(--color-cloud-dim)]">
          Такой марки нет в каталоге. Возможно, ссылка устарела.
        </p>
        <Link to="/brands" className="mt-8 inline-block rounded-full bg-[var(--color-bronze)] px-6 py-3 font-body text-sm font-semibold text-[var(--color-obsidian)]">
          К списку брендов
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-32 sm:px-8 lg:px-12">
      <Link to="/brands" className="font-body text-sm text-[var(--color-cloud-faint)] hover:text-[var(--color-cloud)]">
        ← Все бренды
      </Link>
      <div className="mt-6 flex flex-col gap-2">
        <p className="font-data text-xs uppercase tracking-[0.3em] text-[var(--color-bronze-glow)]">
          {brand.country} · с {brand.founded} года
        </p>
        <h1 className="font-display text-4xl font-semibold text-[var(--color-cloud)] sm:text-5xl">{brand.name}</h1>
        <p className="mt-2 max-w-2xl font-body text-lg italic text-[var(--color-cloud-dim)]">«{brand.tagline}»</p>
        <p className="mt-2 max-w-2xl font-body text-[var(--color-cloud-faint)]">{brand.description}</p>
      </div>

      <h2 className="mt-14 font-display text-2xl font-semibold text-[var(--color-cloud)]">Модели марки</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {brandCars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
}
