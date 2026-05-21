import { type FieldErrors, type Resolver } from 'react-hook-form';

import { reviewSchema } from './schema';
import { type ReviewFormValues } from './types';

type ReviewParseError = Extract<
  ReturnType<typeof reviewSchema.safeParse>,
  { success: false }
>['error'];

function getFieldErrors(
  error: ReviewParseError,
): FieldErrors<ReviewFormValues> {
  return error.issues.reduce<FieldErrors<ReviewFormValues>>(
    (fieldErrors, issue) => {
      const fieldName = issue.path[0] as keyof ReviewFormValues | undefined;

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

export const reviewResolver: Resolver<ReviewFormValues> = async (values) => {
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
