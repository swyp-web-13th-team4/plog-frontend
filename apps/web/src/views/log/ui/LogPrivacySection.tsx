import { Field, Switch } from '@plog/ui';

import { PrivacySettingSection } from '@/entities/feed';

import { type LogFormController } from '../model/use-create-log-page';

type LogPrivacySectionProps = {
  controller: LogFormController;
};

export default function LogPrivacySection({
  controller,
}: LogPrivacySectionProps) {
  const { scope, setFormValue } = controller;
  const isPublic = scope === 'PUBLIC';

  return (
    <section className="flex flex-col gap-4 px-6 pt-6 pb-10">
      <Field
        label="공개 설정"
        required
        className="flex-row items-center justify-between"
      >
        <Switch
          checked={isPublic}
          onCheckedChange={(value) =>
            setFormValue('scope', value ? 'PUBLIC' : 'PRIVATE')
          }
          aria-label="공개 설정"
        />
      </Field>
      <PrivacySettingSection scope={scope} />
    </section>
  );
}
