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
};

export type FeedPage = {
  items: FeedPost[];
  nextPage: number | undefined;
};
