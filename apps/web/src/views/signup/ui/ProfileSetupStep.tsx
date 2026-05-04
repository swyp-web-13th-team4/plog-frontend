'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { AppBar, useToast } from '@plog/ui';

import { ProfileForm, type ProfileFormData } from '@/widgets/profile-form';

import {
  type DefaultProfileImage,
  signup,
  type TermsAgreements,
} from '@/entities/user';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async ({
    nickname,
    introduction,
    imageOption,
  }: ProfileFormData) => {
    setIsSubmitting(true);
    try {
      await signup(
        { nickname, introduction: introduction || undefined, termsAgreements },
        imageOption,
      );
      toast({ type: 'success', description: '회원가입이 완료되었어요.' });
      router.push('/');
    } catch {
      toast({
        type: 'error',
        description: '오류가 발생했어요. 다시 시도해 주세요.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-10 mx-auto max-w-layout">
        <AppBar variant="navigation" title="프로필 설정" onBack={onBack} />
      </header>
      <ProfileForm
        defaultImages={defaultImages}
        submitLabel="시작하기"
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
      />
    </>
  );
}
