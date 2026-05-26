import { type ApiErrorCode, type ApiResponse, type CursorPage } from './types';

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
  const json: ApiResponse<T> = await res.json().catch(() => {
    throw new ApiResponseError('E500', `API Error: ${res.status}`);
  });
  if (json.resultType !== 'SUCCESS' || !res.ok) {
    throw new ApiResponseError(
      json.error?.errorCode ?? 'E500',
      json.error?.message ?? `API Error: ${res.status}`,
    );
  }
  return json.data as T;
}

export function getNextCursorPageParam(
  lastPage: CursorPage<unknown>,
): string | undefined {
  return lastPage.hasNext ? lastPage.nextCursor : undefined;
}
