import { type PlaceTagValue } from './place-tag';
import { type PostScope, type ProfileFeedItem } from './schemas';

export type { PostScope } from './schemas';

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
  scope?: PostScope;
};

export type FeedPage = {
  items: FeedPost[];
  lastPostId: number | null;
  createAt: string | null;
};

export type FeedProfilePosts = {
  posts: ProfileFeedItem[];
};

export type PostSortType = 'latest' | 'focus' | 'studyTime';
export type BookmarkSortType = 'latest' | 'likes';
