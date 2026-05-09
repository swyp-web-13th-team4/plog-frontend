import { type PlaceTagValue } from './place-tag';

export type PostTime = {
  hour: number;
  minute: number;
};

export type PostScope = 'PUBLIC' | 'PRIVATE';

export type PostPlace = {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
};

export type PostCreateRequest = {
  title: string;
  contents: string;
  startedAt: PostTime;
  endedAt: PostTime;
  studyDate: string;
  focus: number;
  scope: PostScope;
  place: PostPlace;
  placeTags: PlaceTagValue[];
  categoryCode: string;
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
  placeCategory?: string;
  isPublic?: boolean;
};

export type FeedListResponse = {
  feedFindResponses: FeedPost[];
  lastPostId: number | null;
  createAt: string | null;
};

export type FeedPage = {
  items: FeedPost[];
  lastPostId: number | null;
  createAt: string | null;
};

export type PostSortType = 'latest' | 'focus' | 'studyTime';
export type BookmarkSortType = 'latest' | 'likes';
