import { cache } from 'react';

import type { Metadata } from 'next';

import { UserProfilePage } from '@/views/users-detail';
import { feedProfileViewResponseSchema } from '@/views/users-detail/model/schemas';

import { serverApi } from '@/shared/api/server-api';

const getUserProfile = cache((id: string) =>
  serverApi.get(
    `/feed/profileView/${encodeURIComponent(id)}`,
    feedProfileViewResponseSchema,
  ),
);

type UserProfilePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: UserProfilePageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const profile = await getUserProfile(id);
    return { title: `${profile.memberInfo.nickname} 님의 프로필` };
  } catch {
    return { title: '프로필' };
  }
}

export default async function Page({ params }: UserProfilePageProps) {
  const { id } = await params;
  const initialData = await getUserProfile(id).catch(() => undefined);
  return <UserProfilePage userId={id} initialData={initialData} />;
}
