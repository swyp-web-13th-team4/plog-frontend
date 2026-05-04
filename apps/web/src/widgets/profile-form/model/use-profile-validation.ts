import { useEffect, useMemo, useState } from 'react';

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
};

export function useProfileValidation({
  ownNickname,
}: UseProfileValidationOptions = {}) {
  const [nickname, setNickname] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [nicknameValidationResult, setNicknameValidationResult] =
    useState<ValidationResult | null>(null);
  const [introductionValidationResult, setIntroductionValidationResult] =
    useState<ValidationResult | null>(null);

  const debouncedNickname = useDebounce(nickname);
  const debouncedIntroduction = useDebounce(introduction);

  const nicknameValidation = useMemo<ValidationResult | null>(() => {
    if (!debouncedNickname.trim()) return null;
    if (ownNickname && debouncedNickname.trim() === ownNickname) {
      return { status: 'success', message: '사용 가능한 닉네임입니다.' };
    }
    return nicknameValidationResult;
  }, [debouncedNickname, ownNickname, nicknameValidationResult]);

  const introductionValidation = debouncedIntroduction.trim()
    ? introductionValidationResult
    : null;

  useEffect(() => {
    if (!debouncedNickname.trim()) return;
    if (ownNickname && debouncedNickname.trim() === ownNickname) return;
    validateNickname(debouncedNickname.trim())
      .then(() =>
        setNicknameValidationResult({
          status: 'success',
          message: '사용 가능한 닉네임입니다.',
        }),
      )
      .catch((e) =>
        setNicknameValidationResult({
          status: 'error',
          message:
            e instanceof ApiResponseError
              ? (NICKNAME_ERROR_MESSAGES[e.errorCode] ??
                '유효하지 않은 닉네임입니다.')
              : '유효하지 않은 닉네임입니다.',
        }),
      );
  }, [debouncedNickname, ownNickname]);

  useEffect(() => {
    if (!debouncedIntroduction.trim()) return;
    validateIntroduction(debouncedIntroduction.trim())
      .then(() => setIntroductionValidationResult(null))
      .catch((e) =>
        setIntroductionValidationResult({
          status: 'error',
          message:
            e instanceof ApiResponseError
              ? (INTRODUCTION_ERROR_MESSAGES[e.errorCode] ??
                '입력한 내용을 다시 확인해 주세요.')
              : '입력한 내용을 다시 확인해 주세요.',
        }),
      );
  }, [debouncedIntroduction]);

  return {
    nickname,
    setNickname,
    introduction,
    setIntroduction,
    nicknameValidation,
    introductionValidation,
  };
}
