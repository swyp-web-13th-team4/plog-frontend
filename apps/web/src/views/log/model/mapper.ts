import {
  type PostCreateRequest,
  type PostEditImage,
  type PostEditResponse,
  type PostUpdateRequest,
} from '@/entities/feed';
import { type PlaceCategoryValue } from '@/entities/place';

import { type CreateLogFormValues } from './types';
import {
  type ExistingPhotoPreview,
  isNewPhotoPreview,
  type PhotoPreview,
} from './use-photo-upload';

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

function parseStudyDate(value: string) {
  const [year = 0, month = 0, date = 0] = value
    .split('-')
    .map((part) => Number(part));

  return { year, month, date };
}

function mapExistingPhoto(image: PostEditImage): ExistingPhotoPreview {
  return {
    type: 'existing',
    id: `existing-${image.id}`,
    imageId: image.id,
    url: image.url,
  };
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

export function mapUpdateLogForm(
  values: CreateLogFormValues,
): PostUpdateRequest {
  return {
    ...mapCreateLogForm(values),
    images: values.photos
      .filter(
        (photo): photo is ExistingPhotoPreview => photo.type === 'existing',
      )
      .map(({ imageId }) => imageId),
  };
}

export function getNewPhotoFiles(values: CreateLogFormValues) {
  return values.photos.filter(isNewPhotoPreview).map(({ file }) => file);
}

export function mapPostEditResponseToFormValues({
  images,
  post,
}: PostEditResponse): CreateLogFormValues {
  return {
    title: post.title,
    contents: post.contents,
    place: {
      id: `edit-${post.latitude}-${post.longitude}-${post.placeName}`,
      name: post.placeName,
      address: post.placeAddress,
      latitude: post.latitude,
      longitude: post.longitude,
    },
    categoryCode: post.categoryCode as PlaceCategoryValue,
    studyDate: parseStudyDate(post.studyDate),
    startedAt: post.startedAt,
    endedAt: post.endedAt,
    focus: post.focus as CreateLogFormValues['focus'],
    placeTags: post.placeTags,
    scope: post.scope,
    photos: images.images.map(mapExistingPhoto),
  };
}

function serializePhoto(photo: PhotoPreview) {
  if (isNewPhotoPreview(photo)) {
    return {
      type: photo.type,
      name: photo.file.name,
      size: photo.file.size,
      lastModified: photo.file.lastModified,
    };
  }

  return {
    type: photo.type,
    imageId: photo.imageId,
  };
}

export function createLogFormSnapshot(values: CreateLogFormValues) {
  return JSON.stringify({
    ...mapCreateLogForm(values),
    placeTags: [...values.placeTags].sort(),
    photos: values.photos.map(serializePhoto),
  });
}
