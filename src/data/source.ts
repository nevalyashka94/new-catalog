import { supabase, isSupabaseConfigured } from "../lib/supabase";
import type { Brand, Car, Dealer } from "../types";
import {
  brands as mockBrands,
  cars as mockCars,
  dealers as mockDealers,
  carDealerLinks as mockLinks,
} from "./mock";

export const usingLiveData = isSupabaseConfigured;

// dealer_group в реальной таблице приходит как "1 Москва" (номер группы + город из Excel-импорта) —
// отрезаем ведущие цифры/пробелы, чтобы получить чистое название города.
export function cityFromDealerGroup(dealerGroup: string | null | undefined): string {
  if (!dealerGroup) return "Не указан";
  return dealerGroup.replace(/^\d+\s*/, "").trim() || "Не указан";
}

export async function fetchBrands(): Promise<Brand[]> {
  if (!supabase) return mockBrands;
  const { data, error } = await supabase.from("brands").select("id, name").order("name");
  if (error) {
    console.error("Не удалось загрузить бренды из Supabase:", error.message);
    return mockBrands;
  }
  return data ?? [];
}

export async function fetchCars(): Promise<Car[]> {
  if (!supabase) return mockCars;
  const { data, error } = await supabase
    .from("cars")
    .select("id, brand_id, model, body, price_from, price_to, description, image_url, is_active, brands(id, name)")
    .eq("is_active", true)
    .order("id");
  if (error) {
    console.error("Не удалось загрузить автомобили из Supabase:", error.message);
    return mockCars;
  }
  return (data ?? []).map((row: any) => ({
    id: row.id,
    brandId: row.brand_id,
    brandName: row.brands?.name ?? "—",
    model: row.model,
    body: row.body ?? "—",
    priceFrom: row.price_from ?? 0,
    priceTo: row.price_to ?? row.price_from ?? 0,
    description: row.description ?? "",
    imageUrl: row.image_url ?? null,
  }));
}

export async function fetchAllDealers(): Promise<Dealer[]> {
  if (!supabase) return mockDealers;
  const { data, error } = await supabase
    .from("dealers")
    .select("id, name, dealer_code, dealer_group")
    .order("name");
  if (error) {
    console.error("Не удалось загрузить дилеров из Supabase:", error.message);
    return mockDealers;
  }
  return (data ?? []).map((d: any) => ({
    id: d.id,
    name: d.name,
    dealerCode: d.dealer_code ?? "",
    city: cityFromDealerGroup(d.dealer_group),
  }));
}

export async function fetchDealersForCar(carId: number): Promise<Dealer[]> {
  if (!supabase) {
    const dealerIds = mockLinks.filter((l) => l.carId === carId).map((l) => l.dealerId);
    return mockDealers.filter((d) => dealerIds.includes(d.id));
  }

  const { data: links, error: linkError } = await supabase
    .from("car_dealers")
    .select("dealer_id")
    .eq("car_id", carId);

  if (linkError || !links || links.length === 0) {
    if (linkError) console.error("Ошибка car_dealers:", linkError.message);
    return [];
  }

  const ids = links.map((l: any) => l.dealer_id);
  const { data: dealerRows, error: dealerError } = await supabase
    .from("dealers")
    .select("id, name, dealer_code, dealer_group")
    .in("id", ids)
    .order("name");

  if (dealerError) {
    console.error("Ошибка dealers:", dealerError.message);
    return [];
  }

  return (dealerRows ?? []).map((d: any) => ({
    id: d.id,
    name: d.name,
    dealerCode: d.dealer_code ?? "",
    city: cityFromDealerGroup(d.dealer_group),
  }));
}
