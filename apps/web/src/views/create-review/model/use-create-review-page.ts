'use client';

import { useCallback, useState } from 'react';
import {
  type FieldErrors,
  type FieldPath,
  type FieldPathValue,
  useForm,
  useWatch,
} from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { type DateValue, type TimeValue, useToast } from '@plog/ui';

import {
  type PhotoPreview,
  usePhotoUpload,
  usePhotoUploadFeedback,
} from '@/features/photo-upload';

import { useFeedDetailQuery } from '@/entities/feed';
import {
  type ReviewEnvironmentName,
  type ReviewEnvironmentScore,
} from '@/entities/review';

import { parseStudyDate } from '@/shared/lib/study-date';

import { reviewResolver } from './resolver';
import { type ReviewFormValues, type ReviewRatingScore } from './types';
import { useCreateReviewMutation } from './use-create-review-mutation';
import {
  getInvalidSubmitFeedback,
  useReviewInvalidFocus,
} from './use-invalid-form-focus';

const initialReviewValues: ReviewFormValues = {
  rating: null,
  environmentValues: {
    spaceSize: null,
    noiseLevel: null,
    congestionLevel: null,
    focusLevel: null,
  },
  contents: '',
  photos: [],
};

export function useCreateReviewPage({ postId }: { postId: string }) {
  const router = useRouter();
  const { toast } = useToast();
  const {
    handlePhotoConversionFailed,
    handlePhotoFileSizeExceeded,
    handlePhotoMaxCountExceeded,
  } = usePhotoUploadFeedback();

  const invalidFocus = useReviewInvalidFocus();

  const numericPostId = Number(postId);
  const reviewPostQuery = useFeedDetailQuery(numericPostId);
  const post = reviewPostQuery.data;
  const createReviewMutation = useCreateReviewMutation({
    postId: numericPostId,
  });

  const [visitDate, setVisitDate] = useState<DateValue | null>(null);
  const [startTime, setStartTime] = useState<TimeValue | null>(null);
  const [endTime, setEndTime] = useState<TimeValue | null>(null);
  const [leaveConfirmOpen, setLeaveConfirmOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitted },
  } = useForm<ReviewFormValues>({
    resolver: reviewResolver,
    defaultValues: initialReviewValues,
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const [rating, environmentValues, reviewText, photos] = useWatch({
    control,
    name: ['rating', 'environmentValues', 'contents', 'photos'],
  });

  const contentsField = register('contents');

  const setFormValue = <TFieldName extends FieldPath<ReviewFormValues>>(
    fieldName: TFieldName,
    value: FieldPathValue<ReviewFormValues, TFieldName>,
  ) => {
    setValue(fieldName, value, {
      shouldValidate: true,
    });
  };

  const handlePhotosChange = useCallback(
    (nextPhotos: PhotoPreview[]) => {
      setValue('photos', nextPhotos, {
        shouldValidate: isSubmitted,
      });
    },
    [isSubmitted, setValue],
  );

  const { handleAddPhotos, handleRemovePhoto } = usePhotoUpload({
    photos,
    onPhotosChange: handlePhotosChange,
  });

  const handleBack = () => {
    setLeaveConfirmOpen(true);
  };

  const handleCancelLeave = () => {
    setLeaveConfirmOpen(false);
  };

  const handleConfirmLeave = () => {
    router.push('/feed');
  };

  const handleEnvironmentChange = (
    name: ReviewEnvironmentName,
    value: ReviewEnvironmentScore | null,
  ) => {
    setFormValue('environmentValues', {
      ...environmentValues,
      [name]: value,
    });
  };

  const handleRatingChange = (value: number) => {
    setFormValue('rating', value as ReviewRatingScore);
  };

  const handleInvalidSubmit = (fieldErrors: FieldErrors<ReviewFormValues>) => {
    const feedback = getInvalidSubmitFeedback(fieldErrors);
    if (!feedback) return;

    invalidFocus.focusField(feedback.field);
    if (feedback.toastMessage) {
      toast({
        type: 'error',
        description: feedback.toastMessage,
      });
    }
  };

  const handleValidSubmit = (values: ReviewFormValues) => {
    createReviewMutation.mutate(values);
  };

  const handleSubmitReview = handleSubmit(
    handleValidSubmit,
    handleInvalidSubmit,
  );

  return {
    contentsField,
    endTime: endTime ?? post?.endedAt ?? null,
    environmentValues,
    errors,
    focusTargets: invalidFocus.focusTargets,
    handleAddPhotos,
    handleBack,
    handleCancelLeave,
    handleConfirmLeave,
    handleEnvironmentChange,
    handlePhotoConversionFailed,
    handlePhotoFileSizeExceeded,
    handlePhotoMaxCountExceeded,
    handleRemovePhoto,
    handleSubmitReview,
    isSubmittingReview: createReviewMutation.isPending,
    leaveConfirmOpen,
    photos,
    placeImageSrc: post?.postImages?.[0] ?? null,
    placeName: post?.placeName ?? '방문한 장소',
    postId,
    rating,
    reviewPostQuery,
    reviewText,
    setEndTime,
    setRating: handleRatingChange,
    setStartTime,
    setVisitDate,
    startTime: startTime ?? post?.startedAt ?? null,
    visitDate:
      visitDate ?? (post?.studyDate ? parseStudyDate(post.studyDate) : null),
  };
}

export type ReviewFormController = ReturnType<typeof useCreateReviewPage>;
