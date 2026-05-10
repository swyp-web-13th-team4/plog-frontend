import { CreateLogPage } from '@/views/log';

type LogPageProps = {
  searchParams: Promise<{
    postId?: string | string[];
    restoreDraft?: string | string[];
  }>;
};

export default async function LogPage({ searchParams }: LogPageProps) {
  const { postId, restoreDraft } = await searchParams;
  const normalizedPostId = typeof postId === 'string' ? postId : postId?.[0];
  const normalizedRestoreDraft =
    typeof restoreDraft === 'string' ? restoreDraft : restoreDraft?.[0];

  return (
    <CreateLogPage
      editPostId={normalizedPostId}
      restoreDraft={normalizedRestoreDraft === '1'}
    />
  );
}
