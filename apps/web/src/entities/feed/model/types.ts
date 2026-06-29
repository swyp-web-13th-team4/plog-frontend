import {
  type FeedDetailResponse,
  type FeedListItemResponse,
  type FeedResponse,
  type ProfileFeedItem,
  type ProfilePostsResponse,
} from './schemas';

export type { PostScope } from './schemas';
export type PostSortType = 'latest' | 'focus' | 'studyTime';
export type BookmarkSortType = 'latest' | 'likes';

export type FeedItemBase = Pick<
  FeedListItemResponse,
  | 'postId'
  | 'name'
  | 'profileImage'
  | 'createAt'
  | 'postImages'
  | 'likes'
  | 'title'
  | 'contents'
  | 'placeName'
  | 'studyTime'
  | 'focus'
  | 'tags'
  | 'like'
  | 'bookMark'
>;

export type FeedMainItem = FeedListItemResponse;

export type FeedDetailItem = FeedDetailResponse;

export type FeedProfileItem = ProfileFeedItem;

export type FeedMainPage = {
  items: FeedResponse['feedFindResponses'];
  lastPostId: FeedResponse['lastPostId'];
  createAt: FeedResponse['createdAt'];
};

export type FeedProfilePostsResponse = ProfilePostsResponse;
