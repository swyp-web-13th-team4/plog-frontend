import { type PostSortType } from './types';

export const feedQueryKeys = {
  list: ['feed'] as const,
  detail: (postId: number) => ['feed', postId] as const,
  edit: (postId: number | null) => ['feed', 'edit', postId] as const,
  profileView: (memberKey: string) =>
    ['feed', 'profileView', memberKey] as const,
  profileViewPosts: (memberKey: string, sort: PostSortType) =>
    ['feed', 'profileView', memberKey, 'posts', sort] as const,
};
