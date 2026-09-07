import {
  brands,
  cars,
  dealers,
  carDealerLinks,
  formatPrice,
} from "../data/mock";

export interface AssistantAction {
  label: string;
  to: string;
}

export interface AssistantReply {
  text: string;
  actions: AssistantAction[];
}

const REGION_KEYWORDS: Record<string, string[]> = {
  Москва: ["москва", "москве", "москвы", "мск"],
  "Санкт-Петербург": [
    "санкт-петербург",
    "петербург",
    "петербурге",
    "петербурга",
    "спб",
    "питер",
    "питере",
  ],
  Екатеринбург: [
    "екатеринбург",
    "екатеринбурге",
    "екатеринбурга",
    "екб",
  ],
  Челябинск: [
    "челябинск",
    "челябинске",
    "челябинска",
    "челябинском",
  ],
};

const PRICE_INTENT_WORDS = [
  "до",
  "дешевле",
  "бюджет",
  "не дороже",
  "цена",
  "стоимост",
];

function normalize(query: string): string {
  return query
    .toLowerCase()
    .replace(/[.,!?;:()[\]{}"]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function findRegion(query: string): string | null {
  for (const [city, keywords] of Object.entries(REGION_KEYWORDS)) {
    if (keywords.some((keyword) => query.includes(keyword))) {
      return city;
    }
  }

  return null;
}

function findCar(query: string) {
  return cars.find((car) => {
    const model = car.model.toLowerCase();

    if (query.includes(model)) {
      return true;
    }

    return model
      .split(/\s+/)
      .some(
        (word) =>
          word.length >= 4 &&
          query.includes(word)
      );
  });
}

function findBrand(query: string) {
  return brands.find((brand) =>
    query.includes(brand.name.toLowerCase())
  );
}

function findMaxPrice(query: string): number | null {
  const millionMatch = query.match(
    /(\d+[.,]?\d*)\s*(млн|миллион\w*)/
  );

  if (millionMatch) {
    const value = parseFloat(
      millionMatch[1].replace(",", ".")
    );

    if (Number.isFinite(value)) {
      return Math.round(value * 1_000_000);
    }
  }

  const rawMatch = query.match(/(\d{6,8})/);

  if (rawMatch) {
    const value = Number(rawMatch[1]);

    if (Number.isFinite(value)) {
      return value;
    }
  }

  return null;
}

function getDealersForCity(city: string) {
  return dealers.filter(
    (dealer) =>
      dealer.city.toLowerCase() === city.toLowerCase()
  );
}

function getCarsForDealers(dealerIds: Set<number>) {
  const carIds = new Set(
    carDealerLinks
      .filter((link) => dealerIds.has(link.dealerId))
      .map((link) => link.carId)
  );

  return cars.filter((car) => carIds.has(car.id));
}

export function askAssistant(
  rawQuery: string
): AssistantReply {
  const q = normalize(rawQuery);

  if (!q) {
    return {
      text:
        "Спросите про модель, бренд, бюджет или город — " +
        "например «что есть в Москве», «Vellante» или «до 8 млн».",
      actions: [
        {
          label: "Открыть каталог",
          to: "/catalog",
        },
        {
          label: "Регионы дилеров",
          to: "/regions",
        },
      ],
    };
  }

  /*
   * 1. Поиск по городу
   */
  const region = findRegion(q);

  if (region) {
    const cityDealers = getDealersForCity(region);
    const dealerIds = new Set(
      cityDealers.map((dealer) => dealer.id)
    );

    const availableCars = getCarsForDealers(dealerIds);

    const availableBrands = brands.filter((brand) =>
      availableCars.some(
        (car) => car.brandId === brand.id
      )
    );

    const brandText =
      availableBrands.length > 0
        ? ` Представлены бренды: ${availableBrands
            .map((brand) => brand.name)
            .join(", ")}.`
        : "";

    const modelText =
      availableCars.length > 0
        ? ` Доступно моделей: ${availableCars.length}.`
        : "";

    return {
      text:
        `В ${region} ${cityDealers.length} ` +
        `дилерских центров.${modelText}${brandText}`,
      actions: [
        {
          label: `Смотреть ${region}`,
          to: `/regions/${encodeURIComponent(region)}`,
        },
        {
          label: "Все регионы",
          to: "/regions",
        },
      ],
    };
  }

  /*
   * 2. Поиск по конкретной модели
   */
  const car = findCar(q);

  if (car) {
    const brand =
      brands.find(
        (item) => item.id === car.brandId
      ) ?? null;

    const brandName =
      brand?.name ?? car.brandName;

    return {
      text:
        `${brandName} ${car.model} (${car.body}) — ` +
        `от ${formatPrice(car.priceFrom)}. ` +
        car.description,
      actions: [
        ...(brand
          ? [
              {
                label: `Модели ${brand.name}`,
                to: `/brands/${brand.id}`,
              },
            ]
          : []),
        {
          label: "Смотреть в каталоге",
          to: `/catalog?maxPrice=${car.priceFrom}`,
        },
      ],
    };
  }

  /*
   * 3. Поиск по бренду
   */
  const brand = findBrand(q);

  if (brand) {
    const brandCars = cars.filter(
      (car) => car.brandId === brand.id
    );

    if (brandCars.length === 0) {
      return {
        text:
          `${brand.name} найден, но активных моделей ` +
          "в каталоге сейчас нет.",
        actions: [
          {
            label: "Открыть каталог",
            to: "/catalog",
          },
        ],
      };
    }

    const minPrice = Math.min(
      ...brandCars.map((car) => car.priceFrom)
    );

    const modelNames = brandCars
      .slice(0, 3)
      .map((car) => car.model)
      .join(", ");

    return {
      text:
        `${brand.name} — ${brandCars.length} ` +
        `${getRussianModelsWord(brandCars.length)} ` +
        `в каталоге, от ${formatPrice(minPrice)}. ` +
        `Например: ${modelNames}.`,
      actions: [
        {
          label: `Каталог ${brand.name}`,
          to: `/catalog?brand=${brand.id}`,
        },
      ],
    };
  }

  /*
   * 4. Поиск по бюджету
   */
  const maxPrice = findMaxPrice(q);

  const wantsPriceFilter =
    maxPrice !== null ||
    PRICE_INTENT_WORDS.some((word) =>
      q.includes(word)
    );

  if (wantsPriceFilter && maxPrice !== null) {
    const matchingCars = cars
      .filter(
        (car) => car.priceFrom <= maxPrice
      )
      .sort(
        (a, b) => a.priceFrom - b.priceFrom
      );

    if (matchingCars.length === 0) {
      const cheapest = Math.min(
        ...cars.map((car) => car.priceFrom)
      );

      return {
        text:
          `До ${formatPrice(maxPrice)} ` +
          "моделей пока нет. " +
          `Самая доступная начинается от ${formatPrice(
            cheapest
          )}.`,
        actions: [
          {
            label: "Открыть каталог",
            to: "/catalog",
          },
        ],
      };
    }

    const examples = matchingCars
      .slice(0, 3)
      .map(
        (car) =>
          `${car.brandName} ${car.model}`
      )
      .join(", ");

    return {
      text:
        `До ${formatPrice(maxPrice)} доступно ` +
        `${matchingCars.length} ` +
        `${getRussianModelsWord(
          matchingCars.length
        )}. Например: ${examples}.`,
      actions: [
        {
          label: "Показать в каталоге",
          to: `/catalog?maxPrice=${maxPrice}`,
        },
      ],
    };
  }

  /*
   * 5. Запрос по типу кузова
   */
  const bodyKeywords = [
    "кроссовер",
    "седан",
    "купе",
    "родстер",
    "универсал",
    "лифтбек",
  ];

  const matchedBody = bodyKeywords.find(
    (body) => q.includes(body)
  );

  if (matchedBody) {
    const bodyCars = cars.filter(
      (car) =>
        car.body.toLowerCase() === matchedBody
    );

    if (bodyCars.length > 0) {
      const examples = bodyCars
        .slice(0, 4)
        .map(
          (car) =>
            `${car.brandName} ${car.model}`
        )
        .join(", ");

      const minPrice = Math.min(
        ...bodyCars.map(
          (car) => car.priceFrom
        )
      );

      return {
        text:
          `В каталоге ${bodyCars.length} ` +
          `${getRussianModelsWord(
            bodyCars.length
          )} с кузовом «${matchedBody}». ` +
          `От ${formatPrice(minPrice)}. ` +
          `Например: ${examples}.`,
        actions: [
          {
            label: "Открыть каталог",
            to: "/catalog",
          },
        ],
      };
    }
  }

  /*
   * 6. Если точного совпадения нет
   */
  return {
    text:
      "Не нашла точного совпадения. " +
      "Попробуйте название модели, бренда, города " +
      "или бюджет — например «что есть в Москве», " +
      "«Vellante», «кроссовер» или «до 8 млн».",
    actions: [
      {
        label: "Открыть каталог",
        to: "/catalog",
      },
      {
        label: "Все бренды",
        to: "/brands",
      },
      {
        label: "Регионы дилеров",
        to: "/regions",
      },
    ],
  };
}

function getRussianModelsWord(count: number): string {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (
    mod10 === 1 &&
    mod100 !== 11
  ) {
    return "модель";
  }

  if (
    mod10 >= 2 &&
    mod10 <= 4 &&
    (mod100 < 12 || mod100 > 14)
  ) {
    return "модели";
  }

  return "моделей";
}
