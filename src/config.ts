import {
  getCurrentEnvironment,
  getCurrentVersion,
} from '@/utils/environment';

export const IS_PRODUCTION = getCurrentEnvironment() === 'production';

export const IS_DEBUG = import.meta.env.VITE_DEBUG === 'true';

export const PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL;

IS_DEBUG &&
  console.log('@/config', {
    environment: getCurrentEnvironment(),
    version: getCurrentVersion(),
    PUBLIC_URL,
    IS_PRODUCTION,
    IS_DEBUG,
  });
