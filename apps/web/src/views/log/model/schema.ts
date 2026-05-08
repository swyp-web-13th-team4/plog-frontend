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

const scopeSchema = z.enum(['PUBLIC', 'PRIVATE']);

const titleSchema = z
  .string()
  .trim()
  .superRefine((value, ctx) => {
    if (value.length === 0) {
      ctx.addIssue({
        code: 'custom',
        message: '필수 입력 항목이에요.',
      });
      return;
    }

    if (!/^[가-힣A-Za-z0-9]+$/.test(value)) {
      ctx.addIssue({
        code: 'custom',
        message: '한글, 영문, 숫자만 입력 가능해요.',
      });
      return;
    }

    if (value.length < 2) {
      ctx.addIssue({
        code: 'custom',
        message: '최소 2자 이상 입력해 주세요.',
      });
      return;
    }

    if (value.length > 20) {
      ctx.addIssue({
        code: 'custom',
        message: '제목은 20자 이내로 입력해 주세요.',
      });
    }
  });

const contentsSchema = z
  .string()
  .trim()
  .superRefine((value, ctx) => {
    if (value.length === 0) {
      ctx.addIssue({
        code: 'custom',
        message: '필수 입력 항목이에요.',
      });
      return;
    }

    if (value.length < 20) {
      ctx.addIssue({
        code: 'custom',
        message: '최소 20자 이상 입력해 주세요.',
      });
      return;
    }

    if (value.length > 300) {
      ctx.addIssue({
        code: 'custom',
        message: '환경 기록은 300자 이내로 입력해 주세요.',
      });
    }
  });

function getMinutes(value: { hour: number; minute: number }) {
  return value.hour * 60 + value.minute;
}

export const createLogSchema = z
  .object({
    title: titleSchema,
    contents: contentsSchema,
    photos: z
      .array(z.custom<PhotoPreview>())
      .min(1, '사진을 1장 이상 등록해 주세요.')
      .max(
        MAX_PHOTO_COUNT,
        `사진은 최대 ${MAX_PHOTO_COUNT}장까지 등록할 수 있어요.`,
      )
      .refine(
        (photos) => photos.every(({ file }) => file.size <= MAX_FILE_SIZE),
        { message: '10MB 이하의 이미지 파일만 등록 가능해요.' },
      ),
    place: placeSchema.nullable().refine((value) => value !== null, {
      message: '작업 장소를 입력해 주세요.',
    }),
    categoryCode: placeCategorySchema
      .nullable()
      .refine((value) => value !== null, {
        message: '장소 카테고리를 선택해 주세요.',
      }),
    studyDate: dateSchema.nullable().refine((value) => value !== null, {
      message: '작업 날짜를 선택해 주세요.',
    }),
    startedAt: timeSchema.nullable(),
    endedAt: timeSchema.nullable(),
    focus: z
      .number()
      .int()
      .min(1)
      .max(5)
      .nullable()
      .refine((value) => value !== null, {
        message: '오늘의 집중도를 선택해 주세요.',
      }),
    placeTags: z
      .array(z.string())
      .min(1, '최소 1개 이상의 태그를 선택해 주세요.'),
    scope: scopeSchema,
  })
  .superRefine(({ startedAt, endedAt }, ctx) => {
    if (!startedAt && !endedAt) {
      ctx.addIssue({
        code: 'custom',
        path: ['startedAt'],
        message: '작업 시간을 입력해 주세요.',
      });
      return;
    }

    if (!startedAt || !endedAt) {
      ctx.addIssue({
        code: 'custom',
        path: startedAt ? ['endedAt'] : ['startedAt'],
        message: '시작 시간과 종료 시간을 모두 입력해 주세요.',
      });
      return;
    }

    if (getMinutes(endedAt) <= getMinutes(startedAt)) {
      ctx.addIssue({
        code: 'custom',
        path: ['endedAt'],
        message: '시작 시간보다 빠른 시간은 선택할 수 없어요.',
      });
    }
  });
