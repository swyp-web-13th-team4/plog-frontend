import { useQuery } from '@tanstack/react-query';

import {
  type FeedTypeInUserPostList,
  type PlaceTagValue,
  type PostSortType,
} from '@/entities/feed';
import { mypageQueryKeys } from '@/entities/user';

import { clientApi } from '@/shared/api/client-api';

async function fetchMyPosts(sort: PostSortType, tags: PlaceTagValue[]) {
  const params = new URLSearchParams({ sort });
  tags.forEach((tag) => params.append('tags', tag));
  return clientApi.get<{ posts: FeedTypeInUserPostList[] }>(
    `/members/mypage/posts?${params}`,
  );
}

export function useMyPostsQuery(
  sort: PostSortType,
  tags: PlaceTagValue[] = [],
) {
  return useQuery({
    queryKey: mypageQueryKeys.posts(sort, tags),
    queryFn: () => fetchMyPosts(sort, tags),
    select: (data) => data.posts,
  });
}
