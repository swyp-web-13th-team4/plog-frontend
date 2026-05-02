import { cookies } from 'next/headers';

import { BASE_URL } from './constants';
import { parseApiResponse } from './parse-api-response';

export const serverApi = {
  get: async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
    const cookieStore = await cookies();
    const cookieString = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join('; ');

    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(cookieString ? { Cookie: cookieString } : {}),
        ...options?.headers,
      },
    });

    return parseApiResponse<T>(res);
  },
};
