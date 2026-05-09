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

export type PostEditPost = Omit<PostCreateRequest, 'place'> & {
  studyTime: number;
  placeName: string;
  placeAddress: string;
  latitude: number;
  longitude: number;
};

export type PostEditImage = {
  id: number;
  url: string;
};

export type PostEditImages = {
  images: PostEditImage[];
  total: number;
};

export type PostEditResponse = {
  post: PostEditPost;
  images: PostEditImages;
};

export type PostUpdateRequest = PostCreateRequest & {
  images: number[];
};

export type PostUpdateResponse = PostEditResponse;

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
};

export type FeedDetailResponse = FeedPost & {
  isAuthor: boolean;
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
