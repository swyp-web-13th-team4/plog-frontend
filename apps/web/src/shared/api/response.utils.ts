import { type ApiResponse } from './types';

export async function parseApiResponse<T>(res: Response): Promise<T> {
  const json: ApiResponse<T> = await res.json();
  if (json.resultType !== 'SUCCESS' || !res.ok) {
    throw new Error(json.error?.message ?? `API Error: ${res.status}`);
  }
  return json.data as T;
}
