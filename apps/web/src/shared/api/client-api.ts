import { CLIENT_BASE_URL } from './constants';
import { mergeHeaders, resolveBody } from './request.utils';
import { parseApiResponse } from './response.utils';

async function request<T>(
  endpoint: string,
  method: string,
  body?: unknown,
  options?: RequestInit,
): Promise<T> {
  const bodyOptions = resolveBody(body);
  const res = await fetch(`${CLIENT_BASE_URL}${endpoint}`, {
    ...options,
    method,
    credentials: 'include',
    headers: mergeHeaders(bodyOptions.headers, options?.headers),
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
