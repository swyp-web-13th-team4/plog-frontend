'use client';

import { type FormEvent, useCallback, useState } from 'react';

import { useRouter } from 'next/navigation';

import { type DateValue, type TimeValue } from '@plog/ui';

import {
  type PhotoPreview,
  usePhotoUpload,
  usePhotoUploadFeedback,
} from '@/features/photo-upload';

import {
  DEFAULT_REVIEW_PLACE_NAME,
  REVIEW_PLACE_IMAGE_SRC,
  type ReviewEnvironmentName,
  type ReviewEnvironmentScore,
} from './types';

export type ReviewEnvironmentValues = Record<
  ReviewEnvironmentName,
  ReviewEnvironmentScore | null
>;

type UseReviewPageOptions = {
  postId: string;
};

export function useReviewPage({ postId }: UseReviewPageOptions) {
  const router = useRouter();
  const { handlePhotoConversionFailed, handlePhotoFileSizeExceeded } =
    usePhotoUploadFeedback();

  const numericPostId = Number(postId);
  const isValidPostId = Number.isInteger(numericPostId) && numericPostId > 0;

  const [rating, setRating] = useState(0);
  const [visitDate, setVisitDate] = useState<DateValue | null>(null);
  const [startTime, setStartTime] = useState<TimeValue | null>(null);
  const [endTime, setEndTime] = useState<TimeValue | null>(null);
  const [reviewText, setReviewText] = useState('');
  const [photos, setPhotos] = useState<PhotoPreview[]>([]);
  const [environmentValues, setEnvironmentValues] =
    useState<ReviewEnvironmentValues>({
      spaceSize: null,
      noiseLevel: null,
      congestionLevel: null,
      focusLevel: null,
    });

  const handlePhotosChange = useCallback((nextPhotos: PhotoPreview[]) => {
    setPhotos(nextPhotos);
  }, []);

  const { handleAddPhotos, handleRemovePhoto } = usePhotoUpload({
    photos,
    onPhotosChange: handlePhotosChange,
  });

  const handleBack = () => {
    router.push(isValidPostId ? `/feed/${numericPostId}` : '/feed');
  };

  const handleEnvironmentChange = (
    name: ReviewEnvironmentName,
    value: ReviewEnvironmentScore | null,
  ) => {
    setEnvironmentValues((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmitReview = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return {
    endTime,
    environmentValues,
    handleAddPhotos,
    handleBack,
    handleEnvironmentChange,
    handlePhotoConversionFailed,
    handlePhotoFileSizeExceeded,
    handleRemovePhoto,
    handleSubmitReview,
    photos,
    placeImageSrc: REVIEW_PLACE_IMAGE_SRC,
    placeName: DEFAULT_REVIEW_PLACE_NAME,
    postId,
    rating,
    reviewText,
    setEndTime,
    setRating,
    setReviewText,
    setStartTime,
    setVisitDate,
    startTime,
    visitDate,
  };
}

export type ReviewFormController = ReturnType<typeof useReviewPage>;
