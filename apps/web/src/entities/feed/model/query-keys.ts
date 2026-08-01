import { type PostSortType } from './types';

export function toPostId(postId: number | string | null) {
  return postId === null ? null : Number(postId);
}

export function toMemberKey(memberKey: string) {
  return memberKey.trim();
}

export const feedQueryKeys = {
  all: ['feed'] as const,
  detail: (postId: number | string | null) =>
    ['feed', 'detail', toPostId(postId)] as const,

  edit: (postId: number | null) => ['feed', 'edit', postId] as const,
  profileViewAll: () => ['feed', 'profileView'] as const,
  profileView: (memberKey: string) =>
    ['feed', 'profileView', toMemberKey(memberKey)] as const,
  profileViewPosts: (memberKey: string, sort: PostSortType) =>
    ['feed', 'profileView', toMemberKey(memberKey), 'posts', sort] as const,
};
