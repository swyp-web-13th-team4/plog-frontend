import { API_ERROR_CODE } from './constants';

export type ApiError = {
  errorCode: ApiErrorCode;
  message: string;
  errorData: unknown | null;
};

export type ApiResponse<T> = {
  resultType: 'SUCCESS' | 'ERROR';
  data: T | null;
  error: ApiError | null;
};

export type ApiErrorCode = (typeof API_ERROR_CODE)[keyof typeof API_ERROR_CODE];

export type CursorPage<T> = {
  content: T[];
  hasNext: boolean;
  nextCursor: string;
};
