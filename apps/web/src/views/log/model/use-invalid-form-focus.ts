import { type FieldErrors } from 'react-hook-form';

import { useScrollFocusTarget } from '@/shared/lib/scroll-focus-target';

import { type CreateLogFormValues } from './types';

export type LogFormFields =
  | 'photos'
  | 'title'
  | 'contents'
  | 'place'
  | 'categoryCode'
  | 'studyDate'
  | 'startedAt'
  | 'endedAt'
  | 'focus'
  | 'placeTags';

export function getInvalidSubmitFeedback(
  fieldErrors: FieldErrors<CreateLogFormValues>,
  values: CreateLogFormValues,
): { field: LogFormFields; message?: string } | null {
  const invalidFields: Array<{
    field: LogFormFields;
    hasError?: boolean;
    message?: string;
  }> = [
    { field: 'photos', message: fieldErrors.photos?.message },
    { field: 'title', hasError: Boolean(fieldErrors.title) },
    { field: 'contents', hasError: Boolean(fieldErrors.contents) },
    { field: 'place', message: fieldErrors.place?.message },
    { field: 'categoryCode', message: fieldErrors.categoryCode?.message },
    { field: 'studyDate', message: fieldErrors.studyDate?.message },
    {
      field: values.startedAt && !values.endedAt ? 'endedAt' : 'startedAt',
      hasError: Boolean(fieldErrors.startedAt || fieldErrors.endedAt),
      message: fieldErrors.startedAt?.message ?? fieldErrors.endedAt?.message,
    },
    { field: 'focus', message: fieldErrors.focus?.message },
    { field: 'placeTags', message: fieldErrors.placeTags?.message },
  ];

  return (
    invalidFields.find(({ hasError, message }) => hasError || message) ?? null
  );
}

export function useCreateLogInvalidFocus() {
  const photos = useScrollFocusTarget<HTMLDivElement, HTMLButtonElement>();
  const title = useScrollFocusTarget<HTMLDivElement, HTMLInputElement>();
  const contents = useScrollFocusTarget<HTMLDivElement, HTMLTextAreaElement>();
  const place = useScrollFocusTarget<HTMLDivElement, HTMLElement>();
  const categoryCode = useScrollFocusTarget<
    HTMLDivElement,
    HTMLButtonElement
  >();
  const studyDate = useScrollFocusTarget<HTMLDivElement, HTMLButtonElement>();
  const workTime = useScrollFocusTarget<HTMLDivElement, HTMLButtonElement>();
  const focus = useScrollFocusTarget<HTMLDivElement, HTMLButtonElement>();
  const placeTags = useScrollFocusTarget<HTMLDivElement, HTMLButtonElement>();

  const endTimeButtonRef = workTime.getFocusRef(1);

  const focusField = (field: LogFormFields) => {
    switch (field) {
      case 'photos':
        photos.trigger();
        break;
      case 'title':
        title.trigger();
        break;
      case 'contents':
        contents.trigger();
        break;
      case 'place':
        place.trigger();
        break;
      case 'categoryCode':
        categoryCode.trigger();
        break;
      case 'studyDate':
        studyDate.trigger();
        break;
      case 'endedAt':
        workTime.trigger(1);
        break;
      case 'startedAt':
        workTime.trigger();
        break;
      case 'focus':
        focus.trigger();
        break;
      case 'placeTags':
        placeTags.trigger();
        break;
    }
  };

  return {
    focusField,
    focusTargets: {
      contentsFieldRef: contents.fieldRef,
      contentsTextareaRef: contents.focusRef,
      endTimeButtonRef,
      focusFieldRef: focus.fieldRef,
      focusFirstButtonRef: focus.focusRef,
      photoFieldRef: photos.fieldRef,
      photoUploadButtonRef: photos.focusRef,
      placeCategoryButtonRef: categoryCode.focusRef,
      placeCategoryFieldRef: categoryCode.fieldRef,
      placeFieldRef: place.fieldRef,
      placeInputRef: place.focusRef,
      reviewTagsButtonRef: placeTags.focusRef,
      reviewTagsFieldRef: placeTags.fieldRef,
      startTimeButtonRef: workTime.focusRef,
      titleFieldRef: title.fieldRef,
      titleInputRef: title.focusRef,
      workDateButtonRef: studyDate.focusRef,
      workDateFieldRef: studyDate.fieldRef,
      workTimeFieldRef: workTime.fieldRef,
    },
  };
}
