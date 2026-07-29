import { type LogFocusTargets } from '../model/use-invalid-form-focus';
import LogWorkDateField from './field/LogWorkDateField';
import LogWorkTimeField from './field/LogWorkTimeField';

type LogWorkSessionFieldsProps = {
  focusTargets: Pick<
    LogFocusTargets,
    | 'endTimeButtonRef'
    | 'startTimeButtonRef'
    | 'workDateButtonRef'
    | 'workDateFieldRef'
    | 'workTimeFieldRef'
  >;
};

export default function LogWorkSection({
  focusTargets,
}: LogWorkSessionFieldsProps) {
  const {
    endTimeButtonRef,
    startTimeButtonRef,
    workDateButtonRef,
    workDateFieldRef,
    workTimeFieldRef,
  } = focusTargets;

  return (
    <div className="flex flex-col gap-3">
      <LogWorkDateField
        buttonRef={workDateButtonRef}
        inputRef={workDateFieldRef}
      />
      <div ref={workTimeFieldRef} className="grid grid-cols-2 gap-4">
        <LogWorkTimeField
          name="startedAt"
          label="시작 시간"
          buttonRef={startTimeButtonRef}
          revalidateField="endedAt"
        />
        <LogWorkTimeField
          name="endedAt"
          label="종료 시간"
          buttonRef={endTimeButtonRef}
        />
      </div>
    </div>
  );
}
