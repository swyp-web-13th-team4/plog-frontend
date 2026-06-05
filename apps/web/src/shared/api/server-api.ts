import { cookies } from 'next/headers';

import { type z } from 'zod';

import { BASE_URL } from './constants';
import { mergeHeaders, resolveBody } from './request.utils';
import { parseApiResponse } from './response.utils';

async function request<T>(
  endpoint: string,
  method: string,
  body?: unknown,
  schema?: z.ZodType<T>,
  options?: RequestInit,
): Promise<T> {
  const cookieStore = await cookies();
  const cookieString = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');

  const bodyOptions = resolveBody(body);
  const headers = mergeHeaders(bodyOptions.headers, options?.headers);
  if (cookieString) headers.set('Cookie', cookieString);

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    method,
    headers,
    body: bodyOptions.body,
  });
  const data = await parseApiResponse<T>(res);
  return schema ? schema.parse(data) : data;
}

export const serverApi = {
  get: <T>(endpoint: string, schema?: z.ZodType<T>, options?: RequestInit) =>
    request<T>(endpoint, 'GET', undefined, schema, options),
  post: <T>(
    endpoint: string,
    body?: unknown,
    schema?: z.ZodType<T>,
    options?: RequestInit,
  ) => request<T>(endpoint, 'POST', body, schema, options),
  put: <T>(
    endpoint: string,
    body?: unknown,
    schema?: z.ZodType<T>,
    options?: RequestInit,
  ) => request<T>(endpoint, 'PUT', body, schema, options),
  patch: <T>(
    endpoint: string,
    body?: unknown,
    schema?: z.ZodType<T>,
    options?: RequestInit,
  ) => request<T>(endpoint, 'PATCH', body, schema, options),
  delete: <T>(endpoint: string, schema?: z.ZodType<T>, options?: RequestInit) =>
    request<T>(endpoint, 'DELETE', undefined, schema, options),
};
