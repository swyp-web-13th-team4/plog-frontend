import type { Metadata } from 'next';

import { CreateLogPage } from '@/views/log';

export const metadata: Metadata = { title: '기록하기' };

type LogPageProps = {
  searchParams: Promise<{
    postId?: string | string[];
  }>;
};

export default async function LogPage({ searchParams }: LogPageProps) {
  const { postId } = await searchParams;
  const normalizedPostId = typeof postId === 'string' ? postId : postId?.[0];

  return <CreateLogPage editPostId={normalizedPostId} />;
}
