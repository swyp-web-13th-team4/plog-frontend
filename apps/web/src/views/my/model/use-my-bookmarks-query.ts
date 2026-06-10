import { useQuery } from '@tanstack/react-query';

import {
  bookmarkedFeedsResponseSchema,
  type BookmarkSortType,
  type PlaceTagValue,
} from '@/entities/feed';
import { mypageQueryKeys } from '@/entities/user';

import { clientApi } from '@/shared/api/client-api';

async function fetchMyBookmarks(sort: BookmarkSortType, tags: PlaceTagValue[]) {
  const params = new URLSearchParams({ sort });
  tags.forEach((tag) => params.append('tags', tag));
  return clientApi.get(
    `/members/bookmark?${params}`,
    bookmarkedFeedsResponseSchema,
  );
}

export function useMyBookmarksQuery(
  sort: BookmarkSortType,
  tags: PlaceTagValue[] = [],
) {
  return useQuery({
    queryKey: mypageQueryKeys.bookmarks(sort, tags),
    queryFn: () => fetchMyBookmarks(sort, tags),
    select: (data) => data.myBookmarks,
  });
}
