import type { Brand, Car, Region } from "../types";

export const brands: Brand[] = [
  { id: "aurion", name: "Aurion", country: "Германия", founded: 1958, tagline: "Инженерная точность как форма искусства", description: "Aurion строит автомобили вокруг одной идеи: каждая деталь должна быть оправдана — либо она делает машину быстрее, либо тише, либо честнее с водителем." },
  { id: "vellante", name: "Vellante", country: "Италия", founded: 1971, tagline: "Скорость, которая звучит как музыка", description: "Vellante собирает малые серии спорткаров вручную в Модене. Каждый кузов проходит через руки одного и того же мастера от начала до конца." },
  { id: "norrvik", name: "Norrvik", country: "Швеция", founded: 1989, tagline: "Тишина — тоже роскошь", description: "Norrvik проектирует электрические флагманы для тех, кто ценит бесшумный салон больше, чем маркетинговые цифры разгона." },
  { id: "kestrel", name: "Kestrel", country: "Великобритания", founded: 1934, tagline: "Наследие, которое едет вперёд", description: "Kestrel сохраняет ремесленные традиции британского коучбилдинга — дерево, кожа ручной прошивки — но под капотом только новейшие платформы." },
  { id: "meridian", name: "Meridian", country: "Япония", founded: 1963, tagline: "Надёжность, доведённая до одержимости", description: "Meridian тестирует каждый узел по 12 000 часов до выхода в производство. Инженеры называют это «культурой нуля дефектов»." },
  { id: "orsa", name: "Orsa", country: "Южная Корея", founded: 2015, tagline: "Люкс нового поколения", description: "Orsa — самый молодой бренд каталога, но уже задаёт тон в премиальных электромобилях благодаря смелому дизайну и щедрой комплектации." },
];

export const cars: Car[] = [
  { id: "aurion-s7", brandId: "aurion", model: "S7 Fastback", body: "Лифтбек", priceFrom: 8900000, power: "462 л.с.", accel: "3.9 с", description: "Флагманский лифтбек с воздушной подвеской и полным приводом." },
  { id: "aurion-gt4", brandId: "aurion", model: "GT4 Coupé", body: "Купе", priceFrom: 12400000, power: "530 л.с.", accel: "3.3 с", description: "Двухдверный гран-туризмо на карбоновом монококе." },
  { id: "vellante-corsa", brandId: "vellante", model: "Corsa 12", body: "Родстер", priceFrom: 24800000, power: "640 л.с.", accel: "2.9 с", description: "Атмосферный V12 без турбин и компромиссов." },
  { id: "vellante-strada", brandId: "vellante", model: "Strada V8", body: "Купе", priceFrom: 17200000, power: "590 л.с.", accel: "3.1 с", description: "Повседневный суперкар с ручной обивкой салона." },
  { id: "norrvik-e9", brandId: "norrvik", model: "E9 Silence", body: "Седан", priceFrom: 9600000, power: "612 л.с.", accel: "3.6 с", description: "Электрический флагман с шумоизоляцией уровня концертного зала." },
  { id: "norrvik-terra", brandId: "norrvik", model: "Terra EV", body: "Кроссовер", priceFrom: 7100000, power: "408 л.с.", accel: "4.8 с", description: "Семейный электрокроссовер с запасом хода 620 км." },
  { id: "kestrel-royale", brandId: "kestrel", model: "Royale Landau", body: "Седан", priceFrom: 21000000, power: "544 л.с.", accel: "4.2 с", description: "Представительский седан с шерстяной обивкой ручной работы." },
  { id: "kestrel-glen", brandId: "kestrel", model: "Glen Tourer", body: "Универсал", priceFrom: 10300000, power: "395 л.с.", accel: "5.1 с", description: "Охотничий универсал в традициях британских поместий." },
  { id: "meridian-zn6", brandId: "meridian", model: "ZN6 Reliant", body: "Седан", priceFrom: 4300000, power: "249 л.с.", accel: "6.4 с", description: "Бизнес-седан с десятилетней гарантией на трансмиссию." },
  { id: "meridian-orbit", brandId: "meridian", model: "Orbit Hybrid", body: "Кроссовер", priceFrom: 5600000, power: "312 л.с.", accel: "5.9 с", description: "Гибридный кроссовер с расходом 5.4 л на 100 км." },
  { id: "orsa-nova", brandId: "orsa", model: "Nova EV9", body: "Кроссовер", priceFrom: 6800000, power: "455 л.с.", accel: "4.4 с", description: "Электрокроссовер с панорамным OLED-стеклом крыши." },
  { id: "orsa-lumen", brandId: "orsa", model: "Lumen GT", body: "Лифтбек", priceFrom: 8100000, power: "489 л.с.", accel: "4.0 с", description: "Спортивный электролифтбек с адаптивным светом фар." },
];

export const regions: Region[] = [
  { id: "msk", city: "Москва", federalDistrict: "Центральный ФО", dealers: 14, showrooms: ["Кутузовский проспект", "Ленинградское шоссе", "Каширское шоссе"], availableBrandIds: ["aurion", "vellante", "norrvik", "kestrel", "meridian", "orsa"] },
  { id: "spb", city: "Санкт-Петербург", federalDistrict: "Северо-Западный ФО", dealers: 9, showrooms: ["Пулковское шоссе", "Приморский район"], availableBrandIds: ["aurion", "vellante", "norrvik", "kestrel", "meridian"] },
  { id: "kzn", city: "Казань", federalDistrict: "Приволжский ФО", dealers: 5, showrooms: ["Проспект Победы"], availableBrandIds: ["aurion", "meridian", "orsa"] },
  { id: "ekb", city: "Екатеринбург", federalDistrict: "Уральский ФО", dealers: 6, showrooms: ["Сибирский тракт"], availableBrandIds: ["aurion", "norrvik", "meridian", "orsa"] },
  { id: "nsk", city: "Новосибирск", federalDistrict: "Сибирский ФО", dealers: 4, showrooms: ["Бердское шоссе"], availableBrandIds: ["meridian", "orsa"] },
  { id: "rnd", city: "Ростов-на-Дону", federalDistrict: "Южный ФО", dealers: 3, showrooms: ["Западное шоссе"], availableBrandIds: ["aurion", "meridian"] },
  { id: "krd", city: "Краснодар", federalDistrict: "Южный ФО", dealers: 4, showrooms: ["Ростовское шоссе"], availableBrandIds: ["aurion", "kestrel", "meridian", "orsa"] },
  { id: "vld", city: "Владивосток", federalDistrict: "Дальневосточный ФО", dealers: 2, showrooms: ["Некрасовское шоссе"], availableBrandIds: ["meridian", "orsa"] },
];

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(value) + " ₽";
