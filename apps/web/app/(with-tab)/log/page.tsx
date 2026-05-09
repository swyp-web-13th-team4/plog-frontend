import { CreateLogPage } from '@/views/log';

type LogPageProps = {
  searchParams: Promise<{
    postId?: string;
  }>;
};

export default async function LogPage({ searchParams }: LogPageProps) {
  const { postId } = await searchParams;

  return <CreateLogPage editPostId={postId} />;
}
