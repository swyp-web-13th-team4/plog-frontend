'use client';

import { useEffect } from 'react';
import { FormProvider } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { Button } from '@plog/ui';

import { FetchErrorEmptyState, NavigationHeader } from '@/shared/ui';

import {
  useCreateReviewPage,
  type UseCreateReviewPageOptions,
} from '../model/use-create-review-page';
import CreateReviewLoading from './CreateReviewLoading';
import LeaveReviewDialog from './LeaveReviewDialog';
import ReviewContentSection from './ReviewContentSection';
import ReviewEnvironmentSection from './ReviewEnvironmentSection';
import ReviewRatingSection from './ReviewRatingSection';
import ReviewVisitSection from './ReviewVisitSection';
import SectionDivider from './SectionDivider';

export default function CreateReviewPage(options: UseCreateReviewPageOptions) {
  const router = useRouter();
  const controller = useCreateReviewPage(options);
  const {
    editReviewQuery,
    handleBack,
    handleCancelLeave,
    handleConfirmLeave,
    handleSubmitReview,
    isEditMode,
    isSubmittingReview,
    leaveConfirmOpen,
    reviewPostQuery,
  } = controller;

  useEffect(() => {
    if (isEditMode || !reviewPostQuery.isPrivateAccessError) return;

    router.replace('/feed');
  }, [isEditMode, reviewPostQuery.isPrivateAccessError, router]);

  if (isEditMode && editReviewQuery.isPending) {
    return <CreateReviewLoading />;
  }

  if (isEditMode && editReviewQuery.isError) {
    return (
      <div className="flex min-h-dvh items-center justify-center px-6">
        <FetchErrorEmptyState onRetry={() => editReviewQuery.refetch()} />
      </div>
    );
  }

  if (!isEditMode && reviewPostQuery.isPending) {
    return <CreateReviewLoading />;
  }

  if (!isEditMode && reviewPostQuery.isPrivateAccessError) return null;

  if (!isEditMode && reviewPostQuery.isError) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 pt-[var(--spacing-header)]">
        <FetchErrorEmptyState onRetry={() => reviewPostQuery.refetch()} />
      </div>
    );
  }

  return (
    <>
      <NavigationHeader title="장소 리뷰" onBack={handleBack} />

      <FormProvider {...controller.form}>
        <form
          className="flex flex-col pt-[var(--spacing-header)]"
          noValidate
          onSubmit={handleSubmitReview}
        >
          <ReviewRatingSection
            placeImageSrc={controller.placeImageSrc}
            placeName={controller.placeName}
            focusTargets={controller.focusTargets}
          />
          <SectionDivider />
          <ReviewVisitSection
            visitDate={controller.visitDate}
            startTime={controller.startTime}
            endTime={controller.endTime}
          />
          <SectionDivider />
          <ReviewEnvironmentSection focusTargets={controller.focusTargets} />
          <SectionDivider />
          <ReviewContentSection
            photos={controller.photos}
            onAddPhotos={controller.handleAddPhotos}
            onRemovePhoto={controller.handleRemovePhoto}
          />

          <section className="px-6 pt-6 pb-10">
            <Button
              type="submit"
              size="large"
              fullWidth
              disabled={isSubmittingReview}
            >
              {isSubmittingReview
                ? isEditMode
                  ? '저장 중...'
                  : '등록 중...'
                : isEditMode
                  ? '저장'
                  : '리뷰 등록하기'}
            </Button>
          </section>
        </form>
      </FormProvider>
      <LeaveReviewDialog
        isEditMode={isEditMode}
        open={leaveConfirmOpen}
        onCancel={handleCancelLeave}
        onConfirm={handleConfirmLeave}
      />
    </>
  );
}
