import { useQuery } from '@tanstack/react-query';

import {
  type BookmarkSortType,
  type FeedPost,
  type PlaceTagValue,
} from '@/entities/feed';

import { clientApi } from '@/shared/api/client-api';

async function fetchMyBookmarks(sort: BookmarkSortType, tags: PlaceTagValue[]) {
  const params = new URLSearchParams({ sort });
  tags.forEach((tag) => params.append('tags', tag));
  return clientApi.get<{ myBookmarks: FeedPost[] }>(
    `/members/bookmark?${params}`,
  );
}

export function useMyBookmarksQuery(
  sort: BookmarkSortType,
  tags: PlaceTagValue[] = [],
) {
  return useQuery({
    queryKey: ['mypage', 'bookmarks', sort, tags],
    queryFn: () => fetchMyBookmarks(sort, tags),
    select: (data) => data.myBookmarks,
  });
}
