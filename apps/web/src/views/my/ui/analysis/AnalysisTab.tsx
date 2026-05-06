'use client';

import { useAnalyticsQuery } from '@/entities/user';

import AnalysisContent from './AnalysisContent';

export default function AnalysisTab() {
  const { data } = useAnalyticsQuery();

  if (!data) return null;

  return <AnalysisContent data={data} />;
}
