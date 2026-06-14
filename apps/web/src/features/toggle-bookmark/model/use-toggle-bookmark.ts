'use client';

import * as amplitude from '@amplitude/unified';
import { useToast } from '@plog/ui';
import {
  type InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import {
  type FeedItemDetail,
  type FeedMain,
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
  prev: InfiniteData<FeedMain> | undefined,
  postId: number,
): InfiniteData<FeedMain> | undefined {
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
  prev: InfiniteData<FeedMain> | undefined,
  postId: number,
  isBookmarked: boolean,
): InfiniteData<FeedMain> | undefined {
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
  disableTracking?: boolean;
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
        queryKey: feedQueryKeys.all,
        exact: true,
      });
      await queryClient.cancelQueries({
        queryKey: feedQueryKeys.detail(postId),
      });
      if (profilePostsQueryKey) {
        await queryClient.cancelQueries({ queryKey: profilePostsQueryKey });
      }

      queryClient.setQueryData<InfiniteData<FeedMain>>(
        feedQueryKeys.all,
        (prev) => toggleBookmarkInFeedCache(prev, postId),
      );

      queryClient.setQueryData<FeedItemDetail>(
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
        queryKey: feedQueryKeys.all,
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
    onSuccess: (data, { postId, disableTracking }, context) => {
      if (!disableTracking) {
        amplitude.track('bookmark_toggled', {
          post_id: postId,
          bookmarked: data.isBookmarked,
        });
      }
      queryClient.setQueryData<InfiniteData<FeedMain>>(
        feedQueryKeys.all,
        (prev) => updateBookmarkInFeedCache(prev, postId, data.isBookmarked),
      );
      queryClient.setQueryData<FeedItemDetail>(
        feedQueryKeys.detail(postId),
        (prev) => (prev ? { ...prev, bookMark: data.isBookmarked } : prev),
      );
      if (context.profilePostsQueryKey) {
        queryClient.setQueryData<FeedProfilePosts>(
          context.profilePostsQueryKey,
          (prev) =>
            updateBookmarkInProfilePostsCache(prev, postId, data.isBookmarked),
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
    disableTracking?: boolean,
  ): Promise<boolean> => {
    if (isBookmarked) {
      const confirmed = await dialog.confirm({
        message: '북마크를 취소하시겠어요?',
        confirmLabel: '취소하기',
        cancelLabel: '닫기',
      });
      if (!confirmed) return false;
    }

    mutation.mutate({ postId, profilePostsTarget, disableTracking });
    return true;
  };

  return { toggleBookmark, isPending: mutation.isPending };
}
