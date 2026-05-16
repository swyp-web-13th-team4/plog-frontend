import { type IconName } from '@plog/ui';
import { type z } from 'zod';

import {
  type ReviewEnvironmentName,
  type ReviewEnvironmentScore,
} from '@/entities/review';

import { type reviewSchema } from './schema';

export const REVIEW_PLACE_IMAGE_SRC = '/review-place-preview.png';
export const DEFAULT_REVIEW_PLACE_NAME = '방문 장소';

export type ReviewRatingScore = 1 | 2 | 3 | 4 | 5;

export type ReviewEnvironmentValues = Record<
  ReviewEnvironmentName,
  ReviewEnvironmentScore | null
>;

export type ReviewFormValues = z.infer<typeof reviewSchema>;

export type ReviewEnvironmentGroup = {
  name: ReviewEnvironmentName;
  title: string;
  iconName: IconName;
};

export const REVIEW_ENVIRONMENT_GROUPS: ReviewEnvironmentGroup[] = [
  {
    name: 'spaceSize',
    title: '공간 크기',
    iconName: 'company-filled',
  },
  {
    name: 'noiseLevel',
    title: '소음 수준',
    iconName: 'megaphone-filled',
  },
  {
    name: 'congestionLevel',
    title: '혼잡도',
    iconName: 'smile-filled',
  },
  {
    name: 'focusLevel',
    title: '집중도',
    iconName: 'fire-filled',
  },
] as const;
