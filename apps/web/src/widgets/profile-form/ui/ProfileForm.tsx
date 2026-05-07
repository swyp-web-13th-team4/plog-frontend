'use client';

import { type SubmitEvent } from 'react';

import { Avatar, Button, Field, Icon, Input, Textarea } from '@plog/ui';
import { cn } from '@plog/utils';

import {
  ProfileImageSheet,
  useProfileImage,
} from '@/features/select-profile-image';

import {
  type DefaultProfileImage,
  type ProfileImageOption,
} from '@/entities/user';

import { useProfileValidation } from '../model/use-profile-validation';

export type ProfileFormData = {
  nickname: string;
  introduction: string;
  imageOption: ProfileImageOption;
};

type ProfileFormProps = {
  defaultImages: DefaultProfileImage[];
  initialAvatarSrc?: string;
  initialImageOption?: ProfileImageOption;
  ownNickname?: string;
  initialIntroduction?: string;
  submitLabel: string;
  isSubmitting?: boolean;
  hasBottomTab?: boolean;
  onSubmit: (data: ProfileFormData) => void;
};

export default function ProfileForm({
  defaultImages,
  initialAvatarSrc,
  initialImageOption,
  ownNickname,
  initialIntroduction,
  submitLabel,
  isSubmitting = false,
  hasBottomTab = false,
  onSubmit,
}: ProfileFormProps) {
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
  } = useProfileImage(defaultImages, { initialAvatarSrc, initialImageOption });

  const {
    nickname,
    setNickname,
    introduction,
    setIntroduction,
    nicknameValidation,
    introductionValidation,
  } = useProfileValidation({ ownNickname, initialIntroduction });

  const nicknameChanged = nickname.trim() !== (ownNickname ?? '');
  const hasChanges =
    nicknameChanged ||
    introduction.trim() !== (initialIntroduction ?? '') ||
    imageOption !== (initialImageOption ?? null);

  const canSubmit =
    nickname.trim().length > 0 &&
    (!nicknameChanged || nicknameValidation?.status === 'success') &&
    imageOption !== null &&
    introductionValidation?.status !== 'error' &&
    hasChanges &&
    !isSubmitting;

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    if (!canSubmit || !imageOption) return;
    onSubmit({
      nickname: nickname.trim(),
      introduction: introduction.trim(),
      imageOption,
    });
  };

  return (
    <>
      <form
        className={cn(
          'flex w-full flex-col gap-8 p-6 pt-[calc(40px+var(--spacing-header))]',
          hasBottomTab
            ? 'min-h-[calc(100dvh-var(--spacing-bottom-tab))]'
            : 'min-h-dvh',
        )}
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
          {submitLabel}
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
