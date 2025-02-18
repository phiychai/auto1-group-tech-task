import axios from 'axios';
import { CarColors, ManufacturerCollection, CarCollectionPaginated, CarCollectionParams} from '@/types/car';

const API_BASE_URL = 'https://auto1-mock-server.vercel.app/api';

if (!API_BASE_URL) {
  throw new Error('VITE_API_BASE_URL is not defined in the environment variables. Please check your .env file.');
}

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

export const apiService = {
  getColors: async (): Promise<string[]> => {
    const response = await axiosInstance.get<CarColors>('/colors');
    return response.data.colors;
  },

  getManufacturers: async (): Promise<ManufacturerCollection['manufacturers']> => {
    const response = await axiosInstance.get<ManufacturerCollection>('/manufacturers');
    return response.data.manufacturers;
  },

  getCars: async (params: CarCollectionParams): Promise<CarCollectionPaginated> => {
    const response = await axiosInstance.get<CarCollectionPaginated>('/cars', { params });
    return response.data;
  },
};