'use client';

import { type AnalyticsData, useAnalyticsQuery } from '@/entities/user';

import AnalysisContent from './AnalysisContent';

const LOCKED_DATA: AnalyticsData = {
  totalPostCount: 0,
  totalStudyTime: 0,
  workType: null,
  focusEnvironment: null,
  spaceRankings: null,
};

export default function AnalysisTab() {
  const { data, isLoading, isError } = useAnalyticsQuery();

  // TODO: 디자인 확정 후 로딩 UI(스피너/스켈레톤) 적용
  if (isLoading) return null;

  // TODO: 디자인 확정 후 에러 UI 적용
  if (isError) return null;

  return <AnalysisContent data={data ?? LOCKED_DATA} />;
}
