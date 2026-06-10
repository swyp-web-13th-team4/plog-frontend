'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import {
  feedQueryKeys,
  type PostSortType,
  profilePostsResponseSchema,
} from '@/entities/feed';

import { clientApi } from '@/shared/api/client-api';

function fetchFeedProfileViewPosts(memberKey: string, sort: PostSortType) {
  const params = new URLSearchParams({ sort });
  return clientApi.get(
    `/feed/profileView/${encodeURIComponent(memberKey)}/posts?${params}`,
    profilePostsResponseSchema,
  );
}

export function useFeedProfilePostsQuery(
  memberKey: string,
  sort: PostSortType,
) {
  const selectedMember = memberKey.trim();

  return useQuery({
    queryKey: feedQueryKeys.profileViewPosts(selectedMember, sort),
    queryFn: () => fetchFeedProfileViewPosts(selectedMember, sort),
    enabled: selectedMember.length > 0,
    placeholderData: keepPreviousData,
    select: (data) => data.posts,
  });
}
