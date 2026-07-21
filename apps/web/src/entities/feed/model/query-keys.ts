import { type PostSortType } from './types';

export const feedQueryKeys = {
  all: ['feed'] as const,
  detail: (postId: number | null) => ['feed', postId] as const,
  edit: (postId: number | null) => ['feed', 'edit', postId] as const,
  profileViewAll: () => ['feed', 'profileView'] as const,
  profileView: (memberKey: string) =>
    ['feed', 'profileView', memberKey] as const,
  profileViewPosts: (memberKey: string, sort: PostSortType) =>
    ['feed', 'profileView', memberKey, 'posts', sort] as const,
};
