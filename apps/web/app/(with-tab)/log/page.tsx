import { CreateLogPage } from '@/views/log';

import { parseSelectedPlaceSearchParams } from '@/features/place-search/model/selected-place';

type LogPageProps = {
  searchParams: Promise<{
    placeId?: string;
    placeName?: string;
    placeAddress?: string;
    placeLatitude?: string;
    placeLongitude?: string;
  }>;
};

export default async function LogPage({ searchParams }: LogPageProps) {
  const params = await searchParams;
  const selectedPlace = parseSelectedPlaceSearchParams(params);

  return (
    <CreateLogPage
      key={selectedPlace?.id ?? 'empty-place'}
      initialPlace={selectedPlace}
    />
  );
}
