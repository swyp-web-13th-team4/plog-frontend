import { useController } from 'react-hook-form';

import { Field, Switch } from '@plog/ui';

import { PrivacySettingSection } from '@/entities/feed';

import { CreateLogFormValues } from '../model/types';

export default function LogPrivacySection() {
  const { field } = useController<CreateLogFormValues, 'scope'>({
    name: 'scope',
  });
  const isPublic = field.value === 'PUBLIC';

  return (
    <section className="flex flex-col gap-4 px-6 pt-6 pb-10">
      <Field
        label="공개 설정"
        required
        className="flex-row items-center justify-between"
      >
        <Switch
          checked={isPublic}
          onCheckedChange={(checked) =>
            field.onChange(checked ? 'PUBLIC' : 'PRIVATE')
          }
          aria-label="공개 설정"
        />
      </Field>

      <PrivacySettingSection scope={field.value} />
    </section>
  );
}
