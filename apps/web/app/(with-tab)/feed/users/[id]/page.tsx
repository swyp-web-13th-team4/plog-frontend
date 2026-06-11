import type { Metadata } from 'next';

import { UserProfilePage } from '@/views/users-detail';

import { MemberInfo } from '@/entities/feed';

import { serverApi } from '@/shared/api/server-api';

type UserProfilePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: UserProfilePageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const profile = await serverApi.get<MemberInfo>(
      `/feed/profileView/${encodeURIComponent(id)}`,
    );
    return { title: `${profile.nickname} 님의 프로필` };
  } catch {
    return { title: '프로필' };
  }
}

export default async function Page({ params }: UserProfilePageProps) {
  const { id } = await params;
  return <UserProfilePage userId={id} />;
}
