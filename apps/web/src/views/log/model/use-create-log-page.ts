'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  type FieldErrors,
  type FieldPath,
  type FieldPathValue,
  useForm,
  useWatch,
} from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { useToast } from '@plog/ui';

import { initialCreateLogValues } from '@/features/create-log';

import { dialog } from '@/shared/lib/dialog';

import { MAX_PHOTO_FILE_SIZE } from './image-policy';
import { createLogFormSnapshot, editFormValues } from './mapper';
import { createLogResolver } from './resolver';
import { type CreateLogFormValues } from './types';
import { useCreateLogMutation } from './use-create-log-mutation';
import { useEditLogQuery } from './use-edit-log-query';
import {
  getInvalidSubmitFeedback,
  useCreateLogInvalidFocus,
} from './use-invalid-form-focus';
import { usePhotoUpload } from './use-photo-upload';
import { useUpdateLogMutation } from './use-update-log-mutation';

export type LogFormController = ReturnType<typeof useCreateLogPage>;

export function useCreateLogPage(editPostId?: string) {
  const router = useRouter();
  const numericEditPostId = editPostId ? Number(editPostId) : null;
  const normalizedEditPostId =
    numericEditPostId !== null &&
    Number.isInteger(numericEditPostId) &&
    numericEditPostId > 0
      ? numericEditPostId
      : null;
  const isEditMode = normalizedEditPostId !== null;
  const hasInvalidEditPostId = editPostId !== undefined && !isEditMode;

  const [isPlaceSearchOpen, setIsPlaceSearchOpen] = useState(false);

  const invalidFocus = useCreateLogInvalidFocus();

  const { toast } = useToast();
  const hasRestoredFormRef = useRef(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    trigger,
    control,
    formState: { errors, isSubmitted },
  } = useForm<CreateLogFormValues>({
    resolver: createLogResolver,
    defaultValues: {
      ...initialCreateLogValues,
      photos: [],
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const createLogMutation = useCreateLogMutation({
    onSuccess: () => {
      clearPhotos();
    },
  });

  const updateLogMutation = useUpdateLogMutation({
    postId: normalizedEditPostId,
    onSuccess: () => {
      clearPhotos();
    },
  });
  const editLogQuery = useEditLogQuery(normalizedEditPostId);
  const initialEditSnapshot = useMemo(() => {
    if (!editLogQuery.data) return null;

    return createLogFormSnapshot(editFormValues(editLogQuery.data));
  }, [editLogQuery.data]);

  const titleField = register('title');
  const contentsField = register('contents');

  const title = useWatch({ control, name: 'title' });
  const contents = useWatch({ control, name: 'contents' });
  const place = useWatch({ control, name: 'place' });
  const placeCategory = useWatch({ control, name: 'categoryCode' });
  const workDate = useWatch({ control, name: 'studyDate' });
  const startTime = useWatch({ control, name: 'startedAt' });
  const endTime = useWatch({ control, name: 'endedAt' });
  const focusScore = useWatch({ control, name: 'focus' });
  const reviewTags = useWatch({ control, name: 'placeTags' });
  const scope = useWatch({ control, name: 'scope' });
  const photos = useWatch({ control, name: 'photos' });
  const isPublic = scope === 'PUBLIC';

  const setFormValue = <TFieldName extends FieldPath<CreateLogFormValues>>(
    fieldName: TFieldName,
    value: FieldPathValue<CreateLogFormValues, TFieldName>,
  ) => {
    setValue(fieldName, value, {
      shouldValidate: true,
    });
  };

  const setPhotos = useCallback(
    (nextPhotos: CreateLogFormValues['photos']) => {
      setValue('photos', nextPhotos, {
        shouldValidate: isSubmitted,
      });
    },
    [isSubmitted, setValue],
  );

  const { handleAddPhotos, handleRemovePhoto, clearPhotos } = usePhotoUpload({
    photos,
    onPhotosChange: setPhotos,
  });

  useEffect(() => {
    if (!isEditMode || !editLogQuery.data || hasRestoredFormRef.current) return;

    hasRestoredFormRef.current = true;
    reset(editFormValues(editLogQuery.data));
  }, [editLogQuery.data, isEditMode, reset]);

  const handleClearPlaceName = () => {
    setFormValue('place', null);
  };

  const handleOpenPlaceSearch = () => {
    setIsPlaceSearchOpen(true);
  };

  const handleClosePlaceSearch = () => {
    setIsPlaceSearchOpen(false);
  };

  const handleSelectPlaceFromSearch = async (
    place: CreateLogFormValues['place'],
  ) => {
    setFormValue('place', place);
    setIsPlaceSearchOpen(false);
  };

  const handleInvalidSubmit = (
    fieldErrors: FieldErrors<CreateLogFormValues>,
  ) => {
    const feedback = getInvalidSubmitFeedback(fieldErrors, getValues());
    if (!feedback) return;

    invalidFocus.focusField(feedback.field);
    if (feedback.message) {
      toast({
        type: 'error',
        description: feedback.message,
      });
    }
  };

  const handleValidSubmit = async (values: CreateLogFormValues) => {
    if (!isEditMode) {
      createLogMutation.mutate(values);
      return;
    }

    const currentSnapshot = createLogFormSnapshot(values);
    if (currentSnapshot === initialEditSnapshot) {
      toast({
        type: 'default',
        description: '변경된 내용이 없어요.',
      });
      return;
    }

    const confirmed = await dialog.confirm({
      message: '기록을 수정하시겠어요?',
      description: '변경한 내용으로 기록이 저장돼요.',
      confirmLabel: '수정하기',
      cancelLabel: '취소',
    });

    if (confirmed) updateLogMutation.mutate(values);
  };

  const handleEditLogBack = async () => {
    if (normalizedEditPostId === null) return;

    const detailPath = `/feed/${normalizedEditPostId}`;

    if (!initialEditSnapshot) {
      router.push(detailPath);
      return;
    }

    const hasUnsavedChanges =
      createLogFormSnapshot(getValues()) !== initialEditSnapshot;

    if (!hasUnsavedChanges) {
      router.push(detailPath);
      return;
    }

    const confirmed = await dialog.confirm({
      message: '수정을 취소하시겠어요?',
      description: '취소 시 수정 중인 내용은 저장되지 않습니다.',
      confirmLabel: '수정 취소',
      cancelLabel: '계속 수정하기',
    });

    if (!confirmed) return;

    clearPhotos();
    router.push(detailPath);
  };

  const handleBack = async () => {
    if (isEditMode && normalizedEditPostId !== null && !hasInvalidEditPostId) {
      await handleEditLogBack();
      return;
    }

    const values = getValues();
    const hasCreateLogData =
      values.title.trim().length > 0 ||
      values.contents.trim().length > 0 ||
      values.place !== null ||
      values.categoryCode !== null ||
      values.studyDate !== null ||
      values.startedAt !== null ||
      values.endedAt !== null ||
      values.focus !== null ||
      values.placeTags.length > 0 ||
      values.photos.length > 0;

    if (!hasCreateLogData) {
      router.push('/map');
      return;
    }

    const confirmed = await dialog.confirm({
      message: '작성을 중단하시겠어요?',
      description: '작성 중인 기록은 저장되지 않고 사라져요.',
      confirmLabel: '확인',
      cancelLabel: '취소',
    });

    if (!confirmed) return;

    clearPhotos();
    router.push('/map');
  };

  const handlePhotoFileSizeExceeded = () => {
    toast({
      type: 'error',
      description: `${MAX_PHOTO_FILE_SIZE / (1024 * 1024)}MB 이하의 이미지 파일만 등록 가능해요.`,
    });
  };

  const handlePhotoConversionFailed = () => {
    toast({
      type: 'error',
      description: '사진 업로드에 실패했어요. 다시 시도해 주세요.',
    });
  };

  const handleSubmitLog = handleSubmit(handleValidSubmit, handleInvalidSubmit);
  const isSubmitting = isEditMode
    ? updateLogMutation.isPending
    : createLogMutation.isPending;

  return {
    contents,
    contentsField,
    editLogQuery,
    endTime,
    errors,
    focusScore,
    handleAddPhotos,
    handleBack,
    handleClearPlaceName,
    handleClosePlaceSearch,
    handleInvalidEditBack: router.back,
    handleOpenPlaceSearch,
    handlePhotoConversionFailed,
    handlePhotoFileSizeExceeded,
    handleRemovePhoto,
    handleSelectPlaceFromSearch,
    handleSubmitLog,
    hasInvalidEditPostId,
    isEditMode,
    isPlaceSearchOpen,
    isPublic,
    isSubmitting,
    photos,
    place,
    placeCategory,
    reviewTags,
    setFormValue,
    startTime,
    title,
    titleField,
    trigger,
    workDate,
    focusTargets: invalidFocus.focusTargets,
  };
}
