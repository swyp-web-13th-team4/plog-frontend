import { type PlaceTagValue } from './place-tag';

export type Time = {
  hour: number;
  minute: number;
};

export type PostScope = 'PUBLIC' | 'PRIVATE';

export type FeedPost = {
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
  studyDate?: string;
  memberKey?: string;
  category?: string;
  address?: string;
  isPublic?: boolean;
  isAuthor?: boolean;
  scope?: PostScope;
  startedAt?: Time;
  endedAt?: Time;
};

export type FeedPage = {
  items: FeedPost[];
  lastPostId: number | null;
  createAt: string | null;
};

export type FeedProfilePosts = {
  posts: FeedPost[];
};

export type PostSortType = 'latest' | 'focus' | 'studyTime';
export type BookmarkSortType = 'latest' | 'likes';
