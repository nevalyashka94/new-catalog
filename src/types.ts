export interface Brand {
  id: number;
  name: string;
}

export interface Car {
  id: number;
  brandId: number;
  brandName: string;
  model: string;
  body: string;
  priceFrom: number;
  priceTo: number;
  description: string;
  imageUrl: string | null;
}

export interface Dealer {
  id: number;
  name: string;
  dealerCode: string;
  city: string;
}

export interface CarDealerLink {
  carId: number;
  dealerId: number;
}
