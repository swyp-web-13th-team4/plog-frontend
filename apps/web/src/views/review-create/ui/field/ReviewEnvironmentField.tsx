import { type RefCallback } from 'react';
import { useController } from 'react-hook-form';

import { Chip, Field, Icon } from '@plog/ui';

import {
  REVIEW_ENVIRONMENT_GROUPS,
  REVIEW_ENVIRONMENT_LABELS,
  REVIEW_ENVIRONMENT_SCORES,
  ReviewEnvironmentGroup,
  ReviewEnvironmentName,
  ReviewEnvironmentScore,
} from '@/entities/review';

import { useMergedRef } from '@/shared/lib/merge-ref';

import { type CreateReviewFormValues } from '../../model/types';

function EnvironmentChoiceGroup({
  group,
  focusFirstButton,
  value,
  onChange,
}: {
  group: ReviewEnvironmentGroup;
  focusFirstButton?: (element: HTMLButtonElement | null) => void;
  value: ReviewEnvironmentScore | null;
  onChange: (value: ReviewEnvironmentScore | null) => void;
}) {
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="body-lg flex items-center gap-1.5 text-semantic-object-bold">
        <Icon
          name={group.iconName}
          size={20}
          className="text-semantic-object-subtle"
        />
        {group.title}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {REVIEW_ENVIRONMENT_SCORES.map((score) => (
          <Chip
            key={score}
            ref={
              score === REVIEW_ENVIRONMENT_SCORES[0]
                ? focusFirstButton
                : undefined
            }
            size="large"
            variant="solid"
            pressed={value === score}
            className="w-full min-w-0"
            onPressedChange={(pressed) => onChange(pressed ? score : null)}
          >
            <span className="label-sm">
              {REVIEW_ENVIRONMENT_LABELS[group.name][score]}
            </span>
          </Chip>
        ))}
      </div>
    </div>
  );
}

type ReviewEnvironmentFieldProps = {
  buttonRef: RefCallback<HTMLButtonElement>;
};

export default function ReviewEnvironmentField({
  buttonRef,
}: ReviewEnvironmentFieldProps) {
  const { field } = useController<CreateReviewFormValues, 'environmentValues'>({
    name: 'environmentValues',
  });

  const firstButtonRef = useMergedRef<HTMLButtonElement>(field.ref, buttonRef);

  const handleChange = (
    name: ReviewEnvironmentName,
    value: ReviewEnvironmentScore | null,
  ) => {
    field.onChange({
      ...field.value,
      [name]: value,
    });
  };

  return (
    <Field
      label="방문하신 장소의 환경은 어떠셨나요?"
      className="gap-4"
      required
    >
      <div className="flex flex-col gap-6">
        {REVIEW_ENVIRONMENT_GROUPS.map((group, index) => (
          <EnvironmentChoiceGroup
            key={group.name}
            group={group}
            focusFirstButton={index === 0 ? firstButtonRef : undefined}
            value={field.value[group.name]}
            onChange={(value) => handleChange(group.name, value)}
          />
        ))}
      </div>
    </Field>
  );
}
