import { type FieldErrors } from 'react-hook-form';

import { useScrollFocusTarget } from '@/shared/lib/scroll-focus-target';

import { type ReviewFormValues } from './types';

export type ReviewFormFields = 'rating' | 'environmentValues';

export function getInvalidSubmitFeedback(
  fieldErrors: FieldErrors<ReviewFormValues>,
): { field: ReviewFormFields; toastMessage?: string } | null {
  if (fieldErrors.rating) {
    return {
      field: 'rating',
      toastMessage: fieldErrors.rating.message,
    };
  }

  if (fieldErrors.environmentValues) {
    return {
      field: 'environmentValues',
      toastMessage:
        fieldErrors.environmentValues.root?.message ??
        fieldErrors.environmentValues.message,
    };
  }

  return null;
}

export function useReviewInvalidFocus() {
  const rating = useScrollFocusTarget<HTMLDivElement, HTMLButtonElement>();
  const environment = useScrollFocusTarget<HTMLDivElement, HTMLButtonElement>();

  const focusField = (field: ReviewFormFields) => {
    switch (field) {
      case 'rating':
        rating.trigger();
        break;
      case 'environmentValues':
        environment.trigger();
        break;
    }
  };

  return {
    focusField,
    focusTargets: {
      environmentFieldRef: environment.fieldRef,
      environmentFirstButtonRef: environment.focusRef,
      ratingFieldRef: rating.fieldRef,
      ratingFirstButtonRef: rating.focusRef,
    },
  };
}
