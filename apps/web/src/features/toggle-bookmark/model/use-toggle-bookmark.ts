'use client';

import { useToast } from '@plog/ui';
import {
  type InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import {
  type FeedPage,
  type FeedPost,
  type FeedProfilePosts,
  feedQueryKeys,
  type PostSortType,
} from '@/entities/feed';
import { mapQueryKeys } from '@/entities/place';
import { mypageQueryKeys } from '@/entities/user';

import { clientApi } from '@/shared/api/client-api';
import { dialog } from '@/shared/lib/dialog';

export function postToggleBookmark(postId: number) {
  return clientApi.post<{ isBookmarked: boolean }>(`/feed/bookmark/${postId}`);
}

function toggleBookmarkInFeedCache(
  prev: InfiniteData<FeedPage> | undefined,
  postId: number,
): InfiniteData<FeedPage> | undefined {
  if (!prev) return prev;
  return {
    ...prev,
    pages: prev.pages.map((page) => ({
      ...page,
      items: page.items.map((post) =>
        post.postId === postId ? { ...post, bookMark: !post.bookMark } : post,
      ),
    })),
  };
}

function updateBookmarkInFeedCache(
  prev: InfiniteData<FeedPage> | undefined,
  postId: number,
  isBookmarked: boolean,
): InfiniteData<FeedPage> | undefined {
  if (!prev) return prev;
  return {
    ...prev,
    pages: prev.pages.map((page) => ({
      ...page,
      items: page.items.map((post) =>
        post.postId === postId ? { ...post, bookMark: isBookmarked } : post,
      ),
    })),
  };
}

function toggleBookmarkInProfilePostsCache(
  prev: FeedProfilePosts | undefined,
  postId: number,
): FeedProfilePosts | undefined {
  if (!prev) return prev;
  return {
    ...prev,
    posts: prev.posts.map((post) =>
      post.postId === postId ? { ...post, bookMark: !post.bookMark } : post,
    ),
  };
}

function updateBookmarkInProfilePostsCache(
  prev: FeedProfilePosts | undefined,
  postId: number,
  isBookmarked: boolean,
): FeedProfilePosts | undefined {
  if (!prev) return prev;
  return {
    ...prev,
    posts: prev.posts.map((post) =>
      post.postId === postId ? { ...post, bookMark: isBookmarked } : post,
    ),
  };
}

export type ProfilePostsBookmarkTarget = {
  memberKey: string;
  sort: PostSortType;
};

type ToggleBookmarkVariables = {
  postId: number;
  profilePostsTarget?: ProfilePostsBookmarkTarget;
};

export function useToggleBookmark() {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: ({ postId }: ToggleBookmarkVariables) =>
      postToggleBookmark(postId),
    onMutate: async ({ postId, profilePostsTarget }) => {
      const profilePostsQueryKey = profilePostsTarget
        ? feedQueryKeys.profileViewPosts(
            profilePostsTarget.memberKey,
            profilePostsTarget.sort,
          )
        : undefined;

      await queryClient.cancelQueries({
        queryKey: feedQueryKeys.list,
        exact: true,
      });
      await queryClient.cancelQueries({
        queryKey: feedQueryKeys.detail(postId),
      });
      if (profilePostsQueryKey) {
        await queryClient.cancelQueries({ queryKey: profilePostsQueryKey });
      }

      queryClient.setQueryData<InfiniteData<FeedPage>>(
        feedQueryKeys.list,
        (prev) => toggleBookmarkInFeedCache(prev, postId),
      );

      queryClient.setQueryData<FeedPost>(
        feedQueryKeys.detail(postId),
        (prev) => (prev ? { ...prev, bookMark: !prev.bookMark } : prev),
      );

      if (profilePostsQueryKey) {
        queryClient.setQueryData<FeedProfilePosts>(
          profilePostsQueryKey,
          (prev) => toggleBookmarkInProfilePostsCache(prev, postId),
        );
      }

      return { profilePostsQueryKey };
    },
    onError: (_err, { postId }, context) => {
      queryClient.invalidateQueries({
        queryKey: feedQueryKeys.list,
        exact: true,
      });
      queryClient.invalidateQueries({ queryKey: feedQueryKeys.detail(postId) });
      if (context?.profilePostsQueryKey) {
        queryClient.invalidateQueries({
          queryKey: context.profilePostsQueryKey,
        });
      }
      toast({
        id: 'bookmark-error',
        type: 'error',
        description: '북마크 처리 중 오류가 발생했어요.',
      });
    },
    onSuccess: (res, { postId }, context) => {
      queryClient.setQueryData<InfiniteData<FeedPage>>(
        feedQueryKeys.list,
        (prev) => updateBookmarkInFeedCache(prev, postId, res.isBookmarked),
      );
      queryClient.setQueryData<FeedPost>(
        feedQueryKeys.detail(postId),
        (prev) => (prev ? { ...prev, bookMark: res.isBookmarked } : prev),
      );
      if (context.profilePostsQueryKey) {
        queryClient.setQueryData<FeedProfilePosts>(
          context.profilePostsQueryKey,
          (prev) =>
            updateBookmarkInProfilePostsCache(prev, postId, res.isBookmarked),
        );
      }
      queryClient.invalidateQueries({ queryKey: mypageQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: mapQueryKeys.count() });
      queryClient.invalidateQueries({
        queryKey: mapQueryKeys.pinsByLayer('bookmark'),
      });
      queryClient.invalidateQueries({
        queryKey: mapQueryKeys.sheetByLayer('bookmark'),
      });
      queryClient.invalidateQueries({ queryKey: mapQueryKeys.pinDetailAll() });
      queryClient.invalidateQueries({ queryKey: mapQueryKeys.placeAll() });
      queryClient.invalidateQueries({
        queryKey: feedQueryKeys.profileViewAll(),
      });
    },
  });

  const toggleBookmark = async (
    postId: number,
    isBookmarked: boolean,
    profilePostsTarget?: ProfilePostsBookmarkTarget,
  ): Promise<boolean> => {
    if (isBookmarked) {
      const confirmed = await dialog.confirm({
        message: '북마크를 취소하시겠어요?',
        confirmLabel: '취소하기',
        cancelLabel: '닫기',
      });
      if (!confirmed) return false;
    }

    mutation.mutate({ postId, profilePostsTarget });
    return true;
  };

  return { toggleBookmark, isPending: mutation.isPending };
}
