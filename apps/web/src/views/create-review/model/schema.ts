import { z } from 'zod';

import { type PhotoPreview } from '@/features/photo-upload';

import { type ReviewRatingScore } from './types';

const environmentScoreSchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
]);

const ratingScoreSchema = environmentScoreSchema
  .nullable()
  .refine((v): v is ReviewRatingScore => v !== null, {
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
  contents: z.string().trim(),
  photos: z.array(z.custom<PhotoPreview>()),
});
