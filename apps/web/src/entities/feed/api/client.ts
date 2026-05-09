import { clientApi } from '@/shared/api/client-api';
import { createMultipartRequest } from '@/shared/api/create-multipart-request';

import {
  type FeedDetailResponse,
  type FeedListResponse,
  type FeedPage,
  type PostCreateRequest,
  type PostEditResponse,
  type PostUpdateRequest,
  type PostUpdateResponse,
} from '../model/types';

type GetFeedPageParams = {
  lastPostId?: number | null;
  createAt?: string | null;
};

type FeedListApiResponse = FeedListResponse & {
  createdAt?: string | null;
};

export const createPost = (data: PostCreateRequest, images: File[]) => {
  const formData = createMultipartRequest(data, { images });

  return clientApi.post<unknown>('/post', formData);
};

export const getPostForEdit = (postId: number) =>
  clientApi.get<PostEditResponse>(`/post/${postId}/edit`);

export const updatePost = (
  postId: number,
  data: PostUpdateRequest,
  images: File[] = [],
) => {
  const formData = createMultipartRequest(data, { images });

  return clientApi.put<PostUpdateResponse>(`/post/${postId}`, formData);
};

export const deletePost = (postId: number) =>
  clientApi.delete<unknown>(`/post/${postId}`);

export const getFeedDetail = (postId: number) =>
  clientApi.get<FeedDetailResponse>(`/feed/${postId}`);

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
  const data = await clientApi.get<FeedListApiResponse>(
    `/feed/list${queryString ? `?${queryString}` : ''}`,
  );

  return {
    items: data.feedFindResponses,
    lastPostId: data.lastPostId,
    createAt: data.createAt ?? data.createdAt ?? null,
  };
};
