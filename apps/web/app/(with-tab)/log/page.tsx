import { CreateLogPage } from '@/views/log';

type LogPageProps = {
  searchParams: Promise<{
    postId?: string;
    restoreDraft?: string;
  }>;
};

export default async function LogPage({ searchParams }: LogPageProps) {
  const { postId, restoreDraft } = await searchParams;

  return (
    <CreateLogPage editPostId={postId} restoreDraft={restoreDraft === '1'} />
  );
}
