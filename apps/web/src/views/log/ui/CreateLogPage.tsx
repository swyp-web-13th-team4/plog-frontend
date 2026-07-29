'use client';

import { FormProvider } from 'react-hook-form';

import { Button, Spinner } from '@plog/ui';

import { NavigationHeader } from '@/shared/ui';

import { useCreateLogPage } from '../model/use-create-log-page';
import DecisionReviewModal from './DecisionReviewModal';
import LogBasicSection from './LogBasicSection';
import LogPlaceSection from './LogPlaceSection';
import LogPrivacySection from './LogPrivacySection';
import LogReviewSection from './LogReviewSection';
import LogWorkSection from './LogWorkSection';
import PlaceSearchOverlay from './PlaceSearchOverlay';

type CreateLogPageProps = {
  editPostId?: string;
};

function SectionDivider() {
  return <div className="h-2 bg-semantic-bg-deep" />;
}

export default function CreateLogPage({ editPostId }: CreateLogPageProps) {
  const controller = useCreateLogPage(editPostId);
  const {
    editLogQuery,
    handleBack,
    handleClosePlaceSearch,
    handleCreateReview,
    handleInvalidEditBack,
    handleSkipReview,
    handleSelectPlaceFromSearch,
    handleSubmitLog,
    hasInvalidEditPostId,
    isEditMode,
    isPlaceSearchOpen,
    isReviewConfirmOpen,
    isSubmitting,
    reviewConfirmInfo,
  } = controller;

  const logHeader = <NavigationHeader title="환경 기록" onBack={handleBack} />;

  if (hasInvalidEditPostId) {
    return (
      <>
        {logHeader}
        <section className="flex min-h-[calc(100dvh-var(--spacing-header)-var(--spacing-bottom-tab))] items-center justify-center bg-semantic-bg-standard px-6 pt-[var(--spacing-header)]">
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="body-md text-semantic-object-normal">
              수정할 게시글을 찾을 수 없어요.
            </p>
            <Button
              variant="outline"
              size="small"
              onClick={handleInvalidEditBack}
            >
              돌아가기
            </Button>
          </div>
        </section>
      </>
    );
  }

  if (isEditMode && editLogQuery.isPending) {
    return (
      <>
        {logHeader}
        <section className="flex min-h-[calc(100dvh-var(--spacing-header)-var(--spacing-bottom-tab))] items-center justify-center bg-semantic-bg-standard pt-[var(--spacing-header)]">
          <Spinner size="large" />
        </section>
      </>
    );
  }

  if (isEditMode && editLogQuery.isError) {
    return (
      <>
        {logHeader}
        <section className="flex min-h-[calc(100dvh-var(--spacing-header)-var(--spacing-bottom-tab))] items-center justify-center bg-semantic-bg-standard px-6 pt-[var(--spacing-header)]">
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="body-md text-semantic-object-normal">
              수정할 기록을 불러오지 못했어요.
            </p>
            <Button
              variant="outline"
              size="small"
              onClick={() => editLogQuery.refetch()}
            >
              다시 시도
            </Button>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {logHeader}
      <FormProvider {...controller.form}>
        <form
          className="bg-semantic-bg-standard pt-[var(--spacing-header)]"
          noValidate
          onSubmit={handleSubmitLog}
        >
          <LogBasicSection focusTargets={controller.focusTargets} />
          <SectionDivider />
          <section className="flex flex-col gap-6 px-6 py-6">
            <LogPlaceSection controller={controller} />
            <LogWorkSection controller={controller} />
          </section>
          <SectionDivider />
          <LogReviewSection controller={controller} />
          <LogPrivacySection />
          <section className="px-6 pt-6 pb-10">
            <Button fullWidth size="large" type="submit" loading={isSubmitting}>
              {isEditMode ? '저장' : '기록하기'}
            </Button>
          </section>
        </form>
      </FormProvider>
      {isPlaceSearchOpen && (
        <div className="fixed inset-0 z-10 mx-auto max-w-layout">
          <PlaceSearchOverlay
            onSelectPlace={handleSelectPlaceFromSearch}
            onClose={handleClosePlaceSearch}
          />
        </div>
      )}
      <DecisionReviewModal
        open={isReviewConfirmOpen}
        imageUrl={reviewConfirmInfo?.imageUrl}
        placeName={reviewConfirmInfo?.placeName ?? '방문한 장소'}
        onReview={handleCreateReview}
        onSkip={handleSkipReview}
      />
    </>
  );
}
