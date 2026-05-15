import { type FieldErrors, type Resolver } from 'react-hook-form';

import { createLogSchema } from './schema';
import { type CreateLogFormValues } from './types';

type CreateLogParseError = Extract<
  ReturnType<typeof createLogSchema.safeParse>,
  { success: false }
>['error'];

function getFieldErrors(
  error: CreateLogParseError,
): FieldErrors<CreateLogFormValues> {
  return error.issues.reduce<FieldErrors<CreateLogFormValues>>(
    (fieldErrors, issue) => {
      const fieldName = issue.path[0] as keyof CreateLogFormValues | undefined;

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

export const createLogResolver: Resolver<CreateLogFormValues> = async (
  values,
) => {
  const result = createLogSchema.safeParse(values);

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
