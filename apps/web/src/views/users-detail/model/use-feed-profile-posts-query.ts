'use client';

import { useQuery } from '@tanstack/react-query';

import {
  feedQueryKeys,
  getFeedProfileViewPosts,
  type PostSortType,
} from '@/entities/feed';

export function useFeedProfilePostsQuery(
  memberKey: string,
  sort: PostSortType,
) {
  const selectedMember = memberKey.trim();

  return useQuery({
    queryKey: feedQueryKeys.profileViewPosts(selectedMember, sort),
    queryFn: () => getFeedProfileViewPosts(selectedMember, sort),
    enabled: selectedMember.length > 0,
    select: (data) => data.posts,
  });
}
