import { BASE_URL } from './constants';
import { parseApiResponse } from './parse-api-response';

export const clientApi = {
  get: async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    return parseApiResponse<T>(res);
  },
};
