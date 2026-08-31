export interface Brand {
  id: string;
  name: string;
  country: string;
  founded: number;
  tagline: string;
  description: string;
}

export interface Car {
  id: string;
  brandId: string;
  model: string;
  body: string;
  priceFrom: number;
  power: string;
  accel: string;
  description: string;
}

export interface Region {
  id: string;
  city: string;
  federalDistrict: string;
  dealers: number;
  showrooms: string[];
  availableBrandIds: string[];
}
