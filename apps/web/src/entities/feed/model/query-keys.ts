import { PostSortType } from './types';

export const feedQueryKeys = {
  list: ['feed'] as const,
  detail: (postId: number) => ['feed', postId] as const,
  edit: (postId: number | null) => ['feed', 'edit', postId] as const,
  profileView: (memberkey: string) =>
    ['feed', 'profileView', memberkey] as const,
  profileViewPosts: (memberkey: string, sort: PostSortType) =>
    ['feed', 'profileView', memberkey, 'posts', sort] as const,
};
