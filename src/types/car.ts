export type CarColors = {
  colors: string[];
};

export type Model = {
  name: string;
};

export type Manufacturer = {
  name: string;
  models: Model[];
};

export type ManufacturerCollection = {
  manufacturers: Manufacturer[];
};

export type FuelType = 'Diesel' | 'Petrol';
export type MileageUnit = 'km' | 'mi';

export type Mileage = {
  number: number;
  unit: MileageUnit;
};

export type Car = {
  stockNumber: number;
  manufacturerName: string;
  modelName: string;
  color: string;
  mileage: Mileage;
  fuelType: FuelType;
  pictureUrl: string;
};

export type CarsCollectionParams = {
  color?: string;
  manufacturer?: string;
  page: number;
};

export type CarsCollectionPaginated = {
  cars: Car[];
  totalPageCount: number;
  totalCarsCount: number;
}



