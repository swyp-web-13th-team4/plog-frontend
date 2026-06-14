import { type TimeValue } from '@plog/ui';

import { type PlaceTagValue } from './place-tag';
import { type PostScope, type ProfilePostsResponse } from './schemas';

export type { PostScope } from './schemas';
export type PostSortType = 'latest' | 'focus' | 'studyTime';
export type BookmarkSortType = 'latest' | 'likes';

export type FeedItem = {
  postId: number;
  name: string;
  profileImage: string;
  createAt: string;
  postImages: string[];
  likes: number;
  title: string;
  contents: string;
  placeName: string;
  studyTime: number;
  focus: number;
  tags: PlaceTagValue[];
  like: boolean;
  bookMark: boolean;
};

export type FeedItemList = FeedItem & {
  memberKey: string;
  isAuthor: boolean;
};

export type FeedItemDetail = FeedItem & {
  memberKey: string;
  isAuthor: boolean;
  startedAt: TimeValue;
  endedAt: TimeValue;
  studyDate: string;
  category: string;
  address: string;
  scope: PostScope;
};

export type FeedItemProfileView = FeedItem & {
  placeCategory: string;
  isPublic: boolean;
};

export type FeedMain = {
  items: FeedItemList[];
  lastPostId: number | null;
  createAt: string | null;
};

export type FeedProfilePosts = ProfilePostsResponse;
