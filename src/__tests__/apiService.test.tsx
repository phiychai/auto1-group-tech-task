import {  it, vi, expect } from 'vitest';
import axios from 'axios';
import { apiService } from '@/services/apiService';
import { CarsCollectionParams, CarsCollectionPaginated, ManufacturerCollection, CarColors } from '@/types/car';

it('should create an axios instance with the correct base URL', async () => {
  const axiosCreateSpy = vi.spyOn(axios, 'create');

  // Re-import the module to trigger the axios.create call
  vi.resetModules();
  await import('@/services/apiService');

  expect(axiosCreateSpy).toHaveBeenCalledWith(
    expect.objectContaining({
      baseURL: 'https://auto1-mock-server.vercel.app/api',
    })
  );

  axiosCreateSpy.mockRestore();
});

it('should handle API errors when calling getCars', async () => {
  const errorMessage = 'Network Error';
  const mockGet = vi.fn().mockRejectedValueOnce(new Error(errorMessage));
  vi.spyOn(axios, 'create').mockReturnValueOnce({ get: mockGet } as any);

  const params: CarsCollectionParams = { page: 1 };

  await expect(apiService.getCars(params)).rejects.toThrow(errorMessage);

  expect(mockGet).toHaveBeenCalledWith('/cars', { params });
});

it('should return the correct paginated car collection from the API', async () => {
  const mockResponse: CarsCollectionPaginated = {
    cars: [
      {
        stockNumber: 1,
        manufacturerName: 'Audi',
        modelName: 'A1',
        color: 'red',
        mileage: { number: 10000, unit: 'km' },
        fuelType: 'Petrol | Electric ',
        pictureUrl: 'https://example.com/car.jpg',
      },
    ],
    totalPageCount: 1,
    totalCarsCount: 1,
  };

  const mockGet = vi.spyOn(apiService, 'getCars').mockResolvedValue(mockResponse);

  const params: CarsCollectionParams = { page: 1, color: 'red', manufacturer: 'Audi' };
  const result = await apiService.getCars(params);

  expect(mockGet).toHaveBeenCalledWith(params);
  expect(result).toEqual(mockResponse);

  mockGet.mockRestore();
});