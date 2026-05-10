import { SearchPlacePage } from '@/views/log-place-search';

type LogPlaceSearchPageProps = {
  searchParams: Promise<{
    returnTo?: string;
  }>;
};

export default async function LogPlaceSearchPage({
  searchParams,
}: LogPlaceSearchPageProps) {
  const { returnTo } = await searchParams;

  return <SearchPlacePage returnTo={returnTo} />;
}
