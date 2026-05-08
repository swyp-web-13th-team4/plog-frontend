import { z } from 'zod';

import { MAX_PHOTO_COUNT, type PhotoPreview } from './use-photo-upload';

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const timeSchema = z.object({
  hour: z.number().int().min(0).max(23),
  minute: z.number().int().min(0).max(59),
});

const dateSchema = z.object({
  year: z.number().int(),
  month: z.number().int().min(1).max(12),
  date: z.number().int().min(1).max(31),
});

const placeSchema = z.object({
  id: z.string().min(1),
  name: z.string().trim().min(1, '작업 장소를 선택해 주세요.'),
  address: z.string().trim().min(1, '장소 주소를 확인해 주세요.'),
  latitude: z.number(),
  longitude: z.number(),
});

const placeCategorySchema = z.enum([
  'cafe',
  'study-cafe',
  'library',
  'office',
  'shared-office',
  'etc',
]);

function getMinutes(value: { hour: number; minute: number }) {
  return value.hour * 60 + value.minute;
}

export const createLogSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, '필수 입력 항목이에요.')
      .max(20, '제목은 20자 이내로 입력해 주세요.'),
    contents: z
      .string()
      .trim()
      .min(1, '환경 기록을 입력해 주세요.')
      .max(300, '환경 기록은 300자 이내로 입력해 주세요.'),
    photos: z
      .array(z.custom<PhotoPreview>())
      .min(1, '사진을 최소 1장 이상 등록해 주세요.')
      .max(
        MAX_PHOTO_COUNT,
        `사진은 최대 ${MAX_PHOTO_COUNT}장까지 등록할 수 있어요.`,
      )
      .refine(
        (file) => {
          if (file instanceof File) {
            file.size <= MAX_FILE_SIZE;
          }
        },
        { error: '10MB 이하의 이미지 파일만 등록 가능해요.' },
      ),
    place: placeSchema.nullable().refine((value) => value !== null, {
      message: '작업 장소를 선택해 주세요.',
    }),
    categoryCode: placeCategorySchema
      .nullable()
      .refine((value) => value !== null, {
        message: '장소 카테고리를 선택해 주세요.',
      }),
    studyDate: dateSchema.nullable().refine((value) => value !== null, {
      message: '작업 날짜를 선택해 주세요.',
    }),
    startedAt: timeSchema.nullable().refine((value) => value !== null, {
      message: '시작 시간을 선택해 주세요.',
    }),
    endedAt: timeSchema.nullable().refine((value) => value !== null, {
      message: '종료 시간을 선택해 주세요.',
    }),
    focus: z
      .number()
      .int()
      .min(1)
      .max(5)
      .nullable()
      .refine((value) => value !== null, {
        message: '집중도를 선택해 주세요.',
      }),
    placeTags: z
      .array(z.string())
      .min(1, '후기 요약 태그를 1개 이상 선택해 주세요.'),
    isPublic: z.boolean(),
  })
  .superRefine(({ startedAt, endedAt }, ctx) => {
    if (!startedAt || !endedAt) return;

    if (getMinutes(endedAt) <= getMinutes(startedAt)) {
      ctx.addIssue({
        code: 'custom',
        path: ['endedAt'],
        message: '종료 시간은 시작 시간보다 늦어야 해요.',
      });
    }
  });
