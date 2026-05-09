import { clientApi } from '@/shared/api/client-api';

export function postToggleBookmark(postId: number) {
  return clientApi.post<{ isBookmarked: boolean }>(`/feed/bookmark/${postId}`);
}
