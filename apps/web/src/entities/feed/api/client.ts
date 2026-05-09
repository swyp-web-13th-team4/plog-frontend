import { clientApi } from '@/shared/api/client-api';
import { createMultipartRequest } from '@/shared/api/create-multipart-request';

import {
  type FeedListResponse,
  type FeedPage,
  type PostCreateRequest,
} from '../model/types';

type GetFeedPageParams = {
  lastPostId?: number | null;
  createAt?: string | null;
};

export const createPost = (data: PostCreateRequest, images: File[]) => {
  const formData = createMultipartRequest(data, { images });

  return clientApi.post<unknown>('/post', formData);
};

export const getFeedPage = async ({
  createAt,
  lastPostId,
}: GetFeedPageParams = {}): Promise<FeedPage> => {
  const searchParams = new URLSearchParams();
  if (lastPostId !== null && lastPostId !== undefined) {
    searchParams.set('lastPostId', String(lastPostId));
  }
  if (createAt) {
    searchParams.set('createAt', createAt);
  }

  const queryString = searchParams.toString();
  const data = await clientApi.get<FeedListResponse>(
    `/feed/list${queryString ? `?${queryString}` : ''}`,
  );

  return {
    items: data.feedFindResponses,
    lastPostId: data.lastPostId,
    createAt: data.createAt,
  };
};
