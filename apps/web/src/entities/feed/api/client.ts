import { clientApi } from '@/shared/api/client-api';

import {
  type FeedPost,
  type FeedProfilePosts,
  type FeedProfileView,
  type PostSortType,
} from '../model/types';

export const getFeedDetail = (postId: number) => {
  return clientApi.get<FeedPost>(`/feed/${postId}`);
};

export const getFeedProfileView = (memberKey: string) => {
  return clientApi.get<FeedProfileView>(
    `/feed/profileView/${encodeURIComponent(memberKey)}`,
  );
};

export const getFeedProfileViewPosts = (
  memberKey: string,
  sort: PostSortType = 'latest',
) => {
  const params = new URLSearchParams({ sort });

  return clientApi.get<FeedProfilePosts>(
    `/feed/profileView/${encodeURIComponent(memberKey)}/posts?${params}`,
  );
};
