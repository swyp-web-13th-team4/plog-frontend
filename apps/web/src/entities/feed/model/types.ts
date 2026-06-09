import { TimeValue } from '@plog/ui';

import { type PlaceTagValue } from './place-tag';

export type PostScope = 'PUBLIC' | 'PRIVATE';
export type PostSortType = 'latest' | 'focus' | 'studyTime';
export type BookmarkSortType = 'latest' | 'likes';

export type FeedTypeBase = {
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

export type FeedTypeInFeedList = FeedTypeBase & {
  memberKey: string;
  isAuthor: boolean;
};

export type FeedTypeInDetail = FeedTypeBase & {
  memberKey: string;
  isAuthor: boolean;
  startedAt: TimeValue;
  endedAt: TimeValue;
  studyDate: string;
  category: string;
  address: string;
  scope: PostScope;
};

export type FeedTypeInUserPostList = FeedTypeBase & {
  placeCategory: string;
  isPublic: boolean;
};

export type FeedPage = {
  items: FeedTypeInFeedList[];
  lastPostId: number | null;
  createAt: string | null;
};

export type FeedProfilePosts = {
  posts: FeedTypeInUserPostList[];
};
