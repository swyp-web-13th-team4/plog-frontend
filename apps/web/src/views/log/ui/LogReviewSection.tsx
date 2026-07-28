import { type LogFormController } from '../model/use-create-log-page';
import LogSelectFocusField from './field/LogSelectFocusField';
import LogSelectReviewTagsField from './field/LogSelectReviewTagsField';

type LogReviewSectionProps = {
  controller: LogFormController;
};

export default function LogReviewSection({
  controller,
}: LogReviewSectionProps) {
  const { focusTargets } = controller;
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
