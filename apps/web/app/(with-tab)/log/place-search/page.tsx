import { SearchPlacePage } from '@/views/log-place-search';

type LogPlaceSearchPageProps = {
  searchParams: Promise<{
    returnTo?: string | string[];
  }>;
};

export default async function LogPlaceSearchPage({
  searchParams,
}: LogPlaceSearchPageProps) {
  const { returnTo } = await searchParams;
  const normalizedReturnTo =
    typeof returnTo === 'string' ? returnTo : returnTo?.[0];

  return <SearchPlacePage returnTo={normalizedReturnTo} />;
}
