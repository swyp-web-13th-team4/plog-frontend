import { BASE_URL } from './constants';
import { parseApiResponse } from './parse-api-response';
import { resolveBody } from './resolve-body';

async function request<T>(
  endpoint: string,
  method: string,
  body?: unknown,
  options?: RequestInit,
): Promise<T> {
  const bodyOptions = resolveBody(body);
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    method,
    credentials: 'include',
    headers: { ...bodyOptions.headers, ...options?.headers },
    body: bodyOptions.body,
  });
  return parseApiResponse<T>(res);
}

export const clientApi = {
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
