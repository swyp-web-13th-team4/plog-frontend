import { type z } from 'zod';

import {
  type ReviewEnvironmentName,
  type ReviewEnvironmentScore,
} from '@/entities/review';

import { type reviewSchema } from './schema';

export type ReviewRatingScore = 1 | 2 | 3 | 4 | 5;

export type ReviewEnvironmentValues = Record<
  ReviewEnvironmentName,
  ReviewEnvironmentScore | null
>;

export type ReviewFormValues = z.infer<typeof reviewSchema>;
