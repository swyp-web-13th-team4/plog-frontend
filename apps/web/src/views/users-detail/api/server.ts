import { cache } from 'react';

import { profilePostsResponseSchema } from '@/entities/feed/model/schemas';
import { type PostSortType } from '@/entities/feed/model/types';

import { serverApi } from '@/shared/api/server-api';

import { feedProfileViewResponseSchema } from '../model/schemas';

export const getUserProfile = cache((id: string) =>
  serverApi.get(
    `/feed/profileView/${encodeURIComponent(id)}`,
    feedProfileViewResponseSchema,
  ),
);

export const getUserProfilePosts = cache((id: string, sort: PostSortType) => {
  const params = new URLSearchParams({ sort });
  return serverApi.get(
    `/feed/profileView/${encodeURIComponent(id)}/posts?${params}`,
    profilePostsResponseSchema,
  );
});
