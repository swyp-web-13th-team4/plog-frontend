'use client';

import { type ReactNode } from 'react';

import { type AnalyticsData } from '@/entities/user';

import AnalysisLockedBanner from './AnalysisLockedBanner';
import FocusEnvironmentSection from './FocusEnvironmentSection';
import SpaceRankingsSection from './SpaceRankingsSection';
import StatsCards from './StatsCards';
import WorkTypeSection from './WorkTypeSection';

type StepSectionProps = {
  step: string;
  description: string;
  children: ReactNode;
};

function StepSection({ step, description, children }: StepSectionProps) {
  return (
    <div>
      <span className="title-xs rounded-full bg-semantic-object-subtler px-4 py-1 text-semantic-object-normal">
        {step}
      </span>
      <p className="label-md mt-2 mb-6 text-semantic-object-bold">
        {description}
      </p>
      {children}
    </div>
  );
}

type AnalysisContentProps = {
  data: AnalyticsData;
};

export default function AnalysisContent({ data }: AnalysisContentProps) {
  const {
    totalPostCount,
    totalStudyTime,
    workType,
    focusEnvironment,
    spaceRankings,
  } = data;

  const isFullLocked = workType === null;

  return (
    <div className="flex flex-col gap-10 p-6">
      <StatsCards
        totalPostCount={totalPostCount}
        totalStudyTime={totalStudyTime}
      />
      {isFullLocked ? (
        <>
          <AnalysisLockedBanner variant="full" />
          <div className="flex flex-col gap-10">
            <StepSection
              step="STEP 1."
              description="기록이 5개 이상 쌓이면 작업 유형카드가 제공돼요."
            >
              <WorkTypeSection workType={null} />
            </StepSection>
            <StepSection
              step="STEP 2."
              description="기록이 15개 이상 쌓이면 작업환경에 대한 심층 분석이 제공돼요."
            >
              <FocusEnvironmentSection data={null} />
            </StepSection>
          </div>
          <SpaceRankingsSection data={spaceRankings} isLocked />
        </>
      ) : (
        <>
          <WorkTypeSection workType={workType} />
          {focusEnvironment === null && (
            <AnalysisLockedBanner variant="partial" />
          )}
          <FocusEnvironmentSection data={focusEnvironment} />
          <SpaceRankingsSection
            data={spaceRankings}
            isLocked={focusEnvironment === null}
          />
        </>
      )}
    </div>
  );
}
