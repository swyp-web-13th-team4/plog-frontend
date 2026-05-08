import { type PostCreateRequest } from '@/entities/feed';

import { type CreateLogFormValues } from './types';

function padDatePart(value: number) {
  return String(value).padStart(2, '0');
}

function formatStudyDate({
  year,
  month,
  date,
}: NonNullable<CreateLogFormValues['studyDate']>) {
  return `${year}-${padDatePart(month)}-${padDatePart(date)}`;
}

export function mapCreateLogForm(
  values: CreateLogFormValues,
): PostCreateRequest {
  if (
    !values.place ||
    !values.categoryCode ||
    !values.studyDate ||
    !values.startedAt ||
    !values.endedAt ||
    !values.focus
  ) {
    throw new Error('게시글 생성에 필요한 필수 값이 비어 있습니다.');
  }

  return {
    title: values.title.trim(),
    contents: values.contents.trim(),
    startedAt: values.startedAt,
    endedAt: values.endedAt,
    studyDate: formatStudyDate(values.studyDate),
    focus: values.focus,
    scope: values.scope,
    place: {
      name: values.place.name,
      address: values.place.address,
      latitude: values.place.latitude,
      longitude: values.place.longitude,
    },
    placeTags: values.placeTags,
    categoryCode: values.categoryCode,
  };
}
