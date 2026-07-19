'use client';

import { useRouter } from 'next/navigation';

import * as amplitude from '@amplitude/unified';
import { useToast } from '@plog/ui';
import { useMutation } from '@tanstack/react-query';

import { ProfileForm, type ProfileFormData } from '@/widgets/profile-form';

import {
  type DefaultProfileImage,
  signup,
  type TermsAgreements,
} from '@/entities/user';

import { NavigationHeader } from '@/shared/ui';

type ProfileSetupStepProps = {
  defaultImages: DefaultProfileImage[];
  termsAgreements: TermsAgreements;
  onBack: () => void;
};

export default function ProfileSetupStep({
  defaultImages,
  termsAgreements,
  onBack,
}: ProfileSetupStepProps) {
  const router = useRouter();
  const { toast } = useToast();

  const { mutate: submit, isPending } = useMutation({
    mutationFn: ({ nickname, introduction, imageOption }: ProfileFormData) =>
      signup(
        { nickname, introduction: introduction || undefined, termsAgreements },
        imageOption,
      ),
    onSuccess: () => {
      amplitude.track('signup_completed');
      toast({ type: 'success', description: '회원가입이 완료되었어요.' });
      router.push('/');
    },
    onError: () => {
      toast({
        type: 'error',
        description: '오류가 발생했어요. 다시 시도해 주세요.',
      });
    },
  });

  return (
    <>
      <NavigationHeader title="프로필 설정" onBack={onBack} />
      <ProfileForm
        defaultImages={defaultImages}
        submitLabel="시작하기"
        isSubmitting={isPending}
        onSubmit={submit}
      />
    </>
  );
}
