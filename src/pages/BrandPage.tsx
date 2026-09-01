import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchBrands, fetchCars } from "../data/source";
import CarCard from "../components/CarCard";
import type { Brand, Car } from "../types";

export default function BrandPage() {
  const { id } = useParams();
  const [brand, setBrand] = useState<Brand | null>(null);
  const [brandCars, setBrandCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchBrands(), fetchCars()]).then(([brands, cars]) => {
      setBrand(brands.find((b) => String(b.id) === id) ?? null);
      setBrandCars(cars.filter((c) => String(c.brandId) === id));
      setLoading(false);
    });
  }, [id, reloadKey]);

  if (loading) {
    return <div className="pt-40 text-center font-body text-[var(--color-cloud-faint)]">Загрузка…</div>;
  }

  if (!brand) {
    return (
      <div className="mx-auto max-w-3xl px-6 pb-24 pt-40 text-center">
        <h1 className="font-display text-3xl font-semibold text-[var(--color-cloud)]">Бренд не найден</h1>
        <p className="mt-4 font-body text-[var(--color-cloud-dim)]">Такой марки нет в каталоге. Возможно, ссылка устарела.</p>
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
      <h1 className="mt-6 font-display text-4xl font-semibold text-[var(--color-cloud)] sm:text-5xl">{brand.name}</h1>

      <h2 className="mt-14 font-display text-2xl font-semibold text-[var(--color-cloud)]">Модели марки</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {brandCars.map((car) => (
          <CarCard key={car.id} car={car} onCarUpdated={() => setReloadKey((k) => k + 1)} />
        ))}
      </div>
    </div>
  );
}
