import { Chip, Field, Icon } from '@plog/ui';
import { cn } from '@plog/utils';

import {
  REVIEW_ENVIRONMENT_LABELS,
  REVIEW_ENVIRONMENT_SCORES,
  type ReviewEnvironmentScore,
} from '@/entities/review';

import {
  REVIEW_ENVIRONMENT_GROUPS,
  type ReviewEnvironmentGroup,
} from '../model/types';
import { type ReviewFormController } from '../model/use-review-page';

type ReviewEnvironmentSectionProps = {
  controller: ReviewFormController;
};

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
      <input type="hidden" name={group.name} value={value ?? ''} />
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
            <span className={cn('label-sm')}>
              {REVIEW_ENVIRONMENT_LABELS[group.name][score]}
            </span>
          </Chip>
        ))}
      </div>
    </div>
  );
}

export default function ReviewEnvironmentSection({
  controller,
}: ReviewEnvironmentSectionProps) {
  const { environmentValues, focusTargets, handleEnvironmentChange } =
    controller;
  const { environmentFieldRef, environmentFirstButtonRef } = focusTargets;

  return (
    <section
      ref={environmentFieldRef}
      className="flex flex-col px-6 pt-6 pb-10"
    >
      <Field
        label="방문하신 장소의 환경은 어떠셨나요?"
        className="gap-4"
        required
      >
        <div className="flex flex-col gap-6">
          {REVIEW_ENVIRONMENT_GROUPS.map((group) => (
            <EnvironmentChoiceGroup
              key={group.name}
              group={group}
              focusFirstButton={
                group.name === REVIEW_ENVIRONMENT_GROUPS[0].name
                  ? environmentFirstButtonRef
                  : undefined
              }
              value={environmentValues[group.name]}
              onChange={(value) => handleEnvironmentChange(group.name, value)}
            />
          ))}
        </div>
      </Field>
    </section>
  );
}
