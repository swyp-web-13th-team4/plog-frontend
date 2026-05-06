import { API_ERROR_CODE } from '@/shared/api/constants';
import { type ApiErrorCode } from '@/shared/api/types';

export const NICKNAME_ERROR_MESSAGES: Partial<Record<ApiErrorCode, string>> = {
  [API_ERROR_CODE.INVALID_NICKNAME_FORMAT]:
    '한글, 영문, 숫자, 언더바(_)만 사용할 수 있습니다.',
  [API_ERROR_CODE.DUPLICATE_NICKNAME]: '이미 사용 중인 닉네임입니다.',
  [API_ERROR_CODE.CONTAINS_BAD_WORD]:
    '사용할 수 없는 단어가 포함되어 있습니다.',
};

export const INTRODUCTION_ERROR_MESSAGES: Partial<
  Record<ApiErrorCode, string>
> = {
  [API_ERROR_CODE.INVALID_INTRODUCTION_FORMAT]:
    '소개글에 개인 정보를 포함할 수 없습니다.',
  [API_ERROR_CODE.CONTAINS_BAD_WORD]:
    '사용할 수 없는 단어가 포함되어 있습니다.',
};
