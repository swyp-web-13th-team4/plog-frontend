'use client';

import { useRouter } from 'next/navigation';

import { AppBar } from '@plog/ui';

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

  const { data: mypageData } = useMypageQuery();

  const { mutate: submit, isPending } = useUpdateProfileMutation({
    onSuccess: () => router.back(),
  });

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-10 mx-auto max-w-layout">
        <AppBar
          variant="navigation"
          title="프로필 편집"
          onBack={() => router.back()}
        />
      </header>
      <ProfileForm
        defaultImages={defaultImages}
        initialAvatarSrc={mypageData?.profileImageUrl}
        initialImageOption={{ type: 'unchanged' }}
        ownNickname={mypageData?.nickname}
        initialIntroduction={mypageData?.introduction ?? undefined}
        submitLabel="저장"
        isSubmitting={isPending}
        onSubmit={submit}
      />
    </>
  );
}
