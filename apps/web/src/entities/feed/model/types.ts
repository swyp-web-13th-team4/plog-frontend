import { type PlaceTagValue } from './place-tag';

export type PostScope = 'PUBLIC' | 'PRIVATE';

export type FeedProfileBadge = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  isAcquired: boolean;
};

export type FeedProfileMemberInfo = {
  id?: number;
  nickname: string;
  profileImageUrl?: string;
  introduction: string | null;
  mainBadge: FeedProfileBadge | null;
};

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
  memberKey?: string;
  category?: string;
  address?: string;
  isPublic?: boolean;
  isAuthor?: boolean;
};

export type FeedPage = {
  items: FeedPost[];
  lastPostId: number | null;
  createAt: string | null;
};

export type FeedProfileView = {
  memberInfo: FeedProfileMemberInfo;
};

export type FeedProfilePosts = {
  posts: FeedPost[];
};

export type PostSortType = 'latest' | 'focus' | 'studyTime';
export type BookmarkSortType = 'latest' | 'likes';
