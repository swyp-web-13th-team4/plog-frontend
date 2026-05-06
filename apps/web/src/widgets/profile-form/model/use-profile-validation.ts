import { useMemo, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { validateIntroduction, validateNickname } from '@/entities/user';

import { ApiResponseError } from '@/shared/api/response.utils';
import { useDebounce } from '@/shared/lib/debounce';

import {
  INTRODUCTION_ERROR_MESSAGES,
  NICKNAME_ERROR_MESSAGES,
} from './constants';

type ValidationResult =
  | { status: 'success'; message: string }
  | { status: 'error'; message: string };

type UseProfileValidationOptions = {
  ownNickname?: string;
  initialIntroduction?: string;
};

export function useProfileValidation({
  ownNickname,
  initialIntroduction,
}: UseProfileValidationOptions = {}) {
  const [nickname, setNickname] = useState(ownNickname ?? '');
  const [introduction, setIntroduction] = useState(initialIntroduction ?? '');

  const debouncedNickname = useDebounce(nickname);
  const debouncedIntroduction = useDebounce(introduction);

  const nicknameQueryEnabled =
    !!debouncedNickname.trim() &&
    !(ownNickname && debouncedNickname.trim() === ownNickname);

  const {
    isSuccess: nicknameIsSuccess,
    isError: nicknameIsError,
    error: nicknameError,
  } = useQuery({
    queryKey: ['validateNickname', debouncedNickname.trim()],
    queryFn: () => validateNickname(debouncedNickname.trim()),
    enabled: nicknameQueryEnabled,
    retry: false,
    staleTime: Infinity,
  });

  const { isError: introductionIsError, error: introductionError } = useQuery({
    queryKey: ['validateIntroduction', debouncedIntroduction.trim()],
    queryFn: () => validateIntroduction(debouncedIntroduction.trim()),
    enabled: !!debouncedIntroduction.trim(),
    retry: false,
    staleTime: Infinity,
  });

  const nicknameValidation = useMemo<ValidationResult | null>(() => {
    if (!nicknameQueryEnabled) return null;
    if (nicknameIsSuccess)
      return { status: 'success', message: '사용 가능한 닉네임입니다.' };
    if (nicknameIsError)
      return {
        status: 'error',
        message:
          nicknameError instanceof ApiResponseError
            ? (NICKNAME_ERROR_MESSAGES[nicknameError.errorCode] ??
              '유효하지 않은 닉네임입니다.')
            : '유효하지 않은 닉네임입니다.',
      };
    return null;
  }, [nicknameQueryEnabled, nicknameIsSuccess, nicknameIsError, nicknameError]);

  const introductionValidation = useMemo<ValidationResult | null>(() => {
    if (!debouncedIntroduction.trim()) return null;
    if (introductionIsError)
      return {
        status: 'error',
        message:
          introductionError instanceof ApiResponseError
            ? (INTRODUCTION_ERROR_MESSAGES[introductionError.errorCode] ??
              '입력한 내용을 다시 확인해 주세요.')
            : '입력한 내용을 다시 확인해 주세요.',
      };
    return null;
  }, [debouncedIntroduction, introductionIsError, introductionError]);

  return {
    nickname,
    setNickname,
    introduction,
    setIntroduction,
    nicknameValidation,
    introductionValidation,
  };
}
