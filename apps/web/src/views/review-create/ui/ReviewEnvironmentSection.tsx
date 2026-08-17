import { type ReviewFocusTargets } from '../model/use-invalid-form-focus';
import ReviewEnvironmentField from './field/ReviewEnvironmentField';

type ReviewEnvironmentSectionProps = {
  focusTargets: Pick<
    ReviewFocusTargets,
    'environmentFieldRef' | 'environmentFirstButtonRef'
  >;
};

export default function ReviewEnvironmentSection({
  focusTargets,
}: ReviewEnvironmentSectionProps) {
  const { environmentFieldRef, environmentFirstButtonRef } = focusTargets;

  return (
    <section
      ref={environmentFieldRef}
      className="flex flex-col px-6 pt-6 pb-10"
    >
      <ReviewEnvironmentField buttonRef={environmentFirstButtonRef} />
    </section>
  );
}
