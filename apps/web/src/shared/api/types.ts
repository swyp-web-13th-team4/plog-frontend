import { type ApiErrorCode } from './constants';

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
