import { type FieldErrors, type Resolver } from 'react-hook-form';

import { reviewSchema } from './schema';
import { type CreateReviewFormValues } from './types';

type ReviewParseError = Extract<
  ReturnType<typeof reviewSchema.safeParse>,
  { success: false }
>['error'];

function getFieldErrors(
  error: ReviewParseError,
): FieldErrors<CreateReviewFormValues> {
  return error.issues.reduce<FieldErrors<CreateReviewFormValues>>(
    (fieldErrors, issue) => {
      const fieldName = issue.path[0] as
        | keyof CreateReviewFormValues
        | undefined;

      if (!fieldName || fieldErrors[fieldName]) return fieldErrors;

      return {
        ...fieldErrors,
        [fieldName]: {
          type: issue.code,
          message: issue.message,
        },
      };
    },
    {},
  );
}

export const reviewResolver: Resolver<CreateReviewFormValues> = async (
  values,
) => {
  const result = reviewSchema.safeParse(values);

  if (result.success) {
    return {
      values: result.data,
      errors: {},
    };
  }

  return {
    values: {},
    errors: getFieldErrors(result.error),
  };
};
