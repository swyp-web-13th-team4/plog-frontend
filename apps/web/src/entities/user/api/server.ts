import DOMPurify from 'isomorphic-dompurify';

import { serverApi } from '@/shared/api/server-api';

import { type DefaultProfileImage, type TermId } from '../model/types';

const getTerm = (termId: TermId) =>
  serverApi
    .get<{ content: string }>(`/terms?name=${termId}`)
    .then((res) => res.content);

export const getSanitizedTerm = async (termId: TermId) => {
  const html = await getTerm(termId);
  return DOMPurify.sanitize(html);
};

export const getDefaultImages = () =>
  serverApi.get<DefaultProfileImage[]>('/members/default-images');
