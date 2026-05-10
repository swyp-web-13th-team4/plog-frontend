export const feedQueryKeys = {
  list: ['feed'] as const,
  detail: (postId: number) => ['feed', postId] as const,
  edit: (postId: number | null) => ['feed', 'edit', postId] as const,
  profileView: (memberkey: string) =>
    ['feed', 'profileView', memberkey] as const,
  profileViewPosts: (memberkey: string, sort: string) =>
    ['feed', 'profileView', memberkey, 'posts', sort] as const,
};
