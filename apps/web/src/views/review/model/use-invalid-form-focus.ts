import { type FieldErrors } from 'react-hook-form';

import { useScrollFocusTarget } from '@/shared/lib/scroll-focus-target';

import { type ReviewFormValues } from './types';

export type ReviewFormFields =
  | 'rating'
  | 'environmentValues'
  | 'contents'
  | 'photos';

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
      toastMessage: fieldErrors.environmentValues.message,
    };
  }

  if (fieldErrors.contents) {
    return {
      field: 'contents',
    };
  }

  if (fieldErrors.photos) {
    return {
      field: 'photos',
      toastMessage: fieldErrors.photos.message,
    };
  }

  return null;
}

export function useReviewInvalidFocus() {
  const rating = useScrollFocusTarget<HTMLDivElement, HTMLButtonElement>();
  const environment = useScrollFocusTarget<HTMLDivElement, HTMLButtonElement>();
  const contents = useScrollFocusTarget<HTMLDivElement, HTMLTextAreaElement>();
  const photos = useScrollFocusTarget<HTMLDivElement, HTMLButtonElement>();

  const focusField = (field: ReviewFormFields) => {
    switch (field) {
      case 'rating':
        rating.trigger();
        break;
      case 'environmentValues':
        environment.trigger();
        break;
      case 'contents':
        contents.trigger();
        break;
      case 'photos':
        photos.trigger();
        break;
    }
  };

  return {
    focusField,
    focusTargets: {
      contentsFieldRef: contents.fieldRef,
      contentsInputRef: contents.focusRef,
      environmentFieldRef: environment.fieldRef,
      environmentFirstButtonRef: environment.focusRef,
      photoFieldRef: photos.fieldRef,
      photoUploadButtonRef: photos.focusRef,
      ratingFieldRef: rating.fieldRef,
      ratingFirstButtonRef: rating.focusRef,
    },
  };
}
