'use client';

import { useRouter } from 'next/navigation';

import { ProfileForm } from '@/widgets/profile-form';

import { type DefaultProfileImage, useMypageQuery } from '@/entities/user';

import { useUpdateProfileMutation } from '../model/use-update-profile-mutation';

type ProfileEditPageProps = {
  defaultImages: DefaultProfileImage[];
};

export default function ProfileEditPage({
  defaultImages,
}: ProfileEditPageProps) {
  const router = useRouter();

  const { data: mypageData, isPending: isMypagePending } = useMypageQuery();

  const { mutate: submit, isPending: isUpdatePending } =
    useUpdateProfileMutation({
      onSuccess: () => router.back(),
    });

  // TODO: 로딩 UI 구현 시 null을 스피너/스켈레톤으로 교체
  if (isMypagePending) return null;

  return (
    <ProfileForm
      defaultImages={defaultImages}
      initialAvatarSrc={mypageData?.profileImageUrl}
      initialImageOption={{ type: 'unchanged' }}
      ownNickname={mypageData?.nickname}
      initialIntroduction={mypageData?.introduction ?? undefined}
      submitLabel="저장"
      isSubmitting={isUpdatePending}
      hasBottomTab
      onSubmit={submit}
    />
  );
}
