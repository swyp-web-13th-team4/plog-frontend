import { type PlaceCategoryValue } from '@/entities/place';

import {
  type CreateLogFormValues,
  type CreateRequest,
  type EditData,
  type PostImage,
  type UpdateRequest,
} from './types';
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

function existingPhoto(image: PostImage): ExistingPhotoPreview {
  return {
    type: 'existing',
    id: `existing-${image.id}`,
    imageId: image.id,
    url: image.url,
  };
}

function postEditPlace(post: EditData['post']) {
  return {
    id: `edit-${post.place.latitude}-${post.place.longitude}-${post.place.name}`,
    name: post.place.name,
    address: post.place.address,
    latitude: post.place.latitude,
    longitude: post.place.longitude,
  };
}

export function createLogForm(values: CreateLogFormValues): CreateRequest {
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

export function updateLogForm(values: CreateLogFormValues): UpdateRequest {
  return {
    ...createLogForm(values),
    keepImageIds: values.photos
      .filter(
        (photo): photo is ExistingPhotoPreview => photo.type === 'existing',
      )
      .map(({ imageId }) => imageId),
  };
}

export function getNewPhotoFiles(values: CreateLogFormValues) {
  return values.photos.filter(isNewPhotoPreview).map(({ file }) => file);
}

export function editFormValues({
  images,
  post,
}: EditData): CreateLogFormValues {
  const place = postEditPlace(post);

  return {
    title: post.title,
    contents: post.contents,
    place,
    categoryCode: post.categoryCode as PlaceCategoryValue,
    studyDate: parseStudyDate(post.studyDate),
    startedAt: post.startedAt,
    endedAt: post.endedAt,
    focus: post.focus as CreateLogFormValues['focus'],
    placeTags: post.placeTags,
    scope: post.scope,
    photos: images.images.map(existingPhoto),
  };
}

function photoTypes(photo: PhotoPreview) {
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
    title: values.title.trim(),
    contents: values.contents.trim(),
    startedAt: values.startedAt,
    endedAt: values.endedAt,
    studyDate: values.studyDate ? formatStudyDate(values.studyDate) : null,
    focus: values.focus,
    scope: values.scope,
    place: values.place
      ? {
          name: values.place.name,
          address: values.place.address,
          latitude: values.place.latitude,
          longitude: values.place.longitude,
        }
      : null,
    categoryCode: values.categoryCode,
    placeTags: [...values.placeTags].sort(),
    photos: values.photos.map(photoTypes),
  });
}
