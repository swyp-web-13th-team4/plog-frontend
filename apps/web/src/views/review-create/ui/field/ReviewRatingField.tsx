import { type RefCallback } from 'react';
import { useController } from 'react-hook-form';

import { useMergedRef } from '@/shared/lib/merge-ref';

import { type CreateReviewFormValues } from '../../model/types';
import RatingSelector from '../RatingSelector';

type ReviewRatingFieldProps = {
  buttonRef: RefCallback<HTMLButtonElement>;
};

export default function ReviewRatingField({
  buttonRef,
}: ReviewRatingFieldProps) {
  const { field } = useController<CreateReviewFormValues, 'rating'>({
    name: 'rating',
  });
  const buttonMergedRef = useMergedRef<HTMLButtonElement>(field.ref, buttonRef);

  return (
    <RatingSelector
      value={field.value ?? 0}
      focusFirstButton={buttonMergedRef}
      onChange={field.onChange}
    />
  );
}
