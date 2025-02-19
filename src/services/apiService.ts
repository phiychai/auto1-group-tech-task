import axios from 'axios';
import { CarColors, ManufacturerCollection, CarsCollectionPaginated, CarsCollectionParams} from '@/types/car';

const API_BASE_URL = 'https://auto1-mock-server.vercel.app/api';

if (!API_BASE_URL) {
  throw new Error('VITE_API_BASE_URL is not defined in the environment variables. Please check your .env file.');
}

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

/**
 * API service object for interacting with the car-related endpoints.
 */
export const apiService = {
  /**
   * Fetches the list of available car colors from the API.
   * @returns A promise that resolves to an array of strings representing car colors.
   */
  getColors: async (): Promise<string[]> => {
    const response = await axiosInstance.get<CarColors>('/colors');
    return response.data.colors;
  },

  /**
   * Retrieves the list of car manufacturers from the API.
   * @returns A promise that resolves to an array of manufacturer objects.
   */
  getManufacturers: async (): Promise<ManufacturerCollection['manufacturers']> => {
    const response = await axiosInstance.get<ManufacturerCollection>('/manufacturers');
    return response.data.manufacturers;
  },

  /**
   * Fetches a paginated list of cars based on the provided parameters.
   * @param params - An object containing query parameters for filtering and pagination.
   * @returns A promise that resolves to a paginated collection of car objects.
   */
  getCars: async (params: CarsCollectionParams): Promise<CarsCollectionPaginated> => {
    const response = await axiosInstance.get<CarsCollectionPaginated>('/cars', { params });
    return response.data;
  },
};