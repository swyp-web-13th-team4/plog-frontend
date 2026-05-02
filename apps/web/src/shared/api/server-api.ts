import { cookies } from 'next/headers';

import { BASE_URL } from './constants';
import { parseApiResponse } from './parse-api-response';
import { resolveBody } from './resolve-body';

async function request<T>(
  endpoint: string,
  method: string,
  body?: unknown,
  options?: RequestInit,
): Promise<T> {
  const cookieStore = await cookies();
  const cookieString = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');

  const bodyOptions = resolveBody(body);
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    method,
    headers: {
      ...bodyOptions.headers,
      ...(cookieString ? { Cookie: cookieString } : {}),
      ...options?.headers,
    },
    body: bodyOptions.body,
  });
  return parseApiResponse<T>(res);
}

export const serverApi = {
  get: <T>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, 'GET', undefined, options),
  post: <T>(endpoint: string, body?: unknown, options?: RequestInit) =>
    request<T>(endpoint, 'POST', body, options),
  put: <T>(endpoint: string, body?: unknown, options?: RequestInit) =>
    request<T>(endpoint, 'PUT', body, options),
  patch: <T>(endpoint: string, body?: unknown, options?: RequestInit) =>
    request<T>(endpoint, 'PATCH', body, options),
  delete: <T>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, 'DELETE', undefined, options),
};
