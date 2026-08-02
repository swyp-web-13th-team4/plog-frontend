import { z } from 'zod';

import { type PhotoPreview } from '@/features/photo-upload';

import { REVIEW_ENVIRONMENT_SCORES } from '@/entities/review';

const environmentScoreSchema = z.literal(REVIEW_ENVIRONMENT_SCORES);

const ratingScoreSchema = environmentScoreSchema
  .nullable()
  .refine((value): boolean => value !== null, {
    message: '별점을 선택해 주세요',
  });

const environmentValuesSchema = z
  .object({
    spaceSize: environmentScoreSchema.nullable(),
    noiseLevel: environmentScoreSchema.nullable(),
    congestionLevel: environmentScoreSchema.nullable(),
    focusLevel: environmentScoreSchema.nullable(),
  })
  .refine((values) => Object.values(values).every((value) => value !== null), {
    message: '모든 항목을 선택해 주세요.',
  });

export const reviewSchema = z.object({
  rating: ratingScoreSchema,
  environmentValues: environmentValuesSchema,
  contents: z
    .string()
    .trim()
    .max(300, { message: '리뷰는 300자 이하로 작성해 주세요.' }),
  photos: z.array(z.custom<PhotoPreview>()),
});
