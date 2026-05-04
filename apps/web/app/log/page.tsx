import { CreateFeedPage } from '@/views/log';

type LogPageProps = {
  searchParams: Promise<{
    placeName?: string;
  }>;
};

export default async function LogPage({ searchParams }: LogPageProps) {
  const { placeName = '' } = await searchParams;

  return <CreateFeedPage key={placeName} initialPlaceName={placeName} />;
}
