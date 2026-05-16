import type { Metadata } from 'next';

import { ProfileEditPage } from '@/views/my-profile-edit';

export const metadata: Metadata = { title: '프로필 수정' };

import { getDefaultImages } from '@/entities/user/api/server';

export default async function Page() {
  const defaultImages = await getDefaultImages().catch(() => []);
  return <ProfileEditPage defaultImages={defaultImages} />;
}
