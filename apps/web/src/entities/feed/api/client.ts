import { clientApi } from '@/shared/api/client-api';

import { type FeedPost } from '../model/types';

export const getFeedDetail = (postId: number) => {
  return clientApi.get<FeedPost>(`/feed/${postId}`);
};
