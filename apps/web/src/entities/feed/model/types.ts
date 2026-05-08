import { type PlaceTagValue } from './place-tag';

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
  placeCategory?: string;
  isPublic?: boolean;
};

export type FeedPage = {
  items: FeedPost[];
  nextPage: number | undefined;
};

export type PostSortType = 'latest' | 'focus' | 'studyTime';
export type BookmarkSortType = 'latest' | 'likes';
