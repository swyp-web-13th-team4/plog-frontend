import { type SubmitEvent, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import {
  type ProfileImageOption,
  signup,
  type TermsAgreements,
  validateIntroduction,
  validateNickname,
} from '@/entities/user';

import { ApiResponseError } from '@/shared/api/response.utils';
import { useDebounce } from '@/shared/lib/debounce';

import {
  INTRODUCTION_ERROR_MESSAGES,
  NICKNAME_ERROR_MESSAGES,
} from '../constants';

type ValidationResult =
  | { status: 'success'; message: string }
  | { status: 'error'; message: string };

type UseProfileFormOptions = {
  termsAgreements: TermsAgreements;
  imageOption: ProfileImageOption | null;
};

export function useProfileForm({
  termsAgreements,
  imageOption,
}: UseProfileFormOptions) {
  const router = useRouter();
  const [nickname, setNickname] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [nicknameValidation, setNicknameValidation] =
    useState<ValidationResult | null>(null);
  const [introductionValidation, setIntroductionValidation] =
    useState<ValidationResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const debouncedNickname = useDebounce(nickname);
  const debouncedIntroduction = useDebounce(introduction);

  const canSubmit =
    nickname.trim().length > 0 &&
    nicknameValidation?.status === 'success' &&
    imageOption !== null &&
    introductionValidation?.status !== 'error' &&
    !isSubmitting;

  useEffect(() => {
    if (!debouncedNickname.trim()) {
      setNicknameValidation(null);
      return;
    }
    validateNickname(debouncedNickname.trim())
      .then(() =>
        setNicknameValidation({
          status: 'success',
          message: '사용 가능한 닉네임입니다.',
        }),
      )
      .catch((e) =>
        setNicknameValidation({
          status: 'error',
          message:
            e instanceof ApiResponseError
              ? (NICKNAME_ERROR_MESSAGES[e.errorCode] ??
                '유효하지 않은 닉네임입니다.')
              : '유효하지 않은 닉네임입니다.',
        }),
      );
  }, [debouncedNickname]);

  useEffect(() => {
    if (!debouncedIntroduction.trim()) {
      setIntroductionValidation(null);
      return;
    }
    validateIntroduction(debouncedIntroduction.trim())
      .then(() => setIntroductionValidation(null))
      .catch((e) =>
        setIntroductionValidation({
          status: 'error',
          message:
            e instanceof ApiResponseError
              ? (INTRODUCTION_ERROR_MESSAGES[e.errorCode] ??
                '입력한 내용을 다시 확인해 주세요.')
              : '입력한 내용을 다시 확인해 주세요.',
        }),
      );
  }, [debouncedIntroduction]);

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    if (!canSubmit || !imageOption) return;
    setIsSubmitting(true);
    try {
      await signup(
        {
          nickname: nickname.trim(),
          introduction: introduction.trim() || undefined,
          termsAgreements,
        },
        imageOption,
      );
      router.push('/');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    nickname,
    setNickname,
    introduction,
    setIntroduction,
    nicknameValidation,
    introductionValidation,
    canSubmit,
    isSubmitting,
    handleSubmit,
  };
}
