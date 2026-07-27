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

import {
  type CreateLogPlace,
  initialCreateLogValues,
} from '@/features/create-log';

import { dialog } from '@/shared/lib/dialog';

import { createLogFormSnapshot, editFormValues } from './mapper';
import { createLogResolver } from './resolver';
import { type CreateLogFormValues } from './types';
import { useCreateLogMutation } from './use-create-log-mutation';
import { useEditLogQuery } from './use-edit-log-query';
import {
  getInvalidSubmitFeedback,
  useCreateLogInvalidFocus,
} from './use-invalid-form-focus';
import { useUpdateLogMutation } from './use-update-log-mutation';

export type LogFormController = ReturnType<typeof useCreateLogPage>;

type ReviewConfirmInfo = {
  imageUrl?: string;
  placeName: string;
};

const MAP_INITIAL_PLACE_KEY = 'map:initial-place';

function readMapInitialPlace(): CreateLogPlace | null {
  if (typeof window === 'undefined') return null;
  try {
    const saved = sessionStorage.getItem(MAP_INITIAL_PLACE_KEY);
    if (!saved) return null;
    const parsed: unknown = JSON.parse(saved);
    if (
      typeof parsed !== 'object' ||
      parsed === null ||
      typeof (parsed as Record<string, unknown>).name !== 'string' ||
      typeof (parsed as Record<string, unknown>).address !== 'string' ||
      typeof (parsed as Record<string, unknown>).latitude !== 'number' ||
      typeof (parsed as Record<string, unknown>).longitude !== 'number'
    ) {
      return null;
    }
    sessionStorage.removeItem(MAP_INITIAL_PLACE_KEY);
    return parsed as CreateLogPlace;
  } catch {
    return null;
  }
}

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
  const [createdPostId, setCreatedPostId] = useState<number | null>(null);
  const [isReviewConfirmOpen, setIsReviewConfirmOpen] = useState(false);
  const [reviewConfirmInfo, setReviewConfirmInfo] =
    useState<ReviewConfirmInfo | null>(null);

  const invalidFocus = useCreateLogInvalidFocus();

  const { toast } = useToast();
  const hasRestoredFormRef = useRef(false);

  const form = useForm<CreateLogFormValues>({
    resolver: createLogResolver,
    defaultValues: {
      ...initialCreateLogValues,
      photos: [],
      place: !isEditMode ? readMapInitialPlace() : null,
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldFocusError: false,
  });

  const { handleSubmit, reset, setValue, getValues, control } = form;

  const createLogMutation = useCreateLogMutation({
    onSuccess: ({ postId, values }) => {
      setCreatedPostId(postId);
      setReviewConfirmInfo({
        imageUrl: values.photos[0]?.url,
        placeName: values.place?.name ?? '방문한 장소',
      });
      setIsReviewConfirmOpen(true);
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

  const [scope] = useWatch({
    control,
    name: ['scope'],
  });
  const isPublic = scope === 'PUBLIC';

  const setFormValue = <TFieldName extends FieldPath<CreateLogFormValues>>(
    fieldName: TFieldName,
    value: FieldPathValue<CreateLogFormValues, TFieldName>,
  ) => {
    setValue(fieldName, value, {
      shouldValidate: true,
    });
  };

  const clearPhotos = useCallback(() => {
    setValue('photos', []);
  }, [setValue]);

  useEffect(() => {
    if (!isEditMode || !editLogQuery.data || hasRestoredFormRef.current) return;

    hasRestoredFormRef.current = true;
    reset(editFormValues(editLogQuery.data));
  }, [editLogQuery.data, isEditMode, reset]);

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

  const handleCreateReview = () => {
    if (createdPostId === null) return;

    clearPhotos();
    router.push(`/review/${createdPostId}/create`);
  };

  const handleSkipReview = () => {
    clearPhotos();
    router.push('/feed');
  };

  const handleSubmitLog = handleSubmit(handleValidSubmit, handleInvalidSubmit);
  const isSubmitting = isEditMode
    ? updateLogMutation.isPending
    : createLogMutation.isPending;

  return {
    form,
    editLogQuery,
    handleBack,
    handleClosePlaceSearch,
    handleInvalidEditBack: router.back,
    handleOpenPlaceSearch,
    handleCreateReview,
    handleSkipReview,
    handleSelectPlaceFromSearch,
    handleSubmitLog,
    hasInvalidEditPostId,
    isEditMode,
    isPlaceSearchOpen,
    isReviewConfirmOpen,
    isPublic,
    isSubmitting,
    reviewConfirmInfo,
    setFormValue,
    scope,

    focusTargets: invalidFocus.focusTargets,
  };
}
