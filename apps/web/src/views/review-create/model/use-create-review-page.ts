'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  type FieldErrors,
  type FieldPath,
  type FieldPathValue,
  useForm,
  useWatch,
} from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { useToast } from '@plog/ui';

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

import { parseDate } from '@/shared/lib/datetime';

import { editReviewFormValues } from './mapper';
import { reviewResolver } from './resolver';
import { type CreateReviewFormValues, type ReviewRatingScore } from './types';
import { useCreateReviewMutation } from './use-create-review-mutation';
import { useEditReviewQuery } from './use-edit-review-query';
import {
  getInvalidSubmitFeedback,
  useReviewInvalidFocus,
} from './use-invalid-form-focus';
import { useUpdateReviewMutation } from './use-update-review-mutation';

const initialReviewValues: CreateReviewFormValues = {
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

export type UseCreateReviewPageOptions =
  | {
      editReviewId: number;
      postId?: undefined;
    }
  | {
      editReviewId?: undefined;
      postId: number;
    };

export function useCreateReviewPage(options: UseCreateReviewPageOptions) {
  const router = useRouter();
  const { toast } = useToast();
  const {
    handlePhotoConversionFailed,
    handlePhotoFileSizeExceeded,
    handlePhotoMaxCountExceeded,
  } = usePhotoUploadFeedback();

  const invalidFocus = useReviewInvalidFocus();

  const isEditMode = options.editReviewId !== undefined;
  const postId = options.postId ?? null;
  const editReviewId = options.editReviewId ?? null;
  const reviewPostQuery = useFeedDetailQuery(postId);
  const post = reviewPostQuery.data;
  const editReviewQuery = useEditReviewQuery(editReviewId);
  const editReview = editReviewQuery.data?.review;
  const hasRestoredEditFormRef = useRef(false);
  const createReviewMutation = useCreateReviewMutation();
  const updateReviewMutation = useUpdateReviewMutation();

  const [leaveConfirmOpen, setLeaveConfirmOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors, isSubmitted },
  } = useForm<CreateReviewFormValues>({
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

  const setFormValue = <TFieldName extends FieldPath<CreateReviewFormValues>>(
    fieldName: TFieldName,
    value: FieldPathValue<CreateReviewFormValues, TFieldName>,
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

  useEffect(() => {
    if (
      !isEditMode ||
      !editReviewQuery.data ||
      hasRestoredEditFormRef.current
    ) {
      return;
    }

    hasRestoredEditFormRef.current = true;
    reset(editReviewFormValues(editReviewQuery.data));
  }, [editReviewQuery.data, isEditMode, reset]);

  const handleBack = () => {
    setLeaveConfirmOpen(true);
  };

  const handleCancelLeave = () => {
    setLeaveConfirmOpen(false);
  };

  const handleConfirmLeave = () => {
    if (isEditMode) {
      router.back();
      return;
    }

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

  const handleInvalidSubmit = (
    fieldErrors: FieldErrors<CreateReviewFormValues>,
  ) => {
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

  const handleValidSubmit = (values: CreateReviewFormValues) => {
    if (options.editReviewId !== undefined) {
      updateReviewMutation.mutate({
        reviewId: options.editReviewId,
        values,
      });
      return;
    }

    createReviewMutation.mutate({
      postId: options.postId,
      values,
    });
  };

  const handleSubmitReview = handleSubmit(
    handleValidSubmit,
    handleInvalidSubmit,
  );

  return {
    contentsField,
    editReviewQuery,
    endTime: post?.endedAt ?? editReview?.endedAt ?? null,
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
    isEditMode,
    isSubmittingReview: isEditMode
      ? updateReviewMutation.isPending
      : createReviewMutation.isPending,
    leaveConfirmOpen,
    photos,
    placeImageSrc: post?.postImages?.[0] ?? editReview?.placeProfileUrl ?? null,
    placeName: post?.placeName ?? editReview?.placeName ?? '방문한 장소',
    rating,
    reviewPostQuery,
    reviewText,
    setRating: handleRatingChange,
    startTime: post?.startedAt ?? editReview?.startedAt ?? null,
    visitDate: post?.studyDate
      ? parseDate(post.studyDate)
      : editReview?.studyDate
        ? parseDate(editReview.studyDate)
        : null,
  };
}

export type ReviewFormController = ReturnType<typeof useCreateReviewPage>;
