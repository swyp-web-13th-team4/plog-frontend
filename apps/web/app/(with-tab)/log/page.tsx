import { CreateLogPage } from '@/views/log';

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
