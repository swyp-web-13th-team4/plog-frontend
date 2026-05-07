'use client';

import Link from 'next/link';

import { Button } from '@plog/ui';

import { useMypageQuery, UserProfile } from '@/entities/user';

export default function ProfileSection() {
  const { data } = useMypageQuery();

  if (!data) return null;

  return (
    <UserProfile profile={data}>
      <Button
        variant="outline"
        size="medium"
        fullWidth
        nativeButton={false}
        render={<Link href="/my/profile-edit" />}
      >
        프로필 편집
      </Button>
    </UserProfile>
  );
}
