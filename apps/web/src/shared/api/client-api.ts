import { dialog } from '@/shared/lib/dialog';

import { CLIENT_BASE_URL } from './constants';
import { mergeHeaders, resolveBody } from './request.utils';
import { ApiResponseError, parseApiResponse } from './response.utils';

let isRedirectingToLogin = false;

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

  try {
    return await parseApiResponse<T>(res);
  } catch (error) {
    if (
      error instanceof ApiResponseError &&
      error.errorCode === 'E401' &&
      !isRedirectingToLogin
    ) {
      isRedirectingToLogin = true;
      await dialog.alert('로그인이 필요합니다.');
      window.location.href = '/login';
    }
    throw error;
  }
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
