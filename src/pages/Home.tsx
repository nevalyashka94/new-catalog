import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeroCar from "../components/HeroCar";
import BrandMarquee from "../components/BrandMarquee";
import CarCard from "../components/CarCard";
import { fetchCars } from "../data/source";
import type { Car } from "../types";

export default function Home() {
  const [cars, setCars] = useState<Car[]>([]);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    fetchCars().then(setCars);
  }, [reloadKey]);

  const featured = cars.slice(0, 3);

  return (
    <div>
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 text-center">
        <p className="animate-drift-up font-data text-xs uppercase tracking-[0.3em] text-[var(--color-bronze-glow)]">
          Каталог 2026 · официальные дилеры по регионам
        </p>
        <h1
          className="animate-drift-up mt-6 max-w-3xl text-balance font-display text-5xl font-bold leading-[1.05] text-[var(--color-cloud)] sm:text-6xl lg:text-7xl"
          style={{ animationDelay: "0.1s" }}
        >
          Автомобили, которые <span className="text-[var(--color-bronze-glow)]">заслуживают</span> тишины в зале
        </h1>
        <p
          className="animate-drift-up mt-6 max-w-xl text-balance font-body text-base text-[var(--color-cloud-dim)] sm:text-lg"
          style={{ animationDelay: "0.2s" }}
        >
          Подбираем автомобиль так же тщательно, как его собирают: по бренду, региону и дилеру — без лишнего шума.
        </p>

        <div className="animate-drift-up mt-10 w-full" style={{ animationDelay: "0.3s" }}>
          <HeroCar />
        </div>

        <div className="animate-drift-up mt-10 flex flex-wrap items-center justify-center gap-4" style={{ animationDelay: "0.4s" }}>
          <Link
            to="/catalog"
            className="rounded-full bg-[var(--color-bronze)] px-7 py-3 font-body text-sm font-semibold text-[var(--color-obsidian)] transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-bronze-glow)]"
          >
            Смотреть каталог
          </Link>
          <Link
            to="/regions"
            className="rounded-full border border-[var(--color-cloud)]/20 px-7 py-3 font-body text-sm font-semibold text-[var(--color-cloud)] transition-colors duration-300 hover:border-[var(--color-cloud)]/50"
          >
            Найти дилера рядом
          </Link>
        </div>
      </section>

      <BrandMarquee />

      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-data text-xs uppercase tracking-[0.3em] text-[var(--color-bronze-glow)]">Избранное</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-[var(--color-cloud)] sm:text-4xl">Три модели этого сезона</h2>
          </div>
          <Link to="/catalog" className="hidden font-body text-sm font-semibold text-[var(--color-cloud-dim)] hover:text-[var(--color-cloud)] sm:block">
            Весь каталог →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((car) => (
            <CarCard key={car.id} car={car} onCarUpdated={() => setReloadKey((k) => k + 1)} />
          ))}
        </div>
      </section>
    </div>
  );
}
