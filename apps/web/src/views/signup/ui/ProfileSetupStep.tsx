'use client';

import { AppBar, Avatar, Button, Field, Icon, Input, Textarea } from '@plog/ui';

import { ProfileImageSheet } from '@/widgets/profile';

import {
  type DefaultProfileImage,
  type TermsAgreements,
} from '@/entities/user';

import { useProfileForm } from '../model/use-profile-form';
import { useProfileImage } from '../model/use-profile-image';

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
  const {
    isSheetOpen,
    setIsSheetOpen,
    avatarSrc,
    imageOption,
    selectedImageId,
    setSelectedImageId,
    openSheet,
    selectDefault,
    upload,
  } = useProfileImage(defaultImages);

  const {
    nickname,
    setNickname,
    introduction,
    setIntroduction,
    nicknameValidation,
    introductionValidation,
    canSubmit,
    handleSubmit,
  } = useProfileForm({ termsAgreements, imageOption });

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-10 mx-auto max-w-layout">
        <AppBar variant="navigation" title="프로필 설정" onBack={onBack} />
      </header>
      <form
        className="flex min-h-dvh w-full flex-col gap-8 p-6 pt-[calc(40px+var(--spacing-header))]"
        onSubmit={handleSubmit}
      >
        <button
          type="button"
          aria-label="프로필 이미지 변경"
          className="relative cursor-pointer self-center"
          onClick={openSheet}
        >
          <Avatar size="large" alt="" src={avatarSrc} />
          {!avatarSrc && (
            <Icon
              name="camera-filled"
              size={54}
              className="absolute top-1/2 left-1/2 -translate-1/2 text-semantic-object-normal"
            />
          )}
          <span
            aria-hidden
            className="absolute right-0 bottom-0 flex size-11 items-center justify-center rounded-full bg-semantic-accent-normal"
          >
            <Icon
              name="plus"
              size={30}
              className="text-semantic-object-inverse"
            />
          </span>
        </button>
        <Field
          label="닉네임"
          required
          success={
            nicknameValidation?.status === 'success'
              ? nicknameValidation.message
              : undefined
          }
          error={
            nicknameValidation?.status === 'error'
              ? nicknameValidation.message
              : undefined
          }
        >
          <Input
            value={nickname}
            onClear={() => setNickname('')}
            onChange={(e) => setNickname(e.target.value)}
            maxLength={10}
            placeholder="닉네임을 입력해 주세요."
          />
        </Field>
        <Field
          className="flex-1"
          label="소개글"
          error={
            introductionValidation?.status === 'error'
              ? introductionValidation.message
              : undefined
          }
        >
          <Textarea
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            maxLength={100}
            placeholder="개인정보(연락처, SNS 계정 등) 포함 시 노출이 제한될 수 있어요."
          />
        </Field>
        <Button type="submit" size="large" fullWidth disabled={!canSubmit}>
          시작하기
        </Button>
      </form>
      <ProfileImageSheet
        defaultImages={defaultImages}
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        selectedImageId={selectedImageId}
        onSelectedImageIdChange={setSelectedImageId}
        onSelectDefault={selectDefault}
        onUpload={upload}
      />
    </>
  );
}
