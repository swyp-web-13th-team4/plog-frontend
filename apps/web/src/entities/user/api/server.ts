import { serverApi } from '@/shared/api/server-api';

import { type DefaultProfileImage, type TermId } from '../model/types';

export const getTerm = (termId: TermId) =>
  serverApi
    .get<{ content: string }>(`/terms?name=${termId}`)
    .then((res) => res.content);

export const getDefaultImages = () =>
  serverApi.get<DefaultProfileImage[]>('/members/default-images');
