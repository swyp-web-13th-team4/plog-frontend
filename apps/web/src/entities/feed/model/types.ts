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

export type FeedItem = Pick<
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

export type FeedItemList = FeedListItemResponse;

export type FeedItemDetail = FeedDetailResponse;

export type FeedItemProfileView = ProfileFeedItem;

export type FeedMain = {
  items: FeedResponse['feedFindResponses'];
  lastPostId: FeedResponse['lastPostId'];
  createAt: FeedResponse['createdAt'];
};

export type FeedProfilePosts = ProfilePostsResponse;
