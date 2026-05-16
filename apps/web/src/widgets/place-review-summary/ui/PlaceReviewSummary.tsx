import { useState } from 'react';

import {
  type PlaceReviewSummary as Summary,
  type PlaceReviewVariant,
} from '../model/types';
import ReviewSummaryBasic from './ReviewSummaryBasic';
import ReviewSummaryExpanded from './ReviewSummaryExpanded';

type PlaceReviewSummaryProps = {
  summary: Summary;
  variant: PlaceReviewVariant;
};

export default function PlaceReviewSummary({
  summary,
  variant,
}: PlaceReviewSummaryProps) {
  const [expanded, setExpanded] = useState(false);

  if (expanded) {
    return <ReviewSummaryExpanded summary={summary} variant={variant} />;
  }

  return (
    <ReviewSummaryBasic
      summary={summary}
      onMoreClick={() => setExpanded(true)}
    />
  );
}
