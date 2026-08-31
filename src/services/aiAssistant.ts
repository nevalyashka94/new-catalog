import { brands, cars, regions, formatPrice } from "../data/mock";

export interface AssistantAction {
  label: string;
  to: string;
}

export interface AssistantReply {
  text: string;
  actions: AssistantAction[];
}

const REGION_KEYWORDS: Record<string, string[]> = {
  msk: ["москва", "москве", "москвы", "мск"],
  spb: ["санкт-петербург", "петербург", "петербурге", "петербурга", "спб", "питер", "питере"],
  kzn: ["казань", "казани"],
  ekb: ["екатеринбург", "екатеринбурге", "екб"],
  nsk: ["новосибирск", "новосибирске", "нск"],
  rnd: ["ростов-на-дону", "ростове", "ростов", "ростова"],
  krd: ["краснодар", "краснодаре", "краснодара"],
  vld: ["владивосток", "владивостоке"],
};

function normalize(query: string): string {
  return query.toLowerCase().replace(/[.,!?]/g, " ").replace(/\s+/g, " ").trim();
}

function findRegion(q: string) {
  return regions.find((r) => REGION_KEYWORDS[r.id]?.some((kw) => q.includes(kw)));
}

function findCar(q: string) {
  return cars.find((c) => {
    const model = c.model.toLowerCase();
    if (q.includes(model)) return true;
    return model.split(" ").some((word) => word.length >= 4 && q.includes(word));
  });
}

function findBrand(q: string) {
  return brands.find((b) => q.includes(b.name.toLowerCase()));
}

function findMaxPrice(q: string): number | null {
  const millionMatch = q.match(/(\d+[.,]?\d*)\s*(млн|миллион\w*)/);
  if (millionMatch) {
    const value = parseFloat(millionMatch[1].replace(",", "."));
    return Math.round(value * 1_000_000);
  }
  const rawMatch = q.match(/(\d{6,8})/);
  if (rawMatch) return Number(rawMatch[1]);
  return null;
}

const PRICE_INTENT_WORDS = ["до", "дешевле", "бюджет", "не дороже", "цена", "стоимост"];

export function askAssistant(rawQuery: string): AssistantReply {
  const q = normalize(rawQuery);
  if (!q) {
    return {
      text: "Спросите про модель, бренд, бюджет или город — например «что есть в Краснодаре» или «Vellante Corsa».",
      actions: [
        { label: "Открыть каталог", to: "/catalog" },
        { label: "Регионы дилеров", to: "/regions" },
      ],
    };
  }

  const region = findRegion(q);
  if (region) {
    const availableBrands = brands.filter((b) => region.availableBrandIds.includes(b.id));
    const availableCount = cars.filter((c) => region.availableBrandIds.includes(c.brandId)).length;
    return {
      text: `В ${region.city} ${region.dealers} дилерских центров и ${availableCount} доступных моделей: ${availableBrands
        .map((b) => b.name)
        .join(", ")}.`,
      actions: [{ label: `Смотреть ${region.city}`, to: `/regions/${region.id}` }],
    };
  }

  const car = findCar(q);
  if (car) {
    const brand = brands.find((b) => b.id === car.brandId)!;
    return {
      text: `${brand.name} ${car.model} (${car.body}) — ${car.power}, разгон ${car.accel}, от ${formatPrice(
        car.priceFrom
      )}. ${car.description}`,
      actions: [
        { label: `Модели ${brand.name}`, to: `/brands/${brand.id}` },
        { label: "В каталоге по цене", to: `/catalog?brand=${brand.id}&maxPrice=${car.priceFrom}` },
      ],
    };
  }

  const brand = findBrand(q);
  if (brand) {
    const brandCars = cars.filter((c) => c.brandId === brand.id);
    const minPrice = Math.min(...brandCars.map((c) => c.priceFrom));
    return {
      text: `${brand.name} (${brand.country}, с ${brand.founded} года) — «${brand.tagline}». ${brandCars.length} моделей в каталоге, от ${formatPrice(
        minPrice
      )}.`,
      actions: [{ label: `Каталог ${brand.name}`, to: `/catalog?brand=${brand.id}` }],
    };
  }

  const maxPrice = findMaxPrice(q);
  const wantsPriceFilter = maxPrice !== null || PRICE_INTENT_WORDS.some((w) => q.includes(w));
  if (wantsPriceFilter && maxPrice) {
    const matching = cars.filter((c) => c.priceFrom <= maxPrice).sort((a, b) => a.priceFrom - b.priceFrom);
    if (matching.length === 0) {
      return {
        text: `До ${formatPrice(maxPrice)} в каталоге пока ничего нет — самая доступная модель дороже.`,
        actions: [{ label: "Открыть каталог", to: "/catalog" }],
      };
    }
    const names = matching.slice(0, 3).map((c) => c.model).join(", ");
    return {
      text: `До ${formatPrice(maxPrice)} доступно ${matching.length} моделей, например: ${names}.`,
      actions: [{ label: "Показать в каталоге", to: `/catalog?maxPrice=${maxPrice}` }],
    };
  }

  return {
    text: "Не нашла точного совпадения. Попробуйте название модели, бренда, города или бюджет — например «что есть в Казани» или «до 8 млн».",
    actions: [
      { label: "Открыть каталог", to: "/catalog" },
      { label: "Все бренды", to: "/brands" },
    ],
  };
}
