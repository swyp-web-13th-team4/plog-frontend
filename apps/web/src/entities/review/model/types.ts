import {
  type ReviewEnvironmentName,
  type ReviewEnvironmentScore,
} from './environment';

export type CreateReviewRequest = {
  rating: number;
  environments: Record<ReviewEnvironmentName, ReviewEnvironmentScore>;
  content?: string;
};
