import type { Brand, Car, Dealer, CarDealerLink } from "../types";

export const brands: Brand[] = [
  { id: 1, name: "Aurion" },
  { id: 2, name: "Vellante" },
  { id: 3, name: "Norrvik" },
  { id: 4, name: "Kestrel" },
  { id: 5, name: "Meridian" },
  { id: 6, name: "Orsa" },
];

export const cars: Car[] = [
  { id: 1, brandId: 1, brandName: "Aurion", model: "S7 Fastback", body: "Лифтбек", priceFrom: 8900000, priceTo: 9800000, description: "Флагманский лифтбек с воздушной подвеской и полным приводом.", imageUrl: null },
  { id: 2, brandId: 1, brandName: "Aurion", model: "GT4 Coupé", body: "Купе", priceFrom: 12400000, priceTo: 13600000, description: "Двухдверный гран-туризмо на карбоновом монококе.", imageUrl: null },
  { id: 3, brandId: 2, brandName: "Vellante", model: "Corsa 12", body: "Родстер", priceFrom: 24800000, priceTo: 27200000, description: "Атмосферный V12 без турбин и компромиссов.", imageUrl: null },
  { id: 4, brandId: 2, brandName: "Vellante", model: "Strada V8", body: "Купе", priceFrom: 17200000, priceTo: 18900000, description: "Повседневный суперкар с ручной обивкой салона.", imageUrl: null },
  { id: 5, brandId: 3, brandName: "Norrvik", model: "E9 Silence", body: "Седан", priceFrom: 9600000, priceTo: 10500000, description: "Электрический флагман с шумоизоляцией уровня концертного зала.", imageUrl: null },
  { id: 6, brandId: 3, brandName: "Norrvik", model: "Terra EV", body: "Кроссовер", priceFrom: 7100000, priceTo: 7900000, description: "Семейный электрокроссовер с запасом хода 620 км.", imageUrl: null },
  { id: 7, brandId: 4, brandName: "Kestrel", model: "Royale Landau", body: "Седан", priceFrom: 21000000, priceTo: 23100000, description: "Представительский седан с шерстяной обивкой ручной работы.", imageUrl: null },
  { id: 8, brandId: 4, brandName: "Kestrel", model: "Glen Tourer", body: "Универсал", priceFrom: 10300000, priceTo: 11200000, description: "Охотничий универсал в традициях британских поместий.", imageUrl: null },
  { id: 9, brandId: 5, brandName: "Meridian", model: "ZN6 Reliant", body: "Седан", priceFrom: 4300000, priceTo: 4800000, description: "Бизнес-седан с десятилетней гарантией на трансмиссию.", imageUrl: null },
  { id: 10, brandId: 5, brandName: "Meridian", model: "Orbit Hybrid", body: "Кроссовер", priceFrom: 5600000, priceTo: 6200000, description: "Гибридный кроссовер с расходом 5.4 л на 100 км.", imageUrl: null },
  { id: 11, brandId: 6, brandName: "Orsa", model: "Nova EV9", body: "Кроссовер", priceFrom: 6800000, priceTo: 7500000, description: "Электрокроссовер с панорамным OLED-стеклом крыши.", imageUrl: null },
  { id: 12, brandId: 6, brandName: "Orsa", model: "Lumen GT", body: "Лифтбек", priceFrom: 8100000, priceTo: 8900000, description: "Спортивный электролифтбек с адаптивным светом фар.", imageUrl: null },
];

// dealer_group в реальной таблице хранит строку вида "1 Москва" (импорт из Excel) —
// поле city здесь уже нормализовано для мок-режима.
export const dealers: Dealer[] = [
  { id: 1, name: "Aurion Центр Кутузовский", dealerCode: "AUR-MSK-1", city: "Москва" },
  { id: 2, name: "Aurion Норд", dealerCode: "AUR-SPB-1", city: "Санкт-Петербург" },
  { id: 3, name: "Vellante Studio Moscow", dealerCode: "VEL-MSK-1", city: "Москва" },
  { id: 4, name: "Norrvik Электро Екатеринбург", dealerCode: "NOR-EKB-1", city: "Екатеринбург" },
  { id: 5, name: "Norrvik Центр Москва", dealerCode: "NOR-MSK-1", city: "Москва" },
  { id: 6, name: "Kestrel Heritage Motors", dealerCode: "KES-SPB-1", city: "Санкт-Петербург" },
  { id: 7, name: "Kestrel Урал", dealerCode: "KES-CHL-1", city: "Челябинск" },
  { id: 8, name: "Meridian Формат", dealerCode: "MER-MSK-1", city: "Москва" },
  { id: 9, name: "Meridian Формат Екатеринбург", dealerCode: "MER-EKB-1", city: "Екатеринбург" },
  { id: 10, name: "Meridian Формат Челябинск", dealerCode: "MER-CHL-1", city: "Челябинск" },
  { id: 11, name: "Orsa Digital Moscow", dealerCode: "ORS-MSK-1", city: "Москва" },
  { id: 12, name: "Orsa Digital СПб", dealerCode: "ORS-SPB-1", city: "Санкт-Петербург" },
];

export const carDealerLinks: CarDealerLink[] = [
  { carId: 1, dealerId: 1 }, { carId: 2, dealerId: 1 },
  { carId: 3, dealerId: 3 }, { carId: 4, dealerId: 3 },
  { carId: 5, dealerId: 4 }, { carId: 5, dealerId: 5 },
  { carId: 6, dealerId: 4 }, { carId: 6, dealerId: 5 },
  { carId: 7, dealerId: 6 }, { carId: 8, dealerId: 6 }, { carId: 8, dealerId: 7 },
  { carId: 9, dealerId: 8 }, { carId: 9, dealerId: 9 }, { carId: 9, dealerId: 10 },
  { carId: 10, dealerId: 8 }, { carId: 10, dealerId: 9 },
  { carId: 11, dealerId: 11 }, { carId: 12, dealerId: 11 }, { carId: 12, dealerId: 12 },
];

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(value) + " ₽";

// Соответствие между "разговорными" ярлыками быстрых фильтров и реальными названиями городов.
export const CITY_QUICK_FILTERS: { label: string; match: string }[] = [
  { label: "Москва", match: "москва" },
  { label: "Питер", match: "санкт-петербург" },
  { label: "Екатеринбург", match: "екатеринбург" },
  { label: "Челябинск", match: "челябинск" },
];
