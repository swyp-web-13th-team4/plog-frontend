import { type ApiErrorCode } from './constants';
import { type ApiResponse } from './types';

export class ApiResponseError extends Error {
  constructor(
    public readonly errorCode: ApiErrorCode,
    message: string,
  ) {
    super(message);
    this.name = 'ApiResponseError';
  }
}

export async function parseApiResponse<T>(res: Response): Promise<T> {
  const json: ApiResponse<T> = await res.json();
  if (json.resultType !== 'SUCCESS' || !res.ok) {
    throw new ApiResponseError(
      json.error?.errorCode ?? 'E500',
      json.error?.message ?? `API Error: ${res.status}`,
    );
  }
  return json.data as T;
}
