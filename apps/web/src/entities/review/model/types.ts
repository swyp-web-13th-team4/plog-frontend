import {
  type ReviewEnvironmentName,
  type ReviewEnvironmentScore,
} from './environment';

export type CreateReviewRequest = {
  rating: number;
  environments: Record<ReviewEnvironmentName, ReviewEnvironmentScore>;
  content?: string;
};

export type UpdateReviewRequest = CreateReviewRequest & {
  keepImageIds: number[];
};

export type ReviewSortType = 'LATEST' | 'OLDEST' | 'RATING_HIGH' | 'RATING_LOW';

export type GetPlaceReviewsRequest = {
  placeId: number;
  cursor?: string;
  limit: number;
  imageOnly: boolean;
  sortType: ReviewSortType;
};
