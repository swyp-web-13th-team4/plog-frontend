import { type LogFocusTargets } from '../model/use-invalid-form-focus';
import LogSelectFocusField from './field/LogSelectFocusField';
import LogSelectReviewTagsField from './field/LogSelectReviewTagsField';

type LogReviewSectionProps = {
  focusTargets: Pick<
    LogFocusTargets,
    | 'focusFieldRef'
    | 'focusFirstButtonRef'
    | 'reviewTagsButtonRef'
    | 'reviewTagsFieldRef'
  >;
};

export default function LogReviewSection({
  focusTargets,
}: LogReviewSectionProps) {
  const {
    focusFieldRef,
    focusFirstButtonRef,
    reviewTagsButtonRef,
    reviewTagsFieldRef,
  } = focusTargets;

  return (
    <section className="flex flex-col gap-6 px-6 py-6">
      <LogSelectFocusField
        fieldRef={focusFieldRef}
        buttonRef={focusFirstButtonRef}
      />
      <LogSelectReviewTagsField
        fieldRef={reviewTagsFieldRef}
        buttonRef={reviewTagsButtonRef}
      />
    </section>
  );
}
