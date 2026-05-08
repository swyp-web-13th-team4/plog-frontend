import { clientApi } from '@/shared/api/client-api';
import { createMultipartRequest } from '@/shared/api/create-multipart-request';

import { type PostCreateRequest } from '../model/types';

export const createPost = (data: PostCreateRequest, images: File[]) => {
  const formData = createMultipartRequest(data, { images });

  return clientApi.post<unknown>('/post', formData);
};
