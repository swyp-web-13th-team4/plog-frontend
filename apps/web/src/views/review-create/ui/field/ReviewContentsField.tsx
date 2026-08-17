import { useController } from 'react-hook-form';

import { Field, Textarea } from '@plog/ui';

import { type CreateReviewFormValues } from '../../model/types';

export default function ReviewContentsField() {
  const { field } = useController<CreateReviewFormValues, 'contents'>({
    name: 'contents',
  });

  return (
    <Field label="더 자세한 후기를 남겨주세요">
      <Textarea
        name={field.name}
        onChange={field.onChange}
        value={field.value}
        maxLength={300}
        placeholder={
          '자유롭게 내용을 입력해 주세요. (300자 이내)\n부적절하거나 불쾌감을 줄 수 있는 내용은 제재를 받을 수 있습니다.'
        }
        className="h-40"
      />
    </Field>
  );
}
