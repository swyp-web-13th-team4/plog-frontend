import { type z } from 'zod';

import { dialog } from '@/shared/lib/dialog';

import { CLIENT_BASE_URL } from './constants';
import { mergeHeaders, resolveBody } from './request.utils';
import { ApiResponseError, parseApiResponse } from './response.utils';

let isRedirectingToLogin = false;

async function request<T>(
  endpoint: string,
  method: string,
  body?: unknown,
  schema?: z.ZodType<T>,
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

  try {
    const data = await parseApiResponse<T>(res);
    return schema ? schema.parse(data) : data;
  } catch (error) {
    if (
      error instanceof ApiResponseError &&
      error.errorCode === 'E401' &&
      !isRedirectingToLogin
    ) {
      isRedirectingToLogin = true;
      await dialog.alert('로그인 후 이용할 수 있어요.');
      window.location.href = '/login';
    }
    throw error;
  }
}

export const clientApi = {
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
