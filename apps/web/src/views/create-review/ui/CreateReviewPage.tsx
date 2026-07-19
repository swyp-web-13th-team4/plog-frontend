'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { Button } from '@plog/ui';

import { FetchErrorEmptyState, NavigationHeader } from '@/shared/ui';

import { useCreateReviewPage } from '../model/use-create-review-page';
import CreateReviewLoading from './CreateReviewLoading';
import LeaveReviewDialog from './LeaveReviewDialog';
import ReviewContentSection from './ReviewContentSection';
import ReviewEnvironmentSection from './ReviewEnvironmentSection';
import ReviewHeroSection from './ReviewHeroSection';
import ReviewVisitSection from './ReviewVisitSection';
import SectionDivider from './SectionDivider';

export default function CreateReviewPage({ postId }: { postId: string }) {
  const router = useRouter();
  const controller = useCreateReviewPage({ postId });
  const {
    handleBack,
    handleCancelLeave,
    handleConfirmLeave,
    handleSubmitReview,
    isSubmittingReview,
    leaveConfirmOpen,
    reviewPostQuery,
  } = controller;

  useEffect(() => {
    if (!reviewPostQuery.isPrivateAccessError) return;

    router.replace('/feed');
  }, [reviewPostQuery.isPrivateAccessError, router]);

  if (reviewPostQuery.isPending) {
    return <CreateReviewLoading />;
  }

  if (reviewPostQuery.isPrivateAccessError) return null;

  if (reviewPostQuery.isError) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 pt-[var(--spacing-header)]">
        <FetchErrorEmptyState onRetry={() => reviewPostQuery.refetch()} />
      </div>
    );
  }

  return (
    <>
      <NavigationHeader title="장소 리뷰" onBack={handleBack} />

      <form
        className="flex flex-col pt-[var(--spacing-header)]"
        noValidate
        onSubmit={handleSubmitReview}
      >
        <ReviewHeroSection controller={controller} />
        <SectionDivider />
        <ReviewVisitSection controller={controller} />
        <SectionDivider />
        <ReviewEnvironmentSection controller={controller} />
        <SectionDivider />
        <ReviewContentSection controller={controller} />

        <section className="px-6 pt-6 pb-10">
          <Button
            type="submit"
            size="large"
            fullWidth
            disabled={isSubmittingReview}
          >
            {isSubmittingReview ? '등록 중...' : '리뷰 등록하기'}
          </Button>
        </section>
      </form>
      <LeaveReviewDialog
        open={leaveConfirmOpen}
        onCancel={handleCancelLeave}
        onConfirm={handleConfirmLeave}
      />
    </>
  );
}
