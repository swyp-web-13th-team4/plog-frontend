import { z } from 'zod';

import { type PhotoPreview } from '@/features/photo-upload';

const environmentScoreSchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
]);

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
  environmentValues: environmentValuesSchema,
  contents: z
    .string()
    .trim()
    .min(1, '후기를 입력해 주세요.')
    .max(300, '후기는 300자 이내로 입력해 주세요.'),
  photos: z
    .array(z.custom<PhotoPreview>())
    .min(1, '이미지를 1장 이상 등록해 주세요.'),
});
