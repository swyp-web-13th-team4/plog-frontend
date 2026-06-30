import {
  type ReviewEnvironmentName,
  type ReviewEnvironmentScore,
} from './environment';

export type CreateReviewRequest = {
  rating: number;
  environments: Record<ReviewEnvironmentName, ReviewEnvironmentScore>;
  content?: string;
};

export type ReviewResponse = {
  reviewId: number;
  postId: number;
  placeId: number;
  placeName: string;
  rating: number;
  visitedDate: string;
  visitStartTime: string;
  visitEndTime: string;
  environments: Record<string, number>;
  content?: string;
  imageUrls?: string[];
};
